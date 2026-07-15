"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useI18n } from "@/providers/I18nProvider";
import { AIAvatar } from "./AIAvatar";
import { LanguageBadge } from "./LanguageBadge";
import { Trash2, Plus, PanelLeftClose, PanelLeft } from "lucide-react";

interface ChatHeaderProps {
  onClearConversation: () => void;
  onNewConversation: () => void;
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
  hasMessages: boolean;
  className?: string;
}

export function ChatHeader({
  onClearConversation,
  onNewConversation,
  onToggleSidebar,
  sidebarOpen = true,
  hasMessages,
  className,
}: ChatHeaderProps) {
  const { t } = useI18n();

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3",
        "bg-white dark:bg-zinc-950",
        "border-b border-zinc-200 dark:border-zinc-800",
        className
      )}
    >
      {/* Sidebar toggle */}
      {onToggleSidebar && (
        <button
          onClick={onToggleSidebar}
          className="shrink-0 h-9 w-9 rounded-lg flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {sidebarOpen ? (
            <PanelLeftClose className="h-4 w-4 text-muted-foreground" />
          ) : (
            <PanelLeft className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      )}

      {/* AI Avatar and title */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <AIAvatar size="sm" showSparkles={true} />
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
            {t("chat.assistantName")}
          </h2>
          <p className="text-[11px] text-muted-foreground truncate">
            {t("chat.subtitle")}
          </p>
        </div>
        <LanguageBadge />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {hasMessages && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onClearConversation}
            className="h-8 px-3 rounded-lg text-xs font-medium flex items-center gap-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            title={t("chat.clearConversation")}
            aria-label={t("chat.clearConversation")}
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t("chat.clearConversation")}</span>
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onNewConversation}
          className="h-8 px-3 rounded-lg text-xs font-medium flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-950 transition-colors"
          title={t("chat.newConversation")}
          aria-label={t("chat.newConversation")}
        >
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{t("chat.newConversation")}</span>
        </motion.button>
      </div>
    </div>
  );
}
