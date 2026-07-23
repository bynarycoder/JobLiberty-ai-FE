"use client";

import Link from "next/link";
import { Bookmark, Sparkles, ArrowRight } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PageHero } from "@/components/dashboard/PageHero";
import { Button } from "@/components/ui/Button";

function SavedJobsInner() {
  return (
    <div className="space-y-6">
      <PageHero
        gradient="emerald"
        icon={Bookmark}
        eyebrow="Career • Saved"
        title="Saved Jobs"
        subtitle="Everything you've bookmarked while browsing Liberty AI job matches."
        stats={[{ label: "Saved", value: 0 }, { label: "Applied", value: 0 }]}
      />
      <div className="rounded-[22px] border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB] dark:bg-[#1E3A8A]/30 dark:text-[#7FA8FF]">
          <Sparkles className="h-5 w-5" />
        </div>
        <h3 className="mt-4 text-[16px] font-bold tracking-[-0.01em]">No saved jobs yet</h3>
        <p className="mx-auto mt-1 max-w-md text-[13px] font-medium text-muted-foreground">
          Browse Liberty AI matches and tap the bookmark icon on any role to save it for later.
        </p>
        <Link href="/jobs" className="mt-5 inline-block">
          <Button className="gap-2 rounded-full px-5">
            Explore jobs <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function SavedJobsPage() {
  return (
    <ProtectedRoute>
      <SavedJobsInner />
    </ProtectedRoute>
  );
}
