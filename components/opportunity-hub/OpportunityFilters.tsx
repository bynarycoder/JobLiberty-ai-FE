"use client";

import React, { useState } from "react";
import { useI18n } from "@/providers/I18nProvider";
import { Button } from "@/components/ui/Button";
import { Filter, X } from "lucide-react";
import type { OpportunityFiltersState, WorkMode, ExperienceLevel } from "@/lib/types";

interface OpportunityFiltersProps {
  filters: OpportunityFiltersState;
  onChange: (filters: OpportunityFiltersState) => void;
}

const CATEGORIES = ["all", "job", "scholarship", "fellowship", "internship", "hackathon", "learning"];
const COUNTRIES = ["all", "Nigeria", "Ghana", "Kenya", "South Africa", "Global"];
const NIGERIAN_STATES = ["all", "Lagos", "Abuja FCT", "Rivers", "Kano", "Kaduna", "Enugu", "Oyo", "Ogun", "Kwara"];
const WORK_MODES: (WorkMode | "all")[] = ["all", "remote", "hybrid", "onsite"];
const DEADLINES = ["all", "week", "month", "3months"];
const EXPERIENCE_LEVELS: ExperienceLevel[] = ["all", "entry", "mid", "senior", "executive"];
const SALARY_RANGES = ["all", "0-5M", "5M-15M", "15M-30M", "30M+"];
const INDUSTRIES = ["all", "Technology", "Fintech", "Banking", "E-commerce", "Healthcare", "Education"];

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

  const activeCount = Object.entries(filters).filter(([, value]) => value !== "all").length;

  const selectClass =
    "h-10 rounded-2xl border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Filter className="h-4 w-4 text-primary" aria-hidden="true" />
          {t("opportunityHub.filters.title")}
        </div>
        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 gap-1 text-xs">
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              {t("opportunityHub.filters.clear")} ({activeCount})
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 text-xs lg:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="filter-panel"
          >
            <Filter className="h-3.5 w-3.5" aria-hidden="true" />
            {isOpen ? t("common.close") : t("opportunityHub.filters.title")}
          </Button>
        </div>
      </div>

      <div
        id="filter-panel"
        className={`${isOpen ? "block" : "hidden"} mt-4 lg:block`}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          <select
            aria-label={t("opportunityHub.filters.category")}
            className={selectClass}
            value={filters.category}
            onChange={(e) => update("category", e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? t("opportunityHub.filters.allCategories") : t(`opportunityHub.filters.${c}`)}
              </option>
            ))}
          </select>

          <select
            aria-label={t("opportunityHub.filters.country")}
            className={selectClass}
            value={filters.country}
            onChange={(e) => update("country", e.target.value)}
          >
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? t("opportunityHub.filters.allCountries") : c}
              </option>
            ))}
          </select>

          <select
            aria-label={t("opportunityHub.filters.state")}
            className={selectClass}
            value={filters.state}
            onChange={(e) => update("state", e.target.value)}
          >
            {NIGERIAN_STATES.map((s) => (
              <option key={s} value={s}>
                {s === "all" ? t("opportunityHub.filters.allStates") : s}
              </option>
            ))}
          </select>

          <select
            aria-label={t("opportunityHub.filters.workMode")}
            className={selectClass}
            value={filters.workMode}
            onChange={(e) => update("workMode", e.target.value as WorkMode | "all")}
          >
            {WORK_MODES.map((m) => (
              <option key={m} value={m}>
                {m === "all" ? t("opportunityHub.filters.allWorkModes") : t(`opportunityHub.filters.${m}`)}
              </option>
            ))}
          </select>

          <select
            aria-label={t("opportunityHub.filters.deadline")}
            className={selectClass}
            value={filters.deadline}
            onChange={(e) => update("deadline", e.target.value)}
          >
            {DEADLINES.map((d) => (
              <option key={d} value={d}>
                {d === "all" ? t("opportunityHub.filters.anyDeadline") : t(`opportunityHub.filters.${d}`)}
              </option>
            ))}
          </select>

          <select
            aria-label={t("opportunityHub.filters.experience")}
            className={selectClass}
            value={filters.experienceLevel}
            onChange={(e) => update("experienceLevel", e.target.value as ExperienceLevel)}
          >
            {EXPERIENCE_LEVELS.map((l) => (
              <option key={l} value={l}>
                {l === "all" ? t("opportunityHub.filters.allExperience") : t(`opportunityHub.filters.${l}`)}
              </option>
            ))}
          </select>

          <select
            aria-label={t("opportunityHub.filters.salary")}
            className={selectClass}
            value={filters.salary}
            onChange={(e) => update("salary", e.target.value)}
          >
            {SALARY_RANGES.map((s) => (
              <option key={s} value={s}>
                {s === "all" ? t("opportunityHub.filters.anySalary") : t(`opportunityHub.filters.salary${s.replace(/[^a-zA-Z0-9]/g, "")}`)}
              </option>
            ))}
          </select>

          <select
            aria-label={t("opportunityHub.filters.industry")}
            className={selectClass}
            value={filters.industry}
            onChange={(e) => update("industry", e.target.value)}
          >
            {INDUSTRIES.map((i) => (
              <option key={i} value={i}>
                {i === "all" ? t("opportunityHub.filters.allIndustries") : i}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
