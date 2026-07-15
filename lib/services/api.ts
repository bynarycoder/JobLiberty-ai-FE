import type { 
  Resume, Job, ATSAnalysis, SkillGap, CareerResource, 
  InterviewQuestion, Report, CareerRoadmap, DashboardStats, Notification 
} from '@/lib/types';
import * as Mock from './mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Resume
  async uploadResume(file: File): Promise<Resume> {
    await delay(1200);
    // In real app would upload to backend
    return {
      ...Mock.MOCK_RESUME,
      fileName: file.name,
      fileSize: file.size,
      uploadDate: new Date().toISOString(),
    };
  },

  async analyzeResume(resumeId: string): Promise<Resume> {
    await delay(2200);
    return {
      ...Mock.MOCK_RESUME,
      id: resumeId,
      score: 82 + Math.floor(Math.random() * 8),
      atsScore: 78 + Math.floor(Math.random() * 8),
      status: 'analyzed',
    };
  },

  async fetchResume(): Promise<Resume> {
    await delay(400);
    return Mock.MOCK_RESUME;
  },

  // Jobs
  async fetchJobMatches(): Promise<Job[]> {
    await delay(650);
    return Mock.MOCK_JOBS;
  },

  async searchJobs(query: string): Promise<Job[]> {
    await delay(300);
    const jobs = await this.fetchJobMatches();
    if (!query) return jobs;
    return jobs.filter(job => 
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase())
    );
  },

  // ATS
  async fetchATSAnalysis(): Promise<ATSAnalysis> {
    await delay(550);
    return Mock.MOCK_ATS;
  },

  // Skill Gap
  async fetchSkillGap(): Promise<SkillGap> {
    await delay(480);
    return Mock.MOCK_SKILL_GAP;
  },

  // Resources
  async fetchCareerResources(): Promise<CareerResource[]> {
    await delay(420);
    return Mock.MOCK_CAREER_RESOURCES;
  },

  // Interview
  async fetchInterviewPrep(): Promise<InterviewQuestion[]> {
    await delay(380);
    return Mock.MOCK_INTERVIEW_QUESTIONS;
  },

  // Reports
  async fetchReports(): Promise<Report> {
    await delay(510);
    return Mock.MOCK_REPORT;
  },

  async downloadReport(): Promise<void> {
    await delay(800);
    // Simulate PDF download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'JobLiberty_Career_Report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // Dashboard
  async fetchDashboardStats(): Promise<DashboardStats> {
    await delay(360);
    return Mock.MOCK_DASHBOARD_STATS;
  },

  async fetchRecentActivity() {
    await delay(280);
    return Mock.MOCK_RECENT_ACTIVITY;
  },

  async fetchNotifications(): Promise<Notification[]> {
    await delay(200);
    return Mock.MOCK_NOTIFICATIONS;
  },

  // Roadmap
  async fetchCareerRoadmap(): Promise<CareerRoadmap> {
    await delay(440);
    return Mock.MOCK_ROADMAP;
  },

  // Opportunity Mode
  async getOpportunityInsights() {
    await delay(390);
    return {
      currentReadiness: 72,
      targetRole: "Senior Backend Engineer",
      missingSkills: ["Kubernetes", "AWS", "CI/CD"],
      estimatedTime: "6 Weeks",
      potentialMatch: 92,
    };
  },

  // Auth (mocked)
  async signIn(email: string, password: string) {
    await delay(900);
    if (email && password.length > 5) {
      return { success: true, user: Mock.MOCK_USER };
    }
    throw new Error("Invalid credentials");
  },

  async signUp(data: any) {
    await delay(1100);
    return { success: true, user: { ...Mock.MOCK_USER, ...data } };
  },

  async signOut() {
    await delay(300);
    return { success: true };
  }
};
