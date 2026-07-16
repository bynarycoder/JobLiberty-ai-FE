"use client";

import React from "react";
import { useI18n } from "@/providers/I18nProvider";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/services/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Progress, CircularProgress } from "@/components/ui/Progress";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, AlertTriangle, Sparkles, FileText, ArrowRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function ATSAnalysisPage() {
  const { t } = useI18n();
  const { data: ats } = useQuery({ queryKey: ["ats"], queryFn: () => api.fetchATSAnalysis() });

  if (!ats)
    return (
      <div className="grid lg:grid-cols-2 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-[240px] rounded-[20px] bg-white dark:bg-[#1E293B] border border-slate-200/60 dark:border-slate-800 animate-pulse" />
        ))}
      </div>
    );

  const scoreData = [
    { name: "Keyword Match", value: ats.keywordMatch, desc: "Relevant skills & job terms", variant: "default" as const, icon: "🎯" },
    { name: "Formatting", value: ats.formatting, desc: "Layout & ATS parsing", variant: "emerald" as const, icon: "📄" },
    { name: "Readability", value: ats.readability, desc: "Clarity & conciseness", variant: "indigo" as const, icon: "✍️" },
    { name: "Skills", value: ats.skills, desc: "Technical breadth", variant: "amber" as const, icon: "💡" },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 85) return { variant: "emerald" as const, label: "Excellent", color: "#10B981" };
    if (score >= 70) return { variant: "default" as const, label: "Good", color: "#2563EB" };
    if (score >= 50) return { variant: "amber" as const, label: "Fair", color: "#F59E0B" };
    return { variant: "amber" as const, label: "Needs work", color: "#EF4444" };
  };

  const overall = getScoreColor(ats.overallScore);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-[30px] font-[800] tracking-[-0.03em] leading-[1.1] text-slate-900 dark:text-white">{t("analysis.title")}</h1>
            <Badge variant="emerald" dot pulse>
              AI Verified
            </Badge>
          </div>
          <p className="text-[13.5px] font-[450] text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-2">
            Overall ATS Compatibility: <span className="font-bold text-[#10B981] dark:text-[#34D399]">{ats.overallScore}%</span> • <span className="inline-flex items-center gap-1"><TrendingUp className="h-3 w-3" /> +6% vs last scan</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="rounded-full">
            <FileText className="h-4 w-4" />
            Export PDF
          </Button>
          <Button size="sm" className="rounded-full gap-1.5">
            Improve Score <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-5">
        {/* Score Visualization */}
        <Card className="lg:col-span-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#EFF6FF]/80 via-transparent to-[#ECFDF5]/60 dark:from-[#1E3A8A]/10 dark:to-[#064E3B]/5" />
          <CardHeader className="relative pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-[8px] bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 border border-[#DBEAFE] dark:border-[#1E3A8A]/30 flex items-center justify-center">
                  <Sparkles className="h-3.5 w-3.5 text-[#2563EB] dark:text-[#60A5FA]" />
                </div>
                {t("analysis.overallScore")}
              </CardTitle>
              <Badge variant={overall.variant} size="sm">
                {overall.label}
              </Badge>
            </div>
            <CardDescription>Real ATS systems • 97% accuracy</CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex flex-col items-center py-4">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                <CircularProgress value={ats.overallScore} size={168} strokeWidth={12} variant={overall.variant as any}>
                  <div className="text-center">
                    <div className="text-[44px] font-[800] tracking-[-0.04em] leading-none text-slate-900 dark:text-white tabular-nums">{ats.overallScore}</div>
                    <div className="text-[11px] font-bold tracking-[0.08em] uppercase text-slate-500 dark:text-slate-400 mt-1">Overall</div>
                    <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#ECFDF5] dark:bg-[#064E3B]/30 border border-[#A7F3D0] dark:border-[#064E3B]/40 px-2 py-0.5 text-[10px] font-bold text-[#065F46] dark:text-[#6EE7B7]">
                      <span className="h-1 w-1 rounded-full bg-[#10B981] animate-pulse" />
                      LIVE
                    </div>
                  </div>
                </CircularProgress>
              </motion.div>

              <div className="mt-6 w-full grid grid-cols-3 gap-2">
                {[
                  { label: "Pass Rate", value: "92%" },
                  { label: "Top Percentile", value: "18%" },
                  { label: "Scans", value: "1,240" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center rounded-[12px] border border-slate-200/60 dark:border-slate-700/50 bg-white dark:bg-white/[0.03] p-2.5">
                    <div className="text-[14px] font-bold tracking-tight text-slate-900 dark:text-white">{stat.value}</div>
                    <div className="text-[10px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Breakdown */}
        <Card className="lg:col-span-7">
          <CardHeader className="pb-3">
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>How each section performs against ATS filters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 pt-2">
            {scoreData.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="group"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="flex items-center gap-2 text-[13.5px] font-[550] tracking-[-0.01em] text-slate-700 dark:text-slate-300">
                    <span className="text-[14px]">{item.icon}</span>
                    {item.name}
                    <span className="text-[11px] font-[450] text-slate-500 dark:text-slate-400">• {item.desc}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[12px] font-bold px-2 py-0.5 rounded-full border ${item.value >= 80 ? "bg-[#ECFDF5] dark:bg-[#064E3B]/20 border-[#A7F3D0] dark:border-[#064E3B]/30 text-[#065F46] dark:text-[#6EE7B7]" : item.value >= 60 ? "bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 border-[#BFDBFE] dark:border-[#1E3A8A]/30 text-[#1D4ED8] dark:text-[#93C5FD]" : "bg-[#FFFBEB] dark:bg-[#78350F]/20 border-[#FDE68A] dark:border-[#78350F]/30 text-[#92400E] dark:text-[#FCD34D]"}`}>{item.value}%</span>
                  </div>
                </div>
                <Progress value={item.value} variant={item.variant} size="default" showValue={false} />
              </motion.div>
            ))}

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[12px] font-medium text-slate-500 dark:text-slate-400">Last scanned 2 hours ago • Next auto-scan in 24h</span>
              <Button variant="ghost" size="sm" className="h-7 rounded-full text-[12px] gap-1">
                <Sparkles className="h-3 w-3" />
                Re-scan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Suggestions */}
        <Card className="md:col-span-6 lg:col-span-6 border-amber-200/60 dark:border-amber-900/30 bg-gradient-to-br from-[#FFFBEB]/60 to-white dark:from-[#78350F]/10 dark:to-[#1E293B]">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-[8px] bg-[#FFFBEB] dark:bg-[#78350F]/20 border border-[#FDE68A] dark:border-[#78350F]/30 flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-[#D97706] dark:text-[#FBBF24]" />
              </div>
              {t("analysis.suggestions")}
            </CardTitle>
            <CardDescription>Prioritized by impact • Tap to apply with AI</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {ats.suggestions.map((sug, i) => (
                <motion.li
                  key={sug}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                  className="group flex gap-3 rounded-[12px] border border-amber-100 dark:border-amber-900/20 bg-white dark:bg-white/[0.03] p-3 hover:shadow-sm hover:border-amber-200 dark:hover:border-amber-800/30 cursor-pointer transition-all"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFFBEB] dark:bg-[#78350F]/20 border border-[#FDE68A] dark:border-[#78350F]/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
                  </span>
                  <span className="text-[13px] leading-[1.5] font-[450] text-slate-700 dark:text-slate-300 flex-1">{sug}</span>
                  <Badge variant="amber" size="sm" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    +{5 + i * 2}%
                  </Badge>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Strengths & Weaknesses */}
        <Card className="md:col-span-6 lg:col-span-6">
          <CardHeader className="pb-3">
            <CardTitle>Diagnostic</CardTitle>
            <CardDescription>What’s working vs needs attention</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="rounded-[14px] border border-[#A7F3D0] dark:border-[#064E3B]/30 bg-[#ECFDF5]/60 dark:bg-[#064E3B]/10 p-4">
              <div className="flex items-center gap-2 font-semibold text-[12.5px] tracking-[0.04em] uppercase text-[#065F46] dark:text-[#6EE7B7] mb-3">
                <div className="h-5 w-5 rounded-full bg-[#10B981] flex items-center justify-center text-white">
                  <CheckCircle2 className="h-3 w-3" />
                </div>
                Strengths
              </div>
              <ul className="space-y-2.5">
                {ats.strengths.map((s) => (
                  <li key={s} className="flex gap-2 text-[12.5px] leading-[1.5] text-slate-700 dark:text-slate-300">
                    <span className="mt-[7px] h-1 w-1 rounded-full bg-[#10B981] shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[14px] border border-[#FECDD3] dark:border-[#7F1D1D]/30 bg-[#FFF1F2]/60 dark:bg-[#7F1D1D]/10 p-4">
              <div className="flex items-center gap-2 font-semibold text-[12.5px] tracking-[0.04em] uppercase text-[#9F1239] dark:text-[#FDA4AF] mb-3">
                <div className="h-5 w-5 rounded-full bg-[#EF4444] flex items-center justify-center text-white">
                  <AlertTriangle className="h-3 w-3" />
                </div>
                Improve
              </div>
              <ul className="space-y-2.5">
                {ats.weaknesses.map((w) => (
                  <li key={w} className="flex gap-2 text-[12.5px] leading-[1.5] text-slate-700 dark:text-slate-300">
                    <span className="mt-[7px] h-1 w-1 rounded-full bg-[#EF4444] shrink-0" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
