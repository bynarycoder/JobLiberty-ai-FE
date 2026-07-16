"use client";
import { GenericGridSection } from "./GenericSection";
import { Trophy } from "lucide-react";
import type { Hackathon } from "@/lib/types";

export function HackathonsSection({ hackathons, isLoading, bookmarkedIds, onToggleBookmark }: {
  hackathons: Hackathon[];
  isLoading: boolean;
  bookmarkedIds?: Set<string>;
  onToggleBookmark?: (id: string) => void;
}) {
  return <GenericGridSection title="Hackathons & Competitions" items={hackathons} isLoading={isLoading} bookmarkedIds={bookmarkedIds} onToggleBookmark={onToggleBookmark} icon={Trophy} accent="from-cyan-500 to-blue-600" />;
}
