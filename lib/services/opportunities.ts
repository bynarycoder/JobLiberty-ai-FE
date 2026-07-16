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
} from '@/lib/types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const CATEGORIES: OpportunityCategory[] = [
  { id: 'job', icon: 'Briefcase', titleKey: 'opportunityHub.categories.jobs', descriptionKey: 'opportunityHub.categories.jobsDesc', count: 1247, color: 'from-blue-500 to-blue-600' },
  { id: 'scholarship', icon: 'GraduationCap', titleKey: 'opportunityHub.categories.scholarships', descriptionKey: 'opportunityHub.categories.scholarshipsDesc', count: 86, color: 'from-emerald-500 to-emerald-600' },
  { id: 'fellowship', icon: 'Rocket', titleKey: 'opportunityHub.categories.fellowships', descriptionKey: 'opportunityHub.categories.fellowshipsDesc', count: 34, color: 'from-violet-500 to-violet-600' },
  { id: 'internship', icon: 'Laptop', titleKey: 'opportunityHub.categories.internships', descriptionKey: 'opportunityHub.categories.internshipsDesc', count: 215, color: 'from-amber-500 to-amber-600' },
  { id: 'competition', icon: 'Trophy', titleKey: 'opportunityHub.categories.competitions', descriptionKey: 'opportunityHub.categories.competitionsDesc', count: 52, color: 'from-rose-500 to-rose-600' },
  { id: 'hackathon', icon: 'Mic2', titleKey: 'opportunityHub.categories.hackathons', descriptionKey: 'opportunityHub.categories.hackathonsDesc', count: 28, color: 'from-cyan-500 to-cyan-600' },
  { id: 'learning', icon: 'BookOpen', titleKey: 'opportunityHub.categories.learning', descriptionKey: 'opportunityHub.categories.learningDesc', count: 430, color: 'from-orange-500 to-orange-600' },
  { id: 'networking', icon: 'Handshake', titleKey: 'opportunityHub.categories.networking', descriptionKey: 'opportunityHub.categories.networkingDesc', count: 67, color: 'from-pink-500 to-pink-600' },
  { id: 'volunteer', icon: 'Heart', titleKey: 'opportunityHub.categories.volunteer', descriptionKey: 'opportunityHub.categories.volunteerDesc', count: 43, color: 'from-teal-500 to-teal-600' },
  { id: 'opensource', icon: 'Code2', titleKey: 'opportunityHub.categories.opensource', descriptionKey: 'opportunityHub.categories.opensourceDesc', count: 91, color: 'from-indigo-500 to-indigo-600' },
];

export const FEATURED_OPPORTUNITIES: FeaturedOpportunity[] = [
  {
    id: 'feat_1',
    title: 'Backend Engineering Intern',
    organization: 'Paystack',
    description: "Join the team building Africa's most trusted payments infrastructure. Work on APIs, webhooks, and financial systems.",
    type: 'internship',
    category: 'Internships',
    location: 'Lagos, Nigeria',
    country: 'Nigeria',
    state: 'Lagos',
    workMode: 'hybrid',
    deadline: '2026-08-15',
    postedAt: '2026-07-10',
    url: '#',
    logoPlaceholder: 'PS',
    tags: ['Node.js', 'PostgreSQL', 'Payments'],
    opportunityScore: 94,
    salary: '₦150,000 - ₦250,000',
    experienceLevel: 'entry',
    isFeatured: true,
    isRemote: false,
  },
  {
    id: 'feat_2',
    title: 'Google Africa Developer Scholarship',
    organization: 'Google & Pluralsight',
    description: 'Fully-funded scholarship for Android, Web, and Cloud development tracks. Designed for aspiring African developers.',
    type: 'scholarship',
    category: 'Scholarships',
    location: 'Africa',
    country: 'Nigeria',
    workMode: 'remote',
    deadline: '2026-08-30',
    postedAt: '2026-07-12',
    url: '#',
    logoPlaceholder: 'GD',
    tags: ['Android', 'Web', 'Cloud'],
    opportunityScore: 91,
    experienceLevel: 'all',
    isFeatured: true,
    isRemote: true,
  },
  {
    id: 'feat_3',
    title: 'Junior Data Analyst',
    organization: 'Flutterwave',
    description: 'Analyze payment trends, build dashboards, and support data-driven decisions across the business.',
    type: 'job',
    category: 'Jobs',
    location: 'Lagos, Nigeria',
    country: 'Nigeria',
    state: 'Lagos',
    workMode: 'onsite',
    deadline: '2026-08-05',
    postedAt: '2026-07-08',
    url: '#',
    logoPlaceholder: 'FW',
    tags: ['SQL', 'Python', 'Tableau'],
    opportunityScore: 88,
    salary: '₦8M - ₦12M',
    experienceLevel: 'entry',
    isFeatured: true,
    isRemote: false,
  },
  {
    id: 'feat_4',
    title: 'MLH Global Hack Week',
    organization: 'Major League Hacking',
    description: 'A week-long global hackathon with mentorship, workshops, and prizes. Perfect for students and early-career developers.',
    type: 'hackathon',
    category: 'Hackathons',
    location: 'Global',
    country: 'Nigeria',
    workMode: 'remote',
    deadline: '2026-09-01',
    postedAt: '2026-07-14',
    url: '#',
    logoPlaceholder: 'ML',
    tags: ['Hackathon', 'Global', 'Prizes'],
    opportunityScore: 86,
    experienceLevel: 'all',
    isFeatured: true,
    isRemote: true,
  },
];

