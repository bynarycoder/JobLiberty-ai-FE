"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, Inbox, RefreshCw, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getApiError } from "@/lib/api/client";

export function PageSkeleton({ cards = 4 }: { cards?: number }) {
  return (
    <div className="space-y-5">
      <div className="shimmer h-[190px] rounded-[24px]" />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: cards }).map((_, i) => (
          <div key={i} className="shimmer h-[160px] rounded-[22px]" />
        ))}
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  actionHref = "/upload",
  actionLabel = "Upload resume",
}: {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="rounded-[26px] border-2 border-dashed border-border bg-card/60 px-6 py-16 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[20px] bg-gradient-to-br from-[#2563EB] to-[#7C3AED] shadow-[0_12px_24px_-8px_rgba(79,70,229,0.55)]">
        <Inbox className="h-7 w-7 text-white" />
      </div>
      <div className="text-[16px] font-bold tracking-tight">{title}</div>
      <p className="mx-auto mt-1 max-w-[42ch] text-[13px] text-muted-foreground">{description}</p>
      {actionHref && (
        <Button asChild size="sm" className="mt-5 gap-2 rounded-full">
          <Link href={actionHref}>
            <Upload className="h-4 w-4" />
            {actionLabel}
          </Link>
        </Button>
      )}
    </div>
  );
}

export function ErrorState({
  error,
  onRetry,
  title = "Something went wrong",
}: {
  error: unknown;
  onRetry?: () => void;
  title?: string;
}) {
  const apiError = getApiError(error);
  const needsUpload = apiError.code === "not_found" || /resume|not available/i.test(apiError.message);

  return (
    <div className="rounded-[26px] border border-[#FECACA] bg-[#FEF2F2]/80 px-6 py-14 text-center dark:border-[#7F1D1D]/50 dark:bg-[#450A0A]/30">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[20px] bg-gradient-to-br from-[#EF4444] to-[#F97316] shadow-[0_12px_24px_-8px_rgba(239,68,68,0.55)]">
        <AlertTriangle className="h-7 w-7 text-white" />
      </div>
      <div className="text-[16px] font-bold tracking-tight">{title}</div>
      <p className="mx-auto mt-1 max-w-[46ch] text-[13px] text-muted-foreground">{apiError.message}</p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {onRetry && (
          <Button size="sm" variant="outline" className="gap-2 rounded-full" onClick={onRetry}>
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
        )}
        {needsUpload && (
          <Button asChild size="sm" className="gap-2 rounded-full">
            <Link href="/upload">
              <Upload className="h-4 w-4" />
              Upload resume
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
