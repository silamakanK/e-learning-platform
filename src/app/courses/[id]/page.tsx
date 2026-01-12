import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getServices } from '@/lib/container';
import { CourseDetailHeader } from '@/presentation/components/CourseDetailHeader';
import { ChapterTimeline } from '@/presentation/components/ChapterTimeline';
import { QuizCallout } from '@/presentation/components/QuizCallout';

interface Params {
  params: { id: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { courseService } = getServices();
  const course = await courseService.getCourseDetail(params.id);

  return {
    title: course ? `${course.title} | E-learning Platform` : 'Parcours e-learning',
    description: course?.description
  };
}

export default async function CourseDetailPage({ params }: Params) {
  const { courseService } = getServices();
  const course = await courseService.getCourseDetail(params.id);

  if (!course) {
    notFound();
  }

  return (
    <div className="grid" style={{ gap: '1.5rem' }}>
      <CourseDetailHeader course={course} />
      <section>
        <h2>Programme</h2>
        <ChapterTimeline chapters={course.syllabus} />
      </section>
      {course.quiz && <QuizCallout minimumScore={course.quiz.minimumScore} questionCount={course.quiz.questions.length} />}
    </div>
  );
}