export const NIGERIA_OPPORTUNITIES: NigeriaOpportunity[] = [
  { id: 'ng_1', title: 'Graduate Trainee Program', organization: 'Guaranty Trust Bank', description: 'A 6-month rotational program for recent graduates across banking operations.', type: 'job', roleType: 'Graduate Trainee', city: 'Lagos', location: 'Lagos, Nigeria', country: 'Nigeria', state: 'Lagos', workMode: 'hybrid', industry: 'Banking', deadline: '2026-08-20', logoPlaceholder: 'GT', tags: ['Finance', 'Trainee'], url: '#' },
  { id: 'ng_2', title: 'NYSC Tech Placement', organization: 'Andela Nigeria', description: 'Exclusive NYSC placement for software engineers and product designers.', type: 'internship', roleType: 'NYSC Placements', city: 'Lagos', location: 'Lagos, Nigeria', country: 'Nigeria', state: 'Lagos', workMode: 'onsite', industry: 'Technology', deadline: '2026-08-10', logoPlaceholder: 'AN', tags: ['NYSC', 'Software'], url: '#' },
  { id: 'ng_3', title: 'Software Engineer', organization: 'Paystack', description: 'Build payments infrastructure used by thousands of African businesses.', type: 'job', roleType: 'Software Engineering Jobs', city: 'Lagos', location: 'Lagos, Nigeria', country: 'Nigeria', state: 'Lagos', workMode: 'hybrid', industry: 'Technology', deadline: '2026-08-15', logoPlaceholder: 'PS', tags: ['Backend', 'Node.js'], url: '#' },
  { id: 'ng_4', title: 'Data Analyst', organization: 'Carbon', description: 'Analyze customer behavior and financial data to drive product decisions.', type: 'job', roleType: 'Data Analyst Jobs', city: 'Lagos', location: 'Lagos, Nigeria', country: 'Nigeria', state: 'Lagos', workMode: 'onsite', industry: 'Fintech', deadline: '2026-08-12', logoPlaceholder: 'CB', tags: ['SQL', 'Python'], url: '#' },
  { id: 'ng_5', title: 'AI Research Intern', organization: 'Data Science Nigeria', description: 'Contribute to cutting-edge AI research and community education programs.', type: 'internship', roleType: 'AI Jobs', city: 'Lagos', location: 'Lagos, Nigeria', country: 'Nigeria', state: 'Lagos', workMode: 'hybrid', industry: 'Technology', deadline: '2026-08-25', logoPlaceholder: 'DS', tags: ['AI', 'Research'], url: '#' },
  { id: 'ng_6', title: 'Frontend Developer', organization: 'Kuda Bank', description: 'Create delightful mobile and web banking experiences for millions.', type: 'job', roleType: 'Frontend Jobs', city: 'Lagos', location: 'Lagos, Nigeria', country: 'Nigeria', state: 'Lagos', workMode: 'hybrid', industry: 'Fintech', deadline: '2026-08-18', logoPlaceholder: 'KU', tags: ['React', 'TypeScript'], url: '#' },
  { id: 'ng_7', title: 'Backend Developer', organization: 'Moniepoint', description: 'Design and maintain scalable backend services for financial products.', type: 'job', roleType: 'Backend Jobs', city: 'Lagos', location: 'Lagos, Nigeria', country: 'Nigeria', state: 'Lagos', workMode: 'hybrid', industry: 'Fintech', deadline: '2026-08-22', logoPlaceholder: 'MP', tags: ['Go', 'Java'], url: '#' },
  { id: 'ng_8', title: 'Product Designer', organization: 'Opay', description: 'Lead design for consumer-facing financial products across Africa.', type: 'job', roleType: 'Product Design', city: 'Lagos', location: 'Lagos, Nigeria', country: 'Nigeria', state: 'Lagos', workMode: 'onsite', industry: 'Technology', deadline: '2026-08-14', logoPlaceholder: 'OP', tags: ['Figma', 'UX'], url: '#' },
  { id: 'ng_9', title: 'Digital Marketing Specialist', organization: 'Jumia Nigeria', description: "Drive growth campaigns across digital channels for Nigeria's largest e-commerce platform.", type: 'job', roleType: 'Digital Marketing', city: 'Lagos', location: 'Lagos, Nigeria', country: 'Nigeria', state: 'Lagos', workMode: 'onsite', industry: 'E-commerce', deadline: '2026-08-08', logoPlaceholder: 'JM', tags: ['SEO', 'Social Media'], url: '#' },
  { id: 'ng_10', title: 'Customer Success Manager', organization: 'Flutterwave', description: 'Support enterprise clients and drive product adoption across Africa.', type: 'job', roleType: 'Customer Success', city: 'Lagos', location: 'Lagos, Nigeria', country: 'Nigeria', state: 'Lagos', workMode: 'hybrid', industry: 'Fintech', deadline: '2026-08-16', logoPlaceholder: 'FW', tags: ['CRM', 'Support'], url: '#' },
  { id: 'ng_11', title: 'Business Analyst', organization: 'Access Bank', description: 'Analyze business processes and technology requirements for digital transformation.', type: 'job', roleType: 'Business Analyst', city: 'Lagos', location: 'Lagos, Nigeria', country: 'Nigeria', state: 'Lagos', workMode: 'onsite', industry: 'Banking', deadline: '2026-08-11', logoPlaceholder: 'AB', tags: ['Agile', 'Finance'], url: '#' },
  { id: 'ng_12', title: 'Technical Support Engineer', organization: 'Microsoft ADC', description: 'Provide technical support and solutions for enterprise customers.', type: 'job', roleType: 'Tech Support', city: 'Lagos', location: 'Lagos, Nigeria', country: 'Nigeria', state: 'Lagos', workMode: 'hybrid', industry: 'Technology', deadline: '2026-08-19', logoPlaceholder: 'MS', tags: ['Azure', 'Support'], url: '#' },
  { id: 'ng_13', title: 'DevOps Engineer', organization: 'Interswitch', description: 'Build CI/CD pipelines and manage cloud infrastructure at scale.', type: 'job', roleType: 'DevOps', city: 'Lagos', location: 'Lagos, Nigeria', country: 'Nigeria', state: 'Lagos', workMode: 'hybrid', industry: 'Fintech', deadline: '2026-08-21', logoPlaceholder: 'IS', tags: ['AWS', 'Kubernetes'], url: '#' },
  { id: 'ng_14', title: 'Cybersecurity Analyst', organization: 'SystemSpecs', description: 'Protect critical financial infrastructure and customer data.', type: 'job', roleType: 'Cybersecurity', city: 'Lagos', location: 'Lagos, Nigeria', country: 'Nigeria', state: 'Lagos', workMode: 'onsite', industry: 'Technology', deadline: '2026-08-13', logoPlaceholder: 'SS', tags: ['Security', 'Compliance'], url: '#' },
  { id: 'ng_15', title: 'Software Engineering Fellow', organization: '3MTT Nigeria', description: 'Intensive fellowship for aspiring software engineers with mentorship and job placement.', type: 'fellowship', roleType: 'Software Engineering Jobs', city: 'Abuja', location: 'Abuja, Nigeria', country: 'Nigeria', state: 'Abuja FCT', workMode: 'hybrid', industry: 'Technology', deadline: '2026-08-28', logoPlaceholder: '3M', tags: ['Training', 'Fellowship'], url: '#' },
  { id: 'ng_16', title: 'Product Management Intern', organization: 'Ventures Platform', description: 'Learn product management by working with portfolio startups.', type: 'internship', roleType: 'Product Design', city: 'Abuja', location: 'Abuja, Nigeria', country: 'Nigeria', state: 'Abuja FCT', workMode: 'hybrid', industry: 'Technology', deadline: '2026-08-17', logoPlaceholder: 'VP', tags: ['Product', 'Startups'], url: '#' },
  { id: 'ng_17', title: 'Remote Frontend Developer', organization: 'Turing', description: 'Work with top US companies from anywhere in Nigeria.', type: 'job', roleType: 'Frontend Jobs', city: 'Remote', location: 'Remote', country: 'Nigeria', state: 'Remote', workMode: 'remote', industry: 'Technology', deadline: '2026-08-31', logoPlaceholder: 'TU', tags: ['React', 'Remote'], url: '#' },
  { id: 'ng_18', title: 'AI/ML Engineer', organization: 'InstaDeep', description: 'Build and deploy AI solutions for real-world African challenges.', type: 'job', roleType: 'AI Jobs', city: 'Lagos', location: 'Lagos, Nigeria', country: 'Nigeria', state: 'Lagos', workMode: 'hybrid', industry: 'Technology', deadline: '2026-08-24', logoPlaceholder: 'ID', tags: ['PyTorch', 'AI'], url: '#' },
];

