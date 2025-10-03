export type CandidateStatus = 'new' | 'screening' | 'interview' | 'offer' | 'rejected';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  position: string;
  appliedDate: string;
  status: CandidateStatus;
  // Extended fields
  fullName?: string;
  contact?: string | null;
  phone?: string | null;
  linkedinUrl?: string | null;
  cvUrl?: string | null;
  salaryExpectation?: number | null;
  seniority?: string | null;
  role?: string | null;
  highestEducation?: string | null;
  yearsOfExperience?: number | null;
}

export interface Job {
  id: string;
  title: string;
  location: string;
  employmentType: 'full-time' | 'part-time' | 'contract';
  active: boolean;
  createdAt: string;
  // Extended fields
  teamId?: string;
  description?: string | null;
  requirements?: string | null;
}

export interface Team {
  id: string;
  name: string;
  organizationId: string;
}

export interface Organization {
  id: string;
  name: string;
}

export interface Interview {
  id: string;
  candidateName: string;
  position: string;
  date: string;
  time: string;
  interviewer: string;
  type: 'phone' | 'video' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Metrics {
  jobsOpen: number;
  jobsInProgress: number;
  jobsClosed: number;
  candidatesActive: number;
  candidatesPassive: number;
  timeToSource: string;
  timeToRecruit: string;
  timeToStart: string;
}
