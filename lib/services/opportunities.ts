import type {
  OpportunityCategory,
  FeaturedOpportunity,
  NigeriaOpportunity,
  CommunityCard,
  Scholarship,
  Fellowship,
  Hackathon,
  LearningResource,
  SmartRecommendation,
  OpportunityStats,
  OpportunityType,
  IndustrySector,
  CareerPath,
  FeaturedEmployer,
  WeeklyInsights,
} from "@/lib/types";
import { opportunitiesApi as backend } from "@/lib/api/opportunities";
import { asNumber, asRecord, asString, asStringArray, firstString, pick, scoreOf } from "@/lib/api/normalize";

type Opp = ReturnType<typeof Object.assign> & Record<string, unknown>;

async function list(params: Record<string, unknown> = {}, signal?: AbortSignal) {
  return backend.list(params, signal);
}

function asType(value: unknown): OpportunityType {
  const raw = asString(value, "job").toLowerCase();
  const allowed: OpportunityType[] = [
    "job",
    "scholarship",
    "fellowship",
    "internship",
    "competition",
    "hackathon",
    "learning",
    "networking",
    "volunteer",
    "opensource",
  ];
  return (allowed.includes(raw as OpportunityType) ? raw : "job") as OpportunityType;
}

function toFeatured(item: Record<string, unknown>): FeaturedOpportunity {
  return {
    id: firstString(pick(item, "id"), cryptoRandom()),
    title: firstString(pick(item, "title"), "Opportunity"),
    organization: firstString(pick(item, "organization", "provider"), "Organization"),
    description: firstString(pick(item, "description")),
    type: asType(pick(item, "type", "category")),
    location: firstString(pick(item, "location"), "—"),
    country: firstString(pick(item, "country"), "Global"),
    state: firstString(pick(item, "state")) || undefined,
    workMode: (firstString(pick(item, "workMode", "work_mode"), "remote") as FeaturedOpportunity["workMode"]) || "remote",
    deadline: firstString(pick(item, "deadline")) || undefined,
    postedAt: firstString(pick(item, "postedAt", "posted_at")) || undefined,
    url: firstString(pick(item, "url")) || undefined,
    logoPlaceholder: firstString(pick(item, "logoPlaceholder")) || undefined,
    tags: asStringArray(pick(item, "tags")),
    isFeatured: Boolean(pick(item, "isFeatured", "is_featured", "featured")),
    isRemote: Boolean(pick(item, "isRemote", "is_remote", "remote")),
    category: firstString(pick(item, "category", "type"), "job"),
    opportunityScore: scoreOf(item, "opportunityScore", "opportunity_score", "score", "confidence"),
    salary: firstString(pick(item, "salary", "stipend", "coverage")) || undefined,
    experienceLevel: (firstString(pick(item, "experienceLevel", "experience_level"), "all") as FeaturedOpportunity["experienceLevel"]) || "all",
  };
}

let oppSeq = 0;
function cryptoRandom() {
  oppSeq += 1;
  return `opp_${oppSeq}`;
}

function filterByType(items: Record<string, unknown>[], types: string[]) {
  const set = new Set(types.map((t) => t.toLowerCase()));
  return items.filter((item) => set.has(asString(pick(item, "type", "category"), "job").toLowerCase()));
}

function buildCategories(items: Record<string, unknown>[]): OpportunityCategory[] {
  const counts = new Map<string, number>();
  for (const item of items) {
    const type = asString(pick(item, "type", "category"), "job").toLowerCase();
    counts.set(type, (counts.get(type) ?? 0) + 1);
  }
  const meta: Record<string, { icon: string; titleKey: string; descriptionKey: string; color: string }> = {
    job: { icon: "briefcase", titleKey: "opportunity.categories.jobs", descriptionKey: "opportunity.categories.jobsDesc", color: "#2563EB" },
    scholarship: { icon: "graduation", titleKey: "opportunity.categories.scholarships", descriptionKey: "opportunity.categories.scholarshipsDesc", color: "#7C3AED" },
    fellowship: { icon: "award", titleKey: "opportunity.categories.fellowships", descriptionKey: "opportunity.categories.fellowshipsDesc", color: "#0EA5E9" },
    internship: { icon: "users", titleKey: "opportunity.categories.internships", descriptionKey: "opportunity.categories.internshipsDesc", color: "#10B981" },
    hackathon: { icon: "zap", titleKey: "opportunity.categories.hackathons", descriptionKey: "opportunity.categories.hackathonsDesc", color: "#F59E0B" },
    learning: { icon: "book", titleKey: "opportunity.categories.learning", descriptionKey: "opportunity.categories.learningDesc", color: "#14B8A6" },
  };

  if (counts.size === 0) return [];

  return Array.from(counts.entries()).map(([id, count]) => {
    const m = meta[id] ?? {
      icon: "sparkles",
      titleKey: id,
      descriptionKey: id,
      color: "#64748B",
    };
    return {
      id: id as OpportunityType,
      icon: m.icon,
      titleKey: m.titleKey,
      descriptionKey: m.descriptionKey,
      count,
      color: m.color,
    };
  });
}

