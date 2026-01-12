import type { Course, CourseDetail } from '@/domain/entities/course';
import type { CourseRepository } from '@/domain/repositories/courseRepository';

export class CourseService {
  constructor(private readonly repository: CourseRepository) {}

  async listHeroCourses(): Promise<Course[]> {
    const courses = await this.repository.listHighlightedCourses();
    return courses.sort((a, b) => b.stats.completionRate - a.stats.completionRate);
  }

  async getCourseDetail(courseId: string): Promise<CourseDetail | null> {
    return this.repository.getCourseById(courseId);
  }
}
