"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Clock, Bookmark, Share2, ExternalLink, Sparkles } from "lucide-react";
import { EmptyState } from "./EmptyState";
import { SkeletonCards } from "./SkeletonCards";
import { formatDate } from "@/lib/utils";
import type { FeaturedOpportunity } from "@/lib/types";

interface FeaturedOpportunitiesProps {
  opportunities: FeaturedOpportunity[];
  isLoading: boolean;
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string) => void;
}

export function FeaturedOpportunities({ opportunities, isLoading, bookmarkedIds, onToggleBookmark }: FeaturedOpportunitiesProps) {
  const { t } = useI18n();

  if (isLoading) return <SkeletonCards count={4} columns={2} />;
  if (opportunities.length === 0) return <EmptyState titleKey="opportunityHub.emptyState.title" descriptionKey="opportunityHub.emptyState.description" />;

  return (
    <section aria-label={t("opportunityHub.featured.title")}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h2 className="text-[18px] font-[700] tracking-[-0.02em] text-slate-900 dark:text-white">{t("opportunityHub.featured.title")}</h2>
          <Badge variant="emerald" dot pulse size="sm">
            {opportunities.length} live
          </Badge>
        </div>
        <Badge variant="secondary" size="sm" className="gap-1">
          <Sparkles className="h-3 w-3" />
          AI ranked
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {opportunities.map((op, idx) => (
          <motion.div key={op.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}>
            <Card className="group h-full overflow-hidden p-5 hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)] hover:-translate-y-[2px] transition-all duration-300">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="h-11 w-11 rounded-[12px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 flex items-center justify-center text-[13px] font-bold shadow-sm group-hover:shadow-md group-hover:scale-[1.03] transition-all">
                    {op.logoPlaceholder || op.organization[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold tracking-[-0.01em] text-[14px] leading-tight text-slate-900 dark:text-slate-100 truncate group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">{op.title}</h3>
                    <p className="text-[12px] text-slate-500 dark:text-slate-400 truncate">{op.organization}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <Badge variant={op.isRemote ? "remote" : op.workMode === "hybrid" ? "hybrid" : "onsite"} size="sm" dot={op.isRemote}>
                    {op.isRemote ? t("opportunityHub.filters.remote") : op.workMode}
                  </Badge>
                  <span className="text-[11px] font-bold tracking-wide text-[#10B981] dark:text-[#34D399]">{op.opportunityScore}% match</span>
                </div>
              </div>

              <p className="line-clamp-2 text-[12.5px] leading-[1.6] text-slate-600 dark:text-slate-400 mb-3">{op.description}</p>

              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <MapPin className="h-3 w-3" />
                  {op.location}
                </span>
                {op.deadline && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                    <Clock className="h-3 w-3" />
                    {formatDate(op.deadline)}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                <Badge variant="secondary" size="sm" className="text-[11px]">
                  {op.category}
                </Badge>
                {(op.tags ?? []).slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" size="sm" className="text-[11px]">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-[#ECFDF5] dark:bg-[#064E3B]/20 border border-[#A7F3D0] dark:border-[#064E3B]/30 flex items-center justify-center text-[11px] font-bold text-[#065F46] dark:text-[#6EE7B7]">{op.opportunityScore}%</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{t("opportunityHub.featured.score")}</div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon-sm" className="rounded-full" onClick={() => onToggleBookmark(op.id)} aria-label={bookmarkedIds.has(op.id) ? t("opportunityHub.featured.removeBookmark") : t("opportunityHub.featured.addBookmark")}>
                    <Bookmark className={`h-4 w-4 ${bookmarkedIds.has(op.id) ? "fill-[#2563EB] text-[#2563EB]" : ""}`} />
                  </Button>
                  <Button variant="ghost" size="icon-sm" className="rounded-full">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="rounded-full gap-1 h-8 px-3 text-[12px]">
                    {t("opportunityHub.featured.apply")}
                    <ExternalLink className="h-3 w-3" />
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