function buildStats(items: Record<string, unknown>[]): OpportunityStats {
  const typeOf = (item: Record<string, unknown>) => asString(pick(item, "type", "category"), "").toLowerCase();
  return {
    totalOpportunities: items.length,
    availableJobs: items.filter((i) => typeOf(i) === "job").length,
    scholarships: items.filter((i) => typeOf(i) === "scholarship").length,
    internships: items.filter((i) => typeOf(i) === "internship").length,
    hackathons: items.filter((i) => typeOf(i) === "hackathon").length,
    learningResources: items.filter((i) => typeOf(i) === "learning").length,
  };
}

function toScholarship(item: Record<string, unknown>): Scholarship {
  const base = toFeatured(item);
  return {
    ...base,
    type: "scholarship",
    provider: firstString(pick(item, "provider", "organization"), base.organization),
    coverage: firstString(pick(item, "coverage", "salary", "funding"), "See details"),
    eligibility: asStringArray(pick(item, "eligibility", "requirements", "criteria")),
  };
}

function toFellowship(item: Record<string, unknown>): Fellowship {
  const base = toFeatured(item);
  return {
    ...base,
    type: "fellowship",
    provider: firstString(pick(item, "provider", "organization"), base.organization),
    duration: firstString(pick(item, "duration", "timeline"), "—"),
    benefits: asStringArray(pick(item, "benefits", "perks", "tags")),
  };
}

function toHackathon(item: Record<string, unknown>): Hackathon {
  const base = toFeatured(item);
  return {
    ...base,
    type: "hackathon",
    platform: firstString(pick(item, "platform", "organization", "provider"), base.organization),
    prize: firstString(pick(item, "prize", "award", "salary")) || undefined,
    date: firstString(pick(item, "date", "deadline", "postedAt"), "TBA"),
  };
}

function toLearning(item: Record<string, unknown>): LearningResource {
  return {
    id: firstString(pick(item, "id"), cryptoRandom()),
    title: firstString(pick(item, "title"), "Learning resource"),
    provider: firstString(pick(item, "provider", "organization"), "Provider"),
    url: firstString(pick(item, "url"), "#"),
    duration: firstString(pick(item, "duration"), "—"),
    difficulty: (["Beginner", "Intermediate", "Advanced"].includes(firstString(pick(item, "difficulty")))
      ? firstString(pick(item, "difficulty"))
      : "Beginner") as LearningResource["difficulty"],
    free: pick(item, "free", "is_free") === undefined ? true : Boolean(pick(item, "free", "is_free")),
    category: firstString(pick(item, "category", "type"), "learning"),
    description: firstString(pick(item, "description")),
    tags: asStringArray(pick(item, "tags")),
  };
}

function toRecommendation(item: Record<string, unknown>): SmartRecommendation {
  const factors = asRecord(pick(item, "matchFactors", "match_factors") ?? {});
  return {
    id: firstString(pick(item, "id"), cryptoRandom()),
    title: firstString(pick(item, "title"), "Recommended opportunity"),
    organization: firstString(pick(item, "organization", "provider"), "Organization"),
    type: asType(pick(item, "type", "category")),
    confidence: scoreOf(item, "confidence", "score", "opportunityScore", "match"),
    reasonKey: firstString(pick(item, "reasonKey", "reason_key"), "match"),
    reason: firstString(pick(item, "reason", "why", "explanation")) || undefined,
    icon: firstString(pick(item, "icon"), "sparkles"),
    location: firstString(pick(item, "location")) || undefined,
    salary: firstString(pick(item, "salary", "stipend")) || undefined,
    matchFactors: {
      resume: Boolean(pick(factors, "resume") ?? true),
      skills: asStringArray(pick(factors, "skills")),
      careerGoal: firstString(pick(factors, "careerGoal", "career_goal")),
      education: firstString(pick(factors, "education")),
      experience: firstString(pick(factors, "experience")),
      preferredIndustry: firstString(pick(factors, "preferredIndustry", "preferred_industry")),
      preferredLocation: firstString(pick(factors, "preferredLocation", "preferred_location")),
      language: firstString(pick(factors, "language"), "en"),
    },
    tags: asStringArray(pick(item, "tags")),
  };
}

