"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useI18n } from "@/providers/I18nProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/dashboard/PageHero";
import { Settings, Moon, Sun, Monitor, Bell, Globe, User, Shield, Trash2, Check, Palette, Mail, Briefcase, FileText, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

function Toggle({ enabled, onChange, tint }: { enabled: boolean; onChange: (v: boolean) => void; tint: string }) {
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={() => onChange(!enabled)}
      aria-pressed={enabled}
      className={cn(
        "relative h-[26px] w-[48px] shrink-0 rounded-full p-[3px] transition-colors duration-300",
        enabled ? tint : "bg-[#CBD5E1] dark:bg-white/15"
      )}
    >
      <motion.span
        animate={{ x: enabled ? 22 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="block h-[20px] w-[20px] rounded-full bg-white shadow-md"
      />
    </motion.button>
  );
}

function SettingRow({ icon: Icon, iconBox, title, desc, children }: { icon: React.ElementType; iconBox: string; title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3.5 px-5 py-4 transition-colors hover:bg-card-muted/50">
      <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] text-white", iconBox)}>
        <Icon className="h-[18px] w-[18px]" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[13.5px] font-bold tracking-[-0.01em]">{title}</div>
        <div className="text-[11.5px] font-medium text-muted-foreground">{desc}</div>
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const { t, language, setLanguage, languages } = useI18n();
  const { theme, setTheme } = useTheme();
  const [notif, setNotif] = React.useState({ email: true, jobs: true, weekly: false });

  /* next-themes is undefined during SSR — "Auto" renders until mounted */
  const themeLabel = theme === "dark" ? "Dark" : theme === "light" ? "Light" : "Auto";

  const themeOptions = [
    { key: "light", icon: Sun, label: t("settings.lightMode"), tint: "from-[#F59E0B] to-[#FBBF24]" },
    { key: "dark", icon: Moon, label: t("settings.darkMode"), tint: "from-[#2563EB] to-[#7C3AED]" },
    { key: "system", icon: Monitor, label: t("settings.system"), tint: "from-[#14B8A6] to-[#0EA5E9]" },
  ];

  return (
    <div className="space-y-6">
      <PageHero
        gradient="indigo"
        icon={Settings}
        eyebrow="Workspace • Preferences"
        title={t("settings.title")}
        subtitle="Tune JobLiberty to feel like yours — appearance, language, alerts and account controls in one place."
        stats={[
          { label: "Theme", value: themeLabel },
          { label: "Language", value: languages.find((l) => l.code === language)?.label ?? "English" },
          { label: "Alerts on", value: Object.values(notif).filter(Boolean).length, sub: "of 3 channels" },
          { label: "Plan", value: "Pro", sub: "3MTT Fellow" },
        ]}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {/* ── Appearance ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[22px] border bg-card shadow-sm"
        >
          <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#7C3AED] to-[#2563EB]" />
          <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#7C3AED] text-white shadow-[0_8px_18px_-6px_rgba(124,58,237,0.65)]">
                <Palette className="h-[18px] w-[18px]" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold tracking-[-0.01em]">{t("settings.theme")}</h3>
                <p className="text-[11.5px] font-medium text-muted-foreground">Deep-navy dark, airy light — pick your vibe</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 p-5">
            {themeOptions.map((opt) => {
              const active = theme === opt.key;
              return (
                <motion.button
                  key={opt.key}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setTheme(opt.key)}
                  className={cn(
                    "relative flex flex-col items-center gap-2.5 rounded-[16px] border p-4 transition-all duration-300",
                    active ? "border-transparent bg-[linear-gradient(150deg,#F0EAFE,#EAF1FF)] shadow-[0_10px_24px_-8px_rgba(124,58,237,0.35)] ring-2 ring-[#7C3AED]/50 dark:bg-[linear-gradient(150deg,rgba(124,58,237,0.16),rgba(37,99,235,0.12))]" : "hover:bg-card-muted/60 hover:shadow-md"
                  )}
                >
                  <span className={cn("flex h-11 w-11 items-center justify-center rounded-[13px] bg-gradient-to-br text-white shadow-md", opt.tint)}>
                    <opt.icon className="h-5 w-5" />
                  </span>
                  <span className="text-[12px] font-bold">{opt.label}</span>
                  {active && (
                    <motion.span layoutId="theme-check" className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#7C3AED] text-white shadow">
                      <Check className="h-3 w-3" />
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.section>

        {/* ── Language ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[22px] border bg-card shadow-sm"
        >
          <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#10B981] to-[#0EA5E9]" />
          <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#10B981] text-white shadow-[0_8px_18px_-6px_rgba(16,185,129,0.65)]">
                <Globe className="h-[18px] w-[18px]" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold tracking-[-0.01em]">{t("settings.language")}</h3>
                <p className="text-[11.5px] font-medium text-muted-foreground">Liberty AI replies in your language</p>
              </div>
            </div>
            <Badge variant="emerald" size="sm" dot pulse>4 supported</Badge>
          </div>
          <div className="grid grid-cols-2 gap-3 p-5">
            {languages.map((lang) => {
              const active = language === lang.code;
              return (
                <motion.button
                  key={lang.code}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setLanguage(lang.code);
                    toast.success(`Language set to ${lang.label}`);
                  }}
                  className={cn(
                    "flex items-center gap-3 rounded-[14px] border p-3 text-left transition-all duration-300",
                    active ? "border-transparent bg-[linear-gradient(150deg,#E3F9F1,#E8F0FF)] shadow-[0_10px_24px_-8px_rgba(16,185,129,0.35)] ring-2 ring-[#10B981]/50 dark:bg-[linear-gradient(150deg,rgba(16,185,129,0.14),rgba(37,99,235,0.10))]" : "hover:bg-card-muted/60 hover:shadow-md"
                  )}
                >
                  <span className="text-[22px]">{lang.flag}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-bold">{lang.label}</span>
                    <span className="block text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground">{lang.code}</span>
                  </span>
                  {active && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#10B981] text-white shadow">
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.section>

        {/* ── Notifications ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[22px] border bg-card shadow-sm"
        >
          <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#F59E0B] to-[#FBBF24]" />
          <div className="flex items-center gap-2.5 border-b border-border/70 px-5 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#F59E0B] text-white shadow-[0_8px_18px_-6px_rgba(245,158,11,0.65)]">
              <Bell className="h-[18px] w-[18px]" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold tracking-[-0.01em]">{t("settings.notifications")}</h3>
              <p className="text-[11.5px] font-medium text-muted-foreground">Only signal, never noise</p>
            </div>
          </div>
          <div className="divide-y divide-border/60">
            <SettingRow icon={Mail} iconBox="bg-[#2563EB] shadow-[0_8px_18px_-6px_rgba(37,99,235,0.65)]" title={t("settings.emailNotifications")} desc="Mentor replies & account security">
              <Toggle enabled={notif.email} onChange={(v) => { setNotif((n) => ({ ...n, email: v })); toast.success(v ? "Email alerts on" : "Email alerts off"); }} tint="bg-gradient-to-r from-[#2563EB] to-[#4F46E5]" />
            </SettingRow>
            <SettingRow icon={Briefcase} iconBox="bg-[#0EA5E9] shadow-[0_8px_18px_-6px_rgba(14,165,233,0.65)]" title={t("settings.jobAlerts")} desc="New 85%+ matches, twice daily digest">
              <Toggle enabled={notif.jobs} onChange={(v) => { setNotif((n) => ({ ...n, jobs: v })); }} tint="bg-gradient-to-r from-[#0284C7] to-[#0EA5E9]" />
            </SettingRow>
            <SettingRow icon={FileText} iconBox="bg-[#14B8A6] shadow-[0_8px_18px_-6px_rgba(20,184,166,0.65)]" title={t("settings.weeklyReports")} desc="Career analytics every Monday">
              <Toggle enabled={notif.weekly} onChange={(v) => { setNotif((n) => ({ ...n, weekly: v })); }} tint="bg-gradient-to-r from-[#0F766E] to-[#14B8A6]" />
            </SettingRow>
          </div>
        </motion.section>

        {/* ── Account ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[22px] border bg-card shadow-sm"
        >
          <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#EF4444] to-[#F87171]" />
          <div className="flex items-center gap-2.5 border-b border-border/70 px-5 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#7C3AED] via-[#4F46E5] to-[#2563EB] text-white shadow-[0_8px_18px_-6px_rgba(79,70,229,0.65)]">
              <User className="h-[18px] w-[18px]" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold tracking-[-0.01em]">{t("settings.account")}</h3>
              <p className="text-[11.5px] font-medium text-muted-foreground">Profile, security &amp; data</p>
            </div>
          </div>
          <div className="space-y-3 p-5">
            <div className="flex items-center gap-3 rounded-[15px] bg-[linear-gradient(120deg,#7C3AED,#4F46E5_50%,#2563EB)] p-4 text-white shadow-[0_12px_28px_-8px_rgba(79,70,229,0.5)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-[16px] font-extrabold ring-2 ring-white/30 backdrop-blur-sm">AA</div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[14px] font-bold">Abdulwahab Abdulyekeen</div>
                <div className="truncate text-[11.5px] text-white/75">abdulwahab@jobliberty.africa • Backend Engineer</div>
              </div>
              <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-extrabold backdrop-blur-sm">PRO</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="gap-2 rounded-full" asChild>
                <Link href="/resume">
                  <Shield className="h-4 w-4 text-[#10B981]" /> Privacy &amp; data
                </Link>
              </Button>
              <Button variant="outline" className="gap-2 rounded-full" asChild>
                <Link href="/auth/signin">
                  <LogOut className="h-4 w-4 text-[#D97706]" /> {t("nav.logout")}
                </Link>
              </Button>
            </div>
            <button
              onClick={() => toast.error("Contact support to delete your account — your data stays yours.")}
              className="tint-rose flex w-full items-center justify-center gap-2 rounded-full border p-3 text-[12.5px] font-bold text-[#B91C1C] transition-shadow hover:shadow-md dark:text-[#F98B8B]"
            >
              <Trash2 className="h-4 w-4" /> {t("settings.deleteAccount")}
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
