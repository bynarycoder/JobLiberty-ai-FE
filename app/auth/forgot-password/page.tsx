"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/providers/I18nProvider';
import { toast } from 'sonner';

export default function ForgotPassword() {
  const { t } = useI18n();
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Reset link sent to your email.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2"><span className="font-semibold text-2xl">JobLiberty</span></Link>
        </div>

        <div className="card p-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">{t('auth.forgotPassword')}</h1>
          <p className="text-muted-foreground mb-7">{t('auth.resetInstructions')}</p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm mb-1.5 font-medium">{t('auth.email')}</label>
                <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="input w-full h-11 rounded-2xl border px-4" />
              </div>
              <Button type="submit" className="w-full btn-primary h-11">Send Reset Link</Button>
            </form>
          ) : (
            <div className="text-center py-2">
              <p className="text-sm">Check your inbox for instructions.</p>
            </div>
          )}

          <Link href="/auth/signin" className="block mt-5 text-center text-sm text-primary hover:underline">{t('auth.backToSignIn')}</Link>
        </div>
      </div>
    </div>
  );
}
