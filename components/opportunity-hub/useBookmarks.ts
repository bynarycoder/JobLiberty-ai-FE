"use client";

import { useState, useEffect, useCallback } from "react";

const BOOKMARKS_KEY = "jobliberty-opportunity-bookmarks";

function readBookmarks(): Set<string> {
  try {
    const stored = window.localStorage.getItem(BOOKMARKS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as string[];
      return new Set(parsed);
    }
  } catch {
    // Ignore unavailable storage and malformed saved values.
  }
  return new Set();
}

export function useBookmarks() {
  // Start from the same empty state on the server and during the first client
  // render. The persisted value is restored after hydration.
  const [bookmarks, setBookmarks] = useState<Set<string>>(() => new Set());
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedBookmarks = readBookmarks();
    const timer = window.setTimeout(() => {
      setBookmarks(storedBookmarks);
      setIsHydrated(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(Array.from(bookmarks)));
    } catch {
      // Ignore unavailable storage and quota errors.
    }
  }, [bookmarks, isHydrated]);

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

  const isBookmarked = useCallback((id: string) => bookmarks.has(id), [bookmarks]);

  return { bookmarks, toggleBookmark, isBookmarked };
}
