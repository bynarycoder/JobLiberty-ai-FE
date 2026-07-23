"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Alias for `/auth/signup` — preserves the URL contract requested in the
 * auth integration spec (Phase 7). Forwards any `?redirect=` query.
 */
function RegisterRedirect() {
  const router = useRouter();
  const params = useSearchParams();
  React.useEffect(() => {
    const redirectTarget = params?.get("redirect");
    const target = redirectTarget ? `/auth/signup?redirect=${encodeURIComponent(redirectTarget)}` : "/auth/signup";
    router.replace(target);
  }, [router, params]);
  return null;
}

export default function RegisterAlias() {
  return (
    <Suspense fallback={null}>
      <RegisterRedirect />
    </Suspense>
  );
}
