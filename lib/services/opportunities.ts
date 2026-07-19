import type { OpportunityCategory, FeaturedOpportunity, NigeriaOpportunity, CommunityCard, Scholarship, Fellowship, Hackathon, LearningResource, SmartRecommendation, OpportunityStats, OpportunityType, IndustrySector, CareerPath, FeaturedEmployer, WeeklyInsights } from "@/lib/types";
import { opportunitiesApi as backend } from "@/lib/api/opportunities";

async function list(params: Record<string, unknown> = {}): Promise<unknown[]> { return backend.list(params); }

/** Compatibility façade for existing Opportunity Hub props. Every method now reads the production recommendation API. */
export const opportunitiesApi = {
  async fetchCategories(): Promise<OpportunityCategory[]> { return list({ category: "all" }) as Promise<OpportunityCategory[]>; },
  async fetchFeatured(): Promise<FeaturedOpportunity[]> { return list({ category: "job" }) as Promise<FeaturedOpportunity[]>; },
  async fetchNigeriaOpportunities(): Promise<NigeriaOpportunity[]> { return list({ country: "Nigeria" }) as Promise<NigeriaOpportunity[]>; },
  async fetch3MTTCommunity(): Promise<CommunityCard[]> { return list({ category: "community" }) as Promise<CommunityCard[]>; },
  async fetchScholarships(): Promise<Scholarship[]> { return list({ category: "scholarship" }) as Promise<Scholarship[]>; },
  async fetchFellowships(): Promise<Fellowship[]> { return list({ category: "fellowship" }) as Promise<Fellowship[]>; },
  async fetchHackathons(): Promise<Hackathon[]> { return list({ category: "hackathon" }) as Promise<Hackathon[]>; },
  async fetchLearningResources(): Promise<LearningResource[]> { return list({ category: "learning" }) as Promise<LearningResource[]>; },
  async fetchRecommendations(): Promise<SmartRecommendation[]> { return backend.recommend({}) as Promise<SmartRecommendation[]>; },
  async fetchStats(): Promise<OpportunityStats> { return list({ include: "stats" }) as unknown as Promise<OpportunityStats>; },
  async fetchIndustries(): Promise<IndustrySector[]> { return list({ include: "industries" }) as Promise<IndustrySector[]>; },
  async fetchCareerPaths(): Promise<CareerPath[]> { return list({ include: "career_paths" }) as Promise<CareerPath[]>; },
  async fetchFeaturedEmployers(): Promise<FeaturedEmployer[]> { return list({ include: "employers" }) as Promise<FeaturedEmployer[]>; },
  async fetchWeeklyInsights(): Promise<WeeklyInsights> { return list({ include: "weekly_insights" }) as unknown as Promise<WeeklyInsights>; },
  async searchOpportunities(query: string): Promise<{ id: string; title: string; type: OpportunityType; organization: string }[]> {
    return backend.list({ query }) as Promise<{ id: string; title: string; type: OpportunityType; organization: string }[]>;
  },
};
