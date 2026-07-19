import axios, { type AxiosRequestConfig } from "axios";

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

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = axios.create({
  baseURL,
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
  const code = error.code === "ECONNABORTED" ? "timeout" : status === 401 ? "unauthorized" : status === 404 ? "not_found" : status === 429 ? "rate_limited" : status && status >= 500 ? "server" : !error.response ? "offline" : "unknown";
  const message = code === "offline" ? "We could not reach JobLiberty. Check your connection and try again." : code === "timeout" ? "The request took too long. Please try again." : code === "rate_limited" ? "Too many requests. Please wait a moment and try again." : code === "unauthorized" ? "Your session has expired. Please sign in again." : code === "not_found" ? "We could not find that information." : code === "server" ? "JobLiberty is having trouble right now. Please try again shortly." : "We could not complete that request. Please try again.";
  return new ApiError(message, status, code);
}

export async function request<T>(config: AxiosRequestConfig, signal?: AbortSignal): Promise<T> {
  let attempt = 0;
  while (true) {
    try {
      const response = await apiClient.request<T>({ ...config, signal });
      return response.data;
    } catch (error) {
      const normalized = normalizeError(error);
      const retryable = normalized.code === "offline" || normalized.code === "timeout" || normalized.code === "rate_limited" || normalized.code === "server";
      if (!retryable || attempt >= 2 || signal?.aborted) throw normalized;
      await new Promise<void>((resolve, reject) => {
        const timer = window.setTimeout(resolve, 300 * 2 ** attempt);
        signal?.addEventListener("abort", () => { window.clearTimeout(timer); reject(signal.reason); }, { once: true });
      });
      attempt += 1;
    }
  }
}

export function getApiError(error: unknown): ApiError {
  return error instanceof ApiError ? error : normalizeError(error);
}
