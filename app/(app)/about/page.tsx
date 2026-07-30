"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  BrainCircuit,
  Cloud,
  Code2,
  Container,
  Cpu,
  Database,
  FileText,
  Globe2,
  Layers3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const features = [
  {
    icon: BriefcaseBusiness,
    emoji: "💼",
    title: "Smart Job Matching",
    description: "Find jobs tailored to your skills.",
    accent: "blue",
  },
  {
    icon: FileText,
    emoji: "📄",
    title: "Resume Analysis",
    description: "ATS Score, Resume Score and improvement suggestions.",
    accent: "emerald",
    bullets: ["ATS Score", "Resume Score", "Improvement suggestions"],
  },
  {
    icon: Bot,
    emoji: "🤖",
    title: "Liberty AI",
    description: "AI career assistant for career guidance.",
    accent: "purple",
  },
  {
    icon: TrendingUp,
    emoji: "📈",
    title: "Career Roadmap",
    description: "Personalized roadmap from beginner to expert.",
    accent: "sky",
  },
  {
    icon: Target,
    emoji: "🎯",
    title: "Skill Gap Analysis",
    description: "Identify missing skills for target roles.",
    accent: "amber",
  },
  {
    icon: Globe2,
    emoji: "🌍",
    title: "Global + Nigerian Opportunities",
    description: "Discover local and international opportunities.",
    accent: "teal",
  },
] as const;

const techStack = [
  { name: "Next.js", icon: Layers3, tint: "from-[#111827] to-[#334155]" },
  { name: "React", icon: Code2, tint: "from-[#0EA5E9] to-[#2563EB]" },
  { name: "FastAPI", icon: Server, tint: "from-[#059669] to-[#10B981]" },
  { name: "PostgreSQL", icon: Database, tint: "from-[#2563EB] to-[#0EA5E9]" },
  { name: "Gemini AI", icon: Sparkles, tint: "from-[#7C3AED] to-[#2563EB]" },
  { name: "Groq AI", icon: BrainCircuit, tint: "from-[#F59E0B] to-[#EF4444]" },
  { name: "Docker", icon: Container, tint: "from-[#0284C7] to-[#0EA5E9]" },
  { name: "Vercel", icon: Cloud, tint: "from-[#111827] to-[#64748B]" },
  { name: "Render", icon: Cpu, tint: "from-[#7C3AED] to-[#14B8A6]" },
] as const;

const developerBadges = [
  { label: "Full Stack Developer", icon: Code2, emoji: "💻", variant: "default" as const },
  { label: "AI Engineer", icon: BrainCircuit, emoji: "🤖", variant: "indigo" as const },
  { label: "3MTT NextGen Fellow", icon: Rocket, emoji: "🚀", variant: "emerald" as const },
  { label: "Kaduna, Nigeria", icon: MapPin, emoji: "🇳🇬", variant: "amber" as const },
];

const developerLinks = [
  { label: "GitHub", href: "#", icon: Code2 },
  { label: "LinkedIn", href: "#", icon: BriefcaseBusiness },
  { label: "Portfolio", href: "#", icon: Globe2 },
  { label: "Email", href: "mailto:hello@jobliberty.ai", icon: Mail },
] as const;

type Accent = (typeof features)[number]["accent"];

const accentClasses: Record<Accent, { card: string; icon: string; glow: string }> = {
  blue: {
    card: "tint-blue",
    icon: "from-[#2563EB] to-[#4F46E5]",
    glow: "group-hover:shadow-[0_18px_36px_-18px_rgba(37,99,235,0.8)]",
  },
  emerald: {
    card: "tint-emerald",
    icon: "from-[#059669] to-[#10B981]",
    glow: "group-hover:shadow-[0_18px_36px_-18px_rgba(16,185,129,0.8)]",
  },
  purple: {
    card: "tint-purple",
    icon: "from-[#7C3AED] to-[#2563EB]",
    glow: "group-hover:shadow-[0_18px_36px_-18px_rgba(124,58,237,0.8)]",
  },
  sky: {
    card: "tint-sky",
    icon: "from-[#0284C7] to-[#0EA5E9]",
    glow: "group-hover:shadow-[0_18px_36px_-18px_rgba(14,165,233,0.8)]",
  },
  amber: {
    card: "tint-amber",
    icon: "from-[#D97706] to-[#F59E0B]",
    glow: "group-hover:shadow-[0_18px_36px_-18px_rgba(245,158,11,0.75)]",
  },
  teal: {
    card: "tint-teal",
    icon: "from-[#0F766E] to-[#14B8A6]",
    glow: "group-hover:shadow-[0_18px_36px_-18px_rgba(20,184,166,0.75)]",
  },
};

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <motion.div variants={fadeUp} className="mx-auto mb-5 max-w-3xl text-center sm:mb-7">
      {eyebrow && (
        <Badge variant="ai" className="mb-3 shadow-[0_10px_22px_-14px_rgba(124,58,237,0.9)]">
          {eyebrow}
        </Badge>
      )}
      <h2 className="text-[26px] font-extrabold leading-tight tracking-[-0.04em] text-foreground sm:text-[34px]">
        {title}
      </h2>
      {subtitle && <p className="mt-2 text-[14px] font-medium leading-7 text-muted-foreground sm:text-[15px]">{subtitle}</p>}
    </motion.div>
  );
}

