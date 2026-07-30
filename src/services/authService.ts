import { apiClient } from './apiClient';
import { User, ApiResponse } from '../types';

export const authService = {
  // TODO: Connect to Spring Boot endpoint POST /api/auth/login
  login: async (email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      if (response.data.data?.token) {
        localStorage.setItem('hireforge_auth_token', response.data.data.token);
      }
      return response.data;
    } catch {
      // Local fallback for client testing
      const mockToken = 'jwt_' + Date.now();
      localStorage.setItem('hireforge_auth_token', mockToken);
      const user: User = {
        id: 'usr_' + Date.now(),
        name: email.split('@')[0] || 'User',
        email,
        createdAt: new Date().toISOString().split('T')[0],
      };
      localStorage.setItem('hireforge_current_user', JSON.stringify(user));
      return {
        success: true,
        message: 'Logged in successfully',
        data: { user, token: mockToken },
      };
    }
  },

  // TODO: Connect to Spring Boot endpoint POST /api/auth/register
  register: async (name: string, email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> => {
    try {
      const response = await apiClient.post('/auth/register', { name, email, password });
      if (response.data.data?.token) {
        localStorage.setItem('hireforge_auth_token', response.data.data.token);
      }
      return response.data;
    } catch {
      const mockToken = 'jwt_' + Date.now();
      localStorage.setItem('hireforge_auth_token', mockToken);
      const newUser: User = {
        id: 'usr_' + Date.now(),
        name,
        email,
        createdAt: new Date().toISOString().split('T')[0],
      };
      localStorage.setItem('hireforge_current_user', JSON.stringify(newUser));
      return {
        success: true,
        message: 'Account created successfully',
        data: { user: newUser, token: mockToken },
      };
    }
  },

  // TODO: Connect to Spring Boot endpoint GET /api/auth/me
  getCurrentUser: async (): Promise<User | null> => {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data.data;
    } catch {
      const stored = localStorage.getItem('hireforge_current_user');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return null;
        }
      }
      return null;
    }
  },

  // TODO: Connect to Spring Boot endpoint PUT /api/auth/profile
  updateProfile: async (updatedData: Partial<User>): Promise<User> => {
    try {
      const response = await apiClient.put('/auth/profile', updatedData);
      return response.data.data;
    } catch {
      const currentUser = await authService.getCurrentUser();
      const updated = { ...(currentUser || { id: 'usr_1', name: 'User', email: 'user@example.com' }), ...updatedData } as User;
      localStorage.setItem('hireforge_current_user', JSON.stringify(updated));
      return updated;
    }
  },

  // TODO: Connect to Spring Boot endpoint POST /api/auth/logout
  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem('hireforge_auth_token');
      localStorage.removeItem('hireforge_current_user');
    }
  },
};

