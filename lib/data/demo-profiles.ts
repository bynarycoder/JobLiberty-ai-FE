/**
 * Canonical demo dataset - source of truth for frontend demo mode.
 * Updated to use Abdulwahab Abdulyekeen for software_engineer profile.
 * Author: Abdulwahab Abdulyekeen — 3MTT NextGen Fellow
 */

export interface DemoProfileSummary {
  slug: string;
  name: string;
  headline: string;
  location: string;
  years_of_experience: number;
}

export const UPDATED_SOFTWARE_ENGINEER_SUMMARY: DemoProfileSummary = {
  slug: "software_engineer",
  name: "Abdulwahab Abdulyekeen",
  headline: "AI Engineer | 3MTT NextGen Fellow",
  location: "Kaduna, Nigeria",
  years_of_experience: 2,
};

/**
 * Full profile list as returned by GET /api/v1/demo/profiles
 * Keep all other profiles unchanged, only software_engineer is updated.
 */
export const DEMO_PROFILES: DemoProfileSummary[] = [
  {
    slug: "agriculture_entrepreneur",
    name: "Zainab Garba",
    headline: "Agriculture Entrepreneur",
    location: "Kaduna, Nigeria",
    years_of_experience: 5,
  },
  {
    slug: "business_analyst",
    name: "Efe Oghene",
    headline: "Business Analyst",
    location: "Port Harcourt, Nigeria",
    years_of_experience: 5,
  },
  {
    slug: "data_analyst",
    name: "Aisha Bello",
    headline: "Data Analyst",
    location: "Abuja, Nigeria",
    years_of_experience: 4,
  },
  {
    slug: "electrician",
    name: "Samuel Adebayo",
    headline: "Industrial Electrician",
    location: "Ibadan, Nigeria",
    years_of_experience: 8,
  },
  {
    slug: "nurse",
    name: "Ngozi Eze",
    headline: "Registered Nurse",
    location: "Enugu, Nigeria",
    years_of_experience: 6,
  },
  UPDATED_SOFTWARE_ENGINEER_SUMMARY,
  {
    slug: "teacher",
    name: "Ibrahim Musa",
    headline: "Secondary School Mathematics Teacher",
    location: "Kano, Nigeria",
    years_of_experience: 7,
  },
  {
    slug: "uiux_designer",
    name: "Tomi Adeyemi",
    headline: "UI/UX Product Designer",
    location: "Lagos, Nigeria",
    years_of_experience: 4,
  },
];

/**
 * Detailed demo profile for software_engineer.
 * Preserves all API response structures from original backend:
 * - resume_summary, skills, experience, education
 * - ats_score, career_readiness, career_twin, strengths, weaknesses
 * - recommended_skills, learning_roadmap, job_matches, nigerian_opportunities
 * Only personal_profile and top-level identity fields are updated to Abdulwahab Abdulyekeen.
 */
export const DETAILED_SOFTWARE_ENGINEER_PROFILE = {
  slug: "software_engineer",
  personal_profile: {
    full_name: "Abdulwahab Abdulyekeen",
    headline: "AI Engineer | 3MTT NextGen Fellow",
    location: "Kaduna, Nigeria",
    email: "software_engineer@demo.jobliberty.ng",
    phone: "+234 800 000 0000",
    years_of_experience: 2,
  },
  resume_summary: "Python, FastAPI and cloud engineer building reliable products for African businesses.",
  skills: ["Python", "FastAPI", "PostgreSQL", "Docker", "AWS", "REST APIs", "Git"],
  experience: [
    {
      title: "Senior Backend Engineer",
      company: "Paystack",
      location: "Lagos, Nigeria",
      start_date: "2022-02",
      end_date: "Present",
      highlights: [
        "Designed payment reconciliation APIs processing high-volume merchant events.",
        "Reduced API p95 latency by 34% through caching and query optimisation.",
      ],
    },
    {
      title: "Backend Engineer",
      company: "Independent Projects and Community Work",
      location: "Lagos, Nigeria",
      start_date: "2018-01",
      end_date: "2021-06",
      highlights: [
        "Delivered practical projects for local teams and customers.",
        "Built a reputation for dependable, documented work.",
      ],
    },
  ],
  education: [
    {
      qualification: "B.Sc. Computer Science",
      institution: "University of Lagos",
      year: 2019,
    },
  ],
  ats_score: {
    score: 86,
    assessment: "Strong, role-aligned resume with clear evidence of impact and relevant keywords.",
    improvements: [
      "Quantify outcomes consistently across earlier roles.",
      "Add a focused portfolio or certification section.",
    ],
  },
  career_readiness: {
    score: 84,
    level: "Mid-level professional",
    summary: "Ready to compete for mid-level roles while developing a visible specialty.",
    next_actions: [
      "Tailor the resume to each target role.",
      "Practise achievement-based interview stories.",
      "Build one public proof-of-work project.",
    ],
  },
  career_twin: {
    target_role: "Backend Software Engineer",
    career_stage: "Established mid-level",
    market_positioning: "Practical backend software engineer with Nigerian market context and measurable delivery experience.",
    likely_next_role: "Senior Backend Software Engineer",
  },
  strengths: [
    "Demonstrated ownership and dependable delivery.",
    "Clear domain foundation and stakeholder communication.",
    "Evidence of improving outcomes in real work settings.",
  ],
  weaknesses: [
    "Professional portfolio is not yet consistently visible.",
    "Could quantify commercial impact more deeply.",
  ],
  recommended_skills: ["Kubernetes", "System Design", "Terraform"],
  learning_roadmap: [
    {
      phase: "0–30 days: sharpen fundamentals",
      duration: "4 weeks",
      objectives: [
        "Complete a focused Kubernetes course.",
        "Document two measurable achievements.",
      ],
      resources: ["LinkedIn Learning", "Coursera"],
    },
    {
      phase: "31–90 days: demonstrate capability",
      duration: "8 weeks",
      objectives: [
        "Build one portfolio case study.",
        "Practise interviews with a peer group.",
      ],
      resources: ["GitHub or Notion portfolio", "Jobberman Career Hub"],
    },
  ],
  job_matches: [
    {
      title: "Senior Backend Software Engineer",
      company: "Flutterwave",
      location: "Lagos, Nigeria",
      work_type: "Hybrid",
      match_score: 86,
      why_match: "Strong overlap between demonstrated experience, core skills and role requirements.",
    },
    {
      title: "Backend Software Engineer",
      company: "Moniepoint",
      location: "Remote, Nigeria",
      work_type: "Remote",
      match_score: 82,
      why_match: "Relevant transferable skills and a clear path to contribute quickly.",
    },
  ],
  nigerian_opportunities: [
    {
      title: "Google Career Certificates Scholarship",
      organisation: "Google / Coursera",
      location: "Nigeria",
      opportunity_type: "Scholarship",
      description: "Professional certificate learning support for career growth.",
      url: "https://grow.google/certificates/",
    },
    {
      title: "Jobberman Soft Skills Training",
      organisation: "Jobberman Nigeria",
      location: "Online, Nigeria",
      opportunity_type: "Career training",
      description: "Employability and workplace-readiness learning for Nigerian talent.",
      url: "https://www.jobberman.com/",
    },
  ],
};

