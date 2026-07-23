"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { AuthShell } from "@/components/auth/AuthShell";
import { useI18n } from "@/providers/I18nProvider";
import { useAuth } from "@/contexts/AuthContext";
import { getApiError } from "@/lib/api/client";
import { toast } from "sonner";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";

const inputCls =
  "h-[46px] w-full rounded-[13px] border border-border bg-card/80 pl-11 pr-4 text-[14px] font-[450] tracking-[-0.01em] text-foreground shadow-sm transition-all placeholder:text-muted-foreground/70 hover:border-border-strong focus:border-[#2563EB]/50 focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function SignInInner() {
  const { t } = useI18n();
  const router = useRouter();
  const search = useSearchParams();
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const redirectTarget = React.useMemo(() => {
    const raw = search?.get("redirect");
    if (!raw) return "/dashboard";
    // Prevent open-redirects
    if (!raw.startsWith("/") || raw.startsWith("//")) return "/dashboard";
    return raw;
  }, [search]);

  // If already authenticated (e.g. user navigates to /auth/signin manually)
  // bounce them straight to the redirect target.
  React.useEffect(() => {
    if (!authLoading && isAuthenticated) router.replace(redirectTarget);
  }, [authLoading, isAuthenticated, redirectTarget, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    try {
      const user = await login({ email: email.trim(), password });
      toast.success(`Welcome back${user.fullName ? `, ${user.fullName.split(" ")[0]}` : ""}!`);
      router.replace(redirectTarget);
    } catch (err) {
      const apiErr = getApiError(err);
      const message =
        apiErr.status === 401 || apiErr.status === 400
          ? "Incorrect email or password. Please try again."
          : apiErr.message;
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title={t("auth.signIn")} subtitle={t("app.altTagline")}>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label className="mb-1.5 block text-[12.5px] font-bold tracking-[-0.01em]">{t("auth.email")}</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-muted-foreground" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className={inputCls}
              required
              disabled={loading}
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-[12.5px] font-bold tracking-[-0.01em]">{t("auth.password")}</label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-muted-foreground" />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              className={inputCls}
              required
              disabled={loading}
            />
          </div>
        </div>

        {error && (
          <div role="alert" className="flex items-start gap-2 rounded-[12px] border border-[#EF4444]/25 bg-[#EF4444]/10 p-3 text-[12.5px] font-medium text-[#B91C1C] dark:text-[#F98B8B]">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

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

      <p className="mt-6 text-center text-[13px] font-medium text-muted-foreground">
        {t("auth.noAccount")}{" "}
        <Link href="/auth/signup" className="font-bold text-[#2563EB] hover:underline dark:text-[#7FA8FF]">
          {t("auth.signUp")}
        </Link>
      </p>
    </AuthShell>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={null}>
      <SignInInner />
    </Suspense>
  );
}
