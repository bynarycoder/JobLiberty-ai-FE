"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Sparkles, Bot, Search, GraduationCap, Rocket, MapPin, Monitor, BookOpen, MessageSquare, Route, Zap } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export function LibertyAIPanel() {
  const { t } = useI18n();

  const actions = [
    { key: "findOpportunities", icon: Search, desc: "Search backend recommendations", color: "blue" },
    { key: "recommendScholarships", icon: GraduationCap, desc: "Personalized scholarships", color: "indigo" },
    { key: "findRemoteJobs", icon: Monitor, desc: "Remote opportunities", color: "emerald" },
    { key: "recommendCourses", icon: BookOpen, desc: "Personalized roadmap", color: "amber" },
  ];

  return (
    <motion.aside initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="lg:sticky lg:top-[88px] lg:h-fit space-y-4">
      <Card className="overflow-hidden border-[#DBEAFE] dark:border-[#1E3A8A]/40 bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#312E81] text-white shadow-[0_12px_32px_rgba(37,99,235,0.22)]">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-[12px] bg-white/15 border border-white/20 backdrop-blur-sm">
              <Bot className="h-6 w-6" />
              <span className="absolute -right-1 -top-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10B981] ring-2 ring-[#2563EB]" />
              </span>
            </div>
            <div>
              <CardTitle className="text-[16px] tracking-[-0.01em] text-white flex items-center gap-2">
                {t("opportunityHub.libertyAI.title")}
                <Badge className="bg-white/15 border-white/20 text-white">AI • Live</Badge>
              </CardTitle>
              <p className="text-[11px] font-medium text-white/70">{t("opportunityHub.libertyAI.subtitle")}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="mb-4 text-[12.5px] leading-[1.6] text-white/80">{t("opportunityHub.libertyAI.description")}</p>
          <div className="space-y-2">
            {actions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <motion.div key={action.key} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + idx * 0.06 }}>
                  <Button variant="ghost" className="w-full justify-between rounded-[12px] bg-white/10 hover:bg-white/15 text-white hover:text-white border border-white/10 hover:border-white/20 h-auto py-3 px-3 group">
                    <span className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-white/15 group-hover:bg-white/20 transition-colors">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-left">
                        <span className="block text-[12.5px] font-semibold tracking-[-0.01em]">{t(`opportunityHub.libertyAI.actions.${action.key}`)}</span>
                        <span className="block text-[11px] font-[450] text-white/60">{action.desc}</span>
                      </span>
                    </span>
                    <Sparkles className="h-3.5 w-3.5 text-white/50 group-hover:text-white/80" />
                  </Button>
                </motion.div>
              );
            })}
          </div>

          <Link href="/chat" className="block mt-4">
            <Button className="w-full rounded-full bg-white text-[#1D4ED8] hover:bg-white/90 gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat with Liberty AI
              <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[#2563EB] text-white">
                <Route className="h-3 w-3" />
              </span>
            </Button>
          </Link>

          <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-white/60">
            <Zap className="h-3 w-3 text-[#FCD34D]" />
            Answers in English, Hausa, Yoruba, Igbo
          </div>
        </CardContent>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-7 w-7 rounded-[8px] bg-[#FFFBEB] dark:bg-[#78350F]/20 border border-[#FDE68A] dark:border-[#78350F]/30 flex items-center justify-center">
            <Rocket className="h-4 w-4 text-[#D97706] dark:text-[#FBBF24]" />
          </div>
          <span className="text-[13px] font-semibold tracking-[-0.01em]">Quick Wins</span>
        </div>
        <div className="space-y-2.5 text-[12px]">
          <div className="flex justify-between items-center rounded-[10px] border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-white/[0.03] px-3 py-2">
            <span className="text-slate-600 dark:text-slate-400">Profile completeness</span>
            <span className="font-bold text-slate-900 dark:text-white">Upload resume to check</span>
          </div>
          <div className="flex justify-between items-center rounded-[10px] border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-white/[0.03] px-3 py-2">
            <span className="text-slate-600 dark:text-slate-400">Opportunities saved</span>
            <span className="font-bold text-slate-900 dark:text-white">Sign in to track</span>
          </div>
        </div>
      </Card>
    </motion.aside>
  );
}
