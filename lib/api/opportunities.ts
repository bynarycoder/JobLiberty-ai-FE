import { request } from "./client";
import { mapOpportunities, mapOpportunityStats, mapOpportunitiesDashboard } from "./mappers";

export const opportunitiesApi = {
  async dashboard(params: Record<string, unknown> = {}, signal?: AbortSignal) {
    const raw = await request<unknown>(
      {
        method: "GET",
        url: "/api/v1/opportunities/dashboard",
        params,
      },
      signal
    );
    return mapOpportunitiesDashboard(raw);
  },

  async search(params: Record<string, unknown> = {}, signal?: AbortSignal) {
    const raw = await request<unknown>(
      {
        method: "GET",
        url: "/api/v1/opportunities/search",
        params,
      },
      signal
    );
    return mapOpportunities(raw);
  },

  async stats(signal?: AbortSignal) {
    const raw = await request<unknown>(
      {
        method: "GET",
        url: "/api/v1/opportunities/stats",
      },
      signal
    );
    return mapOpportunityStats(raw);
  },

  async list(params: Record<string, unknown> = {}, signal?: AbortSignal) {
    const raw = await request<unknown>(
      {
        method: "GET",
        url: "/api/v1/opportunities",
        params,
      },
      signal
    );
    return mapOpportunities(raw);
  },

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
};
