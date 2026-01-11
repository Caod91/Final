
export type AppState = 'INTRO' | 'WELCOME' | 'CREATE' | 'MANAGE';

export interface Tournament {
  id: string;
  name: string;
  type: 'Series' | 'Knockout' | 'League';
  teamsCount: number;
  startDate: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  color: string;
}

export interface Stadium {
  id: string;
  name: string;
  city: string;
  capacity: string;
}
