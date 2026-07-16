"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { Globe, Sparkles, Zap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function OpportunityHubHeader() {
  const { t } = useI18n();

  return (
    <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="mb-2">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857] shadow-[0_4px_12px_rgba(16,185,129,0.25)]">
            <Globe className="h-6 w-6 text-white" />
            <span className="absolute -right-1 -top-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F59E0B] ring-2 ring-white dark:ring-[#0F172A]" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-[30px] font-[800] tracking-[-0.03em] leading-[1.1] text-slate-900 dark:text-white">{t("opportunityHub.title")}</h1>
              <Badge variant="emerald" dot pulse size="sm">
                Live
              </Badge>
              <Badge variant="ai" size="sm">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Curated
              </Badge>
            </div>
            <p className="mt-1 max-w-[64ch] text-[13.5px] leading-[1.6] font-[450] text-slate-600 dark:text-slate-400">{t("opportunityHub.subtitle")}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-white/[0.04] px-3 py-1.5">
            <Zap className="h-3.5 w-3.5 text-[#F59E0B]" />
            <span className="text-[11px] font-semibold tracking-[0.04em] text-slate-600 dark:text-slate-400">Updated every 15 min • Verified</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
