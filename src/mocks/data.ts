import { Candidate, Job, Interview, Metrics } from '@/types';

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    position: 'Senior Frontend Developer',
    appliedDate: '2025-09-28',
    status: 'interview',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    position: 'Product Manager',
    appliedDate: '2025-09-27',
    status: 'screening',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    position: 'UX Designer',
    appliedDate: '2025-09-26',
    status: 'offer',
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@email.com',
    position: 'Backend Engineer',
    appliedDate: '2025-09-25',
    status: 'new',
  },
  {
    id: '5',
    name: 'Lisa Wang',
    email: 'lisa.wang@email.com',
    position: 'Data Scientist',
    appliedDate: '2025-09-24',
    status: 'rejected',
  },
];

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    location: 'San Francisco, CA',
    employmentType: 'full-time',
    active: true,
    createdAt: '2025-09-15',
  },
  {
    id: '2',
    title: 'Product Manager',
    location: 'Remote',
    employmentType: 'full-time',
    active: true,
    createdAt: '2025-09-10',
  },
  {
    id: '3',
    title: 'UX Designer',
    location: 'New York, NY',
    employmentType: 'full-time',
    active: true,
    createdAt: '2025-09-08',
  },
  {
    id: '4',
    title: 'Backend Engineer',
    location: 'Austin, TX',
    employmentType: 'full-time',
    active: false,
    createdAt: '2025-08-20',
  },
  {
    id: '5',
    title: 'Marketing Intern',
    location: 'Remote',
    employmentType: 'part-time',
    active: true,
    createdAt: '2025-09-01',
  },
];

// Legacy mock data - now using mockInterviews from @/mocks/interviews

export const mockMetrics: Metrics = {
  jobsOpen: 5,
  jobsInProgress: 3,
  jobsClosed: 2,
  candidatesActive: 15,
  candidatesPassive: 10,
  timeToSource: '5 days',
  timeToRecruit: '12 days',
  timeToStart: '20 days',
};
