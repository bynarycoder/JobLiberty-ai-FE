"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useI18n } from "@/providers/I18nProvider";
import { Input } from "@/components/ui/Input";
import { Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { opportunitiesApi } from "@/lib/services/opportunities";
import type { OpportunityType } from "@/lib/types";

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
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-4 top-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder={t("opportunityHub.search.placeholder")}
          className="h-11 w-full rounded-2xl border border-input bg-background pl-11 pr-10 text-sm focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={t("opportunityHub.search.ariaLabel")}
          aria-expanded={isOpen}
          aria-controls="search-results"
          role="combobox"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-muted-foreground" aria-hidden="true" />
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="search-results"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-2 w-full rounded-2xl border bg-popover p-2 shadow-lg"
            role="listbox"
          >
            {results.length > 0 ? (
              <ul className="space-y-0.5">
                {results.map((result) => (
                  <li key={result.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setQuery(result.title);
                        setIsOpen(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-secondary focus-visible:bg-secondary focus-visible:outline-none"
                      role="option"
                      aria-selected="false"
                    >
                      <span className="rounded-lg bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary capitalize">
                        {result.type}
                      </span>
                      <span className="flex-1 truncate">{result.title}</span>
                      <span className="hidden truncate text-xs text-muted-foreground sm:inline">{result.organization}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                {t("opportunityHub.search.noResults")}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
