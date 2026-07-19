import { request } from "./client";
import type { Job } from "@/lib/types";

export interface JobSearchParams { query?: string; location?: string; page?: number; limit?: number; remote?: boolean; }
export interface JobAggregate { [key: string]: unknown; }

export const jobsApi = {
  search(params: JobSearchParams = {}, signal?: AbortSignal) { return request<Job[]>({ method: "GET", url: "/api/v1/jobs/search", params }, signal); },
  aggregate(params: JobSearchParams = {}, signal?: AbortSignal) { return request<JobAggregate>({ method: "GET", url: "/api/v1/jobs/aggregate", params }, signal); },
  match(payload: Record<string, unknown>, signal?: AbortSignal) { return request<Job[]>({ method: "POST", url: "/api/v1/jobs/search/match", data: payload }, signal); },
  providers(signal?: AbortSignal) { return request<Record<string, unknown>>({ method: "GET", url: "/api/v1/jobs/providers/status" }, signal); },
  details(jobId: string, signal?: AbortSignal) { return request<Job>({ method: "GET", url: `/api/v1/jobs/${encodeURIComponent(jobId)}` }, signal); },
};
