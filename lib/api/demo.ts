import { request } from "./client";

export const demoApi = {
  profiles(signal?: AbortSignal) { return request<unknown[]>({ method: "GET", url: "/api/v1/demo/profiles" }, signal); },
  profile(slug: string, signal?: AbortSignal) { return request<Record<string, unknown>>({ method: "GET", url: `/api/v1/demo/${encodeURIComponent(slug)}` }, signal); },
};
