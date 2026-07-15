"use client";

import React, { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from 'react';
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

const LANGUAGE_STORAGE_KEY = 'jobliberty-language';
const LANGUAGE_CHANGE_EVENT = 'jobliberty-language-change';
const SUPPORTED_LANGUAGES = ['en', 'ha', 'yo', 'ig'] as const;

type TranslationValue = string | Translation;

const LANGUAGE_OPTIONS: I18nContextType['languages'] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ha', label: 'Hausa', flag: '🇳🇬' },
  { code: 'yo', label: 'Yoruba', flag: '🇳🇬' },
  { code: 'ig', label: 'Igbo', flag: '🇳🇬' },
];

function isLanguage(value: string | null): value is Language {
  return SUPPORTED_LANGUAGES.includes(value as Language);
}

function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'en';

  const savedLang = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return isLanguage(savedLang) ? savedLang : 'en';
}

function subscribeToLanguageChanges(onStoreChange: () => void) {
  if (typeof window === 'undefined') return () => undefined;

  const handleStorage = (event: StorageEvent) => {
    if (event.key === LANGUAGE_STORAGE_KEY) onStoreChange();
  };

  window.addEventListener('storage', handleStorage);
  window.addEventListener(LANGUAGE_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, onStoreChange);
  };
}

function resolveTranslationValue(source: Translation, keys: string[]): TranslationValue | undefined {
  let result: TranslationValue = source;

  for (const key of keys) {
    if (typeof result === 'object' && result !== null && key in result) {
      result = result[key];
    } else {
      return undefined;
    }
  }

  return result;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore<Language>(subscribeToLanguageChanges, getStoredLanguage, () => 'en');

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const contextValue = useMemo<I18nContextType>(() => {
    const setLanguage = (lang: Language) => {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      document.documentElement.lang = lang;
      window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
    };

    const t = (key: string): string => {
      const keys = key.split('.');
      const translatedValue = resolveTranslationValue(translations[language], keys);
      if (typeof translatedValue === 'string') return translatedValue;

      const fallbackValue = resolveTranslationValue(translations.en, keys);
      return typeof fallbackValue === 'string' ? fallbackValue : key;
    };

    return {
      language,
      setLanguage,
      t,
      languages: LANGUAGE_OPTIONS,
    };
  }, [language]);

  return (
    <I18nContext.Provider value={contextValue}>
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
