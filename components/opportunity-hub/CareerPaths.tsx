"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Route,
  TrendingUp,
  TrendingDown,
  Minus,
  Flame,
  ChevronDown,
  ChevronUp,
  Award,
  Wrench,
} from "lucide-react";
import { getIcon } from "./icons";
import { SkeletonCards } from "./SkeletonCards";
import type { CareerPath, DemandLevel, GrowthTrend } from "@/lib/types";

const createElement = React.createElement;

interface CareerPathsProps {
  paths: CareerPath[];
  isLoading: boolean;
}

const INITIAL_VISIBLE = 8;

function demandVariant(demand: DemandLevel): "emerald" | "sky" | "amber" | "secondary" {
  switch (demand) {
    case "very-high":
      return "emerald";
    case "high":
      return "sky";
    case "moderate":
      return "amber";
    default:
      return "secondary";
  }
}

function demandLabel(demand: DemandLevel): string {
  switch (demand) {
    case "very-high":
      return "Very High Demand";
    case "high":
      return "High Demand";
    case "moderate":
      return "Moderate Demand";
    default:
      return "Low Demand";
  }
}

function GrowthIcon({ trend }: { trend: GrowthTrend }) {
  if (trend === "exploding" || trend === "growing")
    return <TrendingUp className="h-3.5 w-3.5" />;
  if (trend === "declining") return <TrendingDown className="h-3.5 w-3.5" />;
  return <Minus className="h-3.5 w-3.5" />;
}

function growthColor(trend: GrowthTrend): string {
  if (trend === "exploding") return "text-[#10B981] dark:text-[#34D399]";
  if (trend === "growing") return "text-[#2563EB] dark:text-[#60A5FA]";
  if (trend === "declining") return "text-[#EF4444]";
  return "text-slate-500";
}

export function CareerPaths({ paths, isLoading }: CareerPathsProps) {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (isLoading) return <SkeletonCards count={8} columns={4} />;

  const visible = expanded ? paths : paths.slice(0, INITIAL_VISIBLE);
  const selected = paths.find((p) => p.id === selectedId) || null;

  return (
    <section aria-label={t("opportunityHub.careerPaths.title")}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#0EA5E9] to-[#2563EB] text-white shadow-sm">
            <Route className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-[18px] font-[700] tracking-[-0.02em] text-slate-900 dark:text-white">
              {t("opportunityHub.careerPaths.title")}
            </h2>
            <p className="text-[12.5px] text-slate-500 dark:text-slate-400">
              {t("opportunityHub.careerPaths.subtitle")}
            </p>
          </div>
        </div>
        <Badge variant="sky" size="sm">
          {paths.length} career paths
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
        {visible.map((path, idx) => {
          const Icon = getIcon(path.icon);
          const isSelected = selectedId === path.id;

          return (
            <motion.button
              key={path.id}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.03, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedId(isSelected ? null : path.id)}
              className="text-left group w-full"
              aria-pressed={isSelected}
            >
              <Card
                className={`h-full p-4 transition-all duration-300 overflow-hidden relative ${
                  isSelected
                    ? "border-[#0EA5E9] dark:border-[#38BDF8] shadow-[0_8px_24px_rgba(14,165,233,0.12)] ring-[2px] ring-[#0EA5E9]/15"
                    : "hover:shadow-[0_10px_28px_rgba(15,23,42,0.08)]"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-[0.04] group-hover:opacity-[0.09] transition-opacity`}
                />
                <CardContent className="p-0 relative">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-[12px] bg-gradient-to-br ${path.color} text-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] group-hover:scale-[1.05] transition-transform`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    {path.growthTrend === "exploding" && (
                      <Badge variant="rose" size="sm" className="gap-0.5">
                        <Flame className="h-3 w-3" /> Hot
                      </Badge>
                    )}
                  </div>

                  <h3 className="font-semibold tracking-[-0.01em] text-[14px] text-slate-900 dark:text-white mb-1">
                    {path.title}
                  </h3>
                  <p className="line-clamp-2 text-[12px] leading-[1.5] text-slate-500 dark:text-slate-400 mb-3">
                    {path.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11.5px]">
                      <span className="text-slate-500 dark:text-slate-400">Avg. salary</span>
                      <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                        {path.averageSalary}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11.5px]">
                      <span className="text-slate-500 dark:text-slate-400">Demand</span>
                      <Badge variant={demandVariant(path.demand)} size="sm">
                        {demandLabel(path.demand)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-[11.5px]">
                      <span className="text-slate-500 dark:text-slate-400">Growth</span>
                      <span
                        className={`inline-flex items-center gap-1 font-bold tabular-nums ${growthColor(
                          path.growthTrend
                        )}`}
                      >
                        <GrowthIcon trend={path.growthTrend} />+{path.growthPercent}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11.5px] pt-1 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400">Open roles</span>
                      <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                        {path.openRoles}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.button>
          );
        })}
      </div>

      {paths.length > INITIAL_VISIBLE && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full gap-1.5 h-9 px-4 text-[12.5px]"
            onClick={() => setExpanded((p) => !p)}
          >
            {expanded ? (
              <>
                Show fewer paths <ChevronUp className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                Explore all {paths.length} career paths <ChevronDown className="h-3.5 w-3.5" />
              </>
            )}
          </Button>
        </div>
      )}

      {/* Expanded detail panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 8, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Card className="mt-4 p-5 border-[#BAE6FD] dark:border-[#0C4A6E]/40 bg-gradient-to-br from-[#F0F9FF] to-white dark:from-[#0C4A6E]/15 dark:to-[#1E293B]">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-[14px] bg-gradient-to-br ${selected.color} text-white shadow-md`}
                    >
                      {createElement(getIcon(selected.icon), { className: "h-6 w-6" })}
                    </div>
                    <div>
                      <h3 className="text-[16px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">
                        {selected.title}
                      </h3>
                      <p className="text-[12.5px] text-slate-500 dark:text-slate-400">
                        {selected.openRoles} open roles · Avg. {selected.averageSalary}
                      </p>
                    </div>
                  </div>
                  <p className="text-[13.5px] leading-[1.65] text-slate-600 dark:text-slate-300 mb-4">
                    {selected.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={demandVariant(selected.demand)}>
                      {demandLabel(selected.demand)}
                    </Badge>
                    <Badge variant="sky" className="gap-1">
                      <GrowthIcon trend={selected.growthTrend} />+{selected.growthPercent}% growth
                    </Badge>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-[14px] border border-slate-200/70 dark:border-slate-700 bg-white dark:bg-[#1E293B] p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Wrench className="h-4 w-4 text-[#2563EB]" />
                      <span className="text-[13px] font-semibold">Recommended Skills</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.recommendedSkills.map((skill) => (
                        <Badge key={skill} variant="secondary" size="sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[14px] border border-slate-200/70 dark:border-slate-700 bg-white dark:bg-[#1E293B] p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="h-4 w-4 text-[#7C3AED]" />
                      <span className="text-[13px] font-semibold">Recommended Certifications</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.recommendedCertifications.map((cert) => (
                        <Badge key={cert} variant="indigo" size="sm">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
