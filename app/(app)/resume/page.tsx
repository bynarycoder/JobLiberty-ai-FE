"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/providers/I18nProvider";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Progress, CircularProgress } from "@/components/ui/Progress";
import { PageHero } from "@/components/dashboard/PageHero";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/services/api";
import { Download, Sparkles, Award, Briefcase, GraduationCap, Code2, CheckCircle2, FileText, Target, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const rise = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
});

function SectionCard({ strip, icon, iconBox, title, desc, children, className = "", index = 0 }: {
  strip: string; icon: React.ElementType; iconBox: string; title: React.ReactNode; desc?: string; children: React.ReactNode; className?: string; index?: number;
}) {
  const Icon = icon;
  return (
    <motion.div {...rise(index)} className={`group relative overflow-hidden rounded-[22px] border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}>
      <div className={`absolute inset-x-0 top-0 h-[4px] ${strip}`} />
      <div className="p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-[13px] text-white transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${iconBox}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-[15px] font-bold tracking-[-0.01em]">{title}</h3>
            {desc && <p className="text-[11.5px] font-medium text-muted-foreground">{desc}</p>}
          </div>
        </div>
        {children}
      </div>
    </motion.div>
  );
}

export default function ResumeAnalysis() {
  const { t } = useI18n();
  const { data: resume } = useQuery({ queryKey: ["resume"], queryFn: () => api.fetchResume() });

  return (
    <div className="space-y-6">
      {/* ── Green gradient hero ── */}
      <PageHero
        gradient="emerald"
        icon={FileText}
        eyebrow={`${t("resume.title")} • ${resume?.fileName || "Chinedu_Okafor_Backend.pdf"}`}
        title={t("resume.title")}
        subtitle="Liberty AI dissected every section of your CV — structure, keywords, impact verbs and ATS parsing. Verdict: strong, with a few quick wins."
        stats={[
          { label: "Overall score", value: resume?.score || 82, suffix: "%", sub: "Top 12% of users" },
          { label: "ATS compatible", value: resume?.atsScore || 78, suffix: "%", sub: "+6 since last edit" },
          { label: "Keywords found", value: 92, suffix: "%", sub: "Industry aligned" },
          { label: "Readability", value: 8.2, sub: "of 10 — crisp" },
        ]}
        actions={
          <>
            <Button size="sm" asChild className="h-[40px] gap-1.5 rounded-full bg-white px-5 text-[#047857] shadow-lg shadow-black/10 hover:bg-white/90">
              <Link href="/analysis">
                <Target className="h-4 w-4" /> View ATS Report
              </Link>
            </Button>
            <Button size="sm" variant="ghost" className="h-[40px] gap-1.5 rounded-full border border-white/25 bg-white/10 px-5 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white">
              <Download className="h-4 w-4" /> {t("resume.download")}
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Score card */}
        <SectionCard index={1} className="lg:col-span-4" strip="bg-gradient-to-r from-[#10B981] to-[#34D399]" icon={TrendingUp} iconBox="bg-[#10B981] shadow-[0_8px_18px_-6px_rgba(16,185,129,0.65)]" title="Overall Score" desc="AI-weighted across 27 signals">
          <div className="flex items-center gap-6">
            <div className="relative">
              <CircularProgress value={resume?.score || 82} size={116} strokeWidth={9} variant="emerald">
                <div className="text-center">
                  <div className="text-[32px] font-extrabold leading-none tracking-[-0.04em]">{resume?.score || 82}</div>
                  <div className="mt-0.5 text-[9px] font-bold tracking-[0.1em] text-muted-foreground">SCORE</div>
                </div>
              </CircularProgress>
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <div className="mb-1.5 flex justify-between text-[10.5px] font-bold uppercase tracking-[0.05em] text-muted-foreground">
                  <span>ATS Compatibility</span>
                  <span className="text-[#059669] dark:text-[#4ADEAC]">{resume?.atsScore || 78}%</span>
                </div>
                <Progress value={resume?.atsScore || 78} variant="emerald" size="sm" />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="tint-emerald rounded-[12px] border p-2.5 text-center">
                  <div className="text-[18px] font-extrabold tracking-[-0.02em]">8.2</div>
                  <div className="text-[9.5px] font-bold uppercase tracking-wide text-muted-foreground">Readability</div>
                </div>
                <div className="tint-blue rounded-[12px] border p-2.5 text-center">
                  <div className="text-[18px] font-extrabold tracking-[-0.02em]">92%</div>
                  <div className="text-[9.5px] font-bold uppercase tracking-wide text-muted-foreground">Keywords</div>
                </div>
              </div>
            </div>
          </div>
          <div className="tint-emerald mt-5 flex gap-2.5 rounded-[13px] border p-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-card shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#10B981]" />
            </div>
            <div>
              <div className="text-[12px] font-bold tracking-[-0.01em]">AI Verdict</div>
              <div className="text-[11.5px] leading-[1.5] text-muted-foreground">Strong backend profile — ready for senior roles with minor tweaks</div>
            </div>
          </div>
        </SectionCard>

        {/* AI Summary */}
        <SectionCard index={2} className="lg:col-span-8" strip="bg-gradient-to-r from-[#7C3AED] to-[#2563EB]" icon={Sparkles} iconBox="bg-gradient-to-br from-[#7C3AED] to-[#2563EB] shadow-[0_8px_18px_-6px_rgba(124,58,237,0.65)]" title={t("resume.aiSummary")} desc="Generated by Liberty AI • 2h ago • Confidence 94%">
          <p className="text-[14.5px] leading-[1.75] tracking-[-0.01em]">
            Chinedu is a highly capable backend engineer with 5+ years building scalable payment systems serving 2M+ users. Proficient in Node.js, TypeScript,
            PostgreSQL &amp; Docker. Delivered <span className="font-bold text-[#059669] dark:text-[#4ADEAC]">42% latency improvement</span> at Paystack and led the
            migration to microservices. Strong open-source footprint (FinPay API, 1.2k stars).{" "}
            <span className="text-gradient-emerald font-bold">Ready for senior-level roles</span> with targeted upskilling in Kubernetes &amp; AWS.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { tag: "High-impact engineer", v: "emerald" },
              { tag: "Fintech expertise", v: "default" },
              { tag: "System design", v: "indigo" },
              { tag: "Leadership potential", v: "sky" },
            ].map(({ tag, v }) => (
              <Badge key={tag} variant={v as "emerald"} size="sm">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { k: "Impact verbs", v: "14", c: "text-[#059669] dark:text-[#4ADEAC]" },
              { k: "Weak phrases", v: "2", c: "text-[#D97706] dark:text-[#FBBF24]" },
              { k: "Sections", v: "7/7", c: "text-[#2563EB] dark:text-[#7FA8FF]" },
              { k: "Red flags", v: "0", c: "text-[#059669] dark:text-[#4ADEAC]" },
            ].map((m) => (
              <div key={m.k} className="rounded-[12px] border bg-card-muted/60 p-3 text-center transition-colors hover:bg-card">
                <div className={`text-[19px] font-extrabold tabular-nums tracking-[-0.02em] ${m.c}`}>{m.v}</div>
                <div className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{m.k}</div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Professional Summary */}
        <SectionCard index={3} className="lg:col-span-12" strip="bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE]" icon={Briefcase} iconBox="bg-[#0EA5E9] shadow-[0_8px_18px_-6px_rgba(14,165,233,0.65)]" title={t("resume.professionalSummary")} desc="As parsed from your CV header">
          <p className="max-w-[84ch] text-[14px] leading-[1.75] text-muted-foreground">
            Experienced Backend Engineer passionate about building reliable, high-throughput systems that serve millions across Africa. Currently at a fast-growing
            fintech where I own payment API reliability, microservices architecture, and mentorship of 3 junior engineers. Seeking senior roles with ownership of
            large-scale distributed systems.
          </p>
        </SectionCard>

        {/* Skills */}
        <SectionCard index={4} className="lg:col-span-5" strip="bg-gradient-to-r from-[#2563EB] to-[#4F46E5]" icon={Code2} iconBox="bg-[#2563EB] shadow-[0_8px_18px_-6px_rgba(37,99,235,0.65)]" title={t("resume.skills")} desc="13 skills extracted with confidence scores">
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.07em] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" /> Core Stack • 8 skills
              </div>
              <div className="flex flex-wrap gap-2">
                {["Node.js", "TypeScript", "PostgreSQL", "React", "Docker", "Express", "Redis", "Jest"].map((s) => (
                  <Badge key={s} variant="default" size="sm" className="font-semibold">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="border-t border-border/70 pt-3.5">
              <div className="mb-2 flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.07em] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" /> Tools &amp; Practices
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["AWS", "Kubernetes", "CI/CD", "GraphQL", "Microservices"].map((s) => (
                  <Badge key={s} variant="indigo" size="sm">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Experience */}
        <SectionCard index={5} className="lg:col-span-7" strip="bg-gradient-to-r from-[#10B981] to-[#0EA5E9]" icon={Briefcase} iconBox="bg-[#10B981] shadow-[0_8px_18px_-6px_rgba(16,185,129,0.65)]" title={t("resume.experience")} desc="2 roles • 4+ years total">
          <div className="space-y-4">
            <div className="relative border-l-[3px] border-[#10B981]/60 pl-6">
              <div className="absolute -left-[8px] top-1 h-[15px] w-[15px] rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] shadow-[0_0_0_4px_rgba(16,185,129,0.2)]" />
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-[14px] font-bold tracking-[-0.01em]">Backend Engineer • Paystack</div>
                  <div className="mt-0.5 text-[12px] font-semibold text-muted-foreground">2023 — Present • Lagos (Remote) • 2 years</div>
                </div>
                <Badge variant="emerald" size="sm" dot pulse>Current</Badge>
              </div>
              <p className="mt-2 text-[13px] leading-[1.65] text-muted-foreground">
                Built high-throughput payment APIs handling 4k rps. Improved p95 latency by 42% via caching &amp; query optimization. Led monolith → microservices migration.
              </p>
            </div>
            <div className="relative border-l-[3px] border-border pl-6">
              <div className="absolute -left-[8px] top-1 h-[15px] w-[15px] rounded-full bg-card shadow-sm ring-[3px] ring-border-strong" />
              <div className="text-[14px] font-bold tracking-[-0.01em]">Software Engineer • Andela</div>
              <div className="mt-0.5 text-[12px] font-semibold text-muted-foreground">2021 — 2023 • Distributed • 2 years</div>
              <p className="mt-2 text-[13px] leading-[1.65] text-muted-foreground">
                Delivered 20+ client projects across fintech &amp; logistics. Built a reusable Node.js boilerplate adopted by 40+ engineers.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Education / Projects / Certifications */}
        <div className="grid gap-4 md:grid-cols-3 lg:col-span-12">
          {[
            { title: t("resume.education"), icon: GraduationCap, content: "BSc Computer Science\nUniversity of Lagos (2019)\nFirst Class • GPA 4.6/5.0", strip: "bg-gradient-to-r from-[#2563EB] to-[#4F46E5]", iconBox: "bg-[#2563EB] shadow-[0_8px_18px_-6px_rgba(37,99,235,0.65)]", tint: "tint-blue" },
            { title: t("resume.projects"), icon: Code2, content: "FinPay API • Open Source Gateway\n★ 1.2k • 45 contributors\nGo + TypeScript", strip: "bg-gradient-to-r from-[#7C3AED] to-[#9333EA]", iconBox: "bg-[#7C3AED] shadow-[0_8px_18px_-6px_rgba(124,58,237,0.65)]", tint: "tint-purple" },
            { title: t("resume.certifications"), icon: Award, content: "AWS Cloud Practitioner • 2024\nKubernetes Fundamentals • 2023\nTop 5% cohort", strip: "bg-gradient-to-r from-[#F59E0B] to-[#FBBF24]", iconBox: "bg-[#F59E0B] shadow-[0_8px_18px_-6px_rgba(245,158,11,0.65)]", tint: "tint-amber" },
          ].map((card, i) => (
            <motion.div key={card.title} {...rise(6 + i)} className="group relative overflow-hidden rounded-[20px] border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className={`absolute inset-x-0 top-0 h-[4px] ${card.strip}`} />
              <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${card.tint}`} />
              <div className="relative p-5">
                <div className="mb-3 flex items-center gap-2.5">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-[12px] text-white transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${card.iconBox}`}>
                    <card.icon className="h-[18px] w-[18px]" />
                  </div>
                  <h4 className="text-[13.5px] font-bold tracking-[-0.01em]">{card.title}</h4>
                </div>
                <p className="whitespace-pre-line text-[12.5px] font-medium leading-[1.7] text-muted-foreground">{card.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
