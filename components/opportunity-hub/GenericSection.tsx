"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Bookmark, ExternalLink, Clock, MapPin } from "lucide-react";
import { SkeletonCards } from "./SkeletonCards";
import { EmptyState } from "./EmptyState";
import { formatDate } from "@/lib/utils";
import { useI18n } from "@/providers/I18nProvider";

/** Fields the grid cards read — structurally satisfied by Scholarship | Fellowship | Hackathon */
export interface GridSectionItem {
  id: string;
  title: string;
  description: string;
  organization?: string;
  provider?: string;
  platform?: string;
  tags?: string[];
  eligibility?: string[];
  benefits?: string[];
  coverage?: string;
  duration?: string;
  prize?: string;
  deadline?: string;
}

export function GenericGridSection({
  title,
  items,
  isLoading,
  bookmarkedIds,
  onToggleBookmark,
  icon,
  accent,
}: {
  title: string;
  items: GridSectionItem[];
  isLoading: boolean;
  bookmarkedIds?: Set<string>;
  onToggleBookmark?: (id: string) => void;
  icon: React.ElementType;
  accent: string;
}) {
  const { t } = useI18n();
  if (isLoading) return <SkeletonCards count={3} columns={3} />;
  if (items.length === 0) return <EmptyState titleKey="opportunityHub.emptyState.title" descriptionKey="opportunityHub.emptyState.description" />;
  const Icon = icon;

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[18px] font-[700] tracking-[-0.02em] text-slate-900 dark:text-white flex items-center gap-2.5">
          <span className={`flex h-8 w-8 items-center justify-center rounded-[10px] bg-gradient-to-br ${accent} text-white shadow-sm`}>
            <Icon className="h-4 w-4" />
          </span>
          {title}
        </h2>
        <Badge variant="secondary" size="sm">{items.length}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
            <Card className="h-full p-4 hover:shadow-[0_8px_20px_rgba(15,23,42,0.06)] hover:-translate-y-[1px] transition-all group">
              <div className="flex items-start gap-3 mb-3">
                <div className="h-10 w-10 rounded-[11px] bg-slate-50 dark:bg-white/[0.06] border border-slate-200/60 dark:border-slate-700/50 flex items-center justify-center font-bold text-[12px] shadow-sm">
                  {(item.provider || item.organization || item.platform || "?")[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-[13.5px] leading-tight tracking-[-0.01em] text-slate-900 dark:text-white truncate group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA]">{item.title}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{item.provider || item.platform || item.organization}</p>
                </div>
              </div>
              <p className="text-[12px] leading-[1.5] text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">{item.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {(item.tags || item.eligibility || item.benefits || []).slice(0, 2).map((tag: string) => (
                  <Badge key={tag} variant="secondary" size="sm" className="text-[10px]">{tag}</Badge>
                ))}
                {item.coverage && <Badge variant="emerald" size="sm" className="text-[10px]">{item.coverage}</Badge>}
                {item.duration && <Badge variant="secondary" size="sm" className="text-[10px]">{item.duration}</Badge>}
                {item.prize && <Badge variant="ai" size="sm" className="text-[10px]">{item.prize}</Badge>}
              </div>
              {item.deadline && (
                <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-3">
                  <Clock className="h-3 w-3" />
                  {formatDate(item.deadline)}
                </div>
              )}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                {bookmarkedIds && onToggleBookmark ? (
                  <Button variant="ghost" size="icon-sm" className="rounded-full" onClick={() => onToggleBookmark(item.id)}>
                    <Bookmark className={`h-4 w-4 ${bookmarkedIds.has(item.id) ? "fill-[#2563EB] text-[#2563EB]" : ""}`} />
                  </Button>
                ) : <span />}
                <Button size="sm" className="rounded-full h-7 px-3 text-[11px] gap-1">
                  Apply <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
