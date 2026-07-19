"use client";

import React from "react";
import { useI18n } from "@/providers/I18nProvider";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/services/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress, CircularProgress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { TrendingUp, Target, Zap, BookOpen, Clock, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { EmptyState, ErrorState, PageSkeleton } from "@/components/ui/QueryState";

export default function SkillGapPage() {
  const { t } = useI18n();
  const { data: skillGap, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["skill-gap"],
    queryFn: ({ signal }) => api.fetchSkillGap(signal),
    retry: 1,
  });
  const { data: roadmap } = useQuery({
    queryKey: ["roadmap"],
    queryFn: ({ signal }) => api.fetchCareerRoadmap(signal),
    retry: false,
  });

  if (isLoading) return <PageSkeleton cards={2} />;
  if (isError) return <ErrorState error={error} onRetry={() => refetch()} title="Could not load skill gap" />;
  if (!skillGap) {
    return (
      <EmptyState
        title="No skill data yet"
        description="Upload a resume and run job matching so the backend can extract current skills and missing skills."
      />
    );
  }

  const totalWeeks = skillGap.missingSkills.reduce((sum, s) => sum + (s.estimatedTimeWeeks || 0), 0);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center"
      >
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-gradient-to-br from-[#10B981] to-[#059669] text-white shadow-[0_8px_18px_-6px_rgba(16,185,129,0.65)]">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h1 className="text-[28px] font-extrabold leading-[1.1] tracking-[-0.03em]">{t("skills.title")}</h1>
            <Badge variant="ai" size="sm" dot>
              From API
            </Badge>
          </div>
          <p className="mt-1.5 text-[13.5px] font-[450] text-muted-foreground">
            {t("skills.subtitle")} • Composed from resume analysis and job match gaps
            {roadmap?.targetRole ? ` • Target: ${roadmap.targetRole}` : ""}
          </p>
        </div>
        <Link href="/resources">
          <Button variant="outline" size="sm" className="gap-1.5 rounded-full">
            <BookOpen className="h-4 w-4 text-[#14B8A6]" />
            Browse learning resources
          </Button>
        </Link>
      </motion.div>

      <div className="relative overflow-hidden rounded-[24px] border border-[#A7F3D0] dark:border-[#064E3B]/30 bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857] p-[1.5px] shadow-[0_12px_32px_rgba(16,185,129,0.2)]">
        <div className="rounded-[22px] bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857] p-6 md:p-7 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(at_0%_0%,rgba(255,255,255,0.18),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(at_100%_100%,rgba(255,255,255,0.12),transparent_60%)]" />
          </div>

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex">
                <CircularProgress value={skillGap.opportunityScore} size={96} strokeWidth={8} variant="emerald">
                  <div className="text-center">
                    <div className="text-[20px] font-[800] tracking-tight text-white">{skillGap.opportunityScore}%</div>
                    <div className="text-[10px] font-bold tracking-[0.06em] text-white/70 -mt-0.5">SCORE</div>
                  </div>
                </CircularProgress>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.08em] text-white/70 uppercase">
                  <Zap className="h-3.5 w-3.5" />
                  Opportunity Mode
                </div>
                <div className="mt-1 text-[42px] font-[800] tracking-[-0.04em] leading-[0.9] text-white">{skillGap.opportunityScore}%</div>
                <div className="mt-1 text-[14px] font-[600] tracking-[-0.01em] text-white/90">
                  Career readiness from backend analysis
                  {roadmap?.targetRole ? ` • ${roadmap.targetRole}` : ""}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/15 backdrop-blur-sm px-3 py-1 text-[12px] font-medium text-white">
                    <Clock className="h-3.5 w-3.5" />
                    {totalWeeks ? `~${totalWeeks} weeks estimated` : "No gap timeline yet"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white text-[#059669] px-3 py-1 text-[12px] font-bold shadow-sm">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {skillGap.missingSkills.length} gaps
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-auto lg:text-right space-y-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-[16px] p-4 lg:p-5 lg:min-w-[220px]">
              <div>
                <div className="text-[32px] font-[800] tracking-[-0.03em] leading-none text-white">{skillGap.careerReadiness}%</div>
                <div className="text-[12px] font-medium text-white/70 mt-1">Current readiness</div>
                <div className="mt-2 h-2 w-full rounded-full bg-white/20 p-0.5">
                  <div
                    className="h-full rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                    style={{ width: `${Math.min(100, skillGap.careerReadiness || 0)}%` }}
                  />
                </div>
              </div>
              <Link href="/resources" className="block">
                <Button size="sm" className="w-full rounded-full bg-white text-[#059669] hover:bg-white/90 gap-1.5">
                  Start Learning Plan <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-[10px] bg-[#ECFDF5] dark:bg-[#064E3B]/20 border border-[#A7F3D0] dark:border-[#064E3B]/30 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-[#059669] dark:text-[#34D399]" />
              </div>
              {t("skills.youHave")}
              <Badge variant="emerald" size="sm">
                {skillGap.currentSkills.length} skills
              </Badge>
            </CardTitle>
            <CardDescription>Extracted from your resume analysis</CardDescription>
          </CardHeader>
          <CardContent>
            {skillGap.currentSkills.length ? (
              <div className="space-y-2.5">
                {skillGap.currentSkills.map((skill, i) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group flex items-center justify-between rounded-[12px] border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-white/[0.02] p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-[10px] bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center justify-center text-[12px] font-bold text-slate-700 dark:text-slate-200 shadow-sm">
                        {skill.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold tracking-[-0.01em] text-[13.5px] text-slate-900 dark:text-white">{skill.name}</div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Badge variant="secondary" size="sm" className="text-[10px]">
                            {skill.level}
                          </Badge>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">{skill.category}</span>
                        </div>
                      </div>
                    </div>
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981]" />
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-[13px] text-muted-foreground">No current skills were returned. Analyze a resume first.</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-[#DBEAFE] dark:border-[#1E3A8A]/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-[10px] bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 border border-[#DBEAFE] dark:border-[#1E3A8A]/30 flex items-center justify-center">
                <Target className="h-4 w-4 text-[#2563EB] dark:text-[#60A5FA]" />
              </div>
              {t("skills.missing")}
              <Badge variant="amber" size="sm" dot>
                From job matches
              </Badge>
            </CardTitle>
            <CardDescription>Missing skills reported by the job match endpoint</CardDescription>
          </CardHeader>
          <CardContent>
            {skillGap.missingSkills.length ? (
              <div className="space-y-3">
                {skillGap.missingSkills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className="group rounded-[14px] border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold tracking-[-0.01em] text-[14px] text-slate-900 dark:text-white">{skill.name}</span>
                          <Badge variant={skill.priority === "high" ? "rose" : skill.priority === "medium" ? "amber" : "secondary"} size="sm">
                            {skill.priority} priority
                          </Badge>
                        </div>
                        <div className="mt-1.5 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                          <Clock className="h-3 w-3" />
                          ~{skill.estimatedTimeWeeks} weeks estimated
                        </div>
                        <div className="mt-2.5">
                          <Progress
                            value={skill.priority === "high" ? 85 : skill.priority === "medium" ? 60 : 35}
                            variant={skill.priority === "high" ? "default" : skill.priority === "medium" ? "amber" : "indigo"}
                            size="sm"
                          />
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Timeline</div>
                        <div className="text-[13px] font-bold tracking-tight text-slate-900 dark:text-white">{skill.estimatedTimeWeeks}w</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-[13px] text-muted-foreground">No missing skills were reported for your current matches.</p>
            )}

            <Link href="/resources" className="block mt-5">
              <Button className="w-full rounded-full h-[44px] gap-2 shadow-[0_4px_12px_rgba(16,185,129,0.2)] bg-gradient-to-br from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857]">
                <BookOpen className="h-4 w-4" />
                Start Learning Plan
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              <Sparkles className="h-3 w-3 text-[#7C3AED]" />
              Gaps are derived from backend job match results
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
