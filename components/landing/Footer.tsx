"use client";

import Link from "next/link";
import { useI18n } from "@/providers/I18nProvider";
import { Sparkles, Heart, ArrowUpRight, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative border-t border-slate-200/60 dark:border-slate-800/60 bg-[#FCFCFD] dark:bg-[#0F172A] overflow-hidden">
      {/* Subtle gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#2563EB]/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 gradient-mesh opacity-[0.03] dark:opacity-[0.06]" />

      <div className="relative max-w-[1280px] mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#4F46E5] shadow-[0_2px_8px_rgba(37,99,235,0.25)]">
                <span className="text-white font-extrabold text-[16px] tracking-[-0.05em]">JL</span>
              </div>
              <span className="font-bold text-[19px] tracking-[-0.03em] text-slate-900 dark:text-white">JobLiberty</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#EFF6FF] dark:bg-[#1E3A8A]/30 border border-[#DBEAFE] dark:border-[#1E3A8A]/40 px-2 py-0.5 text-[10px] font-bold tracking-[0.05em] text-[#1D4ED8] dark:text-[#93C5FD]">
                <Sparkles className="h-3 w-3" />
                AI
              </span>
            </div>
            <p className="text-[14px] leading-[1.6] text-slate-600 dark:text-slate-400 max-w-[32ch]">
              {t("app.altTagline")} — Empowering Every Career Journey with AI. Built for African talent, designed for global opportunities.
            </p>

            <div className="mt-6 p-3 rounded-[14px] border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-white/[0.03] shadow-sm max-w-[320px]">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center text-white font-bold text-[12px]">AA</div>
                <div>
                  <div className="text-[13px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-slate-100">Abdulwahab Abdulyekeen</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{t("footer.fellow")} • 3MTT NextGen 2026</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              {[
                { icon: Github, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
              ].map((s, i) => (
                <Link
                  key={i}
                  href={s.href}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-white/[0.04] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-white/[0.06] transition-all"
                >
                  <s.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[12px] font-semibold tracking-[0.08em] uppercase text-slate-900 dark:text-slate-100 mb-4">Product</div>
            <div className="space-y-2.5 text-[13.5px] font-[450] text-slate-600 dark:text-slate-400">
              <Link href="/dashboard" className="flex items-center gap-1 hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors group">
                Dashboard <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/upload" className="flex items-center gap-1 hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors group">
                Resume Analysis <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/jobs" className="flex items-center gap-1 hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors group">
                Job Matching <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/opportunity-hub" className="flex items-center gap-1 hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors group">
                Opportunity Hub <span className="rounded-full bg-[#10B981] px-1.5 py-0.5 text-[9px] font-bold text-white">NEW</span>
              </Link>
              <Link href="/chat" className="flex items-center gap-1 hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors group">
                Liberty AI <Sparkles className="h-3 w-3 text-[#7C3AED]" />
              </Link>
            </div>
          </div>

          <div>
            <div className="text-[12px] font-semibold tracking-[0.08em] uppercase text-slate-900 dark:text-slate-100 mb-4">Resources</div>
            <div className="space-y-2.5 text-[13.5px] font-[450] text-slate-600 dark:text-slate-400">
              <Link href="#faq" className="block hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                FAQ
              </Link>
              <Link href="/about" className="block hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                {t("footer.links.github")}
              </Link>
              <a href="#" className="block hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                Documentation
              </a>
              <a href="#" className="block hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                Changelog
              </a>
              <span className="inline-flex items-center gap-1.5 mt-2 rounded-full bg-[#FFFBEB] dark:bg-[#78350F]/20 border border-[#FDE68A] dark:border-[#78350F]/30 px-2.5 py-1 text-[11px] font-medium text-[#92400E] dark:text-[#FCD34D]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                Live at 3MTT Showcase
              </span>
            </div>
          </div>

          <div>
            <div className="text-[12px] font-semibold tracking-[0.08em] uppercase text-slate-900 dark:text-slate-100 mb-4">Legal & Contact</div>
            <div className="space-y-2.5 text-[13.5px] font-[450] text-slate-600 dark:text-slate-400">
              <a href="#" className="block hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                {t("footer.links.privacy")}
              </a>
              <a href="#" className="block hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                {t("footer.links.terms")}
              </a>
              <a href="#" className="block hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                {t("footer.links.contact")}
              </a>
              <div className="pt-3 mt-3 border-t border-slate-200/60 dark:border-slate-800/60">
                <div className="text-[11px] font-medium tracking-[0.04em] uppercase text-slate-400 dark:text-slate-500 mb-1">Email</div>
                <a href="mailto:hello@jobliberty.ai" className="text-[13px] font-medium text-slate-900 dark:text-slate-100 hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors">
                  hello@jobliberty.ai
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200/60 dark:border-slate-800/60">
          <div className="flex items-center gap-3 text-[12.5px] text-slate-500 dark:text-slate-400">
            <span>{t("footer.copyright")}</span>
            <span className="hidden sm:inline h-3 w-px bg-slate-300 dark:bg-slate-700" />
            <span className="hidden sm:inline-flex items-center gap-1.5">
              Crafted with <Heart className="h-3.5 w-3.5 text-[#EF4444] fill-[#EF4444]" /> in Lagos for Africa
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-medium">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-white/[0.04] px-3 py-1.5 text-slate-600 dark:text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
              All systems operational
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3 py-1.5 text-[11px] font-bold tracking-[0.02em]">3MTT NEXTGEN 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
