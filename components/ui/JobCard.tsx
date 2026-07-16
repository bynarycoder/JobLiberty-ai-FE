"use client";

import React from "react";
import { Job } from "@/lib/types";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { MapPin, Clock, Bookmark, Building2, DollarSign, Sparkles, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/providers/I18nProvider";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface JobCardProps {
  job: Job;
  onApply?: () => void;
  featured?: boolean;
}

export function JobCard({ job, onApply, featured }: JobCardProps) {
  const { t } = useI18n();
  const [bookmarked, setBookmarked] = React.useState(false);

  const matchColor = job.matchPercentage >= 85 ? "emerald" : job.matchPercentage >= 70 ? "default" : "amber";
  const workModeVariant = job.remote ? ("remote" as const) : job.type === "Full-time" ? ("onsite" as const) : ("hybrid" as const);
  const workModeLabel = job.remote ? "Remote" : job.type === "Full-time" ? "On-site" : "Hybrid";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, transition: { type: "spring", stiffness: 400, damping: 20 } }}
      className={cn(
        "group relative flex flex-col rounded-[20px] border bg-white dark:bg-[#1E293B] p-[20px] transition-all duration-300",
        "border-slate-200/70 dark:border-slate-800 shadow-[0_1px_3px_rgba(15,23,42,0.04)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.08),0_4px_12px_rgba(15,23,42,0.04)] hover:border-slate-200 dark:hover:border-slate-700",
        featured && "ring-[1.5px] ring-[#2563EB]/20 shadow-[0_8px_24px_rgba(37,99,235,0.08)]"
      )}
    >
      {/* Featured glow */}
      {featured && (
        <div className="pointer-events-none absolute inset-0 rounded-[20px] bg-gradient-to-br from-[#2563EB]/[0.04] via-transparent to-[#7C3AED]/[0.04] opacity-0 group-hover:opacity-100 transition-opacity" />
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3.5 min-w-0 flex-1">
          <div className="h-[48px] w-[48px] shrink-0 rounded-[14px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 flex items-center justify-center text-[15px] font-bold tracking-tight text-slate-700 dark:text-slate-200 shadow-sm group-hover:shadow-md group-hover:scale-[1.02] transition-all duration-300">
            {job.logoPlaceholder || job.company[0]}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold tracking-[-0.02em] text-[15px] leading-[1.25] text-slate-900 dark:text-slate-100 truncate group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">
                {job.title}
              </h3>
              {featured && (
                <Badge variant="ai" size="sm" className="shrink-0">
                  <Sparkles className="h-3 w-3 mr-0.5" />
                  Featured
                </Badge>
              )}
            </div>
            <div className="mt-0.5 flex items-center gap-1.5 text-[13px] text-slate-500 dark:text-slate-400">
              <Building2 className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{job.company}</span>
            </div>
          </div>
        </div>

        {/* Match Score */}
        <div className="shrink-0 text-right">
          <div
            className={cn(
              "inline-flex flex-col items-center rounded-[12px] px-3 py-2",
              job.matchPercentage >= 85
                ? "bg-[#ECFDF5] dark:bg-[#064E3B]/40 text-[#065F46] dark:text-[#6EE7B7]"
                : job.matchPercentage >= 70
                  ? "bg-[#EFF6FF] dark:bg-[#1E3A8A]/30 text-[#1E40AF] dark:text-[#93C5FD]"
                  : "bg-[#FFFBEB] dark:bg-[#78350F]/20 text-[#92400E] dark:text-[#FCD34D]"
            )}
          >
            <div className="flex items-baseline gap-0.5">
              <span className="text-[20px] font-bold tracking-[-0.02em] tabular-nums leading-none">{job.matchPercentage}</span>
              <span className="text-[11px] font-bold">%</span>
            </div>
            <div className="mt-[2px] text-[9.5px] font-bold tracking-[0.08em] opacity-70">MATCH</div>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-2 mb-3.5">
        <span className="inline-flex items-center gap-1 text-[12.5px] font-[450] text-slate-600 dark:text-slate-400">
          <MapPin className="h-3.5 w-3.5 text-slate-400" />
          {job.location}
        </span>
        <span className="h-3 w-px bg-slate-200 dark:bg-slate-700" />
        <Badge variant={workModeVariant} size="sm" dot pulse={job.remote}>
          {workModeLabel}
        </Badge>
        <span className="h-3 w-px bg-slate-200 dark:bg-slate-700" />
        <span className="inline-flex items-center gap-1 text-[12px] text-slate-500 dark:text-slate-400">
          <Clock className="h-3.5 w-3.5" />
          {job.postedDate}
        </span>
      </div>

      {/* Description */}
      <p className="mb-4 line-clamp-2 text-[13.5px] leading-[1.6] text-slate-600 dark:text-slate-400">{job.description}</p>

      {/* Skills */}
      <div className="mb-4">
        <div className="mb-2 flex items-center gap-1.5">
          <div className="h-1 w-1 rounded-full bg-[#10B981]" />
          <span className="text-[11px] font-semibold tracking-[0.04em] text-slate-500 dark:text-slate-400 uppercase">Matched skills</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {job.matchedSkills.slice(0, 4).map((s, i) => (
            <Badge key={i} variant="emerald" size="sm" className="font-medium">
              {s}
            </Badge>
          ))}
          {job.matchedSkills.length > 4 && (
            <Badge variant="secondary" size="sm">
              +{job.matchedSkills.length - 4}
            </Badge>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-700 dark:text-slate-300">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
            <DollarSign className="h-3 w-3" />
          </div>
          <span className="tracking-[-0.01em]">{job.salary || "Competitive"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setBookmarked(!bookmarked)}
            className={cn(
              "h-8 w-8 p-0 rounded-full",
              bookmarked && "bg-[#EFF6FF] dark:bg-[#1E3A8A]/30 text-[#2563EB] dark:text-[#60A5FA]"
            )}
            aria-label="Bookmark"
          >
            <Bookmark className={cn("h-4 w-4", bookmarked && "fill-current")} />
          </Button>
          <Button
            size="sm"
            onClick={onApply || (() => window.open("#", "_blank"))}
            className="h-[36px] rounded-[10px] px-4 gap-1.5"
          >
            {t("jobs.apply")}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Hover gradient border */}
      <div className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 rounded-[20px] p-[1px] bg-gradient-to-br from-[#2563EB]/20 via-[#7C3AED]/10 to-[#10B981]/15 [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] mask-composite:exclude" />
      </div>
    </motion.div>
  );
}
