"use client";

import React from 'react';
import { useI18n } from '@/providers/I18nProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/services/api';
import { Progress } from '@/components/ui/Progress';
import { Badge } from '@/components/ui/Badge';

export default function ResumeAnalysis() {
  const { t } = useI18n();
  
  const { data: resume } = useQuery({
    queryKey: ['resume'],
    queryFn: () => api.fetchResume(),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{t('resume.title')}</h1>
          <p className="text-muted-foreground">{resume?.fileName}</p>
        </div>
        <Button className="btn-primary">{t('resume.download')}</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Score Cards */}
        <Card className="lg:col-span-4">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-7xl font-semibold tracking-[-3.5px] mb-1 text-blue-600">{resume?.score || 82}</div>
              <div className="text-sm font-medium text-muted-foreground tracking-wide">{t('resume.resumeScore')}</div>
            </div>
            <div className="mt-8 space-y-4 text-sm">
              <div className="flex justify-between"><span>ATS Score</span> <span className="font-semibold">{resume?.atsScore || 78}%</span></div>
              <Progress value={resume?.atsScore || 78} />
            </div>
          </CardContent>
        </Card>

        {/* AI Summary */}
        <Card className="lg:col-span-8">
          <CardHeader>
            <CardTitle>{t('resume.aiSummary')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed text-[15px]">
              Chinedu is a highly capable backend engineer with 5+ years of experience in building scalable payment systems. 
              Proficient in Node.js and TypeScript. Strong foundation in databases and containerization. 
              Ready for senior-level roles with a few targeted skill improvements.
            </p>
          </CardContent>
        </Card>

        {/* Professional Summary */}
        <Card className="lg:col-span-12">
          <CardHeader><CardTitle>{t('resume.professionalSummary')}</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Experienced Backend Engineer passionate about building reliable systems that serve millions of users across Africa. Currently at a fast-growing fintech.</p>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="lg:col-span-5">
          <CardHeader><CardTitle>{t('resume.skills')}</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {["Node.js", "TypeScript", "PostgreSQL", "React", "Docker", "Express", "Redis", "Jest"].map(s => (
              <Badge key={s} variant="secondary">{s}</Badge>
            ))}
          </CardContent>
        </Card>

        {/* Experience */}
        <Card className="lg:col-span-7">
          <CardHeader><CardTitle>{t('resume.experience')}</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="font-medium">Backend Engineer • Paystack (2023 — Present)</div>
              <div className="text-sm mt-1">Built high-throughput payment APIs. Improved latency by 42%.</div>
            </div>
            <div>
              <div className="font-medium">Software Engineer • Andela (2021 — 2023)</div>
              <div className="text-sm mt-1">Delivered 20+ client projects across fintech and logistics.</div>
            </div>
          </CardContent>
        </Card>

        {/* Education & More */}
        <div className="lg:col-span-12 grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader><CardTitle>{t('resume.education')}</CardTitle></CardHeader>
            <CardContent className="text-sm">BSc Computer Science<br />University of Lagos (2019)</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>{t('resume.projects')}</CardTitle></CardHeader>
            <CardContent className="text-sm">FinPay API • Open Source Payment Gateway</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>{t('resume.certifications')}</CardTitle></CardHeader>
            <CardContent className="text-sm">AWS Cloud Practitioner • 2024</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
