"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi, type AuthUser, type LoginInput, type RegisterInput } from "@/lib/api/auth";
import { authService, getAccessToken, getCurrentUser as readCachedUser } from "@/lib/services/auth";
import { useAuth } from "@/contexts/AuthContext";

export const AUTH_QUERY_KEYS = {
  me: ["me"] as const,
  auth: ["auth"] as const,
  profile: ["profile"] as const,
};

/** Fetch the current user from /auth/me, seeded by the cached user. */
export function useMe() {
  return useQuery<AuthUser | null>({
    queryKey: AUTH_QUERY_KEYS.me,
    queryFn: async () => {
      if (!getAccessToken()) return null;
      return authApi.getCurrentUser();
    },
    enabled: typeof window !== "undefined",
    initialData: () => readCachedUser(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useLoginMutation() {
  const { login } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: LoginInput) => login(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.me });
      qc.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.auth });
      qc.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.profile });
    },
  });
}

export function useRegisterMutation() {
  const { register } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: RegisterInput) => register(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.me });
      qc.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.auth });
      qc.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.profile });
    },
  });
}

export function useLogoutMutation() {
  const { logout } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (options?: { redirectTo?: string }) => logout(options),
    onSuccess: () => {
      qc.clear();
    },
  });
}

export function useUpdateProfileLocal() {
  const { setUser } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (partial: Partial<AuthUser>) => {
      const current = readCachedUser();
      if (!current) throw new Error("Not authenticated");
      const merged: AuthUser = { ...current, ...partial };
      authService.setCurrentUser(merged);
      setUser(merged);
      return merged;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.me });
      qc.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.profile });
    },
  });
}
