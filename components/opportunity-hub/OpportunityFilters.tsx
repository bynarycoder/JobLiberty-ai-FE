"use client";

import React, { useState } from "react";
import { useI18n } from "@/providers/I18nProvider";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Filter, X, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import type {
  OpportunityFiltersState,
  WorkMode,
  ExperienceLevel,
  JobType,
  EducationLevel,
  CompanySize,
  SectorType,
  CostType,
} from "@/lib/types";
import { FILTER_OPTIONS } from "@/lib/services/opportunity-hub-data";
import { motion, AnimatePresence } from "framer-motion";

interface OpportunityFiltersProps {
  filters: OpportunityFiltersState;
  onChange: (filters: OpportunityFiltersState) => void;
}

const DEFAULT_FILTERS: OpportunityFiltersState = {
  category: "all",
  country: "all",
  state: "all",
  workMode: "all",
  deadline: "all",
  experienceLevel: "all",
  salary: "all",
  industry: "all",
  jobType: "all",
  location: "all",
  educationLevel: "all",
  companySize: "all",
  opportunityType: "all",
  costType: "all",
  sectorType: "all",
  onlyFree: false,
  onlyPaid: false,
  onlyGovernment: false,
  onlyPrivate: false,
  onlyStartup: false,
  onlyNgo: false,
  onlyInternational: false,
};

const TOGGLE_FILTERS: { key: keyof OpportunityFiltersState; label: string }[] = [
  { key: "onlyFree", label: "Only Free" },
  { key: "onlyPaid", label: "Paid Opportunities" },
  { key: "onlyGovernment", label: "Government" },
  { key: "onlyPrivate", label: "Private Sector" },
  { key: "onlyStartup", label: "Startups" },
  { key: "onlyNgo", label: "NGOs" },
  { key: "onlyInternational", label: "International" },
];

function formatLabel(value: string): string {
  if (value === "all") return "All";
  if (value === "onsite") return "On-site";
  if (value === "full-time") return "Full-time";
  if (value === "part-time") return "Part-time";
  if (value === "0-5M") return "₦0 – ₦5M";
  if (value === "5M-15M") return "₦5M – ₦15M";
  if (value === "15M-30M") return "₦15M – ₦30M";
  if (value === "30M+") return "₦30M+";
  if (value === "3months") return "Next 3 months";
  if (value === "week") return "This week";
  if (value === "month") return "This month";
  if (value === "bachelors") return "Bachelor's";
  if (value === "masters") return "Master's";
  if (value === "phd") return "PhD";
  if (value === "sme") return "SME";
  return value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ");
}

