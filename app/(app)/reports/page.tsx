"use client";

import React from "react";
import { useI18n } from "@/providers/I18nProvider";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/services/api";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PageHero } from "@/components/dashboard/PageHero";
import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard";
import { PieChart, Download, Share2, Printer, FileText, Target, Briefcase, TrendingUp, Sparkles, CalendarDays, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  AreaChart, Area, BarChart, Bar, Cell, PieChart as RPieChart, Pie, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, RadialBarChart, RadialBar, PolarAngleAxis,
} from "recharts";

const monthlyProgress = [
  { month: "Feb", score: 58, matches: 12, applications: 4 },
  { month: "Mar", score: 64, matches: 18, applications: 7 },
  { month: "Apr", score: 69, matches: 26, applications: 9 },
  { month: "May", score: 74, matches: 34, applications: 10 },
  { month: "Jun", score: 79, matches: 41, applications: 11 },
  { month: "Jul", score: 82, matches: 47, applications: 12 },
];

const funnel = [
  { stage: "Matches", value: 47, color: "#2563EB" },
  { stage: "Reviewed", value: 32, color: "#0EA5E9" },
  { stage: "Applied", value: 12, color: "#14B8A6" },
  { stage: "Interviews", value: 4, color: "#F59E0B" },
];

const scoreBreakdown = [
  { name: "Resume", value: 82, color: "#2563EB" },
  { name: "ATS", value: 78, color: "#7C3AED" },
  { name: "Skills", value: 72, color: "#10B981" },
  { name: "Interview", value: 66, color: "#F59E0B" },
];

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color?: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-[12px] px-3.5 py-2.5 text-[12px] shadow-xl">
      {label && <div className="mb-1 font-bold">{label}</div>}
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 font-medium text-muted-foreground">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          {p.name}: <span className="font-bold text-foreground">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function ReportsPage() {
  const { t } = useI18n();
  const { data: report } = useQuery({ queryKey: ["report"], queryFn: () => api.fetchReports() });

  const download = async () => {
    toast.promise(api.downloadReport(), {
      loading: "Generating your career report…",
      success: "Report downloaded as PDF",
      error: "Couldn’t generate report — try again",
    });
  };

  return (
    <div className="space-y-6">
      {/* ── Teal gradient hero ── */}
      <PageHero
        gradient="teal"
        icon={PieChart}
        eyebrow={t("reports.subtitle")}
        title={t("reports.title")}
        subtitle="A board-room view of your career engine — six months of progress, conversions and AI-validated growth, exportable in one click."
        stats={[
          { label: "Current score", value: report?.resumeScore ?? 82, suffix: "%", sub: "+24 pts since Feb" },
          { label: "Jobs matched", value: report?.jobsMatched ?? 47, sub: "This month" },
          { label: "Response rate", value: 33, suffix: "%", sub: "2× market average" },
          { label: "Reports generated", value: 14, sub: "Lifetime" },
        ]}
        actions={
          <>
            <Button size="sm" onClick={download} className="h-[40px] gap-1.5 rounded-full bg-white px-5 text-[#0F766E] shadow-lg shadow-black/10 hover:bg-white/90">
              <Download className="h-4 w-4" /> {t("reports.downloadPDF")}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => toast.success("Share link copied to clipboard")} className="h-[40px] gap-1.5 rounded-full border border-white/25 bg-white/10 px-5 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white">
              <Share2 className="h-4 w-4" /> {t("reports.share")}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => toast.info("Opening print dialog…")} className="h-[40px] gap-1.5 rounded-full border border-white/25 bg-white/10 px-5 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white">
              <Printer className="h-4 w-4" /> {t("reports.print")}
            </Button>
          </>
        }
      />

      {/* ── Analytics cards ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AnalyticsCard index={0} label="Resume score" value={report?.resumeScore ?? 82} suffix="%" icon={FileText} accent="blue" trend={{ value: "+4", up: true }} sparkline={[58, 64, 69, 74, 79, 82]} sub="vs last month" />
        <AnalyticsCard index={1} label="ATS score" value={report?.atsScore ?? 78} suffix="%" icon={Target} accent="purple" trend={{ value: "+6", up: true }} ring={report?.atsScore ?? 78} sub="Parser-proof" />
        <AnalyticsCard index={2} label="Jobs matched" value={report?.jobsMatched ?? 47} icon={Briefcase} accent="teal" trend={{ value: "+12", up: true }} sparkline={[12, 18, 26, 34, 41, 47]} sub="6-month climb" />
        <AnalyticsCard index={3} label="Interview rate" value={33} suffix="%" icon={TrendingUp} accent="amber" trend={{ value: "+9", up: true }} sparkline={[8, 14, 19, 24, 29, 33]} sub="Per 12 applications" />
      </div>

      {/* ── Charts ── */}
      <div className="grid gap-5 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[22px] border bg-card p-5 shadow-sm lg:col-span-7"
        >
          <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#14B8A6] via-[#2563EB] to-[#7C3AED]" />
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#14B8A6] text-white shadow-[0_8px_18px_-6px_rgba(20,184,166,0.65)]">
                <TrendingUp className="h-[18px] w-[18px]" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold tracking-[-0.01em]">6-month trajectory</h3>
                <p className="text-[11.5px] font-medium text-muted-foreground">Composite career score &amp; match volume</p>
              </div>
            </div>
            <Badge variant="emerald" size="sm" dot pulse>+41% growth</Badge>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyProgress} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="repScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14B8A6" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#14B8A6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="repMatches" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="repApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} dy={6} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="score" name="Career score" stroke="#14B8A6" strokeWidth={2.8} fill="url(#repScore)" dot={false} activeDot={{ r: 4 }} />
                <Area type="monotone" dataKey="matches" name="Matches" stroke="#2563EB" strokeWidth={2.6} fill="url(#repMatches)" dot={false} activeDot={{ r: 4 }} />
                <Area type="monotone" dataKey="applications" name="Applications" stroke="#7C3AED" strokeWidth={2.6} fill="url(#repApps)" dot={false} activeDot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[22px] border bg-card p-5 shadow-sm lg:col-span-5"
        >
          <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#2563EB] via-[#14B8A6] to-[#F59E0B]" />
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#2563EB] text-white shadow-[0_8px_18px_-6px_rgba(37,99,235,0.65)]">
                <Briefcase className="h-[18px] w-[18px]" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold tracking-[-0.01em]">Application funnel</h3>
                <p className="text-[11.5px] font-medium text-muted-foreground">July 2026 conversion</p>
              </div>
            </div>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnel} layout="vertical" margin={{ top: 0, right: 12, left: 8, bottom: 0 }} barCategoryGap="26%">
                <CartesianGrid horizontal={false} />
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="stage" axisLine={false} tickLine={false} width={84} tick={{ fontSize: 11.5, fontWeight: 600 }} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "color-mix(in srgb, var(--primary) 6%, transparent)" }} />
                <Bar dataKey="value" name="Count" radius={[6, 10, 10, 6]} barSize={20}>
                  {funnel.map((f) => (
                    <Cell key={f.stage} fill={f.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Score breakdown radial */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[22px] border bg-card p-5 shadow-sm lg:col-span-5"
        >
          <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#7C3AED] to-[#F59E0B]" />
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#7C3AED] text-white shadow-[0_8px_18px_-6px_rgba(124,58,237,0.65)]">
              <PieChart className="h-[18px] w-[18px]" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold tracking-[-0.01em]">Score composition</h3>
              <p className="text-[11.5px] font-medium text-muted-foreground">Where your 76/100 comes from</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative h-[210px] flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="32%" outerRadius="100%" data={scoreBreakdown} startAngle={90} endAngle={-270}>
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar dataKey="value" background={{ fill: "var(--card-muted)" }} cornerRadius={8} angleAxisId={0}>
                    {scoreBreakdown.map((s) => (
                      <Cell key={s.name} fill={s.color} />
                    ))}
                  </RadialBar>
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-[30px] font-extrabold tracking-[-0.03em]">76</div>
                <div className="text-[9.5px] font-bold uppercase tracking-[0.08em] text-muted-foreground">Composite</div>
              </div>
            </div>
            <div className="w-[150px] space-y-2.5">
              {scoreBreakdown.map((s) => (
                <div key={s.name} className="flex items-center gap-2.5">
                  <span className="h-3 w-3 shrink-0 rounded-full shadow-sm" style={{ background: s.color }} />
                  <span className="flex-1 text-[12px] font-semibold text-muted-foreground">{s.name}</span>
                  <span className="text-[13px] font-extrabold tabular-nums">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Executive summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[22px] border bg-card p-5 shadow-sm lg:col-span-7"
        >
          <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE]" />
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#7C3AED] to-[#2563EB] text-white shadow-[0_8px_18px_-6px_rgba(124,58,237,0.65)]">
                <Sparkles className="h-[18px] w-[18px]" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold tracking-[-0.01em]">{t("reports.executiveSummary")}</h3>
                <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-muted-foreground">
                  <CalendarDays className="h-3 w-3" /> Generated {report?.generatedAt ? new Date(report.generatedAt).toLocaleDateString("en-NG", { month: "long", day: "numeric", year: "numeric" }) : "July 16, 2026"} by Liberty AI
                </p>
              </div>
            </div>
            <Badge variant="ai" size="sm">AI</Badge>
          </div>
          <p className="text-[14px] leading-[1.75] tracking-[-0.005em] text-muted-foreground">
            {report?.executiveSummary ??
              "Your career profile shows strong, accelerating momentum. Resume quality improved 24 points in six months, match volume quadrupled, and interview conversion now doubles the market average. The dominant constraint is no longer visibility — it is depth in cloud-native tooling. Closing the Kubernetes and AWS gaps positions you for Senior Backend offers within two application cycles."}
          </p>
          <div className="mt-4 space-y-2.5">
            {(report?.topRecommendations ?? [
              "Prioritize the Kubernetes certification path — highest leverage skill (+18% projected match).",
              "Apply within 48h of posting: your response rate is 2.4× higher on fresh listings.",
              "Add two quantified impact bullets to your Paystack role to push ATS past 85%.",
            ]).map((rec, i) => (
              <div key={i} className={cn("flex items-start gap-3 rounded-[13px] border p-3 shadow-sm transition-shadow hover:shadow-md", ["tint-blue", "tint-emerald", "tint-purple"][i % 3])}>
                <span className="mt-0.5 flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-[#10B981] text-white shadow-sm">
                  <CheckCircle2 className="h-3 w-3" />
                </span>
                <span className="text-[13px] font-[500] leading-[1.55]">{rec}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
