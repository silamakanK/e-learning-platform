import type { SupabaseClient } from '@supabase/supabase-js';
import type { Course, CourseDetail } from '@/domain/entities/course';
import type { CourseRepository } from '@/domain/repositories/courseRepository';

interface CourseRecord {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string;
  thumbnail_url: string | null;
  estimated_hours: number;
  tags: string[];
  completion_rate: number;
  satisfaction_score: number;
  enrolled_students: number;
}

export class SupabaseCourseRepository implements CourseRepository {
  constructor(private readonly client: SupabaseClient) {}

  async listHighlightedCourses(): Promise<Course[]> {
    const { data, error } = await this.client
      .from<CourseRecord>('courses_public')
      .select(
        'id, title, description, difficulty, category, thumbnail_url, estimated_hours, tags, completion_rate, satisfaction_score, enrolled_students'
      )
      .limit(12);

    if (error) {
      console.error('[SupabaseCourseRepository] listHighlightedCourses', error.message);
      throw error;
    }

    return (data ?? []).map(mapCourseRecord);
  }

  async getCourseById(id: string): Promise<CourseDetail | null> {
    const [
      { data: course, error: courseError },
      { data: syllabus, error: chaptersError },
      { data: quiz, error: quizError }
    ] = await Promise.all([
      this.client
        .from<CourseRecord>('courses_public')
        .select(
          'id, title, description, difficulty, category, thumbnail_url, estimated_hours, tags, completion_rate, satisfaction_score, enrolled_students'
        )
        .eq('id', id)
        .maybeSingle(),
      this.client
        .from('chapters')
        .select('id, title, duration, chapter_order, synopsis')
        .eq('course_id', id)
        .order('chapter_order', { ascending: true }),
      this.client
        .from('quizzes')
        .select('id, course_id, chapter_id, minimum_score, questions')
        .eq('course_id', id)
        .maybeSingle()
    ]);

    if (courseError) {
      console.error('[SupabaseCourseRepository] getCourseById', courseError.message);
      throw courseError;
    }

    if (!course) {
      return null;
    }

    if (chaptersError) {
      console.error('[SupabaseCourseRepository] getCourseById.chapters', chaptersError.message);
      throw chaptersError;
    }

    const normalizedChapters = (syllabus ?? []).map(chapter => ({
      id: chapter.id,
      title: chapter.title,
      duration: chapter.duration,
      order: chapter.chapter_order,
      synopsis: chapter.synopsis
    }));

    if (quizError) {
      console.error('[SupabaseCourseRepository] getCourseById.quiz', quizError.message);
      throw quizError;
    }

    const normalizedQuiz = quiz
      ? {
          id: quiz.id,
          chapterId: quiz.chapter_id,
          minimumScore: quiz.minimum_score,
          questions: (quiz.questions ?? []).map((question: any, index: number) => ({
            id: `${quiz.id}-${index}`,
            question: question.question,
            answers: question.answers,
            correctIndex: question.correctIndex ?? 0
          }))
        }
      : undefined;

    return {
      ...mapCourseRecord(course),
      syllabus: normalizedChapters,
      quiz: normalizedQuiz
    };
  }
}

const mapCourseRecord = (record: CourseRecord): Course => ({
  id: record.id,
  title: record.title,
  description: record.description,
  difficulty: (record.difficulty ?? 'Débutant') as Course['difficulty'],
  category: record.category,
  thumbnailUrl: record.thumbnail_url ?? undefined,
  estimatedHours: record.estimated_hours ?? 0,
  tags: record.tags ?? [],
  stats: {
    completionRate: record.completion_rate ?? 0,
    satisfactionScore: record.satisfaction_score ?? 0,
    enrolledStudents: record.enrolled_students ?? 0
  }
});
