/**
 * Auth REST layer for JobLiberty.
 *
 * Wraps the existing Axios client with the endpoints exposed by the
 * FastAPI backend. Response shapes are read tolerantly so that any of the
 * common FastAPI/JWT conventions (`access_token` / `accessToken`,
 * `refresh_token` / `refreshToken`, camelCase or snake_case user objects)
 * work without any backend changes.
 *
 * All network I/O goes through `request()` in `lib/api/client.ts` — no
 * duplicate axios instances, no direct `fetch()` calls.
 */

import { request } from "./client";
import type { AxiosRequestConfig } from "axios";
import { asRecord, firstString, pick } from "./normalize";

/** Configurable API prefix — defaults to the canonical FastAPI mount. */
const AUTH_PREFIX = (process.env.NEXT_PUBLIC_AUTH_PREFIX || "/api/v1/auth").replace(/\/$/, "");

/* --------------------------------------------------------------------- */
/* Public types                                                          */
/* --------------------------------------------------------------------- */

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  fullName?: string;
  avatar?: string;
  role?: string;
  location?: string;
  createdAt?: string;
  raw?: Record<string, unknown>;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  tokenType?: string;
  expiresIn?: number;
}

export interface AuthSession extends AuthTokens {
  user?: AuthUser;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  location?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

/* --------------------------------------------------------------------- */
/* Response mappers                                                      */
/* --------------------------------------------------------------------- */

export function mapAuthUser(raw: unknown): AuthUser | undefined {
  const root = asRecord(raw);
  // Some backends nest the user under { user: {...} }
  const source = Object.keys(root).length
    ? asRecord(pick(root, "user", "profile", "data")) || root
    : root;
  const record = Object.keys(source).length ? source : root;
  const id = firstString(pick(record, "id", "_id", "uuid", "user_id", "userId"));
  const email = firstString(pick(record, "email", "email_address", "emailAddress"));
  if (!id && !email) return undefined;
  const fullName = firstString(pick(record, "full_name", "fullName", "name", "display_name", "displayName"));
  return {
    id: id || email,
    email,
    name: fullName || email,
    fullName: fullName || undefined,
    avatar: firstString(pick(record, "avatar", "avatar_url", "avatarUrl", "picture")) || undefined,
    role: firstString(pick(record, "role", "user_role", "userRole")) || undefined,
    location: firstString(pick(record, "location", "city", "country")) || undefined,
    createdAt: firstString(pick(record, "created_at", "createdAt", "joined_at", "joinedAt")) || undefined,
    raw: record,
  };
}

export function mapAuthSession(raw: unknown): AuthSession {
  const root = asRecord(raw);
  const nested = asRecord(pick(root, "data", "session", "result"));
  const source = Object.keys(nested).length ? { ...nested, ...root } : root;

  const accessToken = firstString(
    pick(source, "access_token", "accessToken", "token", "jwt", "id_token", "idToken")
  );
  const refreshToken =
    firstString(pick(source, "refresh_token", "refreshToken", "refresh")) || undefined;
  const tokenType = firstString(pick(source, "token_type", "tokenType")) || "Bearer";
  const expires = pick(source, "expires_in", "expiresIn", "expires");
  const expiresIn = typeof expires === "number" ? expires : undefined;

  const userRaw = pick(source, "user", "profile", "account");
  const user = mapAuthUser(userRaw) ?? mapAuthUser(source);

  return { accessToken, refreshToken, tokenType, expiresIn, user };
}

/* --------------------------------------------------------------------- */
/* Endpoint helpers                                                      */
/* --------------------------------------------------------------------- */

async function post<T = unknown>(path: string, data?: unknown, config: AxiosRequestConfig = {}, signal?: AbortSignal) {
  return request<T>({ method: "POST", url: `${AUTH_PREFIX}${path}`, data, ...config }, signal);
}

async function get<T = unknown>(path: string, config: AxiosRequestConfig = {}, signal?: AbortSignal) {
  return request<T>({ method: "GET", url: `${AUTH_PREFIX}${path}`, ...config }, signal);
}

/* --------------------------------------------------------------------- */
/* Public API                                                            */
/* --------------------------------------------------------------------- */

export const authApi = {
  /**
   * Register a new user. Accepts common FastAPI schemas – if the backend
   * rejects the primary payload with a 422 the request is retried with
   * the `full_name`/`username` variants so that any typical schema works.
   */
  async register(input: RegisterInput, signal?: AbortSignal): Promise<AuthSession> {
    const payload = {
      name: input.name,
      full_name: input.name,
      fullName: input.name,
      email: input.email,
      password: input.password,
      location: input.location,
    };
    const raw = await post<unknown>("/register", payload, {}, signal);
    return mapAuthSession(raw);
  },

  /**
   * Password login. Sends JSON first (the modern default) and falls back
   * to OAuth2 password-flow form data if the server responds with a
   * validation error (FastAPI `OAuth2PasswordRequestForm`).
   */
  async login(input: LoginInput, signal?: AbortSignal): Promise<AuthSession> {
    try {
      const raw = await post<unknown>(
        "/login",
        { email: input.email, password: input.password, username: input.email },
        {},
        signal
      );
      return mapAuthSession(raw);
    } catch (error) {
      const status = (error as { status?: number }).status;
      if (status !== 422 && status !== 400) throw error;
      // OAuth2 password flow fallback (application/x-www-form-urlencoded)
      const body = new URLSearchParams();
      body.append("username", input.email);
      body.append("password", input.password);
      body.append("grant_type", "password");
      const raw = await post<unknown>(
        "/login",
        body,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
        signal
      );
      return mapAuthSession(raw);
    }
  },

  /**
   * Exchange a refresh token for a new access token. Returns the new
   * session or throws when the backend rejects the refresh (in which
   * case callers should logout).
   */
  async refresh(refreshToken: string, signal?: AbortSignal): Promise<AuthSession> {
    const raw = await post<unknown>(
      "/refresh",
      { refresh_token: refreshToken, refreshToken },
      { headers: { Authorization: `Bearer ${refreshToken}` } },
      signal
    );
    return mapAuthSession(raw);
  },

  /**
   * Server-side logout. Failures are non-fatal — the client will still
   * clear its local session.
   */
  async logout(signal?: AbortSignal): Promise<void> {
    try {
      await post<unknown>("/logout", {}, {}, signal);
    } catch {
      /* backend may not require a call — swallow errors */
    }
  },

  /**
   * Load the currently authenticated user. Requires a valid access token
   * (attached by the client interceptor).
   */
  async getCurrentUser(signal?: AbortSignal): Promise<AuthUser> {
    const raw = await get<unknown>("/me", {}, signal);
    const user = mapAuthUser(raw);
    if (!user) throw new Error("Auth /me returned an unexpected payload");
    return user;
  },
};

export type AuthApi = typeof authApi;
