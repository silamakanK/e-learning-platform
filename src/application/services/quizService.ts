import type { Quiz } from '@/domain/entities/course';
import type { QuizRepository } from '@/domain/repositories/quizRepository';

export class QuizService {
  constructor(private readonly repository: QuizRepository) {}

  async getQuiz(courseId: string): Promise<Quiz | null> {
    return this.repository.getQuizByCourse(courseId);
  }

  async submitAnswers(params: { userId: string; quizId: string; answers: number[] }) {
    return this.repository.submitQuizAttempt(params);
  }
}
