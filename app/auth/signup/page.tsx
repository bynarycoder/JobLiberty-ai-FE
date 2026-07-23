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
import { Mail, Lock, User, MapPin, UserPlus, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const inputCls =
  "h-[46px] w-full rounded-[13px] border border-border bg-card/80 pl-11 pr-4 text-[14px] font-[450] tracking-[-0.01em] text-foreground shadow-sm transition-all placeholder:text-muted-foreground/70 hover:border-border-strong focus:border-[#2563EB]/50 focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

interface Strength {
  score: 0 | 1 | 2 | 3 | 4;
  label: "Too weak" | "Weak" | "Fair" | "Strong" | "Excellent";
  color: string;
}

function scorePassword(password: string): Strength {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password) || password.length >= 12) score += 1;
  const clamped = Math.min(4, score) as Strength["score"];
  const labels: Strength["label"][] = ["Too weak", "Weak", "Fair", "Strong", "Excellent"];
  const colors = ["bg-[#EF4444]", "bg-[#F59E0B]", "bg-[#F59E0B]", "bg-[#10B981]", "bg-[#059669]"];
  return { score: clamped, label: labels[clamped], color: colors[clamped] };
}

function SignUpInner() {
  const { t } = useI18n();
  const router = useRouter();
  const search = useSearchParams();
  const { register, isAuthenticated, loading: authLoading } = useAuth();
  const [formData, setFormData] = React.useState({ name: "", email: "", password: "", confirmPassword: "", location: "" });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const redirectTarget = React.useMemo(() => {
    const raw = search?.get("redirect");
    if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return "/dashboard";
    return raw;
  }, [search]);

  React.useEffect(() => {
    if (!authLoading && isAuthenticated) router.replace(redirectTarget);
  }, [authLoading, isAuthenticated, redirectTarget, router]);

  const strength = scorePassword(formData.password);
  const passwordsMatch =
    formData.confirmPassword.length === 0 || formData.password === formData.confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (strength.score < 2) {
      setError("Please choose a stronger password — mix letters, numbers, and symbols.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const user = await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        location: formData.location.trim() || undefined,
      });
      toast.success(`Welcome to JobLiberty${user.fullName ? `, ${user.fullName.split(" ")[0]}` : ""}!`);
      router.replace(redirectTarget);
    } catch (err) {
      const apiErr = getApiError(err);
      const message =
        apiErr.status === 409
          ? "An account with that email already exists. Try signing in instead."
          : apiErr.message;
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title={t("auth.signUp")} subtitle="Create your account and start your career journey — free for 3MTT fellows.">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label className="mb-1.5 block text-[12.5px] font-bold tracking-[-0.01em]">{t("auth.fullName")}</label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-muted-foreground" />
            <input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputCls}
              placeholder="Enter your full name"
              autoComplete="name"
              required
              disabled={loading}
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-[12.5px] font-bold tracking-[-0.01em]">{t("auth.email")}</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputCls}
              placeholder="you@example.com"
              autoComplete="email"
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
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={inputCls}
              placeholder="Create a password (min. 8 characters)"
              autoComplete="new-password"
              required
              disabled={loading}
              minLength={8}
            />
          </div>
          {formData.password && (
            <div className="mt-2 space-y-1">
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-colors",
                      i < strength.score ? strength.color : "bg-border"
                    )}
                  />
                ))}
              </div>
              <div className="text-[11px] font-medium text-muted-foreground">
                Password strength: <span className="font-bold text-foreground">{strength.label}</span>
              </div>
            </div>
          )}
        </div>
        <div>
          <label className="mb-1.5 block text-[12.5px] font-bold tracking-[-0.01em]">{t("auth.confirmPassword")}</label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-muted-foreground" />
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className={inputCls}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              required
              disabled={loading}
            />
            {formData.confirmPassword && passwordsMatch && (
              <CheckCircle2 className="absolute right-3.5 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-[#10B981]" />
            )}
          </div>
          {!passwordsMatch && (
            <div className="mt-1 text-[11px] font-medium text-[#DC2626]">Passwords do not match.</div>
          )}
        </div>
        <div>
          <label className="mb-1.5 block text-[12.5px] font-bold tracking-[-0.01em]">{t("auth.location")}</label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-muted-foreground" />
            <input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className={inputCls}
              placeholder="Your location (optional)"
              autoComplete="address-level2"
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

        <Button type="submit" isLoading={loading} className="h-[48px] w-full gap-2 rounded-full text-[15px]">
          {!loading && <UserPlus className="h-4 w-4" />}
          {loading ? t("common.loading") : t("auth.createAccount")}
        </Button>
      </form>

      <p className="mt-6 text-center text-[13px] font-medium text-muted-foreground">
        {t("auth.hasAccount")}{" "}
        <Link href="/auth/signin" className="font-bold text-[#2563EB] hover:underline dark:text-[#7FA8FF]">
          {t("auth.signIn")}
        </Link>
      </p>
    </AuthShell>
  );
}

export default function SignUp() {
  return (
    <Suspense fallback={null}>
      <SignUpInner />
    </Suspense>
  );
}
