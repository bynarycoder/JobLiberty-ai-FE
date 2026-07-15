import type { 
  Resume, Job, ATSAnalysis, SkillGap, CareerResource, 
  InterviewQuestion, Report, CareerRoadmap, DashboardStats, Notification, User, RecentActivity 
} from '@/lib/types';

export const MOCK_USER: User = {
  id: "user_1",
  name: "Chinedu Okoro",
  email: "chinedu.okoro@email.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chinedu",
  location: "Abuja, Nigeria",
  joinedAt: "2025-01-15",
};

export const MOCK_RESUME: Resume = {
  id: "res_001",
  fileName: "Chinedu_Okoro_Resume.pdf",
  fileSize: 245000,
  uploadDate: "2026-07-14T10:30:00Z",
  score: 82,
  atsScore: 78,
  status: "analyzed",
};

export const MOCK_JOBS: Job[] = [
  {
    id: "job_1",
    title: "Senior Backend Developer",
    company: "Paystack",
    location: "Lagos, Nigeria",
    salary: "₦18M - ₦24M",
    matchPercentage: 89,
    remote: true,
    type: "Full-time",
    postedDate: "2026-07-10",
    description: "Join our engineering team to build scalable payment infrastructure.",
    matchedSkills: ["Node.js", "PostgreSQL", "Docker", "TypeScript"],
    missingSkills: ["Kubernetes", "Redis"],
    requirements: ["5+ years backend experience", "Strong API design skills"],
    logoPlaceholder: "PS",
  },
  {
    id: "job_2",
    title: "Full Stack Engineer",
    company: "Flutterwave",
    location: "Lagos, Nigeria",
    salary: "₦15M - ₦20M",
    matchPercentage: 76,
    remote: false,
    type: "Full-time",
    postedDate: "2026-07-08",
    description: "Build beautiful payment experiences across Africa.",
    matchedSkills: ["React", "Node.js", "PostgreSQL", "TypeScript"],
    missingSkills: ["AWS", "CI/CD"],
    requirements: ["3+ years fullstack experience"],
    logoPlaceholder: "FL",
  },
  {
    id: "job_3",
    title: "Software Engineer (Backend)",
    company: "Andela",
    location: "Remote",
    salary: "$65K - $85K",
    matchPercentage: 84,
    remote: true,
    type: "Full-time",
    postedDate: "2026-07-05",
    description: "Work on global client projects with leading African engineers.",
    matchedSkills: ["Node.js", "TypeScript", "Docker"],
    missingSkills: ["GraphQL", "AWS"],
    requirements: ["Strong fundamentals in backend systems"],
    logoPlaceholder: "AN",
  },
  {
    id: "job_4",
    title: "Product Engineer",
    company: "Kuda Bank",
    location: "Abuja, Nigeria",
    salary: "₦16M - ₦22M",
    matchPercentage: 71,
    remote: false,
    type: "Full-time",
    postedDate: "2026-07-12",
    description: "Help build the best banking experience in Africa.",
    matchedSkills: ["React", "Node.js"],
    missingSkills: ["Python", "AWS"],
    requirements: ["Experience with fintech systems"],
    logoPlaceholder: "KU",
  }
];

export const MOCK_ATS: ATSAnalysis = {
  overallScore: 78,
  keywordMatch: 82,
  formatting: 75,
  readability: 88,
  education: 90,
  experience: 72,
  skills: 81,
  suggestions: [
    "Add more quantifiable achievements (e.g. 'Improved API response time by 40%')",
    "Include keywords from job descriptions such as 'microservices' and 'CI/CD'",
    "Standardize date format across all experiences",
    "Add a skills section with proficiency levels"
  ],
  strengths: [
    "Strong technical keywords present",
    "Clear formatting and structure",
    "Good education section"
  ],
  weaknesses: [
    "Limited use of action verbs",
    "Missing industry-specific keywords",
    "Experience section could be more detailed"
  ]
};

export const MOCK_SKILL_GAP: SkillGap = {
  currentSkills: [
    { id: "s1", name: "JavaScript", level: "advanced", category: "Programming", yearsExperience: 5 },
    { id: "s2", name: "Node.js", level: "advanced", category: "Backend", yearsExperience: 4 },
    { id: "s3", name: "React", level: "intermediate", category: "Frontend", yearsExperience: 3 },
    { id: "s4", name: "PostgreSQL", level: "intermediate", category: "Database", yearsExperience: 3 },
    { id: "s5", name: "TypeScript", level: "advanced", category: "Programming", yearsExperience: 3 },
    { id: "s6", name: "Docker", level: "intermediate", category: "DevOps", yearsExperience: 2 },
  ],
  missingSkills: [
    { name: "Kubernetes", priority: "high", estimatedTimeWeeks: 4 },
    { name: "AWS", priority: "high", estimatedTimeWeeks: 6 },
    { name: "CI/CD", priority: "medium", estimatedTimeWeeks: 3 },
    { name: "Redis", priority: "medium", estimatedTimeWeeks: 2 },
    { name: "GraphQL", priority: "low", estimatedTimeWeeks: 2 },
  ],
  opportunityScore: 91,
  careerReadiness: 72,
};

