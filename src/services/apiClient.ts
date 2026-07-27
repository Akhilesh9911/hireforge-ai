import axios, { AxiosInstance } from 'axios';

// Default Spring Boot backend URL
const DEFAULT_BASE_URL = 'http://localhost:8080/api';

let currentBaseUrl = localStorage.getItem('hireforge_api_url') || DEFAULT_BASE_URL;

export const apiClient: AxiosInstance = axios.create({
  baseURL: currentBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

// Interceptor to attach JWT auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('hireforge_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const updateApiBaseUrl = (newUrl: string) => {
  currentBaseUrl = newUrl;
  localStorage.setItem('hireforge_api_url', newUrl);
  apiClient.defaults.baseURL = newUrl;
};

export const getApiBaseUrl = (): string => {
  return currentBaseUrl;
};

// Test Spring Boot connection status
export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('/health');
    return response.status === 200;
  } catch (err) {
    // Return false when backend service is unreachable or not running
    return false;
  }
};
