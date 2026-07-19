"use client";

import React from "react";
import { useI18n } from "@/providers/I18nProvider";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/services/api";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PageHero } from "@/components/dashboard/PageHero";
import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard";
import { PieChart, Download, Share2, FileText, Target, Briefcase, Sparkles, CalendarDays, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { EmptyState, ErrorState, PageSkeleton } from "@/components/ui/QueryState";
import { getApiError } from "@/lib/api/client";

export default function ReportsPage() {
  const { t } = useI18n();
  const { data: report, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["report"],
    queryFn: ({ signal }) => api.fetchReports(signal),
    retry: 1,
  });

  const download = async () => {
    toast.promise(api.downloadReport(), {
      loading: "Generating your career report…",
      success: "Report downloaded",
      error: (err) => getApiError(err).message,
    });
  };

  if (isLoading) return <PageSkeleton cards={3} />;
  if (isError) return <ErrorState error={error} onRetry={() => refetch()} title="Could not load report" />;
  if (!report) {
    return (
      <EmptyState
        title="No report data yet"
        description="Upload a resume and run analysis so we can compose a report from backend resume, ATS, and job match data."
      />
    );
  }

  const composite = Math.round(((report.resumeScore || 0) + (report.atsScore || 0)) / (report.atsScore ? 2 : 1)) || report.resumeScore || 0;

  return (
    <div className="space-y-6">
      <PageHero
        gradient="teal"
        icon={PieChart}
        eyebrow={t("reports.subtitle")}
        title={t("reports.title")}
        subtitle="Composed only from supported backend responses — resume analysis, ATS feedback, and job matches."
        stats={[
          { label: "Resume score", value: report.resumeScore, suffix: "%", sub: "From resume API" },
          { label: "ATS score", value: report.atsScore, suffix: "%", sub: "From ATS feedback" },
          { label: "Jobs matched", value: report.jobsMatched, sub: "Match endpoint" },
          { label: "Composite", value: composite, suffix: "%", sub: "Simple average" },
        ]}
        actions={
          <>
            <Button size="sm" className="h-[40px] gap-1.5 rounded-full bg-white px-5 text-[#0F766E] shadow-lg shadow-black/10 hover:bg-white/90" onClick={download}>
              <Download className="h-4 w-4" /> Download
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-[40px] gap-1.5 rounded-full border border-white/25 bg-white/10 px-5 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(report.executiveSummary);
                  toast.success("Summary copied");
                } catch {
                  toast.error("Could not copy summary");
                }
              }}
            >
              <Share2 className="h-4 w-4" /> Copy summary
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AnalyticsCard index={0} label="Resume score" value={report.resumeScore} suffix="%" icon={FileText} accent="blue" sub="Backend resume" />
        <AnalyticsCard index={1} label="ATS score" value={report.atsScore} suffix="%" icon={Target} accent="purple" ring={report.atsScore} sub="Backend ATS" />
        <AnalyticsCard index={2} label="Jobs matched" value={report.jobsMatched} icon={Briefcase} accent="emerald" sub="Match API" />
        <AnalyticsCard index={3} label="Recommendations" value={report.topRecommendations.length} icon={Sparkles} accent="amber" sub="Action items" />
      </div>

      <div className="grid gap-5 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[22px] border bg-card p-5 shadow-sm lg:col-span-5"
        >
          <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#14B8A6] to-[#0EA5E9]" />
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#14B8A6] text-white shadow-[0_8px_18px_-6px_rgba(20,184,166,0.65)]">
              <PieChart className="h-[18px] w-[18px]" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold tracking-[-0.01em]">Score snapshot</h3>
              <p className="text-[11.5px] font-medium text-muted-foreground">Only backend-provided values</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: "Resume", value: report.resumeScore, color: "#2563EB" },
              { label: "ATS", value: report.atsScore, color: "#7C3AED" },
              { label: "Jobs matched", value: Math.min(100, report.jobsMatched), color: "#10B981" },
            ].map((row) => (
              <div key={row.label} className="rounded-[14px] border p-3">
                <div className="mb-2 flex items-center justify-between text-[12.5px] font-bold">
                  <span>{row.label}</span>
                  <span style={{ color: row.color }}>{row.value}{row.label === "Jobs matched" ? "" : "%"}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-card-muted">
                  <div className="h-full rounded-full" style={{ width: `${Math.min(100, row.value)}%`, background: row.color }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
                  <CalendarDays className="h-3 w-3" />
                  Generated {new Date(report.generatedAt).toLocaleString()}
                </p>
              </div>
            </div>
            <Badge variant="ai" size="sm">
              Composed
            </Badge>
          </div>
          <p className="text-[14px] leading-[1.75] tracking-[-0.005em] text-muted-foreground whitespace-pre-wrap">
            {report.executiveSummary}
          </p>
          <div className="mt-4 space-y-2.5">
            {report.topRecommendations.length ? (
              report.topRecommendations.map((rec, i) => (
                <div key={`${rec}-${i}`} className={cn("flex items-start gap-3 rounded-[13px] border p-3 shadow-sm", ["tint-blue", "tint-emerald", "tint-purple"][i % 3])}>
                  <span className="mt-0.5 flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-[#10B981] text-white shadow-sm">
                    <CheckCircle2 className="h-3 w-3" />
                  </span>
                  <span className="text-[13px] font-[500] leading-[1.55]">{rec}</span>
                </div>
              ))
            ) : (
              <div className="rounded-[13px] border border-dashed p-4 text-[13px] text-muted-foreground">
                No recommendations were returned by the backend yet.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
