import type {
  ATSAnalysis,
  CareerRoadmap,
  ChatResponse,
  DashboardStats,
  Job,
  Resume,
  ResumeAnalysis,
  ResumeExperience,
  ResumeEducation,
} from "@/lib/types";
import {
  asArray,
  asBoolean,
  asNumber,
  asRecord,
  asStringArray,
  firstString,
  pick,
  scoreOf,
} from "./normalize";

function mapExperience(raw: unknown, index: number): ResumeExperience {
  const item = asRecord(raw);
  return {
    id: firstString(pick(item, "id"), `exp_${index}`),
    title: firstString(pick(item, "title", "role", "position", "job_title")),
    company: firstString(pick(item, "company", "organization", "employer")),
    location: firstString(pick(item, "location", "city")),
    startDate: firstString(pick(item, "startDate", "start_date", "from", "start")),
    endDate: firstString(pick(item, "endDate", "end_date", "to", "end", "present")),
    description: firstString(pick(item, "description", "summary", "details")),
    highlights: asStringArray(pick(item, "highlights", "achievements", "bullets", "responsibilities")),
  };
}

function mapEducation(raw: unknown, index: number): ResumeEducation {
  const item = asRecord(raw);
  return {
    id: firstString(pick(item, "id"), `edu_${index}`),
    institution: firstString(pick(item, "institution", "school", "university", "college")),
    degree: firstString(pick(item, "degree", "qualification", "program")),
    field: firstString(pick(item, "field", "field_of_study", "major", "course")),
    startDate: firstString(pick(item, "startDate", "start_date", "from", "start")),
    endDate: firstString(pick(item, "endDate", "end_date", "to", "end", "graduation_date", "year")),
    description: firstString(pick(item, "description", "details", "notes", "honors")),
  };
}

export function mapResumeAnalysis(raw: unknown): ResumeAnalysis | undefined {
  if (raw == null) return undefined;
  const root = asRecord(raw);
  // Analysis may live at the root or nested under common keys.
  const analysis = asRecord(
    pick(root, "analysis", "resume_analysis", "result", "data") ?? root
  );

  const skills = asStringArray(
    pick(analysis, "skills", "extracted_skills", "skill_list", "key_skills") ??
      pick(root, "skills", "extracted_skills")
  );

  const experienceRaw = asArray(
    pick(analysis, "experience", "experiences", "work_experience", "workHistory", "work_history") ??
      pick(root, "experience", "experiences", "work_experience")
  );
  const educationRaw = asArray(
    pick(analysis, "education", "educations", "education_history") ??
      pick(root, "education", "educations")
  );

  const recommendations = asStringArray(
    pick(analysis, "recommendations", "suggestions", "career_recommendations") ??
      pick(root, "recommendations", "suggestions")
  );

  const summary = firstString(
    pick(analysis, "career_summary", "careerSummary", "summary", "ai_summary", "aiSummary", "overview"),
    pick(root, "career_summary", "careerSummary", "summary", "ai_summary", "aiSummary")
  );

  const professionalSummary = firstString(
    pick(analysis, "professional_summary", "professionalSummary", "profile_summary", "about"),
    pick(root, "professional_summary", "professionalSummary", "content")
  );

  const careerTwin = firstString(
    pick(analysis, "career_twin", "careerTwin", "career_twin_summary"),
    pick(root, "career_twin", "careerTwin")
  );

  const readiness = scoreOf(
    analysis,
    "career_readiness",
    "careerReadiness",
    "readiness",
    "readiness_score"
  ) || scoreOf(root, "career_readiness", "careerReadiness", "readiness");

  const projects = asStringArray(pick(analysis, "projects", "project_list") ?? pick(root, "projects"));
  const certifications = asStringArray(
    pick(analysis, "certifications", "certificates", "certs") ?? pick(root, "certifications", "certificates")
  );
  const strengths = asStringArray(pick(analysis, "strengths") ?? pick(root, "strengths"));
  const weaknesses = asStringArray(
    pick(analysis, "weaknesses", "gaps", "improvement_areas") ?? pick(root, "weaknesses", "gaps")
  );

  const hasSignal =
    Boolean(summary || professionalSummary || careerTwin) ||
    skills.length > 0 ||
    experienceRaw.length > 0 ||
    educationRaw.length > 0 ||
    recommendations.length > 0 ||
    readiness > 0;

  if (!hasSignal) return undefined;

  return {
    careerSummary: summary,
    professionalSummary,
    skills,
    experience: experienceRaw.map(mapExperience),
    education: educationRaw.map(mapEducation),
    recommendations,
    careerReadiness: readiness,
    careerTwin,
    projects,
    certifications,
    strengths,
    weaknesses,
  };
}

