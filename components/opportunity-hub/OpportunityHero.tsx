"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { Card } from "@/components/ui/Card";
import { Briefcase, GraduationCap, Laptop, Trophy, BookOpen, Sparkles } from "lucide-react";
import type { OpportunityStats } from "@/lib/types";

interface OpportunityHeroProps {
  stats: OpportunityStats | undefined;
}

export function OpportunityHero({ stats }: OpportunityHeroProps) {
  const { t } = useI18n();

  const statItems = [
    { key: "today", value: stats?.totalOpportunities ?? 0, labelKey: "opportunityHub.hero.todayOpportunities", icon: Sparkles, color: "from-blue-500 to-blue-600" },
    { key: "jobs", value: stats?.availableJobs ?? 0, labelKey: "opportunityHub.hero.availableJobs", icon: Briefcase, color: "from-emerald-500 to-emerald-600" },
    { key: "scholarships", value: stats?.scholarships ?? 0, labelKey: "opportunityHub.hero.scholarships", icon: GraduationCap, color: "from-violet-500 to-violet-600" },
    { key: "internships", value: stats?.internships ?? 0, labelKey: "opportunityHub.hero.internships", icon: Laptop, color: "from-amber-500 to-amber-600" },
    { key: "hackathons", value: stats?.hackathons ?? 0, labelKey: "opportunityHub.hero.hackathons", icon: Trophy, color: "from-cyan-500 to-cyan-600" },
    { key: "learning", value: stats?.learningResources ?? 0, labelKey: "opportunityHub.hero.learningResources", icon: BookOpen, color: "from-orange-500 to-orange-600" },
  ];

  return (
    <section aria-label={t("opportunityHub.hero.title")}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 text-white shadow-lg lg:p-10"
      >
        <div className="relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight lg:text-3xl">{t("opportunityHub.hero.title")}</h2>
            <p className="mt-2 text-blue-100">{t("opportunityHub.hero.description")}</p>
          </div>
        </div>
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-12 -left-12 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" aria-hidden="true" />
      </motion.div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {statItems.map((stat, idx) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + idx * 0.05 }}
          >
            <Card className="relative overflow-hidden p-5">
              <div className={`absolute right-0 top-0 h-16 w-16 -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br ${stat.color} opacity-10`} aria-hidden="true" />
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t(stat.labelKey)}</p>
                  <div className="mt-1 text-3xl font-semibold tabular-nums tracking-tighter">{stat.value.toLocaleString()}</div>
                </div>
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-white`}>
                  <stat.icon className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
