import { request } from "./client";
import { asRecord } from "./normalize";

export const systemApi = {
  async health(signal?: AbortSignal): Promise<Record<string, unknown>> {
    const raw = await request<unknown>({ method: "GET", url: "/api/v1/system/health" }, signal);
    return asRecord(raw);
  },

  async version(signal?: AbortSignal): Promise<Record<string, unknown>> {
    const raw = await request<unknown>({ method: "GET", url: "/api/v1/system/version" }, signal);
    return asRecord(raw);
  },

  async legacyHealth(signal?: AbortSignal): Promise<Record<string, unknown>> {
    const raw = await request<unknown>({ method: "GET", url: "/health" }, signal);
    return asRecord(raw);
  },
};
