"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Building2, MapPin, Briefcase, Star, ExternalLink } from "lucide-react";
import { SkeletonCards } from "./SkeletonCards";
import type { FeaturedEmployer } from "@/lib/types";

interface FeaturedEmployersProps {
  employers: FeaturedEmployer[];
  isLoading: boolean;
}

const GROUP_ORDER = [
  "Technology",
  "Banking",
  "Healthcare",
  "Education",
  "Government",
  "Media",
  "NGOs",
];

const LOGO_GRADIENTS = [
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-violet-500 to-purple-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-cyan-500 to-sky-600",
  "from-fuchsia-500 to-pink-600",
  "from-slate-600 to-slate-800",
];

function logoGradient(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return LOGO_GRADIENTS[Math.abs(hash) % LOGO_GRADIENTS.length];
}

export function FeaturedEmployers({ employers, isLoading }: FeaturedEmployersProps) {
  const { t } = useI18n();
  const [activeGroup, setActiveGroup] = useState<string>("all");

  const groups = useMemo(() => {
    const present = new Set(employers.map((e) => e.industryGroup));
    return GROUP_ORDER.filter((g) => present.has(g));
  }, [employers]);

  const filtered = useMemo(() => {
    if (activeGroup === "all") return employers;
    return employers.filter((e) => e.industryGroup === activeGroup);
  }, [employers, activeGroup]);

  if (isLoading) return <SkeletonCards count={8} columns={4} />;

  return (
    <section aria-label={t("opportunityHub.employers.title")}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white shadow-sm">
            <Building2 className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-[18px] font-[700] tracking-[-0.02em] text-slate-900 dark:text-white flex items-center gap-2">
              {t("opportunityHub.employers.title")}
              <Badge variant="amber" size="sm" className="gap-1">
                <Star className="h-3 w-3" /> Premium
              </Badge>
            </h2>
            <p className="text-[12.5px] text-slate-500 dark:text-slate-400">
              {t("opportunityHub.employers.subtitle")}
            </p>
          </div>
        </div>
        <Badge variant="secondary" size="sm">
          {employers.length} employers
        </Badge>
      </div>

      {/* Industry group tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveGroup("all")}
          className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold border transition-all ${
            activeGroup === "all"
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
              : "bg-white dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300"
          }`}
        >
          All
        </button>
        {groups.map((group) => (
          <button
            key={group}
            type="button"
            onClick={() => setActiveGroup(group)}
            className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold border transition-all ${
              activeGroup === group
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
                : "bg-white dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300"
            }`}
          >
            {group}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
        {filtered.map((employer, idx) => (
          <motion.div
            key={employer.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.03, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="group h-full p-4 hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] hover:-translate-y-[2px] transition-all duration-300 relative overflow-hidden">
              {employer.featured && (
                <div className="absolute top-3 right-3">
                  <Badge variant="amber" size="sm" className="gap-0.5 shadow-sm">
                    <Star className="h-3 w-3 fill-current" /> Featured
                  </Badge>
                </div>
              )}

              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-[14px] bg-gradient-to-br ${logoGradient(
                      employer.name
                    )} text-white text-[13px] font-bold shadow-md group-hover:scale-[1.05] group-hover:shadow-lg transition-all`}
                  >
                    {employer.logoPlaceholder}
                  </div>
                  <div className="min-w-0 pr-16">
                    <h3 className="font-semibold tracking-[-0.01em] text-[14px] text-slate-900 dark:text-white truncate group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">
                      {employer.name}
                    </h3>
                    <p className="text-[11.5px] text-slate-500 dark:text-slate-400 truncate">
                      {employer.industry}
                    </p>
                  </div>
                </div>

                <p className="line-clamp-2 text-[12px] leading-[1.5] text-slate-500 dark:text-slate-400 mb-3">
                  {employer.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 mb-3 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {employer.location}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#2563EB] dark:text-[#60A5FA]">
                    <Briefcase className="h-3 w-3" />
                    {employer.openRoles} open roles
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {(employer.tags ?? []).slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full rounded-full h-8 text-[12px] gap-1 group-hover:border-[#2563EB]/40 group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA]"
                >
                  View opportunities
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
