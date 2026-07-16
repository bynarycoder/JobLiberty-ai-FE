"use client";

import React from "react";
import { useI18n } from "@/providers/I18nProvider";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BookOpen, Clock, Star, ArrowUpRight, Sparkles, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export default function CareerResources() {
  const { t } = useI18n();
  const { data: resources = [] } = useQuery({ queryKey: ["resources"], queryFn: () => api.fetchCareerResources() });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-[30px] font-[800] tracking-[-0.03em] leading-[1.1] text-slate-900 dark:text-white">{t("resources.title")}</h1>
            <Badge variant="emerald" size="sm" dot pulse>
              Curated
            </Badge>
          </div>
          <p className="text-[13.5px] font-[450] text-slate-600 dark:text-slate-400 mt-1 max-w-[60ch]">{t("resources.subtitle")} • AI picks • Free & paid • Verified for Nigerian learners</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" size="sm" className="gap-1.5">
            <BookOpen className="h-3 w-3" />
            {resources.length} resources
          </Badge>
          <Badge variant="indigo" size="sm" className="gap-1">
            <Sparkles className="h-3 w-3" />
            Liberty AI picks
          </Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {resources.map((res, i) => (
          <motion.div
            key={res.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="flex flex-col h-full group hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:-translate-y-[1px] transition-all duration-300 overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#10B981] opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-3">
                  <div className="flex items-start gap-2.5 min-w-0 flex-1">
                    <div className="h-9 w-9 rounded-[10px] bg-[#F8FAFC] dark:bg-white/[0.04] border border-slate-200/60 dark:border-slate-700/50 flex items-center justify-center shrink-0 group-hover:scale-[1.05] transition-transform">
                      <GraduationCap className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                    </div>
                    <CardTitle className="text-[15px] leading-[1.3] tracking-[-0.01em] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">{res.title}</CardTitle>
                  </div>
                  <Badge variant={res.free ? "emerald" : "secondary"} size="sm" className="shrink-0">
                    {res.free ? t("resources.free") : t("resources.paid")}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-[12px] font-[450] text-slate-500 dark:text-slate-400 mt-1">
                  <span>{res.provider}</span>
                  <span className="h-2.5 w-px bg-slate-200 dark:bg-slate-700" />
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {res.duration}
                  </span>
                  <span className="h-2.5 w-px bg-slate-200 dark:bg-slate-700" />
                  <Badge variant={res.difficulty === "Beginner" ? "emerald" : res.difficulty === "Intermediate" ? "amber" : "rose"} size="sm" className="text-[10px]">
                    {res.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-[13px] leading-[1.6] text-slate-600 dark:text-slate-400 flex-1">{res.description}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {res.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" size="sm" className="text-[11px]">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-2">
                  <a href={res.url} target="_blank" rel="noopener" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full rounded-full gap-1.5 group-hover:border-[#2563EB]/30 group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">
                      {t("resources.startLearning")}
                      <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Button>
                  </a>
                  <Button variant="ghost" size="icon-sm" className="rounded-full">
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
