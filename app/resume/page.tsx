"use client";

import React from "react";
import { useI18n } from "@/providers/I18nProvider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Progress, CircularProgress } from "@/components/ui/Progress";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/services/api";
import { Download, Sparkles, Award, Briefcase, GraduationCap, Code2, CheckCircle2, FileText, TrendingUp, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function ResumeAnalysis() {
  const { t } = useI18n();
  const { data: resume } = useQuery({ queryKey: ["resume"], queryFn: () => api.fetchResume() });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-[30px] font-[800] tracking-[-0.03em] leading-[1.1] text-slate-900 dark:text-white">{t("resume.title")}</h1>
            <Badge variant="emerald" dot pulse>
              AI Analyzed
            </Badge>
          </div>
          <p className="text-[13.5px] font-[450] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
            <FileText className="h-3.5 w-3.5" />
            {resume?.fileName || "Chinedu_Okafor_Backend.pdf"} • 2 pages • Updated 2h ago
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="rounded-full gap-1.5">
            <Target className="h-4 w-4" />
            View ATS Report
          </Button>
          <Button size="sm" className="rounded-full gap-1.5">
            <Download className="h-4 w-4" />
            {t("resume.download")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Score */}
        <Card className="lg:col-span-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#EFF6FF]/60 via-transparent to-[#F5F3FF]/40 dark:from-[#1E3A8A]/10 dark:to-[#4C1D95]/5 pointer-events-none" />
          <CardContent className="relative pt-6 pb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-slate-500 dark:text-slate-400">Overall Score</span>
              <Badge variant="emerald" size="sm">
                Top 12%
              </Badge>
            </div>

            <div className="flex items-center gap-6 mt-4">
              <CircularProgress value={resume?.score || 82} size={112} strokeWidth={9} variant="default">
                <div className="text-center">
                  <div className="text-[32px] font-[800] tracking-[-0.04em] leading-none text-slate-900 dark:text-white">{resume?.score || 82}</div>
                  <div className="text-[10px] font-bold tracking-[0.06em] text-slate-500 dark:text-slate-400 mt-0.5">SCORE</div>
                </div>
              </CircularProgress>
              <div className="space-y-3 flex-1">
                <div>
                  <div className="flex justify-between text-[11px] font-semibold tracking-[0.04em] uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                    <span>ATS Compatibility</span>
                    <span className="text-slate-900 dark:text-white">{resume?.atsScore || 78}%</span>
                  </div>
                  <Progress value={resume?.atsScore || 78} variant="emerald" size="sm" />
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="rounded-[12px] border border-slate-200/60 dark:border-slate-700/50 bg-white dark:bg-white/[0.03] p-2.5 text-center">
                    <div className="text-[18px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">8.2</div>
                    <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Readability</div>
                  </div>
                  <div className="rounded-[12px] border border-slate-200/60 dark:border-slate-700/50 bg-white dark:bg-white/[0.03] p-2.5 text-center">
                    <div className="text-[18px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">92%</div>
                    <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Keywords</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[12px] border border-[#DBEAFE] dark:border-[#1E3A8A]/30 bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 p-3 flex gap-2.5">
              <div className="h-7 w-7 rounded-[8px] bg-white dark:bg-[#1E293B] border border-[#DBEAFE] dark:border-[#1E3A8A]/30 flex items-center justify-center shrink-0">
                <Sparkles className="h-3.5 w-3.5 text-[#2563EB] dark:text-[#60A5FA]" />
              </div>
              <div>
                <div className="text-[12px] font-semibold tracking-[-0.01em] text-[#1E40AF] dark:text-[#93C5FD]">AI Summary</div>
                <div className="text-[11.5px] leading-[1.5] text-[#1E40AF]/80 dark:text-[#93C5FD]/80">Strong backend profile • Ready for senior roles with minor tweaks</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Summary */}
        <Card className="lg:col-span-8">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-[10px] bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] flex items-center justify-center shadow-sm">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-[15px]">{t("resume.aiSummary")}</CardTitle>
                <CardDescription>Generated by Liberty AI • 2h ago • Confidence 94%</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-[14.5px] leading-[1.7] tracking-[-0.01em] text-slate-700 dark:text-slate-300">
              Chinedu is a highly capable backend engineer with 5+ years building scalable payment systems serving 2M+ users. Proficient in Node.js, TypeScript,
              PostgreSQL & Docker. Delivered 42% latency improvement at Paystack, led migration to microservices. Strong open-source footprint (FinPay API, 1.2k stars).
              <span className="font-semibold text-slate-900 dark:text-white"> Ready for senior-level roles</span> with targeted upskilling in Kubernetes & AWS.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["High-impact engineer", "Fintech expertise", "System design", "Leadership potential"].map((tag) => (
                <Badge key={tag} variant="secondary" size="sm">
                  <CheckCircle2 className="h-3 w-3 mr-1 text-[#10B981]" />
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Professional Summary */}
        <Card className="lg:col-span-12">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-[8px] bg-[#F8FAFC] dark:bg-white/[0.04] border border-slate-200/60 dark:border-slate-700/50 flex items-center justify-center">
                <Briefcase className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
              </div>
              {t("resume.professionalSummary")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[14px] leading-[1.7] text-slate-600 dark:text-slate-400 max-w-[80ch]">
              Experienced Backend Engineer passionate about building reliable, high-throughput systems that serve millions across Africa. Currently at a fast-growing
              fintech where I own payment API reliability, microservices architecture, and mentorship of 3 junior engineers. Seeking senior roles with ownership of large-scale distributed systems.
            </p>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-[#2563EB] dark:text-[#60A5FA]" />
              {t("resume.skills")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="text-[11px] font-semibold tracking-[0.06em] uppercase text-slate-500 dark:text-slate-400 mb-2">Core Stack • 8 skills</div>
                <div className="flex flex-wrap gap-2">
                  {["Node.js", "TypeScript", "PostgreSQL", "React", "Docker", "Express", "Redis", "Jest"].map((s) => (
                    <Badge key={s} variant="default" size="sm" className="font-medium">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[11px] font-semibold tracking-[0.06em] uppercase text-slate-500 dark:text-slate-400 mb-2">Tools & Practices</div>
                <div className="flex flex-wrap gap-1.5">
                  {["AWS", "Kubernetes", "CI/CD", "GraphQL", "Microservices"].map((s) => (
                    <Badge key={s} variant="outline" size="sm">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card className="lg:col-span-7">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-[#10B981]" />
              {t("resume.experience")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative pl-6 border-l-2 border-[#10B981]/20">
              <div className="absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full bg-[#10B981] border-2 border-white dark:border-[#1E293B] shadow-sm" />
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold tracking-[-0.01em] text-[14px] text-slate-900 dark:text-white">Backend Engineer • Paystack</div>
                  <div className="text-[12px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">2023 — Present • Lagos (Remote) • 2 years</div>
                </div>
                <Badge variant="emerald" size="sm">
                  Current
                </Badge>
              </div>
              <div className="mt-2 text-[13px] leading-[1.6] text-slate-600 dark:text-slate-400">Built high-throughput payment APIs handling 4k rps. Improved p95 latency by 42% via caching & query optimization. Led migration from monolith → microservices.</div>
            </div>
            <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-700">
              <div className="absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600" />
              <div className="font-medium text-[14px] text-slate-900 dark:text-white">Software Engineer • Andela</div>
              <div className="text-[12px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">2021 — 2023 • Distributed • 2 years</div>
              <div className="mt-2 text-[13px] leading-[1.6] text-slate-600 dark:text-slate-400">Delivered 20+ client projects across fintech & logistics. Built reusable Node.js boilerplate adopted by 40+ engineers.</div>
            </div>
          </CardContent>
        </Card>

        {/* Education & More */}
        <div className="lg:col-span-12 grid md:grid-cols-3 gap-4">
          {[
            { title: t("resume.education"), icon: GraduationCap, content: "BSc Computer Science\nUniversity of Lagos (2019)\nFirst Class • GPA 4.6/5.0", accent: "blue" },
            { title: t("resume.projects"), icon: Code2, content: "FinPay API • Open Source Payment Gateway\n★ 1.2k • 45 contributors\nGo + TypeScript", accent: "indigo" },
            { title: t("resume.certifications"), icon: Award, content: "AWS Cloud Practitioner • 2024\nKubernetes Fundamentals • 2023\nTop 5% cohort", accent: "amber" },
          ].map((card) => (
            <Card key={card.title} className="hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-[13.5px]">
                  <div className={`h-7 w-7 rounded-[8px] flex items-center justify-center ${card.accent === "blue" ? "bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 text-[#2563EB] dark:text-[#60A5FA]" : card.accent === "indigo" ? "bg-[#F5F3FF] dark:bg-[#4C1D95]/20 text-[#7C3AED] dark:text-[#A78BFA]" : "bg-[#FFFBEB] dark:bg-[#78350F]/20 text-[#D97706] dark:text-[#FBBF24]"}`}>
                    <card.icon className="h-4 w-4" />
                  </div>
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-[12.5px] leading-[1.6] text-slate-600 dark:text-slate-400 whitespace-pre-line">{card.content}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
