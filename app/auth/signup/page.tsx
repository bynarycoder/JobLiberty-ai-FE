"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { AuthShell } from "@/components/auth/AuthShell";
import { useI18n } from "@/providers/I18nProvider";
import { api } from "@/lib/services/api";
import { toast } from "sonner";
import { Mail, Lock, User, MapPin, UserPlus } from "lucide-react";

const inputCls =
  "h-[46px] w-full rounded-[13px] border border-border bg-card/80 pl-11 pr-4 text-[14px] font-[450] tracking-[-0.01em] text-foreground shadow-sm transition-all placeholder:text-muted-foreground/70 hover:border-border-strong focus:border-[#2563EB]/50 focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10";

export default function SignUp() {
  const { t } = useI18n();
  const router = useRouter();
  const [formData, setFormData] = React.useState({ name: "", email: "", password: "", location: "Abuja, Nigeria" });
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.signUp(formData);
      toast.success("Account created! Welcome to JobLiberty.");
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
    <AuthShell title={t("auth.signUp")} subtitle="Create your account and start your career journey — free for 3MTT fellows.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-[12.5px] font-bold tracking-[-0.01em]">{t("auth.fullName")}</label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-muted-foreground" />
            <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputCls} placeholder="Abdulwahab Abdulyekeen" required />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-[12.5px] font-bold tracking-[-0.01em]">{t("auth.email")}</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-muted-foreground" />
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputCls} placeholder="you@example.com" required />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-[12.5px] font-bold tracking-[-0.01em]">{t("auth.password")}</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-muted-foreground" />
              <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className={inputCls} placeholder="••••••••" required />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-[12.5px] font-bold tracking-[-0.01em]">{t("auth.location")}</label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-muted-foreground" />
              <input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className={inputCls} />
            </div>
          </div>
        </div>

        <Button type="submit" isLoading={loading} className="h-[48px] w-full gap-2 rounded-full text-[15px]">
          {!loading && <UserPlus className="h-4 w-4" />}
          {loading ? t("common.loading") : t("auth.createAccount")}
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3 text-[10.5px] font-bold uppercase tracking-[0.12em] text-muted-foreground/70">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border" /> {t("auth.signUpWith")}{" "}
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
        {t("auth.hasAccount")}{" "}
        <Link href="/auth/signin" className="font-bold text-[#2563EB] hover:underline dark:text-[#7FA8FF]">
          {t("auth.signIn")}
        </Link>
      </p>
    </AuthShell>
  );
}
