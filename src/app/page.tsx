import { FeatureGrid } from '@/presentation/sections/FeatureGrid';
import { HeroSection } from '@/presentation/sections/HeroSection';
import { CourseCard } from '@/presentation/components/CourseCard';
import { ProgressSummary } from '@/presentation/components/ProgressSummary';
import { CertificateShelf } from '@/presentation/components/CertificateShelf';
import { getServices } from '@/lib/container';

export default async function HomePage() {
  const { courseService, progressService, certificateService } = getServices();
  const userId = process.env.NEXT_PUBLIC_DEMO_USER_ID ?? 'demo-user';

  const [courses, progress, certificates] = await Promise.all([
    courseService.listHeroCourses(),
    progressService.getProgressForUser(userId),
    certificateService.listCertificatesForUser(userId)
  ]);

  return (
    <div className="grid" style={{ gap: '2rem' }}>
      <HeroSection />
      <ProgressSummary progress={progress} />
      <CertificateShelf certificates={certificates} />
      <section className="grid" style={{ gap: '1.25rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <p className="tag">Catalogue</p>
            <h2 style={{ marginTop: '0.25rem' }}>Parcours orchestrés</h2>
          </div>
        </header>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
      <FeatureGrid />
    </div>
  );
}
