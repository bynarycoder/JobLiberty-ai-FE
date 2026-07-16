"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Sparkles, Bot, Search, GraduationCap, Rocket, MapPin, Monitor, BookOpen, MessageSquare, Route } from "lucide-react";

export function LibertyAIPanel() {
  const { t } = useI18n();

  const actions = [
    { key: "findOpportunities", icon: Search },
    { key: "recommendScholarships", icon: GraduationCap },
    { key: "recommendFellowships", icon: Rocket },
    { key: "findRemoteJobs", icon: Monitor },
    { key: "findLocalJobs", icon: MapPin },
    { key: "recommendCourses", icon: BookOpen },
    { key: "interviewPrep", icon: MessageSquare },
    { key: "careerRoadmap", icon: Route },
  ] as const;

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="lg:sticky lg:top-24 lg:h-fit"
      aria-label={t("opportunityHub.libertyAI.title")}
    >
      <Card className="overflow-hidden border bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20">
              <Bot className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <CardTitle className="text-lg text-white">{t("opportunityHub.libertyAI.title")}</CardTitle>
              <p className="text-xs text-blue-100">{t("opportunityHub.libertyAI.subtitle")}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="mb-4 text-sm text-blue-100">{t("opportunityHub.libertyAI.description")}</p>
          <div className="grid grid-cols-1 gap-2">
            {actions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.key}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.3 + idx * 0.05 }}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 rounded-xl bg-white/10 text-white hover:bg-white/20 hover:text-white focus-visible:ring-white/50"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span className="text-sm">{t(`opportunityHub.libertyAI.actions.${action.key}`)}</span>
                    <Sparkles className="ml-auto h-3.5 w-3.5 text-blue-200" aria-hidden="true" />
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.aside>
  );
}
