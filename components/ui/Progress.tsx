"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  variant?: "default" | "emerald" | "indigo" | "amber" | "gradient";
  size?: "sm" | "default" | "lg";
  showValue?: boolean;
  animated?: boolean;
};

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value, variant = "default", size = "default", showValue, animated = true, ...props }, ref) => {
    const variantStyles = {
      default: "bg-gradient-to-r from-[#2563EB] to-[#4F46E5]",
      emerald: "bg-gradient-to-r from-[#10B981] to-[#059669]",
      indigo: "bg-gradient-to-r from-[#7C3AED] to-[#6D28D9]",
      amber: "bg-gradient-to-r from-[#F59E0B] to-[#D97706]",
      gradient: "bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#10B981]",
    };

    const sizeStyles = {
      sm: "h-[4px]",
      default: "h-[6px]",
      lg: "h-[8px]",
    };

    return (
      <div className="relative w-full">
        <ProgressPrimitive.Root
          ref={ref}
          className={cn("relative w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800", sizeStyles[size], className)}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className={cn(
              "h-full w-full flex-1 rounded-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]",
              variantStyles[variant],
              animated && "relative overflow-hidden",
            )}
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
          >
            {animated && (
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1.8s_infinite] -translate-x-full" />
            )}
          </ProgressPrimitive.Indicator>
        </ProgressPrimitive.Root>
        {showValue && (
          <span className="absolute -top-5 right-0 text-[11px] font-semibold tabular-nums text-slate-600 dark:text-slate-400">
            {Math.round(value || 0)}%
          </span>
        )}
      </div>
    );
  }
);
Progress.displayName = ProgressPrimitive.Root.displayName;

// Circular progress
export function CircularProgress({
  value = 0,
  size = 120,
  strokeWidth = 8,
  variant = "default",
  children,
  className,
}: {
  value?: number;
  size?: number;
  strokeWidth?: number;
  variant?: "default" | "emerald" | "indigo" | "amber";
  children?: React.ReactNode;
  className?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dash = (value / 100) * circumference;

  const variantColors = {
    default: { stroke: "#2563EB", glow: "rgba(37,99,235,0.15)" },
    emerald: { stroke: "#10B981", glow: "rgba(16,185,129,0.15)" },
    indigo: { stroke: "#7C3AED", glow: "rgba(124,58,237,0.15)" },
    amber: { stroke: "#F59E0B", glow: "rgba(245,158,11,0.15)" },
  };

  const colors = variantColors[variant];

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-100 dark:text-slate-800"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - dash}
          className="transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ filter: `drop-shadow(0 0 8px ${colors.glow})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}

export { Progress };