export const COMMUNITY_3MTT: CommunityCard[] = [
  { id: 'c3m_1', icon: 'Briefcase', titleKey: 'opportunityHub.community3mtt.opportunities', descriptionKey: 'opportunityHub.community3mtt.opportunitiesDesc', count: 42, color: 'from-blue-500 to-blue-600' },
  { id: 'c3m_2', icon: 'Trophy', titleKey: 'opportunityHub.community3mtt.hackathons', descriptionKey: 'opportunityHub.community3mtt.hackathonsDesc', count: 8, color: 'from-cyan-500 to-cyan-600' },
  { id: 'c3m_3', icon: 'Calendar', titleKey: 'opportunityHub.community3mtt.events', descriptionKey: 'opportunityHub.community3mtt.eventsDesc', count: 15, color: 'from-violet-500 to-violet-600' },
  { id: 'c3m_4', icon: 'Users', titleKey: 'opportunityHub.community3mtt.studyGroups', descriptionKey: 'opportunityHub.community3mtt.studyGroupsDesc', count: 34, color: 'from-emerald-500 to-emerald-600' },
  { id: 'c3m_5', icon: 'UserCircle', titleKey: 'opportunityHub.community3mtt.mentorship', descriptionKey: 'opportunityHub.community3mtt.mentorshipDesc', count: 12, color: 'from-amber-500 to-amber-600' },
  { id: 'c3m_6', icon: 'Lightbulb', titleKey: 'opportunityHub.community3mtt.challenges', descriptionKey: 'opportunityHub.community3mtt.challengesDesc', count: 6, color: 'from-rose-500 to-rose-600' },
  { id: 'c3m_7', icon: 'FolderGit2', titleKey: 'opportunityHub.community3mtt.projects', descriptionKey: 'opportunityHub.community3mtt.projectsDesc', count: 21, color: 'from-indigo-500 to-indigo-600' },
  { id: 'c3m_8', icon: 'MessageCircle', titleKey: 'opportunityHub.community3mtt.networking', descriptionKey: 'opportunityHub.community3mtt.networkingDesc', count: 18, color: 'from-pink-500 to-pink-600' },
];

