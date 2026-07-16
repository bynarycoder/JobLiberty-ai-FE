"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useI18n } from "@/providers/I18nProvider";
import { Search, Loader2, Sparkles, Command } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { opportunitiesApi } from "@/lib/services/opportunities";
import type { OpportunityType } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";

interface SearchResult {
  id: string;
  title: string;
  type: OpportunityType;
  organization: string;
}

export function OpportunitySearch() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    setIsLoading(true);
    try {
      const data = await opportunitiesApi.searchOpportunities(q);
      setResults(data);
      setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => search(query), 250);
    return () => clearTimeout(timeout);
  }, [query, search]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full lg:max-w-[640px]">
      <div className="relative group">
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-[#2563EB] dark:group-focus-within:text-[#60A5FA] transition-colors">
          <Search className="h-[18px] w-[18px]" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder={t("opportunityHub.search.placeholder")}
          className="h-[48px] w-full rounded-[14px] border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#1E293B] pl-12 pr-[120px] text-[14px] font-[450] tracking-[-0.01em] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-[0_2px_8px_rgba(15,23,42,0.06)] focus:outline-none focus:border-[#2563EB]/40 focus:ring-[4px] focus:ring-[#2563EB]/[0.08] focus:shadow-[0_0_0_4px_rgba(37,99,235,0.08),0_4px_12px_rgba(15,23,42,0.08)]"
          aria-label={t("opportunityHub.search.ariaLabel")}
          aria-expanded={isOpen}
        />

        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-slate-400 mr-2" />
          ) : (
            <>
              <div className="hidden sm:flex items-center gap-1 rounded-[8px] border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2 py-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                <Command className="h-3 w-3" />K
              </div>
              <Badge variant="ai" size="sm" className="hidden sm:inline-flex">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Search
              </Badge>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-50 mt-2 w-full rounded-[16px] border border-slate-200/70 dark:border-slate-700/60 bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-xl p-2 shadow-[0_12px_32px_rgba(15,23,42,0.12)]"
            role="listbox"
          >
            {results.length > 0 ? (
              <ul className="space-y-0.5 max-h-[320px] overflow-y-auto">
                {results.map((result) => (
                  <li key={result.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setQuery(result.title);
                        setIsOpen(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-[12px] px-3 py-2.5 text-left text-[13.5px] transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.06] focus-visible:bg-slate-50 dark:focus-visible:bg-white/[0.06] focus-visible:outline-none group"
                      role="option"
                    >
                      <div className="h-9 w-9 rounded-[10px] bg-slate-50 dark:bg-white/[0.06] border border-slate-200/60 dark:border-white/[0.08] flex items-center justify-center text-[12px] font-bold text-slate-600 dark:text-slate-400 group-hover:bg-[#EFF6FF] dark:group-hover:bg-[#1E3A8A]/20 group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] group-hover:border-[#DBEAFE] dark:group-hover:border-[#1E3A8A]/30 transition-colors">
                        {result.organization[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium tracking-[-0.01em] text-slate-900 dark:text-slate-100 truncate">{result.title}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {result.organization} • {result.type}
                        </div>
                      </div>
                      <Badge variant="secondary" size="sm" className="shrink-0">
                        {result.type}
                      </Badge>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-10 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-white/[0.06] mb-3">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <div className="text-[13px] font-medium text-slate-600 dark:text-slate-400">No results found</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-500 mt-1">Try “backend Lagos” or “scholarship”</div>
              </div>
            )}

            <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between px-1">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-[#7C3AED]" />
                Liberty AI semantic search
              </span>
              <span className="text-[10px] font-medium tracking-wide text-slate-400 dark:text-slate-500">ESC to close</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
