export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  location: string;
  role?: string;
  joinedAt: string;
}

export interface ResumeExperience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  highlights?: string[];
}

export interface ResumeEducation {
  id: string;
  institution: string;
  degree?: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

/** Structured analysis payload returned by the backend resume analyzer. */
export interface ResumeAnalysis {
  careerSummary?: string;
  professionalSummary?: string;
  skills: string[];
  experience: ResumeExperience[];
  education: ResumeEducation[];
  recommendations: string[];
  careerReadiness: number;
  careerTwin?: string;
  projects?: string[];
  certifications?: string[];
  strengths?: string[];
  weaknesses?: string[];
}

export interface Resume {
  id: string;
  /** Backend resume identifier. Details/analyze calls fall back to the requested id. */
  resume_id: string;
  fileName: string;
  fileSize: number;
  uploadDate: string;
  content?: string;
  score: number;
  atsScore: number;
  status: 'analyzed' | 'processing' | 'uploaded';
  /** Populated after analyze / details when the backend returns analysis fields. */
  analysis?: ResumeAnalysis;
}

/**
 * Strict response shape returned by POST /api/v1/resumes/upload.
 * The backend ALWAYS returns { "resume_id": "<uuid>" } on success.
 */
export interface UploadResumeResponse {
  resume_id: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  matchPercentage: number;
  remote: boolean;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  postedDate: string;
  description: string;
  matchedSkills: string[];
  missingSkills: string[];
  requirements: string[];
  logoPlaceholder?: string;
  url?: string;
  recommendations?: string[];
}

export interface ATSAnalysis {
  overallScore: number;
  keywordMatch: number;
  formatting: number;
  readability: number;
  education: number;
  experience: number;
  skills: number;
  suggestions: string[];
  strengths: string[];
  weaknesses: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
  yearsExperience?: number;
}

export interface SkillGap {
  currentSkills: Skill[];
  missingSkills: {
    name: string;
    priority: 'high' | 'medium' | 'low';
    estimatedTimeWeeks: number;
  }[];
  opportunityScore: number;
  careerReadiness: number;
}

export interface CareerResource {
  id: string;
  title: string;
  type: 'course' | 'video' | 'project' | 'documentation' | 'community' | 'certification';
  provider: string;
  url: string;
  duration?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  free: boolean;
  description: string;
  tags: string[];
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: 'behavioral' | 'technical' | 'situational';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tips: string[];
  starMethod?: string;
}

export interface Report {
  id: string;
  generatedAt: string;
  resumeScore: number;
  atsScore: number;
  jobsMatched: number;
  topRecommendations: string[];
  executiveSummary: string;
}

export interface CareerRoadmap {
  currentPosition: string;
  targetRole: string;
  steps: {
    id: string;
    title: string;
    description: string;
    status: 'completed' | 'current' | 'upcoming';
    estimatedWeeks: number;
  }[];
  overallReadiness: number;
  certifications?: string[];
  learningPath?: string[];
  projects?: string[];
  timeline?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'opportunity';
  timestamp: string;
  read: boolean;
}

export interface RecentActivity {
  id: number;
  action: string;
  time: string;
}

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
  location: string;
}

export interface DashboardStats {
  resumeScore: number;
  atsScore: number;
  jobMatches: number;
  applications: number;
  careerReadiness: number;
  learningProgress: number;
}

export type Language = 'en' | 'ha' | 'yo' | 'ig';

export interface Translation {
  [key: string]: string | Translation;
}

// Opportunity Hub Types
export type OpportunityType =
  | 'job'
  | 'scholarship'
  | 'fellowship'
  | 'internship'
  | 'competition'
  | 'hackathon'
  | 'learning'
  | 'networking'
  | 'volunteer'
  | 'opensource';

export type WorkMode = 'remote' | 'hybrid' | 'onsite';

export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'executive' | 'all';

export interface OpportunityCategory {
  id: OpportunityType;
  icon: string;
  titleKey: string;
  descriptionKey: string;
  count: number;
  color: string;
}

export interface BaseOpportunity {
  id: string;
  title: string;
  organization: string;
  description: string;
  type: OpportunityType;
  location: string;
  country: string;
  state?: string;
  workMode: WorkMode;
  deadline?: string;
  postedAt?: string;
  url?: string;
  logoPlaceholder?: string;
  tags: string[];
  isFeatured?: boolean;
  isRemote?: boolean;
}

export interface FeaturedOpportunity extends BaseOpportunity {
  category: string;
  opportunityScore: number;
  salary?: string;
  experienceLevel: ExperienceLevel;
}

export interface NigeriaOpportunity extends BaseOpportunity {
  city: string;
  roleType: string;
  industry: string;
}

export interface CommunityCard {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  count: number;
  color: string;
}

export interface Scholarship extends BaseOpportunity {
  provider: string;
  coverage: string;
  eligibility: string[];
}