export const SCHOLARSHIPS: Scholarship[] = [
  { id: 'sch_1', title: 'Mastercard Foundation Scholars Program', organization: 'Mastercard Foundation', provider: 'Mastercard Foundation', description: 'Full scholarship for academically talented young Africans to study at partner universities.', type: 'scholarship', location: 'Africa', country: 'Nigeria', workMode: 'remote', coverage: 'Full tuition + living expenses', eligibility: ['African citizen', 'Demonstrated financial need', 'Academic excellence'], deadline: '2026-10-15', logoPlaceholder: 'MC', tags: ['Full Scholarship', 'University'], url: '#' },
  { id: 'sch_2', title: 'Chevening Scholarships', organization: 'UK Foreign Office', provider: 'UK Government', description: "Fully-funded master's degrees at UK universities for future leaders.", type: 'scholarship', location: 'United Kingdom', country: 'Nigeria', workMode: 'remote', coverage: 'Full tuition + stipend', eligibility: ['2+ years work experience', 'Leadership potential', 'English proficiency'], deadline: '2026-11-01', logoPlaceholder: 'CV', tags: ['Masters', 'UK'], url: '#' },
  { id: 'sch_3', title: 'Commonwealth Scholarships', organization: 'Commonwealth Scholarship Commission', provider: 'Commonwealth', description: 'Scholarships for students from Commonwealth countries to pursue postgraduate study.', type: 'scholarship', location: 'United Kingdom', country: 'Nigeria', workMode: 'remote', coverage: 'Full tuition + living allowance', eligibility: ['Commonwealth citizen', 'First degree', 'Academic merit'], deadline: '2026-10-30', logoPlaceholder: 'CW', tags: ['Postgraduate', 'Commonwealth'], url: '#' },
  { id: 'sch_4', title: 'DAAD Scholarships', organization: 'DAAD', provider: 'German Academic Exchange Service', description: 'Study and research opportunities in Germany for African graduates.', type: 'scholarship', location: 'Germany', country: 'Nigeria', workMode: 'remote', coverage: 'Full funding', eligibility: ["Bachelor's degree", '2+ years experience', 'German/English proficiency'], deadline: '2026-09-20', logoPlaceholder: 'DA', tags: ['Germany', 'Research'], url: '#' },
  { id: 'sch_5', title: 'Google Career Certificates Scholarship', organization: 'Google', provider: 'Google', description: 'Free access to Google Career Certificates in IT support, UX, data analytics, and more.', type: 'scholarship', location: 'Nigeria', country: 'Nigeria', workMode: 'remote', coverage: 'Free course access', eligibility: ['Resident of Nigeria', 'Ages 18+'], deadline: '2026-12-31', logoPlaceholder: 'GO', tags: ['Certificate', 'Free'], url: '#' },
  { id: 'sch_6', title: 'Microsoft Learn Career Connected', organization: 'Microsoft', provider: 'Microsoft', description: 'Free learning paths and certification vouchers for in-demand tech roles.', type: 'scholarship', location: 'Africa', country: 'Nigeria', workMode: 'remote', coverage: 'Free courses + vouchers', eligibility: ['African resident', 'Tech interest'], deadline: '2026-11-15', logoPlaceholder: 'MS', tags: ['Cloud', 'Certification'], url: '#' },
  { id: 'sch_7', title: 'Local Nigerian Undergraduate Scholarships', organization: 'MTN Foundation', provider: 'MTN Foundation', description: 'Scholarships for Nigerian undergraduates in STEM and business courses.', type: 'scholarship', location: 'Nigeria', country: 'Nigeria', workMode: 'remote', coverage: 'Tuition + stipend', eligibility: ['Nigerian undergraduate', 'STEM/Business', 'CGPA 3.5+'], deadline: '2026-09-10', logoPlaceholder: 'MT', tags: ['Undergraduate', 'Nigeria'], url: '#' },
];

