"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { Card, CardContent } from "@/components/ui/Card";
import { getIcon } from "./icons";
import { SkeletonCards } from "./SkeletonCards";
import type { CommunityCard } from "@/lib/types";

interface Community3MTTProps {
  cards: CommunityCard[];
  isLoading: boolean;
}

export function Community3MTT({ cards, isLoading }: Community3MTTProps) {
  const { t } = useI18n();

  return (
    <section aria-label={t("opportunityHub.community3mtt.title")}>
      <div className="mb-5 rounded-2xl border bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl" aria-hidden="true">
                🇳🇬
              </span>
              <h2 className="text-xl font-semibold tracking-tight">{t("opportunityHub.community3mtt.title")}</h2>
            </div>
            <p className="mt-1 max-w-2xl text-emerald-100">{t("opportunityHub.community3mtt.subtitle")}</p>
          </div>
          <div className="shrink-0 rounded-xl bg-white/15 px-4 py-2 text-center text-sm font-medium backdrop-blur-sm">
            {t("opportunityHub.community3mtt.members")}
          </div>
        </div>
      </div>

      {isLoading ? (
        <SkeletonCards count={4} columns={4} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, idx) => {
            const Icon = getIcon(card.icon);
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <Card className="group h-full overflow-hidden border-0 bg-gradient-to-br from-card to-card shadow-sm transition-shadow hover:shadow-md">
                  <div className={`h-1.5 w-full bg-gradient-to-r ${card.color}`} aria-hidden="true" />
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} text-white transition-transform group-hover:scale-110`}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">{card.count}</span>
                    </div>
                    <h3 className="mt-4 font-semibold">{t(card.titleKey)}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{t(card.descriptionKey)}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
