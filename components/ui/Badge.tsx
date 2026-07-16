import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-[10px] py-[3px] text-[11.5px] font-semibold tracking-[0.02em] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#EFF6FF] dark:bg-[#1E3A8A]/30 text-[#1D4ED8] dark:text-[#93C5FD] hover:bg-[#DBEAFE] dark:hover:bg-[#1E3A8A]/40",
        secondary:
          "border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.08]",
        emerald:
          "border-transparent bg-[#ECFDF5] dark:bg-[#064E3B]/50 text-[#047857] dark:text-[#6EE7B7] hover:bg-[#D1FAE5] dark:hover:bg-[#064E3B]/70",
        indigo:
          "border-transparent bg-[#F5F3FF] dark:bg-[#4C1D95]/30 text-[#6D28D9] dark:text-[#C4B5FD] hover:bg-[#EDE9FE] dark:hover:bg-[#4C1D95]/40",
        amber:
          "border-transparent bg-[#FFFBEB] dark:bg-[#78350F]/30 text-[#B45309] dark:text-[#FCD34D] hover:bg-[#FEF3C7] dark:hover:bg-[#78350F]/40",
        rose:
          "border-transparent bg-[#FEF2F2] dark:bg-[#7F1D1D]/30 text-[#DC2626] dark:text-[#FCA5A5] hover:bg-[#FEE2E2] dark:hover:bg-[#7F1D1D]/40",
        sky:
          "border-transparent bg-[#F0F9FF] dark:bg-[#0C4A6E]/40 text-[#0284C7] dark:text-[#7DD3FC] hover:bg-[#E0F2FE] dark:hover:bg-[#0C4A6E]/50",
        success:
          "border-transparent bg-[#10B981] text-white shadow-sm shadow-emerald-500/20",
        outline:
          "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 bg-transparent hover:bg-slate-50 dark:hover:bg-white/[0.04]",
        remote:
          "border-transparent bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] dark:from-[#064E3B]/50 dark:to-[#065F46]/30 text-[#065F46] dark:text-[#6EE7B7] shadow-[0_0_0_1px_rgba(16,185,129,0.15)]",
        hybrid:
          "border-transparent bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] dark:from-[#78350F]/30 dark:to-[#92400E]/20 text-[#92400E] dark:text-[#FCD34D] shadow-[0_0_0_1px_rgba(245,158,11,0.15)]",
        onsite:
          "border-transparent bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] dark:from-[#1E3A8A]/30 dark:to-[#1E40AF]/20 text-[#1E40AF] dark:text-[#93C5FD] shadow-[0_0_0_1px_rgba(37,99,235,0.15)]",
        ai: "border-transparent bg-gradient-to-br from-[#2563EB] via-[#7C3AED] to-[#7C3AED] text-white shadow-[0_2px_8px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_12px_rgba(37,99,235,0.3)] hover:translate-y-[-0.5px]",
      },
      size: {
        default: "px-[10px] py-[3px] text-[11.5px]",
        sm: "px-[8px] py-[2px] text-[10.5px] tracking-[0.03em]",
        lg: "px-[12px] py-[4px] text-[12.5px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  pulse?: boolean;
}

function Badge({ className, variant, size, dot, pulse, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span className="relative mr-[5px] flex h-[6px] w-[6px]">
          {pulse && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />}
          <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-current" />
        </span>
      )}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
