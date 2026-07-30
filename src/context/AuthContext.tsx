import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';
import { authService } from '../services/authService';
import { checkBackendHealth, getApiBaseUrl, updateApiBaseUrl } from '../services/apiClient';

interface AuthContextType extends AuthState {
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (updated: Partial<User>) => Promise<void>;
  isBackendConnected: boolean;
  apiBaseUrl: string;
  setApiBaseUrl: (url: string) => void;
  recheckBackendHealth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('hireforge_auth_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);
  const [apiBaseUrl, setApiBaseUrlState] = useState<string>(getApiBaseUrl());

  const checkHealth = async () => {
    const isHealthy = await checkBackendHealth();
    setIsBackendConnected(isHealthy);
    return isHealthy;
  };

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      await checkHealth();
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const handleSetApiBaseUrl = (newUrl: string) => {
    updateApiBaseUrl(newUrl);
    setApiBaseUrlState(newUrl);
    checkHealth();
  };

  const login = async (email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await authService.login(email, pass);
      if (res.success && res.data) {
        setUser(res.data.user);
        setToken(res.data.token);
        setIsLoading(false);
        return true;
      }
    } catch {
      // Handled
    }
    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await authService.register(name, email, pass);
      if (res.success && res.data) {
        setUser(res.data.user);
        setToken(res.data.token);
        setIsLoading(false);
        return true;
      }
    } catch {
      // Handled
    }
    setIsLoading(false);
    return false;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setToken(null);
  };

  const updateUser = async (updatedFields: Partial<User>) => {
    const updated = await authService.updateProfile(updatedFields);
    setUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
        isBackendConnected,
        apiBaseUrl,
        setApiBaseUrl: handleSetApiBaseUrl,
        recheckBackendHealth: checkHealth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
