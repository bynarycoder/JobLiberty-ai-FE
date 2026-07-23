"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useI18n } from "@/providers/I18nProvider";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/DropdownMenu";
import {
  Search,
  Bell,
  Sparkles,
  Command,
  ChevronDown,
  Plus,
  Menu,
  Upload,
  MessageCircle,
  Briefcase,
  Settings,
  LayoutDashboard,
  LogOut,
  Zap,
  TrendingUp,
  CheckCheck,
  Info,
  AlertTriangle,
  Globe,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/services/api";
import { cn } from "@/lib/utils";
import { getUserProfile, getInitials } from "@/lib/api/user-profile";
import { useAuth } from "@/contexts/AuthContext";

const NOTIF_ICONS = {
  info: Info,
  success: CheckCheck,
  warning: AlertTriangle,
  opportunity: TrendingUp,
} as const;

const NOTIF_COLORS = {
  info: "bg-[#E2F3FE] text-[#0284C7] dark:bg-[#0EA5E9]/15 dark:text-[#5CC8FA]",
  success: "bg-[#E4F9EC] text-[#16A34A] dark:bg-[#22C55E]/15 dark:text-[#4ADE80]",
  warning: "bg-[#FEF3DF] text-[#D97706] dark:bg-[#F59E0B]/15 dark:text-[#FBBF24]",
  opportunity: "bg-[#F0EAFE] text-[#7C3AED] dark:bg-[#7C3AED]/18 dark:text-[#B691FF]",
} as const;

export function DashboardTopbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { t } = useI18n();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [notifications, setNotifications] = React.useState<
    { id: string; title: string; message: string; type: keyof typeof NOTIF_ICONS; timestamp: string; read: boolean }[]
  >([]);
  const { user, isAuthenticated, logout } = useAuth();
  const fallbackProfile = getUserProfile();
  const profile = user
    ? {
        name: user.fullName || user.name || user.email,
        email: user.email,
        location: user.location,
      }
    : fallbackProfile;
  const profileInitials = getInitials(profile.name);

  React.useEffect(() => {
    let mounted = true;
    api
      .fetchNotifications()
      .then((n) => mounted && setNotifications(n as typeof notifications))
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const unread = notifications.filter((n) => !n.read).length;

  /* Client-side navigation — NEVER a full page reload */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/jobs?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const markAllRead = () => setNotifications((ns) => ns.map((n) => ({ ...n, read: true })));

  return (
    <div className="topbar-underline sticky top-0 z-30 border-b border-border/60 bg-background/85 glass">
      <div className="mx-auto flex h-[66px] max-w-[1680px] items-center justify-between gap-3 px-4 lg:px-7">
        {/* ── Mobile menu + logo ── */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="rounded-full" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#2563EB] via-[#4F46E5] to-[#7C3AED] shadow-[0_4px_12px_-2px_rgba(79,70,229,0.5)]">
              <span className="text-[13px] font-extrabold tracking-[-0.05em] text-white">JL</span>
            </div>
          </Link>
        </div>

        {/* ── Search ── */}
        <div className="hidden max-w-[560px] flex-1 items-center gap-3 sm:flex">
          <form onSubmit={handleSearch} className="group relative w-full">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-[#2563EB]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("nav.searchEverything")}
              className="h-[42px] w-full rounded-[13px] border border-border/80 bg-card/70 pl-[40px] pr-[104px] text-[13.5px] font-[450] tracking-[-0.01em] text-foreground shadow-sm transition-all duration-200 placeholder:text-muted-foreground/80 hover:border-border-strong focus:border-[#2563EB]/50 focus:bg-card focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10"
            />
            <div className="absolute right-1.5 top-1/2 hidden -translate-y-1/2 items-center gap-1.5 md:flex">
              <kbd className="inline-flex h-[24px] items-center gap-1 rounded-[7px] border border-border bg-card-muted px-1.5 text-[11px] font-semibold text-muted-foreground">
                <Command className="h-3 w-3" />K
              </kbd>
              <Button type="submit" size="sm" className="h-[30px] rounded-[9px] px-3 text-[12.5px]">
                Search
              </Button>
            </div>
          </form>
        </div>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-1.5">
          {/* Quick actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="mr-1 hidden h-[38px] gap-1.5 rounded-full px-4 lg:inline-flex">
                <Plus className="h-4 w-4" />
                <span>{t("nav.quickActions")}</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-strong w-[240px] rounded-[16px] border-border/70 p-1.5">
              <DropdownMenuLabel className="px-2.5 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
                {t("nav.quickActions")}
              </DropdownMenuLabel>
              <DropdownMenuItem asChild className="cursor-pointer rounded-[11px] px-2.5 py-2.5 focus:bg-primary-soft/70">
                <Link href="/upload" className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#FEF3DF] text-[#D97706] dark:bg-[#F59E0B]/15 dark:text-[#FBBF24]">
                    <Upload className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold">{t("nav.upload")}</span>
                    <span className="block text-[11px] text-muted-foreground">PDF or DOCX, instant ATS scan</span>
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer rounded-[11px] px-2.5 py-2.5 focus:bg-primary-soft/70">
                <Link href="/chat" className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#F0EAFE] text-[#7C3AED] dark:bg-[#7C3AED]/18 dark:text-[#B691FF]">
                    <MessageCircle className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold">New AI chat</span>
                    <span className="block text-[11px] text-muted-foreground">Career coaching in 4 languages</span>
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer rounded-[11px] px-2.5 py-2.5 focus:bg-primary-soft/70">
                <Link href="/jobs" className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#E2F3FE] text-[#0284C7] dark:bg-[#0EA5E9]/15 dark:text-[#5CC8FA]">
                    <Briefcase className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold">{t("nav.jobs")}</span>
                    <span className="block text-[11px] text-muted-foreground">Search & AI match</span>
                  </span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* AI status pill */}
          <Link
            href="/chat"
            className="mr-1 hidden items-center gap-2 rounded-full border border-[#2563EB]/25 bg-[#2563EB]/[0.07] px-3 py-1.5 transition-all hover:border-[#2563EB]/40 hover:bg-[#2563EB]/[0.12] md:flex"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-[#10B981] opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-[#10B981]" />
            </span>
            <span className="flex items-center gap-1 text-[11px] font-bold tracking-[0.02em] text-[#1D4ED8] dark:text-[#7FA8FF]">
              <Sparkles className="h-3 w-3" />
              Liberty AI
            </span>
          </Link>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full border border-transparent hover:border-border"
                aria-label={t("nav.notifications")}
              >
                <Bell className="h-[18px] w-[18px]" />
                <AnimatePresence>
                  {unread > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -right-0.5 -top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-gradient-to-br from-[#EF4444] to-[#F97316] px-[4px] text-[10px] font-bold text-white shadow-[0_0_0_2px_var(--background)]"
                    >
                      {unread}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-strong w-[360px] max-w-[92vw] rounded-[18px] border-border/70 p-0">
              <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-bold tracking-[-0.01em]">{t("nav.notifications")}</span>
                  {unread > 0 && (
                    <span className="rounded-full bg-[#EF4444]/10 px-2 py-0.5 text-[10.5px] font-extrabold text-[#DC2626] ring-1 ring-[#EF4444]/20 dark:text-[#F98B8B]">
                      {unread} new
                    </span>
                  )}
                </div>
                <button
                  onClick={markAllRead}
                  className="text-[11.5px] font-semibold text-[#2563EB] transition-colors hover:text-[#1D4ED8] dark:text-[#7FA8FF]"
                >
                  Mark all read
                </button>
              </div>
              <div className="max-h-[380px] overflow-y-auto p-1.5">
                {notifications.length === 0 && (
                  <div className="px-4 py-8 text-center text-[13px] text-muted-foreground">You&apos;re all caught up ✨</div>
                )}
                {notifications.map((n) => {
                  const Icon = NOTIF_ICONS[n.type] ?? Info;
                  return (
                    <div
                      key={n.id}
                      className={cn(
                        "group flex cursor-pointer items-start gap-3 rounded-[12px] px-2.5 py-2.5 transition-colors hover:bg-card-muted/80",
                        !n.read && "bg-primary-soft/40 dark:bg-[#2563EB]/[0.07]"
                      )}
                    >
                      <span className={cn("mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px]", NOTIF_COLORS[n.type] ?? NOTIF_COLORS.info)}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-semibold">{n.title}</span>
                        <span className="mt-0.5 block line-clamp-2 text-[12px] leading-[1.45] text-muted-foreground">{n.message}</span>
                        <span className="mt-1 block text-[10.5px] font-medium text-muted-foreground/70">{n.timestamp}</span>
                      </span>
                      {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#2563EB]" />}
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-border/60 p-1.5">
                <Link
                  href="/dashboard"
                  className="block rounded-[10px] px-3 py-2 text-center text-[12px] font-semibold text-[#2563EB] transition-colors hover:bg-card-muted/80 dark:text-[#7FA8FF]"
                >
                  View all activity
                </Link>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <LanguageSwitcher compact />
          <ThemeToggle />

          <div className="mx-1 hidden h-6 w-px bg-border sm:block" />

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="group flex items-center gap-2.5 rounded-full border border-border bg-card/70 py-1 pl-1 pr-2.5 shadow-sm transition-all hover:border-border-strong hover:bg-card hover:shadow-md">
                <div className="relative flex h-[32px] w-[32px] items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] via-[#4F46E5] to-[#2563EB] text-[12px] font-bold text-white transition-transform group-hover:scale-105">
                  {profileInitials}
                  <span className="absolute -bottom-0.5 -right-0.5 h-[10px] w-[10px] rounded-full bg-[#22C55E] ring-2 ring-card" />
                </div>
                <span className="hidden text-left leading-tight md:block">
                  <span className="block text-[12.5px] font-semibold tracking-[-0.01em]">{profile.name}</span>
                  <span className="flex items-center gap-1 text-[10.5px] font-medium text-muted-foreground">
                    Pro <Zap className="h-2.5 w-2.5 text-[#F59E0B]" />
                  </span>
                </span>
                <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180 md:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-strong w-[230px] rounded-[16px] border-border/70 p-1.5">
              <div className="mb-1 rounded-[12px] bg-gradient-to-br from-[#2563EB] via-[#4F46E5] to-[#7C3AED] p-3 text-white">
                  <div className="text-[13.5px] font-bold">{profile.name}</div>
                <div className="text-[11px] text-white/75">{profile.email}</div>
                <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold backdrop-blur-sm">
                  <Zap className="h-2.5 w-2.5" /> Pro Plan
                </div>
              </div>
              <DropdownMenuItem asChild className="cursor-pointer rounded-[10px] px-2.5 py-2 focus:bg-primary-soft/70">
                <Link href="/dashboard" className="flex items-center gap-2.5 text-[13px] font-medium">
                  <LayoutDashboard className="h-4 w-4 text-[#2563EB]" /> {t("nav.dashboard")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer rounded-[10px] px-2.5 py-2 focus:bg-primary-soft/70">
                <Link href="/opportunity-hub" className="flex items-center gap-2.5 text-[13px] font-medium">
                  <Globe className="h-4 w-4 text-[#10B981]" /> {t("nav.opportunityHub")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer rounded-[10px] px-2.5 py-2 focus:bg-primary-soft/70">
                <Link href="/settings" className="flex items-center gap-2.5 text-[13px] font-medium">
                  <Settings className="h-4 w-4 text-muted-foreground" /> {t("nav.settings")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1" />
              {isAuthenticated ? (
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                    logout();
                  }}
                  className="cursor-pointer rounded-[10px] px-2.5 py-2 text-[13px] font-medium text-[#DC2626] focus:bg-danger-soft dark:text-[#F98B8B]"
                >
                  <LogOut className="h-4 w-4" /> {t("nav.logout")}
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem asChild className="cursor-pointer rounded-[10px] px-2.5 py-2 focus:bg-primary-soft/70">
                  <Link href="/auth/signin" className="flex items-center gap-2.5 text-[13px] font-medium text-[#2563EB] dark:text-[#7FA8FF]">
                    <LogOut className="h-4 w-4 rotate-180" /> {t("nav.signIn")}
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
