"use client";

import React, { useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useI18n } from "@/providers/I18nProvider";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ConversationSidebar } from "@/components/chat/ConversationSidebar";
import { chatWithAI } from "@/lib/services/chat";
import type { ChatMessage, Conversation } from "@/lib/types";

function generateId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function generateConvId(): string {
  return `conv_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export default function ChatPage() {
  const { t, language } = useI18n();

  // State
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [regeneratingMessageId, setRegeneratingMessageId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chatMutation = useMutation({ mutationFn: (request: import("@/lib/types").ChatRequest) => chatWithAI(request) });

  // Derive active messages
  const activeConversation = conversations.find((c) => c.id === activeConversationId) ?? null;
  const messages = activeConversation?.messages ?? [];

  // ─── Helpers ──────────────────────────────────────────────

  const createConversation = useCallback(
    (firstMessage?: ChatMessage): Conversation => {
      const id = generateConvId();
      const title = firstMessage
        ? firstMessage.content.slice(0, 40) + (firstMessage.content.length > 40 ? "..." : "")
        : t("chat.newConversation");
      return {
        id,
        title,
        messages: firstMessage ? [firstMessage] : [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        language,
      };
    },
    [language, t]
  );

  const pushMessage = useCallback(
    (convId: string, message: ChatMessage) => {
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === convId) {
            return {
              ...c,
              messages: [...c.messages, message],
              updatedAt: new Date().toISOString(),
              title:
                c.messages.length === 0 && message.role === "user"
                  ? message.content.slice(0, 40) +
                    (message.content.length > 40 ? "..." : "")
                  : c.title,
            };
          }
          return c;
        })
      );
    },
    []
  );

  const removeLastAssistantMessage = useCallback((convId: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === convId) {
          const msgs = [...c.messages];
          // Remove the last assistant message
          for (let i = msgs.length - 1; i >= 0; i--) {
            if (msgs[i].role === "assistant") {
              msgs.splice(i, 1);
              break;
            }
          }
          return { ...c, messages: msgs, updatedAt: new Date().toISOString() };
        }
        return c;
      })
    );
  }, []);

  // ─── Actions ──────────────────────────────────────────────

  const handleSendMessage = useCallback(
    async (content: string) => {
      setIsError(false);

      let convId = activeConversationId;
      const userMessage: ChatMessage = {
        id: generateId(),
        role: "user",
        content,
        timestamp: new Date().toISOString(),
      };

      // Create conversation if needed
      if (!convId) {
        const newConv = createConversation(userMessage);
        setConversations((prev) => [...prev, newConv]);
        convId = newConv.id;
        setActiveConversationId(convId);
      } else {
        pushMessage(convId, userMessage);
      }

      // Call AI
      setIsLoading(true);
      try {
        const response = await chatMutation.mutateAsync({
          message: content,
          history: activeConversation?.messages ?? [],
          language,
        });

        const aiMessage: ChatMessage = {
          id: generateId(),
          role: "assistant",
          content: response.reply,
          timestamp: new Date().toISOString(),
        };

        pushMessage(convId, aiMessage);
      } catch (error) {
        console.error("Chat error:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [activeConversationId, activeConversation, language, createConversation, pushMessage]
  );

  const handleRegenerate = useCallback(
    async (messageId: string) => {
      setIsRegenerating(true);
      setRegeneratingMessageId(messageId);

      const convId = activeConversationId;
      if (!convId) return;

      // Find the user message before this assistant message
      const conv = conversations.find((c) => c.id === convId);
      if (!conv) return;

      const msgIndex = conv.messages.findIndex((m) => m.id === messageId);
      if (msgIndex <= 0) return;

      const userMessage = conv.messages[msgIndex - 1];
      if (userMessage.role !== "user") return;

      // Remove the old assistant message
      removeLastAssistantMessage(convId);

      try {
        const response = await chatMutation.mutateAsync({
          message: userMessage.content,
          history: conv.messages.slice(0, msgIndex - 1),
          language,
        });

        const aiMessage: ChatMessage = {
          id: generateId(),
          role: "assistant",
          content: response.reply,
          timestamp: new Date().toISOString(),
        };

        pushMessage(convId, aiMessage);
      } catch (error) {
        console.error("Regenerate error:", error);
        setIsError(true);
      } finally {
        setIsRegenerating(false);
        setRegeneratingMessageId(null);
      }
    },
    [activeConversationId, conversations, language, pushMessage, removeLastAssistantMessage]
  );

  const handleClearConversation = useCallback(() => {
    if (!activeConversationId) return;
    if (!window.confirm(t("chat.clearConfirm"))) return;

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConversationId) {
          return {
            ...c,
            messages: [],
            updatedAt: new Date().toISOString(),
            title: t("chat.newConversation"),
          };
        }
        return c;
      })
    );
    toast.success("Conversation cleared");
  }, [activeConversationId, t]);

  const handleNewConversation = useCallback(() => {
    setActiveConversationId(null);
    setSidebarOpen(false);
  }, []);

  const handleSelectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
    setSidebarOpen(false);
  }, []);

  const handleDeleteConversation = useCallback(
    (id: string) => {
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (activeConversationId === id) {
        setActiveConversationId(null);
      }
      toast.success("Conversation deleted");
    },
    [activeConversationId]
  );

  return (
    <div className="relative -mx-4 -mt-5 flex h-[calc(100dvh-66px)] overflow-hidden sm:-mx-5 lg:-mx-8 lg:-mt-7">
      {/* Aurora background wash */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(at_20%_0%,rgba(124,58,237,0.10),transparent_45%),radial-gradient(at_85%_15%,rgba(37,99,235,0.10),transparent_45%),radial-gradient(at_50%_110%,rgba(16,185,129,0.08),transparent_50%)] dark:bg-[radial-gradient(at_20%_0%,rgba(124,58,237,0.16),transparent_50%),radial-gradient(at_85%_15%,rgba(37,99,235,0.14),transparent_50%),radial-gradient(at_50%_110%,rgba(16,185,129,0.10),transparent_55%)]" />
      </div>
      {/* Sidebar */}
      <ConversationSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onDeleteConversation={handleDeleteConversation}
        onNewConversation={handleNewConversation}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Chat Header */}
        <ChatHeader
          onClearConversation={handleClearConversation}
          onNewConversation={handleNewConversation}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          sidebarOpen={sidebarOpen}
          hasMessages={messages.length > 0}
        />

        {/* Chat Messages */}
        <div className="flex-1 flex flex-col min-h-0">
          <ChatWindow
            messages={messages}
            isLoading={isLoading}
            isError={isError}
            onSendMessage={handleSendMessage}
            onRegenerate={handleRegenerate}
            isRegenerating={isRegenerating}
            regeneratingMessageId={regeneratingMessageId}
          />

          {/* Chat Input */}
          <ChatInput
            onSend={handleSendMessage}
            isDisabled={false}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
