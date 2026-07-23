"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useI18n } from "@/providers/I18nProvider";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Menu, X, ArrowUpRight, Sparkles, LayoutDashboard, User, Settings as SettingsIcon, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "JL";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Navbar() {
  const { t } = useI18n();
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = user ? getInitials(user.fullName || user.name || user.email) : "JL";

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-border shadow-sm"
          : "bg-background/70 backdrop-blur-xl border-border/60"
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
            {([
              { href: "#features", label: "Features" },
              { href: "/dashboard", label: t("nav.dashboard") },
              { href: "#how", label: "How it works" },
              { href: "/opportunity-hub", label: "Opportunities", badge: "NEW" },
            ] satisfies { href: string; label: string; badge?: string }[]).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative flex items-center gap-1.5 rounded-full px-3.5 py-[6px] text-[13.5px] font-[500] tracking-[-0.01em] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white dark:hover:bg-white/[0.06] transition-all"
              >
                {link.label}
                {link.badge && (
                  <span className="rounded-full bg-[#10B981] px-1.5 py-0.5 text-[9px] font-bold tracking-[0.04em] text-white leading-none">
                    {link.badge}
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

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="group flex items-center gap-2 rounded-full border border-border bg-card/70 py-1 pl-1 pr-3 shadow-sm transition-all hover:border-border-strong hover:bg-card hover:shadow-md">
                  <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] via-[#4F46E5] to-[#2563EB] text-[12px] font-bold text-white">
                    {initials}
                  </div>
                  <span className="hidden lg:block text-[12.5px] font-semibold leading-tight max-w-[120px] truncate">
                    {user.fullName || user.name || user.email}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[240px] rounded-[14px] border-border/70 p-1.5">
                <DropdownMenuLabel className="px-2.5 py-2">
                  <div className="text-[13px] font-bold leading-tight">{user.fullName || user.name || user.email}</div>
                  <div className="text-[11px] font-medium text-muted-foreground truncate">{user.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer rounded-[10px] px-2.5 py-2 focus:bg-primary-soft/70">
                  <Link href="/dashboard" className="flex items-center gap-2.5 text-[13px] font-medium">
                    <LayoutDashboard className="h-4 w-4 text-[#2563EB]" /> {t("nav.dashboard")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-[10px] px-2.5 py-2 focus:bg-primary-soft/70">
                  <Link href="/profile" className="flex items-center gap-2.5 text-[13px] font-medium">
                    <User className="h-4 w-4 text-[#7C3AED]" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-[10px] px-2.5 py-2 focus:bg-primary-soft/70">
                  <Link href="/settings" className="flex items-center gap-2.5 text-[13px] font-medium">
                    <SettingsIcon className="h-4 w-4 text-muted-foreground" /> {t("nav.settings")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                    logout();
                  }}
                  className="cursor-pointer rounded-[10px] px-2.5 py-2 text-[13px] font-medium text-[#DC2626] focus:bg-danger-soft dark:text-[#F98B8B]"
                >
                  <LogOut className="h-4 w-4" /> {t("nav.logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
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
            </>
          )}
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
            className="md:hidden border-t border-border bg-popover/95 backdrop-blur-xl px-6 py-6"
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
                {isAuthenticated && user ? (
                  <>
                    <div className="flex items-center gap-3 rounded-[12px] bg-card-muted/70 px-3 py-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] via-[#4F46E5] to-[#2563EB] text-[13px] font-bold text-white">
                        {initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[13px] font-semibold">{user.fullName || user.name || user.email}</div>
                        <div className="truncate text-[11px] text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                    <Link href="/profile">
                      <Button variant="outline" className="w-full rounded-full">Profile</Button>
                    </Link>
                    <Link href="/settings">
                      <Button variant="outline" className="w-full rounded-full">{t("nav.settings")}</Button>
                    </Link>
                    <Button onClick={() => logout()} variant="outline" className="w-full rounded-full text-[#DC2626] dark:text-[#F98B8B]">
                      <LogOut className="mr-2 h-4 w-4" /> {t("nav.logout")}
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/signin">
                      <Button variant="outline" className="w-full rounded-full">
                        {t("nav.signIn")}
                      </Button>
                    </Link>
                    <Link href="/auth/signup">
                      <Button className="w-full rounded-full">{t("nav.signUp")}</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
