"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { Card, CardContent } from "@/components/ui/Card";
import { getIcon } from "./icons";
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
      <h2 className="mb-5 text-xl font-semibold tracking-tight">{t("opportunityHub.categories.title")}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {categories.map((category, idx) => {
          const Icon = getIcon(category.icon);
          const isActive = activeCategory === category.id;
          return (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(isActive ? "all" : category.id)}
              className={`text-left transition-all ${isActive ? "ring-2 ring-ring ring-offset-2" : ""}`}
              aria-pressed={isActive}
              aria-label={t(category.titleKey)}
            >
              <Card className="group h-full border bg-gradient-to-br from-card to-card p-5 hover:shadow-md">
                <CardContent className="p-0">
                  <div className="flex items-start justify-between">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${category.color} text-white shadow-sm transition-transform group-hover:scale-110`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                      {category.count.toLocaleString()}
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold">{t(category.titleKey)}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{t(category.descriptionKey)}</p>
                </CardContent>
              </Card>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