export function mapResume(raw: unknown): Resume {
  const root = asRecord(raw);
  const nested = asRecord(pick(root, "resume", "data", "result"));
  const source = Object.keys(nested).length ? { ...nested, ...root } : root;
  const analysis = mapResumeAnalysis(source);

  const id = firstString(
    pick(source, "id", "resume_id", "resumeId"),
    pick(root, "id", "resume_id", "resumeId")
  );

  const score =
    scoreOf(source, "score", "resume_score", "resumeScore", "overall_score", "overallScore") ||
    scoreOf(analysis, "careerReadiness") ||
    0;

  const atsScore = scoreOf(
    source,
    "atsScore",
    "ats_score",
    "ats",
    "compatibility_score",
    "compatibilityScore"
  );

  const statusRaw = firstString(pick(source, "status", "state"), "uploaded").toLowerCase();
  const status: Resume["status"] =
    statusRaw.includes("analy") || analysis
      ? "analyzed"
      : statusRaw.includes("process")
        ? "processing"
        : "uploaded";

  return {
    id,
    resume_id: firstString(pick(source, "resume_id", "resumeId"), id) || undefined,
    fileName: firstString(
      pick(source, "fileName", "file_name", "filename", "name", "original_filename", "originalFilename"),
      "Resume.pdf"
    ),
    fileSize: asNumber(pick(source, "fileSize", "file_size", "size", "bytes"), 0),
    uploadDate: firstString(
      pick(source, "uploadDate", "upload_date", "created_at", "createdAt", "uploaded_at", "uploadedAt"),
      new Date().toISOString()
    ),
    content: firstString(pick(source, "content", "text", "extracted_text", "extractedText", "raw_text")) || undefined,
    score,
    atsScore,
    status,
    analysis,
  };
}

export function mapATSAnalysis(raw: unknown): ATSAnalysis {
  const root = asRecord(raw);
  const source = asRecord(pick(root, "ats", "feedback", "analysis", "result", "data") ?? root);

  const overallScore = scoreOf(
    source,
    "overallScore",
    "overall_score",
    "score",
    "ats_score",
    "atsScore",
    "total"
  );

  return {
    overallScore,
    keywordMatch: scoreOf(source, "keywordMatch", "keyword_match", "keywords", "keyword_score", "keywords_score"),
    formatting: scoreOf(source, "formatting", "format", "formatting_score", "layout"),
    readability: scoreOf(source, "readability", "readability_score", "clarity"),
    education: scoreOf(source, "education", "education_score"),
    experience: scoreOf(source, "experience", "experience_score"),
    skills: scoreOf(source, "skills", "skills_score", "skill_match", "skillMatch"),
    suggestions: asStringArray(
      pick(source, "suggestions", "recommendations", "improvements", "action_items", "tips")
    ),
    strengths: asStringArray(pick(source, "strengths", "positives")),
    weaknesses: asStringArray(pick(source, "weaknesses", "gaps", "issues", "areas_to_improve")),
  };
}

function mapJobType(value: unknown): Job["type"] {
  const raw = firstString(value, "Full-time").toLowerCase();
  if (raw.includes("part")) return "Part-time";
  if (raw.includes("contract") || raw.includes("freelance")) return "Contract";
  if (raw.includes("intern")) return "Internship";
  return "Full-time";
}

