import type { Quiz } from '@/domain/entities/course';
import type { QuizRepository } from '@/domain/repositories/quizRepository';
import { demoCourses, demoQuiz } from '@/infrastructure/stubs/dataset';

export class InMemoryQuizRepository implements QuizRepository {
  async getQuizByCourse(courseId: string): Promise<Quiz | null> {
    if (courseId === 'learning-experience-design') {
      return demoQuiz;
    }

    const course = demoCourses.find(item => item.id === courseId);
    return course?.quiz ?? null;
  }

  async submitQuizAttempt({
    quizId,
    answers
  }: {
    userId: string;
    quizId: string;
    answers: number[];
  }): Promise<{ score: number; passed: boolean }> {
    const quiz = quizId === 'quiz-ux' ? demoQuiz : null;
    if (!quiz) {
      return { score: 0, passed: false };
    }

    const totalQuestions = quiz.questions.length;
    const correctAnswers = quiz.questions.reduce((total, question, index) => {
      return total + (question.correctIndex === answers[index] ? 1 : 0);
    }, 0);

    const score = Math.round((correctAnswers / totalQuestions) * 100);
    return { score, passed: score >= quiz.minimumScore };
  }
}
