import type { Quiz } from '@/domain/entities/course';

export interface QuizRepository {
  getQuizByCourse(courseId: string): Promise<Quiz | null>;
  submitQuizAttempt(params: {
    userId: string;
    quizId: string;
    answers: number[];
  }): Promise<{ score: number; passed: boolean }>;
}
