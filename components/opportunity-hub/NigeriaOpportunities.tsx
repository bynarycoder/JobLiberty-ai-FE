"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Bookmark, ExternalLink, Building2 } from "lucide-react";
import { SkeletonCards } from "./SkeletonCards";
import type { NigeriaOpportunity, WorkMode } from "@/lib/types";

interface NigeriaOpportunitiesProps {
  opportunities: NigeriaOpportunity[];
  isLoading: boolean;
  city: string;
  workMode: WorkMode | "all";
  onCityChange: (city: string) => void;
  onWorkModeChange: (mode: WorkMode | "all") => void;
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string) => void;
}

export function NigeriaOpportunities({ opportunities, isLoading, city, workMode, onCityChange, onWorkModeChange, bookmarkedIds, onToggleBookmark }: NigeriaOpportunitiesProps) {
  const { t } = useI18n();

  if (isLoading) return <SkeletonCards count={3} columns={3} />;

  const cities = ["all", "Lagos", "Abuja", "Port Harcourt", "Kano", "Ibadan"];

  return (
    <section>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-[18px] font-[700] tracking-[-0.02em] text-slate-900 dark:text-white flex items-center gap-2">
            <span>🇳🇬</span> Nigeria Opportunities
          </h2>
          <Badge variant="emerald" size="sm" dot>
            Local • {opportunities.length}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-[12px] border border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-white/[0.04] p-1">
            {cities.slice(0, 5).map((c) => (
              <button
                key={c}
                onClick={() => onCityChange(c)}
                className={`rounded-[9px] px-3 py-1.5 text-[12px] font-semibold transition-all ${city === c ? "bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white shadow-sm border border-slate-200/60 dark:border-slate-700" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"}`}
              >
                {c === "all" ? "All" : c}
              </button>
            ))}
          </div>

          <select value={workMode} onChange={(e) => onWorkModeChange(e.target.value as WorkMode | "all")} className="h-[34px] rounded-[10px] border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#1E293B] px-2.5 text-[12px] font-medium">
            <option value="all">Any mode</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="onsite">On-site</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {opportunities.slice(0, 6).map((op, idx) => (
          <motion.div key={op.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
            <Card className="p-4 h-full hover:shadow-[0_8px_20px_rgba(15,23,42,0.06)] hover:-translate-y-[1px] transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="h-10 w-10 rounded-[11px] bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center justify-center font-bold text-[13px] shadow-sm">
                  {op.organization[0]}
                </div>
                <Badge variant={op.workMode === "remote" ? "remote" : op.workMode === "hybrid" ? "hybrid" : "onsite"} size="sm">
                  {op.workMode}
                </Badge>
              </div>
              <h3 className="font-semibold text-[13.5px] tracking-[-0.01em] text-slate-900 dark:text-white line-clamp-1">{op.title}</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                <Building2 className="h-3 w-3" />
                {op.organization} • {op.city}
              </p>
              <p className="text-[12px] leading-[1.5] text-slate-600 dark:text-slate-400 line-clamp-2 mt-2">{op.description}</p>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {op.location}
                </span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon-sm" className="rounded-full h-7 w-7" onClick={() => onToggleBookmark(op.id)}>
                    <Bookmark className={`h-3.5 w-3.5 ${bookmarkedIds.has(op.id) ? "fill-[#2563EB] text-[#2563EB]" : ""}`} />
                  </Button>
                  <Button size="sm" className="rounded-full h-7 px-3 text-[11px] gap-1">
                    Apply <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
