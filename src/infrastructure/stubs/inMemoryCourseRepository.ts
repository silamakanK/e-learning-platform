import type { Course, CourseDetail } from '@/domain/entities/course';
import type { CourseRepository } from '@/domain/repositories/courseRepository';
import { demoCourses } from '@/infrastructure/stubs/dataset';

export class InMemoryCourseRepository implements CourseRepository {
  async listHighlightedCourses(): Promise<Course[]> {
    return demoCourses.map(({ syllabus, quiz, ...course }) => course);
  }

  async getCourseById(id: string): Promise<CourseDetail | null> {
    return demoCourses.find(course => course.id === id) ?? null;
  }
}
