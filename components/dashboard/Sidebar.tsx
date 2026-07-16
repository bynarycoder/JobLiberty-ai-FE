"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/providers/I18nProvider";
import {
  LayoutDashboard,
  Upload,
  BarChart3,
  TrendingUp,
  BookOpen,
  FileText,
  Settings,
  MessageCircle,
  Globe,
  Sparkles,
  ChevronLeft,
  Search,
  Zap,
  Crown,
  Briefcase,
  PieChart,
  Command,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Accent = "blue" | "emerald" | "purple" | "sky" | "amber" | "teal" | "rose" | "slate";

type NavItem = {
  href: string;
  icon: React.ElementType;
  labelKey: string;
  badge?: string;
  accent: Accent;
};

/* Every destination gets its own brand color — no gray icons */
const ACCENTS: Record<
  Accent,
  { chip: string; chipActive: string; pill: string; glow: string; dot: string }
> = {
  blue: {
    chip: "bg-[#E8F0FF] text-[#2563EB] dark:bg-[#2563EB]/15 dark:text-[#7FA8FF]",
    chipActive: "bg-white/20 text-white",
    pill: "bg-gradient-to-r from-[#2563EB] to-[#4F46E5]",
    glow: "shadow-[0_8px_20px_-6px_rgba(37,99,235,0.55)]",
    dot: "bg-[#2563EB]",
  },
  emerald: {
    chip: "bg-[#E3F9F0] text-[#059669] dark:bg-[#10B981]/15 dark:text-[#4ADEAC]",
    chipActive: "bg-white/20 text-white",
    pill: "bg-gradient-to-r from-[#059669] to-[#10B981]",
    glow: "shadow-[0_8px_20px_-6px_rgba(16,185,129,0.55)]",
    dot: "bg-[#10B981]",
  },
  purple: {
    chip: "bg-[#F0EAFE] text-[#7C3AED] dark:bg-[#7C3AED]/18 dark:text-[#B691FF]",
    chipActive: "bg-white/20 text-white",
    pill: "bg-gradient-to-r from-[#7C3AED] to-[#2563EB]",
    glow: "shadow-[0_8px_20px_-6px_rgba(124,58,237,0.55)]",
    dot: "bg-[#7C3AED]",
  },
  sky: {
    chip: "bg-[#E2F3FE] text-[#0284C7] dark:bg-[#0EA5E9]/15 dark:text-[#5CC8FA]",
    chipActive: "bg-white/20 text-white",
    pill: "bg-gradient-to-r from-[#0284C7] to-[#0EA5E9]",
    glow: "shadow-[0_8px_20px_-6px_rgba(14,165,233,0.55)]",
    dot: "bg-[#0EA5E9]",
  },
  amber: {
    chip: "bg-[#FEF3DF] text-[#D97706] dark:bg-[#F59E0B]/15 dark:text-[#FBBF24]",
    chipActive: "bg-white/20 text-white",
    pill: "bg-gradient-to-r from-[#D97706] to-[#F59E0B]",
    glow: "shadow-[0_8px_20px_-6px_rgba(245,158,11,0.55)]",
    dot: "bg-[#F59E0B]",
  },
  teal: {
    chip: "bg-[#DEF6F3] text-[#0D9488] dark:bg-[#14B8A6]/15 dark:text-[#4FE0D0]",
    chipActive: "bg-white/20 text-white",
    pill: "bg-gradient-to-r from-[#0F766E] to-[#14B8A6]",
    glow: "shadow-[0_8px_20px_-6px_rgba(20,184,166,0.55)]",
    dot: "bg-[#14B8A6]",
  },
  rose: {
    chip: "bg-[#FDEAEA] text-[#DC2626] dark:bg-[#EF4444]/15 dark:text-[#F98B8B]",
    chipActive: "bg-white/20 text-white",
    pill: "bg-gradient-to-r from-[#DC2626] to-[#EF4444]",
    glow: "shadow-[0_8px_20px_-6px_rgba(239,68,68,0.55)]",
    dot: "bg-[#EF4444]",
  },
  slate: {
    chip: "bg-[#ECF0F8] text-[#475569] dark:bg-white/8 dark:text-[#9FB0CE]",
    chipActive: "bg-white/20 text-white",
    pill: "bg-gradient-to-r from-[#475569] to-[#64748B]",
    glow: "shadow-[0_8px_20px_-6px_rgba(71,85,105,0.5)]",
    dot: "bg-[#64748B]",
  },
};

const SECTIONS: { label: string; items: NavItem[] }[] = [
  {
    label: "Workspace",
    items: [
      { href: "/dashboard", icon: LayoutDashboard, labelKey: "nav.dashboard", accent: "blue" },
      { href: "/chat", icon: MessageCircle, labelKey: "nav.libertyAI", badge: "AI", accent: "purple" },
      { href: "/opportunity-hub", icon: Globe, labelKey: "nav.opportunityHub", badge: "NEW", accent: "emerald" },
    ],
  },
  {
    label: "Career",
    items: [
      { href: "/resume", icon: FileText, labelKey: "nav.resume", accent: "emerald" },
      { href: "/jobs", icon: Briefcase, labelKey: "nav.jobs", accent: "sky" },
      { href: "/analysis", icon: BarChart3, labelKey: "nav.analysis", accent: "purple" },
      { href: "/upload", icon: Upload, labelKey: "nav.upload", accent: "amber" },
    ],
  },
  {
    label: "Growth",
    items: [
      { href: "/skills", icon: TrendingUp, labelKey: "nav.skills", accent: "rose" },
      { href: "/resources", icon: BookOpen, labelKey: "nav.resources", accent: "teal" },
      { href: "/reports", icon: PieChart, labelKey: "nav.reports", accent: "blue" },
      { href: "/settings", icon: Settings, labelKey: "nav.settings", accent: "slate" },
    ],
  },
];

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}

