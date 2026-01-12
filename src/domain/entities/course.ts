export type Difficulty = 'Débutant' | 'Intermédiaire' | 'Avancé';

export interface Chapter {
  id: string;
  title: string;
  duration: number; // minutes
  order: number;
  synopsis: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  category: string;
  thumbnailUrl?: string;
  estimatedHours: number;
  tags: string[];
  stats: LearningStatistic;
}

export interface LearningStatistic {
  completionRate: number;
  satisfactionScore: number;
  enrolledStudents: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  answers: string[];
  correctIndex: number;
}

export interface Quiz {
  id: string;
  chapterId: string;
  minimumScore: number;
  questions: QuizQuestion[];
}

export interface CourseDetail extends Course {
  syllabus: Chapter[];
  quiz?: Quiz;
}

export interface ProgressSnapshot {
  userId: string;
  courseId: string;
  completedChapters: number;
  totalChapters: number;
  averageScore: number;
  badges: string[];
  lastAccessedAt: string;
}