export function OpportunityFilters({ filters, onChange }: OpportunityFiltersProps) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const update = <K extends keyof OpportunityFiltersState>(
    key: K,
    value: OpportunityFiltersState[K]
  ) => {
    onChange({ ...filters, [key]: value });
  };

  const clearFilters = () => onChange({ ...DEFAULT_FILTERS });

  const activeCount =
    Object.entries(filters).filter(([k, v]) => {
      if (typeof v === "boolean") return v === true;
      return v !== "all";
    }).length;

  const selectClass =
    "h-[42px] w-full rounded-[12px] border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#1E293B] px-3 text-[13px] font-[500] tracking-[-0.01em] text-slate-700 dark:text-slate-300 shadow-sm hover:border-slate-300 dark:hover:border-slate-600 focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 focus:border-[#2563EB]/40 transition-all cursor-pointer";

  const labelClass =
    "block text-[11px] font-semibold tracking-[0.04em] uppercase text-slate-500 dark:text-slate-400 mb-1.5";

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
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Smart filters · Industry, type, location & more
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-8 rounded-full gap-1 text-[12px]"
            >
              <X className="h-3.5 w-3.5" />
              Clear
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="h-8 rounded-full gap-1.5 text-[12px] lg:hidden"
            onClick={() => setIsOpen((p) => !p)}
          >
            <Filter className="h-3.5 w-3.5" />
            {isOpen ? "Close" : "Filters"}
          </Button>
        </div>
      </div>

      <div className={`${isOpen ? "block" : "hidden"} lg:block mt-4`}>
        {/* Primary filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          <div>
            <label className={labelClass} htmlFor="filter-industry">
              Industry
            </label>
            <select
              id="filter-industry"
              aria-label="Industry"
              className={selectClass}
              value={filters.industry}
              onChange={(e) => update("industry", e.target.value)}
            >
              {FILTER_OPTIONS.industries.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All industries" : c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="filter-jobtype">
              Job Type
            </label>
            <select
              id="filter-jobtype"
              aria-label="Job Type"
              className={selectClass}
              value={filters.jobType}
              onChange={(e) => update("jobType", e.target.value as JobType)}
            >
              {FILTER_OPTIONS.jobTypes.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All job types" : formatLabel(c)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="filter-workmode">
              Work Mode
            </label>
            <select
              id="filter-workmode"
              aria-label="Work mode"
              className={selectClass}
              value={filters.workMode}
              onChange={(e) => update("workMode", e.target.value as WorkMode | "all")}
            >
              {FILTER_OPTIONS.workModes.map((m) => (
                <option key={m} value={m}>
                  {m === "all" ? "Remote · Hybrid · On-site" : formatLabel(m)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="filter-location">
              Location
            </label>
            <select
              id="filter-location"
              aria-label="Location"
              className={selectClass}
              value={filters.location}
              onChange={(e) => update("location", e.target.value)}
            >
              {FILTER_OPTIONS.locations.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All locations" : c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="filter-state">
              State
            </label>
            <select
              id="filter-state"
              aria-label="State"
              className={selectClass}
              value={filters.state}
              onChange={(e) => update("state", e.target.value)}
            >
              {FILTER_OPTIONS.states.map((s) => (
                <option key={s} value={s}>
                  {s === "all" ? "All states" : s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="filter-salary">
              Salary Range
            </label>
            <select
              id="filter-salary"
              aria-label="Salary range"
              className={selectClass}
              value={filters.salary}
              onChange={(e) => update("salary", e.target.value)}
            >
              {FILTER_OPTIONS.salaryRanges.map((s) => (
                <option key={s} value={s}>
                  {s === "all" ? "Any salary" : formatLabel(s)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="filter-experience">
              Experience Level
            </label>
            <select
              id="filter-experience"
              aria-label="Experience"
              className={selectClass}
              value={filters.experienceLevel}
              onChange={(e) =>
                update("experienceLevel", e.target.value as ExperienceLevel)
              }
            >
              {FILTER_OPTIONS.experienceLevels.map((l) => (
                <option key={l} value={l}>
                  {l === "all" ? "Any level" : formatLabel(l)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="filter-education">
              Education Level
            </label>
            <select
              id="filter-education"
              aria-label="Education level"
              className={selectClass}
              value={filters.educationLevel}
              onChange={(e) =>
                update("educationLevel", e.target.value as EducationLevel)
              }
            >
              {FILTER_OPTIONS.educationLevels.map((l) => (
                <option key={l} value={l}>
                  {l === "all" ? "Any education" : formatLabel(l)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Advanced toggle */}
        <button
          type="button"
          onClick={() => setShowAdvanced((p) => !p)}
          className="mt-4 flex items-center gap-1.5 text-[12.5px] font-semibold text-[#2563EB] dark:text-[#60A5FA] hover:underline"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          {showAdvanced ? "Hide advanced filters" : "More filters"}
          {showAdvanced ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
        </button>

        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <label className={labelClass} htmlFor="filter-deadline">
                    Application Deadline
                  </label>
                  <select
                    id="filter-deadline"
                    aria-label="Deadline"
                    className={selectClass}
                    value={filters.deadline}
                    onChange={(e) => update("deadline", e.target.value)}
                  >
                    {FILTER_OPTIONS.deadlines.map((d) => (
                      <option key={d} value={d}>
                        {d === "all" ? "Any deadline" : formatLabel(d)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass} htmlFor="filter-companysize">
                    Company Size
                  </label>
                  <select
                    id="filter-companysize"
                    aria-label="Company size"
                    className={selectClass}
                    value={filters.companySize}
                    onChange={(e) =>
                      update("companySize", e.target.value as CompanySize)
                    }
                  >
                    {FILTER_OPTIONS.companySizes.map((c) => (
                      <option key={c} value={c}>
                        {c === "all" ? "Any size" : formatLabel(c)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass} htmlFor="filter-category">
                    Category
                  </label>
                  <select
                    id="filter-category"
                    aria-label="Category"
                    className={selectClass}
                    value={filters.category}
                    onChange={(e) => update("category", e.target.value)}
                  >
                    {FILTER_OPTIONS.categories.map((c) => (
                      <option key={c} value={c}>
                        {c === "all" ? "All categories" : formatLabel(c)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass} htmlFor="filter-opptype">
                    Opportunity Type
                  </label>
                  <select
                    id="filter-opptype"
                    aria-label="Opportunity type"
                    className={selectClass}
                    value={filters.opportunityType}
                    onChange={(e) => update("opportunityType", e.target.value)}
                  >
                    {FILTER_OPTIONS.opportunityTypes.map((c) => (
                      <option key={c} value={c}>
                        {c === "all" ? "All types" : formatLabel(c)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass} htmlFor="filter-country">
                    Country
                  </label>
                  <select
                    id="filter-country"
                    aria-label="Country"
                    className={selectClass}
                    value={filters.country}
                    onChange={(e) => update("country", e.target.value)}
                  >
                    {FILTER_OPTIONS.countries.map((c) => (
                      <option key={c} value={c}>
                        {c === "all" ? "All countries" : c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass} htmlFor="filter-sector">
                    Sector Type
                  </label>
                  <select
                    id="filter-sector"
                    aria-label="Sector type"
                    className={selectClass}
                    value={filters.sectorType}
                    onChange={(e) =>
                      update("sectorType", e.target.value as SectorType)
                    }
                  >
                    {FILTER_OPTIONS.sectorTypes.map((c) => (
                      <option key={c} value={c}>
                        {c === "all" ? "All sectors" : formatLabel(c)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass} htmlFor="filter-cost">
                    Cost
                  </label>
                  <select
                    id="filter-cost"
                    aria-label="Cost type"
                    className={selectClass}
                    value={filters.costType}
                    onChange={(e) => update("costType", e.target.value as CostType)}
                  >
                    {FILTER_OPTIONS.costTypes.map((c) => (
                      <option key={c} value={c}>
                        {c === "all" ? "Free & Paid" : formatLabel(c)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quick toggle chips */}
              <div className="mt-4">
                <span className={labelClass}>Quick filters</span>
                <div className="flex flex-wrap gap-2">
                  {TOGGLE_FILTERS.map(({ key, label }) => {
                    const active = Boolean(filters[key]);
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => update(key, !active as never)}
                        className={`inline-flex items-center rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-all ${
                          active
                            ? "bg-[#2563EB] text-white border-[#2563EB] shadow-sm shadow-blue-500/20"
                            : "bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                        }`}
                      >
                        {active && <span className="mr-1.5">✓</span>}
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {activeCount > 0 && (
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Active:
            </span>
            {Object.entries(filters)
              .filter(([, v]) => (typeof v === "boolean" ? v === true : v !== "all"))
              .map(([k, v]) => (
                <Badge key={k} variant="secondary" size="sm" className="gap-1">
                  {k}: {typeof v === "boolean" ? "yes" : String(v)}
                  <button
                    type="button"
                    onClick={() =>
                      update(
                        k as keyof OpportunityFiltersState,
                        (typeof v === "boolean" ? false : "all") as never
                      )
                    }
                    className="ml-1 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { DEFAULT_FILTERS };
