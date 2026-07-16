"use client";
import { GenericGridSection } from "./GenericSection";
import { Trophy } from "lucide-react";
export function HackathonsSection(props: any) {
  return <GenericGridSection title="Hackathons & Competitions" items={props.hackathons} isLoading={props.isLoading} bookmarkedIds={props.bookmarkedIds} onToggleBookmark={props.onToggleBookmark} icon={Trophy} accent="from-cyan-500 to-blue-600" />;
}