export function mapJob(raw: unknown, index = 0): Job {
  const root = asRecord(raw);
  const source = asRecord(pick(root, "job", "data") ?? root);
  const matchMeta = asRecord(pick(root, "match", "matching", "compatibility") ?? {});

  const matchPercentage =
    scoreOf(
      source,
      "matchPercentage",
      "match_percentage",
      "match_score",
      "matchScore",
      "compatibility",
      "compatibility_score",
      "score"
    ) ||
    scoreOf(matchMeta, "percentage", "score", "match_percentage", "matchPercentage") ||
    scoreOf(root, "match_percentage", "matchPercentage", "match_score", "score");

  const matchedSkills = asStringArray(
    pick(source, "matchedSkills", "matched_skills", "matching_skills", "skills_matched") ??
      pick(matchMeta, "matched_skills", "matchedSkills", "skills") ??
      pick(root, "matched_skills", "matchedSkills")
  );

  const missingSkills = asStringArray(
    pick(source, "missingSkills", "missing_skills", "skills_missing", "gaps") ??
      pick(matchMeta, "missing_skills", "missingSkills", "gaps") ??
      pick(root, "missing_skills", "missingSkills")
  );

  const remote = asBoolean(
    pick(source, "remote", "is_remote", "isRemote", "remote_ok", "remoteOk"),
    /remote/i.test(firstString(pick(source, "location", "work_mode", "workMode", "workplace_type")))
  );

  return {
    id: firstString(pick(source, "id", "job_id", "jobId"), `job_${index}`),
    title: firstString(pick(source, "title", "job_title", "position", "role"), "Untitled role"),
    company: firstString(pick(source, "company", "company_name", "employer", "organization"), "Company"),
    location: firstString(pick(source, "location", "city", "region", "place"), remote ? "Remote" : "—"),
    salary: firstString(pick(source, "salary", "salary_range", "salaryRange", "compensation", "pay")) || undefined,
    matchPercentage,
    remote,
    type: mapJobType(pick(source, "type", "job_type", "jobType", "employment_type", "employmentType")),
    postedDate: firstString(
      pick(source, "postedDate", "posted_date", "created_at", "createdAt", "date", "published_at"),
      ""
    ),
    description: firstString(
      pick(source, "description", "summary", "snippet", "details", "job_description"),
      ""
    ),
    matchedSkills,
    missingSkills,
    requirements: asStringArray(
      pick(source, "requirements", "qualifications", "must_have", "mustHave", "required_skills")
    ),
    logoPlaceholder: firstString(pick(source, "logoPlaceholder", "logo_placeholder", "logo", "company_logo")) || undefined,
    url: firstString(pick(source, "url", "apply_url", "applyUrl", "link", "job_url", "redirect_url")) || undefined,
    recommendations: asStringArray(
      pick(source, "recommendations", "advice") ?? pick(matchMeta, "recommendations", "advice")
    ),
  };
}

export function mapJobs(raw: unknown): Job[] {
  return asArray(raw).map((item, index) => mapJob(item, index));
}

export function mapCareerRoadmap(raw: unknown): CareerRoadmap {
  const root = asRecord(raw);
  const source = asRecord(pick(root, "roadmap", "data", "result") ?? root);

  const stepsRaw = asArray(
    pick(source, "steps", "stages", "milestones", "timeline", "path", "learning_path")
  );

  const steps = stepsRaw.map((item, index) => {
    const step = asRecord(item);
    const statusRaw = firstString(pick(step, "status", "state"), index === 0 ? "current" : "upcoming").toLowerCase();
    const status: CareerRoadmap["steps"][number]["status"] = statusRaw.includes("complete") || statusRaw.includes("done")
      ? "completed"
      : statusRaw.includes("current") || statusRaw.includes("active") || statusRaw.includes("in_progress")
        ? "current"
        : "upcoming";

    return {
      id: firstString(pick(step, "id"), `step_${index}`),
      title: firstString(pick(step, "title", "name", "stage", "milestone"), `Stage ${index + 1}`),
      description: firstString(pick(step, "description", "summary", "details", "goal")),
      status,
      estimatedWeeks: asNumber(pick(step, "estimatedWeeks", "estimated_weeks", "weeks", "duration_weeks", "duration"), 0),
    };
  });

  return {
    currentPosition: firstString(
      pick(source, "currentPosition", "current_position", "current_role", "from", "starting_point"),
      "Current role"
    ),
    targetRole: firstString(
      pick(source, "targetRole", "target_role", "goal", "target", "career_domain", "domain"),
      "Target role"
    ),
    steps,
    overallReadiness: scoreOf(
      source,
      "overallReadiness",
      "overall_readiness",
      "readiness",
      "career_readiness",
      "progress"
    ),
    certifications: asStringArray(pick(source, "certifications", "certs", "recommended_certifications")),
    learningPath: asStringArray(pick(source, "learningPath", "learning_path", "courses", "resources")),
    projects: asStringArray(pick(source, "projects", "project_ideas", "recommended_projects")),
    timeline: firstString(pick(source, "timeline", "duration", "estimated_timeline")) || undefined,
  };
}

export function mapChatResponse(raw: unknown): ChatResponse {
  const root = asRecord(raw);
  return {
    reply: firstString(
      pick(root, "reply", "response", "message", "content", "answer", "text", "output"),
      ""
    ),
    conversationId: firstString(
      pick(root, "conversationId", "conversation_id", "id", "session_id", "sessionId")
    ),
  };
}

