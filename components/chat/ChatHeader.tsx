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
    <div className={cn("flex items-center gap-3 px-4 md:px-5 py-[14px] bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60 sticky top-0 z-10", className)}>
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
            <h2 className="text-[14px] font-bold tracking-[-0.01em] text-slate-900 dark:text-slate-100 truncate">{t("chat.assistantName")}</h2>
            <Badge variant="ai" size="sm" className="hidden sm:inline-flex">
              <Sparkles className="h-3 w-3 mr-1" />
              AI • GPT-4o
            </Badge>
            <span className="hidden md:inline-flex items-center gap-1 rounded-full bg-[#ECFDF5] dark:bg-[#064E3B]/30 border border-[#A7F3D0] dark:border-[#064E3B]/40 px-2 py-0.5 text-[10px] font-bold text-[#065F46] dark:text-[#6EE7B7]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
              Online
            </span>
          </div>
          <p className="text-[11px] font-[450] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1">
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
