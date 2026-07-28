import { apiClient } from './apiClient';
import { JobApplication, JobStatus } from '../types';

// Backend JobApplicationRequest fields
interface AddJobRequest {
  companyName: string;
  jobTitle: string;
  status: JobStatus;
  appliedDate: string | null;
  notes: string | null;
}

export const jobService = {
  // GET /api/jobs — returns JobApplicationResponse[] directly (no wrapper)
  getJobs: async (): Promise<JobApplication[]> => {
    const response = await apiClient.get<JobApplication[]>('/jobs');
    return response.data;
  },

  // POST /api/jobs — returns JobApplicationResponse directly (no wrapper), 201
  addJob: async (job: AddJobRequest): Promise<JobApplication> => {
    const response = await apiClient.post<JobApplication>('/jobs', job);
    return response.data;
  },

  // PATCH /api/jobs/{id}/status?status=APPLIED — returns JobApplicationResponse directly
  updateStatus: async (id: number, status: JobStatus): Promise<JobApplication> => {
    const response = await apiClient.patch<JobApplication>(`/jobs/${id}/status`, null, {
      params: { status },
    });
    return response.data;
  },

  // DELETE /api/jobs/{id} — returns 204 No Content
  deleteJob: async (id: number): Promise<void> => {
    await apiClient.delete(`/jobs/${id}`);
  },
};
