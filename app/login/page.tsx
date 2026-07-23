"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Alias for `/auth/signin` — preserves the URL contract requested in the
 * auth integration spec (Phase 6). Forwards any `?redirect=` query.
 */
function LoginRedirect() {
  const router = useRouter();
  const params = useSearchParams();
  React.useEffect(() => {
    const redirectTarget = params?.get("redirect");
    const target = redirectTarget ? `/auth/signin?redirect=${encodeURIComponent(redirectTarget)}` : "/auth/signin";
    router.replace(target);
  }, [router, params]);
  return null;
}

export default function LoginAlias() {
  return (
    <Suspense fallback={null}>
      <LoginRedirect />
    </Suspense>
  );
}