export const FELLOWSHIPS: Fellowship[] = [
  { id: 'fel_1', title: '3MTT Fellowship', organization: '3MTT Nigeria', provider: 'Federal Government of Nigeria', description: "Nigeria's largest tech talent development program with training, mentorship, and job placement.", type: 'fellowship', location: 'Nigeria', country: 'Nigeria', workMode: 'hybrid', duration: '3-6 months', benefits: ['Free training', 'Mentorship', 'Job placement support'], deadline: '2026-08-30', logoPlaceholder: '3M', tags: ['Tech', 'Government'], url: '#' },
  { id: 'fel_2', title: 'ALX Software Engineering', organization: 'ALX Africa', provider: 'ALX', description: 'Rigorous software engineering training program for African talent.', type: 'fellowship', location: 'Africa', country: 'Nigeria', workMode: 'remote', duration: '12 months', benefits: ['Peer learning', 'Career support', 'Global network'], deadline: '2026-09-05', logoPlaceholder: 'AL', tags: ['Software', 'Remote'], url: '#' },
  { id: 'fel_3', title: 'Andela Learning Community', organization: 'Andela', provider: 'Andela', description: 'Community-driven learning paths with mentorship and job matching.', type: 'fellowship', location: 'Africa', country: 'Nigeria', workMode: 'remote', duration: 'Self-paced', benefits: ['Mentorship', 'Community', 'Job referrals'], deadline: '2026-12-31', logoPlaceholder: 'AN', tags: ['Community', 'Remote'], url: '#' },
  { id: 'fel_4', title: 'Google Africa Developer Scholarship', organization: 'Google', provider: 'Google & Pluralsight', description: 'Advanced Android, Cloud, and Web development training for Africans.', type: 'fellowship', location: 'Africa', country: 'Nigeria', workMode: 'remote', duration: '3 months', benefits: ['Free access', 'Mentorship', 'Certification'], deadline: '2026-08-25', logoPlaceholder: 'GD', tags: ['Developer', 'Google'], url: '#' },
  { id: 'fel_5', title: 'AI4D Africa Fellowship', organization: 'IDRC & SIDA', provider: 'AI4D', description: 'Research and innovation fellowship for African AI practitioners.', type: 'fellowship', location: 'Africa', country: 'Nigeria', workMode: 'remote', duration: '6-12 months', benefits: ['Funding', 'Research support', 'Network'], deadline: '2026-09-15', logoPlaceholder: 'A4', tags: ['AI', 'Research'], url: '#' },
  { id: 'fel_6', title: 'Microsoft ADC Engineering Program', organization: 'Microsoft', provider: 'Microsoft ADC', description: 'Engineering program for African developers to build global products.', type: 'fellowship', location: 'Nigeria / Kenya', country: 'Nigeria', workMode: 'hybrid', duration: '6 months', benefits: ['Training', 'Internship', 'Full-time opportunity'], deadline: '2026-08-18', logoPlaceholder: 'MS', tags: ['Engineering', 'Microsoft'], url: '#' },
  { id: 'fel_7', title: 'Google Developer Student Clubs Lead', organization: 'Google', provider: 'Google Developers', description: 'Lead a student tech community on your campus and access Google resources.', type: 'fellowship', location: 'Nigeria', country: 'Nigeria', workMode: 'hybrid', duration: '1 academic year', benefits: ['Google swag', 'Training', 'Network'], deadline: '2026-08-22', logoPlaceholder: 'GD', tags: ['Student', 'Leadership'], url: '#' },
];

