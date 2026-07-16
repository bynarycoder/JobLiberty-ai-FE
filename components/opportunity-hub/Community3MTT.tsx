"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { Card, CardContent } from "@/components/ui/Card";
import { getIcon } from "./icons";
import { SkeletonCards } from "./SkeletonCards";
import { Badge } from "@/components/ui/Badge";
import type { CommunityCard } from "@/lib/types";

export function Community3MTT({ cards, isLoading }: { cards: CommunityCard[]; isLoading: boolean }) {
  const { t } = useI18n();

  return (
    <section>
      <div className="mb-5 relative overflow-hidden rounded-[20px] border border-[#A7F3D0] dark:border-[#064E3B]/30 bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857] p-[1.5px] shadow-[0_8px_24px_rgba(16,185,129,0.15)]">
        <div className="rounded-[18px] bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857] p-5 lg:p-6 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(at_0%_0%,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          </div>
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇳🇬</span>
              <div>
                <h2 className="text-[18px] font-[700] tracking-[-0.02em] text-white">{t("opportunityHub.community3mtt.title")}</h2>
                <p className="text-[13px] text-white/80 max-w-[48ch]">{t("opportunityHub.community3mtt.subtitle")}</p>
              </div>
            </div>
            <Badge className="bg-white/15 border-white/20 text-white backdrop-blur-sm">{t("opportunityHub.community3mtt.members")}</Badge>
          </div>
        </div>
      </div>

      {isLoading ? (
        <SkeletonCards count={4} columns={4} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, idx) => {
            const Icon = getIcon(card.icon);
            return (
              <motion.div key={card.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                <Card className="group h-full overflow-hidden hover:shadow-[0_8px_20px_rgba(15,23,42,0.06)] hover:-translate-y-[1px] transition-all">
                  <div className={`h-1 w-full bg-gradient-to-r ${card.color}`} />
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-[11px] bg-gradient-to-br ${card.color} text-white shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full bg-slate-50 dark:bg-white/[0.06] border border-slate-200 dark:border-slate-700 px-2.5 py-0.5 text-[11px] font-bold">{card.count}</span>
                    </div>
                    <h3 className="font-semibold tracking-[-0.01em] text-[14px] text-slate-900 dark:text-white">{t(card.titleKey)}</h3>
                    <p className="mt-1 text-[12px] leading-[1.5] text-slate-500 dark:text-slate-400 line-clamp-2">{t(card.descriptionKey)}</p>
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
