"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BookOpen, Clock, ExternalLink } from "lucide-react";
import { SkeletonCards } from "./SkeletonCards";
import { EmptyState } from "./EmptyState";
import { useI18n } from "@/providers/I18nProvider";
export function LearningResourcesSection({ resources, isLoading }: { resources: any[]; isLoading: boolean }) {
  const { t } = useI18n();
  if (isLoading) return <SkeletonCards count={4} columns={4} />;
  if (resources.length === 0) return <EmptyState titleKey="opportunityHub.emptyState.title" descriptionKey="opportunityHub.emptyState.description" />;
  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[18px] font-[700] tracking-[-0.02em] text-slate-900 dark:text-white flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-sm"><BookOpen className="h-4 w-4" /></span>
          Learning Resources
        </h2>
        <Badge variant="secondary" size="sm">{resources.length}</Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {resources.map((item: any, idx: number) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
            <Card className="h-full p-4 hover:shadow-md hover:-translate-y-[1px] transition-all group">
              <div className="flex items-start gap-3 mb-3">
                <div className="h-10 w-10 rounded-[11px] bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30 flex items-center justify-center"><BookOpen className="h-5 w-5 text-orange-600 dark:text-orange-400" /></div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-[13.5px] leading-tight tracking-[-0.01em] truncate group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA]">{item.title}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.provider}</p>
                </div>
              </div>
              <p className="text-[12px] leading-[1.5] text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">{item.description}</p>
              <div className="flex gap-1.5 mb-3 flex-wrap">
                <Badge variant={item.free ? "emerald" : "secondary"} size="sm" className="text-[10px]">{item.free ? "Free" : "Paid"}</Badge>
                <Badge variant="outline" size="sm" className="text-[10px]">{item.difficulty}</Badge>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mb-3"><Clock className="h-3 w-3" />{item.duration}</div>
              <Button size="sm" variant="outline" className="w-full rounded-full gap-1 text-[12px]">Start <ExternalLink className="h-3 w-3" /></Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
