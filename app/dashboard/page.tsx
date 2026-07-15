"use client";

import React from 'react';
import { useI18n } from '@/providers/I18nProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/services/api';
import { 
  TrendingUp, Target, FileText, Users, ArrowRight, 
  Award, Clock 
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Dashboard() {
  const { t } = useI18n();

  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => api.fetchDashboardStats(),
  });

  const { data: jobs } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => api.fetchJobMatches(),
  });

  const { data: roadmap } = useQuery({
    queryKey: ['roadmap'],
    queryFn: () => api.fetchCareerRoadmap(),
  });

  const { data: recent } = useQuery({
    queryKey: ['recent-activity'],
    queryFn: () => api.fetchRecentActivity(),
  });

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{t('dashboard.welcome')}, Chinedu 👋</h1>
        <p className="text-muted-foreground mt-1">{t('dashboard.subtitle')}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: t('dashboard.stats.resumeScore'), value: stats?.resumeScore ?? 82, icon: FileText, suffix: "%" },
          { label: t('dashboard.stats.atsScore'), value: stats?.atsScore ?? 78, icon: Target, suffix: "%" },
          { label: t('dashboard.stats.jobMatches'), value: stats?.jobMatches ?? 47, icon: Users },
          { label: t('dashboard.stats.applications'), value: stats?.applications ?? 12, icon: Award },
          { label: t('dashboard.stats.careerReadiness'), value: stats?.careerReadiness ?? 72, icon: TrendingUp, suffix: "%" },
          { label: t('dashboard.stats.learningProgress'), value: stats?.learningProgress ?? 64, icon: Clock, suffix: "%" },
        ].map((stat, idx) => (
          <Card key={idx} className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                <div className="mt-1 text-4xl font-semibold tabular-nums tracking-tighter">
                  {stat.value}{stat.suffix}
                </div>
              </div>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Opportunity Mode - Featured */}
        <Card className="lg:col-span-5 bg-gradient-to-br from-blue-600 to-blue-700 text-white border-none">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">{t('dashboard.opportunityMode')}</CardTitle>
              <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium tracking-widest">NEW</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-1">
            <div>
              <div className="text-7xl font-semibold tracking-tighter mb-1">72<span className="text-5xl font-normal">%</span></div>
              <div className="text-white/70">Current Career Readiness</div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-white/90">
                <span>Target: Senior Backend Engineer</span>
              </div>
              <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-1.5 w-[72%] bg-white rounded-full" />
              </div>
            </div>

            <div>
              <Link href="/skills">
                <Button variant="secondary" className="bg-white text-blue-700 hover:bg-white/90 w-full gap-2">
                  Open Opportunity Mode <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Job Matches Preview */}
        <Card className="lg:col-span-7">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle>{t('dashboard.stats.jobMatches')} ({jobs?.length || 0})</CardTitle>
            <Link href="/jobs"><Button variant="ghost" size="sm">View all <ArrowRight className="ml-1 h-3.5 w-3.5" /></Button></Link>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {jobs?.slice(0, 3).map((job, index) => (
                <div key={index} className="flex justify-between items-center border rounded-2xl px-4 py-[13px] hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                  <div>
                    <div className="font-medium">{job.title}</div>
                    <div className="text-sm text-muted-foreground">{job.company} • {job.location}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-emerald-600">{job.matchPercentage}%</div>
                    <div className="text-xs text-muted-foreground">match</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations + Roadmap */}
        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle>{t('dashboard.aiRecommendations')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3 items-start">
                <div className="mt-0.5 w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                <div>Add Kubernetes experience — potential match +18%</div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="mt-0.5 w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                <div>Complete AWS certification before end of month</div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="mt-0.5 w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                <div>Build portfolio project showcasing CI/CD</div>
              </div>
            </div>
            <Link href="/resources">
              <Button variant="outline" className="mt-6 w-full">Explore Resources</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Career Roadmap */}
        <Card className="lg:col-span-7">
          <CardHeader className="flex flex-row justify-between items-center pb-4">
            <CardTitle>{t('opportunity.roadmap')}</CardTitle>
            <Link href="/skills" className="text-sm text-primary hover:underline flex items-center">View full <ArrowRight className="h-3.5 ml-1" /></Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roadmap?.steps.slice(0, 3).map((step, idx) => (
                <div key={idx} className={`flex items-center gap-4 rounded-2xl p-3 ${step.status === 'current' ? 'bg-blue-50 dark:bg-zinc-900' : ''}`}>
                  <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-medium ${step.status === 'completed' ? 'bg-emerald-500 border-emerald-500 text-white' : step.status === 'current' ? 'border-blue-600 bg-blue-600 text-white' : 'border-zinc-300'}`}>
                    {step.status === 'completed' ? '✓' : idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{step.title}</div>
                    <div className="text-xs text-muted-foreground">{step.description}</div>
                  </div>
                  <div className="text-xs font-medium text-muted-foreground whitespace-nowrap">{step.estimatedWeeks}w</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-12">
          <CardHeader>
            <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {recent?.map((item: any, idx: number) => (
                <div key={idx} className="p-4 rounded-2xl border bg-zinc-50/60 dark:bg-zinc-900/60 flex items-center gap-4">
                  <div className="flex-1">{item.action}</div>
                  <div className="text-xs text-muted-foreground">{item.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="font-medium mb-3 px-1">{t('dashboard.quickActions')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link href="/upload"><Button variant="outline" className="w-full h-[52px] justify-start gap-3 text-left rounded-2xl"><Upload className="h-4 w-4" /> {t('nav.upload')}</Button></Link>
          <Link href="/jobs"><Button variant="outline" className="w-full h-[52px] justify-start gap-3 text-left rounded-2xl"><Target className="h-4 w-4" /> {t('nav.jobs')}</Button></Link>
          <Link href="/interview"><Button variant="outline" className="w-full h-[52px] justify-start gap-3 text-left rounded-2xl"><Users className="h-4 w-4" /> {t('nav.interview')}</Button></Link>
          <Link href="/reports"><Button variant="outline" className="w-full h-[52px] justify-start gap-3 text-left rounded-2xl"><FileText className="h-4 w-4" /> {t('nav.reports')}</Button></Link>
        </div>
      </div>
    </div>
  );
}
