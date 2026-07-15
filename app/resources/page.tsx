"use client";

import React from 'react';
import { useI18n } from '@/providers/I18nProvider';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function CareerResources() {
  const { t } = useI18n();
  const { data: resources = [] } = useQuery({ queryKey: ['resources'], queryFn: () => api.fetchCareerResources() });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">{t('resources.title')}</h1>
        <p className="text-muted-foreground">{t('resources.subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {resources.map((res) => (
          <Card key={res.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg leading-tight">{res.title}</CardTitle>
                <Badge variant={res.free ? "success" : "secondary"}>{res.free ? t('resources.free') : t('resources.paid')}</Badge>
              </div>
              <div className="text-sm text-muted-foreground">{res.provider} • {res.duration}</div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <p className="text-sm mb-5 text-muted-foreground flex-1">{res.description}</p>
              <a href={res.url} target="_blank" rel="noopener">
                <Button variant="outline" className="w-full">{t('resources.startLearning')}</Button>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