export function Sidebar({ collapsed = false, onToggleCollapse, variant = "desktop", onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const { t } = useI18n();
  const isMobile = variant === "mobile";

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const NavLink = ({ item }: { item: NavItem }) => {
    const active = isActive(item.href);
    const Icon = item.icon;
    const accent = ACCENTS[item.accent];

    return (
      <Link
        href={item.href}
        onClick={onNavigate}
        title={collapsed && !isMobile ? t(item.labelKey) : undefined}
        aria-current={active ? "page" : undefined}
        className={cn(
          "group relative flex items-center gap-3 rounded-[14px] px-3 py-[10px] text-[13.5px] font-[550] tracking-[-0.01em] outline-none transition-colors duration-200",
          active
            ? "text-white"
            : "text-foreground/65 hover:text-foreground",
          collapsed && !isMobile && "justify-center px-0"
        )}
      >
        {/* Gradient active indicator — slides between items */}
        {active && (
          <motion.span
            layoutId={isMobile ? "sidebar-active-mobile" : "sidebar-active"}
            className={cn("absolute inset-0 rounded-[14px]", accent.pill, accent.glow)}
            transition={{ type: "spring", stiffness: 480, damping: 38 }}
          >
            <span className="absolute inset-0 rounded-[14px] bg-gradient-to-b from-white/15 to-transparent" />
          </motion.span>
        )}

        {/* Hover wash */}
        {!active && (
          <span className="absolute inset-0 rounded-[14px] bg-foreground/[0.045] opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-white/[0.06]" />
        )}

        <span
          className={cn(
            "relative flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[10px] transition-all duration-200",
            active ? accent.chipActive : cn(accent.chip, "group-hover:scale-110 group-hover:-rotate-3")
          )}
        >
          <Icon className="h-[16px] w-[16px]" strokeWidth={active ? 2.3 : 2} />
        </span>

        {(isMobile || !collapsed) && (
          <>
            <span className="relative flex-1 truncate">{t(item.labelKey)}</span>
            {item.badge && (
              <span
                className={cn(
                  "relative inline-flex items-center gap-1 rounded-full px-[7px] py-[2px] text-[9.5px] font-extrabold tracking-[0.06em]",
                  active
                    ? "bg-white/20 text-white"
                    : item.badge === "NEW"
                      ? "bg-[#10B981]/12 text-[#059669] ring-1 ring-[#10B981]/25 dark:bg-[#10B981]/15 dark:text-[#4ADEAC]"
                      : "bg-[#7C3AED]/10 text-[#7C3AED] ring-1 ring-[#7C3AED]/25 dark:bg-[#7C3AED]/18 dark:text-[#B691FF]"
                )}
              >
                {item.badge === "AI" && <Sparkles className="h-2.5 w-2.5" />}
                {item.badge}
              </span>
            )}
            {active && <span className="relative h-[6px] w-[6px] rounded-full bg-white/90" />}
          </>
        )}

        {/* Collapsed: accent dot on active */}
        {!isMobile && collapsed && active && (
          <span className="absolute -right-[2px] top-1/2 h-[16px] w-[3px] -translate-y-1/2 rounded-full bg-current" />
        )}
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        "flex h-full flex-col overflow-hidden",
        isMobile
          ? "w-[300px] max-w-[85vw] bg-card"
          : cn(
              "glass-strong rounded-[22px] transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              collapsed ? "w-[84px]" : "w-[282px]"
            )
      )}
    >
      {/* ── Logo ── */}
      <div className="flex h-[72px] shrink-0 items-center gap-3 border-b border-border/70 px-4">
        <Link href="/dashboard" onClick={onNavigate} className="flex min-w-0 flex-1 items-center gap-3">
          <div className="relative flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#2563EB] via-[#4F46E5] to-[#7C3AED] shadow-[0_6px_16px_-4px_rgba(79,70,229,0.5)]">
            <span className="text-[16px] font-extrabold tracking-[-0.06em] text-white">JL</span>
            <span className="absolute -right-0.5 -top-0.5 flex h-[10px] w-[10px]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex h-[10px] w-[10px] rounded-full bg-[#10B981] ring-2 ring-card" />
            </span>
          </div>
          {(isMobile || !collapsed) && (
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="truncate text-[16px] font-bold tracking-[-0.02em]">JobLiberty</span>
                <span className="rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] px-[6px] py-[1px] text-[9px] font-extrabold tracking-[0.05em] text-white">
                  AI
                </span>
              </div>
              <div className="-mt-0.5 text-[11px] font-medium text-muted-foreground">Empowering careers</div>
            </div>
          )}
        </Link>

        {!isMobile && (
          <button
            onClick={onToggleCollapse}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-all hover:scale-105 hover:border-border-strong hover:text-foreground active:scale-95"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft className={cn("h-3.5 w-3.5 transition-transform duration-300", collapsed && "rotate-180")} />
          </button>
        )}
      </div>

      {/* ── Quick search ── */}
      {(isMobile || !collapsed) && (
        <div className="px-3 pb-1 pt-3">
          <Link
            href="/jobs"
            onClick={onNavigate}
            className="group flex items-center gap-2.5 rounded-[13px] border border-border/80 bg-card-muted/80 px-3 py-[10px] text-[13px] font-[450] text-muted-foreground transition-all hover:border-[#2563EB]/40 hover:bg-card hover:text-foreground hover:shadow-sm"
          >
            <Search className="h-4 w-4 transition-colors group-hover:text-[#2563EB]" />
            <span className="truncate">{t("nav.searchEverything")}</span>
            <kbd className="ml-auto hidden items-center gap-0.5 rounded-[6px] border border-border bg-card px-1.5 py-0.5 text-[10px] font-semibold sm:inline-flex">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </Link>
        </div>
      )}

      {/* ── Navigation ── */}
      <div className="premium-scrollbar flex-1 overflow-y-auto px-3 py-3">
        <div className="space-y-5">
          {SECTIONS.map((section) => (
            <div key={section.label}>
              {(isMobile || !collapsed) && (
                <div className="mb-1.5 flex items-center gap-2 px-3">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.1em] text-muted-foreground/80">
                    {section.label}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                </div>
              )}
              {!isMobile && collapsed && <div className="mx-auto mb-1.5 h-px w-8 bg-border/80" />}
              <nav className="space-y-0.5">
                {section.items.map((item) => (
                  <NavLink key={item.href} item={item} />
                ))}
              </nav>
            </div>
          ))}

          {/* ── Readiness card ── */}
          {(isMobile || !collapsed) && (
            <div className="gradient-border border-glow overflow-hidden rounded-[18px] p-[1px]">
              <div className="relative overflow-hidden rounded-[17px] bg-gradient-to-br from-[#EAF1FF] via-[#F0EAFE] to-[#E3F9F0] p-[14px] dark:from-[#14264F] dark:via-[#1D1440] dark:to-[#0B2E24]">
                <div className="dot-pattern absolute inset-0 opacity-30 dark:opacity-20" />
                <div className="relative">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-gradient-to-br from-[#2563EB] to-[#7C3AED] shadow-sm">
                      <Crown className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="text-[12.5px] font-bold tracking-[-0.01em]">Career Readiness</span>
                    <span className="ml-auto rounded-full bg-card px-1.5 py-0.5 text-[10px] font-extrabold text-[#7C3AED] ring-1 ring-[#7C3AED]/25 dark:text-[#B691FF]">
                      72%
                    </span>
                  </div>
                  <p className="mb-3 text-[11.5px] leading-[1.5] text-muted-foreground">
                    You&apos;re <span className="font-bold text-foreground">6 weeks</span> from Senior roles. Keep the streak going!
                  </p>
                  <div className="h-[7px] w-full overflow-hidden rounded-full bg-card p-[2px] shadow-inner ring-1 ring-border/60">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "72%" }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                      className="h-full rounded-full bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#10B981]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Bottom profile ── */}
      <div className="shrink-0 border-t border-border/70 p-3">
        {isMobile || !collapsed ? (
          <>
            <Link
              href="/settings"
              onClick={onNavigate}
              className="group flex items-center gap-3 rounded-[15px] border border-transparent p-2 transition-all hover:border-border hover:bg-card-muted/70"
            >
              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] via-[#4F46E5] to-[#2563EB] text-[13px] font-bold text-white shadow-[0_4px_12px_-2px_rgba(79,70,229,0.5)] transition-transform group-hover:scale-105">
                  CO
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#22C55E] ring-2 ring-card" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-semibold tracking-[-0.01em]">Chinedu Okafor</div>
                <div className="flex items-center gap-1 truncate text-[11px] text-muted-foreground">
                  <Sparkles className="h-3 w-3 text-[#F59E0B]" /> Pro • Backend Engineer
                </div>
              </div>
              <Settings className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:rotate-90 group-hover:text-foreground" />
            </Link>
            <div className="mt-1.5 flex items-center justify-between px-2">
              <span className="text-[9.5px] font-bold uppercase tracking-[0.08em] text-muted-foreground/70">3MTT NextGen • 2026</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#059669] dark:text-[#4ADEAC]">
                <Zap className="h-3 w-3 text-[#F59E0B]" />
                AI Active
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2.5 py-1">
            <Link href="/settings" title="Settings">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] via-[#4F46E5] to-[#2563EB] text-[13px] font-bold text-white shadow-[0_4px_12px_-2px_rgba(79,70,229,0.5)] transition-transform hover:scale-105">
                CO
              </div>
            </Link>
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#22C55E]" />
          </div>
        )}
      </div>
    </aside>
  );
}
