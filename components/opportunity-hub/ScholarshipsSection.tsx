"use client";
import { GenericGridSection } from "./GenericSection";
import { GraduationCap } from "lucide-react";
export function ScholarshipsSection(props: any) {
  return <GenericGridSection title="Scholarships & Grants" items={props.scholarships} isLoading={props.isLoading} bookmarkedIds={props.bookmarkedIds} onToggleBookmark={props.onToggleBookmark} icon={GraduationCap} accent="from-emerald-500 to-teal-600" />;
}
