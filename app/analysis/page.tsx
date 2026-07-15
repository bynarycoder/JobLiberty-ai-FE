"use client";

import React from 'react';
import { useI18n } from '@/providers/I18nProvider';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';

export default function ATSAnalysisPage() {
  const { t } = useI18n();
  const { data: ats } = useQuery({ queryKey: ['ats'], queryFn: () => api.fetchATSAnalysis() });

  if (!ats) return <div>Loading...</div>;

  const scoreData = [
    { name: 'Keyword', value: ats.keywordMatch },
    { name: 'Formatting', value: ats.formatting },
    { name: 'Readability', value: ats.readability },
    { name: 'Skills', value: ats.skills },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight mb-1">{t('analysis.title')}</h1>
      <p className="mb-8 text-muted-foreground">Overall ATS Compatibility: <span className="font-semibold text-emerald-600">{ats.overallScore}%</span></p>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>{t('analysis.overallScore')}</CardTitle></CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <div className="text-[92px] font-semibold tracking-[-6px] text-blue-600">{ats.overallScore}</div>
              <div className="text-sm tracking-[1px] text-muted-foreground">OVERALL</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Category Breakdown</CardTitle></CardHeader>
          <CardContent className="space-y-5 pt-2">
            {scoreData.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span>{item.name}</span>
                  <span className="font-semibold">{item.value}%</span>
                </div>
                <Progress value={item.value} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>{t('analysis.suggestions')}</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              {ats.suggestions.map((sug) => <li key={sug} className="pl-5 relative before:absolute before:left-0 before:top-1.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-blue-600">• {sug}</li>)}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Strengths &amp; Weaknesses</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium mb-2 text-emerald-600">Strengths</div>
              <ul className="space-y-1.5">{ats.strengths.map((s) => <li key={s}>✓ {s}</li>)}</ul>
            </div>
            <div>
              <div className="font-medium mb-2 text-red-600">Areas to improve</div>
              <ul className="space-y-1.5">{ats.weaknesses.map((w) => <li key={w}>– {w}</li>)}</ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
