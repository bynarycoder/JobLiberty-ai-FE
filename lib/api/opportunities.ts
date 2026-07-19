import { request } from "./client";
import { mapOpportunities } from "./mappers";

export const opportunitiesApi = {
  async recommend(payload: Record<string, unknown> = {}, signal?: AbortSignal) {
    const raw = await request<unknown>(
      {
        method: "POST",
        url: "/api/v1/opportunities/recommend",
        data: payload,
        timeout: 90_000,
      },
      signal
    );
    return mapOpportunities(raw);
  },

  async list(params: Record<string, unknown> = {}, signal?: AbortSignal) {
    const raw = await request<unknown>(
      {
        method: "GET",
        url: "/api/v1/opportunities/recommend",
        params,
      },
      signal
    );
    return mapOpportunities(raw);
  },
};