function LogoMark({ large = false }: { large?: boolean }) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-[22px] bg-gradient-to-br from-[#2563EB] via-[#4F46E5] to-[#7C3AED] shadow-[0_22px_52px_-22px_rgba(79,70,229,0.95)] ring-1 ring-white/25",
        large ? "h-20 w-20 sm:h-24 sm:w-24" : "h-12 w-12"
      )}
    >
      <img src="/logo-icon.png" alt="JobLiberty" className={cn("object-cover", large ? "h-full w-full" : "h-full w-full")} />
      <span className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/15 text-[18px] shadow-lg backdrop-blur-md">
        🚀
      </span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-7 pb-2">
      <motion.header variants={fadeUp} className="relative overflow-hidden rounded-[24px] border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur-xl sm:p-8">
        <div className="pointer-events-none absolute inset-0 gradient-mesh opacity-[0.16] dark:opacity-[0.18]" />
        <div className="pointer-events-none absolute inset-0 dot-pattern opacity-[0.08]" />
        <div className="relative max-w-4xl">
          <Badge variant="ai" className="mb-4">
            About JobLiberty
          </Badge>
          <h1 className="text-[32px] font-extrabold leading-[1.05] tracking-[-0.05em] text-foreground sm:text-[44px] lg:text-[54px]">
            About <span className="text-gradient-primary">JobLiberty</span>
          </h1>
          <p className="mt-3 max-w-2xl text-[16px] font-semibold leading-8 text-muted-foreground sm:text-[18px]">
            Empowering Careers with Artificial Intelligence.
          </p>
        </div>
      </motion.header>

      <motion.section
        variants={fadeUp}
        className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(120deg,#1D4ED8_0%,#2563EB_42%,#4F46E5_68%,#7C3AED_100%)] p-6 text-white shadow-[0_24px_60px_-24px_rgba(37,99,235,0.85)] sm:p-8 lg:p-10"
      >
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute inset-0 opacity-45"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
              backgroundSize: "38px 38px",
            }}
            animate={{ backgroundPosition: ["0px 0px", "38px 38px"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[#60A5FA]/30 blur-3xl"
            animate={{ y: [0, 18, 0], x: [0, 12, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-16 top-10 h-64 w-64 rounded-full bg-[#C084FC]/30 blur-3xl"
            animate={{ y: [0, -16, 0], x: [0, -12, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-90px] left-[45%] h-72 w-72 rounded-full bg-[#10B981]/20 blur-3xl"
            animate={{ y: [0, -22, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl">
            <motion.div
              initial={{ scale: 0.85, rotate: -8, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.16 }}
            >
              <LogoMark large />
            </motion.div>
            <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-white/85 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-[#BFDBFE]" /> AI Career Platform
            </div>
            <h2 className="mt-4 text-[42px] font-extrabold leading-none tracking-[-0.06em] sm:text-[62px] lg:text-[72px]">
              JobLiberty
            </h2>
            <p className="mt-5 max-w-3xl text-[15px] font-medium leading-8 text-white/82 sm:text-[17px]">
              AI-powered career platform helping students, graduates and professionals discover opportunities, improve resumes, analyze ATS performance, identify skill gaps and build successful careers.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full bg-white text-[#1D4ED8] shadow-xl shadow-black/10 hover:bg-white/90 hover:text-[#1E40AF]">
                <Link href="/jobs">
                  Explore Jobs <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white">
                <Link href="/chat">
                  <MessageCircle className="h-4 w-4" /> Chat with Liberty AI
                </Link>
              </Button>
            </div>
          </div>

          <motion.div
            variants={stagger}
            className="grid gap-3 rounded-[24px] border border-white/18 bg-white/[0.10] p-4 shadow-2xl shadow-black/10 backdrop-blur-xl sm:grid-cols-2"
          >
            {[
              { label: "Resume Score", value: "94%", icon: FileText },
              { label: "ATS Signals", value: "Live", icon: ShieldCheck },
              { label: "Skill Gaps", value: "Mapped", icon: Target },
              { label: "AI Coach", value: "24/7", icon: Bot },
            ].map((item) => (
              <motion.div key={item.label} variants={fadeUp} className="rounded-[18px] border border-white/15 bg-white/[0.11] p-4 backdrop-blur-md transition-colors hover:bg-white/[0.16]">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[14px] bg-white/15 ring-1 ring-white/20">
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-[26px] font-extrabold leading-none tracking-[-0.04em]">{item.value}</div>
                <div className="mt-1 text-[12px] font-bold uppercase tracking-[0.08em] text-white/65">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section variants={stagger} className="grid gap-5 lg:grid-cols-12">
        <motion.div variants={fadeUp} className="relative overflow-hidden rounded-[24px] border bg-card p-6 shadow-sm lg:col-span-7 sm:p-7">
          <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#10B981]" />
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#2563EB]/10 blur-3xl" />
          <div className="relative">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-gradient-to-br from-[#2563EB] to-[#7C3AED] text-white shadow-[0_14px_28px_-16px_rgba(37,99,235,0.9)]">
                <Rocket className="h-6 w-6" />
              </div>
              <h2 className="text-[26px] font-extrabold tracking-[-0.04em]">Our Mission</h2>
            </div>
            <div className="space-y-4 text-[15px] font-medium leading-8 text-muted-foreground">
              <p>Our mission is to make career growth smarter, faster and more accessible through Artificial Intelligence.</p>
              <p>
                JobLiberty empowers job seekers with intelligent job matching, resume optimization, AI career coaching, personalized learning roadmaps and real-world career insights.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="relative overflow-hidden rounded-[24px] border bg-gradient-to-br from-[#101A31] via-[#111E3A] to-[#1C1440] p-6 text-white shadow-[0_20px_48px_-22px_rgba(124,58,237,0.65)] lg:col-span-5 sm:p-7">
          <div className="pointer-events-none absolute inset-0 dot-pattern opacity-[0.12]" />
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#7C3AED]/28 blur-3xl" />
          <div className="relative">
            <Badge className="mb-5 border-white/15 bg-white/10 text-white hover:bg-white/15">Career intelligence</Badge>
            <h3 className="text-[30px] font-extrabold leading-tight tracking-[-0.045em]">Built for modern job seekers.</h3>
            <p className="mt-3 text-[14px] font-medium leading-7 text-white/70">
              From resume readiness to opportunity discovery, JobLiberty brings AI guidance into every step of the career journey.
            </p>
          </div>
        </motion.div>
      </motion.section>

      <motion.section variants={stagger} className="space-y-5">
        <SectionHeading eyebrow="Platform Features" title="Everything you need to grow with confidence" />
        <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            const accent = accentClasses[feature.accent];
            return (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                whileHover={{ y: -7, scale: 1.015 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className={cn("group relative overflow-hidden rounded-[22px] border p-5 shadow-sm transition-shadow duration-300", accent.card, accent.glow)}
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/35 blur-2xl dark:bg-white/[0.04]" />
                <div className="relative">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div className={cn("flex h-12 w-12 items-center justify-center rounded-[16px] bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6", accent.icon)}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-2xl" aria-hidden="true">
                      {feature.emoji}
                    </span>
                  </div>
                  <h3 className="text-[17px] font-extrabold tracking-[-0.025em] text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-[13.5px] font-medium leading-6 text-muted-foreground">{feature.description}</p>
                  {"bullets" in feature && feature.bullets && (
                    <div className="mt-4 space-y-2">
                      {feature.bullets.map((bullet) => (
                        <div key={bullet} className="flex items-center gap-2 text-[12.5px] font-bold text-foreground/75">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                          {bullet}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      <motion.section variants={stagger} className="space-y-5">
        <SectionHeading eyebrow="Technology" title="Modern AI-native stack" subtitle="Built with scalable, reliable technologies for a premium SaaS experience." />
        <motion.div variants={stagger} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {techStack.map((technology) => {
            const Icon = technology.icon;
            return (
              <motion.div
                key={technology.name}
                variants={fadeUp}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative overflow-hidden rounded-[20px] border bg-card p-4 shadow-sm transition-all duration-300 hover:border-[#2563EB]/35 hover:shadow-xl"
              >
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#10B981] opacity-70" />
                <div className="flex items-center gap-3">
                  <div className={cn("flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3", technology.tint)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-[14px] font-extrabold tracking-[-0.02em]">{technology.name}</div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground">Production</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      <motion.section id="developer" variants={fadeUp} className="relative overflow-hidden rounded-[28px] border bg-card p-6 shadow-sm sm:p-8">
        <div className="pointer-events-none absolute inset-0 gradient-mesh opacity-[0.18] dark:opacity-[0.16]" />
        <div className="pointer-events-none absolute inset-0 dot-pattern opacity-[0.07]" />
        <div className="absolute -right-24 -top-20 h-72 w-72 rounded-full bg-[#7C3AED]/12 blur-3xl" />
        <div className="relative grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="relative mx-auto w-full max-w-sm">
            <motion.div
              whileHover={{ scale: 1.03, rotate: -1 }}
              className="relative overflow-hidden rounded-[26px] border border-border/70 bg-gradient-to-br from-[#2563EB] via-[#4F46E5] to-[#7C3AED] p-8 text-white shadow-[0_24px_58px_-26px_rgba(79,70,229,0.9)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(at_25%_0%,rgba(255,255,255,0.26),transparent_45%)]" />
              <div className="absolute inset-0 dot-pattern opacity-[0.14]" />
              <div className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-full border border-white/20 bg-white/15 text-[54px] font-extrabold tracking-[-0.08em] shadow-2xl backdrop-blur-md">
                AA
                <span className="absolute bottom-3 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#10B981] text-[16px] ring-4 ring-[#4F46E5]">✓</span>
              </div>
              <div className="relative mt-6 text-center">
                <div className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-white/65">Avatar Placeholder</div>
                <div className="mt-1 text-[20px] font-extrabold tracking-[-0.035em]">Founder Profile</div>
              </div>
            </motion.div>
          </div>

          <div>
            <Badge variant="ai" className="mb-4">Meet the Developer</Badge>
            <h2 className="text-[30px] font-extrabold leading-tight tracking-[-0.05em] sm:text-[42px]">Abdulwahab Abdulyekeen</h2>
            <p className="mt-1 text-[15px] font-extrabold text-[#2563EB] dark:text-[#93C5FD]">Founder &amp; Full Stack AI Developer</p>
            <p className="mt-4 max-w-3xl text-[14.5px] font-medium leading-8 text-muted-foreground sm:text-[15px]">
              Abdulwahab Abdulyekeen is passionate about building AI-powered products that help students and professionals discover better career opportunities. JobLiberty reflects his vision of making career development smarter, more personalized and accessible to everyone.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {developerBadges.map((badge) => (
                <Badge key={badge.label} variant={badge.variant} className="gap-1.5 py-1.5">
                  <span aria-hidden="true">{badge.emoji}</span>
                  {badge.label}
                </Badge>
              ))}
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {developerLinks.map((link) => {
                const Icon = link.icon;
                const isEmail = link.href.startsWith("mailto:");
                const className = "group inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-card px-4 text-[13px] font-bold text-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/40 hover:bg-[#2563EB]/10 hover:text-[#2563EB] dark:hover:text-[#93C5FD]";
                if (isEmail) {
                  return (
                    <a key={link.label} href={link.href} className={className}>
                      <Icon className="h-4 w-4" /> {link.label}
                    </a>
                  );
                }
                return (
                  <Link key={link.label} href={link.href} className={className}>
                    <Icon className="h-4 w-4" /> {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section variants={stagger} className="grid gap-5 lg:grid-cols-12">
        <motion.div variants={fadeUp} className="relative overflow-hidden rounded-[24px] border bg-card p-6 shadow-sm lg:col-span-7 sm:p-7">
          <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#7C3AED] to-[#2563EB]" />
          <div className="relative">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-gradient-to-br from-[#7C3AED] to-[#2563EB] text-white shadow-[0_14px_28px_-16px_rgba(124,58,237,0.9)]">
                <Zap className="h-6 w-6" />
              </div>
              <h2 className="text-[26px] font-extrabold tracking-[-0.04em]">Our Vision</h2>
            </div>
            <p className="text-[15px] font-medium leading-8 text-muted-foreground">
              To become Africa&apos;s leading AI-powered career platform by helping millions of people discover opportunities, improve employability and achieve career freedom.
            </p>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="relative overflow-hidden rounded-[24px] border bg-[linear-gradient(135deg,#2563EB_0%,#4F46E5_50%,#7C3AED_100%)] p-7 text-center text-white shadow-[0_20px_48px_-24px_rgba(37,99,235,0.8)] lg:col-span-5">
          <div className="absolute inset-0 bg-[radial-gradient(at_50%_-20%,rgba(255,255,255,0.25),transparent_50%)]" />
          <div className="relative flex h-full min-h-[210px] flex-col items-center justify-center">
            <Sparkles className="mb-5 h-9 w-9 text-[#BFDBFE]" />
            <blockquote className="text-[25px] font-extrabold leading-tight tracking-[-0.045em] sm:text-[31px]">
              &ldquo;Empowering careers through Artificial Intelligence.&rdquo;
            </blockquote>
          </div>
        </motion.div>
      </motion.section>

      {/* Contact Section */}
      <motion.section id="contact" variants={fadeUp} className="relative overflow-hidden rounded-[28px] border bg-card p-6 shadow-sm sm:p-8">
        <div className="pointer-events-none absolute inset-0 gradient-mesh opacity-[0.14] dark:opacity-[0.12]" />
        <div className="pointer-events-none absolute inset-0 dot-pattern opacity-[0.06]" />
        <div className="relative">
          <SectionHeading
            eyebrow="Reach Out"
            title="Get in Touch"
            subtitle="Have questions, feedback, or collaboration ideas? We'd love to hear from you."
          />

          <div className="mx-auto mt-2 max-w-2xl">
            <div className="rounded-[22px] border bg-background/60 p-6 shadow-sm backdrop-blur-sm sm:p-8">
              <div className="space-y-5 text-[15px] font-medium">
                <a
                  href="mailto:abdulwahababdulyekeen1@gmail.com"
                  className="group flex items-center gap-4 rounded-[16px] border border-border/60 bg-card px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-[#2563EB]/40 hover:bg-[#2563EB]/5 hover:shadow-sm active:scale-[0.985]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#2563EB] to-[#4F46E5] text-white shadow-sm">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-bold uppercase tracking-[0.08em] text-muted-foreground">Email</div>
                    <div className="truncate font-semibold text-foreground group-hover:text-[#2563EB] dark:group-hover:text-[#93C5FD]">
                      abdulwahababdulyekeen1@gmail.com
                    </div>
                  </div>
                </a>

                <a
                  href="tel:09044115526"
                  className="group flex items-center gap-4 rounded-[16px] border border-border/60 bg-card px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-[#2563EB]/40 hover:bg-[#2563EB]/5 hover:shadow-sm active:scale-[0.985]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#10B981] to-[#059669] text-white shadow-sm">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-bold uppercase tracking-[0.08em] text-muted-foreground">Phone</div>
                    <div className="font-semibold text-foreground group-hover:text-[#2563EB] dark:group-hover:text-[#93C5FD]">
                      09044115526
                    </div>
                  </div>
                </a>

                <div className="group flex items-center gap-4 rounded-[16px] border border-border/60 bg-card px-5 py-4 transition-all">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] text-white shadow-sm">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-bold uppercase tracking-[0.08em] text-muted-foreground">Name</div>
                    <div className="font-semibold text-foreground">Abdulwahab Abdulyekeen</div>
                  </div>
                </div>
              </div>

              <p className="mt-7 text-center text-[13.5px] font-medium leading-7 text-muted-foreground">
                Feel free to reach out if you&apos;d like to collaborate, provide feedback, or discuss opportunities related to JobLiberty.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
