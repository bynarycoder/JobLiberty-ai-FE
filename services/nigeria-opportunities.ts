import type {
  NigeriaFeaturedCategory,
  NigeriaStateOpportunity,
  NigeriaPopularIndustry,
  NigeriaCommunityEvent,
  NigeriaOrganization,
  NigeriaAIRecommendation,
} from '@/types/nigeria-opportunity';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const NIGERIA_FEATURED_CATEGORIES: NigeriaFeaturedCategory[] = [
  {
    id: 'nysc',
    titleKey: 'opportunityHub.madeForNigerians.categories.nysc.title',
    descriptionKey: 'opportunityHub.madeForNigerians.categories.nysc.description',
    icon: 'Flag',
    opportunityCount: 142,
  },
  {
    id: 'siwes',
    titleKey: 'opportunityHub.madeForNigerians.categories.siwes.title',
    descriptionKey: 'opportunityHub.madeForNigerians.categories.siwes.description',
    icon: 'GraduationCap',
    opportunityCount: 88,
  },
  {
    id: 'graduate_trainee',
    titleKey: 'opportunityHub.madeForNigerians.categories.graduate.title',
    descriptionKey: 'opportunityHub.madeForNigerians.categories.graduate.description',
    icon: 'Briefcase',
    opportunityCount: 215,
    examples: [
      'GTCO',
      'Access Bank',
      'First Bank',
      'MTN Nigeria',
      'Airtel Nigeria',
      'Flutterwave',
      'Moniepoint',
      'Paystack',
      'Interswitch',
      'Andela',
    ],
  },
  {
    id: 'startup_jobs',
    titleKey: 'opportunityHub.madeForNigerians.categories.startups.title',
    descriptionKey: 'opportunityHub.madeForNigerians.categories.startups.description',
    icon: 'Rocket',
    opportunityCount: 310,
    examples: [
      'Moniepoint',
      'Paystack',
      'Cowrywise',
      'Helium Health',
      'Kuda',
      'Termii',
      'Brass',
      'Bamboo',
    ],
  },
  {
    id: 'remote_for_africans',
    titleKey: 'opportunityHub.madeForNigerians.categories.remote.title',
    descriptionKey: 'opportunityHub.madeForNigerians.categories.remote.description',
    icon: 'Globe',
    opportunityCount: 425,
    displayDetails: {
      badge: 'Remote',
      salaryPlaceholder: '$1,500 - $3,500 / month',
      companyPlaceholder: 'GlobalTech Solutions Inc.',
    },
  },
  {
    id: 'ai_tech_fellowships',
    titleKey: 'opportunityHub.madeForNigerians.categories.fellowships.title',
    descriptionKey: 'opportunityHub.madeForNigerians.categories.fellowships.description',
    icon: 'Cpu',
    opportunityCount: 54,
    examples: [
      '3MTT',
      'ALX',
      'Google Africa',
      'Microsoft ADC',
      'AI4D Africa',
      'Data Science Nigeria',
      'Google Developer Groups',
      'Women Techmakers',
    ],
  },
  {
    id: 'free_certifications',
    titleKey: 'opportunityHub.madeForNigerians.categories.certifications.title',
    descriptionKey: 'opportunityHub.madeForNigerians.categories.certifications.description',
    icon: 'BookOpen',
    opportunityCount: 180,
    examples: [
      'Microsoft Learn',
      'Google Cloud Skills Boost',
      'Cisco Skills for All',
      'AWS Skill Builder',
      'IBM SkillsBuild',
      'Oracle Learning',
    ],
  },
  {
    id: 'competitions',
    titleKey: 'opportunityHub.madeForNigerians.categories.competitions.title',
    descriptionKey: 'opportunityHub.madeForNigerians.categories.competitions.description',
    icon: 'Trophy',
    opportunityCount: 23,
    examples: [
      'Zindi Africa',
      'Google Solution Challenge',
      'Microsoft Imagine Cup',
      'Devpost',
      'Hacktoberfest',
    ],
  },
  {
    id: 'opensource',
    titleKey: 'opportunityHub.madeForNigerians.categories.opensource.title',
    descriptionKey: 'opportunityHub.madeForNigerians.categories.opensource.description',
    icon: 'Code2',
    opportunityCount: 41,
    examples: [
      'Google Summer of Code',
      'Outreachy',
      'MLH Fellowship',
      'GitHub Open Source',
      'Open Source Community Africa',
    ],
  },
  {
    id: 'entrepreneurship',
    titleKey: 'opportunityHub.madeForNigerians.categories.entrepreneurship.title',
    descriptionKey: 'opportunityHub.madeForNigerians.categories.entrepreneurship.description',
    icon: 'Sparkles',
    opportunityCount: 67,
    displayDetails: {
      incubators: ['CcHub', 'Wennovation Hub', 'Founders Factory Africa'],
      grants: ['Tony Elumelu Foundation', 'Lagos Innovates'],
    },
  },
];

