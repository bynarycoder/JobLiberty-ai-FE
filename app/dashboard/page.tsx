"use client";

import React from "react";
import { useI18n } from "@/providers/I18nProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Progress, CircularProgress } from "@/components/ui/Progress";
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
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { t } = useI18n();

  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => api.fetchDashboardStats(),
  });

  const { data: jobs } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => api.fetchJobMatches(),
  });

  const { data: roadmap } = useQuery({
    queryKey: ["roadmap"],
    queryFn: () => api.fetchCareerRoadmap(),
  });

  const { data: recent } = useQuery({
    queryKey: ["recent-activity"],
    queryFn: () => api.fetchRecentActivity(),
  });

  const statCards = [
    { label: t("dashboard.stats.resumeScore"), value: stats?.resumeScore ?? 82, suffix: "%", icon: FileText, accent: "blue" as const, trend: "+4%", sub: "ATS Ready" },
    { label: t("dashboard.stats.atsScore"), value: stats?.atsScore ?? 78, suffix: "%", icon: Target, accent: "emerald" as const, trend: "+6%", sub: "Good" },
    { label: t("dashboard.stats.jobMatches"), value: stats?.jobMatches ?? 47, icon: Users, accent: "indigo" as const, trend: "+12", sub: "This week" },
    { label: t("dashboard.stats.applications"), value: stats?.applications ?? 12, icon: Award, accent: "amber" as const, trend: "+3", sub: "Active" },
    { label: t("dashboard.stats.careerReadiness"), value: stats?.careerReadiness ?? 72, suffix: "%", icon: TrendingUp, accent: "blue" as const, trend: "+8%", sub: "Target 92%" },
    { label: t("dashboard.stats.learningProgress"), value: stats?.learningProgress ?? 64, suffix: "%", icon: Clock, accent: "sky" as const, trend: "+12%", sub: "3 courses" },
  ];

  const accentColors: Record<string, { bg: string; iconBg: string; icon: string; progress: string }> = {
    blue: { bg: "from-[#EFF6FF] to-[#DBEAFE] dark:from-[#1E3A8A]/20 dark:to-[#1E40AF]/10", iconBg: "bg-[#2563EB] text-white", icon: "bg-white dark:bg-slate-800", progress: "default" },
    emerald: { bg: "from-[#ECFDF5] to-[#D1FAE5] dark:from-[#064E3B]/20 dark:to-[#065F46]/10", iconBg: "bg-[#10B981] text-white", icon: "bg-white dark:bg-slate-800", progress: "emerald" },
    indigo: { bg: "from-[#F5F3FF] to-[#EDE9FE] dark:from-[#4C1D95]/20 dark:to-[#5B21B6]/10", iconBg: "bg-[#7C3AED] text-white", icon: "bg-white dark:bg-slate-800", progress: "indigo" },
    amber: { bg: "from-[#FFFBEB] to-[#FEF3C7] dark:from-[#78350F]/20 dark:to-[#92400E]/10", iconBg: "bg-[#F59E0B] text-white", icon: "bg-white dark:bg-slate-800", progress: "amber" },
    sky: { bg: "from-[#F0F9FF] to-[#E0F2FE] dark:from-[#0C4A6E]/20 dark:to-[#075985]/10", iconBg: "bg-[#0EA5E9] text-white", icon: "bg-white dark:bg-slate-800", progress: "default" },
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-[28px] md:text-[32px] font-[800] tracking-[-0.03em] leading-[1.1] text-slate-900 dark:text-white">
              {t("dashboard.welcome")}, Chinedu 👋
            </h1>
            <Badge variant="ai" size="sm" pulse dot className="hidden md:inline-flex">
              AI Active
            </Badge>
          </div>
          <p className="text-[14.5px] leading-[1.5] font-[450] text-slate-600 dark:text-slate-400 flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[#10B981] animate-pulse" />
            {t("dashboard.subtitle")} • Last analysis 2 hours ago
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/upload">
            <Button size="sm" className="rounded-full gap-1.5">
              <Upload className="h-4 w-4" />
              Upload new CV
            </Button>
          </Link>
          <Link href="/chat">
            <Button variant="secondary" size="sm" className="rounded-full gap-1.5">
              <Sparkles className="h-4 w-4 text-[#7C3AED]" />
              Ask Liberty AI
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((stat, i) => {
          const accent = accentColors[stat.accent];
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-[18px] border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-4 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:-translate-y-[1px] transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${accent.bg} opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />
              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-[11px] ${accent.icon} border border-slate-200/60 dark:border-slate-700/50 shadow-sm group-hover:shadow-md group-hover:scale-[1.05] transition-all duration-300`}>
                    <stat.icon className="h-[18px] w-[18px] text-slate-700 dark:text-slate-200" />
                  </div>
                  <span className="inline-flex items-center rounded-full bg-[#ECFDF5] dark:bg-[#064E3B]/30 border border-[#A7F3D0] dark:border-[#064E3B]/40 px-2 py-0.5 text-[11px] font-bold text-[#065F46] dark:text-[#6EE7B7]">
                    {stat.trend}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold tracking-[0.06em] uppercase text-slate-500 dark:text-slate-400">{stat.label}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[26px] font-bold tracking-[-0.03em] tabular-nums text-slate-900 dark:text-white">{stat.value}</span>
                    {stat.suffix && <span className="text-[14px] font-bold text-slate-700 dark:text-slate-300">{stat.suffix}</span>}
                  </div>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-[#10B981]" />
                    {stat.sub}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-12 gap-5">
        {/* Opportunity Mode - Featured */}
        <Card className="lg:col-span-5 relative overflow-hidden border-[#DBEAFE] dark:border-[#1E3A8A]/40 bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#312E81] text-white shadow-[0_12px_32px_rgba(37,99,235,0.22)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.28)] group">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(at_0%_0%,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(at_100%_100%,rgba(16,185,129,0.2),transparent_60%)]" />
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="absolute -right-20 -top-20 h-[200px] w-[200px] rounded-full bg-white/10 blur-2xl group-hover:bg-white/15 transition-colors duration-500" />
          </div>

          <CardHeader className="relative pb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-[10px] bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <CardTitle className="text-white tracking-[-0.02em] text-[16px]">{t("dashboard.opportunityMode")}</CardTitle>
              </div>
              <Badge className="bg-white/15 border-white/20 text-white backdrop-blur-sm hover:bg-white/20">NEW • LIVE</Badge>
            </div>
          </CardHeader>

          <CardContent className="relative space-y-6 pt-2">
            <div className="flex items-end gap-6">
              <div>
                <div className="text-[64px] font-[800] tracking-[-0.05em] leading-[0.9] flex items-baseline gap-1">
                  72<span className="text-[36px] font-[600] opacity-90">%</span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-[13px] font-medium text-white/80">
                  <span>Career Readiness</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 border border-white/15 px-2 py-0.5 text-[11px] font-bold">
                    <TrendingUp className="h-3 w-3" />
                    +8% this week
                  </span>
                </div>
              </div>

              <div className="ml-auto hidden sm:block">
                <CircularProgress value={72} size={84} strokeWidth={7} variant="default">
                  <div className="text-center">
                    <div className="text-[16px] font-bold tracking-tight text-white">72%</div>
                    <div className="text-[10px] font-medium text-white/70 -mt-0.5">READY</div>
                  </div>
                </CircularProgress>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-[13px]">
                <span className="flex items-center gap-2 text-white/90 font-[500]">
                  <Target className="h-4 w-4 text-white/70" />
                  Target: Senior Backend Engineer
                </span>
                <span className="text-[11px] font-bold tracking-[0.06em] text-white/60 uppercase">92% potential</span>
              </div>
              <div className="h-[8px] w-full overflow-hidden rounded-full bg-white/15 backdrop-blur-sm p-1">
                <div className="h-full w-[72%] rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)] relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" />
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-white/60">6 weeks • 3 skills • 2 projects</span>
                <span className="text-white/90 font-medium flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Est. 6 weeks
                </span>
              </div>
            </div>

            <Link href="/skills" className="block">
              <Button variant="secondary" className="w-full bg-white text-[#1D4ED8] hover:bg-white/90 border-white/0 shadow-[0_4px_12px_rgba(0,0,0,0.1)] gap-2 rounded-full h-[44px]">
                Open Opportunity Mode
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2563EB] text-white">
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Job Matches */}
        <Card className="lg:col-span-7 overflow-hidden">
          <CardHeader className="pb-3 flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800/60">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-[10px] bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 border border-[#DBEAFE] dark:border-[#1E3A8A]/30 flex items-center justify-center">
                <Building2 className="h-4 w-4 text-[#2563EB] dark:text-[#60A5FA]" />
              </div>
              <div>
                <CardTitle className="text-[16px]">{t("dashboard.stats.jobMatches")} • {jobs?.length || 47} new</CardTitle>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Highest match 89% • Paystack Senior Backend</div>
              </div>
            </div>
            <Link href="/jobs">
              <Button variant="ghost" size="sm" className="rounded-full gap-1">
                View all <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-2.5">
              {[
                { title: "Senior Backend Engineer", company: "Paystack • Lagos", location: "Remote", match: 89, logo: "P", salary: "₦1.2M - ₦1.8M", featured: true },
                { title: "Backend Developer (Node.js)", company: "Flutterwave • Lekki", location: "Hybrid", match: 84, logo: "F", salary: "₦900K - ₦1.4M" },
                { title: "Node.js Engineer", company: "Kuda Bank • Yaba", location: "On-site", match: 81, logo: "K", salary: "₦800K - ₦1.2M" },
              ].map((job) => (
                <div
                  key={job.title}
                  className={`group flex items-center justify-between rounded-[14px] border px-4 py-3.5 transition-all duration-200 hover:shadow-sm hover:-translate-y-[0.5px] cursor-pointer ${
                    job.featured
                      ? "bg-[#EFF6FF]/60 dark:bg-[#1E3A8A]/10 border-[#DBEAFE] dark:border-[#1E3A8A]/30 hover:border-[#93C5FD] dark:hover:border-[#2563EB]/40"
                      : "border-slate-200/60 dark:border-slate-800 hover:bg-slate-50/70 dark:hover:bg-white/[0.04] hover:border-slate-200 dark:hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="h-10 w-10 rounded-[12px] bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center justify-center text-[13px] font-bold shadow-sm group-hover:shadow group-hover:scale-[1.02] transition-all">
                      {job.logo}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold tracking-[-0.01em] text-[13.5px] truncate group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">{job.title}</span>
                        {job.featured && <Badge variant="ai" size="sm" className="hidden sm:inline-flex">Top Match</Badge>}
                      </div>
                      <div className="flex items-center gap-2 text-[12px] text-slate-500 dark:text-slate-400">
                        <span>{job.company}</span>
                        <span className="h-2.5 w-px bg-slate-200 dark:bg-slate-700" />
                        <Badge variant={job.location === "Remote" ? "remote" : job.location === "Hybrid" ? "hybrid" : "onsite"} size="sm" className="text-[10px]">
                          {job.location}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-3 flex items-center gap-3">
                    <div>
                      <div className="font-bold text-[15px] tracking-[-0.02em] tabular-nums text-[#10B981] dark:text-[#34D399]">{job.match}%</div>
                      <div className="text-[10px] font-semibold tracking-[0.05em] uppercase text-slate-500 dark:text-slate-400">{job.salary}</div>
                    </div>
                    <div className="hidden sm:flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="lg:col-span-5">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-[10px] bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] flex items-center justify-center shadow-sm">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <CardTitle className="text-[15px]">{t("dashboard.aiRecommendations")}</CardTitle>
              </div>
              <Badge variant="emerald" size="sm" dot pulse>
                Live
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { text: "Add Kubernetes experience — potential match +18%", impact: "High", color: "emerald" },
              { text: "Complete AWS certification before end of month", impact: "Medium", color: "amber" },
              { text: "Build portfolio project showcasing CI/CD", impact: "High", color: "blue" },
            ].map((rec, i) => (
              <div key={i} className="group flex gap-3 rounded-[12px] border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-white/[0.02] p-3 hover:bg-white dark:hover:bg-white/[0.04] hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-sm transition-all">
                <div
                  className={`mt-1 h-[20px] w-[20px] shrink-0 rounded-full flex items-center justify-center ${
                    rec.color === "emerald" ? "bg-[#ECFDF5] dark:bg-[#064E3B]/40 text-[#10B981]" : rec.color === "amber" ? "bg-[#FFFBEB] dark:bg-[#78350F]/20 text-[#F59E0B]" : "bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 text-[#2563EB]"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] leading-[1.5] font-[450] tracking-[-0.01em] text-slate-700 dark:text-slate-300">{rec.text}</div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <Badge variant={rec.impact === "High" ? "emerald" : "amber"} size="sm" className="text-[10px]">
                      {rec.impact} Impact
                    </Badge>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">• 2 weeks • Free course</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100 h-6 w-6 rounded-full">
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              </div>
            ))}
            <Link href="/resources" className="block mt-1">
              <Button variant="outline" className="w-full rounded-full gap-2">
                <BookOpen className="h-4 w-4" />
                Explore Resources
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Career Roadmap */}
        <Card className="lg:col-span-7">
          <CardHeader className="flex flex-row justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800/60">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-[10px] bg-[#F5F3FF] dark:bg-[#4C1D95]/20 border border-[#DDD6FE] dark:border-[#4C1D95]/30 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-[#7C3AED] dark:text-[#A78BFA]" />
              </div>
              <CardTitle className="text-[15px]">{t("opportunity.roadmap")}</CardTitle>
            </div>
            <Link href="/skills" className="text-[12.5px] font-semibold tracking-[-0.01em] text-[#2563EB] dark:text-[#60A5FA] hover:text-[#1D4ED8] dark:hover:text-[#3B82F6] flex items-center gap-1 group">
              View full <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="relative space-y-0">
              <div className="absolute left-[14px] top-[12px] bottom-[12px] w-px bg-gradient-to-b from-[#10B981] via-[#2563EB] to-slate-200 dark:to-slate-700" />
              {roadmap?.steps.slice(0, 4).map((step, idx) => (
                <div key={step.id} className={`relative flex gap-4 py-3 rounded-[12px] px-2 -mx-2 transition-colors ${step.status === "current" ? "bg-[#EFF6FF] dark:bg-[#1E3A8A]/20" : "hover:bg-slate-50 dark:hover:bg-white/[0.03]"}`}>
                  <div className={`relative z-10 flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full border-[2.5px] text-[12px] font-bold shadow-sm transition-all ${step.status === "completed" ? "bg-[#10B981] border-[#10B981] text-white shadow-emerald-500/20" : step.status === "current" ? "bg-[#2563EB] border-[#2563EB] text-white shadow-[0_0_0_4px_rgba(37,99,235,0.15)] animate-[pulse-glow_2s_infinite]" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500"}`}>
                    {step.status === "completed" ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                  </div>
                  <div className="flex-1 min-w-0 pb-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-semibold tracking-[-0.01em] text-[13.5px] text-slate-900 dark:text-slate-100">{step.title}</div>
                        <div className="text-[12px] leading-[1.5] text-slate-500 dark:text-slate-400 mt-0.5">{step.description}</div>
                      </div>
                      <Badge variant={step.status === "completed" ? "emerald" : step.status === "current" ? "default" : "secondary"} size="sm" className="shrink-0">
                        {step.status === "completed" ? "Done" : step.status === "current" ? "Now" : `${step.estimatedWeeks}w`}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-12">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-[10px] bg-slate-50 dark:bg-white/[0.04] border border-slate-200/60 dark:border-slate-700/50 flex items-center justify-center">
                <Clock className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </div>
              <CardTitle className="text-[15px]">{t("dashboard.recentActivity")}</CardTitle>
            </div>
            <Badge variant="secondary" size="sm">
              Today
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(recent || [
                { id: 1, action: "Uploaded new resume", time: "2 hours ago" },
                { id: 2, action: "Applied to Flutterwave role", time: "Yesterday" },
                { id: 3, action: "Completed Docker course", time: "3 days ago" },
              ]).map((item) => (
                <div key={item.id} className="group flex items-center gap-3 rounded-[12px] border border-slate-200/60 dark:border-slate-800 bg-slate-50/60 dark:bg-white/[0.03] p-3.5 hover:bg-white dark:hover:bg-white/[0.05] hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-sm transition-all">
                  <div className="h-8 w-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center justify-center shadow-sm group-hover:shadow transition-all">
                    <Zap className="h-3.5 w-3.5 text-[#F59E0B]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-[500] tracking-[-0.01em] text-slate-700 dark:text-slate-300 truncate">{item.action}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{item.time}</div>
                  </div>
                  <div className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="font-semibold tracking-[-0.01em] text-[13px] uppercase text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          {t("dashboard.quickActions")}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { href: "/upload", icon: Upload, label: t("nav.upload"), desc: "Analyze your CV", color: "blue" },
            { href: "/jobs", icon: Target, label: t("nav.jobs"), desc: "47 new matches", color: "emerald" },
            { href: "/chat", icon: Users, label: "Liberty AI", desc: "Ask anything", color: "indigo" },
            { href: "/opportunity-hub", icon: Award, label: "Opportunities", desc: "Scholarships & more", color: "amber" },
          ].map((action) => (
            <Link key={action.href} href={action.href} className="group">
              <div className="relative rounded-[16px] border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-4 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:-translate-y-[1px] hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50/0 via-slate-50/0 to-slate-50/0 group-hover:from-slate-50/80 group-hover:to-white dark:group-hover:from-white/[0.04] dark:group-hover:to-white/[0.02] transition-all" />
                <div className="relative flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-[12px] flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-[1.05] transition-all duration-300 ${action.color === "blue" ? "bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 text-[#2563EB] dark:text-[#60A5FA] border border-[#DBEAFE] dark:border-[#1E3A8A]/30" : action.color === "emerald" ? "bg-[#ECFDF5] dark:bg-[#064E3B]/20 text-[#059669] dark:text-[#34D399] border border-[#A7F3D0] dark:border-[#064E3B]/30" : action.color === "indigo" ? "bg-[#F5F3FF] dark:bg-[#4C1D95]/20 text-[#7C3AED] dark:text-[#A78BFA] border border-[#DDD6FE] dark:border-[#4C1D95]/30" : "bg-[#FFFBEB] dark:bg-[#78350F]/20 text-[#D97706] dark:text-[#FBBF24] border border-[#FDE68A] dark:border-[#78350F]/30"}`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold tracking-[-0.01em] text-[13.5px] text-slate-900 dark:text-slate-100">{action.label}</div>
                    <div className="text-[11.5px] text-slate-500 dark:text-slate-400">{action.desc}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
