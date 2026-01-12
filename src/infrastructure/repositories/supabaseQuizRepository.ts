import type { SupabaseClient } from '@supabase/supabase-js';
import type { Quiz } from '@/domain/entities/course';
import type { QuizRepository } from '@/domain/repositories/quizRepository';

export class SupabaseQuizRepository implements QuizRepository {
  constructor(private readonly client: SupabaseClient) {}

  async getQuizByCourse(courseId: string): Promise<Quiz | null> {
    const { data, error } = await this.client
      .from('quizzes')
      .select('id, course_id, chapter_id, minimum_score, questions')
      .eq('course_id', courseId)
      .maybeSingle();

    if (error) {
      console.error('[SupabaseQuizRepository] getQuizByCourse', error.message);
      throw error;
    }

    if (!data) {
      return null;
    }

    return {
      id: data.id,
      chapterId: data.chapter_id,
      minimumScore: data.minimum_score,
      questions: (data.questions ?? []).map((question: any, index: number) => ({
        id: `${data.id}-${index}`,
        question: question.question,
        answers: question.answers,
        correctIndex: question.correctIndex ?? 0
      }))
    };
  }

  async submitQuizAttempt({
    userId,
    quizId,
    answers
  }: {
    userId: string;
    quizId: string;
    answers: number[];
  }): Promise<{ score: number; passed: boolean }> {
    const { data, error } = await this.client.rpc('submit_quiz_attempt', {
      p_user_id: userId,
      p_quiz_id: quizId,
      p_answers: answers
    });

    if (error) {
      console.error('[SupabaseQuizRepository] submitQuizAttempt', error.message);
      throw error;
    }

    return data ?? { score: 0, passed: false };
  }
}
