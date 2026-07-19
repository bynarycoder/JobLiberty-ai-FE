// UI filter choices only. Opportunity records are loaded from the production API.
export const FILTER_OPTIONS = {
  industries: ['all', 'Technology', 'Banking & FinTech', 'Healthcare', 'Education', 'Agriculture', 'Energy', 'Logistics', 'Government', 'Legal', 'Media', 'Retail', 'Construction', 'Manufacturing', 'Aviation', 'Hospitality', 'Sales & Marketing', 'Business & Consulting', 'Creative & Design', 'Research', 'Non-Profit'],
  jobTypes: ['all', 'full-time', 'part-time', 'contract', 'internship', 'freelance'] as const,
  workModes: ['all', 'remote', 'hybrid', 'onsite'] as const,
  locations: ['all', 'Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Kano', 'Enugu', 'Remote', 'International'],
  states: ['all', 'Lagos', 'Abuja FCT', 'Rivers', 'Kano', 'Kaduna', 'Enugu', 'Oyo', 'Ogun', 'Delta', 'Anambra', 'Edo'],
  salaryRanges: ['all', '0-5M', '5M-15M', '15M-30M', '30M+'],
  experienceLevels: ['all', 'entry', 'mid', 'senior', 'executive'] as const,
  educationLevels: ['all', 'secondary', 'diploma', 'bachelors', 'masters', 'phd', 'any'] as const,
  companySizes: ['all', 'startup', 'sme', 'mid', 'enterprise'] as const,
  categories: ['all', 'job', 'scholarship', 'fellowship', 'internship', 'hackathon', 'learning', 'competition', 'networking', 'volunteer'],
  opportunityTypes: ['all', 'job', 'scholarship', 'fellowship', 'internship', 'hackathon', 'learning', 'volunteer'],
  deadlines: ['all', 'week', 'month', '3months'],
  countries: ['all', 'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Global'],
  sectorTypes: ['all', 'government', 'private', 'startup', 'ngo', 'international'] as const,
  costTypes: ['all', 'free', 'paid'] as const,
};