export function mapDashboardStats(input: {
  resume?: Resume | null;
  ats?: ATSAnalysis | null;
  jobs?: Job[] | null;
  roadmap?: CareerRoadmap | null;
  aggregate?: unknown;
}): DashboardStats {
  const aggregate = asRecord(input.aggregate);
  const nested = asRecord(pick(aggregate, "stats", "data", "summary") ?? aggregate);

  const jobMatches =
    asNumber(pick(nested, "jobMatches", "job_matches", "total", "count", "total_jobs", "matches"), NaN);
  const resolvedMatches = Number.isFinite(jobMatches)
    ? jobMatches
    : Array.isArray(input.jobs)
      ? input.jobs.length
      : asArray(aggregate).length;

  return {
    resumeScore:
      scoreOf(nested, "resumeScore", "resume_score", "score") ||
      input.resume?.score ||
      0,
    atsScore:
      scoreOf(nested, "atsScore", "ats_score") ||
      input.ats?.overallScore ||
      input.resume?.atsScore ||
      0,
    jobMatches: resolvedMatches,
    applications: asNumber(pick(nested, "applications", "applied", "application_count"), 0),
    careerReadiness:
      scoreOf(nested, "careerReadiness", "career_readiness", "readiness") ||
      input.roadmap?.overallReadiness ||
      input.resume?.analysis?.careerReadiness ||
      0,
    learningProgress: asNumber(pick(nested, "learningProgress", "learning_progress", "progress"), 0),
  };
}

export function mapOpportunity(raw: unknown, index = 0) {
  const root = asRecord(raw);
  const source = asRecord(pick(root, "opportunity", "data") ?? root);
  const type = firstString(pick(source, "type", "category", "opportunity_type"), "job").toLowerCase();

  return {
    id: firstString(pick(source, "id", "opportunity_id"), `opp_${index}`),
    title: firstString(pick(source, "title", "name", "program"), "Opportunity"),
    organization: firstString(
      pick(source, "organization", "provider", "company", "institution", "host"),
      "Organization"
    ),
    description: firstString(pick(source, "description", "summary", "details")),
    type,
    location: firstString(pick(source, "location", "city", "place"), "—"),
    country: firstString(pick(source, "country", "nation", "region"), "Global"),
    state: firstString(pick(source, "state", "province")) || undefined,
    workMode: firstString(pick(source, "workMode", "work_mode", "mode"), "remote").toLowerCase(),
    deadline: firstString(pick(source, "deadline", "closes_at", "application_deadline")) || undefined,
    postedAt: firstString(pick(source, "postedAt", "posted_at", "created_at")) || undefined,
    url: firstString(pick(source, "url", "link", "apply_url", "application_url")) || undefined,
    logoPlaceholder: firstString(pick(source, "logoPlaceholder", "logo")) || undefined,
    tags: asStringArray(pick(source, "tags", "keywords", "categories")),
    isFeatured: asBoolean(pick(source, "isFeatured", "is_featured", "featured")),
    isRemote: asBoolean(pick(source, "isRemote", "is_remote", "remote")),
    category: firstString(pick(source, "category", "type"), type),
    opportunityScore: scoreOf(source, "opportunityScore", "opportunity_score", "score", "match", "confidence"),
    salary: firstString(pick(source, "salary", "stipend", "funding", "coverage")) || undefined,
    experienceLevel: firstString(pick(source, "experienceLevel", "experience_level", "level"), "all"),
    provider: firstString(pick(source, "provider", "organization", "sponsor")),
    coverage: firstString(pick(source, "coverage", "benefits_summary", "funding")),
    eligibility: asStringArray(pick(source, "eligibility", "requirements", "criteria")),
    duration: firstString(pick(source, "duration", "length", "timeline")),
    benefits: asStringArray(pick(source, "benefits", "perks")),
    platform: firstString(pick(source, "platform", "host", "organization")),
    prize: firstString(pick(source, "prize", "award", "reward")) || undefined,
    date: firstString(pick(source, "date", "start_date", "event_date")),
    city: firstString(pick(source, "city", "location")),
    roleType: firstString(pick(source, "roleType", "role_type", "type")),
    industry: firstString(pick(source, "industry", "sector")),
    confidence: scoreOf(source, "confidence", "match", "score", "opportunityScore"),
    reason: firstString(pick(source, "reason", "why", "explanation", "rationale")),
    reasonKey: firstString(pick(source, "reasonKey", "reason_key")),
    icon: firstString(pick(source, "icon"), "sparkles"),
    matchFactors: asRecord(pick(source, "matchFactors", "match_factors") ?? {}),
  };
}

export function mapOpportunities(raw: unknown) {
  return asArray(raw).map((item, index) => mapOpportunity(item, index));
}
