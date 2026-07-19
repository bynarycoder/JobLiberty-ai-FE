import type {
  Resume,
  Job,
  ATSAnalysis,
  SkillGap,
  CareerResource,
  InterviewQuestion,
  Report,
  CareerRoadmap,
  DashboardStats,
  Notification,
  RecentActivity,
  SignUpInput,
} from "@/lib/types";
import { ApiError } from "@/lib/api/client";
import { resumeApi } from "@/lib/api/resume";
import { jobsApi } from "@/lib/api/jobs";
import { roadmapApi } from "@/lib/api/roadmap";
import { mapDashboardStats } from "@/lib/api/mappers";
import { asArray, asNumber, asRecord, asString, firstString, pick, scoreOf } from "@/lib/api/normalize";

const RESUME_ID_KEY = "jobliberty_resume_id";
const CAREER_DOMAIN_KEY = "jobliberty_career_domain";

export function getStoredResumeId(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return window.localStorage.getItem(RESUME_ID_KEY) ?? undefined;
}

export function setStoredResumeId(id: string | undefined | null) {
  if (typeof window === "undefined") return;
  if (id) window.localStorage.setItem(RESUME_ID_KEY, String(id));
  else window.localStorage.removeItem(RESUME_ID_KEY);
}

export function getStoredCareerDomain(): string {
  if (typeof window === "undefined") return "software-engineering";
  return window.localStorage.getItem(CAREER_DOMAIN_KEY) || "software-engineering";
}

export function setStoredCareerDomain(domain: string) {
  if (typeof window === "undefined") return;
  if (domain) window.localStorage.setItem(CAREER_DOMAIN_KEY, domain);
}

const unsupported = (name: string): never => {
  throw new ApiError(`${name} is not available from the production API.`, 404, "not_found");
};

/**
 * Compose skill-gap UI data from supported resume analysis + job match payloads.
 * No fabricated skills — only what the backend already returned.
 */
function composeSkillGap(resume: Resume | null, jobs: Job[]): SkillGap {
  const analysis = resume?.analysis;
  const currentSkills = (analysis?.skills ?? []).map((name, index) => ({
    id: `skill_${index}`,
    name,
    level: "intermediate" as const,
    category: "Extracted",
  }));

  const missingMap = new Map<string, number>();
  for (const job of jobs) {
    for (const skill of job.missingSkills ?? []) {
      const key = skill.trim();
      if (!key) continue;
      missingMap.set(key, (missingMap.get(key) ?? 0) + 1);
    }
  }

  const missingSkills = Array.from(missingMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({
      name,
      priority: (count >= 3 ? "high" : count >= 2 ? "medium" : "low") as "high" | "medium" | "low",
      estimatedTimeWeeks: count >= 3 ? 6 : count >= 2 ? 4 : 2,
    }));

  return {
    currentSkills,
    missingSkills,
    opportunityScore: scoreOf(analysis, "careerReadiness") || resume?.score || 0,
    careerReadiness: analysis?.careerReadiness || resume?.score || 0,
  };
}

/**
 * Compose a lightweight report from supported endpoints only.
 */
function composeReport(resume: Resume | null, ats: ATSAnalysis | null, jobs: Job[]): Report {
  const recommendations = [
    ...(ats?.suggestions ?? []),
    ...(resume?.analysis?.recommendations ?? []),
  ].filter(Boolean);

  return {
    id: resume?.id || "report",
    generatedAt: new Date().toISOString(),
    resumeScore: resume?.score || 0,
    atsScore: ats?.overallScore || resume?.atsScore || 0,
    jobsMatched: jobs.length,
    topRecommendations: recommendations.slice(0, 6),
    executiveSummary:
      resume?.analysis?.careerSummary ||
      resume?.analysis?.professionalSummary ||
      (ats
        ? `ATS overall score ${ats.overallScore}%. ${ats.suggestions[0] ?? "Upload and analyze a resume to generate a full executive summary."}`
        : "Upload and analyze a resume to generate your career report."),
  };
}

function composeResources(resume: Resume | null, roadmap: CareerRoadmap | null): CareerResource[] {
  const resources: CareerResource[] = [];
  let index = 0;

  for (const item of roadmap?.learningPath ?? []) {
    resources.push({
      id: `learn_${index++}`,
      title: item,
      type: "course",
      provider: "Career Roadmap",
      url: "#",
      difficulty: "Intermediate",
      free: true,
      description: `Recommended learning step toward ${roadmap?.targetRole || "your target role"}.`,
      tags: ["roadmap"],
    });
  }

  for (const item of roadmap?.certifications ?? []) {
    resources.push({
      id: `cert_${index++}`,
      title: item,
      type: "certification",
      provider: "Recommended",
      url: "#",
      difficulty: "Intermediate",
      free: false,
      description: "Certification suggested by your career roadmap.",
      tags: ["certification", "roadmap"],
    });
  }

  for (const item of roadmap?.projects ?? []) {
    resources.push({
      id: `proj_${index++}`,
      title: item,
      type: "project",
      provider: "Portfolio",
      url: "#",
      difficulty: "Intermediate",
      free: true,
      description: "Hands-on project recommended for your roadmap.",
      tags: ["project", "roadmap"],
    });
  }

  for (const rec of resume?.analysis?.recommendations ?? []) {
    resources.push({
      id: `rec_${index++}`,
      title: rec,
      type: "documentation",
      provider: "Liberty AI",
      url: "#",
      difficulty: "Beginner",
      free: true,
      description: "Recommendation from your resume analysis.",
      tags: ["recommendation"],
    });
  }

  return resources;
}

