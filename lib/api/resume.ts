import { request } from "./client";
import type { ATSAnalysis, Resume } from "@/lib/types";

export type ResumeUploadResponse = Resume & { resume_id?: string };

export const resumeApi = {
  upload(file: File, signal?: AbortSignal) {
    const body = new FormData();
    body.append("file", file);
    return request<ResumeUploadResponse>({ method: "POST", url: "/api/v1/resumes/upload", data: body, headers: { "Content-Type": "multipart/form-data" } }, signal);
  },
  analyze(resumeId: string, signal?: AbortSignal) {
    return request<Resume>({ method: "POST", url: "/api/v1/resumes/analyze", data: { resume_id: resumeId } }, signal);
  },
  atsFeedback(resumeId: string, signal?: AbortSignal) {
    return request<ATSAnalysis>({ method: "POST", url: "/api/v1/resumes/ats-feedback", data: { resume_id: resumeId } }, signal);
  },
  details(resumeId: string, signal?: AbortSignal) {
    return request<Resume>({ method: "GET", url: `/api/v1/resumes/${encodeURIComponent(resumeId)}` }, signal);
  },
};
