"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export type HeroGradient = "blue" | "emerald" | "cyan" | "purple" | "teal" | "amber" | "indigo" | "liberty";

const GRADIENTS: Record<HeroGradient, string> = {
  blue: "bg-[linear-gradient(120deg,#1D4ED8_0%,#2563EB_45%,#4F46E5_100%)]",
  emerald: "bg-[linear-gradient(120deg,#047857_0%,#10B981_55%,#34D399_100%)]",
  cyan: "bg-[linear-gradient(120deg,#0369A1_0%,#0EA5E9_50%,#22D3EE_100%)]",
  purple: "bg-[linear-gradient(120deg,#5B21B6_0%,#7C3AED_55%,#9333EA_100%)]",
  teal: "bg-[linear-gradient(120deg,#0F766E_0%,#14B8A6_55%,#2DD4BF_100%)]",
  amber: "bg-[linear-gradient(120deg,#B45309_0%,#F59E0B_55%,#FBBF24_100%)]",
  indigo: "bg-[linear-gradient(120deg,#312E81_0%,#4F46E5_50%,#7C3AED_100%)]",
  liberty: "bg-[linear-gradient(120deg,#7C3AED_0%,#4F46E5_45%,#2563EB_100%)]",
};

export interface HeroStat {
  label: string;
  value: number | string;
  suffix?: string;
  sub?: string;
}

interface PageHeroProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  icon: React.ElementType;
  gradient: HeroGradient;
  eyebrow?: string;
  stats?: HeroStat[];
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

/** Animated counter for hero stats */
function CountUp({ value, suffix }: { value: number | string; suffix?: string }) {
  const numeric = typeof value === "number" ? value : parseFloat(value);
  const isNumber = !isNaN(numeric);
  const [display, setDisplay] = React.useState(isNumber ? 0 : value);

  React.useEffect(() => {
    if (!isNumber) return;
    const duration = 1100;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(Math.round(eased * numeric));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [numeric, isNumber]);

  return (
    <span className="tabular-nums">
      {isNumber ? display : value}
      {suffix && <span className="text-[0.6em] font-bold opacity-80">{suffix}</span>}
    </span>
  );
}

export function PageHero({ title, subtitle, icon: Icon, gradient, eyebrow, stats, actions, children, className }: PageHeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={cn("relative overflow-hidden rounded-[24px] text-white shadow-lg", GRADIENTS[gradient], className)}
    >
      {/* Decorative layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(at_92%_-20%,rgba(255,255,255,0.30)_0,transparent_52%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(at_-10%_130%,rgba(0,0,0,0.22)_0,transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-70 [mask-image:radial-gradient(at_85%_15%,black,transparent_62%)]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
        <div className="absolute right-[8%] top-[18%] h-24 w-24 animate-float-slow rounded-full bg-white/10 blur-xl" />
        <div className="absolute bottom-[12%] right-[28%] h-14 w-14 animate-float rounded-full bg-white/10 blur-lg" />
      </div>

      <div className="relative flex flex-col gap-5 p-6 sm:p-7 lg:flex-row lg:items-center lg:gap-8 lg:p-8">
        {/* Icon + title */}
        <div className="flex min-w-0 flex-1 items-start gap-4">
          <motion.div
            initial={{ scale: 0.6, rotate: -12, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            className="relative h-14 w-14 shrink-0 sm:h-[60px] sm:w-[60px]"
          >
            <div className="absolute inset-0 rounded-[18px] bg-white/15 backdrop-blur-md ring-1 ring-white/25" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon className="h-7 w-7 text-white drop-shadow" strokeWidth={2} />
            </div>
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white/90 shadow">
              <Sparkles className="h-3 w-3 text-[#7C3AED]" />
            </span>
          </motion.div>

          <div className="min-w-0">
            {eyebrow && (
              <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-[3px] text-[10.5px] font-bold uppercase tracking-[0.09em] backdrop-blur-sm ring-1 ring-white/20">
                {eyebrow}
              </div>
            )}
            <h1 className="text-[26px] font-extrabold leading-[1.08] tracking-[-0.03em] text-white drop-shadow-sm sm:text-[32px]">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1.5 max-w-[62ch] text-[13px] font-medium leading-[1.55] text-white/80 sm:text-[14px]">
                {subtitle}
              </p>
            )}
            {actions && <div className="mt-4 flex flex-wrap items-center gap-2.5">{actions}</div>}
          </div>
        </div>

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div className="grid shrink-0 grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-[15px] bg-white/[0.13] px-3.5 py-3 ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-white/[0.18]"
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-white/70">{s.label}</div>
                <div className="mt-0.5 text-[24px] font-extrabold leading-none tracking-[-0.02em]">
                  <CountUp value={s.value} suffix={s.suffix} />
                </div>
                {s.sub && <div className="mt-1 text-[10.5px] font-semibold text-white/70">{s.sub}</div>}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {children && <div className="relative px-6 pb-6 sm:px-7 lg:px-8">{children}</div>}
    </motion.section>
  );
}
