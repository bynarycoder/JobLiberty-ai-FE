import type { ChatRequest, ChatResponse } from "@/lib/types";
import { chatApi } from "@/lib/api/chat";

/** Backend-only chat boundary. Provider selection remains entirely server-side. */
export function chatWithAI(request: ChatRequest, signal?: AbortSignal): Promise<ChatResponse> {
  return chatApi.send(request, signal);
}
