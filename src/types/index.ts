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

export type InterviewStage = 'screen' | 'technical' | 'system_design' | 'hiring_manager';
export type InterviewResult = 'pass' | 'fail' | 'on_hold' | 'canceled' | null;
export type ApplicationStatus = 'new' | 'in_review' | 'interview' | 'offer' | 'rejected';

export interface Application {
  id: number;
  job_id: number;
  candidate_id: number;
  status: ApplicationStatus;
  source?: string | null;
  submitted_at: string;
}

export interface Interview {
  id: number;
  application_id: number;
  scheduled_at: string;
  duration_min: number;
  stage: InterviewStage;
  location?: string | null;
  result: InterviewResult;
  notes?: string | null;
  // Populated fields for display
  candidateName?: string;
  jobTitle?: string;
}

export interface InterviewEmployee {
  interview_id: number;
  employee_id: number;
  role: 'lead' | 'panel' | 'hm';
  invited_at?: string | null;
  attended?: boolean | null;
  notes?: string | null;
}

export interface Employee {
  id: number;
  full_name: string;
  title: string;
  email: string;
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
