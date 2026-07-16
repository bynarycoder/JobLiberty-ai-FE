"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  MapPin,
  FileText,
  Target,
  GraduationCap,
  Briefcase,
  Building2,
  Languages,
  ExternalLink,
} from "lucide-react";
import { SkeletonCards } from "./SkeletonCards";
import { getIcon } from "./icons";
import { useI18n } from "@/providers/I18nProvider";
import type { SmartRecommendation } from "@/lib/types";

interface SmartRecommendationsProps {
  recommendations: SmartRecommendation[];
  isLoading: boolean;
}

function confidenceColor(score: number): string {
  if (score >= 90) return "text-[#10B981] dark:text-[#34D399]";
  if (score >= 80) return "text-[#2563EB] dark:text-[#60A5FA]";
  if (score >= 70) return "text-[#F59E0B] dark:text-[#FBBF24]";
  return "text-slate-500";
}

function confidenceBar(score: number): string {
  if (score >= 90) return "bg-[#10B981]";
  if (score >= 80) return "bg-[#2563EB]";
  if (score >= 70) return "bg-[#F59E0B]";
  return "bg-slate-400";
}

export function SmartRecommendations({
  recommendations,
  isLoading,
}: SmartRecommendationsProps) {
  const { t, language } = useI18n();

  return (
    <section aria-label={t("opportunityHub.recommendations.title")}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#7C3AED] to-[#4C1D95] text-white shadow-sm">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-[18px] font-[700] tracking-[-0.02em] text-slate-900 dark:text-white">
              {t("opportunityHub.recommendations.title")}
            </h2>
            <p className="text-[12.5px] text-slate-500 dark:text-slate-400">
              {t("opportunityHub.recommendations.subtitle")}
            </p>
          </div>
        </div>
        <Badge variant="ai" size="sm" className="gap-1 self-start sm:self-auto">
          <Sparkles className="h-3 w-3" />
          AI · Confidence scored
        </Badge>
      </div>

      {/* Match context chips */}
      <div className="mb-4 flex flex-wrap gap-2">
        {[
          { icon: FileText, label: "Resume analyzed" },
          { icon: Target, label: "Career goal matched" },
          { icon: GraduationCap, label: "Education considered" },
          { icon: Briefcase, label: "Experience weighed" },
          { icon: Building2, label: "Preferred industry" },
          { icon: MapPin, label: "Preferred location" },
          { icon: Languages, label: `Language: ${language?.toUpperCase?.() || "EN"}` },
        ].map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300"
          >
            <Icon className="h-3 w-3 text-[#7C3AED]" />
            {label}
          </span>
        ))}
      </div>

      {isLoading ? (
        <SkeletonCards count={3} columns={1} />
      ) : (
        <div className="grid grid-cols-1 gap-3.5">
          {recommendations.map((rec, idx) => {
            const Icon = getIcon(rec.icon);
            return (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="group overflow-hidden p-0 hover:shadow-[0_10px_28px_rgba(124,58,237,0.1)] hover:-translate-y-[1px] transition-all duration-300 border-slate-200/70 dark:border-slate-800">
                  <div className="flex flex-col md:flex-row">
                    {/* Confidence rail */}
                    <div className="md:w-[110px] shrink-0 bg-gradient-to-br from-[#7C3AED]/8 via-[#6D28D9]/6 to-[#4C1D95]/8 dark:from-[#7C3AED]/15 dark:via-[#6D28D9]/10 dark:to-[#4C1D95]/15 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 p-4 flex md:flex-col items-center justify-center gap-3">
                      <div className="relative flex h-16 w-16 items-center justify-center">
                        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="text-slate-200 dark:text-slate-700"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeDasharray={`${rec.confidence}, 100`}
                            strokeLinecap="round"
                            className={confidenceColor(rec.confidence)}
                          />
                        </svg>
                        <span
                          className={`text-[14px] font-[800] tracking-tight tabular-nums ${confidenceColor(
                            rec.confidence
                          )}`}
                        >
                          {rec.confidence}%
                        </span>
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] font-bold tracking-[0.06em] uppercase text-slate-500 dark:text-slate-400">
                          AI Confidence
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 p-4 md:p-5">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-gradient-to-br from-[#7C3AED] to-[#4C1D95] text-white shadow-sm group-hover:scale-[1.04] transition-transform">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold tracking-[-0.01em] text-[14.5px] text-slate-900 dark:text-white group-hover:text-[#7C3AED] dark:group-hover:text-[#A78BFA] transition-colors">
                              {rec.title}
                            </h3>
                            <p className="text-[12.5px] text-slate-500 dark:text-slate-400">
                              {rec.organization}
                              {rec.location ? ` · ${rec.location}` : ""}
                            </p>
                          </div>
                        </div>
                        <Badge variant="indigo" size="sm" className="shrink-0 capitalize">
                          {rec.type}
                        </Badge>
                      </div>

                      <p className="text-[12.5px] leading-[1.55] text-slate-600 dark:text-slate-400 mb-3">
                        {rec.reason || t(rec.reasonKey)}
                      </p>

                      {/* Match factors */}
                      {rec.matchFactors && (
                        <div className="mb-3 flex flex-wrap gap-1.5">
                          {rec.matchFactors.resume && (
                            <Badge variant="secondary" size="sm">
                              Resume match
                            </Badge>
                          )}
                          {rec.matchFactors.skills?.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="outline" size="sm">
                              {skill}
                            </Badge>
                          ))}
                          {rec.matchFactors.careerGoal && (
                            <Badge variant="sky" size="sm">
                              Goal: {rec.matchFactors.careerGoal}
                            </Badge>
                          )}
                          {rec.matchFactors.preferredIndustry && (
                            <Badge variant="emerald" size="sm">
                              {rec.matchFactors.preferredIndustry}
                            </Badge>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex-1 max-w-[200px]">
                          <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${confidenceBar(rec.confidence)} transition-all`}
                              style={{ width: `${rec.confidence}%` }}
                            />
                          </div>
                          {rec.salary && (
                            <div className="mt-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                              {rec.salary}
                            </div>
                          )}
                        </div>
                        <Button size="sm" className="rounded-full gap-1 h-8 px-3 text-[12px]">
                          View
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