/**
 * Helper to ensure any object that might contain the legacy demo name is sanitized.
 * Replaces all occurrences with Abdulwahab Abdulyekeen.
 */
export function sanitizeDemoData<T>(data: T): T {
  const LEGACY_FIRST = "Chinedu";
  const LEGACY_LAST = "Okafor";
  const LEGACY_FULL = `${LEGACY_FIRST} ${LEGACY_LAST}`;
  const LEGACY_REGEX = new RegExp(`${LEGACY_FIRST} ${LEGACY_LAST}`, "g");
  if (typeof data === "string") {
    return (data as string).replace(LEGACY_REGEX, "Abdulwahab Abdulyekeen").replace(LEGACY_FULL, "Abdulwahab Abdulyekeen") as unknown as T;
  }
  if (Array.isArray(data)) {
    return data.map((item) => sanitizeDemoData(item)) as unknown as T;
  }
  if (data && typeof data === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(data as Record<string, unknown>)) {
      out[k] = sanitizeDemoData(v);
    }
    return out as unknown as T;
  }
  return data;
}

/**
 * Transforms a summary profile if it's software_engineer to updated version.
 */
export function transformSummaryProfile(profile: Record<string, unknown>): Record<string, unknown> {
  const slug = typeof profile.slug === "string" ? profile.slug : typeof profile.id === "string" ? profile.id : "";
  if (slug === "software_engineer") {
    return {
      ...profile,
      slug: UPDATED_SOFTWARE_ENGINEER_SUMMARY.slug,
      name: UPDATED_SOFTWARE_ENGINEER_SUMMARY.name,
      headline: UPDATED_SOFTWARE_ENGINEER_SUMMARY.headline,
      location: UPDATED_SOFTWARE_ENGINEER_SUMMARY.location,
      years_of_experience: UPDATED_SOFTWARE_ENGINEER_SUMMARY.years_of_experience,
      title: UPDATED_SOFTWARE_ENGINEER_SUMMARY.headline,
      description: profile.description,
    };
  }
  return profile;
}

/**
 * Transforms detailed profile for software_engineer to updated version.
 * Keeps all other keys (resume, projects, roadmap, ATS, job_matches, etc.) intact.
 */
export function transformDetailedProfile(slug: string, data: Record<string, unknown>): Record<string, unknown> {
  if (slug !== "software_engineer") {
    return sanitizeDemoData(data);
  }
  // Start from incoming data to preserve any backend fields we don't explicitly control
  const base = sanitizeDemoData(data);
  // Merge with our canonical detailed profile to ensure updated identity
  // but preserve any additional keys that may exist in backend response
  const personal = (base.personal_profile as Record<string, unknown>) || {};
  return {
    ...base,
    ...DETAILED_SOFTWARE_ENGINEER_PROFILE,
    slug: "software_engineer",
    personal_profile: {
      ...(DETAILED_SOFTWARE_ENGINEER_PROFILE.personal_profile as object),
      ...(personal as object),
      full_name: "Abdulwahab Abdulyekeen",
      headline: "AI Engineer | 3MTT NextGen Fellow",
      location: "Kaduna, Nigeria",
      years_of_experience: 2,
    },
  };
}
