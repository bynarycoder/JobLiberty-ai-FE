"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { Card, CardContent } from "@/components/ui/Card";
import { getIcon } from "./icons";
import { Badge } from "@/components/ui/Badge";
import type { OpportunityCategory } from "@/lib/types";

interface OpportunityCategoriesProps {
  categories: OpportunityCategory[];
  activeCategory: string;
  onSelect: (id: string) => void;
}

export function OpportunityCategories({ categories, activeCategory, onSelect }: OpportunityCategoriesProps) {
  const { t } = useI18n();

  return (
    <section aria-label={t("opportunityHub.categories.title")}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[18px] font-[700] tracking-[-0.02em] text-slate-900 dark:text-white">{t("opportunityHub.categories.title")}</h2>
        <Badge variant="secondary" size="sm">
          {categories.length} categories
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {categories.map((category, idx) => {
          const Icon = getIcon(category.icon);
          const isActive = activeCategory === category.id;

          return (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(isActive ? "all" : category.id)}
              className="text-left group relative w-full"
              aria-pressed={isActive}
            >
              <Card
                className={`h-full p-5 transition-all duration-300 overflow-hidden relative ${
                  isActive
                    ? "border-[#2563EB] dark:border-[#3B82F6] shadow-[0_8px_24px_rgba(37,99,235,0.12)] ring-[2px] ring-[#2563EB]/15"
                    : "border-slate-200/70 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-[0_8px_20px_rgba(15,23,42,0.06)]"
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-[0.04] group-hover:opacity-[0.08] transition-opacity ${isActive ? "opacity-[0.10]" : ""}`} />

                <CardContent className="p-0 relative">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-[12px] bg-gradient-to-br ${category.color} text-white shadow-[0_4px_10px_rgba(0,0,0,0.15)] group-hover:shadow-lg group-hover:scale-[1.05] transition-all duration-300`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide border ${isActive ? "bg-[#2563EB] text-white border-[#2563EB]" : "bg-slate-50 dark:bg-white/[0.06] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"}`}>
                        {category.count.toLocaleString()}
                      </span>
                      {isActive && <span className="h-1 w-1 rounded-full bg-[#2563EB] animate-pulse" />}
                    </div>
                  </div>

                  <h3 className={`font-semibold tracking-[-0.01em] text-[14.5px] ${isActive ? "text-[#2563EB] dark:text-[#60A5FA]" : "text-slate-900 dark:text-slate-100 group-hover:text-slate-900 dark:group-hover:text-white"}`}>{t(category.titleKey)}</h3>
                  <p className="mt-1 line-clamp-2 text-[12.5px] leading-[1.5] text-slate-500 dark:text-slate-400">{t(category.descriptionKey)}</p>

                  <div className={`mt-3 h-1 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`}>
                    <div className={`h-full bg-gradient-to-r ${category.color} w-[68%]`} />
                  </div>
                </CardContent>
              </Card>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
