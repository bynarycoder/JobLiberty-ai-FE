"use client";

import React from 'react';
import { useI18n } from '@/providers/I18nProvider';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/services/api';
import { JobCard } from '@/components/ui/JobCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Job } from '@/lib/types';

export default function JobsPage() {
  const { t } = useI18n();
  const [search, setSearch] = React.useState('');
  const [sort, setSort] = React.useState('match');

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['jobs', search],
    queryFn: () => api.searchJobs(search),
  });

  const sortedJobs = React.useMemo(() => {
    let result = [...jobs];
    if (sort === 'match') {
      result.sort((a, b) => b.matchPercentage - a.matchPercentage);
    } else if (sort === 'recent') {
      result.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    }
    return result;
  }, [jobs, sort]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{t('jobs.title')}</h1>
          <p className="text-muted-foreground mt-1">{t('jobs.subtitle')}</p>
        </div>
        <div className="flex gap-2 items-center">
          <Input 
            placeholder={t('jobs.searchPlaceholder')} 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="w-64" 
          />
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="input rounded-xl h-10 px-3 text-sm bg-background">
            <option value="match">Sort by Match</option>
            <option value="recent">Sort by Recent</option>
          </select>
        </div>
      </div>

      {isLoading && <div className="text-muted-foreground">{t('common.loading')}</div>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedJobs.length > 0 ? (
          sortedJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <div className="col-span-full py-14 text-center text-muted-foreground border border-dashed rounded-3xl">{t('jobs.noJobs')}</div>
        )}
      </div>
    </div>
  );
}
