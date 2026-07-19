import { request } from "./client";

export const opportunitiesApi = {
  recommend(payload: Record<string, unknown>, signal?: AbortSignal) { return request<unknown[]>({ method: "POST", url: "/api/v1/opportunities/recommend", data: payload }, signal); },
  list(params: Record<string, unknown> = {}, signal?: AbortSignal) { return request<unknown[]>({ method: "GET", url: "/api/v1/opportunities/recommend", params }, signal); },
};
