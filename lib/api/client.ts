import axios, { type AxiosError, type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";

/** Normalized errors shared by every backend-backed feature. */
export class ApiError extends Error {
  status?: number;
  code:
    | "offline"
    | "timeout"
    | "rate_limited"
    | "unauthorized"
    | "forbidden"
    | "not_found"
    | "validation"
    | "bad_request"
    | "missing_candidate"
    | "server"
    | "unknown";
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

const ACCESS_KEY = "jobliberty_access_token";
const REFRESH_KEY = "jobliberty_refresh_token";
const AUTH_PREFIX = (process.env.NEXT_PUBLIC_AUTH_PREFIX || "/api/v1/auth").replace(/\/$/, "");

/**
 * Endpoints that should NEVER trigger the refresh flow — refreshing during
 * login/register/refresh itself would cause loops.
 */
const AUTH_URL_MATCHERS = [
  `${AUTH_PREFIX}/login`,
  `${AUTH_PREFIX}/register`,
  `${AUTH_PREFIX}/refresh`,
  `${AUTH_PREFIX}/logout`,
];

function isAuthUrl(url?: string) {
  if (!url) return false;
  return AUTH_URL_MATCHERS.some((m) => url.includes(m));
}

/* --------------------------------------------------------------------- */
/* Request interceptor: attach the access token                          */
/* --------------------------------------------------------------------- */

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem(ACCESS_KEY);
    if (token) {
      // Preserve explicit Authorization headers set by callers (e.g. the
      // refresh call itself, which uses the refresh token).
      const headers = config.headers;
      if (headers && !headers.Authorization) headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

/* --------------------------------------------------------------------- */
/* Response interceptor: transparent refresh on 401                      */
/* --------------------------------------------------------------------- */

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean; _skipAuthRefresh?: boolean };

let refreshInFlight: Promise<string | null> | null = null;

async function performRefresh(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  const refreshToken = window.localStorage.getItem(REFRESH_KEY);
  if (!refreshToken) return null;

  try {
    const response = await axios.post(
      `${API_BASE_URL}${AUTH_PREFIX}/refresh`,
      { refresh_token: refreshToken, refreshToken },
      {
        timeout: 30_000,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    const data = response.data as Record<string, unknown> | undefined;
    const nested = (data?.data ?? data?.session ?? data) as Record<string, unknown> | undefined;
    const source = { ...(data || {}), ...(nested || {}) } as Record<string, unknown>;
    const newAccess =
      (source.access_token as string) ||
      (source.accessToken as string) ||
      (source.token as string) ||
      (source.jwt as string) ||
      null;
    const newRefresh =
      (source.refresh_token as string) ||
      (source.refreshToken as string) ||
      (source.refresh as string) ||
      null;
    if (newAccess) window.localStorage.setItem(ACCESS_KEY, newAccess);
    if (newRefresh) window.localStorage.setItem(REFRESH_KEY, newRefresh);
    if (newAccess) window.dispatchEvent(new CustomEvent("jobliberty:auth-change"));
    return newAccess;
  } catch {
    return null;
  }
}

function handleAuthFailure() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ACCESS_KEY);
  window.localStorage.removeItem(REFRESH_KEY);
  window.localStorage.removeItem("jobliberty_current_user");
  window.dispatchEvent(new CustomEvent("jobliberty:auth-change"));
  window.dispatchEvent(new CustomEvent("jobliberty:auth-expired"));
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetryConfig | undefined;
    const status = error.response?.status;

    if (
      status === 401 &&
      original &&
      !original._retry &&
      !original._skipAuthRefresh &&
      !isAuthUrl(original.url) &&
      typeof window !== "undefined" &&
      window.localStorage.getItem(REFRESH_KEY)
    ) {
      original._retry = true;
      if (!refreshInFlight) refreshInFlight = performRefresh().finally(() => (refreshInFlight = null));
      const newToken = await refreshInFlight;
      if (newToken) {
        original.headers = original.headers || {};
        (original.headers as Record<string, string>).Authorization = `Bearer ${newToken}`;
        return apiClient.request(original);
      }
      // Refresh failed — clear the session and let the caller see the 401.
      handleAuthFailure();
    }

    return Promise.reject(error);
  }
);

function normalizeError(error: unknown): ApiError {
  if (!axios.isAxiosError(error)) return new ApiError("Something went wrong. Please try again.");
  const status = error.response?.status;
  const payload = error.response?.data as { detail?: string | Array<{ msg?: string }>; message?: string; error?: string } | undefined;
  const code =
    error.code === "ECONNABORTED"
      ? "timeout"
      : status === 401
        ? "unauthorized"
        : status === 403
          ? "forbidden"
          : status === 404
            ? "not_found"
            : status === 422
              ? "validation"
              : status === 429
                ? "rate_limited"
                : status && status >= 500
                  ? "server"
                  : status && status >= 400
                    ? "bad_request"
                    : !error.response
                      ? "offline"
                      : "unknown";
  const fallback =
    code === "offline"
      ? "We could not reach JobLiberty. Check your connection and try again."
      : code === "timeout"
        ? "The request took too long. Please try again."
        : code === "rate_limited"
          ? "Too many requests. Please wait a moment and try again."
          : code === "unauthorized"
            ? "Your session has expired. Please sign in again."
            : code === "forbidden"
              ? "You do not have permission to perform this action."
              : code === "not_found"
                ? "We could not find that information."
                : code === "validation"
                  ? "Some information you submitted is invalid. Please check and try again."
                  : code === "bad_request"
                    ? "The request could not be processed. Please check your input."
                    : code === "server"
                      ? "JobLiberty is having trouble right now. Please try again shortly."
                      : "We could not complete that request. Please try again.";
  const detail =
    typeof payload?.detail === "string"
      ? payload.detail
      : Array.isArray(payload?.detail)
        ? payload.detail
            .map((d) => (typeof d === "string" ? d : d?.msg))
            .filter(Boolean)
            .join("; ")
        : undefined;
  return new ApiError(detail || payload?.message || payload?.error || fallback, status, code);
}

export async function request<T>(config: AxiosRequestConfig, signal?: AbortSignal): Promise<T> {
  let attempt = 0;
  // Long-running AI endpoints set their own timeout; do not thrash them with aggressive retries.
  const maxAttempts = typeof config.timeout === "number" && config.timeout > 30_000 ? 1 : 2;
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

export function getApiError(error: unknown): ApiError {
  return error instanceof ApiError ? error : normalizeError(error);
}
