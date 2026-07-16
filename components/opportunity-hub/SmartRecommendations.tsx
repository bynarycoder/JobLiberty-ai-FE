"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, Zap } from "lucide-react";
import { SkeletonCards } from "./SkeletonCards";
import { getIcon } from "./icons";
import type { SmartRecommendation } from "@/lib/types";

interface SmartRecommendationsProps {
  recommendations: SmartRecommendation[];
  isLoading: boolean;
}

export function SmartRecommendations({ recommendations, isLoading }: SmartRecommendationsProps) {
  const { t } = useI18n();

  return (
    <section aria-label={t("opportunityHub.recommendations.title")}>
      <Card className="overflow-hidden border bg-gradient-to-br from-violet-600 to-indigo-700 text-white">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </div>
            <CardTitle className="text-white">{t("opportunityHub.recommendations.title")}</CardTitle>
          </div>
          <p className="text-sm text-violet-100">{t("opportunityHub.recommendations.subtitle")}</p>
        </CardHeader>
        <CardContent className="pt-2">
          {isLoading ? (
            <SkeletonCards count={3} columns={1} />
          ) : (
            <ul className="space-y-3">
              {recommendations.map((rec, idx) => {
                const Icon = getIcon(rec.icon);
                return (
                  <motion.li
                    key={rec.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.08 }}
                    className="flex items-center gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur-sm transition-colors hover:bg-white/15"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="truncate font-medium">{rec.title}</h4>
                        <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                          <Zap className="mr-1 h-3 w-3" aria-hidden="true" />
                          {rec.confidence}%
                        </Badge>
                      </div>
                      <p className="mt-0.5 text-xs text-violet-100">{t(rec.reasonKey)}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
