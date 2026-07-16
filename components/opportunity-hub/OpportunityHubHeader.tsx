"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { Globe } from "lucide-react";

export function OpportunityHubHeader() {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 text-lg text-white">
          <Globe className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{t("opportunityHub.title")}</h1>
          <p className="mt-1 max-w-3xl text-muted-foreground">{t("opportunityHub.subtitle")}</p>
        </div>
      </div>
    </motion.div>
  );
}
