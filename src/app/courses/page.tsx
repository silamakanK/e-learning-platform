import Link from 'next/link';
import { getServices } from '@/lib/container';

export default async function CoursesPage() {
  const { courseService } = getServices();
  const courses = await courseService.listHeroCourses();

  return (
    <div className="grid" style={{ gap: '1.5rem' }}>
      <header>
        <p className="tag">Catalogue complet</p>
        <h1>Parcours e-learning</h1>
        <p style={{ color: 'var(--muted)' }}>
          Chaque fiche combine contenus multimédia, quiz contrôlés et intégration Supabase-native.
        </p>
      </header>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
        {courses.map(course => (
          <article key={course.id} className="card">
            <h2>{course.title}</h2>
            <p style={{ color: 'var(--muted)' }}>{course.description}</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {course.tags.slice(0, 3).map(tag => (
                <span key={tag} className="badge">
                  {tag}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
              <div>
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.85rem' }}>Satisfaction</p>
                <strong>{course.stats.satisfactionScore.toFixed(1)}/5</strong>
              </div>
              <Link href={`/courses/${course.id}`} className="button">
                Détails
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
