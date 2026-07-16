import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { hover?: boolean; glass?: boolean; gradient?: boolean }
>(({ className, hover = true, glass = false, gradient = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative rounded-[20px] border bg-card text-card-foreground transition-all duration-300",
      "shadow-[var(--shadow-sm)] border-border",
      hover && "hover:shadow-[var(--shadow-lg)] hover:-translate-y-[2px] hover:border-[color-mix(in_srgb,var(--border)_55%,var(--primary)_35%)]",
      glass && "glass-strong",
      gradient && "overflow-hidden",
      className
    )}
    {...props}
  >
    {gradient && (
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-[0.5] dark:opacity-[0.8] gradient-mesh" />
    )}
    {props.children}
  </div>
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-[22px] pb-3", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-[16px] font-semibold tracking-[-0.02em] leading-[1.3] text-card-foreground", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-[13.5px] leading-[1.6] text-muted-foreground", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-[22px] pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-[22px] pt-0", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

// Premium variants
const StatCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { accent?: "blue" | "emerald" | "indigo" | "amber" | "rose" }>(
  ({ className, accent = "blue", ...props }, ref) => {
    const accentStyles = {
      blue: "before:bg-[#2563EB] dark:before:bg-[#3B82F6]",
      emerald: "before:bg-[#10B981]",
      indigo: "before:bg-[#7C3AED]",
      amber: "before:bg-[#F59E0B]",
      rose: "before:bg-[#EF4444]",
    };
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-[20px] border bg-card p-5",
          "border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-[2px]",
          "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:rounded-l-[20px]",
          accentStyles[accent],
          className
        )}
        {...props}
      />
    );
  }
);
StatCard.displayName = "StatCard";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, StatCard };
