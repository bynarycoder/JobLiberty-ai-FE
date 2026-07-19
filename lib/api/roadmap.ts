import { request } from "./client";
import { mapCareerRoadmap } from "./mappers";
import type { CareerRoadmap } from "@/lib/types";

export const roadmapApi = {
  async generate(payload: Record<string, unknown>, signal?: AbortSignal): Promise<CareerRoadmap> {
    const raw = await request<unknown>(
      {
        method: "POST",
        url: "/api/v1/roadmap/generate",
        data: payload,
        timeout: 120_000,
      },
      signal
    );
    return mapCareerRoadmap(raw);
  },

  async get(careerDomain: string, signal?: AbortSignal): Promise<CareerRoadmap> {
    const raw = await request<unknown>(
      {
        method: "GET",
        url: `/api/v1/roadmap/${encodeURIComponent(careerDomain)}`,
      },
      signal
    );
    return mapCareerRoadmap(raw);
  },
};
