"use client";

import React from "react";
import { useI18n } from "@/providers/I18nProvider";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/services/api";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PageHero } from "@/components/dashboard/PageHero";
import { BookOpen, Clock, Star, ArrowUpRight, Sparkles, GraduationCap, PlayCircle, FileCode2, FileText, Users, Award, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TYPE_META: Record<string, { icon: React.ElementType; tint: string; iconBox: string; strip: string }> = {
  course: { icon: GraduationCap, tint: "tint-blue", iconBox: "bg-[#2563EB] shadow-[0_8px_18px_-6px_rgba(37,99,235,0.65)]", strip: "bg-gradient-to-r from-[#2563EB] to-[#4F46E5]" },
  video: { icon: PlayCircle, tint: "tint-rose", iconBox: "bg-[#EF4444] shadow-[0_8px_18px_-6px_rgba(239,68,68,0.6)]", strip: "bg-gradient-to-r from-[#DC2626] to-[#EF4444]" },
  project: { icon: FileCode2, tint: "tint-purple", iconBox: "bg-[#7C3AED] shadow-[0_8px_18px_-6px_rgba(124,58,237,0.65)]", strip: "bg-gradient-to-r from-[#7C3AED] to-[#9333EA]" },
  documentation: { icon: FileText, tint: "tint-sky", iconBox: "bg-[#0EA5E9] shadow-[0_8px_18px_-6px_rgba(14,165,233,0.65)]", strip: "bg-gradient-to-r from-[#0284C7] to-[#0EA5E9]" },
  community: { icon: Users, tint: "tint-emerald", iconBox: "bg-[#10B981] shadow-[0_8px_18px_-6px_rgba(16,185,129,0.65)]", strip: "bg-gradient-to-r from-[#059669] to-[#10B981]" },
  certification: { icon: Award, tint: "tint-amber", iconBox: "bg-[#F59E0B] shadow-[0_8px_18px_-6px_rgba(245,158,11,0.65)]", strip: "bg-gradient-to-r from-[#D97706] to-[#F59E0B]" },
};

export default function CareerResources() {
  const { t } = useI18n();
  const { data: resources = [] } = useQuery({ queryKey: ["resources"], queryFn: () => api.fetchCareerResources() });
  const [saved, setSaved] = React.useState<string[]>([]);

  const freeCount = resources.filter((r) => r.free).length;

  return (
    <div className="space-y-6">
      {/* ── Teal gradient hero ── */}
      <PageHero
        gradient="teal"
        icon={BookOpen}
        eyebrow="Curated by Liberty AI"
        title={t("resources.title")}
        subtitle={t("resources.subtitle") + " — hand-picked for your target role, verified for African learners, updated weekly."}
        stats={[
          { label: "Resources", value: resources.length || 24, sub: "Across 6 formats" },
          { label: "Free forever", value: freeCount || 18, sub: "No card required" },
          { label: "Your progress", value: 64, suffix: "%", sub: "3 courses active" },
          { label: "Certificates", value: 5, sub: "Ready to claim" },
        ]}
        actions={
          <Button size="sm" className="h-[40px] gap-1.5 rounded-full bg-white px-5 text-[#0F766E] shadow-lg shadow-black/10 hover:bg-white/90">
            <Sparkles className="h-4 w-4" /> Generate my learning plan
          </Button>
        }
      />

      {/* ── Resource grid ── */}
      {resources.length === 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="shimmer h-[240px] rounded-[22px]" />
          ))}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {resources.map((res, i) => {
            const meta = TYPE_META[res.type] ?? TYPE_META.course;
            const Icon = meta.icon;
            const isSaved = saved.includes(res.id);
            return (
              <motion.div
                key={res.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border bg-card shadow-sm transition-shadow duration-300 hover:shadow-xl"
              >
                {/* Gradient accent strip */}
                <div className={cn("h-[5px] w-full transition-all duration-300", meta.strip)} />
                <div className={cn("absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100", meta.tint)} />

                <div className="relative flex flex-1 flex-col p-5">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                      <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] text-white transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6", meta.iconBox)}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-[15px] font-bold leading-[1.3] tracking-[-0.01em] transition-colors group-hover:text-[#0D9488] dark:group-hover:text-[#4FE0D0]">
                          {res.title}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[12px] font-medium text-muted-foreground">
                          <span>{res.provider}</span>
                          {res.duration && (
                            <>
                              <span className="h-2.5 w-px bg-border" />
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {res.duration}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <Badge variant={res.free ? "emerald" : "amber"} size="sm" className="shrink-0">
                      {res.free ? t("resources.free") : t("resources.paid")}
                    </Badge>
                  </div>

                  <p className="flex-1 text-[13px] leading-[1.65] text-muted-foreground">{res.description}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-1.5">
                    <Badge
                      variant={res.difficulty === "Beginner" ? "emerald" : res.difficulty === "Intermediate" ? "amber" : "rose"}
                      size="sm"
                      className="text-[10px]"
                    >
                      {res.difficulty}
                    </Badge>
                    {res.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" size="sm" className="text-[11px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <a href={res.url} target="_blank" rel="noopener" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full gap-1.5 rounded-full transition-colors group-hover:border-[#14B8A6]/40 group-hover:text-[#0D9488] dark:group-hover:text-[#4FE0D0]">
                        {t("resources.startLearning")}
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Button>
                    </a>
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() => setSaved((s) => (isSaved ? s.filter((x) => x !== res.id) : [...s, res.id]))}
                      aria-label="Save resource"
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all",
                        isSaved
                          ? "border-[#F59E0B]/40 bg-[#FEF3DF] text-[#D97706] shadow-sm dark:bg-[#F59E0B]/15 dark:text-[#FBBF24]"
                          : "border-border bg-card text-muted-foreground hover:border-[#F59E0B]/40 hover:text-[#D97706]"
                      )}
                    >
                      <Star className={cn("h-4 w-4", isSaved && "fill-current")} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ── Community strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[22px] bg-[linear-gradient(120deg,#0F766E,#14B8A6_55%,#0EA5E9)] p-6 text-white shadow-lg sm:p-7"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(at_90%_-20%,rgba(255,255,255,0.25)_0,transparent_50%)]" />
        <div className="relative flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <div className="text-[16px] font-bold tracking-[-0.01em]">Join 12,000+ learners in the 3MTT community</div>
              <div className="mt-0.5 text-[12.5px] font-medium text-white/80">Study groups, project reviews and mentor office hours — free for all fellows.</div>
            </div>
          </div>
          <Button size="sm" className="h-[40px] gap-1.5 rounded-full bg-white px-5 text-[#0F766E] shadow-lg shadow-black/10 hover:bg-white/90">
            <Users className="h-4 w-4" /> Join community
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