export const HACKATHONS: Hackathon[] = [
  { id: 'hack_1', title: 'Africa Fintech Hackathon', organization: 'Devpost', platform: 'Devpost', description: 'Build fintech solutions for underbanked communities across Africa.', type: 'hackathon', location: 'Online', country: 'Nigeria', workMode: 'remote', prize: '$15,000', date: '2026-08-20', deadline: '2026-08-18', logoPlaceholder: 'DV', tags: ['Fintech', 'Online'], url: '#' },
  { id: 'hack_2', title: 'Google Solution Challenge', organization: 'Google', platform: 'Google', description: 'Use Google technologies to solve local community problems.', type: 'hackathon', location: 'Global', country: 'Nigeria', workMode: 'remote', prize: '$3,000', date: '2026-09-10', deadline: '2026-09-05', logoPlaceholder: 'GO', tags: ['Social Impact', 'Global'], url: '#' },
  { id: 'hack_3', title: 'Microsoft Imagine Cup', organization: 'Microsoft', platform: 'Microsoft', description: 'Global student technology competition with African regional finals.', type: 'hackathon', location: 'Global', country: 'Nigeria', workMode: 'remote', prize: '$100,000', date: '2026-10-15', deadline: '2026-10-01', logoPlaceholder: 'MS', tags: ['Students', 'Global'], url: '#' },
  { id: 'hack_4', title: 'MLH Hacktoberfest', organization: 'Major League Hacking', platform: 'MLH', description: 'Month-long celebration of open source with prizes and swag.', type: 'hackathon', location: 'Online', country: 'Nigeria', workMode: 'remote', prize: 'Swag + prizes', date: '2026-10-01', deadline: '2026-10-31', logoPlaceholder: 'ML', tags: ['Open Source', 'Online'], url: '#' },
  { id: 'hack_5', title: 'Zindi Africa Challenge', organization: 'Zindi Africa', platform: 'Zindi', description: 'Data science and AI competitions solving African problems.', type: 'hackathon', location: 'Africa', country: 'Nigeria', workMode: 'remote', prize: '$5,000', date: 'Ongoing', deadline: '2026-12-31', logoPlaceholder: 'ZI', tags: ['Data Science', 'Africa'], url: '#' },
  { id: 'hack_6', title: 'Lagos Tech Fest Hackathon', organization: 'Techpoint Africa', platform: 'Local', description: 'Annual Lagos hackathon bringing together builders and investors.', type: 'hackathon', location: 'Lagos, Nigeria', country: 'Nigeria', workMode: 'hybrid', prize: '₦2,000,000', date: '2026-09-15', deadline: '2026-09-10', logoPlaceholder: 'LT', tags: ['Local', 'Lagos'], url: '#' },
];

