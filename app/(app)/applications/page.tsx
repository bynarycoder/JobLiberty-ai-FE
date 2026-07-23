"use client";

import Link from "next/link";
import { Briefcase, Sparkles, ArrowRight } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PageHero } from "@/components/dashboard/PageHero";
import { Button } from "@/components/ui/Button";

function ApplicationsInner() {
  return (
    <div className="space-y-6">
      <PageHero
        gradient="indigo"
        icon={Briefcase}
        eyebrow="Career • Applications"
        title="Applications"
        subtitle="Track every role you've applied to, all in one place."
        stats={[
          { label: "Total", value: 0 },
          { label: "In review", value: 0 },
          { label: "Interviews", value: 0 },
          { label: "Offers", value: 0 },
        ]}
      />
      <div className="rounded-[22px] border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F0EAFE] text-[#7C3AED] dark:bg-[#7C3AED]/18 dark:text-[#B691FF]">
          <Sparkles className="h-5 w-5" />
        </div>
        <h3 className="mt-4 text-[16px] font-bold tracking-[-0.01em]">No applications tracked yet</h3>
        <p className="mx-auto mt-1 max-w-md text-[13px] font-medium text-muted-foreground">
          Apply to a Liberty AI–matched role, then come back here to update your application status.
        </p>
        <Link href="/jobs" className="mt-5 inline-block">
          <Button className="gap-2 rounded-full px-5">
            Browse matches <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function ApplicationsPage() {
  return (
    <ProtectedRoute>
      <ApplicationsInner />
    </ProtectedRoute>
  );
}
