"use client";

import React, { useState, useRef, useCallback, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useI18n } from "@/providers/I18nProvider";
import { Send, Loader2 } from "lucide-react";

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
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
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
    <div
      className={cn(
        "relative flex items-end gap-2 p-3 bg-white dark:bg-zinc-950",
        "border-t border-zinc-200 dark:border-zinc-800",
        className
      )}
    >
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
            "w-full resize-none rounded-xl border border-zinc-200 dark:border-zinc-800",
            "bg-zinc-50 dark:bg-zinc-900",
            "px-4 py-3 pr-12",
            "text-sm text-zinc-900 dark:text-zinc-100",
            "placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
            "focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "max-h-[160px]",
            "transition-colors duration-200"
          )}
          aria-label={t("chat.placeholder")}
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleSend}
        disabled={!message.trim() || isDisabled || isLoading}
        className={cn(
          "shrink-0 h-11 w-11 rounded-xl flex items-center justify-center",
          "bg-blue-600 text-white",
          "hover:bg-blue-700",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          "transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        )}
        aria-label={isLoading ? t("chat.thinking") : t("chat.sendAria")}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </motion.button>
    </div>
  );
}
