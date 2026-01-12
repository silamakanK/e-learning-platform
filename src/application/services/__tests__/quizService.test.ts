import { describe, expect, it } from 'vitest';
import { QuizService } from '@/application/services/quizService';
import { InMemoryQuizRepository } from '@/infrastructure/stubs/inMemoryQuizRepository';

const service = new QuizService(new InMemoryQuizRepository());

describe('QuizService', () => {
  it('récupère le quiz associé à un cours', async () => {
    const quiz = await service.getQuiz('learning-experience-design');

    expect(quiz).not.toBeNull();
    expect(quiz?.questions.length).toBeGreaterThan(0);
  });

  it('évalue une tentative de quiz et fournit le score', async () => {
    const result = await service.submitAnswers({
      userId: 'demo-user',
      quizId: 'quiz-ux',
      answers: [3, 2]
    });

    expect(result.score).toBe(100);
    expect(result.passed).toBe(true);
  });
});
