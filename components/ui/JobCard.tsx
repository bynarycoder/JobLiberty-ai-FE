"use client";

import React from "react";
import { Job } from "@/lib/types";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { MapPin, Clock, Bookmark, DollarSign, Sparkles, ArrowUpRight, Zap } from "lucide-react";
import { useI18n } from "@/providers/I18nProvider";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface JobCardProps {
  job: Job;
  onApply?: () => void;
  featured?: boolean;
}

/* Deterministic gradient per company so logos feel branded */
const LOGO_GRADIENTS = [
  "from-[#2563EB] to-[#4F46E5]",
  "from-[#10B981] to-[#059669]",
  "from-[#7C3AED] to-[#9333EA]",
  "from-[#F59E0B] to-[#F97316]",
  "from-[#0EA5E9] to-[#22D3EE]",
  "from-[#14B8A6] to-[#2DD4BF]",
  "from-[#EF4444] to-[#F87171]",
];

export function JobCard({ job, onApply, featured }: JobCardProps) {
  const { t } = useI18n();
  const [bookmarked, setBookmarked] = React.useState(false);

  const logoGradient = LOGO_GRADIENTS[(job.company.charCodeAt(0) + job.company.length) % LOGO_GRADIENTS.length];
  const workModeVariant = job.remote ? ("remote" as const) : job.type === "Full-time" ? ("onsite" as const) : ("hybrid" as const);
  const workModeLabel = job.remote ? "Remote" : job.type === "Full-time" ? "On-site" : "Hybrid";
  const matchAccent =
    job.matchPercentage >= 85
      ? { box: "tint-emerald", text: "text-[#059669] dark:text-[#4ADEAC]", bar: "from-[#059669] to-[#10B981]" }
      : job.matchPercentage >= 70
        ? { box: "tint-blue", text: "text-[#2563EB] dark:text-[#7FA8FF]", bar: "from-[#2563EB] to-[#4F46E5]" }
        : { box: "tint-amber", text: "text-[#D97706] dark:text-[#FBBF24]", bar: "from-[#D97706] to-[#F59E0B]" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[22px] border bg-card p-[20px] pt-[22px] shadow-sm transition-[box-shadow,border-color] duration-300",
        "hover:shadow-[0_24px_48px_-16px_rgba(11,21,48,0.18)] hover:border-[#0EA5E9]/40",
        featured && "border-[#2563EB]/30 shadow-[0_12px_32px_-12px_rgba(37,99,235,0.35)]"
      )}
    >
      {/* Gradient top border */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-[4px] transition-all duration-300 group-hover:h-[6px]",
          featured
            ? "bg-[linear-gradient(90deg,#2563EB,#7C3AED,#10B981,#0EA5E9)] animate-gradient-pan bg-[length:300%_100%]"
            : "bg-[linear-gradient(90deg,#0EA5E9,#7C3AED)]"
        )}
      />

      {/* Featured glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#2563EB]/[0.05] via-transparent to-[#7C3AED]/[0.05] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Header */}
      <div className="relative mb-4 flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3.5">
          {/* Company logo placeholder */}
          <div
            className={cn(
              "flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[15px] bg-gradient-to-br text-[15px] font-extrabold tracking-tight text-white shadow-md transition-all duration-300 group-hover:rotate-3 group-hover:scale-105 group-hover:shadow-lg",
              logoGradient
            )}
          >
            {job.logoPlaceholder || job.company.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-[15px] font-bold leading-[1.25] tracking-[-0.02em] transition-colors group-hover:text-[#2563EB] dark:group-hover:text-[#7FA8FF]">
                {job.title}
              </h3>
              {featured && (
                <Badge variant="ai" size="sm" className="shrink-0">
                  <Sparkles className="mr-0.5 h-3 w-3" />
                  AI Pick
                </Badge>
              )}
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              <span className="truncate text-[12.5px] font-medium text-muted-foreground">{job.company}</span>
              {/* Salary badge */}
              <span className="inline-flex items-center gap-1 rounded-full bg-[#E4F9EC] px-2 py-[2px] text-[10.5px] font-bold text-[#16A34A] ring-1 ring-[#22C55E]/20 dark:bg-[#22C55E]/12 dark:text-[#4ADE80]">
                <DollarSign className="h-3 w-3" />
                {job.salary || "Competitive"}
              </span>
            </div>
          </div>
        </div>

        {/* AI Match badge */}
        <div className={cn("flex shrink-0 flex-col items-center rounded-[14px] border px-3 py-2 shadow-sm", matchAccent.box)}>
          <div className="flex items-baseline gap-0.5">
            <span className={cn("text-[21px] font-extrabold leading-none tabular-nums tracking-[-0.02em]", matchAccent.text)}>
              {job.matchPercentage}
            </span>
            <span className={cn("text-[11px] font-extrabold", matchAccent.text)}>%</span>
          </div>
          <div className="mt-[3px] flex items-center gap-1">
            <Zap className={cn("h-2.5 w-2.5", matchAccent.text)} />
            <span className={cn("text-[8.5px] font-extrabold tracking-[0.1em]", matchAccent.text, "opacity-80")}>AI MATCH</span>
          </div>
        </div>
      </div>

      {/* Meta badges */}
      <div className="relative mb-3.5 flex flex-wrap items-center gap-2">
        <Badge variant={workModeVariant} size="sm" dot pulse={job.remote}>
          {workModeLabel}
        </Badge>
        <span className="inline-flex items-center gap-1 text-[12px] font-medium text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-[#EF4444]/70" />
          {job.location}
        </span>
        <span className="h-3 w-px bg-border" />
        <span className="inline-flex items-center gap-1 text-[12px] font-medium text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {job.postedDate}
        </span>
      </div>

      {/* Description */}
      <p className="relative mb-4 line-clamp-2 text-[13.5px] leading-[1.6] text-muted-foreground">{job.description}</p>

      {/* Skills */}
      <div className="relative mb-4">
        <div className="mb-2 flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#10B981] to-[#0EA5E9]" />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.07em] text-muted-foreground">Matched skills</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {job.matchedSkills.slice(0, 4).map((s, i) => (
            <Badge key={i} variant="emerald" size="sm" className="font-semibold">
              {s}
            </Badge>
          ))}
          {job.matchedSkills.length > 4 && <Badge variant="secondary" size="sm">+{job.matchedSkills.length - 4}</Badge>}
        </div>
      </div>

      {/* Footer */}
      <div className="relative mt-auto flex items-center justify-between gap-3 border-t border-border/70 pt-3.5">
        <span className="inline-flex items-center gap-1.5 text-[11.5px] font-bold text-muted-foreground">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-card-muted ring-1 ring-border/60">
            <Clock className="h-3 w-3" />
          </span>
          {job.type}
        </span>
        <div className="flex items-center gap-2">
          {/* Bookmark */}
          <motion.button
            whileTap={{ scale: 0.82 }}
            onClick={() => setBookmarked(!bookmarked)}
            aria-label="Bookmark job"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300",
              bookmarked
                ? "border-[#2563EB]/30 bg-[#2563EB]/10 text-[#2563EB] shadow-[0_4px_12px_-2px_rgba(37,99,235,0.35)] dark:text-[#7FA8FF]"
                : "border-border bg-card text-muted-foreground hover:border-[#2563EB]/30 hover:text-[#2563EB]"
            )}
          >
            <motion.span animate={bookmarked ? { scale: [1, 1.35, 1] } : {}} transition={{ duration: 0.35 }}>
              <Bookmark className={cn("h-4 w-4", bookmarked && "fill-current")} />
            </motion.span>
          </motion.button>
          <Button size="sm" onClick={onApply || (() => window.open("#", "_blank"))} className="h-[38px] gap-1.5 rounded-[11px] px-4">
            {t("jobs.apply")}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