export const NIGERIA_STATE_OPPORTUNITIES: NigeriaStateOpportunity[] = [
  { id: 'state_lagos', stateName: 'Lagos', nameKey: 'opportunityHub.madeForNigerians.states.lagos', opportunityCount: 1420, popularIndustryKey: 'opportunityHub.madeForNigerians.industries.finance' },
  { id: 'state_abuja', stateName: 'Abuja (FCT)', nameKey: 'opportunityHub.madeForNigerians.states.abuja', opportunityCount: 645, popularIndustryKey: 'opportunityHub.madeForNigerians.industries.govtech' },
  { id: 'state_ogun', stateName: 'Ogun', nameKey: 'opportunityHub.madeForNigerians.states.ogun', opportunityCount: 215, popularIndustryKey: 'opportunityHub.madeForNigerians.industries.agritech' },
  { id: 'state_oyo', stateName: 'Oyo', nameKey: 'opportunityHub.madeForNigerians.states.oyo', opportunityCount: 180, popularIndustryKey: 'opportunityHub.madeForNigerians.industries.edtech' },
  { id: 'state_kwara', stateName: 'Kwara', nameKey: 'opportunityHub.madeForNigerians.states.kwara', opportunityCount: 95, popularIndustryKey: 'opportunityHub.madeForNigerians.industries.agritech' },
  { id: 'state_osun', stateName: 'Osun', nameKey: 'opportunityHub.madeForNigerians.states.osun', opportunityCount: 78, popularIndustryKey: 'opportunityHub.madeForNigerians.industries.edtech' },
  { id: 'state_ekiti', stateName: 'Ekiti', nameKey: 'opportunityHub.madeForNigerians.states.ekiti', opportunityCount: 62, popularIndustryKey: 'opportunityHub.madeForNigerians.industries.edtech' },
  { id: 'state_ondo', stateName: 'Ondo', nameKey: 'opportunityHub.madeForNigerians.states.ondo', opportunityCount: 70, popularIndustryKey: 'opportunityHub.madeForNigerians.industries.agritech' },
  { id: 'state_rivers', stateName: 'Rivers', nameKey: 'opportunityHub.madeForNigerians.states.rivers', opportunityCount: 310, popularIndustryKey: 'opportunityHub.madeForNigerians.industries.finance' },
  { id: 'state_enugu', stateName: 'Enugu', nameKey: 'opportunityHub.madeForNigerians.states.enugu', opportunityCount: 125, popularIndustryKey: 'opportunityHub.madeForNigerians.states.software' },
  { id: 'state_kaduna', stateName: 'Kaduna', nameKey: 'opportunityHub.madeForNigerians.states.kaduna', opportunityCount: 140, popularIndustryKey: 'opportunityHub.madeForNigerians.states.software' },
  { id: 'state_kano', stateName: 'Kano', nameKey: 'opportunityHub.madeForNigerians.states.kano', opportunityCount: 195, popularIndustryKey: 'opportunityHub.madeForNigerians.industries.finance' },
  { id: 'state_plateau', stateName: 'Plateau', nameKey: 'opportunityHub.madeForNigerians.states.plateau', opportunityCount: 85, popularIndustryKey: 'opportunityHub.madeForNigerians.states.software' },
  { id: 'state_cross_river', stateName: 'Cross River', nameKey: 'opportunityHub.madeForNigerians.states.cross_river', opportunityCount: 92, popularIndustryKey: 'opportunityHub.madeForNigerians.industries.healthtech' },
  { id: 'state_delta', stateName: 'Delta', nameKey: 'opportunityHub.madeForNigerians.states.delta', opportunityCount: 110, popularIndustryKey: 'opportunityHub.madeForNigerians.industries.finance' },
  { id: 'state_anambra', stateName: 'Anambra', nameKey: 'opportunityHub.madeForNigerians.states.anambra', opportunityCount: 115, popularIndustryKey: 'opportunityHub.madeForNigerians.industries.finance' },
  { id: 'state_edo', stateName: 'Edo', nameKey: 'opportunityHub.madeForNigerians.states.edo', opportunityCount: 130, popularIndustryKey: 'opportunityHub.madeForNigerians.states.software' },
  { id: 'state_akwa_ibom', stateName: 'Akwa Ibom', nameKey: 'opportunityHub.madeForNigerians.states.akwa_ibom', opportunityCount: 105, popularIndustryKey: 'opportunityHub.madeForNigerians.states.software' },
];

