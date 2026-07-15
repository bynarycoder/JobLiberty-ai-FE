"use client";

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/providers/I18nProvider';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { Bell, Search, User } from 'lucide-react';
import { api } from '@/lib/services/api';

export function DashboardTopbar() {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [notifications, setNotifications] = React.useState(2);

  // Mock search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/jobs?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="sticky top-0 z-40 border-b bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
      <div className="h-14 px-6 lg:px-8 flex items-center justify-between max-w-[1280px] mx-auto">
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('jobs.searchPlaceholder')}
                className="input w-full pl-11 h-10 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border-0 focus:ring-1 focus:ring-ring text-sm"
              />
            </div>
          </form>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative rounded-xl" asChild>
            <Link href="/dashboard">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-medium text-white">{notifications}</span>
              )}
            </Link>
          </Button>

          <LanguageSwitcher />
          <ThemeToggle />

          <Link href="/settings" className="flex items-center gap-2 pl-2 border-l ml-1">
            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Chinedu" alt="Profile" className="w-full h-full" />
            </div>
            <div className="hidden md:block text-sm font-medium">Chinedu O.</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
