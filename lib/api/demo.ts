import { request } from "./client";
import { asArray, asRecord, asString, firstString, pick } from "./normalize";
import {
  DEMO_PROFILES,
  UPDATED_SOFTWARE_ENGINEER_SUMMARY,
  DETAILED_SOFTWARE_ENGINEER_PROFILE,
  sanitizeDemoData,
  transformDetailedProfile,
  transformSummaryProfile,
} from "@/lib/data/demo-profiles";

export interface DemoProfileSummary {
  slug: string;
  name: string;
  title?: string;
  description?: string;
  [key: string]: unknown;
}

export const demoApi = {
  async profiles(signal?: AbortSignal): Promise<DemoProfileSummary[]> {
    try {
      const raw = await request<unknown>({ method: "GET", url: "/api/v1/demo/profiles" }, signal);
      const items = asArray(raw);
      const mapped = items.map((item, index) => {
        const row = asRecord(item);
        const base = {
          ...row,
          slug: firstString(pick(row, "slug", "id", "profile_slug"), `profile_${index}`),
          name: firstString(pick(row, "name", "title", "label"), `Demo ${index + 1}`),
          title: firstString(pick(row, "title", "role", "headline")) || undefined,
          description: firstString(pick(row, "description", "summary", "bio")) || undefined,
        };
        // Apply transformation for software_engineer and sanitize any lingering old name
        const transformed = transformSummaryProfile(base);
        return sanitizeDemoData(transformed) as DemoProfileSummary;
      });

      // Ensure updated profile is present even if backend is stale
      const hasUpdated = mapped.some((p) => p.slug === UPDATED_SOFTWARE_ENGINEER_SUMMARY.slug);
      if (!hasUpdated) {
        return [...mapped, { ...UPDATED_SOFTWARE_ENGINEER_SUMMARY } as DemoProfileSummary];
      }

      // Force the canonical updated values for software_engineer while keeping others unchanged
      return mapped.map((p) =>
        p.slug === UPDATED_SOFTWARE_ENGINEER_SUMMARY.slug
          ? {
              ...p,
              ...UPDATED_SOFTWARE_ENGINEER_SUMMARY,
              title: UPDATED_SOFTWARE_ENGINEER_SUMMARY.headline,
              headline: UPDATED_SOFTWARE_ENGINEER_SUMMARY.headline,
            }
          : p
      );
    } catch {
      // Fallback to local canonical dataset if backend unreachable
      return DEMO_PROFILES.map((p) => ({
        ...p,
        title: p.headline,
      })) as DemoProfileSummary[];
    }
  },

  async profile(slug: string, signal?: AbortSignal): Promise<Record<string, unknown>> {
    try {
      const raw = await request<unknown>(
        { method: "GET", url: `/api/v1/demo/${encodeURIComponent(slug)}` },
        signal
      );
      const record = asRecord(raw);
      const withBase = {
        ...record,
        slug: firstString(pick(record, "slug", "id"), slug),
        name: firstString(pick(record, "name", "title"), asString(slug)),
      };
      // Transform detailed profile, preserving resume, projects, roadmap, ATS, job matches, etc.
      const transformed = transformDetailedProfile(withBase.slug as string, withBase);
      // If backend returned detailed for software_engineer, ensure we use our canonical detailed but keep extra keys
      if (slug === "software_engineer" || withBase.slug === "software_engineer") {
        return {
          ...DETAILED_SOFTWARE_ENGINEER_PROFILE,
          ...transformed,
          slug: "software_engineer",
          personal_profile: {
            ...DETAILED_SOFTWARE_ENGINEER_PROFILE.personal_profile,
            ...((transformed.personal_profile as Record<string, unknown>) || {}),
            full_name: "Abdulwahab Abdulyekeen",
            headline: "AI Engineer | 3MTT NextGen Fellow",
            location: "Kaduna, Nigeria",
            years_of_experience: 2,
          },
        };
      }
      return transformed;
    } catch {
      // Fallback for offline / demo mode
      if (slug === "software_engineer") {
        return DETAILED_SOFTWARE_ENGINEER_PROFILE as unknown as Record<string, unknown>;
      }
      // For other slugs, attempt to find summary and return minimal transformed record
      const summary = DEMO_PROFILES.find((p) => p.slug === slug);
      if (summary) {
        return {
          slug: summary.slug,
          name: summary.name,
          personal_profile: {
            full_name: summary.name,
            headline: summary.headline,
            location: summary.location,
            years_of_experience: summary.years_of_experience,
          },
        };
      }
      return { slug, name: slug };
    }
  },
};
