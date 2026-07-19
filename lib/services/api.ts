import type { Resume, Job, ATSAnalysis, SkillGap, CareerResource, InterviewQuestion, Report, CareerRoadmap, DashboardStats, Notification, RecentActivity, SignUpInput } from "@/lib/types";
import { ApiError } from "@/lib/api/client";
import { resumeApi } from "@/lib/api/resume";
import { jobsApi } from "@/lib/api/jobs";
import { roadmapApi } from "@/lib/api/roadmap";

const resumeId = () => typeof window === "undefined" ? undefined : window.localStorage.getItem("jobliberty_resume_id") ?? undefined;
const unsupported = (name: string): never => { throw new ApiError(`${name} is not available from the production API.`, 404, "not_found"); };

export const api = {
  async uploadResume(file: File): Promise<Resume> {
    const response = await resumeApi.upload(file);
    const id = response.id ?? response.resume_id;
    if (id && typeof window !== "undefined") window.localStorage.setItem("jobliberty_resume_id", String(id));
    return { ...response, id: String(id ?? "") };
  },
  async analyzeResume(id: string): Promise<Resume> { return resumeApi.analyze(id); },
  async fetchResume(): Promise<Resume> { const id = resumeId(); return id ? resumeApi.details(id) : unsupported("Resume details"); },
  async fetchJobMatches(): Promise<Job[]> { return jobsApi.match({ resume_id: resumeId() }); },
  async searchJobs(query: string, signal?: AbortSignal): Promise<Job[]> { return jobsApi.search({ query }, signal); },
  async fetchATSAnalysis(): Promise<ATSAnalysis> { const id = resumeId(); return id ? resumeApi.atsFeedback(id) : unsupported("ATS feedback"); },
  async fetchSkillGap(): Promise<SkillGap> { return unsupported("Skill gap analysis"); },
  async fetchCareerResources(): Promise<CareerResource[]> { return unsupported("Career resources"); },
  async fetchInterviewPrep(): Promise<InterviewQuestion[]> { return unsupported("Interview preparation"); },
  async fetchReports(): Promise<Report> { return unsupported("Reports"); },
  async downloadReport(): Promise<void> { return unsupported("Report download"); },
  async fetchDashboardStats(): Promise<DashboardStats> { return jobsApi.aggregate({ query: resumeId() }) as unknown as Promise<DashboardStats>; },
  async fetchRecentActivity(): Promise<RecentActivity[]> { return unsupported("Recent activity"); },
  async fetchNotifications(): Promise<Notification[]> { return unsupported("Notifications"); },
  async fetchCareerRoadmap(): Promise<CareerRoadmap> { return roadmapApi.get("software-engineering"); },
  async getOpportunityInsights() { return unsupported("Opportunity insights"); },
  async signIn(_email: string, _password: string) { return unsupported("Sign in"); },
  async signUp(_data: SignUpInput) { return unsupported("Sign up"); },
  async signOut() { if (typeof window !== "undefined") window.localStorage.removeItem("jobliberty_access_token"); return { success: true }; },
};
