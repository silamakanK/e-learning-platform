import type { SupabaseClient } from '@supabase/supabase-js';
import type { ProgressSnapshot } from '@/domain/entities/course';
import type { ProgressRepository } from '@/domain/repositories/progressRepository';

export class SupabaseProgressRepository implements ProgressRepository {
  constructor(private readonly client: SupabaseClient) {}

  async getProgressForUser(userId: string): Promise<ProgressSnapshot[]> {
    const { data, error } = await this.client
      .from('progress_snapshots')
      .select(
        'user_id, course_id, completed_chapters, total_chapters, average_score, badges, last_accessed_at'
      )
      .eq('user_id', userId);

    if (error) {
      console.error('[SupabaseProgressRepository] getProgressForUser', error.message);
      throw error;
    }

    return (data ?? []).map(mapSnapshot);
  }

  async getProgressForCourse(userId: string, courseId: string): Promise<ProgressSnapshot | null> {
    const { data, error } = await this.client
      .from('progress_snapshots')
      .select(
        'user_id, course_id, completed_chapters, total_chapters, average_score, badges, last_accessed_at'
      )
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .maybeSingle();

    if (error) {
      console.error('[SupabaseProgressRepository] getProgressForCourse', error.message);
      throw error;
    }

    return data ? mapSnapshot(data) : null;
  }

  async updateProgressSnapshot(snapshot: ProgressSnapshot): Promise<ProgressSnapshot> {
    const { data, error } = await this.client
      .from('progress_snapshots')
      .upsert({
        user_id: snapshot.userId,
        course_id: snapshot.courseId,
        completed_chapters: snapshot.completedChapters,
        total_chapters: snapshot.totalChapters,
        average_score: snapshot.averageScore,
        badges: snapshot.badges,
        last_accessed_at: snapshot.lastAccessedAt
      })
      .select()
      .maybeSingle();

    if (error) {
      console.error('[SupabaseProgressRepository] updateProgressSnapshot', error.message);
      throw error;
    }

    return data ? mapSnapshot(data) : snapshot;
  }
}

const mapSnapshot = (result: any): ProgressSnapshot => ({
  userId: result.user_id,
  courseId: result.course_id,
  completedChapters: result.completed_chapters,
  totalChapters: result.total_chapters,
  averageScore: result.average_score,
  badges: result.badges ?? [],
  lastAccessedAt: result.last_accessed_at
});
