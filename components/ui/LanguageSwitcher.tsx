"use client";

import React from "react";
import { useI18n } from "@/providers/I18nProvider";
import { Button } from "./Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/DropdownMenu";
import { Globe, Check } from "lucide-react";
import { motion } from "framer-motion";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage, languages } = useI18n();
  const currentLang = languages.find((l) => l.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={compact ? "sm" : "default"} className="gap-1.5 px-3 rounded-full font-medium hover:bg-slate-100 dark:hover:bg-white/[0.06] border border-transparent hover:border-slate-200 dark:hover:border-white/[0.08]">
          <Globe className="h-[16px] w-[16px] text-slate-500 dark:text-slate-400" />
          {!compact && (
            <>
              <span className="text-[13px] tracking-[-0.01em]">{currentLang?.flag}</span>
              <span className="hidden sm:inline text-[13px]">{currentLang?.label}</span>
            </>
          )}
          {compact && <span className="text-[13px]">{currentLang?.flag}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] rounded-[14px] p-1.5 bg-white/90 dark:bg-[#1E293B]/90 backdrop-blur-xl border-slate-200/70 dark:border-slate-700/50 shadow-[0_8px_24px_rgba(15,23,42,0.12)]">
        <DropdownMenuLabel className="px-2.5 py-1.5 text-[11px] font-semibold tracking-[0.06em] uppercase text-slate-500 dark:text-slate-400">
          Select language
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1" />
        {languages.map((lang) => {
          const active = language === lang.code;
          return (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className="rounded-[10px] px-2.5 py-2.5 text-[13.5px] font-[450] tracking-[-0.01em] cursor-pointer focus:bg-slate-50 dark:focus:bg-white/[0.06] flex items-center justify-between"
            >
              <span className="flex items-center gap-2.5">
                <span className="text-[16px]">{lang.flag}</span>
                <span className={active ? "font-semibold text-slate-900 dark:text-slate-100" : "text-slate-700 dark:text-slate-300"}>{lang.label}</span>
              </span>
              {active && <Check className="h-3.5 w-3.5 text-[#2563EB] dark:text-[#60A5FA]" />}
            </DropdownMenuItem>
          );
        })}
        <div className="mt-1.5 px-2.5 py-1.5">
          <div className="rounded-[8px] bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 border border-[#DBEAFE] dark:border-[#1E3A8A]/30 px-2.5 py-2 flex items-gap-2 gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#10B981] mt-[6px] shrink-0 animate-pulse" />
            <p className="text-[11px] leading-[1.5] text-[#1E40AF] dark:text-[#93C5FD]">AI adapts responses to your language</p>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
