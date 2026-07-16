"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type AnalyticsAccent = "blue" | "emerald" | "purple" | "amber" | "sky" | "teal" | "rose";

const ACCENT: Record<
  AnalyticsAccent,
  { hex: string; hexSoft: string; iconBox: string; strip: string; tint: string; text: string }
> = {
  blue: {
    hex: "#2563EB", hexSoft: "#3B82F6",
    iconBox: "bg-[#2563EB] shadow-[0_8px_18px_-6px_rgba(37,99,235,0.65)]",
    strip: "bg-gradient-to-r from-[#2563EB] to-[#4F46E5]",
    tint: "tint-blue", text: "text-[#2563EB] dark:text-[#7FA8FF]",
  },
  emerald: {
    hex: "#10B981", hexSoft: "#34D399",
    iconBox: "bg-[#10B981] shadow-[0_8px_18px_-6px_rgba(16,185,129,0.65)]",
    strip: "bg-gradient-to-r from-[#059669] to-[#10B981]",
    tint: "tint-emerald", text: "text-[#059669] dark:text-[#4ADEAC]",
  },
  purple: {
    hex: "#7C3AED", hexSoft: "#A78BFA",
    iconBox: "bg-[#7C3AED] shadow-[0_8px_18px_-6px_rgba(124,58,237,0.65)]",
    strip: "bg-gradient-to-r from-[#7C3AED] to-[#2563EB]",
    tint: "tint-purple", text: "text-[#7C3AED] dark:text-[#B691FF]",
  },
  amber: {
    hex: "#F59E0B", hexSoft: "#FBBF24",
    iconBox: "bg-[#F59E0B] shadow-[0_8px_18px_-6px_rgba(245,158,11,0.65)]",
    strip: "bg-gradient-to-r from-[#D97706] to-[#F59E0B]",
    tint: "tint-amber", text: "text-[#D97706] dark:text-[#FBBF24]",
  },
  sky: {
    hex: "#0EA5E9", hexSoft: "#38BDF8",
    iconBox: "bg-[#0EA5E9] shadow-[0_8px_18px_-6px_rgba(14,165,233,0.65)]",
    strip: "bg-gradient-to-r from-[#0284C7] to-[#0EA5E9]",
    tint: "tint-sky", text: "text-[#0284C7] dark:text-[#5CC8FA]",
  },
  teal: {
    hex: "#14B8A6", hexSoft: "#2DD4BF",
    iconBox: "bg-[#14B8A6] shadow-[0_8px_18px_-6px_rgba(20,184,166,0.65)]",
    strip: "bg-gradient-to-r from-[#0F766E] to-[#14B8A6]",
    tint: "tint-teal", text: "text-[#0D9488] dark:text-[#4FE0D0]",
  },
  rose: {
    hex: "#EF4444", hexSoft: "#F87171",
    iconBox: "bg-[#EF4444] shadow-[0_8px_18px_-6px_rgba(239,68,68,0.6)]",
    strip: "bg-gradient-to-r from-[#DC2626] to-[#EF4444]",
    tint: "tint-rose", text: "text-[#DC2626] dark:text-[#F98B8B]",
  },
};

/** Animated numeric counter */
export function CountUp({ value, duration = 1200, className }: { value: number; duration?: number; className?: string }) {
  const [display, setDisplay] = React.useState(0);
  React.useEffect(() => {
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setDisplay(Math.round((1 - Math.pow(1 - p, 4)) * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return <span className={cn("tabular-nums", className)}>{display}</span>;
}

/** Mini gradient sparkline (pure SVG, no deps) */
function Sparkline({ data, from, to, id }: { data: number[]; from: string; to: string; id: string }) {
  const w = 96, h = 34, pad = 2;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => [
    pad + (i / (data.length - 1)) * (w - pad * 2),
    h - pad - ((v - min) / range) * (h - pad * 2),
  ]);
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${w - pad},${h} L${pad},${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-[34px] w-[96px] overflow-visible">
      <defs>
        <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <linearGradient id={`sparkfill-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={from} stopOpacity="0.25" />
          <stop offset="100%" stopColor={from} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#sparkfill-${id})`} />
      <motion.path
        d={line}
        fill="none"
        stroke={`url(#spark-${id})`}
        strokeWidth="2.4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.circle
        cx={points[points.length - 1][0]}
        cy={points[points.length - 1][1]}
        r="3.2"
        fill={to}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.05, type: "spring", stiffness: 400, damping: 15 }}
      />
    </svg>
  );
}

/** Animated progress ring */
export function ProgressRing({
  value, size = 56, stroke = 5.5, from, to, id,
}: { value: number; size?: number; stroke?: number; from: string; to: string; id: string }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={`ring-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} opacity="0.5" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={`url(#ring-${id})`} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (value / 100) * c }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[12px] font-extrabold tabular-nums">
        {value}%
      </div>
    </div>
  );
}

interface AnalyticsCardProps {
  label: string;
  value: number;
  suffix?: string;
  icon: React.ElementType;
  accent: AnalyticsAccent;
  trend?: { value: string; up: boolean };
  sub?: string;
  sparkline?: number[];
  ring?: number;
  index?: number;
  className?: string;
}

export function AnalyticsCard({ label, value, suffix, icon: Icon, accent, trend, sub, sparkline, ring, index = 0, className }: AnalyticsCardProps) {
  const a = ACCENT[accent];
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "") + accent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative overflow-hidden rounded-[20px] border bg-card p-[18px] shadow-sm transition-shadow duration-300 hover:shadow-xl",
        className
      )}
    >
      {/* Gradient accent strip */}
      <div className={cn("absolute inset-x-0 top-0 h-[4px]", a.strip)} />
      {/* Soft tinted wash on hover */}
      <div className={cn("absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100", a.tint)} />

      <div className="relative">
        <div className="flex items-start justify-between gap-2">
          <div
            className={cn(
              "flex h-[42px] w-[42px] items-center justify-center rounded-[13px] text-white transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6",
              a.iconBox
            )}
          >
            <Icon className="h-[20px] w-[20px]" strokeWidth={2.1} />
          </div>
          {trend && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-2 py-[3px] text-[11px] font-extrabold",
                trend.up
                  ? "bg-[#E4F9EC] text-[#16A34A] ring-1 ring-[#22C55E]/20 dark:bg-[#22C55E]/12 dark:text-[#4ADE80]"
                  : "bg-[#FDEAEA] text-[#DC2626] ring-1 ring-[#EF4444]/20 dark:bg-[#EF4444]/12 dark:text-[#F98B8B]"
              )}
            >
              {trend.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {trend.value}
            </span>
          )}
        </div>

        <div className="mt-3.5 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-muted-foreground">{label}</p>
            <div className="mt-0.5 flex items-baseline gap-1">
              <span className="text-[30px] font-extrabold leading-none tracking-[-0.03em]">
                <CountUp value={value} />
              </span>
              {suffix && <span className={cn("text-[15px] font-bold", a.text)}>{suffix}</span>}
            </div>
            {sub && (
              <p className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                <span className={cn("h-1.5 w-1.5 rounded-full", a.iconBox.split(" ")[0])} />
                {sub}
              </p>
            )}
          </div>
          {sparkline && !ring && <Sparkline data={sparkline} from={a.hex} to={a.hexSoft} id={id} />}
          {ring !== undefined && <ProgressRing value={ring} from={a.hex} to={a.hexSoft} id={id} />}
        </div>
      </div>
    </motion.div>
  );
}
