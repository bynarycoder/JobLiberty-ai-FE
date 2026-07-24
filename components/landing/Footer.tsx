"use client";

import { JobLibertyFooter } from "@/components/shared/JobLibertyFooter";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-background py-10 sm:py-14">
      <div className="pointer-events-none absolute inset-0 gradient-mesh opacity-[0.18] dark:opacity-[0.12]" />
      <div className="relative mx-auto max-w-[1280px] px-6">
        <JobLibertyFooter />
      </div>
    </footer>
  );
}
