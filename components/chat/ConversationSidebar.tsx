"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { cn } from "@/lib/utils";
import { Search, MessageSquare, Trash2, X, Plus, Sparkles } from "lucide-react";
import type { Conversation } from "@/lib/types";
import { Button } from "@/components/ui/Button";

interface ConversationSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  onNewConversation: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function ConversationSidebar({ conversations, activeConversationId, onSelectConversation, onDeleteConversation, onNewConversation, isOpen, onClose }: ConversationSidebarProps) {
  const { t } = useI18n();
  const [search, setSearch] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = conversations.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()));

  const groupConversations = (convs: Conversation[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 86400000);
    const weekAgo = new Date(today.getTime() - 7 * 86400000);
    const groups: { label: string; items: Conversation[] }[] = [
      { label: t("chat.sidebar.today"), items: [] },
      { label: t("chat.sidebar.yesterday"), items: [] },
      { label: t("chat.sidebar.thisWeek"), items: [] },
      { label: t("chat.sidebar.older"), items: [] },
    ];
    convs.forEach((conv) => {
      const date = new Date(conv.updatedAt);
      if (date >= today) groups[0].items.push(conv);
      else if (date >= yesterday) groups[1].items.push(conv);
      else if (date >= weekAgo) groups[2].items.push(conv);
      else groups[3].items.push(conv);
    });
    return groups.filter((g) => g.items.length > 0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden" onClick={onClose} />

          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className={cn("fixed lg:sticky top-0 z-40 w-[300px] h-[100dvh] lg:h-[calc(100vh-65px)] bg-[#FCFCFD] dark:bg-[#0F172A] border-r border-slate-200/70 dark:border-slate-800/80 flex flex-col")}
          >
            <div className="p-4 border-b border-slate-200/70 dark:border-slate-800/80">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-[8px] bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center shadow-sm">
                    <Sparkles className="h-3.5 w-3.5 text-white" />
                  </div>
                  <h3 className="font-semibold text-[13.5px] tracking-[-0.01em] text-slate-900 dark:text-slate-100">{t("chat.sidebar.title")}</h3>
                </div>
                <button onClick={onClose} className="lg:hidden h-7 w-7 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/[0.06] border border-transparent hover:border-slate-200 dark:hover:border-white/[0.08]">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <Button size="sm" className="w-full rounded-full gap-2 mb-3" onClick={onNewConversation}>
                <Plus className="h-4 w-4" />
                New conversation
              </Button>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t("chat.sidebar.searchPlaceholder")}
                  className="w-full h-9 pl-9 pr-3 rounded-[12px] text-[13px] font-[450] bg-white dark:bg-white/[0.04] border border-slate-200/70 dark:border-slate-700/50 focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 focus:border-[#2563EB]/40 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2.5 premium-scrollbar">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-14 px-4 text-center">
                  <div className="h-10 w-10 rounded-[12px] bg-slate-100 dark:bg-white/[0.06] border border-slate-200/60 dark:border-white/[0.08] flex items-center justify-center mb-3">
                    <MessageSquare className="h-5 w-5 text-slate-400" />
                  </div>
                  <p className="text-[12.5px] font-medium text-slate-500 dark:text-slate-400">{search ? "No conversations found" : t("chat.noConversations")}</p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Start a new chat with Liberty AI</p>
                </div>
              ) : (
                groupConversations(filtered).map((group) => (
                  <div key={group.label} className="mb-4">
                    <div className="px-2.5 py-1.5 text-[10.5px] font-bold tracking-[0.06em] uppercase text-slate-400 dark:text-slate-500">{group.label}</div>
                    <div className="space-y-0.5">
                      {group.items.map((conv) => (
                        <motion.button
                          key={conv.id}
                          whileHover={{ x: 1 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => onSelectConversation(conv.id)}
                          onMouseEnter={() => setHoveredId(conv.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          className={cn(
                            "w-full group flex items-center gap-2.5 px-3 py-2.5 rounded-[12px] text-left transition-all border",
                            activeConversationId === conv.id ? "bg-[#2563EB] text-white border-[#2563EB] shadow-[0_2px_8px_rgba(37,99,235,0.25)]" : "bg-white dark:bg-white/[0.03] border-slate-200/60 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/[0.10] hover:bg-slate-50 dark:hover:bg-white/[0.06] text-slate-700 dark:text-slate-300"
                          )}
                        >
                          <MessageSquare className={cn("h-4 w-4 shrink-0", activeConversationId === conv.id ? "text-white/80" : "text-slate-400 group-hover:text-slate-600")} />
                          <span className="flex-1 text-[13px] font-[450] tracking-[-0.01em] truncate">{conv.title}</span>
                          {hoveredId === conv.id && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteConversation(conv.id);
                              }}
                              className={cn("shrink-0 h-6 w-6 rounded-full flex items-center justify-center transition-colors", activeConversationId === conv.id ? "hover:bg-white/15 text-white/70 hover:text-white" : "hover:bg-[#FEF2F2] dark:hover:bg-[#7F1D1D]/20 text-slate-400 hover:text-[#EF4444]")}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 border-t border-slate-200/70 dark:border-slate-800/80">
              <div className="rounded-[12px] bg-[#F8FAFC] dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/[0.06] p-2.5 flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] flex items-center justify-center text-white text-[11px] font-bold">AI</div>
                <div className="min-w-0 flex-1">
                  <div className="text-[12px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-white">Liberty AI</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">GPT-4o • Multilingual</div>
                </div>
                <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
