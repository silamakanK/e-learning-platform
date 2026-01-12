import type { ProgressSnapshot } from '@/domain/entities/course';

export interface StatisticsSummary {
  totalChapters: number;
  completedChapters: number;
  averageScore: number;
  badgesUnlocked: number;
}

export class StatisticsService {
  buildSnapshot(progress: ProgressSnapshot[]): StatisticsSummary {
    const totalChapters = progress.reduce((sum, item) => sum + item.totalChapters, 0);
    const completedChapters = progress.reduce((sum, item) => sum + item.completedChapters, 0);
    const averageScore = progress.length
      ? Math.round(
          progress.reduce((sum, item) => sum + item.averageScore, 0) / progress.length
        )
      : 0;

    const badgesUnlocked = progress.reduce((sum, item) => sum + item.badges.length, 0);

    return { totalChapters, completedChapters, averageScore, badgesUnlocked };
  }
}
