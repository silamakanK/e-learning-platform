import { describe, expect, it } from 'vitest';
import { ProgressService } from '@/application/services/progressService';
import { InMemoryProgressRepository } from '@/infrastructure/stubs/inMemoryProgressRepository';
import { demoProgress } from '@/infrastructure/stubs/dataset';

const service = new ProgressService(new InMemoryProgressRepository());

describe('ProgressService', () => {
  it('retourne la progression de l’utilisateur', async () => {
    const snapshots = await service.getProgressForUser('demo-user');

    expect(snapshots).toHaveLength(demoProgress.length);
    expect(snapshots[0].courseId).toBeDefined();
  });

  it('enregistre une nouvelle progression', async () => {
    const updated = await service.saveProgress({
      userId: 'demo-user',
      courseId: 'new-course',
      completedChapters: 2,
      totalChapters: 6,
      averageScore: 75,
      badges: ['Starter'],
      lastAccessedAt: new Date().toISOString()
    });

    expect(updated.courseId).toBe('new-course');

    const snapshots = await service.getProgressForUser('demo-user');
    expect(snapshots.find(snapshot => snapshot.courseId === 'new-course')).toBeDefined();
  });
});
