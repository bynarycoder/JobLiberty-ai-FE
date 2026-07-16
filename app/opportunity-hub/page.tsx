"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "@/providers/I18nProvider";
import { opportunitiesApi } from "@/lib/services/opportunities";
import { OpportunityHubHeader } from "@/components/opportunity-hub/OpportunityHubHeader";
import { OpportunityHero } from "@/components/opportunity-hub/OpportunityHero";
import { OpportunityCategories } from "@/components/opportunity-hub/OpportunityCategories";
import { OpportunitySearch } from "@/components/opportunity-hub/OpportunitySearch";
import { OpportunityFilters } from "@/components/opportunity-hub/OpportunityFilters";
import { FeaturedOpportunities } from "@/components/opportunity-hub/FeaturedOpportunities";
import { NigeriaOpportunities } from "@/components/opportunity-hub/NigeriaOpportunities";
import { Community3MTT } from "@/components/opportunity-hub/Community3MTT";
import { ScholarshipsSection } from "@/components/opportunity-hub/ScholarshipsSection";
import { FellowshipsSection } from "@/components/opportunity-hub/FellowshipsSection";
import { HackathonsSection } from "@/components/opportunity-hub/HackathonsSection";
import { LearningResourcesSection } from "@/components/opportunity-hub/LearningResourcesSection";
import { SmartRecommendations } from "@/components/opportunity-hub/SmartRecommendations";
import { LibertyAIPanel } from "@/components/opportunity-hub/LibertyAIPanel";
import { useBookmarks } from "@/components/opportunity-hub/useBookmarks";
import { ErrorState } from "@/components/opportunity-hub/ErrorState";
import type { OpportunityFiltersState, WorkMode } from "@/lib/types";

const initialFilters: OpportunityFiltersState = {
  category: "all",
  country: "all",
  state: "all",
  workMode: "all",
  deadline: "all",
  experienceLevel: "all",
  salary: "all",
  industry: "all",
};

export default function OpportunityHubPage() {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [filters, setFilters] = useState<OpportunityFiltersState>(initialFilters);
  const [nigeriaCity, setNigeriaCity] = useState<string>("all");
  const [nigeriaWorkMode, setNigeriaWorkMode] = useState<WorkMode | "all">("all");
  const { bookmarks, toggleBookmark } = useBookmarks();

  const { data: stats, isLoading: statsLoading, error: statsError, refetch: refetchStats } = useQuery({
    queryKey: ["opportunity-stats"],
    queryFn: () => opportunitiesApi.fetchStats(),
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["opportunity-categories"],
    queryFn: () => opportunitiesApi.fetchCategories(),
  });

  const { data: featured, isLoading: featuredLoading } = useQuery({
    queryKey: ["opportunity-featured"],
    queryFn: () => opportunitiesApi.fetchFeatured(),
  });

  const { data: nigeriaOpportunities, isLoading: nigeriaLoading } = useQuery({
    queryKey: ["opportunity-nigeria"],
    queryFn: () => opportunitiesApi.fetchNigeriaOpportunities(),
  });

  const { data: community3mtt, isLoading: communityLoading } = useQuery({
    queryKey: ["opportunity-3mtt"],
    queryFn: () => opportunitiesApi.fetch3MTTCommunity(),
  });

  const { data: scholarships, isLoading: scholarshipsLoading } = useQuery({
    queryKey: ["opportunity-scholarships"],
    queryFn: () => opportunitiesApi.fetchScholarships(),
  });

  const { data: fellowships, isLoading: fellowshipsLoading } = useQuery({
    queryKey: ["opportunity-fellowships"],
    queryFn: () => opportunitiesApi.fetchFellowships(),
  });

  const { data: hackathons, isLoading: hackathonsLoading } = useQuery({
    queryKey: ["opportunity-hackathons"],
    queryFn: () => opportunitiesApi.fetchHackathons(),
  });

  const { data: learningResources, isLoading: learningLoading } = useQuery({
    queryKey: ["opportunity-learning"],
    queryFn: () => opportunitiesApi.fetchLearningResources(),
  });

  const { data: recommendations, isLoading: recommendationsLoading } = useQuery({
    queryKey: ["opportunity-recommendations"],
    queryFn: () => opportunitiesApi.fetchRecommendations(),
  });

  const filteredFeatured = useMemo(() => {
    if (!featured) return [];
    return featured.filter((o) => {
      const categoryMatch = activeCategory === "all" || o.type === activeCategory;
      const countryMatch = filters.country === "all" || o.country === filters.country || (filters.country === "Global" && o.country !== "Nigeria");
      const stateMatch = filters.state === "all" || o.state === filters.state;
      const modeMatch = filters.workMode === "all" || o.workMode === filters.workMode;
      const expMatch = filters.experienceLevel === "all" || o.experienceLevel === filters.experienceLevel;
      return categoryMatch && countryMatch && stateMatch && modeMatch && expMatch;
    });
  }, [featured, activeCategory, filters]);

  const hasError = statsError;

  if (hasError) {
    return (
      <div className="space-y-8">
        <OpportunityHubHeader />
        <ErrorState onRetry={() => refetchStats()} />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <OpportunityHubHeader />
      <OpportunityHero stats={stats} />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <OpportunitySearch />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{t("opportunityHub.bookmarks.saved")}:</span>
          <span className="font-semibold text-foreground">{bookmarks.size}</span>
        </div>
      </div>

      <OpportunityFilters filters={filters} onChange={setFilters} />

      <OpportunityCategories
        categories={categories ?? []}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-12 lg:col-span-8 xl:col-span-9">
          <FeaturedOpportunities
            opportunities={filteredFeatured}
            isLoading={featuredLoading || categoriesLoading || statsLoading}
            bookmarkedIds={bookmarks}
            onToggleBookmark={toggleBookmark}
          />

          <NigeriaOpportunities
            opportunities={nigeriaOpportunities ?? []}
            isLoading={nigeriaLoading}
            city={nigeriaCity}
            workMode={nigeriaWorkMode}
            onCityChange={setNigeriaCity}
            onWorkModeChange={setNigeriaWorkMode}
            bookmarkedIds={bookmarks}
            onToggleBookmark={toggleBookmark}
          />

          <Community3MTT cards={community3mtt ?? []} isLoading={communityLoading} />

          <ScholarshipsSection
            scholarships={scholarships ?? []}
            isLoading={scholarshipsLoading}
            bookmarkedIds={bookmarks}
            onToggleBookmark={toggleBookmark}
          />

          <FellowshipsSection
            fellowships={fellowships ?? []}
            isLoading={fellowshipsLoading}
            bookmarkedIds={bookmarks}
            onToggleBookmark={toggleBookmark}
          />

          <HackathonsSection
            hackathons={hackathons ?? []}
            isLoading={hackathonsLoading}
            bookmarkedIds={bookmarks}
            onToggleBookmark={toggleBookmark}
          />

          <LearningResourcesSection resources={learningResources ?? []} isLoading={learningLoading} />

          <SmartRecommendations recommendations={recommendations ?? []} isLoading={recommendationsLoading} />
        </div>

        <div className="lg:col-span-4 xl:col-span-3">
          <LibertyAIPanel />
        </div>
      </div>
    </div>
  );
}
