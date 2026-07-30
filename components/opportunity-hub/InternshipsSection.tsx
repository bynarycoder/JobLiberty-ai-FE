"use client";
import { GenericGridSection } from "./GenericSection";
import { Laptop } from "lucide-react";
import type { FeaturedOpportunity } from "@/lib/types";

export function InternshipsSection({ internships, isLoading, bookmarkedIds, onToggleBookmark }: {
  internships: FeaturedOpportunity[];
  isLoading: boolean;
  bookmarkedIds?: Set<string>;
  onToggleBookmark?: (id: string) => void;
}) {
  return <GenericGridSection title="Internships & Apprenticeships" items={internships} isLoading={isLoading} bookmarkedIds={bookmarkedIds} onToggleBookmark={onToggleBookmark} icon={Laptop} accent="from-amber-500 to-orange-600" />;
}
