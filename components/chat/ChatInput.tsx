"use client";

import React, { useState, useRef, useCallback, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useI18n } from "@/providers/I18nProvider";
import { Send, Loader2, Sparkles, Plus } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

export function ChatInput({ onSend, isDisabled = false, isLoading = false, className }: ChatInputProps) {
  const { t } = useI18n();
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 160) + "px";
  }, []);

  const handleSend = useCallback(() => {
    const trimmed = message.trim();
    if (!trimmed || isDisabled || isLoading) return;
    onSend(trimmed);
    setMessage("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }, [message, isDisabled, isLoading, onSend]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(e.target.value);
      adjustTextareaHeight();
    },
    [adjustTextareaHeight]
  );

  return (
    <div className={cn("relative p-3 md:p-4 bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-800/60", className)}>
      <div className="max-w-3xl mx-auto">
        <div className="relative flex items-end gap-2.5 rounded-[20px] border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#1E293B] shadow-[0_2px_12px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] p-2.5 transition-all duration-200 focus-within:border-[#2563EB]/40 focus-within:ring-[4px] focus-within:ring-[#2563EB]/[0.08] focus-within:shadow-[0_0_0_4px_rgba(37,99,235,0.08),0_4px_20px_rgba(15,23,42,0.08)]">
          <button className="shrink-0 h-9 w-9 rounded-full bg-slate-50 dark:bg-white/[0.06] border border-slate-200/60 dark:border-white/[0.08] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
            <Plus className="h-4 w-4" />
          </button>

          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder={t("chat.placeholder")}
              disabled={isDisabled}
              rows={1}
              className={cn(
                "w-full resize-none bg-transparent px-1 py-2",
                "text-[14px] leading-[1.6] tracking-[-0.01em] font-[450] text-slate-900 dark:text-slate-100",
                "placeholder:text-slate-400 dark:placeholder:text-slate-500",
                "focus:outline-none",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "max-h-[160px] min-h-[24px]"
              )}
              aria-label={t("chat.placeholder")}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSend}
            disabled={!message.trim() || isDisabled || isLoading}
            className={cn(
              "shrink-0 h-[40px] w-[40px] rounded-full flex items-center justify-center transition-all duration-200",
              message.trim()
                ? "bg-gradient-to-br from-[#2563EB] to-[#4F46E5] text-white shadow-[0_2px_8px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:translate-y-[-1px]"
                : "bg-slate-100 dark:bg-white/[0.06] text-slate-400 dark:text-slate-500 border border-slate-200/60 dark:border-white/[0.08]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
            )}
            aria-label={isLoading ? t("chat.thinking") : t("chat.sendAria")}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </motion.button>
        </div>

        <div className="mt-2.5 flex items-center justify-center gap-2 text-[11px] text-slate-400 dark:text-slate-500">
          <Sparkles className="h-3 w-3 text-[#7C3AED]" />
          <span>Liberty AI can make mistakes. Verify important info. • Built for 3MTT NextGen 2026</span>
        </div>
      </div>
    </div>
  );
}
