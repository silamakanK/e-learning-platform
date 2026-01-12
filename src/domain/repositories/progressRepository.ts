import type { ProgressSnapshot } from '@/domain/entities/course';

export interface ProgressRepository {
  getProgressForUser(userId: string): Promise<ProgressSnapshot[]>;
  getProgressForCourse(userId: string, courseId: string): Promise<ProgressSnapshot | null>;
  updateProgressSnapshot(snapshot: ProgressSnapshot): Promise<ProgressSnapshot>;
}
  