"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

interface SkeletonCardsProps {
  count?: number;
  columns?: 1 | 2 | 3 | 4;
}

export function SkeletonCards({ count = 4, columns = 3 }: SkeletonCardsProps) {
  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div className={`grid ${gridClass} gap-6`} aria-busy="true" aria-label="Loading opportunities">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
        >
          <Card className="h-56 animate-pulse p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
                <div className="space-y-2">
                  <div className="h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
              </div>
              <div className="h-6 w-12 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <div className="mt-5 space-y-2">
              <div className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-3 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <div className="mt-5 flex gap-2">
              <div className="h-6 w-16 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-6 w-16 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-8 w-20 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
