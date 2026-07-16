"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Clock, Bookmark, Share2, ExternalLink } from "lucide-react";
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

export function FeaturedOpportunities({
  opportunities,
  isLoading,
  bookmarkedIds,
  onToggleBookmark,
}: FeaturedOpportunitiesProps) {
  const { t } = useI18n();

  if (isLoading) return <SkeletonCards count={4} columns={2} />;
  if (opportunities.length === 0) return <EmptyState titleKey="opportunityHub.emptyState.title" descriptionKey="opportunityHub.emptyState.description" />;

  return (
    <section aria-label={t("opportunityHub.featured.title")}>
      <h2 className="mb-5 text-xl font-semibold tracking-tight">{t("opportunityHub.featured.title")}</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {opportunities.map((opportunity, idx) => (
          <motion.div
            key={opportunity.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.08 }}
          >
            <Card className="group h-full overflow-hidden border bg-gradient-to-br from-card to-card transition-shadow hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                      {opportunity.logoPlaceholder}
                    </div>
                    <div>
                      <h3 className="font-semibold leading-tight">{opportunity.title}</h3>
                      <p className="text-sm text-muted-foreground">{opportunity.organization}</p>
                    </div>
                  </div>
                  <Badge variant={opportunity.isRemote ? "success" : "secondary"} className="shrink-0">
                    {opportunity.isRemote ? t("opportunityHub.filters.remote") : opportunity.workMode}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-4 pt-0">
                <p className="line-clamp-2 text-sm text-muted-foreground">{opportunity.description}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {opportunity.location}
                  </div>
                  {opportunity.deadline && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {t("opportunityHub.common.deadline")}: {formatDate(opportunity.deadline)}
                    </div>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="outline">{opportunity.category}</Badge>
                  {opportunity.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t bg-zinc-50/60 px-6 py-4 dark:bg-zinc-900/40">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-semibold text-emerald-600">{opportunity.opportunityScore}%</div>
                  <div className="text-xs text-muted-foreground">{t("opportunityHub.featured.score")}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl"
                    onClick={() => onToggleBookmark(opportunity.id)}
                    aria-label={bookmarkedIds.has(opportunity.id) ? t("opportunityHub.featured.removeBookmark") : t("opportunityHub.featured.addBookmark")}
                  >
                    <Bookmark
                      className={`h-4 w-4 ${bookmarkedIds.has(opportunity.id) ? "fill-primary text-primary" : ""}`}
                      aria-hidden="true"
                    />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl" aria-label={t("opportunityHub.featured.share")}>
                    <Share2 className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button size="sm" className="gap-1.5 rounded-xl">
                    {t("opportunityHub.featured.apply")}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
