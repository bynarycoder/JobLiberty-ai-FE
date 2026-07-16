"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AuthShell } from "@/components/auth/AuthShell";
import { useI18n } from "@/providers/I18nProvider";
import { toast } from "sonner";
import { Mail, Send, CheckCircle2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const { t } = useI18n();
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Reset link sent to your email.");
  };

  return (
    <AuthShell title={t("auth.forgotPassword")} subtitle={t("auth.resetInstructions")}>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-[12.5px] font-bold tracking-[-0.01em]">{t("auth.email")}</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-[46px] w-full rounded-[13px] border border-border bg-card/80 pl-11 pr-4 text-[14px] font-[450] tracking-[-0.01em] text-foreground shadow-sm transition-all placeholder:text-muted-foreground/70 hover:border-border-strong focus:border-[#2563EB]/50 focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10"
              />
            </div>
          </div>
          <Button type="submit" className="h-[48px] w-full gap-2 rounded-full text-[15px]">
            <Send className="h-4 w-4" /> Send Reset Link
          </Button>
        </form>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="py-4 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[20px] bg-gradient-to-br from-[#10B981] to-[#059669] shadow-[0_12px_24px_-8px_rgba(16,185,129,0.6)]">
            <CheckCircle2 className="h-8 w-8 text-white" />
          </div>
          <div className="text-[16px] font-bold tracking-[-0.01em]">Check your inbox</div>
          <p className="mx-auto mt-1 max-w-[32ch] text-[13px] leading-[1.6] text-muted-foreground">
            We sent reset instructions to <span className="font-bold text-foreground">{email}</span>
          </p>
        </motion.div>
      )}

      <Link href="/auth/signin" className="mt-6 flex items-center justify-center gap-1.5 text-[13px] font-bold text-[#2563EB] transition-colors hover:text-[#1D4ED8] dark:text-[#7FA8FF]">
        <ArrowLeft className="h-4 w-4" /> {t("auth.backToSignIn")}
      </Link>
    </AuthShell>
  );
}
