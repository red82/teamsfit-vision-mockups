import { Interview, InterviewEmployee } from '@/types';

export const mockInterviews: Interview[] = [
  {
    id: 1,
    application_id: 1,
    scheduled_at: '2025-10-05T14:00:00Z',
    duration_min: 60,
    stage: 'technical',
    location: 'https://zoom.us/j/123456789',
    result: null,
    notes: 'Focus on React and TypeScript experience',
    candidateName: 'Sarah Johnson',
    jobTitle: 'Senior Frontend Developer',
  },
  {
    id: 2,
    application_id: 2,
    scheduled_at: '2025-10-04T10:30:00Z',
    duration_min: 45,
    stage: 'screen',
    location: 'Phone',
    result: null,
    notes: null,
    candidateName: 'Michael Chen',
    jobTitle: 'Product Manager',
  },
  {
    id: 3,
    application_id: 3,
    scheduled_at: '2025-10-03T15:00:00Z',
    duration_min: 60,
    stage: 'hiring_manager',
    location: 'Office - Room 3A',
    result: 'pass',
    notes: 'Excellent portfolio presentation',
    candidateName: 'Emily Rodriguez',
    jobTitle: 'UX Designer',
  },
];

export const mockInterviewEmployees: InterviewEmployee[] = [
  {
    interview_id: 1,
    employee_id: 2,
    role: 'lead',
    invited_at: '2025-09-28T10:00:00Z',
    attended: null,
    notes: null,
  },
  {
    interview_id: 1,
    employee_id: 4,
    role: 'panel',
    invited_at: '2025-09-28T10:00:00Z',
    attended: null,
    notes: null,
  },
  {
    interview_id: 2,
    employee_id: 3,
    role: 'lead',
    invited_at: '2025-09-27T14:30:00Z',
    attended: null,
    notes: null,
  },
  {
    interview_id: 3,
    employee_id: 1,
    role: 'hm',
    invited_at: '2025-09-26T09:15:00Z',
    attended: true,
    notes: 'Very impressed with the candidate',
  },
  {
    interview_id: 3,
    employee_id: 5,
    role: 'panel',
    invited_at: '2025-09-26T09:15:00Z',
    attended: true,
    notes: null,
  },
];

let nextInterviewId = mockInterviews.length + 1;

export const addInterview = (interview: Omit<Interview, 'id'>): Interview => {
  const newInterview: Interview = {
    ...interview,
    id: nextInterviewId++,
  };
  mockInterviews.push(newInterview);
  return newInterview;
};

export const addInterviewEmployee = (ie: InterviewEmployee): void => {
  mockInterviewEmployees.push(ie);
};
