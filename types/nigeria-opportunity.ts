export interface NigeriaFeaturedCategory {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  opportunityCount: number;
  examples?: string[];
  displayDetails?: {
    badge?: string;
    salaryPlaceholder?: string;
    companyPlaceholder?: string;
    incubators?: string[];
    accelerators?: string[];
    hubs?: string[];
    grants?: string[];
    competitions?: string[];
  };
}

export interface NigeriaStateOpportunity {
  id: string;
  stateName: string;
  nameKey: string;
  opportunityCount: number;
  popularIndustryKey: string;
}

export interface NigeriaPopularIndustry {
  id: string;
  nameKey: string;
}

export interface NigeriaCommunityEvent {
  id: string;
  titleKey: string;
  descriptionKey: string;
  dateKey: string;
  locationKey: string;
  icon: string;
  tagsKeys: string[];
}

export interface NigeriaOrganization {
  id: string;
  name: string;
  logoPlaceholder: string;
}

export interface NigeriaAIRecommendation {
  id: string;
  titleKey: string;
  organization: string;
  descriptionKey: string;
  confidence: number;
  roleTypeKey: string;
  tagsKeys: string[];
}
