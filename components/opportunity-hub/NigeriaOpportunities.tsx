"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Building2, ExternalLink, Bookmark } from "lucide-react";
import { EmptyState } from "./EmptyState";
import { SkeletonCards } from "./SkeletonCards";
import { NIGERIA_CITIES } from "@/lib/services/opportunities";
import type { NigeriaOpportunity, WorkMode } from "@/lib/types";

interface NigeriaOpportunitiesProps {
  opportunities: NigeriaOpportunity[];
  isLoading: boolean;
  city: string;
  workMode: WorkMode | "all";
  onCityChange: (city: string) => void;
  onWorkModeChange: (mode: WorkMode | "all") => void;
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string) => void;
}

export function NigeriaOpportunities({
  opportunities,
  isLoading,
  city,
  workMode,
  onCityChange,
  onWorkModeChange,
  bookmarkedIds,
  onToggleBookmark,
}: NigeriaOpportunitiesProps) {
  const { t } = useI18n();

  const workModes: (WorkMode | "all")[] = ["all", "remote", "hybrid", "onsite"];

  const filtered = opportunities.filter((o) => {
    const cityMatch = city === "all" || o.city === city || (city === "Remote" && o.workMode === "remote");
    const modeMatch = workMode === "all" || o.workMode === workMode;
    return cityMatch && modeMatch;
  });

  return (
    <section aria-label={t("opportunityHub.nigeria.title")}>
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">
            🇳🇬
          </span>
          <h2 className="text-xl font-semibold tracking-tight">{t("opportunityHub.nigeria.title")}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            aria-label={t("opportunityHub.nigeria.cityLabel")}
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            className="h-9 rounded-xl border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="all">{t("opportunityHub.nigeria.allCities")}</option>
            {NIGERIA_CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <div className="flex rounded-xl border bg-background p-1">
            {workModes.map((m) => (
              <button
                key={m}
                onClick={() => onWorkModeChange(m)}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  workMode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
                }`}
                aria-pressed={workMode === m}
              >
                {m === "all" ? t("opportunityHub.filters.allWorkModes") : t(`opportunityHub.filters.${m}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <SkeletonCards count={6} columns={3} />
      ) : filtered.length === 0 ? (
        <EmptyState titleKey="opportunityHub.emptyState.title" descriptionKey="opportunityHub.emptyState.description" />
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((opportunity, idx) => (
            <motion.div
              key={opportunity.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
            >
              <Card className="group h-full transition-shadow hover:shadow-md">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                        {opportunity.logoPlaceholder}
                      </div>
                      <div>
                        <h3 className="font-semibold leading-tight">{opportunity.title}</h3>
                        <p className="text-sm text-muted-foreground">{opportunity.organization}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="shrink-0 capitalize">
                      {opportunity.workMode}
                    </Badge>
                  </div>
                  <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">{opportunity.description}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {opportunity.city}
                    </div>
                    <div className="flex items-center gap-1">
                      <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                      {opportunity.industry}
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <Badge variant="secondary" className="text-xs">
                      {opportunity.roleType}
                    </Badge>
                    {opportunity.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t px-5 py-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-lg"
                    onClick={() => onToggleBookmark(opportunity.id)}
                    aria-label={bookmarkedIds.has(opportunity.id) ? t("opportunityHub.featured.removeBookmark") : t("opportunityHub.featured.addBookmark")}
                  >
                    <Bookmark
                      className={`h-4 w-4 ${bookmarkedIds.has(opportunity.id) ? "fill-primary text-primary" : ""}`}
                      aria-hidden="true"
                    />
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1.5 rounded-xl">
                    {t("opportunityHub.featured.apply")}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
