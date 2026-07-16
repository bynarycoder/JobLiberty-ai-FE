"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { AIAvatar } from "./AIAvatar";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/lib/types";
import {
  FileText,
  Lightbulb,
  Compass,
  Mic,
  Sparkles,
  GraduationCap,
  AlertCircle,
  ArrowUpRight,
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
    { icon: FileText, label: t("chat.suggestions.reviewResume"), prompt: "Review my resume", chip: "bg-[#E8F0FF] text-[#2563EB] dark:bg-[#2563EB]/15 dark:text-[#7FA8FF]" },
    { icon: Lightbulb, label: t("chat.suggestions.skillsToLearn"), prompt: "What skills should I learn?", chip: "bg-[#FEF3DF] text-[#D97706] dark:bg-[#F59E0B]/15 dark:text-[#FBBF24]" },
    { icon: Compass, label: t("chat.suggestions.careerPath"), prompt: "Find my career path", chip: "bg-[#E3F9F0] text-[#059669] dark:bg-[#10B981]/15 dark:text-[#4ADEAC]" },
    { icon: Mic, label: t("chat.suggestions.interviewPrep"), prompt: "How do I prepare for interviews?", chip: "bg-[#FDEAEA] text-[#DC2626] dark:bg-[#EF4444]/15 dark:text-[#F98B8B]" },
    { icon: Sparkles, label: t("chat.suggestions.improveCV"), prompt: "Improve my CV", chip: "bg-[#F0EAFE] text-[#7C3AED] dark:bg-[#7C3AED]/18 dark:text-[#B691FF]" },
    { icon: GraduationCap, label: t("chat.suggestions.freeCourses"), prompt: "Recommend free courses", chip: "bg-[#DEF6F3] text-[#0D9488] dark:bg-[#14B8A6]/15 dark:text-[#4FE0D0]" },
  ];

  return (
    <div className="flex h-full flex-col">
      {/* Messages area */}
      <div ref={scrollContainerRef} className="premium-scrollbar flex-1 overflow-y-auto px-4 py-6 md:px-6">
        {isEmpty ? (
          /* ── Liberty AI welcome — purple/blue brand moment ── */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto flex h-full max-w-[620px] flex-col items-center justify-center text-center"
          >
            <div className="relative mb-7">
              <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.22),transparent_65%)] blur-xl" />
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}>
                <AIAvatar size="xl" showSparkles pulse />
              </motion.div>
            </div>

            <h1 className="bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] bg-clip-text text-[28px] font-extrabold tracking-[-0.03em] text-transparent sm:text-[34px]">
              {t("chat.emptyTitle")}
            </h1>
            <p className="mt-2 text-[15px] font-semibold text-foreground/80">{t("chat.emptySubtitle")}</p>
            <p className="mb-8 mt-1 max-w-[46ch] text-[13.5px] leading-relaxed text-muted-foreground">{t("chat.emptyDescription")}</p>

            <p className="mb-4 text-[10.5px] font-bold uppercase tracking-[0.12em] text-muted-foreground/80">{t("chat.emptyPrompt")}</p>

            <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2">
              {suggestions.map((s, i) => (
                <motion.button
                  key={s.prompt}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -3, scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSendMessage(s.prompt)}
                  className="glass group flex items-center gap-3 rounded-[15px] px-4 py-3.5 text-left shadow-sm transition-shadow hover:shadow-lg"
                >
                  <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6", s.chip)}>
                    <s.icon className="h-4 w-4" />
                  </span>
                  <span className="flex-1 text-[13.5px] font-[550] tracking-[-0.01em]">{s.label}</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#2563EB] text-white opacity-0 shadow-sm transition-all group-hover:opacity-100">
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Tips */}
            <div className="mt-8 grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="flex items-start gap-2.5 rounded-[12px] bg-card/60 px-3 py-2.5 text-left backdrop-blur-sm ring-1 ring-border/50">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#2563EB] text-[10px] font-extrabold text-white shadow-sm">
                    {n}
                  </span>
                  <span className="text-[12px] leading-[1.5] text-muted-foreground">{t(`chat.emptyState.tip${n}`)}</span>
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
