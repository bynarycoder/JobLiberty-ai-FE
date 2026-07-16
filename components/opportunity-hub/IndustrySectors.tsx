"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TrendingUp, ChevronDown, ChevronUp, Layers } from "lucide-react";
import { getIcon } from "./icons";
import { SkeletonCards } from "./SkeletonCards";
import type { IndustrySector } from "@/lib/types";

interface IndustrySectorsProps {
  industries: IndustrySector[];
  isLoading: boolean;
  activeIndustry?: string;
  onSelect?: (id: string) => void;
}

const INITIAL_VISIBLE = 8;

export function IndustrySectors({
  industries,
  isLoading,
  activeIndustry = "all",
  onSelect,
}: IndustrySectorsProps) {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(false);

  if (isLoading) return <SkeletonCards count={8} columns={4} />;

  const visible = expanded ? industries : industries.slice(0, INITIAL_VISIBLE);
  const trendingCount = industries.filter((i) => i.trending).length;

  return (
    <section aria-label={t("opportunityHub.industries.title")}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#2563EB] to-[#7C3AED] text-white shadow-sm">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-[18px] font-[700] tracking-[-0.02em] text-slate-900 dark:text-white">
              {t("opportunityHub.industries.title")}
            </h2>
            <p className="text-[12.5px] text-slate-500 dark:text-slate-400">
              {t("opportunityHub.industries.subtitle")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="emerald" size="sm" dot pulse>
            {trendingCount} trending
          </Badge>
          <Badge variant="secondary" size="sm">
            {industries.length} industries
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
        {visible.map((industry, idx) => {
          const Icon = getIcon(industry.icon);
          const isActive = activeIndustry === industry.id;

          return (
            <motion.button
              key={industry.id}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.03, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect?.(isActive ? "all" : industry.id)}
              className="text-left group relative w-full"
              aria-pressed={isActive}
            >
              <Card
                className={`h-full p-4 transition-all duration-300 overflow-hidden relative ${
                  isActive
                    ? "border-[#2563EB] dark:border-[#3B82F6] shadow-[0_8px_24px_rgba(37,99,235,0.12)] ring-[2px] ring-[#2563EB]/15"
                    : "border-slate-200/70 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-[0_10px_28px_rgba(15,23,42,0.08)]"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-[0.04] group-hover:opacity-[0.09] transition-opacity ${
                    isActive ? "opacity-[0.10]" : ""
                  }`}
                />

                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/40 dark:group-hover:from-white/5 group-hover:to-transparent blur-2xl transition-all" />

                <CardContent className="p-0 relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-[12px] bg-gradient-to-br ${industry.color} text-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] group-hover:shadow-lg group-hover:scale-[1.06] transition-all duration-300`}
                      >
                        <span className="text-[18px] leading-none" aria-hidden>
                          {industry.emoji}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h3
                          className={`font-semibold tracking-[-0.01em] text-[13.5px] leading-tight ${
                            isActive
                              ? "text-[#2563EB] dark:text-[#60A5FA]"
                              : "text-slate-900 dark:text-slate-100"
                          }`}
                        >
                          {industry.name}
                        </h3>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Icon className="h-3 w-3 text-slate-400" />
                          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 tabular-nums">
                            {industry.opportunityCount.toLocaleString()} openings
                          </span>
                        </div>
                      </div>
                    </div>

                    {industry.trending && (
                      <Badge
                        variant="emerald"
                        size="sm"
                        className="gap-0.5 shrink-0 shadow-sm"
                      >
                        <TrendingUp className="h-3 w-3" />
                        {industry.trendPercent ? `+${industry.trendPercent}%` : "Hot"}
                      </Badge>
                    )}
                  </div>

                  <p className="line-clamp-2 text-[12px] leading-[1.5] text-slate-500 dark:text-slate-400 mb-3">
                    {industry.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-[10.5px] font-bold tracking-[0.04em] uppercase text-slate-400 dark:text-slate-500">
                      Explore sector
                    </span>
                    <div
                      className={`h-1.5 flex-1 mx-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity`}
                    >
                      <div
                        className={`h-full bg-gradient-to-r ${industry.color} rounded-full transition-all duration-500`}
                        style={{
                          width: `${Math.min(100, (industry.opportunityCount / 900) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.button>
          );
        })}
      </div>

      {industries.length > INITIAL_VISIBLE && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full gap-1.5 h-9 px-4 text-[12.5px]"
            onClick={() => setExpanded((p) => !p)}
          >
            {expanded ? (
              <>
                Show fewer industries <ChevronUp className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                Show all {industries.length} industries <ChevronDown className="h-3.5 w-3.5" />
              </>
            )}
          </Button>
        </div>
      )}
    </section>
  );
}
