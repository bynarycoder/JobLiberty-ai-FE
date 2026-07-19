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
import { EmptyState, ErrorState, PageSkeleton } from "@/components/ui/QueryState";

const rise = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
});

function SectionCard({
  strip,
  icon,
  iconBox,
  title,
  desc,
  children,
  className = "",
  index = 0,
}: {
  strip: string;
  icon: React.ElementType;
  iconBox: string;
  title: React.ReactNode;
  desc?: string;
  children: React.ReactNode;
  className?: string;
  index?: number;
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
  const { data: resume, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["resume"],
    queryFn: ({ signal }) => api.fetchResume(signal),
    retry: 1,
  });

  if (isLoading) return <PageSkeleton cards={4} />;
  if (isError) return <ErrorState error={error} onRetry={() => refetch()} title="Could not load resume" />;
  if (!resume) {
    return (
      <EmptyState
        title="No resume uploaded yet"
        description="Upload a PDF resume to run backend analysis, extract skills, and generate your career summary."
      />
    );
  }

  const analysis = resume.analysis;
  const skills = analysis?.skills ?? [];
  const experience = analysis?.experience ?? [];
  const education = analysis?.education ?? [];
  const projects = analysis?.projects ?? [];
  const certifications = analysis?.certifications ?? [];
  const recommendations = analysis?.recommendations ?? [];
  const summary = analysis?.careerSummary || analysis?.professionalSummary || resume.content || "";
  const readiness = analysis?.careerReadiness || resume.score || 0;

  return (
    <div className="space-y-6">
      <PageHero
        gradient="emerald"
        icon={FileText}
        eyebrow={`${t("resume.title")} • ${resume.fileName || "Resume.pdf"}`}
        title={t("resume.title")}
        subtitle="Liberty AI analyzed your CV on the JobLiberty backend — structure, keywords, skills, experience and career readiness."
        stats={[
          { label: "Overall score", value: resume.score || readiness, suffix: "%", sub: resume.status },
          { label: "ATS compatible", value: resume.atsScore || 0, suffix: "%", sub: "From backend" },
          { label: "Skills found", value: skills.length, sub: "Extracted" },
          { label: "Experience", value: experience.length, sub: "Roles parsed" },
        ]}
        actions={
          <>
            <Button size="sm" asChild className="h-[40px] gap-1.5 rounded-full bg-white px-5 text-[#047857] shadow-lg shadow-black/10 hover:bg-white/90">
              <Link href="/analysis">
                <Target className="h-4 w-4" /> View ATS Report
              </Link>
            </Button>
            <Button size="sm" variant="ghost" className="h-[40px] gap-1.5 rounded-full border border-white/25 bg-white/10 px-5 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white" asChild>
              <Link href="/upload">
                <Download className="h-4 w-4" /> Re-upload
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <SectionCard index={1} className="lg:col-span-4" strip="bg-gradient-to-r from-[#10B981] to-[#34D399]" icon={TrendingUp} iconBox="bg-[#10B981] shadow-[0_8px_18px_-6px_rgba(16,185,129,0.65)]" title="Overall Score" desc="Backend-weighted resume signals">
          <div className="flex items-center gap-6">
            <div className="relative">
              <CircularProgress value={resume.score || readiness} size={116} strokeWidth={9} variant="emerald">
                <div className="text-center">
                  <div className="text-[32px] font-extrabold leading-none tracking-[-0.04em]">{resume.score || readiness}</div>
                  <div className="mt-0.5 text-[9px] font-bold tracking-[0.1em] text-muted-foreground">SCORE</div>
                </div>
              </CircularProgress>
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <div className="mb-1.5 flex justify-between text-[10.5px] font-bold uppercase tracking-[0.05em] text-muted-foreground">
                  <span>ATS Compatibility</span>
                  <span className="text-[#059669] dark:text-[#4ADEAC]">{resume.atsScore || 0}%</span>
                </div>
                <Progress value={resume.atsScore || 0} variant="emerald" size="sm" />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="tint-emerald rounded-[12px] border p-2.5 text-center">
                  <div className="text-[18px] font-extrabold tracking-[-0.02em]">{readiness || 0}</div>
                  <div className="text-[9.5px] font-bold uppercase tracking-wide text-muted-foreground">Readiness</div>
                </div>
                <div className="tint-blue rounded-[12px] border p-2.5 text-center">
                  <div className="text-[18px] font-extrabold tracking-[-0.02em]">{skills.length}</div>
                  <div className="text-[9.5px] font-bold uppercase tracking-wide text-muted-foreground">Skills</div>
                </div>
              </div>
            </div>
          </div>
          {analysis?.careerTwin && (
            <div className="tint-emerald mt-5 flex gap-2.5 rounded-[13px] border p-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-card shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-[#10B981]" />
              </div>
              <div>
                <div className="text-[12px] font-bold tracking-[-0.01em]">Career twin</div>
                <div className="text-[11.5px] leading-[1.5] text-muted-foreground">{analysis.careerTwin}</div>
              </div>
            </div>
          )}
        </SectionCard>

        <SectionCard index={2} className="lg:col-span-8" strip="bg-gradient-to-r from-[#7C3AED] to-[#2563EB]" icon={Sparkles} iconBox="bg-gradient-to-br from-[#7C3AED] to-[#2563EB] shadow-[0_8px_18px_-6px_rgba(124,58,237,0.65)]" title={t("resume.aiSummary")} desc="Generated by backend Gemini analysis">
          {summary ? (
            <p className="text-[14.5px] leading-[1.75] tracking-[-0.01em] whitespace-pre-wrap">{summary}</p>
          ) : (
            <p className="text-[13px] text-muted-foreground">No career summary was returned for this resume yet. Re-run analysis after upload.</p>
          )}
          {recommendations.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {recommendations.slice(0, 6).map((tag) => (
                <Badge key={tag} variant="emerald" size="sm">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { k: "Skills", v: String(skills.length), c: "text-[#059669] dark:text-[#4ADEAC]" },
              { k: "Roles", v: String(experience.length), c: "text-[#2563EB] dark:text-[#7FA8FF]" },
              { k: "Education", v: String(education.length), c: "text-[#7C3AED] dark:text-[#B691FF]" },
              { k: "Readiness", v: `${readiness || 0}%`, c: "text-[#D97706] dark:text-[#FBBF24]" },
            ].map((m) => (
              <div key={m.k} className="rounded-[12px] border bg-card-muted/60 p-3 text-center transition-colors hover:bg-card">
                <div className={`text-[19px] font-extrabold tabular-nums tracking-[-0.02em] ${m.c}`}>{m.v}</div>
                <div className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{m.k}</div>
              </div>
            ))}
          </div>
        </SectionCard>

        {(analysis?.professionalSummary || resume.content) && (
          <SectionCard index={3} className="lg:col-span-12" strip="bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE]" icon={Briefcase} iconBox="bg-[#0EA5E9] shadow-[0_8px_18px_-6px_rgba(14,165,233,0.65)]" title={t("resume.professionalSummary")} desc="As returned by resume analysis">
            <p className="max-w-[84ch] text-[14px] leading-[1.75] text-muted-foreground whitespace-pre-wrap">
              {analysis?.professionalSummary || resume.content}
            </p>
          </SectionCard>
        )}

        <SectionCard index={4} className="lg:col-span-5" strip="bg-gradient-to-r from-[#2563EB] to-[#4F46E5]" icon={Code2} iconBox="bg-[#2563EB] shadow-[0_8px_18px_-6px_rgba(37,99,235,0.65)]" title={t("resume.skills")} desc={`${skills.length} skills extracted`}>
          {skills.length ? (
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <Badge key={s} variant="default" size="sm" className="font-semibold">
                  {s}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-[13px] text-muted-foreground">No skills were extracted for this resume.</p>
          )}
        </SectionCard>

        <SectionCard index={5} className="lg:col-span-7" strip="bg-gradient-to-r from-[#10B981] to-[#0EA5E9]" icon={Briefcase} iconBox="bg-[#10B981] shadow-[0_8px_18px_-6px_rgba(16,185,129,0.65)]" title={t("resume.experience")} desc={`${experience.length} roles`}>
          {experience.length ? (
            <div className="space-y-4">
              {experience.map((role, idx) => (
                <div key={role.id} className={`relative border-l-[3px] pl-6 ${idx === 0 ? "border-[#10B981]/60" : "border-border"}`}>
                  <div className={`absolute -left-[8px] top-1 h-[15px] w-[15px] rounded-full ${idx === 0 ? "bg-gradient-to-br from-[#10B981] to-[#059669] shadow-[0_0_0_4px_rgba(16,185,129,0.2)]" : "bg-card shadow-sm ring-[3px] ring-border-strong"}`} />
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[14px] font-bold tracking-[-0.01em]">
                        {role.title || "Role"}
                        {role.company ? ` • ${role.company}` : ""}
                      </div>
                      <div className="mt-0.5 text-[12px] font-semibold text-muted-foreground">
                        {[role.startDate, role.endDate].filter(Boolean).join(" — ") || "Dates unavailable"}
                        {role.location ? ` • ${role.location}` : ""}
                      </div>
                    </div>
                  </div>
                  {role.description && <p className="mt-2 text-[13px] leading-[1.65] text-muted-foreground">{role.description}</p>}
                  {!!role.highlights?.length && (
                    <ul className="mt-2 space-y-1">
                      {role.highlights.map((h) => (
                        <li key={h} className="text-[12.5px] text-muted-foreground">• {h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[13px] text-muted-foreground">No experience entries were returned.</p>
          )}
        </SectionCard>

        <div className="grid gap-4 md:grid-cols-3 lg:col-span-12">
          {[
            {
              title: t("resume.education"),
              icon: GraduationCap,
              content: education.length
                ? education.map((e) => [e.degree, e.field, e.institution, e.endDate].filter(Boolean).join(" • ")).join("\n")
                : "No education data returned",
              strip: "bg-gradient-to-r from-[#2563EB] to-[#4F46E5]",
              iconBox: "bg-[#2563EB] shadow-[0_8px_18px_-6px_rgba(37,99,235,0.65)]",
              tint: "tint-blue",
            },
            {
              title: t("resume.projects"),
              icon: Code2,
              content: projects.length ? projects.join("\n") : "No projects returned",
              strip: "bg-gradient-to-r from-[#7C3AED] to-[#9333EA]",
              iconBox: "bg-[#7C3AED] shadow-[0_8px_18px_-6px_rgba(124,58,237,0.65)]",
              tint: "tint-purple",
            },
            {
              title: t("resume.certifications"),
              icon: Award,
              content: certifications.length ? certifications.join("\n") : "No certifications returned",
              strip: "bg-gradient-to-r from-[#F59E0B] to-[#FBBF24]",
              iconBox: "bg-[#F59E0B] shadow-[0_8px_18px_-6px_rgba(245,158,11,0.65)]",
              tint: "tint-amber",
            },
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
