"use client";

import React from "react";
import { useI18n } from "@/providers/I18nProvider";
import { useQuery } from "@tanstack/react-query";
import { api, getStoredResumeId } from "@/lib/services/api";
import { JobCard } from "@/components/ui/JobCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PageHero } from "@/components/dashboard/PageHero";
import { Sparkles, SlidersHorizontal, ArrowUpDown, MapPin, Briefcase, Search, Command, X } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EmptyState, ErrorState } from "@/components/ui/QueryState";

const FILTERS = [
  { key: "all", label: "All", icon: "🌐" },
  { key: "remote", label: "Remote", icon: "🏝️" },
  { key: "onsite", label: "On-site", icon: "🏢" },
  { key: "hybrid", label: "Hybrid", icon: "🔀" },
] as const;

export default function JobsPage() {
  const { t } = useI18n();
  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const [sort, setSort] = React.useState("match");
  const [filter, setFilter] = React.useState<"all" | "remote" | "onsite" | "hybrid">("all");
  const [useMatch, setUseMatch] = React.useState(Boolean(getStoredResumeId()));
  const { data: resume } = useQuery({ queryKey: ["resume"], queryFn: ({ signal }) => api.fetchResume(signal).catch(() => null), enabled: Boolean(getStoredResumeId()) });
  const hasCandidate = Boolean(resume?.analysis);
  const searchRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handler = () => searchRef.current?.focus();
    window.addEventListener("jobliberty:cmdk", handler);
    return () => window.removeEventListener("jobliberty:cmdk", handler);
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const {
    data: jobs = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["jobs", debouncedSearch, useMatch],
    queryFn: async ({ signal }) => {
      if (useMatch && getStoredResumeId() && !debouncedSearch) {
        try {
          return await api.fetchJobMatches(signal);
        } catch {
          // Fall back to plain search if match endpoint fails.
        }
      }
      return api.searchJobs(debouncedSearch, signal);
    },
  });

  const sortedJobs = React.useMemo(() => {
    const result = [...jobs];
    if (filter !== "all") {
      const filtered = result.filter((j) => {
        if (filter === "remote") return j.remote;
        if (filter === "onsite") return !j.remote && j.type === "Full-time";
        return !j.remote && j.type !== "Full-time";
      });
      result.splice(0, result.length, ...filtered);
    }
    if (sort === "match") result.sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0));
    else result.sort((a, b) => new Date(b.postedDate || 0).getTime() - new Date(a.postedDate || 0).getTime());
    return result;
  }, [jobs, sort, filter]);

  const remoteCount = jobs.filter((j) => j.remote).length;
  const topMatch = sortedJobs.reduce((max, job) => Math.max(max, job.matchPercentage || 0), 0);
  const avgMatch = sortedJobs.length
    ? Math.round(sortedJobs.reduce((sum, job) => sum + (job.matchPercentage || 0), 0) / sortedJobs.length)
    : 0;

  return (
    <div className="space-y-6">
      <PageHero
        gradient="cyan"
        icon={Briefcase}
        eyebrow={t("jobs.aiRanked")}
        title={t("jobs.title")}
        subtitle={t("jobs.subtitle") + " — roles are fetched from the JobLiberty jobs API (search, aggregate, and match)."}
        stats={[
          { label: "Live matches", value: sortedJobs.length, sub: useMatch ? "Match endpoint" : "Search endpoint" },
          { label: "Remote friendly", value: remoteCount, sub: "From results" },
          { label: "Top match", value: topMatch, suffix: topMatch ? "%" : "", sub: topMatch ? "Best compatibility" : "No scores yet" },
          { label: "Avg match", value: avgMatch, suffix: avgMatch ? "%" : "", sub: avgMatch ? "Across results" : "—" },
        ]}
        actions={
          <div className="flex w-full max-w-[520px] flex-col gap-2 sm:flex-row sm:items-center">
            <div className="group relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
              <input
                ref={searchRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("jobs.searchPlaceholder") + " — backend, remote, fintech"}
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

        <button
          onClick={() => setUseMatch((v) => !v)}
          disabled={!hasCandidate}
          title={!hasCandidate ? "Analyze or upload a resume first to enable AI job matching" : undefined}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold shadow-sm transition-all",
            !hasCandidate ? "cursor-not-allowed opacity-50" : "",
            useMatch ? "tint-purple text-[#7C3AED] dark:text-[#B691FF]" : "bg-card text-muted-foreground"
          )}
        >
          <Sparkles className="h-3.5 w-3.5" />
          {useMatch ? "AI match on" : !hasCandidate ? "Analyze resume to match" : "AI match off"}
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold shadow-sm tint-sky text-[#0284C7] dark:text-[#5CC8FA]">
            <MapPin className="h-3.5 w-3.5" />
            {sortedJobs.length} roles
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold shadow-sm tint-emerald text-[#059669] dark:text-[#4ADEAC]">
            <Briefcase className="h-3.5 w-3.5" />
            {remoteCount} remote
          </span>
          <Badge variant="secondary" size="sm" className="gap-1 py-1.5">
            <SlidersHorizontal className="h-3 w-3" />
            Client filters only
          </Badge>
        </div>

        <span className="ml-auto hidden items-center gap-1.5 text-[12px] font-semibold text-muted-foreground md:flex">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#22C55E]" />
          {sortedJobs.length} live roles from backend
        </span>
      </div>

      {isLoading ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="shimmer h-[300px] rounded-[22px]" />
          ))}
        </div>
      ) : isError ? (
        <ErrorState error={error} onRetry={() => refetch()} title="Could not load jobs" />
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sortedJobs.length > 0 ? (
            sortedJobs.map((job, idx) => (
              <JobCard
                key={job.id}
                job={job}
                featured={idx === 0}
                onApply={job.url ? () => window.open(job.url, "_blank", "noopener,noreferrer") : undefined}
              />
            ))
          ) : (
            <div className="col-span-full">
              <EmptyState
                title={t("jobs.noJobs")}
                description="Try another search, disable filters, or upload a resume to enable AI job matching."
                actionHref="/upload"
                actionLabel="Upload resume"
              />
              <div className="mt-3 text-center">
                <Button variant="outline" size="sm" className="rounded-full" onClick={() => { setSearch(""); setFilter("all"); }}>
                  Clear filters
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
