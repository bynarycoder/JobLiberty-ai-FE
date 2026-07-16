"use client";

import React from "react";
import { useI18n } from "@/providers/I18nProvider";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function EmptyState({ titleKey, descriptionKey }: { titleKey: string; descriptionKey: string }) {
  const { t } = useI18n();

  return (
    <div className="rounded-[20px] border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-white/[0.02] p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[16px] bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 shadow-sm mb-4">
        <Search className="h-6 w-6 text-slate-400" />
      </div>
      <div className="text-[16px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-white">{t(titleKey)}</div>
      <p className="mt-1 text-[13px] leading-[1.6] text-slate-500 dark:text-slate-400 max-w-[32ch] mx-auto">{t(descriptionKey)}</p>
      <div className="mt-4 flex items-center justify-center gap-2">
        <Button variant="outline" size="sm" className="rounded-full">
          Clear filters
        </Button>
        <Button size="sm" className="rounded-full gap-1.5">
          <Sparkles className="h-4 w-4" />
          Ask Liberty AI
        </Button>
      </div>
    </div>
  );
}
