"use client";

import React from "react";
import { useI18n } from "@/providers/I18nProvider";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/services/api";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PageHero } from "@/components/dashboard/PageHero";
import { BookOpen, Clock, ArrowUpRight, Sparkles, GraduationCap, PlayCircle, FileCode2, FileText, Users, Award } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EmptyState, ErrorState } from "@/components/ui/QueryState";

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
  const { data: resources = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ["resources"],
    queryFn: ({ signal }) => api.fetchCareerResources(signal),
    retry: 1,
  });
  const [saved, setSaved] = React.useState<string[]>([]);

  const freeCount = resources.filter((r) => r.free).length;

  return (
    <div className="space-y-6">
      <PageHero
        gradient="teal"
        icon={BookOpen}
        eyebrow="Composed from roadmap + resume recommendations"
        title={t("resources.title")}
        subtitle={t("resources.subtitle") + " — learning items come from backend roadmap and resume recommendation payloads."}
        stats={[
          { label: "Resources", value: resources.length, sub: "From supported APIs" },
          { label: "Free", value: freeCount, sub: "No paywall assumed" },
          { label: "Courses", value: resources.filter((r) => r.type === "course").length, sub: "Learning path" },
          { label: "Projects", value: resources.filter((r) => r.type === "project").length, sub: "Portfolio" },
        ]}
        actions={
          <Button size="sm" asChild className="h-[40px] gap-1.5 rounded-full bg-white px-5 text-[#0F766E] shadow-lg shadow-black/10 hover:bg-white/90">
            <a href="/chat">
              <Sparkles className="h-4 w-4" /> Ask Liberty AI
            </a>
          </Button>
        }
      />

      {isLoading ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="shimmer h-[240px] rounded-[22px]" />
          ))}
        </div>
      ) : isError ? (
        <ErrorState error={error} onRetry={() => refetch()} title="Could not load resources" />
      ) : resources.length === 0 ? (
        <EmptyState
          title="No learning resources yet"
          description="Generate a career roadmap or analyze a resume so recommendations can populate this page."
          actionHref="/upload"
          actionLabel="Upload resume"
        />
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
                <div className={cn("h-[5px] w-full transition-all duration-300", meta.strip)} />
                <div className={cn("absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100", meta.tint)} />
                <div className="relative flex flex-1 flex-col p-5">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                      <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] text-white", meta.iconBox)}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-[14.5px] font-bold tracking-[-0.01em] leading-snug">{res.title}</h3>
                        <p className="mt-1 text-[12px] font-medium text-muted-foreground">{res.provider}</p>
                      </div>
                    </div>
                    <Badge variant={res.free ? "emerald" : "amber"} size="sm">
                      {res.free ? "Free" : "Paid"}
                    </Badge>
                  </div>
                  <p className="mb-4 line-clamp-3 text-[13px] leading-[1.6] text-muted-foreground">{res.description}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" size="sm">
                      {res.type}
                    </Badge>
                    <Badge variant="secondary" size="sm">
                      {res.difficulty}
                    </Badge>
                    {res.duration && (
                      <span className="inline-flex items-center gap-1 text-[11.5px] text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {res.duration}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <Button
                      size="sm"
                      className="flex-1 gap-1.5 rounded-full"
                      onClick={() => {
                        if (res.url && res.url !== "#") window.open(res.url, "_blank", "noopener,noreferrer");
                      }}
                    >
                      Open <ArrowUpRight className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full"
                      onClick={() =>
                        setSaved((prev) => (prev.includes(res.id) ? prev.filter((id) => id !== res.id) : [...prev, res.id]))
                      }
                    >
                      {isSaved ? "Saved" : "Save"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
