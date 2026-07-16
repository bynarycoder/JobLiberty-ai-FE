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
    <div className={cn("relative border-t border-border/60 p-3 md:p-4 glass", className)}>
      <div className="mx-auto max-w-3xl">
        <div className="relative flex items-end gap-2.5 rounded-[20px] border border-border bg-card/90 p-2.5 shadow-sm transition-all duration-200 focus-within:border-[#7C3AED]/50 focus-within:shadow-[0_0_0_4px_rgba(124,58,237,0.10),0_10px_30px_-8px_rgba(124,58,237,0.25)] focus-within:ring-0">
          {/* Gradient focus strip */}
          <span className="pointer-events-none absolute inset-x-6 top-0 h-[2px] bg-gradient-to-r from-[#7C3AED] to-[#2563EB] opacity-0 transition-opacity duration-300 [.focus-within_&]:opacity-100" />
          <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card-muted text-muted-foreground transition-all hover:border-[#7C3AED]/40 hover:text-[#7C3AED]">
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
              "flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full transition-all duration-200",
              message.trim()
                ? "bg-[linear-gradient(135deg,#7C3AED,#4F46E5_55%,#2563EB)] text-white shadow-[0_6px_16px_-2px_rgba(124,58,237,0.5)] hover:-translate-y-[1px] hover:shadow-[0_10px_24px_-4px_rgba(124,58,237,0.55)]"
                : "border border-border bg-card-muted text-muted-foreground/60",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-2"
            )}
            aria-label={isLoading ? t("chat.thinking") : t("chat.sendAria")}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </motion.button>
        </div>

        <div className="mt-2.5 flex items-center justify-center gap-2 text-[11px] text-muted-foreground/80">
          <Sparkles className="h-3 w-3 text-[#7C3AED]" />
          <span>Liberty AI can make mistakes. Verify important info. • Built for 3MTT NextGen 2026</span>
        </div>
      </div>
    </div>
  );
}
