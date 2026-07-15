"use client";

import React from "react";
import { motion } from "framer-motion";
import { AIAvatar } from "./AIAvatar";
import { useI18n } from "@/providers/I18nProvider";

export function TypingIndicator() {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-start gap-3 py-2"
    >
      <AIAvatar size="sm" showSparkles={false} />
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 px-4 py-3 rounded-2xl rounded-tl-sm bg-secondary dark:bg-zinc-800">
          <div className="flex items-center gap-1">
            <motion.span
              className="w-2 h-2 rounded-full bg-blue-500/60"
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            />
            <motion.span
              className="w-2 h-2 rounded-full bg-blue-500/60"
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />
            <motion.span
              className="w-2 h-2 rounded-full bg-blue-500/60"
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            />
          </div>
        </div>
        <span className="text-[11px] text-muted-foreground px-1">
          {t("chat.typing")}
        </span>
      </div>
    </motion.div>
  );
}

export function SkeletonMessage() {
  const { t } = useI18n();
  const messages = [
    t("chat.skeleton.loading1"),
    t("chat.skeleton.loading2"),
    t("chat.skeleton.loading3"),
  ];
  const randomMsg = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="flex items-start gap-3 py-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <AIAvatar size="sm" showSparkles={false} />
      <div className="flex flex-col gap-2 flex-1 max-w-[80%]">
        <div className="px-4 py-4 rounded-2xl rounded-tl-sm bg-secondary dark:bg-zinc-800 space-y-3">
          <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded-full w-3/4 animate-pulse" />
          <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded-full w-1/2 animate-pulse" />
          <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded-full w-5/6 animate-pulse" />
          <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded-full w-2/3 animate-pulse" />
        </div>
        <span className="text-[11px] text-muted-foreground px-1">
          {randomMsg}
        </span>
      </div>
    </div>
  );
}
