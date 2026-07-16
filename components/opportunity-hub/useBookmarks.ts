"use client";

import { useState, useEffect, useCallback } from 'react';

const BOOKMARKS_KEY = 'jobliberty-opportunity-bookmarks';

function getInitialBookmarks(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const stored = window.localStorage.getItem(BOOKMARKS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as string[];
      return new Set(parsed);
    }
  } catch {
    // ignore parsing errors
  }
  return new Set();
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Set<string>>(getInitialBookmarks);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(Array.from(bookmarks)));
  }, [bookmarks]);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (id: string) => bookmarks.has(id),
    [bookmarks]
  );

  return { bookmarks, toggleBookmark, isBookmarked };
}
