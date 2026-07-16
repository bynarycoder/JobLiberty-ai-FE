"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/providers/I18nProvider";
import {
  LayoutDashboard,
  Upload,
  Target,
  BarChart3,
  TrendingUp,
  BookOpen,
  Users,
  FileText,
  Settings,
  Award,
  MessageCircle,
  Globe,
  Sparkles,
  ChevronLeft,
  Search,
  Zap,
  Crown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  icon: React.ElementType;
  labelKey: string;
  badge?: string;
  accent?: "blue" | "emerald" | "indigo" | "amber";
};

const mainNav: NavItem[] = [
  { href: "/dashboard", icon: LayoutDashboard, labelKey: "nav.dashboard", accent: "blue" },
  { href: "/chat", icon: MessageCircle, labelKey: "nav.chat", badge: "AI", accent: "indigo" },
  { href: "/upload", icon: Upload, labelKey: "nav.upload", accent: "blue" },
  { href: "/jobs", icon: Target, labelKey: "nav.jobs", accent: "emerald" },
  { href: "/opportunity-hub", icon: Globe, labelKey: "nav.opportunityHub", badge: "NEW", accent: "indigo" },
];

const secondaryNav: NavItem[] = [
  { href: "/analysis", icon: BarChart3, labelKey: "nav.analysis", accent: "blue" },
  { href: "/skills", icon: TrendingUp, labelKey: "nav.skills", accent: "amber" },
  { href: "/resources", icon: BookOpen, labelKey: "nav.resources", accent: "emerald" },
];

