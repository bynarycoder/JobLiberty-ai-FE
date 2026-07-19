import { request } from "./client";
import { mapJob, mapJobs } from "./mappers";
import type { Job } from "@/lib/types";

export interface JobSearchParams {
  query?: string;
  location?: string;
  page?: number;
  limit?: number;
  remote?: boolean;
}

export type JobAggregate = Record<string, unknown>;

export const jobsApi = {
  async search(params: JobSearchParams = {}, signal?: AbortSignal): Promise<Job[]> {
    const raw = await request<unknown>(
      { method: "GET", url: "/api/v1/jobs/search", params },
      signal
    );
    return mapJobs(raw);
  },

  async aggregate(params: JobSearchParams = {}, signal?: AbortSignal): Promise<JobAggregate> {
    const raw = await request<unknown>(
      { method: "GET", url: "/api/v1/jobs/aggregate", params },
      signal
    );
    // Preserve object aggregates; if the backend returns a bare list, wrap it.
    if (raw && typeof raw === "object" && !Array.isArray(raw)) return raw as JobAggregate;
    return { jobs: mapJobs(raw), total: mapJobs(raw).length };
  },

  async match(payload: Record<string, unknown>, signal?: AbortSignal): Promise<Job[]> {
    const raw = await request<unknown>(
      { method: "POST", url: "/api/v1/jobs/search/match", data: payload, timeout: 90_000 },
      signal
    );
    return mapJobs(raw);
  },

  async providers(signal?: AbortSignal): Promise<Record<string, unknown>> {
    const raw = await request<unknown>(
      { method: "GET", url: "/api/v1/jobs/providers/status" },
      signal
    );
    return (raw && typeof raw === "object" ? raw : { status: raw }) as Record<string, unknown>;
  },

  async details(jobId: string, signal?: AbortSignal): Promise<Job> {
    const raw = await request<unknown>(
      { method: "GET", url: `/api/v1/jobs/${encodeURIComponent(jobId)}` },
      signal
    );
    return mapJob(raw);
  },
};
