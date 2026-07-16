"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Activity,
  TrendingUp,
  MapPin,
  Banknote,
  Flame,
  Clock,
  Users,
  Calendar,
  Briefcase,
} from "lucide-react";
import { SkeletonCards } from "./SkeletonCards";
import type { WeeklyInsights as WeeklyInsightsType } from "@/lib/types";

interface WeeklyInsightsProps {
  insights: WeeklyInsightsType | undefined;
  isLoading: boolean;
}

const CHART_COLORS = [
  "#2563EB",
  "#10B981",
  "#7C3AED",
  "#F59E0B",
  "#0EA5E9",
  "#EF4444",
  "#EC4899",
  "#14B8A6",
];

function SectionCard({
  title,
  icon: Icon,
  accent,
  children,
  badge,
}: {
  title: string;
  icon: React.ElementType;
  accent: string;
  children: React.ReactNode;
  badge?: string;
}) {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2.5">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-[10px] ${accent} text-white shadow-sm`}
          >
            <Icon className="h-4 w-4" />
          </div>
          <CardTitle className="text-[14px] flex-1">{title}</CardTitle>
          {badge && (
            <Badge variant="secondary" size="sm">
              {badge}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-1">{children}</CardContent>
    </Card>
  );
}

export function WeeklyInsights({ insights, isLoading }: WeeklyInsightsProps) {
  const { t } = useI18n();

  if (isLoading || !insights) {
    return (
      <section>
        <div className="mb-5 h-8 w-64 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
        <SkeletonCards count={6} columns={3} />
      </section>
    );
  }

  const skillChartData = insights.mostInDemandSkills.map((s) => ({
    name: s.skill,
    score: s.demandScore,
    change: s.changePercent,
  }));

  const stateChartData = insights.mostActiveStates.map((s) => ({
    name: s.state.replace(" FCT", ""),
    openings: s.openings,
  }));

  return (
    <section aria-label={t("opportunityHub.weeklyInsights.title")}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#10B981] to-[#059669] text-white shadow-sm">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-[18px] font-[700] tracking-[-0.02em] text-slate-900 dark:text-white">
              {t("opportunityHub.weeklyInsights.title")}
            </h2>
            <p className="text-[12.5px] text-slate-500 dark:text-slate-400">
              {t("opportunityHub.weeklyInsights.subtitle")} · {insights.weekLabel}
            </p>
          </div>
        </div>
        <Badge variant="emerald" size="sm" dot pulse>
          Live insights
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Most in-demand skills chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="xl:col-span-2"
        >
          <SectionCard
            title="Most in-demand skills"
            icon={TrendingUp}
            accent="bg-gradient-to-br from-[#2563EB] to-[#1D4ED8]"
            badge="This week"
          >
            <div className="h-[220px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillChartData} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10 }}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                    height={50}
                  />
                  <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--border)",
                      fontSize: 12,
                      background: "var(--card)",
                    }}
                    formatter={(value) => [`${value}`, "Demand score"]}
                  />
                  <Bar dataKey="score" radius={[6, 6, 0, 0]} maxBarSize={36}>
                    {skillChartData.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {insights.mostInDemandSkills.slice(0, 4).map((s) => (
                <Badge key={s.skill} variant="emerald" size="sm" className="gap-1">
                  {s.skill} <span className="opacity-70">+{s.changePercent}%</span>
                </Badge>
              ))}
            </div>
          </SectionCard>
        </motion.div>

        {/* Fastest-growing industries */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <SectionCard
            title="Fastest-growing industries"
            icon={Flame}
            accent="bg-gradient-to-br from-[#F59E0B] to-[#D97706]"
          >
            <ul className="space-y-2.5 mt-1">
              {insights.fastestGrowingIndustries.map((ind, i) => (
                <li key={ind.industry} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[12.5px] font-semibold text-slate-800 dark:text-slate-100 truncate">
                        {ind.industry}
                      </span>
                      <span className="text-[12px] font-bold text-[#10B981] tabular-nums">
                        +{ind.growthPercent}%
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#10B981]"
                        style={{ width: `${Math.min(100, ind.growthPercent * 1.8)}%` }}
                      />
                    </div>
                    <div className="mt-0.5 text-[10.5px] text-slate-500">
                      {ind.openings} openings
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>
        </motion.div>

        {/* Most active states chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          <SectionCard
            title="Most active states hiring"
            icon={MapPin}
            accent="bg-gradient-to-br from-[#7C3AED] to-[#6D28D9]"
          >
            <div className="h-[180px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stateChartData}
                  layout="vertical"
                  margin={{ top: 0, right: 8, left: 0, bottom: 0 }}
                >
                  <XAxis type="number" tick={{ fontSize: 10 }} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={56}
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--border)",
                      fontSize: 12,
                      background: "var(--card)",
                    }}
                  />
                  <Bar dataKey="openings" fill="#7C3AED" radius={[0, 6, 6, 0]} maxBarSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </motion.div>

        {/* Average salaries */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
        >
          <SectionCard
            title="Average salaries"
            icon={Banknote}
            accent="bg-gradient-to-br from-[#10B981] to-[#059669]"
            badge="NGN / yr"
          >
            <ul className="space-y-2 mt-1">
              {insights.averageSalaries.map((s) => (
                <li
                  key={s.role}
                  className="flex items-center justify-between rounded-[10px] border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-white/[0.03] px-3 py-2"
                >
                  <div>
                    <div className="text-[12.5px] font-semibold text-slate-800 dark:text-slate-100">
                      {s.role}
                    </div>
                    <div className="text-[10.5px] text-slate-500">{s.range}</div>
                  </div>
                  <div className="text-[13px] font-bold text-[#059669] dark:text-[#34D399] tabular-nums">
                    {s.averageSalary}
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>
        </motion.div>

        {/* Trending opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
        >
          <SectionCard
            title="Trending opportunities"
            icon={Flame}
            accent="bg-gradient-to-br from-[#EF4444] to-[#DC2626]"
          >
            <ul className="space-y-2 mt-1">
              {insights.trendingOpportunities.map((op) => (
                <li
                  key={op.title}
                  className="flex items-start gap-2.5 rounded-[10px] border border-slate-100 dark:border-slate-800 px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors"
                >
                  <Briefcase className="h-4 w-4 text-[#EF4444] mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[12.5px] font-semibold text-slate-800 dark:text-slate-100 truncate">
                      {op.title}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {op.organization} · {op.type}
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 tabular-nums shrink-0">
                    {(op.views / 1000).toFixed(1)}k
                  </span>
                </li>
              ))}
            </ul>
          </SectionCard>
        </motion.div>

        {/* Upcoming deadlines */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
        >
          <SectionCard
            title="Upcoming deadlines"
            icon={Clock}
            accent="bg-gradient-to-br from-[#0EA5E9] to-[#0284C7]"
          >
            <ul className="space-y-2 mt-1">
              {insights.upcomingDeadlines.map((d) => (
                <li
                  key={d.title}
                  className="flex items-center justify-between rounded-[10px] border border-slate-100 dark:border-slate-800 px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-semibold text-slate-800 dark:text-slate-100 truncate">
                      {d.title}
                    </div>
                    <div className="text-[11px] text-slate-500">{d.organization}</div>
                  </div>
                  <Badge
                    variant={d.daysLeft <= 21 ? "rose" : "sky"}
                    size="sm"
                    className="shrink-0 tabular-nums"
                  >
                    {d.daysLeft}d left
                  </Badge>
                </li>
              ))}
            </ul>
          </SectionCard>
        </motion.div>

        {/* Community events */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SectionCard
            title="Community events"
            icon={Users}
            accent="bg-gradient-to-br from-[#EC4899] to-[#DB2777]"
          >
            <ul className="space-y-2 mt-1">
              {insights.communityEvents.map((ev) => (
                <li
                  key={ev.id}
                  className="rounded-[10px] border border-slate-100 dark:border-slate-800 px-3 py-2.5"
                >
                  <div className="text-[12.5px] font-semibold text-slate-800 dark:text-slate-100">
                    {ev.title}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {ev.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {ev.location}
                    </span>
                    {ev.attendees && (
                      <span className="inline-flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {ev.attendees}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>
        </motion.div>

        {/* Tech meetups */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
        >
          <SectionCard
            title="Tech meetups"
            icon={Users}
            accent="bg-gradient-to-br from-[#6366F1] to-[#4F46E5]"
          >
            <ul className="space-y-2 mt-1">
              {insights.techMeetups.map((ev) => (
                <li
                  key={ev.id}
                  className="rounded-[10px] border border-slate-100 dark:border-slate-800 px-3 py-2.5"
                >
                  <div className="text-[12.5px] font-semibold text-slate-800 dark:text-slate-100">
                    {ev.title}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {ev.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {ev.location}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>
        </motion.div>

        {/* Career fairs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
        >
          <SectionCard
            title="Career fairs"
            icon={Briefcase}
            accent="bg-gradient-to-br from-[#14B8A6] to-[#0D9488]"
          >
            <ul className="space-y-2 mt-1">
              {insights.careerFairs.map((ev) => (
                <li
                  key={ev.id}
                  className="rounded-[10px] border border-slate-100 dark:border-slate-800 px-3 py-2.5"
                >
                  <div className="text-[12.5px] font-semibold text-slate-800 dark:text-slate-100">
                    {ev.title}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {ev.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {ev.location}
                    </span>
                    {ev.attendees && (
                      <Badge variant="emerald" size="sm" className="tabular-nums">
                        {ev.attendees.toLocaleString()} expected
                      </Badge>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>
        </motion.div>
      </div>
    </section>
  );
}
