import type { Chapter } from '@/domain/entities/course';

interface Props {
  chapters: Chapter[];
}

export const ChapterTimeline = ({ chapters }: Props) => (
  <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
    {chapters.map(chapter => (
      <li key={chapter.id} className="card fade-in" style={{ marginBottom: '1rem' }}>
        <div className="tag" style={{ marginBottom: '0.5rem' }}>
          Chapitre {chapter.order}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>{chapter.title}</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>{chapter.synopsis}</p>
          </div>
          <strong style={{ fontSize: '1rem' }}>{chapter.duration} min</strong>
        </div>
      </li>
    ))}
  </ol>
);
