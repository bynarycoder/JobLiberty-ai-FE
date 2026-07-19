import { NextResponse } from "next/server";
import { DEMO_PROFILES, UPDATED_SOFTWARE_ENGINEER_SUMMARY, sanitizeDemoData } from "@/lib/data/demo-profiles";

// Force dynamic - no caching for demo data
export const dynamic = "force-dynamic";

const BACKEND_URL = (process.env.NEXT_PUBLIC_API_URL || "https://jobliberty-backend.onrender.com").replace(/\/$/, "");

async function fetchUpstreamProfiles(): Promise<{ profiles: typeof DEMO_PROFILES; total: number } | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/demo/profiles`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}

export async function GET() {
  // Try to get upstream to preserve other profiles unchanged, but always override software_engineer
  const upstream = await fetchUpstreamProfiles();

  let profiles: typeof DEMO_PROFILES;
  let total: number;

  if (upstream && Array.isArray((upstream as any).profiles)) {
    const rawProfiles = (upstream as any).profiles as Record<string, unknown>[];
    profiles = rawProfiles.map((p) => {
      const slug = typeof p.slug === "string" ? p.slug : typeof (p as any).id === "string" ? (p as any).id : "";
      if (slug === "software_engineer") {
        return { ...p, ...UPDATED_SOFTWARE_ENGINEER_SUMMARY };
      }
      return p as unknown as (typeof DEMO_PROFILES)[number];
    }) as typeof DEMO_PROFILES;
    // Ensure sanitization
    profiles = sanitizeDemoData(profiles);
    // Ensure updated profile exists
    const exists = profiles.some((p) => p.slug === UPDATED_SOFTWARE_ENGINEER_SUMMARY.slug);
    if (!exists) {
      profiles = [...profiles, UPDATED_SOFTWARE_ENGINEER_SUMMARY];
    }
    total = typeof (upstream as any).total === "number" ? (upstream as any).total : profiles.length;
    // Re-apply canonical values for software_engineer
    profiles = profiles.map((p) =>
      p.slug === UPDATED_SOFTWARE_ENGINEER_SUMMARY.slug ? UPDATED_SOFTWARE_ENGINEER_SUMMARY : p
    ) as typeof DEMO_PROFILES;
  } else {
    profiles = DEMO_PROFILES;
    total = DEMO_PROFILES.length;
  }

  return NextResponse.json(
    sanitizeDemoData({
      profiles,
      total,
    }),
    {
      headers: {
        "Cache-Control": "no-store, must-revalidate",
      },
    }
  );
}
