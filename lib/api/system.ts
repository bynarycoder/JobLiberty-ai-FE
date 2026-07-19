import { request } from "./client";

export const systemApi = {
  health(signal?: AbortSignal) { return request<Record<string, unknown>>({ method: "GET", url: "/api/v1/system/health" }, signal); },
  version(signal?: AbortSignal) { return request<Record<string, unknown>>({ method: "GET", url: "/api/v1/system/version" }, signal); },
  legacyHealth(signal?: AbortSignal) { return request<Record<string, unknown>>({ method: "GET", url: "/health" }, signal); },
};