function composeRecentActivity(resume: Resume | null, jobs: Job[], roadmap: CareerRoadmap | null): RecentActivity[] {
  const items: RecentActivity[] = [];
  if (resume?.id) {
    items.push({
      id: 1,
      action: `Resume ${resume.fileName || "file"} ${resume.status === "analyzed" ? "analyzed" : "uploaded"}`,
      time: resume.uploadDate ? new Date(resume.uploadDate).toLocaleString() : "Recently",
    });
  }
  if (jobs.length) {
    items.push({
      id: 2,
      action: `${jobs.length} job match${jobs.length === 1 ? "" : "es"} ready`,
      time: "Just now",
    });
  }
  if (roadmap?.steps?.length) {
    const current = roadmap.steps.find((s) => s.status === "current") || roadmap.steps[0];
    items.push({
      id: 3,
      action: `Roadmap: ${current.title}`,
      time: roadmap.targetRole || "In progress",
    });
  }
  return items;
}

export const api = {
  async uploadResume(file: File, signal?: AbortSignal): Promise<Resume> {
    const response = await resumeApi.upload(file, signal);
    const id = response.id || response.resume_id;
    if (id) setStoredResumeId(id);
    return { ...response, id: String(id ?? response.id ?? "") };
  },

  async analyzeResume(id: string, signal?: AbortSignal): Promise<Resume> {
    const analyzed = await resumeApi.analyze(id, signal);
    const resolvedId = analyzed.id || analyzed.resume_id || id;
    setStoredResumeId(resolvedId);
    return { ...analyzed, id: resolvedId };
  },

  async fetchResume(signal?: AbortSignal): Promise<Resume> {
    const id = getStoredResumeId();
    if (!id) return unsupported("Resume details");
    return resumeApi.details(id, signal);
  },

  async fetchJobMatches(signal?: AbortSignal): Promise<Job[]> {
    const resume_id = getStoredResumeId();
    return jobsApi.match({ resume_id }, signal);
  },

  async searchJobs(query: string, signal?: AbortSignal): Promise<Job[]> {
    return jobsApi.search({ query: query || undefined }, signal);
  },

  async fetchATSAnalysis(signal?: AbortSignal): Promise<ATSAnalysis> {
    const id = getStoredResumeId();
    if (!id) return unsupported("ATS feedback");
    return resumeApi.atsFeedback(id, signal);
  },

  async fetchSkillGap(signal?: AbortSignal): Promise<SkillGap> {
    const id = getStoredResumeId();
    let resume: Resume | null = null;
    let jobs: Job[] = [];
    try {
      if (id) resume = await resumeApi.details(id, signal);
    } catch {
      resume = null;
    }
    try {
      jobs = await jobsApi.match({ resume_id: id }, signal);
    } catch {
      jobs = [];
    }
    if (!resume && jobs.length === 0) unsupported("Skill gap analysis");
    return composeSkillGap(resume, jobs);
  },

  async fetchCareerResources(signal?: AbortSignal): Promise<CareerResource[]> {
    const id = getStoredResumeId();
    let resume: Resume | null = null;
    let roadmap: CareerRoadmap | null = null;
    try {
      if (id) resume = await resumeApi.details(id, signal);
    } catch {
      resume = null;
    }
    try {
      roadmap = await roadmapApi.get(getStoredCareerDomain(), signal);
    } catch {
      try {
        roadmap = await roadmapApi.generate(
          {
            career_domain: getStoredCareerDomain(),
            resume_id: id,
          },
          signal
        );
      } catch {
        roadmap = null;
      }
    }
    const resources = composeResources(resume, roadmap);
    if (!resources.length) unsupported("Career resources");
    return resources;
  },

  async fetchInterviewPrep(): Promise<InterviewQuestion[]> {
    return unsupported("Interview preparation");
  },

  async fetchReports(signal?: AbortSignal): Promise<Report> {
    const id = getStoredResumeId();
    let resume: Resume | null = null;
    let ats: ATSAnalysis | null = null;
    let jobs: Job[] = [];

    try {
      if (id) resume = await resumeApi.details(id, signal);
    } catch {
      resume = null;
    }
    try {
      if (id) ats = await resumeApi.atsFeedback(id, signal);
    } catch {
      ats = null;
    }
    try {
      jobs = await jobsApi.match({ resume_id: id }, signal);
    } catch {
      try {
        jobs = await jobsApi.search({}, signal);
      } catch {
        jobs = [];
      }
    }

    if (!resume && !ats && jobs.length === 0) unsupported("Reports");
    return composeReport(resume, ats, jobs);
  },

  async downloadReport(signal?: AbortSignal): Promise<void> {
    // No dedicated download endpoint in the contract — generate a client-side text export
    // from composed backend data only.
    const report = await api.fetchReports(signal);
    if (typeof window === "undefined") return;
    const lines = [
      "JobLiberty Career Report",
      `Generated: ${report.generatedAt}`,
      "",
      `Resume score: ${report.resumeScore}`,
      `ATS score: ${report.atsScore}`,
      `Jobs matched: ${report.jobsMatched}`,
      "",
      "Executive summary",
      report.executiveSummary,
      "",
      "Top recommendations",
      ...report.topRecommendations.map((r, i) => `${i + 1}. ${r}`),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `jobliberty-report-${report.id || "export"}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  },

  async fetchDashboardStats(signal?: AbortSignal): Promise<DashboardStats> {
    const id = getStoredResumeId();
    const [resumeResult, atsResult, jobsResult, roadmapResult, aggregateResult] = await Promise.allSettled([
      id ? resumeApi.details(id, signal) : Promise.resolve(null),
      id ? resumeApi.atsFeedback(id, signal) : Promise.resolve(null),
      jobsApi.match({ resume_id: id }, signal).catch(() => jobsApi.search({}, signal)),
      roadmapApi.get(getStoredCareerDomain(), signal).catch(() => null),
      jobsApi.aggregate({ query: undefined }, signal).catch(() => ({})),
    ]);

    const resume = resumeResult.status === "fulfilled" ? resumeResult.value : null;
    const ats = atsResult.status === "fulfilled" ? atsResult.value : null;
    const jobs = jobsResult.status === "fulfilled" ? jobsResult.value : [];
    const roadmap = roadmapResult.status === "fulfilled" ? roadmapResult.value : null;
    const aggregate = aggregateResult.status === "fulfilled" ? aggregateResult.value : {};

    return mapDashboardStats({ resume, ats, jobs, roadmap, aggregate });
  },

  async fetchRecentActivity(signal?: AbortSignal): Promise<RecentActivity[]> {
    const id = getStoredResumeId();
    const [resumeResult, jobsResult, roadmapResult] = await Promise.allSettled([
      id ? resumeApi.details(id, signal) : Promise.resolve(null),
      jobsApi.match({ resume_id: id }, signal).catch(() => []),
      roadmapApi.get(getStoredCareerDomain(), signal).catch(() => null),
    ]);
    const resume = resumeResult.status === "fulfilled" ? resumeResult.value : null;
    const jobs = jobsResult.status === "fulfilled" ? jobsResult.value : [];
    const roadmap = roadmapResult.status === "fulfilled" ? roadmapResult.value : null;
    const items = composeRecentActivity(resume, jobs ?? [], roadmap);
    if (!items.length) unsupported("Recent activity");
    return items;
  },

  async fetchNotifications(): Promise<Notification[]> {
    // No notifications endpoint in the production contract.
    return [];
  },

  async fetchCareerRoadmap(signal?: AbortSignal): Promise<CareerRoadmap> {
    const domain = getStoredCareerDomain();
    const resume_id = getStoredResumeId();
    try {
      return await roadmapApi.get(domain, signal);
    } catch {
      return roadmapApi.generate({ career_domain: domain, resume_id }, signal);
    }
  },

  async generateCareerRoadmap(payload: Record<string, unknown> = {}, signal?: AbortSignal): Promise<CareerRoadmap> {
    const domain = firstString(pick(payload, "career_domain", "domain"), getStoredCareerDomain());
    if (domain) setStoredCareerDomain(domain);
    return roadmapApi.generate(
      {
        career_domain: domain,
        resume_id: getStoredResumeId(),
        ...payload,
      },
      signal
    );
  },

  async getOpportunityInsights() {
    return unsupported("Opportunity insights");
  },

  async signIn(_email: string, _password: string) {
    // Auth is intentionally frontend-only until backend auth is published.
    return unsupported("Sign in");
  },

  async signUp(_data: SignUpInput) {
    return unsupported("Sign up");
  },

  async signOut() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("jobliberty_access_token");
    }
    return { success: true };
  },
};

// Re-export helpers used by pages that need aggregate numbers without inventing values.
export function readAggregateCount(aggregate: unknown): number {
  const record = asRecord(aggregate);
  const direct = asNumber(pick(record, "total", "count", "total_jobs", "jobMatches", "matches"), NaN);
  if (Number.isFinite(direct)) return direct;
  return asArray(aggregate).length || asArray(pick(record, "jobs", "results", "items", "data")).length;
}

export function readStringField(value: unknown, ...keys: string[]): string {
  return firstString(...keys.map((k) => pick(asRecord(value), k)), asString(value));
}
