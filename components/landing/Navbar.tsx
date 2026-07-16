"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useI18n } from "@/providers/I18nProvider";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-xl border-slate-200/60 dark:border-slate-800/60 shadow-[0_1px_3px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.04)]"
          : "bg-white/60 dark:bg-[#0F172A]/60 backdrop-blur-xl border-slate-200/40 dark:border-slate-800/40"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-[68px] flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-[11px] bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#4F46E5] shadow-[0_2px_8px_rgba(37,99,235,0.28)] group-hover:shadow-[0_4px_14px_rgba(37,99,235,0.32)] group-hover:scale-[1.02] transition-all duration-300">
              <span className="text-[17px] font-extrabold tracking-[-0.06em] text-white">JL</span>
              <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981] ring-2 ring-white dark:ring-[#0F172A]" />
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[20px] font-bold tracking-[-0.03em] text-slate-900 dark:text-white">JobLiberty</span>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-[#EFF6FF] dark:bg-[#1E3A8A]/30 border border-[#DBEAFE] dark:border-[#1E3A8A]/40 px-2 py-0.5 text-[10px] font-bold tracking-[0.06em] text-[#1D4ED8] dark:text-[#93C5FD]">
                <Sparkles className="h-3 w-3" />
                AI
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1 rounded-full border border-slate-200/60 dark:border-slate-800 bg-slate-50/70 dark:bg-white/[0.04] p-1">
            {[
              { href: "#features", label: "Features" },
              { href: "/dashboard", label: t("nav.dashboard") },
              { href: "#how", label: "How it works" },
              { href: "/opportunity-hub", label: "Opportunities", badge: "NEW" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative flex items-center gap-1.5 rounded-full px-3.5 py-[6px] text-[13.5px] font-[500] tracking-[-0.01em] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white dark:hover:bg-white/[0.06] transition-all"
              >
                {link.label}
                {(link as any).badge && (
                  <span className="rounded-full bg-[#10B981] px-1.5 py-0.5 text-[9px] font-bold tracking-[0.04em] text-white leading-none">
                    {(link as any).badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 mx-1" />
          <Link href="/auth/signin">
            <Button variant="ghost" size="sm" className="rounded-full font-[600]">
              {t("nav.signIn")}
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button size="sm" className="rounded-full gap-1.5 pl-4 pr-3.5">
              {t("nav.signUp")}
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-1.5">
          <LanguageSwitcher compact />
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-slate-200/60 dark:border-slate-800/60 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-xl px-6 py-6"
          >
            <div className="flex flex-col gap-1">
              <Link href="#features" className="rounded-[12px] px-3 py-3 text-[15px] font-medium hover:bg-slate-50 dark:hover:bg-white/[0.06]">
                Features
              </Link>
              <Link href="/dashboard" className="rounded-[12px] px-3 py-3 text-[15px] font-medium hover:bg-slate-50 dark:hover:bg-white/[0.06]">
                {t("nav.dashboard")}
              </Link>
              <Link href="/opportunity-hub" className="rounded-[12px] px-3 py-3 text-[15px] font-medium hover:bg-slate-50 dark:hover:bg-white/[0.06] flex items-center gap-2">
                Opportunity Hub <span className="rounded-full bg-[#10B981] px-2 py-0.5 text-[10px] font-bold text-white">NEW</span>
              </Link>
              <div className="mt-4 flex flex-col gap-2 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
                <Link href="/auth/signin">
                  <Button variant="outline" className="w-full rounded-full">
                    {t("nav.signIn")}
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="w-full rounded-full">{t("nav.signUp")}</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
