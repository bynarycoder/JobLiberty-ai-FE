"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  titleKey?: string;
  descriptionKey?: string;
}

export function EmptyState({
  titleKey = "opportunityHub.emptyState.title",
  descriptionKey = "opportunityHub.emptyState.description",
}: EmptyStateProps) {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="empty-state flex flex-col items-center justify-center rounded-3xl border border-dashed bg-zinc-50/60 px-6 py-16 text-center dark:bg-zinc-900/40"
      role="status"
      aria-live="polite"
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
        <SearchX className="h-7 w-7 text-muted-foreground" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold">{t(titleKey)}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{t(descriptionKey)}</p>
    </motion.div>
  );
}
