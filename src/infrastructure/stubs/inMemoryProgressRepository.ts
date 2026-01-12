import type { ProgressSnapshot } from '@/domain/entities/course';
import type { ProgressRepository } from '@/domain/repositories/progressRepository';
import { demoProgress } from '@/infrastructure/stubs/dataset';

export class InMemoryProgressRepository implements ProgressRepository {
  private readonly data = [...demoProgress];

  async getProgressForUser(userId: string): Promise<ProgressSnapshot[]> {
    return this.data.filter(item => item.userId === userId);
  }

  async getProgressForCourse(userId: string, courseId: string): Promise<ProgressSnapshot | null> {
    return this.data.find(item => item.userId === userId && item.courseId === courseId) ?? null;
  }

  async updateProgressSnapshot(snapshot: ProgressSnapshot): Promise<ProgressSnapshot> {
    const index = this.data.findIndex(
      item => item.userId === snapshot.userId && item.courseId === snapshot.courseId
    );

    if (index >= 0) {
      this.data[index] = snapshot;
    } else {
      this.data.push(snapshot);
    }

    return snapshot;
  }
}
