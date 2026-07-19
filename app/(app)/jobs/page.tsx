"use client";

import React from "react";
import { useI18n } from "@/providers/I18nProvider";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/services/api";
import { JobCard } from "@/components/ui/JobCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PageHero } from "@/components/dashboard/PageHero";
import { Sparkles, SlidersHorizontal, ArrowUpDown, MapPin, Briefcase, Search, Command, X } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const FILTERS = [
  { key: "all", label: "All", icon: "🌐" },
  { key: "remote", label: "Remote", icon: "🏝️" },
  { key: "onsite", label: "On-site", icon: "🏢" },
  { key: "hybrid", label: "Hybrid", icon: "🔀" },
] as const;

export default function JobsPage() {
  const { t } = useI18n();
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState("match");
  const [filter, setFilter] = React.useState<"all" | "remote" | "onsite" | "hybrid">("all");
  const searchRef = React.useRef<HTMLInputElement>(null);

  /* ⌘K focuses search — dispatched from the app shell */
  React.useEffect(() => {
    const handler = () => searchRef.current?.focus();
    window.addEventListener("jobliberty:cmdk", handler);
    return () => window.removeEventListener("jobliberty:cmdk", handler);
  }, []);

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["jobs", search],
    queryFn: ({ signal }) => api.searchJobs(search, signal),
  });

  const sortedJobs = React.useMemo(() => {
    const result = [...jobs];
    if (filter !== "all") {
      const filtered = result.filter((j) => {
        if (filter === "remote") return j.remote;
        if (filter === "onsite") return j.type === "Full-time" && !j.remote;
        return !j.remote && j.type !== "Full-time";
      });
      result.splice(0, result.length, ...filtered);
    }
    if (sort === "match") result.sort((a, b) => b.matchPercentage - a.matchPercentage);
    else result.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    return result;
  }, [jobs, sort, filter]);

  const remoteCount = jobs.filter((j) => j.remote).length;

  return (
    <div className="space-y-6">
      {/* ── Cyan gradient hero ── */}
      <PageHero
        gradient="cyan"
        icon={Briefcase}
        eyebrow={t("jobs.aiRanked")}
        title={t("jobs.title")}
        subtitle={t("jobs.subtitle") + " — every role is scored against your resume in real time."}
        stats={[
          { label: "Live matches", value: sortedJobs.length || 47, sub: "+12 today" },
          { label: "Remote friendly", value: remoteCount || 9, sub: "Work from anywhere" },
          { label: "Top match", value: 89, suffix: "%", sub: "Paystack Backend" },
          { label: "Avg match", value: 74, suffix: "%", sub: "Above market" },
        ]}
        actions={
          <div className="flex w-full max-w-[440px] items-center gap-2">
            <div className="group relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
              <input
                ref={searchRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("jobs.searchPlaceholder") + " — backend, Lagos, Paystack"}
                className="h-[42px] w-full rounded-full border border-white/25 bg-white/15 pl-10 pr-10 text-[13.5px] font-medium text-white shadow-inner backdrop-blur-md transition-all placeholder:text-white/60 hover:bg-white/20 focus:border-white/50 focus:bg-white/25 focus:outline-none focus:ring-4 focus:ring-white/15"
              />
              {search ? (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              ) : (
                <kbd className="absolute right-3.5 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded-md bg-white/15 px-1.5 py-0.5 text-[10px] font-bold text-white/80 sm:flex">
                  <Command className="h-2.5 w-2.5" />K
                </kbd>
              )}
            </div>
            <div className="relative">
              <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/70" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-[42px] cursor-pointer appearance-none rounded-full border border-white/25 bg-white/15 pl-8 pr-4 text-[13px] font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 focus:outline-none [&>option]:text-slate-900"
              >
                <option value="match">Best match</option>
                <option value="recent">Most recent</option>
              </select>
            </div>
          </div>
        }
      />

      {/* ── Filter bar ── */}
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="flex items-center rounded-full border border-border bg-card/70 p-1 shadow-sm backdrop-blur-sm">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "relative rounded-full px-3.5 py-[7px] text-[12.5px] font-bold tracking-[-0.01em] transition-all",
                filter === f.key
                  ? "bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] text-white shadow-[0_4px_12px_-2px_rgba(14,165,233,0.5)]"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="mr-1">{f.icon}</span>
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            { icon: MapPin, label: "Lagos • 12", tint: "tint-rose", color: "text-[#DC2626] dark:text-[#F98B8B]" },
            { icon: Briefcase, label: "Backend • 18", tint: "tint-sky", color: "text-[#0284C7] dark:text-[#5CC8FA]" },
            { icon: Sparkles, label: "85%+ match • 9", tint: "tint-purple", color: "text-[#7C3AED] dark:text-[#B691FF]" },
          ].map((chip) => (
            <span
              key={chip.label}
              className={cn("inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow", chip.tint)}
            >
              <chip.icon className={cn("h-3.5 w-3.5", chip.color)} />
              {chip.label}
            </span>
          ))}
          <Badge variant="secondary" size="sm" className="gap-1 py-1.5">
            <SlidersHorizontal className="h-3 w-3" />
            Advanced filters
          </Badge>
        </div>

        <span className="ml-auto hidden items-center gap-1.5 text-[12px] font-semibold text-muted-foreground md:flex">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#22C55E]" />
          {sortedJobs.length} live roles • refreshed 2h ago
        </span>
      </div>

      {/* ── Job grid ── */}
      {isLoading ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="shimmer h-[300px] rounded-[22px]" />
          ))}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sortedJobs.length > 0 ? (
            sortedJobs.map((job, idx) => <JobCard key={job.id} job={job} featured={idx === 0} />)
          ) : (
            <div className="col-span-full rounded-[26px] border-2 border-dashed border-sky bg-card/60 py-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[20px] bg-gradient-to-br from-[#0EA5E9] to-[#22D3EE] shadow-[0_12px_24px_-8px_rgba(14,165,233,0.6)]">
                <Briefcase className="h-7 w-7 text-white" />
              </div>
              <div className="text-[16px] font-bold tracking-tight">{t("jobs.noJobs")}</div>
              <p className="mx-auto mt-1 max-w-[34ch] text-[13px] text-muted-foreground">
                Try adjusting filters or update your resume to get higher match scores.
              </p>
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