export const NIGERIA_POPULAR_INDUSTRIES: NigeriaPopularIndustry[] = [
  { id: 'ind_software', nameKey: 'opportunityHub.madeForNigerians.industries.software' },
  { id: 'ind_ai', nameKey: 'opportunityHub.madeForNigerians.industries.ai' },
  { id: 'ind_cybersecurity', nameKey: 'opportunityHub.madeForNigerians.industries.cybersecurity' },
  { id: 'ind_cloud', nameKey: 'opportunityHub.madeForNigerians.industries.cloud' },
  { id: 'ind_data_science', nameKey: 'opportunityHub.madeForNigerians.industries.data_science' },
  { id: 'ind_uiux', nameKey: 'opportunityHub.madeForNigerians.industries.uiux' },
  { id: 'ind_product', nameKey: 'opportunityHub.madeForNigerians.industries.product' },
  { id: 'ind_devops', nameKey: 'opportunityHub.madeForNigerians.industries.devops' },
  { id: 'ind_marketing', nameKey: 'opportunityHub.madeForNigerians.industries.marketing' },
  { id: 'ind_finance', nameKey: 'opportunityHub.madeForNigerians.industries.finance' },
  { id: 'ind_healthtech', nameKey: 'opportunityHub.madeForNigerians.industries.healthtech' },
  { id: 'ind_edtech', nameKey: 'opportunityHub.madeForNigerians.industries.edtech' },
  { id: 'ind_agritech', nameKey: 'opportunityHub.madeForNigerians.industries.agritech' },
  { id: 'ind_govtech', nameKey: 'opportunityHub.madeForNigerians.industries.govtech' },
];

