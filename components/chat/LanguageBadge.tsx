"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const languageNames: Record<string, string> = {
  en: "English",
  ha: "Hausa",
  yo: "Yorùbá",
  ig: "Igbo",
};

interface LanguageBadgeProps {
  className?: string;
}

export function LanguageBadge({ className }: LanguageBadgeProps) {
  const { language, t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full",
        "bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50",
        "text-xs font-medium text-blue-700 dark:text-blue-300",
        className
      )}
      title={`${t("chat.languageLabel")}: ${languageNames[language] ?? language}`}
    >
      <Globe className="h-3 w-3" />
      <span>{languageNames[language] ?? language}</span>
    </motion.div>
  );
}
