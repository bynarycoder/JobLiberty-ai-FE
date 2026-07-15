"use client";

import React from 'react';
import { Job } from '@/lib/types';
import { Button } from './Button';
import { Badge } from './Badge';
import { MapPin, Clock } from 'lucide-react';
import { useI18n } from '@/providers/I18nProvider';

interface JobCardProps {
  job: Job;
  onApply?: () => void;
}

export function JobCard({ job, onApply }: JobCardProps) {
  const { t } = useI18n();

  return (
    <div className="job-card card p-6 border flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-sm font-semibold text-zinc-700 dark:text-zinc-200">{job.logoPlaceholder}</div>
            <div>
              <div className="font-semibold tracking-tight">{job.title}</div>
              <div className="text-sm text-muted-foreground">{job.company}</div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-semibold text-xl text-emerald-600 tabular-nums">{job.matchPercentage}%</div>
          <div className="text-[10px] text-muted-foreground tracking-widest">MATCH</div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
        <div className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {job.location}</div>
        {job.remote && <Badge variant="outline" className="text-xs px-2 py-px">Remote</Badge>}
        <div className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {job.postedDate}</div>
      </div>

      <div className="flex-1 text-sm mb-4 text-muted-foreground line-clamp-2">{job.description}</div>

      <div className="mb-4">
        <div className="text-xs font-medium mb-1.5">Matched skills</div>
        <div className="flex flex-wrap gap-1">
          {job.matchedSkills.slice(0, 3).map((s, i) => (
            <Badge key={i} variant="secondary" className="text-xs">{s}</Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 mt-auto pt-3 border-t">
        <div className="text-xs font-medium">{job.salary || "Competitive"}</div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => alert("Bookmarked")}>Bookmark</Button>
          <Button size="sm" onClick={onApply || (() => alert("Application opened"))} className="btn-primary">{t('jobs.apply')}</Button>
        </div>
      </div>
    </div>
  );
}