export const NIGERIA_COMMUNITY_EVENTS: NigeriaCommunityEvent[] = [
  {
    id: 'evt_meetups',
    titleKey: 'opportunityHub.madeForNigerians.events.meetups.title',
    descriptionKey: 'opportunityHub.madeForNigerians.events.meetups.description',
    dateKey: 'opportunityHub.madeForNigerians.events.meetups.date',
    locationKey: 'opportunityHub.madeForNigerians.events.meetups.location',
    icon: 'Users',
    tagsKeys: ['opportunityHub.madeForNigerians.events.tags.networking', 'opportunityHub.madeForNigerians.events.tags.local'],
  },
  {
    id: 'evt_hackathons',
    titleKey: 'opportunityHub.madeForNigerians.events.hackathons.title',
    descriptionKey: 'opportunityHub.madeForNigerians.events.hackathons.description',
    dateKey: 'opportunityHub.madeForNigerians.events.hackathons.date',
    locationKey: 'opportunityHub.madeForNigerians.events.hackathons.location',
    icon: 'Trophy',
    tagsKeys: ['opportunityHub.madeForNigerians.events.tags.building', 'opportunityHub.madeForNigerians.events.tags.prizes'],
  },
  {
    id: 'evt_bootcamps',
    titleKey: 'opportunityHub.madeForNigerians.events.bootcamps.title',
    descriptionKey: 'opportunityHub.madeForNigerians.events.bootcamps.description',
    dateKey: 'opportunityHub.madeForNigerians.events.bootcamps.date',
    locationKey: 'opportunityHub.madeForNigerians.events.bootcamps.location',
    icon: 'Laptop',
    tagsKeys: ['opportunityHub.madeForNigerians.events.tags.learning', 'opportunityHub.madeForNigerians.events.tags.career'],
  },
  {
    id: 'evt_conferences',
    titleKey: 'opportunityHub.madeForNigerians.events.conferences.title',
    descriptionKey: 'opportunityHub.madeForNigerians.events.conferences.description',
    dateKey: 'opportunityHub.madeForNigerians.events.conferences.date',
    locationKey: 'opportunityHub.madeForNigerians.events.conferences.location',
    icon: 'Calendar',
    tagsKeys: ['opportunityHub.madeForNigerians.events.tags.summit', 'opportunityHub.madeForNigerians.events.tags.ecosystem'],
  },
  {
    id: 'evt_dev_communities',
    titleKey: 'opportunityHub.madeForNigerians.events.communities.title',
    descriptionKey: 'opportunityHub.madeForNigerians.events.communities.description',
    dateKey: 'opportunityHub.madeForNigerians.events.communities.date',
    locationKey: 'opportunityHub.madeForNigerians.events.communities.location',
    icon: 'Code2',
    tagsKeys: ['opportunityHub.madeForNigerians.events.tags.developers', 'opportunityHub.madeForNigerians.events.tags.mentorship'],
  },
  {
    id: 'evt_networking_events',
    titleKey: 'opportunityHub.madeForNigerians.events.networking.title',
    descriptionKey: 'opportunityHub.madeForNigerians.events.networking.description',
    dateKey: 'opportunityHub.madeForNigerians.events.networking.date',
    locationKey: 'opportunityHub.madeForNigerians.events.networking.location',
    icon: 'Handshake',
    tagsKeys: ['opportunityHub.madeForNigerians.events.tags.career', 'opportunityHub.madeForNigerians.events.tags.connections'],
  },
  {
    id: 'evt_career_fairs',
    titleKey: 'opportunityHub.madeForNigerians.events.fairs.title',
    descriptionKey: 'opportunityHub.madeForNigerians.events.fairs.description',
    dateKey: 'opportunityHub.madeForNigerians.events.fairs.date',
    locationKey: 'opportunityHub.madeForNigerians.events.fairs.location',
    icon: 'Briefcase',
    tagsKeys: ['opportunityHub.madeForNigerians.events.tags.jobs', 'opportunityHub.madeForNigerians.events.tags.hiring'],
  },
];

