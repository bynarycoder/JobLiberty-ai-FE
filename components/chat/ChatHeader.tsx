"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useI18n } from "@/providers/I18nProvider";
import { AIAvatar } from "./AIAvatar";
import { LanguageBadge } from "./LanguageBadge";
import { Trash2, Plus, PanelLeftClose, PanelLeft, Sparkles, Zap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface ChatHeaderProps {
  onClearConversation: () => void;
  onNewConversation: () => void;
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
  hasMessages: boolean;
  className?: string;
}

export function ChatHeader({ onClearConversation, onNewConversation, onToggleSidebar, sidebarOpen = true, hasMessages, className }: ChatHeaderProps) {
  const { t } = useI18n();

  return (
    <div className={cn("sticky top-0 z-10 flex items-center gap-3 border-b border-border/60 px-4 py-[12px] md:px-5 glass", className)}>
      {/* Gradient underline */}
      <span className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-[2px] bg-[linear-gradient(90deg,transparent,rgba(124,58,237,0.75)_30%,rgba(37,99,235,0.75)_70%,transparent)] bg-[length:200%_100%] animate-gradient-pan" />
      {onToggleSidebar && (
        <button
          onClick={onToggleSidebar}
          className="shrink-0 h-9 w-9 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/[0.06] border border-transparent hover:border-slate-200 dark:hover:border-white/[0.08] transition-colors"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {sidebarOpen ? <PanelLeftClose className="h-4 w-4 text-slate-500" /> : <PanelLeft className="h-4 w-4 text-slate-500" />}
        </button>
      )}

      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="relative">
          <AIAvatar size="sm" showSparkles={true} pulse />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="truncate bg-gradient-to-r from-[#7C3AED] to-[#2563EB] bg-clip-text text-[15px] font-extrabold tracking-[-0.01em] text-transparent dark:from-[#B691FF] dark:to-[#7FA8FF]">
              {t("chat.assistantName")}
            </h2>
            <Badge variant="ai" size="sm" className="hidden sm:inline-flex">
              <Sparkles className="h-3 w-3 mr-1" />
              AI • GPT-4o
            </Badge>
            <span className="hidden items-center gap-1 rounded-full bg-[#E4F9EC] px-2 py-0.5 text-[10px] font-bold text-[#16A34A] ring-1 ring-[#22C55E]/25 dark:bg-[#22C55E]/12 dark:text-[#4ADE80] md:inline-flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#22C55E]" />
              Online
            </span>
          </div>
          <p className="flex items-center gap-1 truncate text-[11px] font-[450] text-muted-foreground">
            {t("chat.subtitle")} • <Zap className="h-3 w-3 text-[#F59E0B]" /> Empowering your career journey
          </p>
        </div>
        <LanguageBadge />
      </div>

      <div className="flex items-center gap-1.5">
        {hasMessages && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClearConversation}
            className="h-8 px-3 rounded-full text-[12px] font-medium flex items-center gap-1.5 text-[#DC2626] dark:text-[#FCA5A5] hover:bg-[#FEF2F2] dark:hover:bg-[#7F1D1D]/20 border border-transparent hover:border-[#FECACA] dark:hover:border-[#7F1D1D]/30 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onNewConversation}
          className="h-8 px-3.5 rounded-full text-[12px] font-semibold flex items-center gap-1.5 bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-[0_2px_8px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition-all"
        >
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">New chat</span>
        </motion.button>
      </div>
    </div>
  );
}
