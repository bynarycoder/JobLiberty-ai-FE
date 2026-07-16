"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface AIAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  showSparkles?: boolean;
  className?: string;
  pulse?: boolean;
}

export function AIAvatar({ size = "md", showSparkles = true, className, pulse = false }: AIAvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-20 h-20",
  };

  const iconSizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-6 w-6",
    xl: "h-8 w-8",
  };

  return (
    <div className={cn("relative inline-flex shrink-0", className)}>
      <motion.div
        animate={pulse ? { scale: [1, 1.05, 1] } : {}}
        transition={pulse ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
        className={cn(
          "relative rounded-[14px] flex items-center justify-center overflow-hidden",
          "bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#4F46E5]",
          "ring-1 ring-[#2563EB]/20 dark:ring-white/10",
          "shadow-[0_4px_12px_rgba(37,99,235,0.25),0_1px_3px_rgba(37,99,235,0.15)]",
          sizeClasses[size]
        )}
        role="img"
        aria-label="Liberty AI"
      >
        {/* Shimmer */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
        </div>
        {/* Grain */}
        <div className="absolute inset-0 bg-[radial-gradient(at_0%_0%,rgba(255,255,255,0.25),transparent_60%)]" />
        <Sparkles className={cn("text-white relative z-10 drop-shadow-sm", iconSizes[size])} />
      </motion.div>

      {showSparkles && (
        <span className="absolute -top-1 -right-1 flex h-[12px] w-[12px]">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-60" />
          <span className="relative inline-flex rounded-full h-[12px] w-[12px] bg-[#10B981] ring-2 ring-white dark:ring-[#0F172A] border border-white/50 shadow-sm items-center justify-center">
            <span className="h-[4px] w-[4px] rounded-full bg-white" />
          </span>
        </span>
      )}
    </div>
  );
}

export function LibertyAIBadge({ size = "sm" }: { size?: "sm" | "md" }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] text-white shadow-[0_2px_8px_rgba(37,99,235,0.25)] px-2 py-0.5 ${size === "sm" ? "text-[10px] font-bold tracking-[0.04em]" : "text-[11px] font-bold px-2.5 py-1"}`}>
      <Sparkles className={`${size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"}`} />
      LIBERTY AI
    </span>
  );
}
