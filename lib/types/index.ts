export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  location: string;
  role?: string;
  joinedAt: string;
}

export interface Resume {
  id: string;
  fileName: string;
  fileSize: number;
  uploadDate: string;
  content?: string;
  score: number;
  atsScore: number;
  status: 'analyzed' | 'processing' | 'uploaded';
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

export interface SmartRecommendation {
  id: string;
  title: string;
  type: OpportunityType;
  confidence: number;
  reasonKey: string;
  icon: string;
}

export interface NigeriaFilter {
  city: string;
  workMode: WorkMode | 'all';
}

export interface OpportunityFiltersState {
  category: string;
  country: string;
  state: string;
  workMode: WorkMode | 'all';
  deadline: string;
  experienceLevel: ExperienceLevel;
  salary: string;
  industry: string;
}

export interface OpportunityStats {
  totalOpportunities: number;
  availableJobs: number;
  scholarships: number;
  internships: number;
  hackathons: number;
  learningResources: number;
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
  history: ChatMessage[];
  language: Language;
}

export interface ChatResponse {
  reply: string;
  conversationId: string;
}
