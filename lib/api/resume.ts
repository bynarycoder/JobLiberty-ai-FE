import { request } from "./client";
import { mapATSAnalysis, mapResume } from "./mappers";
import type { ATSAnalysis, Resume } from "@/lib/types";

export type ResumeUploadResponse = Resume;

export const resumeApi = {
  async upload(file: File, signal?: AbortSignal): Promise<Resume> {
    const body = new FormData();
    // Common FastAPI field names — send the file under "file".
    body.append("file", file);
    const raw = await request<unknown>(
      {
        method: "POST",
        url: "/api/v1/resumes/upload",
        data: body,
        timeout: 120_000,
      },
      signal
    );
    return mapResume(raw);
  },

  async analyze(resumeId: string, signal?: AbortSignal): Promise<Resume> {
    const raw = await request<unknown>(
      {
        method: "POST",
        url: "/api/v1/resumes/analyze",
        data: { resume_id: resumeId },
        timeout: 120_000,
      },
      signal
    );
    const mapped = mapResume(raw);
    return { ...mapped, id: mapped.id || resumeId, resume_id: mapped.resume_id || resumeId };
  },

  async atsFeedback(resumeId: string, signal?: AbortSignal): Promise<ATSAnalysis> {
    const raw = await request<unknown>(
      {
        method: "POST",
        url: "/api/v1/resumes/ats-feedback",
        data: { resume_id: resumeId },
        timeout: 120_000,
      },
      signal
    );
    return mapATSAnalysis(raw);
  },

  async details(resumeId: string, signal?: AbortSignal): Promise<Resume> {
    const raw = await request<unknown>(
      {
        method: "GET",
        url: `/api/v1/resumes/${encodeURIComponent(resumeId)}`,
      },
      signal
    );
    const mapped = mapResume(raw);
    return { ...mapped, id: mapped.id || resumeId, resume_id: mapped.resume_id || resumeId };
  },
};
