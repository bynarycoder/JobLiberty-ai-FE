"use client";

import React from "react";
import { Card } from "@/components/ui/Card";

export function SkeletonCards({ count = 4, columns = 2 }: { count?: number; columns?: number }) {
  const colClass = columns === 1 ? "grid-cols-1" : columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2";

  return (
    <div className={`grid grid-cols-1 ${colClass} gap-4`}>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="p-5 animate-pulse">
          <div className="flex gap-3 mb-4">
            <div className="h-11 w-11 rounded-[12px] bg-slate-100 dark:bg-slate-800" />
            <div className="space-y-2 flex-1">
              <div className="h-4 w-3/4 rounded bg-slate-100 dark:bg-slate-800" />
              <div className="h-3 w-1/2 rounded bg-slate-100 dark:bg-slate-800" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full rounded bg-slate-100 dark:bg-slate-800" />
            <div className="h-3 w-5/6 rounded bg-slate-100 dark:bg-slate-800" />
          </div>
          <div className="mt-4 flex gap-2">
            <div className="h-6 w-16 rounded-full bg-slate-100 dark:bg-slate-800" />
            <div className="h-6 w-16 rounded-full bg-slate-100 dark:bg-slate-800" />
          </div>
        </Card>
      ))}
    </div>
  );
}