export const LEARNING_RESOURCES: LearningResource[] = [
  { id: 'lr_1', title: 'Responsive Web Design', provider: 'freeCodeCamp', url: '#', duration: '300 hours', difficulty: 'Beginner', free: true, category: 'Web Development', description: 'Learn HTML, CSS, and responsive design through hands-on projects.', tags: ['HTML', 'CSS'] },
  { id: 'lr_2', title: 'Google Data Analytics Certificate', provider: 'Coursera', url: '#', duration: '6 months', difficulty: 'Beginner', free: false, category: 'Data Analytics', description: 'Comprehensive data analytics training using Google tools.', tags: ['SQL', 'R'] },
  { id: 'lr_3', title: 'Azure Fundamentals', provider: 'Microsoft Learn', url: '#', duration: '24 hours', difficulty: 'Beginner', free: true, category: 'Cloud', description: 'Introduction to cloud concepts and Microsoft Azure services.', tags: ['Azure', 'Cloud'] },
  { id: 'lr_4', title: 'Google Cloud Skills Boost', provider: 'Google Learn', url: '#', duration: 'Self-paced', difficulty: 'Intermediate', free: false, category: 'Cloud', description: 'Hands-on labs and quests for Google Cloud Platform.', tags: ['GCP', 'Cloud'] },
  { id: 'lr_5', title: 'Networking Basics', provider: 'Cisco Skills for All', url: '#', duration: '20 hours', difficulty: 'Beginner', free: true, category: 'Networking', description: 'Foundational networking concepts and practical skills.', tags: ['Networking', 'Security'] },
  { id: 'lr_6', title: 'MDN Web Docs', provider: 'Mozilla', url: '#', duration: 'Reference', difficulty: 'Advanced', free: true, category: 'Documentation', description: 'Authoritative documentation for web technologies.', tags: ['JavaScript', 'Reference'] },
  { id: 'lr_7', title: 'CS50 Introduction to Computer Science', provider: 'Harvard', url: '#', duration: '12 weeks', difficulty: 'Beginner', free: true, category: 'Computer Science', description: "Harvard's renowned intro to computer science and programming.", tags: ['C', 'Python'] },
  { id: 'lr_8', title: 'Developer Roadmaps', provider: 'roadmap.sh', url: '#', duration: 'Self-paced', difficulty: 'Intermediate', free: true, category: 'Career Guide', description: 'Step-by-step roadmaps for various developer career paths.', tags: ['Career', 'Guide'] },
];

