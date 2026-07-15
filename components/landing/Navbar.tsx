"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useI18n } from '@/providers/I18nProvider';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 navbar border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
              <span className="text-white font-semibold text-xl tracking-tighter">JL</span>
            </div>
            <span className="font-semibold text-2xl tracking-tighter">JobLiberty</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          <Link href="#features" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">{t('nav.home')}</Link>
          <Link href="/dashboard" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">{t('nav.dashboard')}</Link>
          <Link href="#how" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">{t('landing.howItWorks.title')}</Link>
          <Link href="#faq" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">{t('landing.faq.title')}</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          
          <Link href="/auth/signin">
            <Button variant="ghost" size="sm">{t('nav.signIn')}</Button>
          </Link>
          <Link href="/auth/signup">
            <Button size="sm" className="btn-primary">{t('nav.signUp')}</Button>
          </Link>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} className="p-2">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white dark:bg-zinc-950 px-6 py-5 flex flex-col gap-3 text-sm">
          <Link href="/dashboard" className="py-1.5">{t('nav.dashboard')}</Link>
          <Link href="#features" className="py-1.5">{t('landing.features.title')}</Link>
          <Link href="#how" className="py-1.5">How it works</Link>
          <div className="pt-2 flex flex-col gap-2">
            <Link href="/auth/signin">
              <Button variant="outline" className="w-full">{t('nav.signIn')}</Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="w-full btn-primary">{t('nav.signUp')}</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