export const NIGERIA_FEATURED_ORGANIZATIONS: NigeriaOrganization[] = [
  { id: 'org_3mtt', name: '3MTT', logoPlaceholder: '3MTT' },
  { id: 'org_nitda', name: 'NITDA', logoPlaceholder: 'NITDA' },
  { id: 'org_alx', name: 'ALX', logoPlaceholder: 'ALX' },
  { id: 'org_google', name: 'Google', logoPlaceholder: 'GOOG' },
  { id: 'org_microsoft', name: 'Microsoft', logoPlaceholder: 'MSFT' },
  { id: 'org_flutterwave', name: 'Flutterwave', logoPlaceholder: 'FW' },
  { id: 'org_paystack', name: 'Paystack', logoPlaceholder: 'PSTK' },
  { id: 'org_moniepoint', name: 'Moniepoint', logoPlaceholder: 'MNPT' },
  { id: 'org_interswitch', name: 'Interswitch', logoPlaceholder: 'ISWC' },
  { id: 'org_mtn', name: 'MTN', logoPlaceholder: 'MTN' },
  { id: 'org_airtel', name: 'Airtel', logoPlaceholder: 'ARTL' },
  { id: 'org_andela', name: 'Andela', logoPlaceholder: 'ANDL' },
  { id: 'org_dsn', name: 'Data Science Nigeria', logoPlaceholder: 'DSN' },
  { id: 'org_cisco', name: 'Cisco', logoPlaceholder: 'CSCO' },
  { id: 'org_aws', name: 'AWS', logoPlaceholder: 'AWS' },
];

export const NIGERIA_AI_RECOMMENDATIONS: NigeriaAIRecommendation[] = [
  {
    id: 'rec_ng_1',
    titleKey: 'opportunityHub.madeForNigerians.recommendations.rec1.title',
    organization: 'Moniepoint',
    descriptionKey: 'opportunityHub.madeForNigerians.recommendations.rec1.description',
    confidence: 97,
    roleTypeKey: 'opportunityHub.madeForNigerians.categories.startups.title',
    tagsKeys: ['opportunityHub.madeForNigerians.industries.software', 'opportunityHub.madeForNigerians.industries.finance'],
  },
  {
    id: 'rec_ng_2',
    titleKey: 'opportunityHub.madeForNigerians.recommendations.rec2.title',
    organization: '3MTT & Federal Ministry of Communications',
    descriptionKey: 'opportunityHub.madeForNigerians.recommendations.rec2.description',
    confidence: 94,
    roleTypeKey: 'opportunityHub.madeForNigerians.categories.fellowships.title',
    tagsKeys: ['opportunityHub.madeForNigerians.industries.ai', 'opportunityHub.madeForNigerians.industries.software'],
  },
  {
    id: 'rec_ng_3',
    titleKey: 'opportunityHub.madeForNigerians.recommendations.rec3.title',
    organization: 'Paystack',
    descriptionKey: 'opportunityHub.madeForNigerians.recommendations.rec3.description',
    confidence: 89,
    roleTypeKey: 'opportunityHub.madeForNigerians.categories.nysc.title',
    tagsKeys: ['opportunityHub.madeForNigerians.industries.uiux', 'opportunityHub.madeForNigerians.industries.software'],
  },
];

export const nigeriaOpportunitiesApi = {
  async fetchFeaturedCategories(): Promise<NigeriaFeaturedCategory[]> {
    await delay(300);
    return NIGERIA_FEATURED_CATEGORIES;
  },

  async fetchStateOpportunities(): Promise<NigeriaStateOpportunity[]> {
    await delay(350);
    return NIGERIA_STATE_OPPORTUNITIES;
  },

  async fetchPopularIndustries(): Promise<NigeriaPopularIndustry[]> {
    await delay(200);
    return NIGERIA_POPULAR_INDUSTRIES;
  },

  async fetchCommunityEvents(): Promise<NigeriaCommunityEvent[]> {
    await delay(250);
    return NIGERIA_COMMUNITY_EVENTS;
  },

  async fetchFeaturedOrganizations(): Promise<NigeriaOrganization[]> {
    await delay(200);
    return NIGERIA_FEATURED_ORGANIZATIONS;
  },

  async fetchAIRecommendations(): Promise<NigeriaAIRecommendation[]> {
    await delay(300);
    return NIGERIA_AI_RECOMMENDATIONS;
  },
};
