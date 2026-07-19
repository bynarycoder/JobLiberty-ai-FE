"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Briefcase, GraduationCap, Laptop, Trophy, BookOpen, Sparkles, ArrowUpRight, TrendingUp } from "lucide-react";
import type { OpportunityStats } from "@/lib/types";

interface OpportunityHeroProps {
  stats: OpportunityStats | undefined;
}

export function OpportunityHero({ stats }: OpportunityHeroProps) {
  const { t } = useI18n();

  const statItems = [
    { key: "today", value: stats?.totalOpportunities ?? 0, labelKey: "opportunityHub.hero.todayOpportunities", icon: Sparkles, color: "blue", accent: "from-[#EFF6FF] to-[#DBEAFE] dark:from-[#1E3A8A]/20 dark:to-[#1E40AF]/10" },
    { key: "jobs", value: stats?.availableJobs ?? 0, labelKey: "opportunityHub.hero.availableJobs", icon: Briefcase, color: "emerald", accent: "from-[#ECFDF5] to-[#D1FAE5] dark:from-[#064E3B]/20 dark:to-[#065F46]/10" },
    { key: "scholarships", value: stats?.scholarships ?? 0, labelKey: "opportunityHub.hero.scholarships", icon: GraduationCap, color: "indigo", accent: "from-[#F5F3FF] to-[#EDE9FE] dark:from-[#4C1D95]/20 dark:to-[#5B21B6]/10" },
    { key: "internships", value: stats?.internships ?? 0, labelKey: "opportunityHub.hero.internships", icon: Laptop, color: "amber", accent: "from-[#FFFBEB] to-[#FEF3C7] dark:from-[#78350F]/20 dark:to-[#92400E]/10" },
    { key: "hackathons", value: stats?.hackathons ?? 0, labelKey: "opportunityHub.hero.hackathons", icon: Trophy, color: "sky", accent: "from-[#F0F9FF] to-[#E0F2FE] dark:from-[#0C4A6E]/20 dark:to-[#075985]/10" },
    { key: "learning", value: stats?.learningResources ?? 0, labelKey: "opportunityHub.hero.learningResources", icon: BookOpen, color: "rose", accent: "from-[#FFF1F2] to-[#FFE4E6] dark:from-[#881337]/20 dark:to-[#9F1239]/10" },
  ];

  const colorMap: Record<string, { iconBg: string; icon: string; border: string }> = {
    blue: { iconBg: "bg-[#2563EB] text-white", icon: "text-[#2563EB] dark:text-[#60A5FA]", border: "border-[#BFDBFE] dark:border-[#1E3A8A]/40" },
    emerald: { iconBg: "bg-[#10B981] text-white", icon: "text-[#059669] dark:text-[#34D399]", border: "border-[#A7F3D0] dark:border-[#064E3B]/40" },
    indigo: { iconBg: "bg-[#7C3AED] text-white", icon: "text-[#7C3AED] dark:text-[#A78BFA]", border: "border-[#DDD6FE] dark:border-[#4C1D95]/30" },
    amber: { iconBg: "bg-[#F59E0B] text-white", icon: "text-[#D97706] dark:text-[#FBBF24]", border: "border-[#FDE68A] dark:border-[#78350F]/30" },
    sky: { iconBg: "bg-[#0EA5E9] text-white", icon: "text-[#0284C7] dark:text-[#38BDF8]", border: "border-[#BAE6FD] dark:border-[#0C4A6E]/30" },
    rose: { iconBg: "bg-[#E11D48] text-white", icon: "text-[#E11D48] dark:text-[#FB7185]", border: "border-[#FECDD3] dark:border-[#881337]/30" },
  };

  return (
    <section aria-label={t("opportunityHub.hero.title")} className="space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[24px] bg-[linear-gradient(125deg,#047857_0%,#059669_45%,#10B981_80%,#14B8A6_100%)] p-[1.5px] shadow-[0_16px_40px_-10px_rgba(16,185,129,0.4)]"
      >
        <div className="relative overflow-hidden rounded-[22px] bg-[linear-gradient(125deg,#047857_0%,#059669_45%,#10B981_80%,#0D9488_100%)] p-7 lg:p-8">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(at_0%_0%,rgba(255,255,255,0.16),transparent_50%)]" />
            <div className="absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -left-24 -bottom-24 h-[300px] w-[300px] rounded-full bg-[#2563EB]/25 blur-3xl" />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
                backgroundSize: "34px 34px",
              }}
            />
          </div>

          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm px-3 py-1 text-[11px] font-bold tracking-[0.06em] text-white/90 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
                LIVE • UPDATED REGULARLY
              </div>
              <h2 className="text-[24px] lg:text-[28px] font-[800] tracking-[-0.03em] leading-[1.1] text-white">{t("opportunityHub.hero.title")}</h2>
              <p className="mt-2 text-[14px] leading-[1.6] text-white/80 max-w-[52ch]">{t("opportunityHub.hero.description")}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge className="bg-white/15 border-white/20 text-white backdrop-blur-sm">🔥 {stats?.totalOpportunities ? `${stats.totalOpportunities.toLocaleString()} opportunities` : "Loading opportunities..."}</Badge>
                <Badge className="bg-[#10B981] border-[#10B981] text-white">✓ Verified by Liberty AI</Badge>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-[16px] bg-white/10 backdrop-blur-md border border-white/15 p-4 min-w-[200px]">
                <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.06em] uppercase text-white/60 mb-2">
                  <TrendingUp className="h-3 w-3" />
                  Trending Now
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Backend roles", trend: "Trending" },
                    { label: "Remote first", trend: "Popular" },
                    { label: "AI/ML", trend: "Growing" },
                  ].map((it) => (
                    <div key={it.label} className="flex justify-between text-[12px] text-white/90">
                      <span>{it.label}</span>
                      <span className="font-bold text-[#6EE7B7]">{it.trend}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {statItems.map((stat, idx) => {
          const colors = colorMap[stat.color];
          return (
            <motion.div key={stat.key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 + idx * 0.05, ease: [0.16, 1, 0.3, 1] }}>
              <Card className="group relative overflow-hidden p-4 hover:shadow-[0_8px_20px_rgba(15,23,42,0.06)] hover:-translate-y-[1px] transition-all duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-[10px] ${colors.iconBg} border ${colors.border} shadow-sm group-hover:shadow group-hover:scale-[1.05] transition-all`}>
                      <stat.icon className="h-4 w-4" />
                    </div>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                  <div className="text-[22px] font-[800] tracking-[-0.03em] leading-none text-slate-900 dark:text-white tabular-nums">{stat.value.toLocaleString()}</div>
                  <div className="mt-1 text-[11px] font-semibold tracking-[0.04em] uppercase text-slate-500 dark:text-slate-400 leading-[1.2]">{t(stat.labelKey)}</div>
                  <div className="mt-2 h-1 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full w-[68%] rounded-full bg-slate-900 dark:bg-white" />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
