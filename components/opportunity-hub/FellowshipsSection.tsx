"use client";
import { GenericGridSection } from "./GenericSection";
import { Rocket } from "lucide-react";
export function FellowshipsSection(props: any) {
  return <GenericGridSection title="Fellowships" items={props.fellowships} isLoading={props.isLoading} bookmarkedIds={props.bookmarkedIds} onToggleBookmark={props.onToggleBookmark} icon={Rocket} accent="from-violet-500 to-purple-600" />;
}
