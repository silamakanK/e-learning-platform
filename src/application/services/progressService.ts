import type { ProgressSnapshot } from '@/domain/entities/course';
import type { ProgressRepository } from '@/domain/repositories/progressRepository';

export class ProgressService {
  constructor(private readonly repository: ProgressRepository) {}

  async getProgressForUser(userId: string): Promise<ProgressSnapshot[]> {
    return this.repository.getProgressForUser(userId);
  }

  async saveProgress(progress: ProgressSnapshot): Promise<ProgressSnapshot> {
    return this.repository.updateProgressSnapshot(progress);
  }
}
