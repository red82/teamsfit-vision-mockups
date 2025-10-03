import { Application } from '@/types';

export const mockApplications: Application[] = [
  {
    id: 1,
    job_id: 1,
    candidate_id: 1,
    status: 'interview',
    source: 'LinkedIn',
    submitted_at: '2025-09-28T10:00:00Z',
  },
  {
    id: 2,
    job_id: 2,
    candidate_id: 2,
    status: 'in_review',
    source: 'Indeed',
    submitted_at: '2025-09-27T14:30:00Z',
  },
  {
    id: 3,
    job_id: 3,
    candidate_id: 3,
    status: 'offer',
    source: 'Referral',
    submitted_at: '2025-09-26T09:15:00Z',
  },
  {
    id: 4,
    job_id: 4,
    candidate_id: 4,
    status: 'new',
    source: 'Company Website',
    submitted_at: '2025-09-25T16:45:00Z',
  },
  {
    id: 5,
    job_id: 1,
    candidate_id: 5,
    status: 'rejected',
    source: 'LinkedIn',
    submitted_at: '2025-09-24T11:20:00Z',
  },
];

let nextApplicationId = mockApplications.length + 1;

export const addApplication = (app: Omit<Application, 'id'>): Application => {
  const newApp: Application = {
    ...app,
    id: nextApplicationId++,
  };
  mockApplications.push(newApp);
  return newApp;
};
