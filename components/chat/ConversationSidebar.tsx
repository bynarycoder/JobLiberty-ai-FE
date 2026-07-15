"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { cn } from "@/lib/utils";
import { Search, MessageSquare, Trash2, X } from "lucide-react";
import type { Conversation } from "@/lib/types";

interface ConversationSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  onNewConversation: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function ConversationSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
  onNewConversation,
  isOpen,
  onClose,
}: ConversationSidebarProps) {
  const { t } = useI18n();
  const [search, setSearch] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(search.toLowerCase())
  );

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
          {/* Mobile overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "fixed lg:relative z-40",
              "w-[280px] h-full",
              "bg-white dark:bg-zinc-950",
              "border-r border-zinc-200 dark:border-zinc-800",
              "flex flex-col"
            )}
          >
            {/* Header */}
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                  {t("chat.sidebar.title")}
                </h3>
                <button
                  onClick={onClose}
                  className="lg:hidden h-7 w-7 rounded-lg flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t("chat.sidebar.searchPlaceholder")}
                  className="w-full h-8 pl-8 pr-3 rounded-lg text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
              </div>
            </div>

            {/* Conversations list */}
            <div className="flex-1 overflow-y-auto p-2">
              {filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <MessageSquare className="h-8 w-8 text-muted-foreground/40 mb-3" />
                  <p className="text-xs text-muted-foreground">
                    {search ? "No conversations found" : t("chat.noConversations")}
                  </p>
                </div>
              ) : (
                groupConversations(filteredConversations).map((group) => (
                  <div key={group.label} className="mb-3">
                    <div className="px-2 py-1 text-[10px] font-semibold text-muted-foreground tracking-wider uppercase">
                      {group.label}
                    </div>
                    {group.items.map((conv) => (
                      <motion.button
                        key={conv.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => onSelectConversation(conv.id)}
                        onMouseEnter={() => setHoveredId(conv.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className={cn(
                          "w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-left group transition-colors",
                          activeConversationId === conv.id
                            ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300"
                            : "hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
                        )}
                      >
                        <MessageSquare className="h-3.5 w-3.5 shrink-0 opacity-60" />
                        <span className="flex-1 text-xs truncate">{conv.title}</span>
                        {hoveredId === conv.id && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteConversation(conv.id);
                            }}
                            className="shrink-0 h-5 w-5 rounded flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-950/30 text-muted-foreground hover:text-red-500 transition-colors"
                            aria-label={t("chat.sidebar.deleteConversation")}
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </motion.button>
                    ))}
                  </div>
                ))
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
