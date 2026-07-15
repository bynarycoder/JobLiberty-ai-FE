"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface AIAvatarProps {
  size?: "sm" | "md" | "lg";
  showSparkles?: boolean;
  className?: string;
}

export function AIAvatar({ size = "md", showSparkles = true, className }: AIAvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  const iconSizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-6 w-6",
  };

  return (
    <div className={cn("relative inline-flex shrink-0", className)}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center",
          "bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700",
          "ring-2 ring-blue-100 dark:ring-blue-900/50",
          "shadow-lg shadow-blue-500/20",
          sizeClasses[size]
        )}
        role="img"
        aria-label="Liberty AI"
      >
        <Sparkles className={cn("text-white", iconSizes[size])} />
      </div>
      {showSparkles && (
        <>
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-1 ring-white dark:ring-zinc-900" />
          </span>
        </>
      )}
    </div>
  );
}
