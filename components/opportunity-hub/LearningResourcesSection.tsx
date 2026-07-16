"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BookOpen, Clock, ExternalLink } from "lucide-react";
import { EmptyState } from "./EmptyState";
import { SkeletonCards } from "./SkeletonCards";
import type { LearningResource } from "@/lib/types";

interface LearningResourcesSectionProps {
  resources: LearningResource[];
  isLoading: boolean;
}

export function LearningResourcesSection({ resources, isLoading }: LearningResourcesSectionProps) {
  const { t } = useI18n();

  if (isLoading) return <SkeletonCards count={4} columns={4} />;
  if (resources.length === 0) return <EmptyState titleKey="opportunityHub.emptyState.title" descriptionKey="opportunityHub.emptyState.description" />;

  const difficultyVariant = {
    Beginner: "success",
    Intermediate: "secondary",
    Advanced: "default",
  } as const;

  return (
    <section aria-label={t("opportunityHub.learning.title")}>
      <h2 className="mb-5 text-xl font-semibold tracking-tight">{t("opportunityHub.learning.title")}</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {resources.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
          >
            <Card className="group h-full transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                    <BookOpen className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold leading-tight">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.provider}</p>
                  </div>
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant={item.free ? "success" : "secondary"} className="text-xs">
                    {item.free ? t("opportunityHub.learning.free") : t("opportunityHub.learning.paid")}
                  </Badge>
                  <Badge variant={difficultyVariant[item.difficulty]} className="text-xs">
                    {item.difficulty}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {item.duration}
                </div>
              </CardContent>
              <CardFooter className="border-t px-5 py-3">
                <Button size="sm" variant="outline" className="w-full gap-1.5 rounded-xl">
                  {t("opportunityHub.learning.start")}
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
