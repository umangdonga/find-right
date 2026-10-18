export type Role = 'client' | 'freelancer';

export type NavView =
  | 'landing'
  | 'login'
  | 'onboarding'
  | 'home'
  | 'find'
  | 'posted_jobs'
  | 'projects'
  | 'chat'
  | 'profile'
  | 'settings'
  | 'freelancer_profile'
  | 'post_job'
  | 'hire_requests'
  | 'review_request'
  | 'consultation'
  | 'finalize_project'
  | 'hire_checkout'
  | 'project_detail'
  | 'final_submission'
  | 'exit_policy';

export interface CompanyVerification {
  status: 'verified' | 'unverified' | 'rejected' | 'pending';
  companyName: string;
  registrationNumber: string; // CIN / GSTIN / EIN / DUNS
  registrySource: 'MCA India' | 'US Delaware Registry' | 'UK Companies House' | 'Global DUNS' | 'Custom';
  domain: string;
  domainStatus: 'active_business' | 'disposable_flagged' | 'unreachable';
  emailMatch: boolean;
  trustScore: number;
  verifiedAt?: string;
  flagReasons?: string[];
}

export interface StarterCredit {
  id: string;
  name: string;
  discountPercent: number;
  maxAmount: number; // e.g. 5000 (INR) or 500 (USD)
  status: 'available' | 'applied' | 'used';
  validFor: string;
}

export interface AIDisclosure {
  category: string;
  level: 'AI-assisted' | '100% human-made' | 'AI-supported';
  description?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  bgColor: string;
  thumbnailUrl?: string;
  tags: string[];
  description?: string;
  metrics?: string;
}

export interface Review {
  id: string;
  clientName: string;
  avatarText: string;
  rating: number;
  comment: string;
  date: string;
  aiUsageVerified: 'Yes, as disclosed' | 'Partly' | 'No';
  projectTitle?: string;
}

export interface Freelancer {
  id: string;
  name: string;
  initials: string;
  role: string;
  location: string;
  memberSince: string;
  rating: number;
  reviewCount: number;
  completedProjects: number;
  onTimeDeliveryPercent: number;
  avgResponseTime: string;
  startingPrice: number;
  isRisingTalent: boolean;
  isIDVerified: boolean;
  primaryTag: 'AI-assisted ideation' | 'No AI (100% human-made)' | 'AI-supported design';
  aiDisclosures: AIDisclosure[];
  portfolio: PortfolioItem[];
  reviews: Review[];
  bio: string;
  experienceLevel: 'Fresher / Entry' | 'Intermediate' | 'High-level / Expert';
  skills: string[];
}

export interface Milestone {
  id: string;
  title: string;
  dueDate: string;
  completedDate?: string;
  status: 'done' | 'in_review' | 'upcoming';
  filesCount?: number;
  deliverableNotes?: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
  downloadUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'UI/UX Design' | 'Graphic Design' | 'Product Design' | 'Motion Design' | 'Brand Identity';
  jobType: 'Freelance project' | 'Part-time' | 'Full-time';
  experienceLevel: 'Fresher / Entry' | 'Intermediate' | 'High-level / Expert';
  budgetMin: number;
  budgetMax: number;
  agreedPrice?: number;
  useStarterCredit?: boolean;
  appliedCreditId?: string;
  discountAmount?: number;
  contractTotal?: number;
  advancePaid?: number; // 10%
  finalPending?: number; // 90%
  deadline: string;
  progressPercent: number;
  status: 'hiring' | 'in_progress' | 'in_review' | 'completed' | 'draft' | 'cancelled_exit';
  briefSummary: string;
  deliverables: string[];
  aiPolicy: 'No AI (100% human-made)' | 'AI-assisted ideation only' | 'AI-supported design';
  revisionsUsed: number;
  totalRevisions: number;
  hiredFreelancer?: Freelancer;
  milestones: Milestone[];
  files: ProjectFile[];
  applicantCount: number;
  recentActivity: { text: string; time: string }[];
  exitDetails?: {
    exitProgress: number;
    earnedAmount: number;
    exitCutAmount: number;
    freelancerPayout: number;
    clientSettlement: number;
    reason: string;
  };
}

export interface HireRequest {
  id: string;
  projectId: string;
  freelancerId: string;
  freelancer: Freelancer;
  proposedPrice: number;
  deliveryWeeks: number;
  deliverablesText: string;
  coverNote: string;
  aiUsageDetail: string;
  status: 'new' | 'shortlisted' | 'rejected' | 'hired';
  rejectionFeedback?: {
    tags: string[];
    message: string;
    sentThankYou: boolean;
  };
  sampleWork: { title: string; bgColor: string }[];
}

export interface ChatMessage {
  id: string;
  sender: 'client' | 'freelancer' | 'system';
  text: string;
  time: string;
  attachment?: {
    name: string;
    size: string;
    type: string;
  };
}

export interface ClientProfile {
  name: string;
  company: string;
  email: string;
  website: string;
  type: 'company' | 'personal';
  serviceNeed: 'primary' | 'secondary' | 'non_business';
  disciplines: string[];
  totalInvested: number;
  completedHires: number;
  activeContracts: number;
  escrowTrustScore: number;
  verification?: CompanyVerification;
}
