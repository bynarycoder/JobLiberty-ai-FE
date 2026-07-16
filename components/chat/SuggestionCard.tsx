"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon, ArrowUpRight } from "lucide-react";

interface SuggestionCardProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  className?: string;
}

export function SuggestionCard({ icon: Icon, label, onClick, className }: SuggestionCardProps) {
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3 px-4 py-3.5 rounded-[14px] w-full text-left",
        "border border-slate-200/70 dark:border-slate-700/50",
        "bg-white dark:bg-[#1E293B]",
        "hover:border-[#2563EB]/30 dark:hover:border-[#3B82F6]/30",
        "hover:shadow-[0_4px_12px_rgba(37,99,235,0.08)] hover:bg-[#EFF6FF]/60 dark:hover:bg-[#1E3A8A]/20",
        "transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40 focus-visible:ring-offset-2",
        "cursor-pointer",
        className
      )}
    >
      <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 border border-[#DBEAFE] dark:border-[#1E3A8A]/30 group-hover:bg-[#2563EB] group-hover:text-white group-hover:border-[#2563EB] group-hover:shadow-sm transition-all duration-200">
        <Icon className="h-4 w-4 text-[#2563EB] dark:text-[#60A5FA] group-hover:text-white" />
      </div>
      <span className="text-[13.5px] font-[500] tracking-[-0.01em] text-slate-700 dark:text-slate-300 flex-1">{label}</span>
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-50 dark:bg-white/[0.06] border border-slate-200/60 dark:border-white/[0.08] group-hover:bg-[#2563EB] group-hover:text-white group-hover:border-[#2563EB] transition-colors opacity-0 group-hover:opacity-100">
        <ArrowUpRight className="h-3 w-3" />
      </span>
    </motion.button>
  );
}
