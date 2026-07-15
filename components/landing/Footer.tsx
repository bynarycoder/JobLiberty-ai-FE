"use client";

import Link from 'next/link';
import { useI18n } from '@/providers/I18nProvider';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <span className="text-white font-bold text-lg">JL</span>
              </div>
              <span className="font-semibold text-xl tracking-tighter">JobLiberty</span>
            </div>
            <p className="text-sm text-zinc-500 max-w-[220px] leading-relaxed">{t('app.altTagline')}</p>
            <div className="mt-4 text-[11px] text-muted-foreground">
              {t('footer.developedBy')}<br />
              {t('footer.fellow')}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold mb-4">{t('app.name')}</div>
            <div className="space-y-[11px] text-sm text-zinc-600 dark:text-zinc-400">
              <Link href="/about" className="block hover:text-foreground transition-colors">{t('footer.links.about')}</Link>
              <Link href="/about" className="block hover:text-foreground transition-colors">{t('nav.dashboard')}</Link>
              <Link href="/upload" className="block hover:text-foreground transition-colors">{t('nav.upload')}</Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold mb-4">Resources</div>
            <div className="space-y-[11px] text-sm text-zinc-600 dark:text-zinc-400">
              <Link href="#faq" className="block hover:text-foreground transition-colors">FAQ</Link>
              <Link href="/about" className="block hover:text-foreground transition-colors">{t('footer.links.github')}</Link>
              <a href="#" className="block hover:text-foreground transition-colors">Blog</a>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold mb-4">Legal</div>
            <div className="space-y-[11px] text-sm text-zinc-600 dark:text-zinc-400">
              <a href="#" className="block hover:text-foreground transition-colors">{t('footer.links.privacy')}</a>
              <a href="#" className="block hover:text-foreground transition-colors">{t('footer.links.terms')}</a>
              <a href="#" className="block hover:text-foreground transition-colors">{t('footer.links.contact')}</a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t text-xs flex flex-col md:flex-row justify-between gap-y-1 text-muted-foreground">
          <div>{t('footer.copyright')} • {t('footer.developedBy')}</div>
          <div>Made for the 3MTT NextGen Showcase</div>
        </div>
      </div>
    </footer>
  );
}
