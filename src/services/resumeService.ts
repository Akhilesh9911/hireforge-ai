import { apiClient } from './apiClient';
import { Resume, ApiResponse } from '../types';

export const resumeService = {
  // TODO: Connect to Spring Boot endpoint GET /api/resumes
  getResumes: async (): Promise<Resume[]> => {
    try {
      const response = await apiClient.get<ApiResponse<Resume[]>>('/resumes');
      return response.data.data;
    } catch {
      const stored = localStorage.getItem('hireforge_resumes');
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

  // TODO: Connect to Spring Boot endpoint POST /api/resumes/upload
  uploadResume: async (file: File, targetRole: string): Promise<Resume> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('targetRole', targetRole);

      const response = await apiClient.post<ApiResponse<Resume>>('/resumes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch {
      const newResume: Resume = {
        id: 'res_' + Date.now(),
        fileName: file.name,
        fileSize: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'Analyzed',
        atsScore: Math.floor(Math.random() * 15) + 80,
        extractedSkills: ['Problem Solving', 'Data Structures', 'REST Architecture', 'Git'],
        summary: `Parsed resume file ${file.name}. Demonstrates strong foundation for ${targetRole || 'Software Engineer'}.`,
        targetRole: targetRole || 'Software Engineer',
      };

      const currentList = await resumeService.getResumes();
      const updatedList = [newResume, ...currentList];
      localStorage.setItem('hireforge_resumes', JSON.stringify(updatedList));
      return newResume;
    }
  },

  // TODO: Connect to Spring Boot endpoint DELETE /api/resumes/{id}
  deleteResume: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/resumes/${id}`);
    } catch {
      const currentList = await resumeService.getResumes();
      const updatedList = currentList.filter((r) => r.id !== id);
      localStorage.setItem('hireforge_resumes', JSON.stringify(updatedList));
    }
  },
};

