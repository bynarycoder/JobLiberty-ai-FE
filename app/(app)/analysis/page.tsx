"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/providers/I18nProvider";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/services/api";
import { Progress, CircularProgress } from "@/components/ui/Progress";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/dashboard/PageHero";
import { CheckCircle2, AlertTriangle, Sparkles, FileText, ArrowRight, TrendingUp, BarChart3, Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const CATEGORY_STYLE = [
  { stripDot: "bg-[#2563EB]", variant: "default" as const, tint: "tint-blue" },
  { stripDot: "bg-[#10B981]", variant: "emerald" as const, tint: "tint-emerald" },
  { stripDot: "bg-[#7C3AED]", variant: "indigo" as const, tint: "tint-purple" },
  { stripDot: "bg-[#F59E0B]", variant: "amber" as const, tint: "tint-amber" },
];

export default function ATSAnalysisPage() {
  const { t } = useI18n();
  const { data: ats } = useQuery({ queryKey: ["ats"], queryFn: () => api.fetchATSAnalysis() });

  if (!ats)
    return (
      <div className="space-y-5">
        <div className="shimmer h-[190px] rounded-[24px]" />
        <div className="grid gap-5 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="shimmer h-[260px] rounded-[24px]" />
          ))}
        </div>
      </div>
    );

  const scoreData = [
    { name: "Keyword Match", value: ats.keywordMatch, desc: "Relevant skills & job terms", icon: "🎯" },
    { name: "Formatting", value: ats.formatting, desc: "Layout & ATS parsing", icon: "📄" },
    { name: "Readability", value: ats.readability, desc: "Clarity & conciseness", icon: "✍️" },
    { name: "Skills Depth", value: ats.skills, desc: "Technical breadth", icon: "💡" },
  ];

  const overall =
    ats.overallScore >= 85
      ? { variant: "emerald" as const, label: "Excellent" }
      : ats.overallScore >= 70
        ? { variant: "default" as const, label: "Good" }
        : { variant: "amber" as const, label: "Fair" };

  return (
    <div className="space-y-6">
      {/* ── Purple gradient hero ── */}
      <PageHero
        gradient="purple"
        icon={BarChart3}
        eyebrow="AI Verified • Real ATS systems • 97% accuracy"
        title={t("analysis.title")}
        subtitle="We ran your resume against the exact parsers used by Workday, Greenhouse and Lever. Here's precisely how it performs — and how to fix every gap."
        stats={[
          { label: t("analysis.overallScore"), value: ats.overallScore, suffix: "%", sub: "+6% vs last scan" },
          { label: "Pass rate", value: 92, suffix: "%", sub: "Top 18% percentile" },
          { label: "Keywords matched", value: ats.keywordMatch, suffix: "%", sub: "Industry standard 70%" },
          { label: "Total scans", value: 1240, sub: "Across our users" },
        ]}
        actions={
          <>
            <Button size="sm" className="h-[40px] gap-1.5 rounded-full bg-white px-5 text-[#6D28D9] shadow-lg shadow-black/10 hover:bg-white/90">
              <Wand2 className="h-4 w-4" /> Auto-fix with AI
            </Button>
            <Button size="sm" variant="ghost" asChild className="h-[40px] gap-1.5 rounded-full border border-white/25 bg-white/10 px-5 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white">
              <Link href="/reports">
                <FileText className="h-4 w-4" /> Export PDF
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-5 lg:grid-cols-12">
        {/* Score visualization */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="group relative overflow-hidden rounded-[22px] border bg-card shadow-sm transition-shadow hover:shadow-xl lg:col-span-5"
        >
          <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#7C3AED] to-[#2563EB]" />
          <div className="tint-purple absolute inset-0 opacity-40" />
          <div className="relative p-6">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#7C3AED] text-white shadow-[0_8px_18px_-6px_rgba(124,58,237,0.65)]">
                  <Sparkles className="h-[18px] w-[18px]" />
                </div>
                <h3 className="text-[15px] font-bold tracking-[-0.01em]">{t("analysis.overallScore")}</h3>
              </div>
              <Badge variant={overall.variant} size="sm" dot pulse>{overall.label}</Badge>
            </div>

            <div className="flex flex-col items-center py-5">
              <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                <CircularProgress value={ats.overallScore} size={172} strokeWidth={12} variant="indigo">
                  <div className="text-center">
                    <div className="text-[46px] font-extrabold leading-none tabular-nums tracking-[-0.04em]">{ats.overallScore}</div>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Overall</div>
                    <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[#F0EAFE] px-2 py-0.5 text-[10px] font-extrabold text-[#7C3AED] ring-1 ring-[#7C3AED]/20 dark:bg-[#7C3AED]/15 dark:text-[#B691FF]">
                      <span className="h-1 w-1 animate-pulse rounded-full bg-current" /> LIVE
                    </div>
                  </div>
                </CircularProgress>
              </motion.div>

              <div className="mt-7 grid w-full grid-cols-3 gap-2.5">
                {[
                  { label: "Pass Rate", value: "92%", tint: "tint-emerald", c: "text-[#059669] dark:text-[#4ADEAC]" },
                  { label: "Percentile", value: "Top 18%", tint: "tint-blue", c: "text-[#2563EB] dark:text-[#7FA8FF]" },
                  { label: "Scans Run", value: "1,240", tint: "tint-purple", c: "text-[#7C3AED] dark:text-[#B691FF]" },
                ].map((stat) => (
                  <div key={stat.label} className={cn("rounded-[13px] border p-3 text-center shadow-sm", stat.tint)}>
                    <div className={cn("text-[15px] font-extrabold tracking-tight", stat.c)}>{stat.value}</div>
                    <div className="mt-0.5 text-[9.5px] font-bold uppercase tracking-wide text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[22px] border bg-card shadow-sm lg:col-span-7"
        >
          <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#2563EB] via-[#10B981] to-[#F59E0B]" />
          <div className="p-6">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#2563EB] text-white shadow-[0_8px_18px_-6px_rgba(37,99,235,0.65)]">
                  <TrendingUp className="h-[18px] w-[18px]" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold tracking-[-0.01em]">Category Breakdown</h3>
                  <p className="text-[11.5px] font-medium text-muted-foreground">How each section performs against ATS filters</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-8 gap-1 rounded-full text-[12px]">
                <Sparkles className="h-3.5 w-3.5 text-[#7C3AED]" /> Re-scan
              </Button>
            </div>

            <div className="space-y-5">
              {scoreData.map((item, i) => {
                const style = CATEGORY_STYLE[i % CATEGORY_STYLE.length];
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.45 }}
                    className={cn("group rounded-[14px] border p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg", style.tint)}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-2 text-[13.5px] font-bold tracking-[-0.01em]">
                        <span className="text-[15px]">{item.icon}</span>
                        {item.name}
                        <span className="text-[11px] font-medium text-muted-foreground">• {item.desc}</span>
                      </span>
                      <span
                        className={cn(
                          "rounded-full border bg-card px-2.5 py-0.5 text-[12px] font-extrabold shadow-sm",
                          item.value >= 80 ? "text-[#059669] dark:text-[#4ADEAC]" : item.value >= 60 ? "text-[#2563EB] dark:text-[#7FA8FF]" : "text-[#D97706] dark:text-[#FBBF24]"
                        )}
                      >
                        {item.value}%
                      </span>
                    </div>
                    <Progress value={item.value} variant={style.variant} size="default" />
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4">
              <span className="text-[12px] font-medium text-muted-foreground">Last scanned 2h ago • Next auto-scan in 24h</span>
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#7C3AED] dark:text-[#B691FF]">
                <Sparkles className="h-3 w-3" /> Powered by Liberty AI
              </span>
            </div>
          </div>
        </motion.div>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[22px] border bg-card shadow-sm lg:col-span-6"
        >
          <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#D97706] to-[#F59E0B]" />
          <div className="tint-amber absolute inset-0 opacity-50" />
          <div className="relative p-6">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#F59E0B] text-white shadow-[0_8px_18px_-6px_rgba(245,158,11,0.65)]">
                <AlertTriangle className="h-[18px] w-[18px]" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold tracking-[-0.01em]">{t("analysis.suggestions")}</h3>
                <p className="text-[11.5px] font-medium text-muted-foreground">Prioritized by impact • tap to apply with AI</p>
              </div>
            </div>
            <ul className="space-y-2.5">
              {ats.suggestions.map((sug, i) => (
                <motion.li
                  key={sug}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.24 + i * 0.06 }}
                  className="group flex cursor-pointer items-start gap-3 rounded-[13px] border bg-card/90 p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F59E0B]/40 hover:shadow-lg"
                >
                  <span className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-[10px] font-extrabold text-white shadow-sm">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-[13px] font-[500] leading-[1.55]">{sug}</span>
                  <Badge variant="amber" size="sm" className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
                    +{5 + i * 2}%
                  </Badge>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Diagnostic */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[22px] border bg-card shadow-sm lg:col-span-6"
        >
          <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#10B981] to-[#EF4444]" />
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[15px] font-bold tracking-[-0.01em]">Diagnostic</h3>
              <Link href="/chat" className="group flex items-center gap-1 text-[12px] font-bold text-[#7C3AED] dark:text-[#B691FF]">
                Discuss with AI <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="tint-emerald rounded-[16px] border p-4">
                <div className="mb-3 flex items-center gap-2 text-[11.5px] font-extrabold uppercase tracking-[0.06em] text-[#047857] dark:text-[#4ADEAC]">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#10B981] text-white shadow-sm">
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                  Strengths
                </div>
                <ul className="space-y-2.5">
                  {ats.strengths.map((s) => (
                    <li key={s} className="flex gap-2 text-[12.5px] font-medium leading-[1.5]">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#10B981]" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="tint-rose rounded-[16px] border p-4">
                <div className="mb-3 flex items-center gap-2 text-[11.5px] font-extrabold uppercase tracking-[0.06em] text-[#B91C1C] dark:text-[#F98B8B]">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EF4444] text-white shadow-sm">
                    <AlertTriangle className="h-3 w-3" />
                  </div>
                  Improve
                </div>
                <ul className="space-y-2.5">
                  {ats.weaknesses.map((w) => (
                    <li key={w} className="flex gap-2 text-[12.5px] font-medium leading-[1.5]">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#EF4444]" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
