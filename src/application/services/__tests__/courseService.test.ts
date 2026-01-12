import { describe, expect, it } from 'vitest';
import { CourseService } from '@/application/services/courseService';
import { InMemoryCourseRepository } from '@/infrastructure/stubs/inMemoryCourseRepository';

const service = new CourseService(new InMemoryCourseRepository());

describe('CourseService', () => {
  it('classe les cours par taux de complétion décroissant', async () => {
    const courses = await service.listHeroCourses();

    expect(courses[0].id).toBe('video-learning-sprints');
    expect(courses[1].stats.completionRate).toBeGreaterThanOrEqual(courses[2].stats.completionRate);
  });

  it('retourne le détail complet du cours demandé', async () => {
    const course = await service.getCourseDetail('learning-experience-design');

    expect(course).not.toBeNull();
    expect(course?.syllabus.length).toBeGreaterThan(0);
    expect(course?.quiz?.questions).toHaveLength(2);
  });
});
