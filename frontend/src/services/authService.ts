import { apiClient } from './apiClient';
import { User } from '../types';

// Backend returns: { id: number, name: string, email: string, token: string }
interface AuthResponse {
  id: number;
  name: string;
  email: string;
  token: string;
}

export const authService = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', { email, password });
    const { id, name, email: userEmail, token } = response.data;

    const user: User = {
      id: String(id),
      name,
      email: userEmail,
    };

    localStorage.setItem('hireforge_auth_token', token);
    localStorage.setItem('hireforge_current_user', JSON.stringify(user));

    return { user, token };
  },

  register: async (name: string, email: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', { name, email, password });
    const { id, name: userName, email: userEmail, token } = response.data;

    const user: User = {
      id: String(id),
      name: userName,
      email: userEmail,
    };

    localStorage.setItem('hireforge_auth_token', token);
    localStorage.setItem('hireforge_current_user', JSON.stringify(user));

    return { user, token };
  },

  // No /api/auth/me endpoint exists — restore from localStorage only
  getCurrentUser: (): User | null => {
    const token = localStorage.getItem('hireforge_auth_token');
    if (!token) return null;

    const stored = localStorage.getItem('hireforge_current_user');
    if (!stored) return null;

    try {
      return JSON.parse(stored) as User;
    } catch {
      return null;
    }
  },

  // No logout endpoint on backend — just clear localStorage
  logout: (): void => {
    localStorage.removeItem('hireforge_auth_token');
    localStorage.removeItem('hireforge_current_user');
  },
};
