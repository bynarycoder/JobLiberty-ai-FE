/**
 * Client-side session store for JobLiberty.
 *
 * Persists the access token, refresh token, and last known user to
 * localStorage so that browser refreshes never sign the user out.
 *
 * The store is intentionally framework-agnostic — the React context in
 * `contexts/AuthContext.tsx` subscribes to change events and re-renders
 * consumers when the session changes.
 */

import { authApi, type AuthSession, type AuthUser, type LoginInput, type RegisterInput } from "@/lib/api/auth";

const ACCESS_KEY = "jobliberty_access_token";
const REFRESH_KEY = "jobliberty_refresh_token";
const USER_KEY = "jobliberty_current_user";
const EVENT = "jobliberty:auth-change";

function isBrowser() {
  return typeof window !== "undefined";
}

function safeGet(key: string): string | null {
  if (!isBrowser()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string | null) {
  if (!isBrowser()) return;
  try {
    if (value == null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    /* quota / private mode — ignore */
  }
}

function emit() {
  if (!isBrowser()) return;
  window.dispatchEvent(new CustomEvent(EVENT));
}

/* --------------------------------------------------------------------- */
/* Session accessors                                                     */
/* --------------------------------------------------------------------- */

export function getAccessToken(): string | null {
  return safeGet(ACCESS_KEY);
}

export function getRefreshToken(): string | null {
  return safeGet(REFRESH_KEY);
}

export function setAccessToken(token: string | null | undefined) {
  safeSet(ACCESS_KEY, token || null);
}

export function setRefreshToken(token: string | null | undefined) {
  safeSet(REFRESH_KEY, token || null);
}

export function getCurrentUser(): AuthUser | null {
  const raw = safeGet(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: AuthUser | null) {
  if (!user) {
    safeSet(USER_KEY, null);
  } else {
    safeSet(USER_KEY, JSON.stringify(user));
  }
  emit();
}

export function isAuthenticated(): boolean {
  return Boolean(getAccessToken());
}

/**
 * Subscribe to any session change (login, logout, user update, token
 * refresh). Fires in every tab thanks to the `storage` event.
 */
export function onAuthChange(listener: () => void): () => void {
  if (!isBrowser()) return () => undefined;
  const handler = () => listener();
  const storageHandler = (event: StorageEvent) => {
    if (!event.key || [ACCESS_KEY, REFRESH_KEY, USER_KEY].includes(event.key)) listener();
  };
  window.addEventListener(EVENT, handler);
  window.addEventListener("storage", storageHandler);
  return () => {
    window.removeEventListener(EVENT, handler);
    window.removeEventListener("storage", storageHandler);
  };
}

/* --------------------------------------------------------------------- */
/* Session mutations                                                     */
/* --------------------------------------------------------------------- */

function applySession(session: AuthSession) {
  if (session.accessToken) setAccessToken(session.accessToken);
  if (session.refreshToken) setRefreshToken(session.refreshToken);
  if (session.user) setCurrentUser(session.user);
  else emit();
}

/**
 * Clear every stored token and cached user. Safe to call multiple times.
 */
export function clearSession() {
  setAccessToken(null);
  setRefreshToken(null);
  setCurrentUser(null);
}

export const authService = {
  isAuthenticated,
  getAccessToken,
  getRefreshToken,
  getCurrentUser,
  setCurrentUser,

  async login(input: LoginInput): Promise<AuthUser> {
    const session = await authApi.login(input);
    applySession(session);
    // If the login endpoint didn't return a user, fetch it explicitly so the
    // UI has a real profile to display.
    let user = session.user;
    if (!user) {
      user = await authApi.getCurrentUser();
      setCurrentUser(user);
    }
    return user;
  },

  async register(input: RegisterInput): Promise<AuthUser> {
    const session = await authApi.register(input);
    // Some backends return tokens immediately on register; others require a
    // follow-up login. Handle both.
    if (session.accessToken) {
      applySession(session);
      if (session.user) return session.user;
      const user = await authApi.getCurrentUser();
      setCurrentUser(user);
      return user;
    }
    // No tokens yet — perform a login to acquire them.
    return authService.login({ email: input.email, password: input.password });
  },

  async logout(): Promise<void> {
    try {
      await authApi.logout();
    } finally {
      clearSession();
    }
  },

  async refreshCurrentUser(): Promise<AuthUser | null> {
    if (!getAccessToken()) return null;
    try {
      const user = await authApi.getCurrentUser();
      setCurrentUser(user);
      return user;
    } catch {
      return null;
    }
  },

  /**
   * Attempt to refresh the access token using the stored refresh token.
   * Returns the new access token on success. Callers should clear the
   * session on failure.
   */
  async refreshTokens(): Promise<string | null> {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return null;
    const session = await authApi.refresh(refreshToken);
    if (!session.accessToken) throw new Error("Refresh failed: no access token returned");
    setAccessToken(session.accessToken);
    if (session.refreshToken) setRefreshToken(session.refreshToken);
    if (session.user) setCurrentUser(session.user);
    else emit();
    return session.accessToken;
  },
};

export type AuthService = typeof authService;
