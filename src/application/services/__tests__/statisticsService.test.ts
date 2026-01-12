import { describe, expect, it } from 'vitest';
import { StatisticsService } from '@/application/services/statisticsService';
import { demoProgress } from '@/infrastructure/stubs/dataset';

const service = new StatisticsService();

describe('StatisticsService', () => {
  it('agrège correctement les données de progression', () => {
    const summary = service.buildSnapshot(demoProgress);

    expect(summary.totalChapters).toBe(11);
    expect(summary.completedChapters).toBe(4);
    expect(summary.badgesUnlocked).toBe(3);
    expect(summary.averageScore).toBeGreaterThan(0);
  });
});
