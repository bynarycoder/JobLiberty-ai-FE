"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  authService,
  onAuthChange,
  getAccessToken,
  getCurrentUser as readCurrentUser,
} from "@/lib/services/auth";
import type { AuthUser, LoginInput, RegisterInput } from "@/lib/api/auth";
import { setUserProfile, clearUserProfile } from "@/lib/api/user-profile";
import { getApiError } from "@/lib/api/client";

export interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  /** True only after persisted client-side auth state has been resolved. */
  isHydrated: boolean;
  isAuthenticated: boolean;
  login: (input: LoginInput) => Promise<AuthUser>;
  register: (input: RegisterInput) => Promise<AuthUser>;
  logout: (options?: { redirectTo?: string; silent?: boolean }) => Promise<void>;
  refreshUser: () => Promise<AuthUser | null>;
  setUser: (user: AuthUser | null) => void;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

/** Push the AuthUser into the legacy `user-profile` store so existing UI
 *  (Sidebar, Topbar, Settings) keeps rendering real user details. */
function syncLegacyProfile(user: AuthUser | null) {
  if (!user) {
    clearUserProfile();
    return;
  }
  setUserProfile({
    name: user.fullName || user.name || user.email,
    email: user.email,
    location: user.location,
    role: user.role,
  });
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  // Keep the server render and the first browser render identical. Persisted
  // session state is intentionally read only after React has hydrated.
  const [user, setUserState] = React.useState<AuthUser | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [isHydrated, setIsHydrated] = React.useState(false);

  const setUser = React.useCallback((next: AuthUser | null) => {
    setUserState(next);
    syncLegacyProfile(next);
  }, []);

  /* Read and validate the persisted session only after the initial render. */
  React.useEffect(() => {
    let cancelled = false;

    const hydrateSession = async () => {
      try {
        const accessToken = getAccessToken();
        const cachedUser = readCurrentUser();

        // Preserve the legacy-profile synchronization that previously ran for
        // the cached user, without exposing it during hydration.
        if (cachedUser) syncLegacyProfile(cachedUser);

        const fresh = accessToken ? await authService.refreshCurrentUser() : null;
        if (cancelled) return;

        setUserState(fresh);
        if (accessToken) syncLegacyProfile(fresh);
      } finally {
        if (!cancelled) {
          setLoading(false);
          setIsHydrated(true);
        }
      }
    };

    void hydrateSession();

    return () => {
      cancelled = true;
    };
  }, []);

  /* Cross-tab / interceptor-driven session changes */
  React.useEffect(() => {
    const off = onAuthChange(() => {
      const next = readCurrentUser();
      setUserState(next);
      syncLegacyProfile(next);
    });
    const onExpired = () => {
      setUserState(null);
      syncLegacyProfile(null);
      queryClient.removeQueries({ queryKey: ["me"] });
      queryClient.removeQueries({ queryKey: ["auth"] });
      queryClient.removeQueries({ queryKey: ["profile"] });
      toast.error("Your session has expired. Please sign in again.");
      router.push("/auth/signin");
    };
    if (typeof window !== "undefined") window.addEventListener("jobliberty:auth-expired", onExpired);
    return () => {
      off();
      if (typeof window !== "undefined") window.removeEventListener("jobliberty:auth-expired", onExpired);
    };
  }, [queryClient, router]);

  const login = React.useCallback<AuthContextValue["login"]>(
    async (input) => {
      const nextUser = await authService.login(input);
      setUserState(nextUser);
      syncLegacyProfile(nextUser);
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      return nextUser;
    },
    [queryClient]
  );

  const register = React.useCallback<AuthContextValue["register"]>(
    async (input) => {
      const nextUser = await authService.register(input);
      setUserState(nextUser);
      syncLegacyProfile(nextUser);
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      return nextUser;
    },
    [queryClient]
  );

  const logout = React.useCallback<AuthContextValue["logout"]>(
    async (options) => {
      const redirect = options?.redirectTo ?? "/";
      try {
        await authService.logout();
      } catch (err) {
        if (!options?.silent) toast.error(getApiError(err).message);
      }
      setUserState(null);
      syncLegacyProfile(null);
      queryClient.clear();
      if (!options?.silent) toast.success("You have been signed out.");
      router.push(redirect);
    },
    [queryClient, router]
  );

  const refreshUser = React.useCallback<AuthContextValue["refreshUser"]>(async () => {
    const fresh = await authService.refreshCurrentUser();
    setUserState(fresh);
    syncLegacyProfile(fresh);
    return fresh;
  }, []);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isHydrated,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      refreshUser,
      setUser,
    }),
    [user, loading, isHydrated, login, register, logout, refreshUser, setUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an <AuthProvider>");
  return ctx;
}

/**
 * Optional hook — returns null instead of throwing when the provider is not
 * mounted. Useful for shared components that must work both inside and
 * outside the auth tree.
 */
export function useOptionalAuth(): AuthContextValue | null {
  return React.useContext(AuthContext) ?? null;
}
