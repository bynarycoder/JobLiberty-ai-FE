"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/providers/I18nProvider';
import { api } from '@/lib/services/api';
import { toast } from 'sonner';

export default function SignUp() {
  const { t } = useI18n();
  const router = useRouter();
  const [formData, setFormData] = React.useState({ name: '', email: '', password: '', location: 'Abuja, Nigeria' });
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.signUp(formData);
      toast.success("Account created! Welcome to JobLiberty.");
      router.push('/auth/verify-email');
    } catch (err) {
      toast.error("Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-700 flex items-center justify-center"><span className="text-white font-bold text-xl">JL</span></div>
            <span className="font-semibold text-2xl tracking-tight">JobLiberty</span>
          </Link>
        </div>

        <div className="card p-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">{t('auth.signUp')}</h1>
          <p className="text-muted-foreground mb-7">Create your account and start your career journey</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t('auth.fullName')}</label>
              <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="input w-full h-11 rounded-2xl border px-4" required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t('auth.email')}</label>
              <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="input w-full h-11 rounded-2xl border px-4" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">{t('auth.password')}</label>
                <input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="input w-full h-11 rounded-2xl border px-4" required />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">{t('auth.location')}</label>
                <input value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="input w-full h-11 rounded-2xl border px-4" />
              </div>
            </div>

            <Button type="submit" className="w-full btn-primary h-11 mt-2" disabled={loading}>
              {loading ? t('common.loading') : t('auth.createAccount')}
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-widest text-zinc-400">
            <div className="flex-1 h-px bg-border" /> {t('auth.signUpWith')} <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-11">Google</Button>
            <Button variant="outline" className="h-11">GitHub</Button>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t('auth.hasAccount')} <Link href="/auth/signin" className="text-primary font-medium">{t('auth.signIn')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
