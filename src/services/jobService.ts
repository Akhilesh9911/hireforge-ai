import { apiClient } from './apiClient';
import { JobApplication, ApiResponse } from '../types';

export const jobService = {
  // TODO: Connect to Spring Boot endpoint GET /api/jobs
  getJobs: async (): Promise<JobApplication[]> => {
    try {
      const response = await apiClient.get<ApiResponse<JobApplication[]>>('/jobs');
      return response.data.data;
    } catch {
      const stored = localStorage.getItem('hireforge_jobs');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return [];
        }
      }
      return [];
    }
  },

  // TODO: Connect to Spring Boot endpoint POST /api/jobs
  addJob: async (job: Omit<JobApplication, 'id'>): Promise<JobApplication> => {
    try {
      const response = await apiClient.post<ApiResponse<JobApplication>>('/jobs', job);
      return response.data.data;
    } catch {
      const newJob: JobApplication = {
        ...job,
        id: 'job_' + Date.now(),
      };
      const currentJobs = await jobService.getJobs();
      const updated = [newJob, ...currentJobs];
      localStorage.setItem('hireforge_jobs', JSON.stringify(updated));
      return newJob;
    }
  },

  // TODO: Connect to Spring Boot endpoint PUT /api/jobs/{id}
  updateJob: async (id: string, updatedFields: Partial<JobApplication>): Promise<JobApplication> => {
    try {
      const response = await apiClient.put<ApiResponse<JobApplication>>(`/jobs/${id}`, updatedFields);
      return response.data.data;
    } catch {
      const currentJobs = await jobService.getJobs();
      let updatedJob: JobApplication | null = null;
      const updatedList = currentJobs.map((j) => {
        if (j.id === id) {
          updatedJob = { ...j, ...updatedFields };
          return updatedJob;
        }
        return j;
      });
      localStorage.setItem('hireforge_jobs', JSON.stringify(updatedList));
      return updatedJob || ({ id, ...updatedFields } as JobApplication);
    }
  },

  // TODO: Connect to Spring Boot endpoint DELETE /api/jobs/{id}
  deleteJob: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/jobs/${id}`);
    } catch {
      const currentJobs = await jobService.getJobs();
      const updated = currentJobs.filter((j) => j.id !== id);
      localStorage.setItem('hireforge_jobs', JSON.stringify(updated));
    }
  },
};

