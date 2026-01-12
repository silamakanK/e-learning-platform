import type { CourseDetail } from '@/domain/entities/course';

interface Props {
  course: CourseDetail;
}

export const CourseDetailHeader = ({ course }: Props) => (
  <section className="card" style={{ marginBottom: '1.5rem' }}>
    <div className="tag">{course.category}</div>
    <h1 style={{ margin: '0.5rem 0' }}>{course.title}</h1>
    <p style={{ margin: 0, color: 'var(--muted)', maxWidth: '720px' }}>{course.description}</p>
    <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
      <Stat label="Difficulté" value={course.difficulty} />
      <Stat label="Durée" value={`${course.estimatedHours} h`} />
      <Stat label="Apprenants" value={course.stats.enrolledStudents.toLocaleString('fr-FR')} />
    </div>
  </section>
);

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.85rem' }}>{label}</p>
    <strong style={{ fontSize: '1.35rem' }}>{value}</strong>
  </div>
);
