// Backend enum: APPLIED | INTERVIEW | OFFER | REJECTED
export type JobStatus = 'APPLIED' | 'INTERVIEW' | 'OFFER' | 'REJECTED';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Matches backend JobApplicationResponse exactly
export interface JobApplication {
  id: number;
  companyName: string;
  jobTitle: string;
  status: JobStatus;
  appliedDate: string | null;
  notes: string | null;
}

export interface RecentActivity {
  id: string;
  type: 'resume' | 'interview' | 'job' | 'system';
  title: string;
  description: string;
  timestamp: string;
}