export function Sidebar({ collapsed = false, onToggle }: { collapsed?: boolean; onToggle?: () => void }) {
  const pathname = usePathname();
  const { t } = useI18n();
  const [isCollapsed, setIsCollapsed] = React.useState(collapsed);

  const toggle = () => {
    setIsCollapsed(!isCollapsed);
    onToggle?.();
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const NavLink = ({ item }: { item: NavItem }) => {
    const active = isActive(item.href);
    const Icon = item.icon;

    return (
      <Link
        href={item.href}
        className={cn(
          "group relative flex items-center gap-3 rounded-[12px] px-3 py-[10px] text-[13.5px] font-[500] tracking-[-0.01em] transition-all duration-200",
          active
            ? "bg-[#2563EB] text-white shadow-[0_2px_8px_rgba(37,99,235,0.25),0_1px_2px_rgba(37,99,235,0.15)] dark:bg-[#2563EB]"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-white/[0.06]",
          isCollapsed && "justify-center px-2"
        )}
      >
        {/* Active glow */}
        {active && (
          <motion.div
            layoutId="activeNav"
            className="absolute inset-0 rounded-[12px] bg-gradient-to-br from-[#2563EB] to-[#4F46E5] -z-[1]"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}

        <span
          className={cn(
            "relative flex h-[28px] w-[28px] items-center justify-center rounded-[9px] transition-all duration-200 shrink-0",
            active
              ? "bg-white/15 text-white shadow-sm"
              : "bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400 group-hover:bg-white dark:group-hover:bg-white/[0.08] group-hover:text-slate-700 dark:group-hover:text-slate-200 group-hover:shadow-sm border border-transparent group-hover:border-slate-200 dark:group-hover:border-white/[0.08]"
          )}
        >
          <Icon className="h-[16px] w-[16px]" strokeWidth={active ? 2.2 : 1.8} />
          {active && <span className="absolute inset-0 rounded-[9px] bg-white/10 animate-pulse" />}
        </span>

        {!isCollapsed && (
          <>
            <span className="flex-1 truncate">{t(item.labelKey)}</span>
            {item.badge && (
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-[7px] py-[2px] text-[10px] font-bold tracking-[0.04em]",
                  active
                    ? "bg-white/20 text-white"
                    : item.badge === "NEW"
                      ? "bg-[#ECFDF5] text-[#065F46] dark:bg-[#064E3B]/50 dark:text-[#6EE7B7] border border-[#10B981]/20"
                      : "bg-[#F5F3FF] text-[#6D28D9] dark:bg-[#4C1D95]/30 dark:text-[#C4B5FD]"
                )}
              >
                {item.badge}
              </span>
            )}
          </>
        )}

        {/* Hover glow */}
        {!active && (
          <span className="pointer-events-none absolute inset-0 rounded-[12px] bg-gradient-to-br from-[#2563EB]/[0.04] to-[#7C3AED]/[0.04] opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        "hidden lg:flex fixed inset-y-0 left-0 z-30 flex-col border-r bg-[#FCFCFD] dark:bg-[#0F172A] backdrop-blur-xl transition-all duration-300",
        "border-slate-200/70 dark:border-slate-800/80",
        isCollapsed ? "w-[72px]" : "w-[280px]"
      )}
    >
      {/* Logo */}
      <div className="flex h-[68px] items-center gap-3 border-b border-slate-200/70 dark:border-slate-800/80 px-[20px] shrink-0">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="relative flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[11px] bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#4F46E5] shadow-[0_2px_8px_rgba(37,99,235,0.28)]">
            <span className="text-[16px] font-extrabold tracking-[-0.06em] text-white">JL</span>
            <span className="absolute -right-0.5 -top-0.5 flex h-[10px] w-[10px]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex h-[10px] w-[10px] rounded-full bg-[#10B981] ring-2 ring-white dark:ring-[#0F172A]" />
            </span>
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[16px] font-bold tracking-[-0.02em] text-slate-900 dark:text-slate-100">JobLiberty</span>
                <span className="rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] px-[6px] py-[1px] text-[9px] font-bold tracking-[0.05em] text-white">AI</span>
              </div>
              <div className="text-[11px] font-medium tracking-[-0.01em] text-slate-500 dark:text-slate-400 -mt-0.5">Empowering careers</div>
            </div>
          )}
        </div>

        <button
          onClick={toggle}
          className="hidden lg:flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft className={cn("h-3.5 w-3.5 transition-transform", isCollapsed && "rotate-180")} />
        </button>
      </div>

      {/* Quick search (when expanded) */}
      {!isCollapsed && (
        <div className="p-3">
          <Link
            href="/jobs"
            className="flex items-center gap-2.5 rounded-[12px] border border-slate-200/70 dark:border-slate-700/50 bg-white dark:bg-white/[0.04] px-3 py-[10px] text-[13px] font-[450] text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-white/[0.06] transition-all group"
          >
            <Search className="h-4 w-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
            <span>Search jobs, skills...</span>
            <span className="ml-auto inline-flex items-center gap-0.5 rounded-[6px] border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-medium">
              ⌘K
            </span>
          </Link>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-2 premium-scrollbar">
        <div className="space-y-6">
          <div>
            {!isCollapsed && (
              <div className="mb-2 px-3 text-[11px] font-semibold tracking-[0.08em] text-slate-400 dark:text-slate-500 uppercase">Main</div>
            )}
            <nav className="space-y-1">
              {mainNav.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </nav>
          </div>

          <div>
            {!isCollapsed && (
              <div className="mb-2 px-3 text-[11px] font-semibold tracking-[0.08em] text-slate-400 dark:text-slate-500 uppercase">Growth</div>
            )}
            <nav className="space-y-1">
              {secondaryNav.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </nav>
          </div>

          {!isCollapsed && (
            <div className="rounded-[16px] border border-[#E0E7FF] dark:border-[#1E3A8A]/40 bg-gradient-to-br from-[#EFF6FF] via-[#F5F3FF] to-[#ECFDF5] dark:from-[#1E3A8A]/20 dark:via-[#312E81]/20 dark:to-[#064E3B]/20 p-[14px] relative overflow-hidden">
              <div className="absolute inset-0 dot-pattern opacity-[0.03] dark:opacity-[0.05]" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-gradient-to-br from-[#2563EB] to-[#7C3AED] shadow-sm">
                    <Crown className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-[12.5px] font-bold tracking-[-0.01em] text-slate-900 dark:text-slate-100">Opportunity Mode</span>
                  <span className="ml-auto text-[10px] font-bold tracking-[0.04em] text-[#7C3AED] dark:text-[#A78BFA] bg-white dark:bg-[#1E293B] px-1.5 py-0.5 rounded-full border border-[#DDD6FE] dark:border-[#4C1D95]/50">72%</span>
                </div>
                <p className="text-[11.5px] leading-[1.5] text-slate-600 dark:text-slate-400 mb-3">
                  You&apos;re <span className="font-semibold text-slate-900 dark:text-slate-100">6 weeks</span> away from Senior roles. Improve your readiness!
                </p>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white dark:bg-[#1E293B] border border-slate-200/60 dark:border-slate-700/50">
                  <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-200/70 dark:border-slate-800/80 p-3">
        {!isCollapsed ? (
          <>
            <div className="rounded-[14px] bg-slate-900 dark:bg-white/[0.06] border border-slate-800 dark:border-white/[0.08] p-3 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-[13px] font-bold text-white shadow-sm">CO</div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-semibold tracking-[-0.01em] text-white dark:text-slate-100 truncate">Chinedu Okafor</div>
                <div className="text-[11px] text-slate-400 dark:text-slate-500 truncate">Backend Engineer</div>
              </div>
              <div className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_0_4px_rgba(16,185,129,0.15)]" />
            </div>
            <div className="mt-3 flex items-center justify-between px-1">
              <span className="text-[10px] font-medium tracking-[0.06em] uppercase text-slate-400 dark:text-slate-500">3MTT NextGen • 2026</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                <Zap className="h-3 w-3 text-[#F59E0B]" />
                AI Active
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-[13px] font-bold text-white">CO</div>
            <div className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
          </div>
        )}
      </div>
    </aside>
  );
}
