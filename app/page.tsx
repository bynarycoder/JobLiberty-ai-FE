"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { useI18n } from '@/providers/I18nProvider';
import { 
  Upload, Target, Users, TrendingUp, Star, ArrowRight, 
  CheckCircle, BookOpen, Award 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const { t } = useI18n();

  const features = [
    { icon: Upload, title: t('landing.features.resumeAnalysis.title'), desc: t('landing.features.resumeAnalysis.desc') },
    { icon: Target, title: t('landing.features.jobMatching.title'), desc: t('landing.features.jobMatching.desc') },
    { icon: TrendingUp, title: t('landing.features.skillGap.title'), desc: t('landing.features.skillGap.desc') },
    { icon: BookOpen, title: t('landing.features.interviewPrep.title'), desc: t('landing.features.interviewPrep.desc') },
    { icon: Award, title: t('landing.features.careerRoadmap.title'), desc: t('landing.features.careerRoadmap.desc') },
    { icon: Star, title: t('landing.features.opportunityMode.title'), desc: t('landing.features.opportunityMode.desc') },
  ];

  const steps = [
    { num: "01", title: t('landing.howItWorks.step1.title'), desc: t('landing.howItWorks.step1.desc') },
    { num: "02", title: t('landing.howItWorks.step2.title'), desc: t('landing.howItWorks.step2.desc') },
    { num: "03", title: t('landing.howItWorks.step3.title'), desc: t('landing.howItWorks.step3.desc') },
    { num: "04", title: t('landing.howItWorks.step4.title'), desc: t('landing.howItWorks.step4.desc') },
  ];

  const testimonials = [
    { quote: t('landing.testimonials.t1.quote'), name: t('landing.testimonials.t1.name'), role: t('landing.testimonials.t1.role') },
    { quote: t('landing.testimonials.t2.quote'), name: t('landing.testimonials.t2.name'), role: t('landing.testimonials.t2.role') },
    { quote: t('landing.testimonials.t3.quote'), name: t('landing.testimonials.t3.name'), role: t('landing.testimonials.t3.role') },
  ];

  const faqs = [
    { q: t('landing.faq.q1'), a: t('landing.faq.a1') },
    { q: t('landing.faq.q2'), a: t('landing.faq.a2') },
    { q: t('landing.faq.q3'), a: t('landing.faq.a3') },
    { q: t('landing.faq.q4'), a: t('landing.faq.a4') },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />

      {/* HERO */}
      <div className="relative pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-zinc-50 dark:bg-zinc-900 text-xs tracking-[1.5px] font-medium mb-6">
            3MTT NEXTGEN SHOWCASE • 2026
          </div>

          <h1 className="text-6xl md:text-7xl font-semibold tracking-tighter leading-[0.96] mb-6">
            {t('landing.heroTitle')}
          </h1>
          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-10">
            {t('landing.heroSubtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/upload">
              <Button size="lg" className="btn-primary px-9 h-14 text-base gap-2">
                {t('landing.ctaPrimary')} <Upload className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="px-9 h-14 text-base">
                {t('landing.ctaSecondary')}
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-10 mt-16 text-sm">
            <div><span className="font-semibold text-xl tracking-tight">{t('landing.stats.users')}</span><div className="text-zinc-500">Job Seekers</div></div>
            <div><span className="font-semibold text-xl tracking-tight">{t('landing.stats.jobsMatched')}</span><div className="text-zinc-500">Matches Made</div></div>
            <div><span className="font-semibold text-xl tracking-tight">{t('landing.stats.successRate')}</span><div className="text-zinc-500">Success Rate</div></div>
          </div>
        </div>
      </div>

      {/* TRUST BAR */}
      <div className="border-t border-b py-4 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-center gap-x-14 gap-y-2 flex-wrap text-xs tracking-[1px] text-zinc-500 font-medium">
          <div>PAYSTACK</div><div>FLUTTERWAVE</div><div>KUDA</div><div>ANDELA</div><div>TECHNOLOGY</div>
        </div>
      </div>

      {/* FEATURES */}
      <div id="features" className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center mb-14">
          <div className="uppercase tracking-[3px] text-xs font-medium text-blue-600 mb-3">POWERED BY AI</div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter">{t('landing.features.title')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="group card p-7 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-zinc-800 flex items-center justify-center mb-6 group-hover:bg-blue-100 dark:group-hover:bg-zinc-700 transition-colors">
                <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-[15px]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div id="how" className="bg-zinc-50 dark:bg-zinc-900 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter">{t('landing.howItWorks.title')}</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col">
                <div className="text-6xl font-semibold tracking-tighter text-zinc-200 dark:text-zinc-800 mb-3">{step.num}</div>
                <div className="font-semibold text-xl tracking-tight mb-3">{step.title}</div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold tracking-tighter">{t('landing.testimonials.title')}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((tstm, idx) => (
            <div key={idx} className="card p-8">
              <div className="flex mb-6">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <blockquote className="text-[15px] leading-relaxed mb-8 text-zinc-700 dark:text-zinc-300">“{tstm.quote}”</blockquote>
              <div>
                <div className="font-medium">{tstm.name}</div>
                <div className="text-sm text-zinc-500">{tstm.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "47k+", label: "Users across Africa" },
            { value: "192k", label: "Successful Matches" },
            { value: "4", label: "Languages Supported" },
            { value: "87%", label: "User Satisfaction" },
          ].map((stat, idx) => (
            <div key={idx} className="p-4">
              <div className="text-5xl font-semibold tracking-tighter mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div id="faq" className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-center text-4xl font-semibold tracking-tighter mb-12">{t('landing.faq.title')}</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="card border p-6">
              <div className="font-semibold mb-1.5 tracking-tight">{faq.q}</div>
              <p className="text-[15px] text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="max-w-4xl mx-auto px-6 pb-24 text-center">
        <div className="card border p-12 md:p-16">
          <h2 className="text-4xl tracking-tighter font-semibold mb-3">{t('landing.cta.title')}</h2>
          <p className="text-xl text-muted-foreground mb-8">{t('landing.cta.subtitle')}</p>
          <Link href="/upload">
            <Button size="lg" className="btn-primary h-14 px-10 text-base">{t('landing.cta.button')}</Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
