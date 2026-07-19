import { request } from "./client";
import { mapChatResponse } from "./mappers";
import type { ChatRequest, ChatResponse } from "@/lib/types";

export const chatApi = {
  async send(payload: ChatRequest, signal?: AbortSignal): Promise<ChatResponse> {
    // Backend owns provider selection (Groq). Send a lean history payload.
    const body = {
      message: payload.message,
      language: payload.language,
      history: (payload.history ?? []).map((m) => ({
        role: m.role,
        content: m.content,
      })),
    };

    const raw = await request<unknown>(
      {
        method: "POST",
        url: "/api/v1/chat",
        data: body,
        timeout: 90_000,
      },
      signal
    );
    return mapChatResponse(raw);
  },
};
