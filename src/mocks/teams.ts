import { Team } from '@/types';

export const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Engineering',
    organizationId: '1',
  },
  {
    id: '2',
    name: 'Product',
    organizationId: '1',
  },
  {
    id: '3',
    name: 'Design',
    organizationId: '1',
  },
  {
    id: '4',
    name: 'Marketing',
    organizationId: '1',
  },
  {
    id: '5',
    name: 'Sales',
    organizationId: '1',
  },
];

let nextTeamId = mockTeams.length + 1;

export const addTeam = (team: Omit<Team, 'id'>): Team => {
  const newTeam: Team = {
    ...team,
    id: String(nextTeamId++),
  };
  mockTeams.push(newTeam);
  return newTeam;
};
