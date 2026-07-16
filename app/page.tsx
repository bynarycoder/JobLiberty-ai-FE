"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { useI18n } from "@/providers/I18nProvider";
import {
  Upload,
  Target,
  TrendingUp,
  Star,
  BookOpen,
  Award,
  Sparkles,
  ArrowUpRight,
  Shield,
  Zap,
  Globe,
  Cpu,
  CheckCircle2,
  BarChart3,
  Users,
  FileText,
  MessageCircle,
  ChevronRight,
  Play,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";

export default function LandingPage() {
  const { t } = useI18n();

  const features = [
    {
      icon: Upload,
      title: t("landing.features.resumeAnalysis.title"),
      desc: t("landing.features.resumeAnalysis.desc"),
      accent: "blue" as const,
      highlight: "ATS 92%+",
    },
    {
      icon: Target,
      title: t("landing.features.jobMatching.title"),
      desc: t("landing.features.jobMatching.desc"),
      accent: "emerald" as const,
      highlight: "47k matches",
    },
    {
      icon: TrendingUp,
      title: t("landing.features.skillGap.title"),
      desc: t("landing.features.skillGap.desc"),
      accent: "amber" as const,
      highlight: "6wk roadmap",
    },
    {
      icon: BookOpen,
      title: t("landing.features.interviewPrep.title"),
      desc: t("landing.features.interviewPrep.desc"),
      accent: "indigo" as const,
      highlight: "AI mock",
    },
    {
      icon: Award,
      title: t("landing.features.careerRoadmap.title"),
      desc: t("landing.features.careerRoadmap.desc"),
      accent: "sky" as const,
      highlight: "Personalized",
    },
    {
      icon: Star,
      title: t("landing.features.opportunityMode.title"),
      desc: t("landing.features.opportunityMode.desc"),
      accent: "rose" as const,
      highlight: "Opportunity",
    },
  ];

  const accentMap = {
    blue: { bg: "from-[#EFF6FF] to-[#DBEAFE] dark:from-[#1E3A8A]/30 dark:to-[#1E40AF]/20", icon: "text-[#2563EB] dark:text-[#60A5FA]", border: "border-[#BFDBFE] dark:border-[#1E3A8A]/40" },
    emerald: { bg: "from-[#ECFDF5] to-[#D1FAE5] dark:from-[#064E3B]/30 dark:to-[#065F46]/20", icon: "text-[#059669] dark:text-[#34D399]", border: "border-[#A7F3D0] dark:border-[#064E3B]/40" },
    amber: { bg: "from-[#FFFBEB] to-[#FEF3C7] dark:from-[#78350F]/20 dark:to-[#92400E]/10", icon: "text-[#D97706] dark:text-[#FBBF24]", border: "border-[#FDE68A] dark:border-[#78350F]/30" },
    indigo: { bg: "from-[#F5F3FF] to-[#EDE9FE] dark:from-[#4C1D95]/20 dark:to-[#5B21B6]/10", icon: "text-[#7C3AED] dark:text-[#A78BFA]", border: "border-[#DDD6FE] dark:border-[#4C1D95]/30" },
    sky: { bg: "from-[#F0F9FF] to-[#E0F2FE] dark:from-[#0C4A6E]/20 dark:to-[#075985]/10", icon: "text-[#0284C7] dark:text-[#38BDF8]", border: "border-[#BAE6FD] dark:border-[#0C4A6E]/30" },
    rose: { bg: "from-[#FFF1F2] to-[#FFE4E6] dark:from-[#881337]/20 dark:to-[#9F1239]/10", icon: "text-[#E11D48] dark:text-[#FB7185]", border: "border-[#FECDD3] dark:border-[#881337]/30" },
  };

  const steps = [
    { num: "01", title: t("landing.howItWorks.step1.title"), desc: t("landing.howItWorks.step1.desc"), icon: Upload },
    { num: "02", title: t("landing.howItWorks.step2.title"), desc: t("landing.howItWorks.step2.desc"), icon: Cpu },
    { num: "03", title: t("landing.howItWorks.step3.title"), desc: t("landing.howItWorks.step3.desc"), icon: Target },
    { num: "04", title: t("landing.howItWorks.step4.title"), desc: t("landing.howItWorks.step4.desc"), icon: Award },
  ];

  const testimonials = [
    { quote: t("landing.testimonials.t1.quote"), name: t("landing.testimonials.t1.name"), role: t("landing.testimonials.t1.role"), accent: "blue" },
    { quote: t("landing.testimonials.t2.quote"), name: t("landing.testimonials.t2.name"), role: t("landing.testimonials.t2.role"), accent: "emerald" },
    { quote: t("landing.testimonials.t3.quote"), name: t("landing.testimonials.t3.name"), role: t("landing.testimonials.t3.role"), accent: "indigo" },
  ];

  const faqs = [
    { q: t("landing.faq.q1"), a: t("landing.faq.a1") },
    { q: t("landing.faq.q2"), a: t("landing.faq.a2") },
    { q: t("landing.faq.q3"), a: t("landing.faq.a3") },
    { q: t("landing.faq.q4"), a: t("landing.faq.a4") },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 gradient-mesh opacity-[0.5] dark:opacity-[0.22]" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[720px] w-[1200px] rounded-full bg-gradient-to-br from-[#2563EB]/[0.08] via-[#7C3AED]/[0.06] to-[#10B981]/[0.08] blur-[80px]" />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#DBEAFE] dark:border-[#1E3A8A]/50 bg-white dark:bg-[#1E293B]/60 px-3.5 py-1.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-sm">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] text-white">
                <Sparkles className="h-3 w-3" />
              </span>
              <span className="text-[11px] font-bold tracking-[0.08em] text-[#1E40AF] dark:text-[#93C5FD]">3MTT NEXTGEN SHOWCASE • 2026</span>
              <span className="h-3 w-px bg-[#DBEAFE] dark:bg-[#1E3A8A]/50" />
              <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
                Live
              </span>
            </div>

            <h1 className="mx-auto mt-8 max-w-[22ch] text-[44px] md:text-[72px] font-[800] tracking-[-0.04em] leading-[0.9] text-slate-900 dark:text-white">
              Your career,
              <span className="relative inline-flex pl-3 md:pl-4">
                <span className="text-gradient-primary">supercharged</span>
                <span className="absolute -top-2 -right-3 hidden md:flex h-6 w-6 items-center justify-center rounded-full bg-[#10B981] text-white shadow-[0_2px_8px_rgba(16,185,129,0.35)]">
                  <Zap className="h-3.5 w-3.5" />
                </span>
              </span>
              <br />
              by AI<span className="text-[#2563EB] dark:text-[#60A5FA]">.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-[50ch] text-[17px] md:text-[19px] leading-[1.6] font-[450] tracking-[-0.01em] text-slate-600 dark:text-slate-400">
              {t("landing.heroSubtitle")}{" "}
              <span className="font-semibold text-slate-900 dark:text-slate-100">ATS scoring, skill gaps, job matching</span> — tailored for African talent.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/upload">
                <Button size="lg" className="h-[52px] rounded-full px-8 text-[15px] gap-2 shadow-brand">
                  {t("landing.ctaPrimary")}
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="secondary" className="h-[52px] rounded-full px-7 text-[15px] gap-2 border-slate-200 dark:border-slate-700">
                  <Play className="h-4 w-4 fill-current" />
                  {t("landing.ctaSecondary")}
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-[13px] font-[450] text-slate-500 dark:text-slate-400">
              <span className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-white dark:border-[#0F172A] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300"
                  >
                    {["CO", "AF", "BO"][i - 1]}
                  </span>
                ))}
              </span>
              <span>Trusted by 47k+ job seekers across Africa</span>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-[#ECFDF5] dark:bg-[#064E3B]/30 border border-[#A7F3D0] dark:border-[#064E3B]/40 px-2 py-0.5 text-[11px] font-semibold text-[#065F46] dark:text-[#6EE7B7]">
                <CheckCircle2 className="h-3 w-3" />
                87% satisfaction
              </span>
            </div>
          </motion.div>

          {/* Product Preview / Dashboard Mock */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto mt-14 max-w-[1040px]"
          >
            <div className="relative rounded-[24px] md:rounded-[28px] border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-[#1E293B] shadow-[0_20px_60px_rgba(15,23,42,0.12),0_2px_12px_rgba(15,23,42,0.06)] overflow-hidden">
              <div className="h-[44px] flex items-center justify-between px-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
                  <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                  <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1">
                    <Shield className="h-3 w-3" />
                    jobliberty.ai • secure
                  </span>
                </div>
                <div className="w-[60px]" />
              </div>

              <div className="grid md:grid-cols-[280px_1fr] gap-0">
                <div className="hidden md:block border-r border-slate-100 dark:border-slate-800 p-4 space-y-3 bg-slate-50/50 dark:bg-white/[0.02]">
                  {[
                    { icon: BarChart3, label: "Dashboard", active: true },
                    { icon: MessageCircle, label: "Liberty AI", badge: "AI" },
                    { icon: FileText, label: "Resume" },
                    { icon: Target, label: "Jobs" },
                    { icon: Globe, label: "Opportunities", badge: "NEW" },
                  ].map((it) => (
                    <div
                      key={it.label}
                      className={`flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-[13px] font-medium ${
                        it.active
                          ? "bg-[#2563EB] text-white shadow-sm"
                          : "text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-white/[0.05]"
                      }`}
                    >
                      <it.icon className="h-4 w-4" />
                      {it.label}
                      {it.badge && <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#10B981] text-white">{it.badge}</span>}
                    </div>
                  ))}
                  <div className="pt-3">
                    <div className="rounded-[14px] bg-gradient-to-br from-[#2563EB] to-[#7C3AED] p-3.5 text-white">
                      <div className="text-[11px] font-bold tracking-[0.06em] opacity-80">OPPORTUNITY MODE</div>
                      <div className="mt-1 text-[22px] font-bold tracking-[-0.02em]">72% Ready</div>
                      <div className="mt-2 h-1.5 rounded-full bg-white/20">
                        <div className="h-full w-[72%] rounded-full bg-white" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 md:p-6 space-y-5 bg-white dark:bg-[#1E293B]">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Resume Score", value: "82%", trend: "+4%", color: "blue" },
                      { label: "ATS Score", value: "78%", trend: "+6%", color: "emerald" },
                      { label: "Job Matches", value: "47", trend: "+12", color: "indigo" },
                    ].map((s) => (
                      <div key={s.label} className="rounded-[14px] border border-slate-200/60 dark:border-slate-700/50 bg-slate-50/60 dark:bg-white/[0.03] p-3">
                        <div className="text-[11px] font-semibold tracking-[0.04em] uppercase text-slate-500 dark:text-slate-400">{s.label}</div>
                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="text-[22px] font-bold tracking-[-0.03em] text-slate-900 dark:text-slate-100">{s.value}</span>
                          <span className="text-[11px] font-semibold text-[#10B981] bg-[#ECFDF5] dark:bg-[#064E3B]/40 px-1 py-0.5 rounded-full">{s.trend}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="rounded-[16px] border border-slate-200/60 dark:border-slate-700/50 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[13px] font-semibold">Top Job Matches</span>
                        <Badge variant="emerald" size="sm" dot pulse>
                          Live
                        </Badge>
                      </div>
                      <div className="space-y-2.5">
                        {[
                          { role: "Senior Backend Engineer", company: "Paystack", match: "89%" },
                          { role: "Backend Developer", company: "Flutterwave", match: "84%" },
                          { role: "Node.js Engineer", company: "Kuda Bank", match: "81%" },
                        ].map((j) => (
                          <div key={j.role} className="flex items-center justify-between rounded-[10px] border border-slate-100 dark:border-slate-800 px-3 py-2.5 bg-slate-50/60 dark:bg-white/[0.03]">
                            <div>
                              <div className="text-[13px] font-medium tracking-[-0.01em]">{j.role}</div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400">{j.company}</div>
                            </div>
                            <div className="text-[12px] font-bold text-[#10B981]">{j.match}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-[16px] bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#4F46E5] p-4 text-white relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(at_100%_0%,rgba(255,255,255,0.2),transparent_50%)]" />
                      <div className="relative">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-[10px] bg-white/15 flex items-center justify-center">
                            <Sparkles className="h-4 w-4" />
                          </div>
                          <span className="text-[13px] font-semibold">Liberty AI Insights</span>
                        </div>
                        <div className="mt-3 space-y-2 text-[12.5px] leading-[1.5] text-white/90">
                          <div className="flex gap-2">
                            <span className="mt-1 h-1 w-1 rounded-full bg-white shrink-0" />
                            Add Kubernetes experience — potential match +18%
                          </div>
                          <div className="flex gap-2">
                            <span className="mt-1 h-1 w-1 rounded-full bg-white shrink-0" />
                            Complete AWS certification before EOM
                          </div>
                        </div>
                        <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-white text-[#2563EB] px-3 py-1.5 text-[12px] font-semibold">
                          Open Opportunity Mode <ChevronRight className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="hidden lg:flex absolute -right-6 top-16 rounded-[12px] border border-slate-200/60 dark:border-slate-700/50 bg-white dark:bg-[#1E293B] shadow-xl px-3 py-2.5 items-center gap-2.5">
              <div className="h-8 w-8 rounded-[10px] bg-[#ECFDF5] dark:bg-[#064E3B]/40 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
              </div>
              <div>
                <div className="text-[12px] font-semibold tracking-[-0.01em]">ATS Optimized</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Score 92% • Passed</div>
              </div>
            </div>

            <div className="hidden lg:flex absolute -left-6 bottom-20 rounded-[12px] border border-slate-200/60 dark:border-slate-700/50 bg-white dark:bg-[#1E293B] shadow-xl px-3 py-2.5 items-center gap-2.5">
              <div className="h-8 w-8 rounded-[10px] bg-[#EFF6FF] dark:bg-[#1E3A8A]/30 flex items-center justify-center">
                <Users className="h-4 w-4 text-[#2563EB]" />
              </div>
              <div>
                <div className="text-[12px] font-semibold tracking-[-0.01em]">+47 matches this week</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Senior roles • Lagos & Remote</div>
              </div>
            </div>
          </motion.div>

          <div className="mt-12 flex items-center justify-center gap-10 text-[13px] font-[450]">
            <div className="text-center">
              <div className="text-[22px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">{t("landing.stats.users")}</div>
              <div className="text-slate-500 dark:text-slate-400 text-[12px] font-medium tracking-[0.02em] uppercase">Job Seekers</div>
            </div>
            <span className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
            <div className="text-center">
              <div className="text-[22px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">{t("landing.stats.jobsMatched")}</div>
              <div className="text-slate-500 dark:text-slate-400 text-[12px] font-medium tracking-[0.02em] uppercase">Matches Made</div>
            </div>
            <span className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
            <div className="text-center">
              <div className="text-[22px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">{t("landing.stats.successRate")}</div>
              <div className="text-slate-500 dark:text-slate-400 text-[12px] font-medium tracking-[0.02em] uppercase">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* TRUST BAR */}
      <div className="border-y border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-[#1E293B]/40 backdrop-blur-sm">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-center gap-x-8 gap-y-2 flex-wrap">
          <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-400 dark:text-slate-500">Trusted by teams at</span>
          <div className="flex items-center gap-8 text-[13px] font-bold tracking-[0.08em] text-slate-500 dark:text-slate-400">
            <span className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">PAYSTACK</span>
            <span className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">FLUTTERWAVE</span>
            <span className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">KUDA</span>
            <span className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">ANDELA</span>
            <span className="hidden sm:inline hover:text-slate-900 dark:hover:text-slate-200 transition-colors">MONIEPOINT</span>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div id="features" className="max-w-[1280px] mx-auto px-6 pt-20 pb-16">
        <div className="max-w-[720px] mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#DBEAFE] dark:border-[#1E3A8A]/40 bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 px-3 py-1 text-[11px] font-bold tracking-[0.08em] text-[#1D4ED8] dark:text-[#93C5FD]">
            <Cpu className="h-3 w-3" />
            POWERED BY AI • BUILT FOR AFRICA
          </div>
          <h2 className="mt-5 text-[36px] md:text-[48px] font-[800] tracking-[-0.03em] leading-[0.95] text-slate-900 dark:text-white">
            Everything you need to
            <br />
            <span className="text-gradient-primary">land your dream role</span>
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-slate-600 dark:text-slate-400">
            From ATS optimization to skill roadmaps and opportunity discovery — JobLiberty is your end-to-end AI career operating system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => {
            const accent = accentMap[feature.accent];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-[20px] border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-6 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:-translate-y-[1px] transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className={`absolute inset-0 bg-gradient-to-br ${accent.bg} opacity-0 group-hover:opacity-[0.35] transition-opacity duration-300`} />

                <div className="relative">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`h-12 w-12 rounded-[14px] bg-gradient-to-br ${accent.bg} border ${accent.border} flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-[1.02] transition-all duration-300`}>
                      <feature.icon className={`h-6 w-6 ${accent.icon}`} />
                    </div>
                    <span className="inline-flex items-center rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold tracking-[0.02em] text-slate-600 dark:text-slate-400">
                      {feature.highlight}
                    </span>
                  </div>
                  <h3 className="text-[17px] font-bold tracking-[-0.02em] text-slate-900 dark:text-slate-100 mb-2">{feature.title}</h3>
                  <p className="text-[14px] leading-[1.6] text-slate-600 dark:text-slate-400">{feature.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-[13px] font-semibold text-[#2563EB] dark:text-[#60A5FA] opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    Learn more <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div id="how" className="relative bg-white dark:bg-[#0F172A] border-y border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 dot-pattern opacity-[0.04] dark:opacity-[0.06]" />
        <div className="relative max-w-[1100px] mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3 py-1 text-[11px] font-bold tracking-[0.08em]">
                <Zap className="h-3 w-3" />
                HOW IT WORKS
              </div>
              <h2 className="mt-4 text-[36px] md:text-[44px] font-[800] tracking-[-0.03em] leading-[0.95] text-slate-900 dark:text-white">
                From upload to offer
                <br />
                in 4 steps
              </h2>
            </div>
            <p className="max-w-[36ch] text-[15px] leading-[1.6] text-slate-600 dark:text-slate-400">
              Our AI pipeline mirrors how top recruiters evaluate candidates — but 10x faster and tailored for African job markets.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-[40px] left-[12%] right-[12%] h-px bg-gradient-to-r from-[#2563EB]/20 via-[#7C3AED]/20 to-[#10B981]/20" />
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative bg-[#F8FAFC] dark:bg-[#1E293B]/60 rounded-[20px] border border-slate-200/60 dark:border-slate-800 p-6 hover:bg-white dark:hover:bg-[#1E293B] hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm group-hover:shadow group-hover:scale-105 transition-all">
                    <step.icon className="h-5 w-5 text-[#2563EB] dark:text-[#60A5FA]" />
                  </div>
                  <div className="text-[28px] font-[800] tracking-[-0.05em] text-slate-200 dark:text-slate-700 group-hover:text-[#2563EB]/20 dark:group-hover:text-white/10 transition-colors">
                    {step.num}
                  </div>
                </div>
                <div className="text-[16px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white mb-2">{step.title}</div>
                <p className="text-[13.5px] leading-[1.6] text-slate-600 dark:text-slate-400">{step.desc}</p>
                <div className="mt-4 h-1 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(i + 1) * 25}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED]"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <h2 className="text-[32px] md:text-[40px] font-[800] tracking-[-0.03em] leading-[0.95] text-slate-900 dark:text-white">
            Loved by job seekers
            <br />
            across Africa
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
              ))}
            </div>
            <span className="text-[13px] font-semibold text-slate-900 dark:text-white">4.9/5</span>
            <span className="text-[13px] text-slate-500 dark:text-slate-400">• 2,400+ reviews</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((tstm, i) => (
            <motion.div
              key={tstm.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-[20px] border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-7 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-[14px] w-[14px] fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>
              <blockquote className="text-[15px] leading-[1.6] tracking-[-0.01em] text-slate-700 dark:text-slate-300 mb-6">“{tstm.quote}”</blockquote>
              <div className="flex items-center gap-3">
                <div className={`h-9 w-9 rounded-full flex items-center justify-center text-[12px] font-bold text-white shadow-sm ${tstm.accent === "blue" ? "bg-gradient-to-br from-blue-500 to-indigo-600" : tstm.accent === "emerald" ? "bg-gradient-to-br from-emerald-500 to-teal-600" : "bg-gradient-to-br from-violet-500 to-purple-600"}`}>
                  {tstm.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="text-[13.5px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-slate-100">{tstm.name}</div>
                  <div className="text-[12px] text-slate-500 dark:text-slate-400">{tstm.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="max-w-[1080px] mx-auto px-6 pb-20">
        <div className="relative overflow-hidden rounded-[28px] border border-[#DBEAFE] dark:border-[#1E3A8A]/40 bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#4F46E5] p-[1.5px] shadow-[0_20px_60px_rgba(37,99,235,0.25)]">
          <div className="rounded-[26px] bg-gradient-to-br from-[#2563EB] via-[#1E40AF] to-[#312E81] dark:from-[#1E3A8A] dark:via-[#1E40AF] dark:to-[#312E81] p-10 md:p-14 text-center relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(at_0%_0%,rgba(255,255,255,0.15),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(at_100%_100%,rgba(16,185,129,0.2),transparent_60%)]" />
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            <div className="relative max-w-[640px] mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-[11px] font-bold tracking-[0.08em] text-white/90 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
                READY FOR 3MTT SHOWCASE
              </div>
              <h2 className="mt-6 text-[36px] md:text-[48px] font-[800] tracking-[-0.03em] leading-[0.9] text-white">
                Ready to unlock your
                <br />
                career potential?
              </h2>
              <p className="mt-4 text-[16px] leading-[1.6] text-white/80 max-w-[48ch] mx-auto">{t("landing.cta.subtitle")}</p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/upload">
                  <Button size="lg" className="h-[52px] rounded-full px-8 text-[15px] gap-2 bg-white text-[#1D4ED8] hover:bg-white/90 hover:text-[#1E40AF] shadow-[0_4px_20px_rgba(255,255,255,0.2)]">
                    {t("landing.cta.button")}
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
                <div className="flex items-center gap-2 text-[12.5px] text-white/70">
                  <Shield className="h-4 w-4" />
                  Free forever • No credit card
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
