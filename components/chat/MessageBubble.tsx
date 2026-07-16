"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useI18n } from "@/providers/I18nProvider";
import { AIAvatar } from "./AIAvatar";
import { Copy, Check, RefreshCw, User, Sparkles } from "lucide-react";
import type { ChatMessage } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";

interface MessageBubbleProps {
  message: ChatMessage;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

function renderContent(content: string): React.ReactNode {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeContent = "";
  let codeLanguage = "";

  const processInlineFormatting = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;
    const combinedRegex = /(\*\*(.+?)\*\*|`([^`]+)`)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = combinedRegex.exec(remaining)) !== null) {
      if (match.index > lastIndex) parts.push(<span key={key++}>{remaining.slice(lastIndex, match.index)}</span>);
      if (match[0].startsWith("**")) parts.push(<strong key={key++} className="font-semibold text-slate-900 dark:text-slate-100">{match[2]}</strong>);
      else if (match[0].startsWith("`")) parts.push(<code key={key++} className="px-1.5 py-0.5 rounded-[6px] bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 text-[0.9em] font-mono font-medium">{match[3]}</code>);
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < remaining.length) parts.push(<span key={key++}>{remaining.slice(lastIndex)}</span>);
    return parts.length > 0 ? parts : remaining;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trimStart().startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <div key={i} className="relative my-3 rounded-[12px] bg-[#0F172A] border border-slate-800 overflow-hidden shadow-sm">
            {codeLanguage && <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-400"><span>{codeLanguage}</span><span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />verified</span></div>}
            <pre className="p-4 overflow-x-auto"><code className="text-[13px] text-slate-100 font-mono leading-relaxed">{codeContent}</code></pre>
          </div>
        );
        codeContent = ""; codeLanguage = ""; inCodeBlock = false;
      } else { inCodeBlock = true; codeLanguage = line.trimStart().slice(3).trim(); }
      continue;
    }
    if (inCodeBlock) { codeContent += (codeContent ? "\n" : "") + line; continue; }
    if (line.trim() === "") { elements.push(<div key={i} className="h-2" />); continue; }
    if (/^#{1,3}\s/.test(line)) {
      const level = line.match(/^(#{1,3})/)![1].length;
      const text = line.replace(/^#{1,3}\s/, "");
      const headingClasses = { 1: "text-[17px] font-bold mt-4 mb-2 tracking-[-0.02em]", 2: "text-[15px] font-bold mt-3 mb-1.5 tracking-[-0.01em]", 3: "text-[13px] font-semibold mt-2 mb-1" } as const;
      elements.push(<div key={i} className={headingClasses[level as 1 | 2 | 3]}>{processInlineFormatting(text)}</div>);
      continue;
    }
    if (/^[-•]\s/.test(line)) {
      const text = line.replace(/^[-•]\s/, "");
      elements.push(<div key={i} className="flex items-start gap-2 my-1"><span className="mt-[8px] h-1 w-1 rounded-full bg-[#2563EB] shrink-0" /><span className="flex-1">{processInlineFormatting(text)}</span></div>);
      continue;
    }
    if (/^\d+[.)]\s/.test(line)) {
      const num = line.match(/^(\d+)/)![1];
      const text = line.replace(/^\d+[.)]\s/, "");
      elements.push(<div key={i} className="flex items-start gap-2 my-1"><span className="mt-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 border border-[#DBEAFE] dark:border-[#1E3A8A]/30 text-[10px] font-bold text-[#2563EB] dark:text-[#60A5FA]">{num}</span><span className="flex-1">{processInlineFormatting(text)}</span></div>);
      continue;
    }
    elements.push(<p key={i} className="my-1 leading-[1.7] tracking-[-0.01em]">{processInlineFormatting(line)}</p>);
  }
  if (inCodeBlock) {
    elements.push(<div key="unclosed" className="relative my-2 rounded-[12px] bg-[#0F172A] overflow-hidden"><pre className="p-4 overflow-x-auto"><code className="text-sm text-slate-100 font-mono">{codeContent}</code></pre></div>);
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
    try { return new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); } catch { return ""; }
  }, [message.timestamp]);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className={cn("flex gap-3 py-4 group", isUser ? "justify-end" : "justify-start")}>
      {!isUser && <div className="shrink-0 mt-0.5"><AIAvatar size="sm" showSparkles={false} /></div>}

      <div className={cn("flex flex-col max-w-[85%] md:max-w-[72%]", isUser ? "items-end" : "items-start")}>
        {!isUser && (
          <div className="flex items-center gap-2 mb-1.5 px-1">
            <span className="text-[11px] font-semibold tracking-[0.04em] uppercase text-[#2563EB] dark:text-[#60A5FA]">Liberty AI</span>
            <Badge variant="ai" size="sm" className="h-4 px-1.5 text-[9px]">GPT-4o</Badge>
          </div>
        )}

        <div
          className={cn(
            "relative px-[18px] py-[14px] rounded-[18px] text-[14px] leading-[1.6] tracking-[-0.01em] shadow-sm transition-all duration-200",
            isUser ? "bg-[#2563EB] text-white rounded-br-[6px] shadow-[0_2px_8px_rgba(37,99,235,0.25)]" : "bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 border border-slate-200/60 dark:border-slate-700/50 rounded-bl-[6px] hover:shadow-[0_4px_12px_rgba(15,23,42,0.06)]"
          )}
          role="article"
        >
          {!isUser && <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[18px] bg-gradient-to-b from-[#2563EB] to-[#7C3AED] opacity-60 group-hover:opacity-100 transition-opacity" />}
          <div className={cn("prose-sm max-w-none", isUser ? "prose-invert" : "")}>{renderContent(message.content)}</div>
        </div>

        <div className={cn("flex items-center gap-1.5 mt-2 px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200", isUser ? "flex-row-reverse" : "flex-row")}>
          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">{timeStr}</span>
          {!isUser && (
            <>
              <button onClick={handleCopy} className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow hover:border-slate-300 dark:hover:border-slate-600 transition-all">
                {copied ? <Check className="h-3.5 w-3.5 text-[#10B981]" /> : <Copy className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />}
              </button>
              {onRegenerate && (
                <button onClick={onRegenerate} disabled={isRegenerating} className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow hover:border-slate-300 dark:hover:border-slate-600 transition-all disabled:opacity-50">
                  <RefreshCw className={cn("h-3.5 w-3.5 text-slate-500 dark:text-slate-400", isRegenerating && "animate-spin")} />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {isUser && (
        <div className="shrink-0 mt-0.5">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-sm ring-1 ring-black/5 dark:ring-white/10">
            <User className="h-4 w-4 text-white" />
          </div>
        </div>
      )}
    </motion.div>
  );
}
