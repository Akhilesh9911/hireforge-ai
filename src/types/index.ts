export type JobStatus = 'Saved' | 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role?: string;
  targetRole?: string;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Resume {
  id: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  status: 'Processing' | 'Analyzed' | 'Error';
  atsScore: number;
  extractedSkills: string[];
  summary: string;
  targetRole: string;
}

export interface InterviewQuestion {
  id: string;
  role: string;
  category: 'Technical' | 'Behavioral' | 'System Design' | 'Java/Spring';
  difficulty: 'Junior' | 'Mid-Level' | 'Senior';
  question: string;
  keyPoints: string[];
  starFramework?: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  userNotes?: string;
}

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: JobStatus;
  location: string;
  salary?: string;
  dateApplied: string;
  notes?: string;
  jobUrl?: string;
  contactEmail?: string;
}

export interface RecentActivity {
  id: string;
  type: 'resume' | 'interview' | 'job' | 'system';
  title: string;
  description: string;
  timestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}
