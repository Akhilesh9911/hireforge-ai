import { apiClient } from './apiClient';
import { InterviewQuestion, ApiResponse } from '../types';

export const interviewService = {
  // TODO: Connect to Spring Boot endpoint GET /api/interview/questions
  getQuestions: async (role: string = '', topic: string = 'All'): Promise<InterviewQuestion[]> => {
    try {
      const response = await apiClient.get<ApiResponse<InterviewQuestion[]>>('/interview/questions', {
        params: { role, topic },
      });
      return response.data.data;
    } catch {
      const stored = localStorage.getItem('hireforge_interview_questions');
      if (stored) {
        try {
          let questions: InterviewQuestion[] = JSON.parse(stored);
          if (topic && topic !== 'All') {
            questions = questions.filter((q) => q.category.toLowerCase() === topic.toLowerCase());
          }
          return questions;
        } catch {
          return [];
        }
      }
      return [];
    }
  },

  // TODO: Connect to Spring Boot endpoint POST /api/interview/generate
  generateQuestions: async (role: string, difficulty: string, category: string): Promise<InterviewQuestion[]> => {
    try {
      const response = await apiClient.post<ApiResponse<InterviewQuestion[]>>('/interview/generate', {
        role,
        difficulty,
        category,
      });
      return response.data.data;
    } catch {
      const generated: InterviewQuestion[] = [
        {
          id: 'gen_' + Date.now() + '_1',
          role: role || 'Software Engineer',
          category: (category as any) || 'Technical',
          difficulty: (difficulty as any) || 'Mid-Level',
          question: `How do you design scalable system architectures for handling asynchronous job processing and peak traffic loads in ${role || 'Software Engineering'}?`,
          keyPoints: [
            'Use message queues or event streams to decouple producer and consumer services.',
            'Implement idempotent consumer handlers to handle duplicate event deliveries gracefully.',
            'Configure horizontal auto-scaling based on queue depth metrics rather than CPU load alone.',
          ],
          starFramework: {
            situation: 'Faced high system latency during peak traffic spikes.',
            task: 'Improve system responsiveness and prevent request timeouts.',
            action: 'Decoupled synchronous workflow using an event queue with worker pools.',
            result: 'Achieved sub-100ms response times and processed 10x higher concurrent load.',
          },
        },
        {
          id: 'gen_' + Date.now() + '_2',
          role: role || 'Software Engineer',
          category: (category as any) || 'Behavioral',
          difficulty: (difficulty as any) || 'Mid-Level',
          question: `Describe a situation where you had to make a technical trade-off between speed of delivery and architectural cleanliness.`,
          keyPoints: [
            'Clearly articulate technical debt risks to engineering and product stakeholders.',
            'Establish automated test suites to safely refactor code in subsequent iterations.',
            'Document design decisions and schedule follow-up technical debt remediation sprints.',
          ],
        },
      ];

      const current = await interviewService.getQuestions();
      const updated = [...generated, ...current];
      localStorage.setItem('hireforge_interview_questions', JSON.stringify(updated));
      return generated;
    }
  },

  // TODO: Connect to Spring Boot endpoint POST /api/interview/questions/{id}/notes
  saveNote: async (questionId: string, notes: string): Promise<void> => {
    try {
      await apiClient.post(`/interview/questions/${questionId}/notes`, { notes });
    } catch {
      const storedNotes = JSON.parse(localStorage.getItem('hireforge_question_notes') || '{}');
      storedNotes[questionId] = notes;
      localStorage.setItem('hireforge_question_notes', JSON.stringify(storedNotes));
    }
  },
};

