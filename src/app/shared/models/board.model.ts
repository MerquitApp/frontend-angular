import { User } from '../types';

export interface Board {
  id: number;
  name: string;
  shareCode?: string | null;
  project_columns: ProjectColumn[];
  project_users: ProjectUser[];
}

export interface ProjectColumn {
  id: number;
  name: string;
  tasks: Card[];
}

export interface ProjectUser {
  id: number;
  user: User;
  role: 'CREATOR' | 'ADMIN' | 'MEMBER' | 'VIEWER';
}

export interface Card {
  id: number;
  title: string;
  description: string;
}