function toNigeria(item: Record<string, unknown>): NigeriaOpportunity {
  const base = toFeatured(item);
  return {
    ...base,
    city: firstString(pick(item, "city", "location"), base.location),
    roleType: firstString(pick(item, "roleType", "role_type", "type"), base.type),
    industry: firstString(pick(item, "industry", "sector"), "General"),
  };
}

function deriveIndustries(items: Record<string, unknown>[]): IndustrySector[] {
  const counts = new Map<string, number>();
  for (const item of items) {
    const industry = firstString(pick(item, "industry", "sector", "category"), "");
    if (!industry) continue;
    counts.set(industry, (counts.get(industry) ?? 0) + 1);
  }
  const colors = ["#2563EB", "#7C3AED", "#10B981", "#F59E0B", "#0EA5E9", "#EF4444"];
  return Array.from(counts.entries()).map(([name, count], index) => ({
    id: name.toLowerCase().replace(/\s+/g, "-"),
    name,
    emoji: "💼",
    icon: "building",
    description: `${count} open opportunities`,
    opportunityCount: count,
    trending: count >= 3,
    trendPercent: undefined,
    color: colors[index % colors.length],
  }));
}

function deriveCareerPaths(items: Record<string, unknown>[]): CareerPath[] {
  // Career paths are not a dedicated endpoint — derive lightweight cards from titles when present.
  const titles = items
    .map((i) => firstString(pick(i, "title")))
    .filter(Boolean)
    .slice(0, 6);
  return titles.map((title, index) => ({
    id: `path_${index}`,
    title,
    description: firstString(pick(items[index], "description"), "Recommended path based on current opportunities."),
    averageSalary: firstString(pick(items[index], "salary"), "—"),
    demand: "moderate",
    growthTrend: "stable",
    growthPercent: 0,
    recommendedSkills: asStringArray(pick(items[index], "tags")).slice(0, 5),
    recommendedCertifications: [],
    icon: "route",
    color: "#2563EB",
    openRoles: 1,
  }));
}

function deriveEmployers(items: Record<string, unknown>[]): FeaturedEmployer[] {
  const map = new Map<string, { count: number; item: Record<string, unknown> }>();
  for (const item of items) {
    const name = firstString(pick(item, "organization", "provider", "company"));
    if (!name) continue;
    const prev = map.get(name);
    map.set(name, { count: (prev?.count ?? 0) + 1, item });
  }
  return Array.from(map.entries())
    .slice(0, 12)
    .map(([name, value], index) => ({
      id: `emp_${index}`,
      name,
      industry: firstString(pick(value.item, "industry", "sector", "category"), "General"),
      industryGroup: firstString(pick(value.item, "industry", "sector"), "General"),
      logoPlaceholder: name.slice(0, 2).toUpperCase(),
      openRoles: value.count,
      location: firstString(pick(value.item, "location", "country"), "—"),
      description: firstString(pick(value.item, "description"), `${value.count} open roles`),
      tags: asStringArray(pick(value.item, "tags")).slice(0, 4),
      featured: index < 3,
    }));
}

function emptyWeeklyInsights(): WeeklyInsights {
  return {
    weekLabel: "This week",
    mostInDemandSkills: [],
    fastestGrowingIndustries: [],
    mostActiveStates: [],
    averageSalaries: [],
    trendingOpportunities: [],
    upcomingDeadlines: [],
    communityEvents: [],
    techMeetups: [],
    careerFairs: [],
  };
}

function deriveWeeklyInsights(items: Record<string, unknown>[]): WeeklyInsights {
  const insights = emptyWeeklyInsights();
  insights.trendingOpportunities = items.slice(0, 5).map((item) => ({
    title: firstString(pick(item, "title"), "Opportunity"),
    organization: firstString(pick(item, "organization", "provider"), "Organization"),
    type: firstString(pick(item, "type", "category"), "job"),
    views: asNumber(pick(item, "views", "opportunityScore", "score"), 0),
  }));
  insights.upcomingDeadlines = items
    .filter((item) => firstString(pick(item, "deadline")))
    .slice(0, 5)
    .map((item) => {
      const deadline = firstString(pick(item, "deadline"));
      const daysLeft = Number.isFinite(Date.parse(deadline))
        ? Math.max(0, Math.ceil((Date.parse(deadline) - Date.now()) / (1000 * 60 * 60 * 24)))
        : 0;
      return {
        title: firstString(pick(item, "title"), "Opportunity"),
        organization: firstString(pick(item, "organization", "provider"), "Organization"),
        deadline,
        daysLeft,
      };
    });
  return insights;
}

