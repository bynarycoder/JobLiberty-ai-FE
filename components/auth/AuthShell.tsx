"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Star, TrendingUp, Globe, ShieldCheck } from "lucide-react";

/**
 * Branded split-screen shell for all auth pages.
 * Left: aurora gradient brand panel. Right: glass form card.
 */
export function AuthShell({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="app-shell flex min-h-screen">
      {/* ── Brand panel ── */}
      <div className="relative hidden w-[46%] overflow-hidden lg:flex">
        <div className="absolute inset-0 bg-[linear-gradient(150deg,#5B21B6_0%,#4F46E5_42%,#2563EB_78%,#0EA5E9_100%)]" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(at_20%_10%,rgba(255,255,255,0.18),transparent_50%)]" />
          <div className="absolute -bottom-40 -left-24 h-[420px] w-[420px] rounded-full bg-[#10B981]/25 blur-3xl" />
          <div className="absolute -right-20 top-1/3 h-[300px] w-[300px] animate-float-slow rounded-full bg-white/10 blur-2xl" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-white/15 shadow-lg ring-1 ring-white/25 backdrop-blur-md">
              <span className="text-[18px] font-extrabold tracking-[-0.05em] text-white">JL</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[18px] font-bold tracking-[-0.02em] text-white">JobLiberty</span>
                <span className="rounded-full bg-white/20 px-1.5 py-px text-[9px] font-extrabold text-white backdrop-blur-sm">AI</span>
              </div>
              <div className="text-[11px] font-medium text-white/70">Empowering careers with AI</div>
            </div>
          </Link>

          <div className="max-w-[470px]">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <h2 className="text-[38px] font-extrabold leading-[1.05] tracking-[-0.03em] text-white xl:text-[44px]">
                Your career,
                <br />
                <span className="bg-gradient-to-r from-[#FCD34D] via-white to-[#A5F3FC] bg-clip-text text-transparent">supercharged by AI.</span>
              </h2>
              <p className="mt-4 text-[15px] font-medium leading-[1.7] text-white/80">
                Resume analysis, ATS scoring, smart job matching and a multilingual AI mentor — built for African talent, free for 3MTT fellows.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 rounded-[20px] bg-white/10 p-5 ring-1 ring-white/20 backdrop-blur-md"
            >
              <div className="mb-2 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#FCD34D] text-[#FCD34D]" />
                ))}
              </div>
              <p className="text-[14px] font-medium leading-[1.65] text-white/90">
                “JobLiberty showed me exactly which skills to add. I went from 63% to 91% match — and landed a fintech role in six weeks.”
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#F59E0B] to-[#EF4444] text-[12px] font-bold text-white shadow">FI</div>
                <div>
                  <div className="text-[13px] font-bold text-white">Fatima Ibrahim</div>
                  <div className="text-[11px] font-medium text-white/65">Data Analyst • Kano</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-[12px] font-semibold text-white/75">
            <span className="flex items-center gap-1.5"><TrendingUp className="h-4 w-4 text-[#34D399]" /> 87% success rate</span>
            <span className="flex items-center gap-1.5"><Globe className="h-4 w-4 text-[#7DD3FC]" /> 4 languages</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#FCD34D]" /> Private by design</span>
          </div>
        </div>
      </div>

      {/* ── Form panel ── */}
      <div className="app-content flex flex-1 items-center justify-center overflow-y-auto px-4 py-10 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }} className="w-full max-w-[440px]">
          {/* Mobile logo */}
          <div className="mb-7 flex justify-center lg:hidden">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-gradient-to-br from-[#7C3AED] via-[#4F46E5] to-[#2563EB] shadow-[0_8px_18px_-4px_rgba(79,70,229,0.5)]">
                <span className="text-[16px] font-extrabold tracking-[-0.05em] text-white">JL</span>
              </div>
              <span className="text-[22px] font-bold tracking-tight">JobLiberty</span>
            </Link>
          </div>

          <div className="glass-strong gradient-border rounded-[26px] p-7 sm:p-8">
            <div className="mb-7">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#F0EAFE] px-2.5 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-[#7C3AED] ring-1 ring-[#7C3AED]/20 dark:bg-[#7C3AED]/15 dark:text-[#B691FF]">
                <Sparkles className="h-3 w-3" /> AI Powered
              </div>
              <h1 className="text-[26px] font-extrabold leading-[1.1] tracking-[-0.03em]">{title}</h1>
              <p className="mt-1.5 text-[13.5px] font-medium text-muted-foreground">{subtitle}</p>
            </div>
            {children}
          </div>

          <p className="mt-5 text-center text-[11.5px] font-medium text-muted-foreground">
            Protected by end-to-end encryption • 3MTT NextGen 2026
          </p>
        </motion.div>
      </div>
    </div>
  );
}