export interface Fellowship extends BaseOpportunity {
  provider: string;
  duration: string;
  benefits: string[];
}

export interface Hackathon extends BaseOpportunity {
  platform: string;
  prize?: string;
  date: string;
}

export interface LearningResource {
  id: string;
  title: string;
  provider: string;
  url: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  free: boolean;
  category: string;
  description: string;
  tags: string[];
}

export interface NigeriaFilter {
  city: string;
  workMode: WorkMode | 'all';
}

export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance' | 'all';
export type CompanySize = 'startup' | 'sme' | 'mid' | 'enterprise' | 'all';
export type EducationLevel = 'secondary' | 'diploma' | 'bachelors' | 'masters' | 'phd' | 'any' | 'all';
export type SectorType =
  | 'government'
  | 'private'
  | 'startup'
  | 'ngo'
  | 'international'
  | 'all';
export type CostType = 'free' | 'paid' | 'all';
export type DemandLevel = 'low' | 'moderate' | 'high' | 'very-high';
export type GrowthTrend = 'declining' | 'stable' | 'growing' | 'exploding';

export interface OpportunityFiltersState {
  category: string;
  country: string;
  state: string;
  workMode: WorkMode | 'all';
  deadline: string;
  experienceLevel: ExperienceLevel;
  salary: string;
  industry: string;
  jobType: JobType;
  location: string;
  educationLevel: EducationLevel;
  companySize: CompanySize;
  opportunityType: string;
  costType: CostType;
  sectorType: SectorType;
  onlyFree: boolean;
  onlyPaid: boolean;
  onlyGovernment: boolean;
  onlyPrivate: boolean;
  onlyStartup: boolean;
  onlyNgo: boolean;
  onlyInternational: boolean;
}

export interface OpportunityStats {
  totalOpportunities: number;
  availableJobs: number;
  scholarships: number;
  internships: number;
  hackathons: number;
  learningResources: number;
}

// Industry / Sector cards
export interface IndustrySector {
  id: string;
  name: string;
  emoji: string;
  icon: string;
  description: string;
  opportunityCount: number;
  trending: boolean;
  trendPercent?: number;
  color: string;
}

// Enhanced AI recommendations
export interface RecommendationMatchFactors {
  resume: boolean;
  skills: string[];
  careerGoal: string;
  education: string;
  experience: string;
  preferredIndustry: string;
  preferredLocation: string;
  language: string;
}

export interface SmartRecommendation {
  id: string;
  title: string;
  organization: string;
  type: OpportunityType;
  confidence: number;
  reasonKey: string;
  reason?: string;
  icon: string;
  location?: string;
  salary?: string;
  matchFactors: RecommendationMatchFactors;
  tags?: string[];
}

// Career paths
export interface CareerPath {
  id: string;
  title: string;
  description: string;
  averageSalary: string;
  demand: DemandLevel;
  growthTrend: GrowthTrend;
  growthPercent: number;
  recommendedSkills: string[];
  recommendedCertifications: string[];
  icon: string;
  color: string;
  openRoles: number;
}

// Featured employers
export interface FeaturedEmployer {
  id: string;
  name: string;
  industry: string;
  industryGroup: string;
  logoPlaceholder: string;
  openRoles: number;
  location: string;
  description: string;
  tags: string[];
  featured?: boolean;
}

// Weekly insights
export interface SkillDemand {
  skill: string;
  demandScore: number;
  changePercent: number;
}

export interface IndustryGrowth {
  industry: string;
  growthPercent: number;
  openings: number;
}

export interface StateHiring {
  state: string;
  openings: number;
  changePercent: number;
}

export interface SalaryInsight {
  role: string;
  averageSalary: string;
  range: string;
}

export interface TrendingOpportunityInsight {
  title: string;
  organization: string;
  type: string;
  views: number;
}

export interface DeadlineInsight {
  title: string;
  organization: string;
  deadline: string;
  daysLeft: number;
}

export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  type: 'meetup' | 'career-fair' | 'workshop' | 'webinar';
  attendees?: number;
}

export interface WeeklyInsights {
  weekLabel: string;
  mostInDemandSkills: SkillDemand[];
  fastestGrowingIndustries: IndustryGrowth[];
  mostActiveStates: StateHiring[];
  averageSalaries: SalaryInsight[];
  trendingOpportunities: TrendingOpportunityInsight[];
  upcomingDeadlines: DeadlineInsight[];
  communityEvents: CommunityEvent[];
  techMeetups: CommunityEvent[];
  careerFairs: CommunityEvent[];
}

// AI Chat Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  language: Language;
}

export interface ChatRequest {
  message: string;
  history: Array<Pick<ChatMessage, "role" | "content"> | ChatMessage>;
  language: Language;
}

export interface ChatResponse {
  reply: string;
  conversationId: string;
}
