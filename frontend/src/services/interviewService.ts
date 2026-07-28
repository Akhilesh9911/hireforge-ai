import { apiClient } from './apiClient';

export interface InterviewResult {
  jobRole: string;
  questions: string;
}

export const interviewService = {
  // POST /api/interview/generate
  // Accepts: multipart/form-data with fields "file" (resume) + "jobRole" (string)
  // Returns: { jobRole: string, questions: string }
  generateQuestions: async (file: File, jobRole: string): Promise<InterviewResult> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('jobRole', jobRole);

    const response = await apiClient.post<InterviewResult>('/interview/generate', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 120000, // 2 minutes — Gemini AI analysis can be slow
    });

    return response.data;
  },
};
