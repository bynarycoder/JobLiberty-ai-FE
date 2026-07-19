"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/providers/I18nProvider";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CircularProgress } from "@/components/ui/Progress";
import { PageHero } from "@/components/dashboard/PageHero";
import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/services/api";
import {
  TrendingUp,
  Target,
  FileText,
  Users,
  ArrowRight,
  Award,
  Clock,
  Upload,
  Sparkles,
  BarChart3,
  Zap,
  CheckCircle2,
  ArrowUpRight,
  BookOpen,
  Building2,
  LayoutDashboard,
  Globe,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Cell } from "recharts";

const weeklyActivity: { day: string; applications: number; matches: number; profile: number }[] = [];
const skillMix: { name: string; value: number; color: string }[] = [];

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color?: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-[12px] px-3.5 py-2.5 text-[12px] shadow-xl">
      <div className="mb-1 font-bold">{label}</div>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 font-medium text-muted-foreground">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          {p.name}: <span className="font-bold text-foreground">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const { t } = useI18n();

  const { data: stats } = useQuery({ queryKey: ["dashboard-stats"], queryFn: () => api.fetchDashboardStats() });
  const { data: jobs } = useQuery({ queryKey: ["jobs"], queryFn: () => api.fetchJobMatches() });
  const { data: roadmap } = useQuery({ queryKey: ["roadmap"], queryFn: () => api.fetchCareerRoadmap() });
  const { data: recent } = useQuery({ queryKey: ["recent-activity"], queryFn: () => api.fetchRecentActivity() });

  return (
    <div className="space-y-6">
      {/* ── Blue gradient hero ── */}
      <PageHero
        gradient="blue"
        icon={LayoutDashboard}
        eyebrow={t("dashboard.subtitle")}
        title={
          <>
            {t("dashboard.welcome")},{" "}
            <span className="bg-gradient-to-r from-white via-[#BFDBFE] to-[#C4B5FD] bg-clip-text text-transparent">
              Chinedu
            </span>
          </>
        }
        subtitle="Your career engine is running at full speed. 12 new matches landed today and your ATS score is up 6 points."
        actions={
          <>
            <Button size="sm" asChild className="h-[40px] rounded-full bg-white px-5 text-[#1D4ED8] shadow-lg shadow-black/10 hover:bg-white/90 hover:text-[#1E40AF]">
              <Link href="/upload">
                <Upload className="h-4 w-4" /> Upload new CV
              </Link>
            </Button>
            <Button
              size="sm"
              asChild
              variant="ghost"
              className="h-[40px] rounded-full border border-white/25 bg-white/10 px-5 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
            >
              <Link href="/chat">
                <Sparkles className="h-4 w-4" /> Ask Liberty AI
              </Link>
            </Button>
          </>
        }
        stats={[
          { label: t("dashboard.stats.resumeScore"), value: stats?.resumeScore ?? 0, suffix: "%", sub: "+4% this week" },
          { label: t("dashboard.stats.atsScore"), value: stats?.atsScore ?? 0, suffix: "%", sub: "ATS friendly" },
          { label: t("dashboard.stats.jobMatches"), value: stats?.jobMatches ?? 0, sub: "+12 today" },
          { label: t("dashboard.stats.careerReadiness"), value: stats?.careerReadiness ?? 0, suffix: "%", sub: "Target 92%" },
        ]}
      />

      {/* ── Analytics cards ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AnalyticsCard index={0} label={t("dashboard.stats.resumeScore")} value={stats?.resumeScore ?? 0} suffix="%" icon={FileText} accent="blue" trend={{ value: "+4%", up: true }} sparkline={[62, 66, 64, 71, 74, 79, 82]} sub="Excellent structure" />
        <AnalyticsCard index={1} label={t("dashboard.stats.atsScore")} value={stats?.atsScore ?? 0} suffix="%" icon={Target} accent="emerald" trend={{ value: "+6%", up: true }} ring={stats?.atsScore ?? 0} sub="Beats 68% of candidates" />
        <AnalyticsCard index={2} label={t("dashboard.stats.jobMatches")} value={stats?.jobMatches ?? 0} icon={Users} accent="purple" trend={{ value: "+12", up: true }} sparkline={[8, 14, 11, 19, 24, 33, 47]} sub="9 remote-friendly" />
        <AnalyticsCard index={3} label={t("dashboard.stats.applications")} value={stats?.applications ?? 0} icon={Award} accent="amber" trend={{ value: "+3", up: true }} sparkline={[2, 3, 3, 5, 7, 9, 12]} sub="2 interviews lined up" />
      </div>

      {/* ── Charts row ── */}
      <div className="grid gap-5 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[22px] border bg-card p-5 shadow-sm lg:col-span-7"
        >
          <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#10B981]" />
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#2563EB] text-white shadow-[0_8px_18px_-6px_rgba(37,99,235,0.65)]">
                <BarChart3 className="h-[18px] w-[18px]" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold tracking-[-0.01em]">Weekly momentum</h3>
                <p className="text-[11.5px] font-medium text-muted-foreground">Applications vs matches vs profile views</p>
              </div>
            </div>
            <Badge variant="emerald" size="sm" dot pulse>
              +38% WoW
            </Badge>
          </div>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyActivity} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="gMatches" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.32} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.32} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.30} />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} dy={6} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="matches" name="Matches" stroke="#2563EB" strokeWidth={2.6} fill="url(#gMatches)" dot={false} activeDot={{ r: 4 }} />
                <Area type="monotone" dataKey="applications" name="Applications" stroke="#10B981" strokeWidth={2.6} fill="url(#gApps)" dot={false} activeDot={{ r: 4 }} />
                <Area type="monotone" dataKey="profile" name="Profile views" stroke="#7C3AED" strokeWidth={2.6} fill="url(#gViews)" dot={false} activeDot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-[11.5px] font-semibold text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" /> Matches</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" /> Applications</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#7C3AED]" /> Profile views</span>
          </div>
        </motion.div>

        {/* Skill mix — colorful bars */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[22px] border bg-card p-5 shadow-sm lg:col-span-5"
        >
          <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#14B8A6] to-[#0EA5E9]" />
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#14B8A6] text-white shadow-[0_8px_18px_-6px_rgba(20,184,166,0.65)]">
                <TrendingUp className="h-[18px] w-[18px]" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold tracking-[-0.01em]">Skill strengths</h3>
                <p className="text-[11.5px] font-medium text-muted-foreground">AI-scored proficiency</p>
              </div>
            </div>
            <Link href="/skills" className="group flex items-center gap-1 text-[12px] font-bold text-[#0D9488] dark:text-[#4FE0D0]">
              Details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillMix} layout="vertical" margin={{ top: 0, right: 8, left: 8, bottom: 0 }} barCategoryGap="28%">
                <CartesianGrid horizontal={false} />
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={92} tick={{ fontSize: 11.5, fontWeight: 600 }} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "color-mix(in srgb, var(--primary) 6%, transparent)" }} />
                <Bar dataKey="value" name="Score" radius={[6, 10, 10, 6]} barSize={14}>
                  {skillMix.map((s) => (
                    <Cell key={s.name} fill={s.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid gap-5 lg:grid-cols-12">
        {/* ── Opportunity Mode (gradient feature card) ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="group relative overflow-hidden rounded-[22px] bg-[linear-gradient(135deg,#2563EB_0%,#1D4ED8_40%,#312E81_100%)] p-[22px] text-white shadow-[0_16px_40px_-10px_rgba(37,99,235,0.45)] transition-shadow hover:shadow-[0_24px_48px_-10px_rgba(37,99,235,0.55)] lg:col-span-5"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(at_0%_0%,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(at_100%_100%,rgba(16,185,129,0.25),transparent_60%)]" />
            <div className="absolute -right-16 -top-16 h-[180px] w-[180px] rounded-full bg-white/10 blur-2xl transition-colors duration-500 group-hover:bg-white/15" />
          </div>

          <div className="relative space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-[11px] border border-white/20 bg-white/15 backdrop-blur-sm">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-[16px] font-bold tracking-[-0.02em]">{t("dashboard.opportunityMode")}</h3>
              </div>
              <Badge className="border-white/20 bg-white/15 text-white backdrop-blur-sm hover:bg-white/20">NEW • LIVE</Badge>
            </div>

            <div className="flex items-end gap-6">
              <div>
                <div className="flex items-baseline gap-1 text-[58px] font-extrabold leading-[0.9] tracking-[-0.05em]">
                  72<span className="text-[32px] font-bold opacity-90">%</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-[13px] font-medium text-white/80">
                  <span>Career Readiness</span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/15 px-2 py-0.5 text-[11px] font-bold">
                    <TrendingUp className="h-3 w-3" /> +8% this week
                  </span>
                </div>
              </div>
              <div className="ml-auto hidden sm:block">
                <CircularProgress value={72} size={88} strokeWidth={7} variant="default">
                  <div className="text-center">
                    <div className="text-[17px] font-bold tracking-tight text-white">72%</div>
                    <div className="-mt-0.5 text-[9px] font-bold tracking-[0.1em] text-white/70">READY</div>
                  </div>
                </CircularProgress>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-[13px]">
                <span className="flex items-center gap-2 font-medium text-white/90">
                  <Target className="h-4 w-4 text-white/70" /> Target: Senior Backend Engineer
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-white/60">92% potential</span>
              </div>
              <div className="h-[9px] w-full overflow-hidden rounded-full bg-white/15 p-[3px] backdrop-blur-sm">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "72%" }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                  className="relative h-full overflow-hidden rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.5)]"
                >
                  <span className="absolute inset-0 animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </motion.div>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-white/60">6 weeks • 3 skills • 2 projects</span>
                <span className="flex items-center gap-1 font-medium text-white/90">
                  <Clock className="h-3 w-3" /> Est. 6 weeks
                </span>
              </div>
            </div>

            <Button asChild variant="secondary" className="h-[44px] w-full gap-2 rounded-full border-white/0 bg-white text-[#1D4ED8] shadow-lg shadow-black/10 hover:bg-white/90">
              <Link href="/skills">
                Open Opportunity Mode
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2563EB] text-white">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* ── Top job matches ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[22px] border bg-card shadow-sm lg:col-span-7"
        >
          <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE]" />
          <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#0EA5E9] text-white shadow-[0_8px_18px_-6px_rgba(14,165,233,0.65)]">
                <Building2 className="h-[18px] w-[18px]" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold tracking-[-0.01em]">{t("dashboard.stats.jobMatches")} • {jobs?.length || 0} new</h3>
                <p className="text-[11.5px] font-medium text-muted-foreground">Highest match 89% • Paystack Senior Backend</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" asChild className="gap-1 rounded-full">
              <Link href="/jobs">
                View all <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <div className="space-y-2.5 p-4">
            {[
              { title: "Senior Backend Engineer", company: "Paystack • Lagos", location: "Remote", match: 89, logo: "PS", logoBg: "from-[#2563EB] to-[#4F46E5]", salary: "₦1.2M–₦1.8M", featured: true },
              { title: "Backend Developer (Node.js)", company: "Flutterwave • Lekki", location: "Hybrid", match: 84, logo: "FW", logoBg: "from-[#F59E0B] to-[#F97316]", salary: "₦900K–₦1.4M" },
              { title: "Node.js Engineer", company: "Kuda Bank • Yaba", location: "On-site", match: 81, logo: "KD", logoBg: "from-[#7C3AED] to-[#9333EA]", salary: "₦800K–₦1.2M" },
            ].map((job) => (
              <Link
                key={job.title}
                href="/jobs"
                className={`group flex items-center justify-between rounded-[16px] border px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                  job.featured
                    ? "tint-blue hover:border-[#2563EB]/40"
                    : "bg-card hover:border-[#0EA5E9]/40"
                }`}
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-[13px] bg-gradient-to-br ${job.logoBg} text-[13px] font-extrabold text-white shadow-md transition-transform group-hover:scale-105`}>
                    {job.logo}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-[13.5px] font-semibold tracking-[-0.01em] transition-colors group-hover:text-[#2563EB] dark:group-hover:text-[#7FA8FF]">
                        {job.title}
                      </span>
                      {job.featured && (
                        <Badge variant="ai" size="sm" className="hidden sm:inline-flex">Top Match</Badge>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-[12px] text-muted-foreground">
                      <span>{job.company}</span>
                      <Badge variant={job.location === "Remote" ? "remote" : job.location === "Hybrid" ? "hybrid" : "onsite"} size="sm" className="text-[10px]">
                        {job.location}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="ml-3 flex shrink-0 items-center gap-3 text-right">
                  <div>
                    <div className="text-[15px] font-extrabold tabular-nums tracking-[-0.02em] text-[#10B981] dark:text-[#34D399]">{job.match}%</div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.05em] text-muted-foreground">{job.salary}</div>
                  </div>
                  <div className="hidden h-7 w-7 items-center justify-center rounded-full border border-border bg-card opacity-0 transition-opacity group-hover:opacity-100 sm:flex">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* ── AI Recommendations ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[22px] border bg-card shadow-sm lg:col-span-5"
        >
          <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#7C3AED] to-[#2563EB]" />
          <div className="flex items-center justify-between px-5 pb-3 pt-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#7C3AED] to-[#2563EB] text-white shadow-[0_8px_18px_-6px_rgba(124,58,237,0.65)]">
                <Sparkles className="h-[18px] w-[18px]" />
              </div>
              <h3 className="text-[15px] font-bold tracking-[-0.01em]">{t("dashboard.aiRecommendations")}</h3>
            </div>
            <Badge variant="emerald" size="sm" dot pulse>Live</Badge>
          </div>
          <div className="space-y-3 px-4 pb-4">
            {[
              { text: "Add Kubernetes experience — potential match +18%", impact: "High", tint: "tint-emerald", dot: "bg-[#10B981]" },
              { text: "Complete AWS certification before end of month", impact: "Medium", tint: "tint-amber", dot: "bg-[#F59E0B]" },
              { text: "Build a portfolio project showcasing CI/CD", impact: "High", tint: "tint-blue", dot: "bg-[#2563EB]" },
            ].map((rec, i) => (
              <Link key={i} href="/resources" className={cnRec(rec.tint)}>
                <span className={`mt-[3px] h-[18px] w-[18px] shrink-0 rounded-full bg-card shadow-sm ring-1 ring-border/70 flex items-center justify-center`}>
                  <span className={`h-2 w-2 rounded-full ${rec.dot}`} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-[500] leading-[1.5] tracking-[-0.01em]">{rec.text}</span>
                  <span className="mt-1 flex items-center gap-2">
                    <Badge variant={rec.impact === "High" ? "emerald" : "amber"} size="sm" className="text-[10px]">{rec.impact} Impact</Badge>
                    <span className="text-[11px] text-muted-foreground">2 weeks • Free</span>
                  </span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
            <Button variant="outline" asChild className="w-full gap-2 rounded-full">
              <Link href="/resources">
                <BookOpen className="h-4 w-4 text-[#14B8A6]" />
                Explore Resources
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* ── Career roadmap ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.44, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[22px] border bg-card shadow-sm lg:col-span-7"
        >
          <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#7C3AED] to-[#9333EA]" />
          <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#7C3AED] text-white shadow-[0_8px_18px_-6px_rgba(124,58,237,0.65)]">
                <TrendingUp className="h-[18px] w-[18px]" />
              </div>
              <h3 className="text-[15px] font-bold tracking-[-0.01em]">{t("opportunity.roadmap")}</h3>
            </div>
            <Link href="/skills" className="group flex items-center gap-1 text-[12.5px] font-bold text-[#7C3AED] transition-colors dark:text-[#B691FF]">
              View full <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="p-4">
            <div className="relative space-y-0">
              <div className="absolute bottom-[12px] left-[15px] top-[12px] w-[2px] rounded-full bg-gradient-to-b from-[#10B981] via-[#2563EB] to-border" />
              {roadmap?.steps.slice(0, 4).map((step, idx) => (
                <div
                  key={step.id}
                  className={`relative -mx-2 flex gap-4 rounded-[14px] px-2 py-3 transition-colors ${
                    step.status === "current" ? "tint-purple" : "hover:bg-card-muted/60"
                  }`}
                >
                  <div
                    className={`relative z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border-[2.5px] text-[12px] font-bold transition-all ${
                      step.status === "completed"
                        ? "border-[#10B981] bg-[#10B981] text-white shadow-[0_4px_12px_-2px_rgba(16,185,129,0.5)]"
                        : step.status === "current"
                          ? "animate-pulse-glow border-[#7C3AED] bg-[#7C3AED] text-white"
                          : "border-border-strong bg-card text-muted-foreground"
                    }`}
                  >
                    {step.status === "completed" ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                  </div>
                  <div className="min-w-0 flex-1 pb-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-[13.5px] font-semibold tracking-[-0.01em]">{step.title}</div>
                        <div className="mt-0.5 text-[12px] leading-[1.5] text-muted-foreground">{step.description}</div>
                      </div>
                      <Badge variant={step.status === "completed" ? "emerald" : step.status === "current" ? "indigo" : "secondary"} size="sm" className="shrink-0">
                        {step.status === "completed" ? "Done" : step.status === "current" ? "Now" : `${step.estimatedWeeks}w`}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Quick actions ── */}
      <div>
        <h3 className="mb-3 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
          <Zap className="h-4 w-4 text-[#F59E0B]" />
          {t("dashboard.quickActions")}
        </h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { href: "/upload", icon: Upload, label: t("nav.upload"), desc: "Analyze your CV", tint: "tint-amber", iconColor: "text-[#D97706] dark:text-[#FBBF24]" },
            { href: "/jobs", icon: Target, label: t("nav.jobs"), desc: "47 new matches", tint: "tint-sky", iconColor: "text-[#0284C7] dark:text-[#5CC8FA]" },
            { href: "/chat", icon: MessageCircle, label: "Liberty AI", desc: "Ask anything", tint: "tint-purple", iconColor: "text-[#7C3AED] dark:text-[#B691FF]" },
            { href: "/opportunity-hub", icon: Globe, label: "Opportunities", desc: "Scholarships & more", tint: "tint-emerald", iconColor: "text-[#059669] dark:text-[#4ADEAC]" },
          ].map((action, i) => (
            <motion.div
              key={action.href}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48 + i * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={action.href} className={`group flex items-center gap-3 rounded-[18px] border p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${action.tint}`}>
                <div className={`flex h-11 w-11 items-center justify-center rounded-[13px] bg-card shadow-sm ring-1 ring-border/60 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${action.iconColor}`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13.5px] font-bold tracking-[-0.01em]">{action.label}</div>
                  <div className="text-[11.5px] font-medium text-muted-foreground">{action.desc}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-foreground" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Recent activity ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.52, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[22px] border bg-card shadow-sm"
      >
        <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#F59E0B] to-[#FBBF24]" />
        <div className="flex items-center justify-between px-5 pb-3 pt-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#F59E0B] text-white shadow-[0_8px_18px_-6px_rgba(245,158,11,0.65)]">
              <Clock className="h-[18px] w-[18px]" />
            </div>
            <h3 className="text-[15px] font-bold tracking-[-0.01em]">{t("dashboard.recentActivity")}</h3>
          </div>
          <Badge variant="secondary" size="sm">Today</Badge>
        </div>
        <div className="grid grid-cols-1 gap-3 px-4 pb-4 md:grid-cols-3">
          {(recent ?? []).map((item, i) => (
            <div key={item.id} className="group flex items-center gap-3 rounded-[14px] border border-transparent bg-card-muted/70 p-3.5 transition-all hover:border-amber hover:bg-card hover:shadow-md">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-card shadow-sm ring-1 ring-border/70 transition-all group-hover:shadow">
                {[Upload, Zap, CheckCircle2][i % 3] &&
                  React.createElement([Upload, Zap, CheckCircle2][i % 3], {
                    className: ["h-4 w-4 text-[#2563EB]", "h-4 w-4 text-[#F59E0B]", "h-4 w-4 text-[#10B981]"][i % 3],
                  })}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-[500] tracking-[-0.01em]">{item.action}</div>
                <div className="text-[11px] text-muted-foreground">{item.time}</div>
              </div>
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#22C55E]" />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* Link-styled recommendation row */
function cnRec(tint: string) {
  return `group flex items-start gap-3 rounded-[14px] border p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${tint}`;
}
