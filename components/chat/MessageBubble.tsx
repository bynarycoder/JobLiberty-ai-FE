"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useI18n } from "@/providers/I18nProvider";
import { AIAvatar } from "./AIAvatar";
import { Copy, Check, RefreshCw, User } from "lucide-react";
import type { ChatMessage } from "@/lib/types";

interface MessageBubbleProps {
  message: ChatMessage;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

// Simple markdown-like rendering (handles bold, italic, code, lists, headings)
function renderContent(content: string): React.ReactNode {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];

  let inCodeBlock = false;
  let codeContent = "";
  let codeLanguage = "";

  const processInlineFormatting = (text: string): React.ReactNode => {
    // Bold: **text**
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    // Bold
    const boldRegex = /\*\*(.+?)\*\*/g;
    // Inline code: `text`
    const codeRegex = /`([^`]+)`/g;

    // Combine patterns
    const combinedRegex = /(\*\*(.+?)\*\*|`([^`]+)`)/g;

    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = combinedRegex.exec(remaining)) !== null) {
      // Add text before match
      if (match.index > lastIndex) {
        parts.push(<span key={key++}>{remaining.slice(lastIndex, match.index)}</span>);
      }

      if (match[0].startsWith("**")) {
        parts.push(<strong key={key++}>{match[2]}</strong>);
      } else if (match[0].startsWith("`")) {
        parts.push(
          <code key={key++} className="px-1 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 text-[0.9em] font-mono">
            {match[3]}
          </code>
        );
      }

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < remaining.length) {
      parts.push(<span key={key++}>{remaining.slice(lastIndex)}</span>);
    }

    return parts.length > 0 ? parts : remaining;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block handling
    if (line.trimStart().startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <div key={i} className="relative my-2 rounded-lg bg-zinc-900 dark:bg-zinc-950 overflow-hidden">
            {codeLanguage && (
              <div className="flex items-center justify-between px-4 py-1.5 bg-zinc-800 dark:bg-zinc-900 text-xs text-zinc-400 font-mono">
                <span>{codeLanguage}</span>
              </div>
            )}
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm text-zinc-100 font-mono leading-relaxed">{codeContent}</code>
            </pre>
          </div>
        );
        codeContent = "";
        codeLanguage = "";
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeLanguage = line.trimStart().slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent += (codeContent ? "\n" : "") + line;
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      elements.push(<br key={i} />);
      continue;
    }

    // Headings
    if (/^#{1,3}\s/.test(line)) {
      const level = line.match(/^(#{1,3})/)![1].length;
      const text = line.replace(/^#{1,3}\s/, "");
      const headingClasses = {
        1: "text-lg font-bold mt-4 mb-2",
        2: "text-base font-bold mt-3 mb-1.5",
        3: "text-sm font-semibold mt-2 mb-1",
      };
      elements.push(
        <div key={i} className={headingClasses[level as 1 | 2 | 3]}>
          {processInlineFormatting(text)}
        </div>
      );
      continue;
    }

    // Unordered list
    if (/^[-•]\s/.test(line)) {
      const text = line.replace(/^[-•]\s/, "");
      elements.push(
        <div key={i} className="flex items-start gap-2 my-0.5">
          <span className="text-blue-500 mt-0.5 shrink-0">•</span>
          <span>{processInlineFormatting(text)}</span>
        </div>
      );
      continue;
    }

    // Ordered list
    if (/^\d+[.)]\s/.test(line)) {
      const num = line.match(/^(\d+)/)![1];
      const text = line.replace(/^\d+[.)]\s/, "");
      elements.push(
        <div key={i} className="flex items-start gap-2 my-0.5">
          <span className="text-blue-500 mt-0.5 shrink-0 font-mono text-xs min-w-[1.5em]">{num}.</span>
          <span>{processInlineFormatting(text)}</span>
        </div>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="my-1 leading-relaxed">
        {processInlineFormatting(line)}
      </p>
    );
  }

  // Unclosed code block
  if (inCodeBlock) {
    elements.push(
      <div key="unclosed" className="relative my-2 rounded-lg bg-zinc-900 dark:bg-zinc-950 overflow-hidden">
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm text-zinc-100 font-mono">{codeContent}</code>
        </pre>
      </div>
    );
  }

  return elements;
}

export function MessageBubble({ message, onRegenerate, isRegenerating }: MessageBubbleProps) {
  const { t } = useI18n();
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = message.content;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [message.content]);

  const timeStr = useMemo(() => {
    try {
      return new Date(message.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  }, [message.timestamp]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "flex gap-3 py-3 group",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="shrink-0 mt-0.5">
          <AIAvatar size="sm" showSparkles={false} />
        </div>
      )}

      <div
        className={cn(
          "flex flex-col max-w-[85%] md:max-w-[75%]",
          isUser ? "items-end" : "items-start"
        )}
      >
        {/* Sender label */}
        {!isUser && (
          <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400 mb-1 px-1">
            {t("chat.assistantName")}
          </span>
        )}

        {/* Bubble */}
        <div
          className={cn(
            "relative px-4 py-3 rounded-2xl text-sm leading-relaxed",
            isUser
              ? "bg-blue-600 text-white rounded-br-md"
              : "bg-secondary dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-bl-sm"
          )}
          role="article"
          aria-label={isUser ? "Your message" : "Liberty AI message"}
        >
          <div className={cn("prose-sm max-w-none", isUser ? "prose-invert" : "dark:prose-invert")}>
            {renderContent(message.content)}
          </div>
        </div>

        {/* Actions row */}
        <div
          className={cn(
            "flex items-center gap-1 mt-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
            isUser ? "flex-row-reverse" : "flex-row"
          )}
        >
          <span className="text-[10px] text-muted-foreground">{timeStr}</span>

          {!isUser && (
            <>
              <button
                onClick={handleCopy}
                className="inline-flex items-center justify-center h-6 w-6 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                title={copied ? t("chat.copied") : t("chat.copyResponse")}
                aria-label={copied ? t("chat.copied") : t("chat.copyResponse")}
              >
                {copied ? (
                  <Check className="h-3 w-3 text-emerald-500" />
                ) : (
                  <Copy className="h-3 w-3 text-muted-foreground" />
                )}
              </button>

              {onRegenerate && (
                <button
                  onClick={onRegenerate}
                  disabled={isRegenerating}
                  className="inline-flex items-center justify-center h-6 w-6 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
                  title={t("chat.regenerate")}
                  aria-label={t("chat.regenerate")}
                >
                  <RefreshCw
                    className={cn(
                      "h-3 w-3 text-muted-foreground",
                      isRegenerating && "animate-spin"
                    )}
                  />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {isUser && (
        <div className="shrink-0 mt-0.5">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
            <User className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      )}
    </motion.div>
  );
}
