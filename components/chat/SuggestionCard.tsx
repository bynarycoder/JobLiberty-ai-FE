"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SuggestionCardProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  className?: string;
}

export function SuggestionCard({ icon: Icon, label, onClick, className }: SuggestionCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl",
        "border border-zinc-200 dark:border-zinc-800",
        "bg-white dark:bg-zinc-900",
        "hover:border-blue-300 dark:hover:border-blue-700",
        "hover:bg-blue-50/50 dark:hover:bg-blue-950/30",
        "transition-colors duration-200",
        "text-left text-sm font-medium",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        "cursor-pointer",
        className
      )}
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center">
        <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      </div>
      <span className="text-zinc-800 dark:text-zinc-200">{label}</span>
    </motion.button>
  );
}
