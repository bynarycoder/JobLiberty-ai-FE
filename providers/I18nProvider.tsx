"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language, Translation } from '@/lib/types';

// Import all translation files
import en from '@/locales/en.json';
import ha from '@/locales/ha.json';
import yo from '@/locales/yo.json';
import ig from '@/locales/ig.json';

const translations: Record<Language, Translation> = {
  en,
  ha,
  yo,
  ig,
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languages: { code: Language; label: string; flag: string }[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const LANGUAGE_OPTIONS = [
  { code: 'en' as const, label: 'English', flag: '🇬🇧' },
  { code: 'ha' as const, label: 'Hausa', flag: '🇳🇬' },
  { code: 'yo' as const, label: 'Yoruba', flag: '🇳🇬' },
  { code: 'ig' as const, label: 'Igbo', flag: '🇳🇬' },
];

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Load saved language preference
  useEffect(() => {
    const savedLang = localStorage.getItem('jobliberty-language') as Language;
    if (savedLang && ['en', 'ha', 'yo', 'ig'].includes(savedLang)) {
      setLanguageState(savedLang);
      document.documentElement.lang = savedLang;
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('jobliberty-language', lang);
    document.documentElement.lang = lang;
  };

  // Translation function with dot notation support (e.g. "nav.home")
  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[language];

    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        // Fallback to English
        let fallback: any = translations['en'];
        for (const fk of keys) {
          if (fallback && typeof fallback === 'object' && fk in fallback) {
            fallback = fallback[fk];
          } else {
            return key; // Return key if no fallback
          }
        }
        return typeof fallback === 'string' ? fallback : key;
      }
    }

    return typeof result === 'string' ? result : key;
  };

  return (
    <I18nContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      languages: LANGUAGE_OPTIONS 
    }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