/** Compatibility façade for existing Opportunity Hub props. Every method reads the production recommendation API. */
export const opportunitiesApi = {
  async fetchAll(signal?: AbortSignal) {
    return list({}, signal);
  },

  async fetchCategories(signal?: AbortSignal): Promise<OpportunityCategory[]> {
    const items = await list({}, signal);
    return buildCategories(items as unknown as Record<string, unknown>[]);
  },

  async fetchFeatured(signal?: AbortSignal): Promise<FeaturedOpportunity[]> {
    const items = await list({ category: "job" }, signal).catch(() => list({}, signal));
    return (items as unknown as Record<string, unknown>[]).map(toFeatured);
  },

  async fetchNigeriaOpportunities(signal?: AbortSignal): Promise<NigeriaOpportunity[]> {
    const items = await list({ country: "Nigeria" }, signal).catch(() => list({}, signal));
    return (items as unknown as Record<string, unknown>[])
      .filter((item) => {
        const country = firstString(pick(item, "country", "location"), "").toLowerCase();
        return !country || country.includes("nigeria") || country.includes("lagos") || country.includes("abuja");
      })
      .map(toNigeria);
  },

  async fetch3MTTCommunity(signal?: AbortSignal): Promise<CommunityCard[]> {
    // No dedicated community endpoint — keep the signature for callers and ignore unused signal.
    void signal;
    return [];
  },

  async fetchScholarships(signal?: AbortSignal): Promise<Scholarship[]> {
    const items = await list({ category: "scholarship" }, signal).catch(() => list({}, signal));
    return filterByType(items as unknown as Record<string, unknown>[], ["scholarship"]).map(toScholarship);
  },

  async fetchFellowships(signal?: AbortSignal): Promise<Fellowship[]> {
    const items = await list({ category: "fellowship" }, signal).catch(() => list({}, signal));
    return filterByType(items as unknown as Record<string, unknown>[], ["fellowship"]).map(toFellowship);
  },

  async fetchHackathons(signal?: AbortSignal): Promise<Hackathon[]> {
    const items = await list({ category: "hackathon" }, signal).catch(() => list({}, signal));
    return filterByType(items as unknown as Record<string, unknown>[], ["hackathon", "competition"]).map(toHackathon);
  },

  async fetchLearningResources(signal?: AbortSignal): Promise<LearningResource[]> {
    const items = await list({ category: "learning" }, signal).catch(() => list({}, signal));
    return filterByType(items as unknown as Record<string, unknown>[], ["learning", "bootcamp"]).map(toLearning);
  },

  async fetchRecommendations(signal?: AbortSignal): Promise<SmartRecommendation[]> {
    const items = await backend.recommend({}, signal);
    return (items as unknown as Record<string, unknown>[]).map(toRecommendation);
  },

  async fetchStats(signal?: AbortSignal): Promise<OpportunityStats> {
    const items = await list({}, signal);
    return buildStats(items as unknown as Record<string, unknown>[]);
  },

  async fetchIndustries(signal?: AbortSignal): Promise<IndustrySector[]> {
    const items = await list({}, signal);
    return deriveIndustries(items as unknown as Record<string, unknown>[]);
  },

  async fetchCareerPaths(signal?: AbortSignal): Promise<CareerPath[]> {
    const items = await list({}, signal);
    return deriveCareerPaths(items as unknown as Record<string, unknown>[]);
  },

  async fetchFeaturedEmployers(signal?: AbortSignal): Promise<FeaturedEmployer[]> {
    const items = await list({}, signal);
    return deriveEmployers(items as unknown as Record<string, unknown>[]);
  },

  async fetchWeeklyInsights(signal?: AbortSignal): Promise<WeeklyInsights> {
    const items = await list({}, signal);
    return deriveWeeklyInsights(items as unknown as Record<string, unknown>[]);
  },

  async searchOpportunities(
    query: string,
    signal?: AbortSignal
  ): Promise<{ id: string; title: string; type: OpportunityType; organization: string }[]> {
    const items = await backend.list({ query }, signal);
    return (items as unknown as Record<string, unknown>[]).map((item, index) => ({
      id: firstString(pick(item, "id"), `search_${index}`),
      title: firstString(pick(item, "title"), "Opportunity"),
      type: asType(pick(item, "type", "category")),
      organization: firstString(pick(item, "organization", "provider"), "Organization"),
    }));
  },
};

// Silence unused type alias if bundlers flag it.
void (0 as unknown as Opp);
