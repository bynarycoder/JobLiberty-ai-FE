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
import { TrendingUp, Target, Zap, BookOpen, Clock, ArrowRight, Sparkles, Award, Brain, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function SkillGapPage() {
  const { t } = useI18n();
  const { data: skillGap } = useQuery({ queryKey: ["skill-gap"], queryFn: () => api.fetchSkillGap() });

  if (!skillGap)
    return (
      <div className="grid md:grid-cols-2 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-[300px] rounded-[20px] bg-white dark:bg-[#1E293B] border border-slate-200/60 dark:border-slate-800 animate-pulse" />
        ))}
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-[30px] font-[800] tracking-[-0.03em] leading-[1.1] text-slate-900 dark:text-white">{t("skills.title")}</h1>
            <Badge variant="ai" size="sm" dot pulse>
              AI Roadmap
            </Badge>
          </div>
          <p className="text-[13.5px] font-[450] text-slate-600 dark:text-slate-400 mt-1">{t("skills.subtitle")} • Personalized by Liberty AI • 6 weeks to 92%</p>
        </div>
        <Link href="/dashboard">
          <Button variant="secondary" size="sm" className="rounded-full gap-1.5">
            <TrendingUp className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-[24px] border border-[#A7F3D0] dark:border-[#064E3B]/30 bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857] p-[1.5px] shadow-[0_12px_32px_rgba(16,185,129,0.2)]">
        <div className="rounded-[22px] bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857] p-6 md:p-7 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(at_0%_0%,rgba(255,255,255,0.18),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(at_100%_100%,rgba(255,255,255,0.12),transparent_60%)]" />
            <div className="absolute -right-20 -top-20 h-[280px] w-[280px] rounded-full bg-white/10 blur-2xl" />
          </div>

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex">
                <CircularProgress value={skillGap.opportunityScore} size={96} strokeWidth={8} variant="emerald">
                  <div className="text-center">
                    <div className="text-[20px] font-[800] tracking-tight text-white">{skillGap.opportunityScore}%</div>
                    <div className="text-[10px] font-bold tracking-[0.06em] text-white/70 -mt-0.5">POTENTIAL</div>
                  </div>
                </CircularProgress>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.08em] text-white/70 uppercase">
                  <Zap className="h-3.5 w-3.5" />
                  Opportunity Mode • Live AI
                </div>
                <div className="mt-1 text-[42px] font-[800] tracking-[-0.04em] leading-[0.9] text-white">{skillGap.opportunityScore}%</div>
                <div className="mt-1 text-[14px] font-[600] tracking-[-0.01em] text-white/90">Potential Match After Learning • Senior Backend</div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/15 backdrop-blur-sm px-3 py-1 text-[12px] font-medium text-white">
                    <Clock className="h-3.5 w-3.5" />
                    Est. 6 weeks
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white text-[#059669] px-3 py-1 text-[12px] font-bold shadow-sm">
                    <TrendingUp className="h-3.5 w-3.5" />
                    +20% match boost
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-auto lg:text-right space-y-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-[16px] p-4 lg:p-5 lg:min-w-[220px]">
              <div>
                <div className="text-[32px] font-[800] tracking-[-0.03em] leading-none text-white">{skillGap.careerReadiness}%</div>
                <div className="text-[12px] font-medium text-white/70 mt-1">Current Readiness • 72% → 92%</div>
                <div className="mt-2 h-2 w-full rounded-full bg-white/20 p-0.5">
                  <div className="h-full w-[72%] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
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
        {/* Current Skills */}
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
            <CardDescription>Your verified strengths • Endorsed by AI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2.5">
              {skillGap.currentSkills.map((skill, i) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group flex items-center justify-between rounded-[12px] border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-white/[0.02] p-3 hover:bg-white dark:hover:bg-white/[0.04] hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-[10px] bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center justify-center text-[12px] font-bold text-slate-700 dark:text-slate-200 shadow-sm group-hover:shadow group-hover:scale-[1.02] transition-all">
                      {skill.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold tracking-[-0.01em] text-[13.5px] text-slate-900 dark:text-white">{skill.name}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Badge variant={skill.level === "expert" ? "emerald" : skill.level === "advanced" ? "default" : "secondary"} size="sm" className="text-[10px]">
                          {skill.level}
                        </Badge>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">{skill.yearsExperience} years • {skill.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-6 w-6 rounded-full bg-[#ECFDF5] dark:bg-[#064E3B]/20 border border-[#A7F3D0] dark:border-[#064E3B]/30 flex items-center justify-center">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981]" />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Missing Skills */}
        <Card className="border-[#DBEAFE] dark:border-[#1E3A8A]/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-[10px] bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 border border-[#DBEAFE] dark:border-[#1E3A8A]/30 flex items-center justify-center">
                <Target className="h-4 w-4 text-[#2563EB] dark:text-[#60A5FA]" />
              </div>
              {t("skills.missing")}
              <Badge variant="amber" size="sm" dot>
                Growth zone
              </Badge>
            </CardTitle>
            <CardDescription>Bridge these to unlock senior roles • 6 weeks total</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {skillGap.missingSkills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="group rounded-[14px] border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-4 hover:shadow-sm hover:-translate-y-[0.5px] hover:border-[#BFDBFE] dark:hover:border-[#1E3A8A]/40 transition-all"
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
                        {skill.estimatedTimeWeeks} weeks • Free resources • Project included
                      </div>
                      <div className="mt-2.5">
                        <div className="flex justify-between text-[11px] font-semibold tracking-[0.04em] uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                          <span>Impact on match</span>
                          <span className="text-[#2563EB] dark:text-[#60A5FA]">+{skill.priority === "high" ? "12-18" : skill.priority === "medium" ? "6-10" : "3-5"}%</span>
                        </div>
                        <Progress value={skill.priority === "high" ? 85 : skill.priority === "medium" ? 60 : 35} variant={skill.priority === "high" ? "default" : skill.priority === "medium" ? "amber" : "indigo"} size="sm" />
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

            <Link href="/resources" className="block mt-5">
              <Button className="w-full rounded-full h-[44px] gap-2 shadow-[0_4px_12px_rgba(16,185,129,0.2)] bg-gradient-to-br from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857]">
                <BookOpen className="h-4 w-4" />
                Start Learning Plan
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              <Sparkles className="h-3 w-3 text-[#7C3AED]" />
              Liberty AI will track progress & adjust roadmap
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
