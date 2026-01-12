import type { Course } from '@/domain/entities/course';
import Link from 'next/link';

interface Props {
  course: Course;
}

export const CourseCard = ({ course }: Props) => {
  return (
    <article className="card fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span className="tag">{course.category}</span>
        <span style={{ fontWeight: 600, color: 'var(--muted)' }}>{course.difficulty}</span>
      </div>
      <h3 style={{ margin: 0, fontSize: '1.35rem' }}>{course.title}</h3>
      <p style={{ margin: 0, color: 'var(--muted)' }}>{course.description}</p>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {course.tags.map(tag => (
          <span key={tag} className="badge" style={{ background: 'rgba(49,46,129,0.1)', color: 'var(--brand-strong)' }}>
            {tag}
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Taux de complétion</div>
          <strong style={{ fontSize: '1.25rem' }}>{course.stats.completionRate}%</strong>
        </div>
        <Link href={`/courses/${course.id}`} className="button" style={{ textDecoration: 'none' }}>
          Voir le parcours
        </Link>
      </div>
    </article>
  );
};
