"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/providers/I18nProvider';
import { 
  LayoutDashboard, Upload, Target, BarChart3, TrendingUp, 
  BookOpen, Users, FileText, Settings, Award, MessageCircle, Globe
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, labelKey: 'nav.dashboard' },
  { href: '/chat', icon: MessageCircle, labelKey: 'nav.chat' },
  { href: '/upload', icon: Upload, labelKey: 'nav.upload' },
  { href: '/jobs', icon: Target, labelKey: 'nav.jobs' },
  { href: '/opportunity-hub', icon: Globe, labelKey: 'nav.opportunityHub' },
  { href: '/analysis', icon: BarChart3, labelKey: 'nav.analysis' },
  { href: '/skills', icon: TrendingUp, labelKey: 'nav.skills' },
  { href: '/resources', icon: BookOpen, labelKey: 'nav.resources' },
  { href: '/interview', icon: Users, labelKey: 'nav.interview' },
  { href: '/reports', icon: FileText, labelKey: 'nav.reports' },
  { href: '/settings', icon: Settings, labelKey: 'nav.settings' },
  { href: '/about', icon: Award, labelKey: 'nav.about' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <aside className="hidden lg:flex w-64 border-r bg-white dark:bg-zinc-950 flex-col h-screen fixed">
      <div className="p-6 border-b">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
            <span className="text-white text-[17px] font-bold tracking-[-1.5px]">JL</span>
          </div>
          <span className="font-semibold tracking-tight text-xl">JobLiberty</span>
        </Link>
      </div>

      <div className="p-3 flex-1">
        <nav className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`sidebar-link flex items-center gap-3 px-4 py-[11px] text-sm rounded-xl ${isActive ? 'active bg-secondary text-primary' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900'}`}
              >
                <Icon className="h-4 w-4" />
                <span>{t(item.labelKey)}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t text-xs text-muted-foreground px-6">
        3MTT NextGen 2026
      </div>
    </aside>
  );
}
