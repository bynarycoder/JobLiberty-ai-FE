"use client";

import React from "react";
import { useI18n } from "@/providers/I18nProvider";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/services/api";
import { JobCard } from "@/components/ui/JobCard";
import { SearchInput } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, SlidersHorizontal, ArrowUpDown, MapPin, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

export default function JobsPage() {
  const { t } = useI18n();
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState("match");
  const [filter, setFilter] = React.useState<"all" | "remote" | "onsite" | "hybrid">("all");

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["jobs", search],
    queryFn: () => api.searchJobs(search),
  });

  const sortedJobs = React.useMemo(() => {
    let result = [...jobs];
    if (filter !== "all") {
      result = result.filter((j) => {
        if (filter === "remote") return j.remote;
        if (filter === "onsite") return j.type === "Full-time" && !j.remote;
        if (filter === "hybrid") return !j.remote && j.type !== "Full-time";
        return true;
      });
    }
    if (sort === "match") result.sort((a, b) => b.matchPercentage - a.matchPercentage);
    else if (sort === "recent") result.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    return result;
  }, [jobs, sort, filter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-[30px] font-[800] tracking-[-0.03em] leading-[1.1] text-slate-900 dark:text-white">{t("jobs.title")}</h1>
            <Badge variant="emerald" dot pulse>
              {sortedJobs.length} live
            </Badge>
          </div>
          <p className="text-[14px] leading-[1.5] font-[450] text-slate-600 dark:text-slate-400 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#7C3AED]" />
              AI ranked
            </span>
            • {t("jobs.subtitle")} • Updated 2h ago
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 w-full lg:w-auto">
          <div className="flex-1 lg:w-[300px]">
            <SearchInput placeholder={t("jobs.searchPlaceholder") + " — backend, Lagos, paystack"} value={search} onChange={(e) => setSearch(e.target.value)} onClear={() => setSearch("")} />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-[44px] rounded-[12px] border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#1E293B] pl-9 pr-8 text-[13.5px] font-[500] tracking-[-0.01em] text-slate-700 dark:text-slate-300 shadow-sm hover:border-slate-300 dark:hover:border-slate-600 focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 focus:border-[#2563EB]/40 appearance-none cursor-pointer"
              >
                <option value="match">Sort by Match</option>
                <option value="recent">Sort by Recent</option>
              </select>
            </div>

            <div className="flex items-center rounded-[12px] border border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-white/[0.04] p-1">
              {[
                { key: "all", label: "All" },
                { key: "remote", label: "Remote" },
                { key: "onsite", label: "On-site" },
                { key: "hybrid", label: "Hybrid" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key as any)}
                  className={`rounded-[9px] px-3 py-[6px] text-[12.5px] font-semibold tracking-[-0.01em] transition-all ${
                    filter === f.key ? "bg-white dark:bg-[#1E293B] text-slate-900 dark:text-slate-100 shadow-sm border border-slate-200/60 dark:border-slate-700" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chips */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[11px] font-semibold tracking-[0.06em] uppercase text-slate-400 dark:text-slate-500">Quick filters:</span>
        {[
          { icon: MapPin, label: "Lagos • 12" },
          { icon: Briefcase, label: "Backend • 18" },
          { icon: Sparkles, label: "85%+ match • 9" },
        ].map((chip) => (
          <span key={chip.label} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-white/[0.04] px-3 py-1 text-[12px] font-medium text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-white/[0.06] cursor-pointer transition-colors">
            <chip.icon className="h-3.5 w-3.5" />
            {chip.label}
          </span>
        ))}
        <Badge variant="secondary" size="sm" className="gap-1">
          <SlidersHorizontal className="h-3 w-3" />
          Advanced filters
        </Badge>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-[20px] border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-5 space-y-4 animate-pulse">
              <div className="flex gap-3">
                <div className="h-12 w-12 rounded-[14px] bg-slate-100 dark:bg-slate-800" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-3/4 rounded bg-slate-100 dark:bg-slate-800" />
                  <div className="h-3 w-1/2 rounded bg-slate-100 dark:bg-slate-800" />
                </div>
              </div>
              <div className="h-12 rounded bg-slate-100 dark:bg-slate-800" />
            </div>
          ))}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedJobs.length > 0 ? (
            sortedJobs.map((job, idx) => <JobCard key={job.id} job={job} featured={idx === 0} />)
          ) : (
            <div className="col-span-full py-16 text-center rounded-[24px] border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-white/[0.02]">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[16px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm mb-4">
                <Briefcase className="h-6 w-6 text-slate-400" />
              </div>
              <div className="text-[15px] font-semibold tracking-tight text-slate-900 dark:text-slate-100">{t("jobs.noJobs")}</div>
              <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-1 max-w-[32ch] mx-auto">Try adjusting filters or update your resume to get higher match scores.</p>
              <Button variant="outline" size="sm" className="mt-4 rounded-full" onClick={() => setSearch("")}>
                Clear search
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
