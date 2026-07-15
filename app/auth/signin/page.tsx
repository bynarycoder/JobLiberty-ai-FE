"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/providers/I18nProvider';
import { api } from '@/lib/services/api';
import { toast } from 'sonner';

export default function SignIn() {
  const { t } = useI18n();
  const router = useRouter();
  const [email, setEmail] = React.useState('chinedu.okoro@email.com');
  const [password, setPassword] = React.useState('password123');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.signIn(email, password);
      toast.success("Welcome back!");
      router.push('/dashboard');
    } catch (err) {
      toast.error("Login failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-700 flex items-center justify-center"><span className="text-white font-bold text-xl">JL</span></div>
            <span className="font-semibold text-2xl tracking-tight">JobLiberty</span>
          </Link>
        </div>

        <div className="card p-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">{t('auth.signIn')}</h1>
          <p className="text-muted-foreground mb-7">{t('app.altTagline')}</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">{t('auth.email')}</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="input w-full h-11 rounded-2xl border px-4" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">{t('auth.password')}</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="input w-full h-11 rounded-2xl border px-4" required />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> {t('auth.rememberMe')}</label>
              <Link href="/auth/forgot-password" className="text-primary hover:underline">{t('auth.forgotPasswordLink')}</Link>
            </div>

            <Button type="submit" className="w-full btn-primary h-11" disabled={loading}>
              {loading ? t('common.loading') : t('auth.signIn')}
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-widest text-zinc-400">
            <div className="flex-1 h-px bg-border" /> {t('auth.signInWith')} <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-11">Google</Button>
            <Button variant="outline" className="h-11">GitHub</Button>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t('auth.noAccount')} <Link href="/auth/signup" className="text-primary font-medium">{t('auth.signUp')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
