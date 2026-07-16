"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center whitespace-nowrap rounded-[12px] text-[14px] font-semibold tracking-[-0.01em] ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#4F46E5] text-white shadow-[0_1px_2px_rgba(37,99,235,0.1),0_4px_12px_rgba(37,99,235,0.18)] hover:shadow-[0_4px_12px_rgba(37,99,235,0.28),0_12px_24px_rgba(37,99,235,0.18)] hover:translate-y-[-1px] overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/15 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        primary:
          "bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#4F46E5] text-white shadow-[0_1px_2px_rgba(37,99,235,0.1),0_4px_12px_rgba(37,99,235,0.18)] hover:shadow-[0_4px_12px_rgba(37,99,235,0.28),0_12px_24px_rgba(37,99,235,0.18)] hover:translate-y-[-1px] overflow-hidden",
        accent:
          "bg-gradient-to-br from-[#10B981] to-[#059669] text-white shadow-[0_1px_2px_rgba(16,185,129,0.1),0_4px_12px_rgba(16,185,129,0.18)] hover:shadow-[0_4px_12px_rgba(16,185,129,0.28)] hover:translate-y-[-1px]",
        secondary:
          "bg-white dark:bg-[#1E293B] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 shadow-sm hover:bg-slate-50 dark:hover:bg-[#1E293B]/80 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md",
        ghost:
          "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/[0.06]",
        outline:
          "border border-slate-200 dark:border-slate-700 bg-white dark:bg-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/[0.06] hover:border-slate-300 dark:hover:border-slate-600 shadow-sm hover:shadow",
        destructive:
          "bg-gradient-to-br from-[#EF4444] to-[#DC2626] text-white shadow-[0_4px_12px_rgba(239,68,68,0.2)] hover:shadow-[0_8px_20px_rgba(239,68,68,0.3)] hover:translate-y-[-1px]",
        link: "text-[#2563EB] dark:text-[#60A5FA] underline-offset-4 hover:underline font-medium h-auto p-0",
      },
      size: {
        default: "h-[42px] px-[20px] py-2 gap-2",
        sm: "h-[34px] rounded-[10px] px-[14px] text-[13px] gap-1.5",
        lg: "h-[48px] rounded-[14px] px-[28px] text-[15px] gap-2.5",
        xl: "h-[56px] rounded-[16px] px-[32px] text-[16px] gap-3",
        icon: "h-[40px] w-[40px] rounded-[12px] p-0",
        "icon-sm": "h-[34px] w-[34px] rounded-[10px] p-0",
        "icon-lg": "h-[48px] w-[48px] rounded-[14px] p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    /* Radix Slot requires EXACTLY ONE child — so asChild branches off early
       and receives the child untouched (typically a next/link <Link>). */
    if (asChild) {
      return (
        <Slot className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }), isLoading && "pointer-events-none")}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* Ripple/Glow layer */}
        <span className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-white/10 to-transparent" />

        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="relative">{children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0 [&>svg]:h-[1.1em] [&>svg]:w-[1.1em]">{leftIcon}</span>}
            <span className="relative flex items-center gap-[inherit]">{children}</span>
            {rightIcon && <span className="shrink-0 [&>svg]:h-[1.1em] [&>svg]:w-[1.1em]">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
