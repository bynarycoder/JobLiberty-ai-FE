import axios, { type AxiosRequestConfig } from "axios";

/** Normalized errors shared by every backend-backed feature. */
export class ApiError extends Error {
  status?: number;
  code: "offline" | "timeout" | "rate_limited" | "unauthorized" | "not_found" | "server" | "unknown";
  constructor(message: string, status?: number, code: ApiError["code"] = "unknown") {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

// The deployed API is the default so production and local builds work without
// a separately configured proxy. NEXT_PUBLIC_API_URL can still point at a
// staging instance during development.
export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "https://jobliberty-backend.onrender.com").replace(/\/$/, "");

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30_000,
  headers: { Accept: "application/json" },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("jobliberty_access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function normalizeError(error: unknown): ApiError {
  if (!axios.isAxiosError(error)) return new ApiError("Something went wrong. Please try again.");
  const status = error.response?.status;
  const payload = error.response?.data as { detail?: string; message?: string } | undefined;
  const code = error.code === "ECONNABORTED" ? "timeout" : status === 401 ? "unauthorized" : status === 404 ? "not_found" : status === 429 ? "rate_limited" : status && status >= 500 ? "server" : !error.response ? "offline" : "unknown";
  const fallback = code === "offline" ? "We could not reach JobLiberty. Check your connection and try again." : code === "timeout" ? "The request took too long. Please try again." : code === "rate_limited" ? "Too many requests. Please wait a moment and try again." : code === "unauthorized" ? "Your session has expired. Please sign in again." : code === "not_found" ? "We could not find that information." : code === "server" ? "JobLiberty is having trouble right now. Please try again shortly." : "We could not complete that request. Please try again.";
  return new ApiError(payload?.detail || payload?.message || fallback, status, code);
}

export async function request<T>(config: AxiosRequestConfig, signal?: AbortSignal): Promise<T> {
  let attempt = 0;
  // Long-running AI endpoints set their own timeout; do not thrash them with aggressive retries.
  const maxAttempts = (typeof config.timeout === "number" && config.timeout > 30_000) ? 1 : 2;
  while (true) {
    try {
      return (await apiClient.request<T>({ ...config, signal })).data;
    } catch (error) {
      const normalized = normalizeError(error);
      const retryable = ["offline", "timeout", "rate_limited", "server"].includes(normalized.code);
      if (!retryable || attempt >= maxAttempts || signal?.aborted) throw normalized;
      await new Promise<void>((resolve, reject) => {
        const timer = setTimeout(resolve, 300 * 2 ** attempt);
        signal?.addEventListener(
          "abort",
          () => {
            clearTimeout(timer);
            reject(signal.reason);
          },
          { once: true }
        );
      });
      attempt += 1;
    }
  }
}

export function getApiError(error: unknown): ApiError { return error instanceof ApiError ? error : normalizeError(error); }
