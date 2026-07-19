"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { AuthShell } from "@/components/auth/AuthShell";
import { useI18n } from "@/providers/I18nProvider";
import { api } from "@/lib/services/api";
import { toast } from "sonner";
import { Mail, Lock, LogIn } from "lucide-react";

const inputCls =
  "h-[46px] w-full rounded-[13px] border border-border bg-card/80 pl-11 pr-4 text-[14px] font-[450] tracking-[-0.01em] text-foreground shadow-sm transition-all placeholder:text-muted-foreground/70 hover:border-border-strong focus:border-[#2563EB]/50 focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10";

export default function SignIn() {
  const { t } = useI18n();
  const router = useRouter();
  const [email, setEmail] = React.useState("chinedu.okoro@email.com");
  const [password, setPassword] = React.useState("password123");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.signIn(email, password);
      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch {
      // Auth endpoints are not part of the published production contract yet.
      toast.message("Continuing in demo mode", {
        description: "Backend auth is not enabled. Exploring the app without a session.",
      });
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title={t("auth.signIn")} subtitle={t("app.altTagline")}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-[12.5px] font-bold tracking-[-0.01em]">{t("auth.email")}</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-muted-foreground" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className={inputCls} required />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-[12.5px] font-bold tracking-[-0.01em]">{t("auth.password")}</label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-muted-foreground" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className={inputCls} required />
          </div>
        </div>

        <div className="flex items-center justify-between text-[12.5px] font-medium">
          <label className="flex cursor-pointer items-center gap-2 text-muted-foreground">
            <input type="checkbox" className="h-3.5 w-3.5 rounded accent-[#2563EB]" /> {t("auth.rememberMe")}
          </label>
          <Link href="/auth/forgot-password" className="font-bold text-[#2563EB] hover:underline dark:text-[#7FA8FF]">
            {t("auth.forgotPasswordLink")}
          </Link>
        </div>

        <Button type="submit" isLoading={loading} className="h-[48px] w-full gap-2 rounded-full text-[15px]">
          {!loading && <LogIn className="h-4 w-4" />}
          {loading ? t("common.loading") : t("auth.signIn")}
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3 text-[10.5px] font-bold uppercase tracking-[0.12em] text-muted-foreground/70">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border" /> {t("auth.signInWith")}{" "}
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-[44px] gap-2 rounded-full font-bold">
          <span className="text-[15px] font-black text-[#EA4335]">G</span> Google
        </Button>
        <Button variant="outline" className="h-[44px] gap-2 rounded-full font-bold">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[9px] font-black text-background">GH</span> GitHub
        </Button>
      </div>

      <p className="mt-6 text-center text-[13px] font-medium text-muted-foreground">
        {t("auth.noAccount")}{" "}
        <Link href="/auth/signup" className="font-bold text-[#2563EB] hover:underline dark:text-[#7FA8FF]">
          {t("auth.signUp")}
        </Link>
      </p>
    </AuthShell>
  );
}
