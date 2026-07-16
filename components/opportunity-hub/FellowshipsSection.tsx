"use client";
import { GenericGridSection } from "./GenericSection";
import { Rocket } from "lucide-react";
import type { Fellowship } from "@/lib/types";

export function FellowshipsSection({ fellowships, isLoading, bookmarkedIds, onToggleBookmark }: {
  fellowships: Fellowship[];
  isLoading: boolean;
  bookmarkedIds?: Set<string>;
  onToggleBookmark?: (id: string) => void;
}) {
  return <GenericGridSection title="Fellowships" items={fellowships} isLoading={isLoading} bookmarkedIds={bookmarkedIds} onToggleBookmark={onToggleBookmark} icon={Rocket} accent="from-violet-500 to-purple-600" />;
}