export const MOCK_CAREER_RESOURCES: CareerResource[] = [
  {
    id: "r1", title: "Backend Engineering with Node.js", type: "course", provider: "freeCodeCamp", url: "#", duration: "28 hours", difficulty: "Intermediate", free: true, description: "Master backend development.", tags: ["Node.js", "Backend"]
  },
  {
    id: "r2", title: "AWS Certified Developer - Associate", type: "certification", provider: "AWS", url: "#", duration: "6 weeks", difficulty: "Intermediate", free: false, description: "Industry-standard cloud certification.", tags: ["AWS", "Cloud"]
  },
  {
    id: "r3", title: "Docker for Beginners", type: "video", provider: "YouTube", url: "#", duration: "2h 45m", difficulty: "Beginner", free: true, description: "Containerization fundamentals.", tags: ["Docker"]
  },
  {
    id: "r4", title: "Kubernetes in Action", type: "course", provider: "Udemy", url: "#", duration: "18 hours", difficulty: "Intermediate", free: false, description: "Deep dive into Kubernetes.", tags: ["Kubernetes"]
  },
];

export const MOCK_INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: "iq1", question: "Tell me about a time you handled a production incident.", category: "behavioral", difficulty: "Medium", tips: ["Use STAR method", "Focus on resolution"], starMethod: "Situation: Production outage... Task: Restore service..."
  },
  {
    id: "iq2", question: "Explain how you would design a scalable payment API.", category: "technical", difficulty: "Hard", tips: ["Think about idempotency", "Rate limiting"], starMethod: ""
  },
  {
    id: "iq3", question: "Describe a project where you significantly improved performance.", category: "behavioral", difficulty: "Medium", tips: ["Include metrics"], starMethod: ""
  }
];

export const MOCK_REPORT: Report = {
  id: "rep_1",
  generatedAt: "2026-07-15T09:00:00Z",
  resumeScore: 82,
  atsScore: 78,
  jobsMatched: 47,
  topRecommendations: ["Add Kubernetes experience", "Build a portfolio project", "Get AWS certification"],
  executiveSummary: "Strong backend engineer profile with excellent technical foundation. Significant opportunity to improve ATS compatibility and expand cloud skills."
};

export const MOCK_ROADMAP: CareerRoadmap = {
  currentPosition: "Mid-level Backend Engineer",
  targetRole: "Senior Backend Engineer @ Fintech",
  steps: [
    { id: "step1", title: "Master Kubernetes", description: "Complete Kubernetes in Action course", status: "completed", estimatedWeeks: 4 },
    { id: "step2", title: "AWS Certification", description: "Prepare for AWS Developer Associate", status: "current", estimatedWeeks: 6 },
    { id: "step3", title: "Build 2 Portfolio Projects", description: "Payment system + CI/CD pipeline", status: "upcoming", estimatedWeeks: 5 },
    { id: "step4", title: "Advanced System Design", description: "Study distributed systems patterns", status: "upcoming", estimatedWeeks: 3 },
  ],
  overallReadiness: 72,
};

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  resumeScore: 82,
  atsScore: 78,
  jobMatches: 47,
  applications: 12,
  careerReadiness: 72,
  learningProgress: 64,
};

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "n1", title: "New Job Match", message: "Senior Backend role at Paystack matches 89%.", type: "opportunity", timestamp: "2026-07-14T15:20:00Z", read: false },
  { id: "n2", title: "Resume Analysis Ready", message: "Your latest resume has been analyzed.", type: "success", timestamp: "2026-07-14T10:30:00Z", read: true },
  { id: "n3", title: "Learning Reminder", message: "You've completed 60% of your Kubernetes roadmap.", type: "info", timestamp: "2026-07-13T08:00:00Z", read: false },
];

export const MOCK_RECENT_ACTIVITY: RecentActivity[] = [
  { id: 1, action: "Uploaded new resume", time: "2 hours ago" },
  { id: 2, action: "Applied to Flutterwave role", time: "Yesterday" },
  { id: 3, action: "Completed Docker course", time: "3 days ago" },
];
