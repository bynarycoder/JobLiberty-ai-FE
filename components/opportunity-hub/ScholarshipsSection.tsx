"use client";
import { GenericGridSection } from "./GenericSection";
import { GraduationCap } from "lucide-react";
import type { Scholarship } from "@/lib/types";

export function ScholarshipsSection({ scholarships, isLoading, bookmarkedIds, onToggleBookmark }: {
  scholarships: Scholarship[];
  isLoading: boolean;
  bookmarkedIds?: Set<string>;
  onToggleBookmark?: (id: string) => void;
}) {
  return <GenericGridSection title="Scholarships & Grants" items={scholarships} isLoading={isLoading} bookmarkedIds={bookmarkedIds} onToggleBookmark={onToggleBookmark} icon={GraduationCap} accent="from-emerald-500 to-teal-600" />;
}
