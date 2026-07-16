"use client";

import React, { useState } from "react";
import { useI18n } from "@/providers/I18nProvider";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Filter, X, Sparkles } from "lucide-react";
import type { OpportunityFiltersState, WorkMode, ExperienceLevel } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

interface OpportunityFiltersProps {
  filters: OpportunityFiltersState;
  onChange: (filters: OpportunityFiltersState) => void;
}

const OPTIONS = {
  categories: ["all", "job", "scholarship", "fellowship", "internship", "hackathon", "learning"],
  countries: ["all", "Nigeria", "Ghana", "Kenya", "South Africa", "Global"],
  states: ["all", "Lagos", "Abuja FCT", "Rivers", "Kano", "Kaduna", "Enugu", "Oyo"],
  workModes: ["all", "remote", "hybrid", "onsite"] as (WorkMode | "all")[],
  deadlines: ["all", "week", "month", "3months"],
  experience: ["all", "entry", "mid", "senior", "executive"] as ExperienceLevel[],
};

export function OpportunityFilters({ filters, onChange }: OpportunityFiltersProps) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const update = <K extends keyof OpportunityFiltersState>(key: K, value: OpportunityFiltersState[K]) => {
    onChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onChange({
      category: "all",
      country: "all",
      state: "all",
      workMode: "all",
      deadline: "all",
      experienceLevel: "all",
      salary: "all",
      industry: "all",
    });
  };

  const activeCount = Object.values(filters).filter((v) => v !== "all").length;

  const selectClass =
    "h-[42px] rounded-[12px] border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#1E293B] px-3 text-[13px] font-[500] tracking-[-0.01em] text-slate-700 dark:text-slate-300 shadow-sm hover:border-slate-300 dark:hover:border-slate-600 focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 focus:border-[#2563EB]/40 transition-all cursor-pointer";

  return (
    <div className="rounded-[16px] border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 border border-[#DBEAFE] dark:border-[#1E3A8A]/30">
            <Filter className="h-4 w-4 text-[#2563EB] dark:text-[#60A5FA]" />
          </div>
          <div>
            <div className="text-[13.5px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-white flex items-center gap-2">
              {t("opportunityHub.filters.title")}
              {activeCount > 0 && (
                <Badge variant="emerald" size="sm">
                  {activeCount} active
                </Badge>
              )}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">AI-powered filters • Real-time</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 rounded-full gap-1 text-[12px]">
              <X className="h-3.5 w-3.5" />
              Clear
            </Button>
          )}
          <Button variant="outline" size="sm" className="h-8 rounded-full gap-1.5 text-[12px] lg:hidden" onClick={() => setIsOpen((p) => !p)}>
            <Filter className="h-3.5 w-3.5" />
            {isOpen ? "Close" : "Filters"}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          initial={false}
          animate={{ height: isOpen || typeof window !== "undefined" && window.innerWidth >= 1024 ? "auto" : "auto", opacity: 1 }}
          className={`${isOpen ? "block" : "hidden"} lg:block mt-4`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
            <select aria-label="Category" className={selectClass} value={filters.category} onChange={(e) => update("category", e.target.value)}>
              {OPTIONS.categories.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All categories" : c.charAt(0).toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>

            <select aria-label="Country" className={selectClass} value={filters.country} onChange={(e) => update("country", e.target.value)}>
              {OPTIONS.countries.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All countries" : c}
                </option>
              ))}
            </select>

            <select aria-label="State" className={selectClass} value={filters.state} onChange={(e) => update("state", e.target.value)}>
              {OPTIONS.states.map((s) => (
                <option key={s} value={s}>
                  {s === "all" ? "All states" : s}
                </option>
              ))}
            </select>

            <select aria-label="Work mode" className={selectClass} value={filters.workMode} onChange={(e) => update("workMode", e.target.value as any)}>
              {OPTIONS.workModes.map((m) => (
                <option key={m} value={m}>
                  {m === "all" ? "Any work mode" : m}
                </option>
              ))}
            </select>

            <select aria-label="Deadline" className={selectClass} value={filters.deadline} onChange={(e) => update("deadline", e.target.value)}>
              {OPTIONS.deadlines.map((d) => (
                <option key={d} value={d}>
                  {d === "all" ? "Any deadline" : d}
                </option>
              ))}
            </select>

            <select aria-label="Experience" className={selectClass} value={filters.experienceLevel} onChange={(e) => update("experienceLevel", e.target.value as any)}>
              {OPTIONS.experience.map((l) => (
                <option key={l} value={l}>
                  {l === "all" ? "Any level" : l}
                </option>
              ))}
            </select>
          </div>

          {activeCount > 0 && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Active:</span>
              {Object.entries(filters)
                .filter(([, v]) => v !== "all")
                .map(([k, v]) => (
                  <Badge key={k} variant="secondary" size="sm" className="gap-1">
                    {k}: {v}
                    <button onClick={() => update(k as any, "all" as any)} className="ml-1 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 p-0.5">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
