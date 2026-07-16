"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/providers/I18nProvider";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Search, Bell, Sparkles, Command, Zap, ChevronDown, Plus } from "lucide-react";
import { motion } from "framer-motion";

export function DashboardTopbar() {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = React.useState("");
  const notifications = 3;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/jobs?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="sticky top-0 z-20 border-b border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-[#0F172A]/70">
      <div className="flex h-[64px] items-center justify-between gap-4 px-5 lg:px-7 max-w-[1600px] mx-auto">
        {/* Left: Search */}
        <div className="flex items-center gap-3 flex-1 max-w-[640px]">
          <form onSubmit={handleSearch} className="relative w-full group">
            <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-2 text-slate-400 dark:text-slate-500 group-focus-within:text-[#2563EB] dark:group-focus-within:text-[#60A5FA] transition-colors">
              <Search className="h-[16px] w-[16px]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("jobs.searchPlaceholder") + " — try 'backend Lagos'"}
              className="h-[42px] w-full rounded-[12px] border border-slate-200 dark:border-slate-700/60 bg-slate-50/80 dark:bg-white/[0.04] pl-[40px] pr-[120px] text-[13.5px] font-[450] tracking-[-0.01em] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-white/[0.06] hover:shadow focus:outline-none focus:border-[#2563EB]/40 focus:bg-white dark:focus:bg-[#1E293B] focus:ring-[4px] focus:ring-[#2563EB]/[0.08] focus:shadow-[0_0_0_4px_rgba(37,99,235,0.08),0_2px_8px_rgba(15,23,42,0.06)]"
            />
            <div className="absolute right-1.5 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1.5">
              <kbd className="inline-flex h-[24px] items-center gap-1 rounded-[7px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-1.5 text-[11px] font-medium tracking-[0.02em] text-slate-500 dark:text-slate-400 shadow-sm">
                <Command className="h-3 w-3" />K
              </kbd>
              <Button type="submit" size="sm" className="h-[30px] rounded-[9px] px-3 text-[12.5px]">
                Search
              </Button>
            </div>
          </form>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5">
          {/* Quick Actions */}
          <div className="hidden lg:flex items-center gap-1.5 mr-1">
            <Link href="/upload">
              <Button size="sm" className="rounded-full h-[36px] gap-1.5 px-4">
                <Plus className="h-4 w-4" />
                Upload CV
              </Button>
            </Link>
            <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 mx-1" />
          </div>

          {/* AI Status */}
          <div className="hidden md:flex items-center gap-2 rounded-full border border-[#DBEAFE] dark:border-[#1E3A8A]/40 bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 px-3 py-1.5 mr-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
            </span>
            <span className="text-[11px] font-semibold tracking-[0.02em] text-[#1E40AF] dark:text-[#93C5FD] flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Liberty AI
            </span>
          </div>

          <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-slate-100 dark:hover:bg-white/[0.06] border border-transparent hover:border-slate-200 dark:hover:border-white/[0.08]" asChild>
            <Link href="/dashboard" aria-label="Notifications">
              <Bell className="h-[18px] w-[18px]" />
              {notifications > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#EF4444] px-[4px] text-[10px] font-bold text-white shadow-[0_0_0_2px_white] dark:shadow-[0_0_0_2px_#0F172A]"
                >
                  {notifications}
                </motion.span>
              )}
            </Link>
          </Button>

          <LanguageSwitcher />
          <ThemeToggle />

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />

          <Link href="/settings" className="group flex items-center gap-2.5 rounded-full border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.04] pl-1 pr-3 py-1 hover:bg-slate-50 dark:hover:bg-white/[0.08] hover:border-slate-300 dark:hover:border-white/[0.12] hover:shadow-sm transition-all">
            <div className="relative h-[32px] w-[32px] rounded-full bg-gradient-to-br from-violet-500 via-indigo-500 to-blue-600 flex items-center justify-center text-[12px] font-bold text-white shadow-[0_2px_8px_rgba(79,70,229,0.25)]">
              CO
              <span className="absolute bottom-0 right-0 h-[10px] w-[10px] rounded-full bg-[#10B981] ring-2 ring-white dark:ring-[#1E293B] flex items-center justify-center">
                <span className="h-[4px] w-[4px] rounded-full bg-white animate-pulse" />
              </span>
            </div>
            <div className="hidden md:block text-left leading-tight">
              <div className="text-[13px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-slate-100 group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">Chinedu O.</div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                Pro <Zap className="h-3 w-3 text-[#F59E0B]" />
              </div>
            </div>
            <ChevronDown className="hidden md:block h-3.5 w-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}
