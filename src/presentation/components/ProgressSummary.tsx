import type { ProgressSnapshot } from '@/domain/entities/course';
import { StatisticsService } from '@/application/services/statisticsService';

interface Props {
  progress: ProgressSnapshot[];
}

const statisticsService = new StatisticsService();

export const ProgressSummary = ({ progress }: Props) => {
  const stats = statisticsService.buildSnapshot(progress);

  return (
    <section className="card fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <header>
        <p className="tag">Votre progression</p>
        <h2 style={{ marginBottom: 0 }}>Gérez vos missions pédagogiques</h2>
      </header>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        <Metric label="Chapitres suivis" value={`${stats.completedChapters}/${stats.totalChapters}`} />
        <Metric label="Score moyen" value={`${stats.averageScore}%`} />
        <Metric label="Badges" value={`${stats.badgesUnlocked}`} />
      </div>
    </section>
  );
};

const Metric = ({ label, value }: { label: string; value: string }) => (
  <div style={{ padding: '1rem', borderRadius: '1rem', background: 'rgba(79,70,229,0.08)' }}>
    <p style={{ margin: '0 0 0.25rem 0', color: 'var(--muted)' }}>{label}</p>
    <strong style={{ fontSize: '1.5rem' }}>{value}</strong>
  </div>
);
