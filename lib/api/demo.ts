import { request } from "./client";
import { asArray, asRecord, asString, firstString, pick } from "./normalize";

export interface DemoProfileSummary {
  slug: string;
  name: string;
  title?: string;
  description?: string;
  [key: string]: unknown;
}

export const demoApi = {
  async profiles(signal?: AbortSignal): Promise<DemoProfileSummary[]> {
    const raw = await request<unknown>({ method: "GET", url: "/api/v1/demo/profiles" }, signal);
    return asArray(raw).map((item, index) => {
      const row = asRecord(item);
      return {
        ...row,
        slug: firstString(pick(row, "slug", "id", "profile_slug"), `profile_${index}`),
        name: firstString(pick(row, "name", "title", "label"), `Demo ${index + 1}`),
        title: firstString(pick(row, "title", "role", "headline")) || undefined,
        description: firstString(pick(row, "description", "summary", "bio")) || undefined,
      };
    });
  },

  async profile(slug: string, signal?: AbortSignal): Promise<Record<string, unknown>> {
    const raw = await request<unknown>(
      { method: "GET", url: `/api/v1/demo/${encodeURIComponent(slug)}` },
      signal
    );
    const record = asRecord(raw);
    return {
      ...record,
      slug: firstString(pick(record, "slug", "id"), slug),
      name: firstString(pick(record, "name", "title"), asString(slug)),
    };
  },
};
