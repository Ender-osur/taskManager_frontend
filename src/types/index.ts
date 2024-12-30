export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export type TaskFilter = 'all' | 'completed' | 'pending';