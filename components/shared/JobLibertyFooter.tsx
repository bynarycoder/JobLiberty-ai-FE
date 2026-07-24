"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Heart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const footerNavigation: { label: string; href: string; external?: boolean }[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Jobs", href: "/jobs" },
  { label: "Resume", href: "/resume" },
  { label: "Opportunity Hub", href: "/opportunity-hub" },
  { label: "Liberty AI", href: "/chat" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "mailto:hello@jobliberty.ai", external: true },
];

const technologies = ["Next.js", "FastAPI", "Gemini AI", "Groq AI", "Docker"];

interface JobLibertyFooterProps {
  className?: string;
  compact?: boolean;
}

export function JobLibertyFooter({ className, compact = false }: JobLibertyFooterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative overflow-hidden rounded-[24px] border border-border/70 bg-card/75 shadow-[0_18px_44px_-24px_rgba(37,99,235,0.45)] backdrop-blur-xl",
        compact ? "p-5 sm:p-6" : "p-6 sm:p-8",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#60A5FA]/60 to-transparent" />
        <div className="absolute -left-24 -top-28 h-56 w-56 rounded-full bg-[#2563EB]/15 blur-3xl" />
        <div className="absolute -right-20 top-8 h-48 w-48 rounded-full bg-[#7C3AED]/14 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-32 w-72 -translate-x-1/2 rounded-full bg-[#10B981]/8 blur-3xl" />
        <div className="dot-pattern absolute inset-0 opacity-[0.08] dark:opacity-[0.12]" />
      </div>

      <div className="relative grid gap-8 lg:grid-cols-[1.15fr_1fr_0.9fr]">
        <div className="max-w-sm">
          <Link href="/dashboard" className="group inline-flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-[14px] overflow-hidden shadow-[0_10px_24px_-10px_rgba(79,70,229,0.9)] transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
              <img src="/logo-icon.png" alt="JobLiberty" className="h-11 w-11" />
              <span className="absolute -right-1 -top-1 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#10B981] ring-2 ring-card" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[20px] font-extrabold tracking-[-0.035em] text-foreground">JobLiberty</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/10 px-2 py-0.5 text-[10px] font-extrabold tracking-[0.08em] text-[#2563EB] dark:text-[#93C5FD]">
                  <Sparkles className="h-3 w-3" /> AI
                </span>
              </div>
              <p className="text-[13px] font-semibold text-muted-foreground">Empowering Careers with AI</p>
            </div>
          </Link>
          <p className="mt-4 text-[13.5px] leading-7 text-muted-foreground">
            Premium AI career intelligence for job matching, resume optimization, ATS insights and personalized growth.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-[12px] font-extrabold uppercase tracking-[0.12em] text-foreground/80">Navigation</h3>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {footerNavigation.map((item) => {
              const className = "group inline-flex w-fit items-center gap-1.5 text-[13.5px] font-semibold text-muted-foreground transition-colors hover:text-[#2563EB] dark:hover:text-[#93C5FD]";
              if (item.external) {
                return (
                  <a key={item.label} href={item.href} className={className}>
                    {item.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                );
              }

              return (
                <Link key={item.label} href={item.href} className={className}>
                  {item.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-[12px] font-extrabold uppercase tracking-[0.12em] text-foreground/80">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-border/70 bg-card-muted/70 px-3 py-1.5 text-[12px] font-bold text-muted-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7C3AED]/35 hover:bg-[#7C3AED]/10 hover:text-[#7C3AED] dark:hover:text-[#C4B5FD]"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-8 border-t border-border/70 pt-5">
        <div className="flex flex-col items-center justify-between gap-3 text-center text-[12.5px] font-semibold text-muted-foreground sm:flex-row sm:text-left">
          <span className="inline-flex flex-wrap items-center justify-center gap-1.5">
            Crafted with <Heart className="h-3.5 w-3.5 fill-[#EF4444] text-[#EF4444]" /> by{" "}
            <a
              href="https://github.com/bynarycoder"
              target="_blank"
              rel="noreferrer"
              className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text font-extrabold text-transparent transition-opacity hover:opacity-80"
            >
              Abdulwahab Abdulyekeen
            </a>
          </span>
          <span>© 2026 JobLiberty. All rights reserved.</span>
        </div>
      </div>
    </motion.div>
  );
}
