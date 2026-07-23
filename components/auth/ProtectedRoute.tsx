"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** Route to bounce unauthenticated users to. */
  redirectTo?: string;
  /** Skeleton to render while the auth state is hydrating. */
  fallback?: React.ReactNode;
}

/**
 * Client-side auth guard. Waits for the auth context to finish hydrating,
 * then either renders `children` or redirects to the sign-in page with a
 * `?redirect=` query so the user comes back to the same page after login.
 */
export function ProtectedRoute({ children, redirectTo = "/auth/signin", fallback }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (loading) return;
    if (!user) {
      const target = pathname && pathname !== "/" ? `${redirectTo}?redirect=${encodeURIComponent(pathname)}` : redirectTo;
      router.replace(target);
    }
  }, [loading, user, router, pathname, redirectTo]);

  if (loading || !user) {
    return (
      fallback ?? (
        <div className="flex min-h-[40vh] items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm font-medium">Checking your session…</span>
        </div>
      )
    );
  }

  return <>{children}</>;
}
