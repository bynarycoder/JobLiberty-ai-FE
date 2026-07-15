"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { SuggestionCard } from "./SuggestionCard";
import { AIAvatar } from "./AIAvatar";
import { ChatInput } from "./ChatInput";
import type { ChatMessage } from "@/lib/types";
import {
  FileText,
  Lightbulb,
  Compass,
  Mic,
  Sparkles,
  GraduationCap,
  AlertCircle,
} from "lucide-react";

interface ChatWindowProps {
  messages: ChatMessage[];
  isLoading: boolean;
  isError: boolean;
  onSendMessage: (message: string) => void;
  onRegenerate: (messageId: string) => void;
  isRegenerating: boolean;
  regeneratingMessageId: string | null;
}

export function ChatWindow({
  messages,
  isLoading,
  isError,
  onSendMessage,
  onRegenerate,
  isRegenerating,
  regeneratingMessageId,
}: ChatWindowProps) {
  const { t } = useI18n();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const isEmpty = messages.length === 0;

  const suggestions = [
    { icon: FileText, label: t("chat.suggestions.reviewResume"), prompt: "Review my resume" },
    { icon: Lightbulb, label: t("chat.suggestions.skillsToLearn"), prompt: "What skills should I learn?" },
    { icon: Compass, label: t("chat.suggestions.careerPath"), prompt: "Find my career path" },
    { icon: Mic, label: t("chat.suggestions.interviewPrep"), prompt: "How do I prepare for interviews?" },
    { icon: Sparkles, label: t("chat.suggestions.improveCV"), prompt: "Improve my CV" },
    { icon: GraduationCap, label: t("chat.suggestions.freeCourses"), prompt: "Recommend free courses" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-4 md:px-6 py-6"
      >
        {isEmpty ? (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-full max-w-lg mx-auto text-center"
          >
            <AIAvatar size="lg" showSparkles={true} className="mb-6" />

            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">
              {t("chat.emptyTitle")}
            </h1>
            <p className="text-base font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              {t("chat.emptySubtitle")}
            </p>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed max-w-sm">
              {t("chat.emptyDescription")}
            </p>

            <p className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">
              {t("chat.emptyPrompt")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
              {suggestions.map((suggestion) => (
                <SuggestionCard
                  key={suggestion.prompt}
                  icon={suggestion.icon}
                  label={suggestion.label}
                  onClick={() => onSendMessage(suggestion.prompt)}
                />
              ))}
            </div>

            {/* Tips */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 text-left"
                >
                  <span className="shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-950/50 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                    {n}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {t(`chat.emptyState.tip${n}`)}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Messages */
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="popLayout">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  onRegenerate={
                    message.role === "assistant"
                      ? () => onRegenerate(message.id)
                      : undefined
                  }
                  isRegenerating={
                    isRegenerating && regeneratingMessageId === message.id
                  }
                />
              ))}
            </AnimatePresence>

            {/* Loading indicator */}
            <AnimatePresence>
              {isLoading && <TypingIndicator key="typing" />}
            </AnimatePresence>

            {/* Error state */}
            <AnimatePresence>
              {isError && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-start gap-3 py-3"
                >
                  <div className="shrink-0 w-8 h-8 rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30">
                      <p className="text-sm font-medium text-red-700 dark:text-red-300 mb-1">
                        {t("chat.errorTitle")}
                      </p>
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {t("chat.errorMessage")}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        // Retry by resending the last user message
                        const lastUserMsg = [...messages]
                          .reverse()
                          .find((m) => m.role === "user");
                        if (lastUserMsg) {
                          onSendMessage(lastUserMsg.content);
                        }
                      }}
                      className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline self-start ml-1"
                    >
                      {t("chat.retry")}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </div>
  );
}
