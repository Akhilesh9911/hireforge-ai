import { apiClient } from './apiClient';

export const resumeService = {
  // POST /api/resume/upload
  // Accepts: multipart/form-data with field "file" (PDF or DOCX)
  // Returns: plain string (raw Gemini AI analysis)
  uploadResume: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<string>('/resume/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 120000, // 2 minutes — Gemini AI analysis can be slow
    });

    return response.data;
  },
};
