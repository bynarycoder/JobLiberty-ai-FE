import { request } from "./client";
import type { CareerRoadmap } from "@/lib/types";

export const roadmapApi = {
  generate(payload: Record<string, unknown>, signal?: AbortSignal) { return request<CareerRoadmap>({ method: "POST", url: "/api/v1/roadmap/generate", data: payload }, signal); },
  get(careerDomain: string, signal?: AbortSignal) { return request<CareerRoadmap>({ method: "GET", url: `/api/v1/roadmap/${encodeURIComponent(careerDomain)}` }, signal); },
};
