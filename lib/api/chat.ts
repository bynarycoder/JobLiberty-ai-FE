import { request } from "./client";
import type { ChatRequest, ChatResponse } from "@/lib/types";

export const chatApi = { send(payload: ChatRequest, signal?: AbortSignal) { return request<ChatResponse>({ method: "POST", url: "/api/v1/chat", data: payload }, signal); } };
