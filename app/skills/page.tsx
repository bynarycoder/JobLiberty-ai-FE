"use client";

import React from 'react';
import { useI18n } from '@/providers/I18nProvider';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function SkillGapPage() {
  const { t } = useI18n();
  const { data: skillGap } = useQuery({ queryKey: ['skill-gap'], queryFn: () => api.fetchSkillGap() });

  if (!skillGap) return <div>{t('common.loading')}</div>;

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tighter">{t('skills.title')}</h1>
          <p className="text-muted-foreground">{t('skills.subtitle')}</p>
        </div>
        <Link href="/dashboard"><Button variant="outline">Back to Dashboard</Button></Link>
      </div>

      {/* Opportunity Mode - Highlight */}
      <div className="mb-8 rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-7 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="uppercase tracking-[2px] text-xs text-white/70 mb-1">OPPORTUNITY MODE</div>
            <div className="text-5xl font-semibold tracking-tighter mb-1">{skillGap.opportunityScore}%</div>
            <div className="font-medium">Potential Match After Learning</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-semibold tracking-tight">{skillGap.careerReadiness}%</div>
            <div className="text-white/70 text-sm">Current Readiness</div>
          </div>
        </div>
        <div className="mt-6 text-sm flex items-center gap-2">
          <span>Estimated Learning Time:</span> <span className="font-medium">6 weeks</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Skills You Have */}
        <Card>
          <CardHeader><CardTitle>{t('skills.youHave')}</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {skillGap.currentSkills.map((skill, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{skill.name}</div>
                    <div className="text-xs text-muted-foreground">{skill.level} • {skill.yearsExperience} years</div>
                  </div>
                  <Badge variant="secondary">{skill.category}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Missing Skills */}
        <Card>
          <CardHeader><CardTitle>{t('skills.missing')}</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillGap.missingSkills.map((skill, idx) => (
                <div key={idx} className="flex justify-between border-b pb-3 last:border-none last:pb-0">
                  <div>
                    <div className="font-semibold">{skill.name}</div>
                    <div className="text-xs text-muted-foreground">Priority: {skill.priority}</div>
                  </div>
                  <div className="text-right text-sm">
                    <div>{skill.estimatedTimeWeeks} weeks</div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/resources">
              <Button className="mt-6 w-full btn-accent">Start Learning Plan</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