export const SMART_RECOMMENDATIONS: SmartRecommendation[] = [
  { id: 'rec_1', title: 'Backend Developer Internship', type: 'internship', confidence: 96, reasonKey: 'opportunityHub.recommendations.reasons.backend', icon: 'Laptop' },
  { id: 'rec_2', title: 'Google AI Course', type: 'learning', confidence: 91, reasonKey: 'opportunityHub.recommendations.reasons.aiCourse', icon: 'BookOpen' },
  { id: 'rec_3', title: 'Devpost Hackathon', type: 'hackathon', confidence: 87, reasonKey: 'opportunityHub.recommendations.reasons.hackathon', icon: 'Trophy' },
  { id: 'rec_4', title: '3MTT Community Event', type: 'networking', confidence: 84, reasonKey: 'opportunityHub.recommendations.reasons.community', icon: 'Users' },
  { id: 'rec_5', title: 'Python Scholarship', type: 'scholarship', confidence: 79, reasonKey: 'opportunityHub.recommendations.reasons.python', icon: 'GraduationCap' },
];

export const NIGERIA_CITIES = ['Lagos', 'Abuja', 'Ibadan', 'Kano', 'Port Harcourt', 'Kaduna', 'Enugu', 'Ogun', 'Kwara', 'Oyo', 'Remote'];

export const NIGERIA_ROLE_TYPES = [
  'Graduate Trainee',
  'NYSC Placements',
  'Software Engineering Jobs',
  'Data Analyst Jobs',
  'AI Jobs',
  'Frontend Jobs',
  'Backend Jobs',
  'Product Design',
  'Digital Marketing',
  'Customer Success',
  'Business Analyst',
  'Tech Support',
  'DevOps',
  'Cybersecurity',
];

export const OPPORTUNITY_STATS: OpportunityStats = {
  totalOpportunities: 2293,
  availableJobs: 1247,
  scholarships: 86,
  internships: 215,
  hackathons: 28,
  learningResources: 430,
};

export const opportunitiesApi = {
  async fetchCategories(): Promise<OpportunityCategory[]> {
    await delay(400);
    return CATEGORIES;
  },

  async fetchFeatured(): Promise<FeaturedOpportunity[]> {
    await delay(500);
    return FEATURED_OPPORTUNITIES;
  },

  async fetchNigeriaOpportunities(): Promise<NigeriaOpportunity[]> {
    await delay(600);
    return NIGERIA_OPPORTUNITIES;
  },

  async fetch3MTTCommunity(): Promise<CommunityCard[]> {
    await delay(350);
    return COMMUNITY_3MTT;
  },

  async fetchScholarships(): Promise<Scholarship[]> {
    await delay(450);
    return SCHOLARSHIPS;
  },

  async fetchFellowships(): Promise<Fellowship[]> {
    await delay(420);
    return FELLOWSHIPS;
  },

  async fetchHackathons(): Promise<Hackathon[]> {
    await delay(380);
    return HACKATHONS;
  },

  async fetchLearningResources(): Promise<LearningResource[]> {
    await delay(400);
    return LEARNING_RESOURCES;
  },

  async fetchRecommendations(): Promise<SmartRecommendation[]> {
    await delay(320);
    return SMART_RECOMMENDATIONS;
  },

  async fetchStats(): Promise<OpportunityStats> {
    await delay(300);
    return OPPORTUNITY_STATS;
  },

  async searchOpportunities(query: string): Promise<{ id: string; title: string; type: OpportunityType; organization: string }[]> {
    await delay(250);
    const q = query.toLowerCase();
    const results: { id: string; title: string; type: OpportunityType; organization: string }[] = [];

    FEATURED_OPPORTUNITIES.forEach((o) => {
      if (o.title.toLowerCase().includes(q) || o.organization.toLowerCase().includes(q)) {
        results.push({ id: o.id, title: o.title, type: o.type, organization: o.organization });
      }
    });

    SCHOLARSHIPS.forEach((o) => {
      if (o.title.toLowerCase().includes(q) || o.organization.toLowerCase().includes(q)) {
        results.push({ id: o.id, title: o.title, type: o.type, organization: o.organization });
      }
    });

    HACKATHONS.forEach((o) => {
      if (o.title.toLowerCase().includes(q) || o.platform.toLowerCase().includes(q)) {
        results.push({ id: o.id, title: o.title, type: o.type, organization: o.platform });
      }
    });

    LEARNING_RESOURCES.forEach((o) => {
      if (o.title.toLowerCase().includes(q) || o.provider.toLowerCase().includes(q)) {
        results.push({ id: o.id, title: o.title, type: 'learning', organization: o.provider });
      }
    });

    return results.slice(0, 8);
  },
};
