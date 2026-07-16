"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GraduationCap, Clock, ExternalLink, Bookmark } from "lucide-react";
import { EmptyState } from "./EmptyState";
import { SkeletonCards } from "./SkeletonCards";
import { formatDate } from "@/lib/utils";
import type { Scholarship } from "@/lib/types";

interface ScholarshipsSectionProps {
  scholarships: Scholarship[];
  isLoading: boolean;
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string) => void;
}

export function ScholarshipsSection({ scholarships, isLoading, bookmarkedIds, onToggleBookmark }: ScholarshipsSectionProps) {
  const { t } = useI18n();

  if (isLoading) return <SkeletonCards count={3} columns={3} />;
  if (scholarships.length === 0) return <EmptyState titleKey="opportunityHub.emptyState.title" descriptionKey="opportunityHub.emptyState.description" />;

  return (
    <section aria-label={t("opportunityHub.scholarships.title")}>
      <h2 className="mb-5 text-xl font-semibold tracking-tight">{t("opportunityHub.scholarships.title")}</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {scholarships.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.06 }}
          >
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold leading-tight">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.provider}</p>
                  </div>
                </div>
                <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="success" className="text-xs">{item.coverage}</Badge>
                  {item.eligibility.slice(0, 1).map((e) => (
                    <Badge key={e} variant="outline" className="text-xs">{e}</Badge>
                  ))}
                </div>
                {item.deadline && (
                  <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {t("opportunityHub.common.deadline")}: {formatDate(item.deadline)}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t px-5 py-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  onClick={() => onToggleBookmark(item.id)}
                  aria-label={bookmarkedIds.has(item.id) ? t("opportunityHub.featured.removeBookmark") : t("opportunityHub.featured.addBookmark")}
                >
                  <Bookmark className={`h-4 w-4 ${bookmarkedIds.has(item.id) ? "fill-primary text-primary" : ""}`} aria-hidden="true" />
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
    </section>
  );
}
