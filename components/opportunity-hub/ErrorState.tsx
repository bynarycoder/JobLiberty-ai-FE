"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  onRetry?: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center rounded-3xl border bg-red-50/60 px-6 py-16 text-center dark:bg-red-950/20"
      role="alert"
      aria-live="assertive"
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-900/40">
        <AlertTriangle className="h-7 w-7 text-red-600 dark:text-red-400" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold">{t("common.error")}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {t("opportunityHub.errorState.description")}
      </p>
      {onRetry && (
        <Button onClick={onRetry} className="mt-5" variant="outline">
          {t("common.retry")}
        </Button>
      )}
    </motion.div>
  );
}
