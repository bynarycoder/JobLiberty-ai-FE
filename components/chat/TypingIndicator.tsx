"use client";

import React from "react";
import { motion } from "framer-motion";
import { AIAvatar } from "./AIAvatar";
import { useI18n } from "@/providers/I18nProvider";
import { Badge } from "@/components/ui/Badge";

export function TypingIndicator() {
  const { t } = useI18n();

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-start gap-3 py-3">
      <AIAvatar size="sm" showSparkles={false} pulse />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 px-4 py-3 rounded-[18px] rounded-bl-[6px] bg-white dark:bg-[#1E293B] border border-slate-200/60 dark:border-slate-700/50 shadow-sm">
          <div className="flex items-center gap-1.5">
            <motion.span className="w-2 h-2 rounded-full bg-[#2563EB]" animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} />
            <motion.span className="w-2 h-2 rounded-full bg-[#7C3AED]" animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
            <motion.span className="w-2 h-2 rounded-full bg-[#10B981]" animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
          </div>
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Liberty AI is crafting a response</span>
        </div>
        <div className="flex items-center gap-2 px-1">
          <Badge variant="ai" size="sm" className="h-5 text-[10px]">
            Thinking
          </Badge>
          <span className="text-[11px] text-slate-400 dark:text-slate-500">{t("chat.typing")}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function SkeletonMessage() {
  const { t } = useI18n();
  /* Deterministic — keeps render pure (no Math.random in render) */
  const randomMsg = t("chat.skeleton.loading1");

  return (
    <div className="flex items-start gap-3 py-2">
      <AIAvatar size="sm" showSparkles={false} />
      <div className="flex flex-col gap-2 flex-1 max-w-[70%]">
        <div className="px-4 py-4 rounded-[18px] rounded-bl-[6px] bg-white dark:bg-[#1E293B] border border-slate-200/60 dark:border-slate-700/50 shadow-sm space-y-3">
          <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-3/4 animate-pulse shimmer" />
          <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-1/2 animate-pulse" />
          <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-5/6 animate-pulse" />
        </div>
        <span className="text-[11px] text-slate-400 dark:text-slate-500 px-1">{randomMsg}</span>
      </div>
    </div>
  );
}
