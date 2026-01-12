import type { Course, CourseDetail } from '@/domain/entities/course';

export interface CourseRepository {
  listHighlightedCourses(): Promise<Course[]>;
  getCourseById(id: string): Promise<CourseDetail | null>;
}
