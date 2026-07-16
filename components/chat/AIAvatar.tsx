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
      {/* Orbiting energy ring */}
      {pulse && (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute -inset-[5px] rounded-[18px]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, rgba(124,58,237,0.55) 12%, transparent 26%, transparent 60%, rgba(37,99,235,0.55) 72%, transparent 86%)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1.5px",
          }}
        />
      )}
      <motion.div
        animate={pulse ? { scale: [1, 1.06, 1] } : {}}
        transition={pulse ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" } : {}}
        className={cn(
          "relative rounded-[14px] flex items-center justify-center overflow-hidden",
          "bg-gradient-to-br from-[#7C3AED] via-[#4F46E5] to-[#2563EB]",
          "ring-1 ring-white/20",
          "shadow-[0_6px_16px_rgba(124,58,237,0.35),0_2px_6px_rgba(37,99,235,0.25)]",
          sizeClasses[size]
        )}
        role="img"
        aria-label="Liberty AI"
      >
        {/* Shimmer */}
        <motion.div
          animate={{ x: ["-120%", "220%"] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.4 }}
          className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
        {/* Grain */}
        <div className="absolute inset-0 bg-[radial-gradient(at_0%_0%,rgba(255,255,255,0.28),transparent_60%)]" />
        <Sparkles className={cn("text-white relative z-10 drop-shadow-sm", iconSizes[size])} />
      </motion.div>

      {showSparkles && (
        <span className="absolute -top-1 -right-1 flex h-[12px] w-[12px]">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-60" />
          <span className="relative inline-flex rounded-full h-[12px] w-[12px] bg-[#10B981] ring-2 ring-card border border-white/50 shadow-sm items-center justify-center">
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
