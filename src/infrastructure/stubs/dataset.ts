import type {
  Chapter,
  CourseDetail,
  ProgressSnapshot,
  Quiz
} from '@/domain/entities/course';

export const chapters: Chapter[] = [
  {
    id: 'chapter-ux-01',
    title: 'Fondamentaux de la pédagogie digitale',
    duration: 35,
    order: 1,
    synopsis: 'Comprendre comment structurer un parcours efficace pour des apprenants en ligne.'
  },
  {
    id: 'chapter-ux-02',
    title: 'Gamification et engagement',
    duration: 28,
    order: 2,
    synopsis: 'Utiliser badges et micro-récompenses pour garder les apprenants motivés.'
  },
  {
    id: 'chapter-ai-01',
    title: 'IA générative appliquée',
    duration: 32,
    order: 1,
    synopsis: "Créer des activités auto-générées via l'IA pour personnaliser le parcours."
  }
];

export const demoQuiz: Quiz = {
  id: 'quiz-ux',
  chapterId: 'chapter-ux-02',
  minimumScore: 70,
  questions: [
    {
      id: 'question-1',
      question: "Quel KPI suivre pour mesurer l'engagement ?",
      answers: ['Taux de complétion', 'Nombre de badges', 'Temps passé', 'Tous les précédents'],
      correctIndex: 3
    },
    {
      id: 'question-2',
      question: 'À quelle fréquence faut-il relancer un apprenant inactif ?',
      answers: ['Toutes les heures', 'Tous les jours', 'Toutes les semaines', 'Jamais'],
      correctIndex: 2
    }
  ]
};

export const demoCourses: CourseDetail[] = [
  {
    id: 'learning-experience-design',
    title: 'Learning Experience Design',
    description:
      'Construisez des parcours immersifs, personnalisés et pilotés par la donnée pour vos apprenants.',
    difficulty: 'Intermédiaire',
    category: 'Productivité',
    thumbnailUrl: '/hero-illustration.svg',
    estimatedHours: 22,
    tags: ['UX pédagogique', 'Analytics', 'Gamification'],
    stats: {
      completionRate: 86,
      satisfactionScore: 4.8,
      enrolledStudents: 1820
    },
    syllabus: chapters,
    quiz: demoQuiz
  },
  {
    id: 'ai-coach',
    title: 'IA Coach pour enseignants',
    description: 'Exploitez GPT pour analyser les progrès et générer des feedbacks personnalisés.',
    difficulty: 'Avancé',
    category: 'IA appliquée',
    estimatedHours: 18,
    tags: ['LLM', 'Feedback', 'Automation'],
    stats: {
      completionRate: 78,
      satisfactionScore: 4.6,
      enrolledStudents: 940
    },
    syllabus: chapters
  },
  {
    id: 'video-learning-sprints',
    title: 'Video Learning Sprints',
    description: 'Industrialisez la production de capsules vidéos interactives orientées data.',
    difficulty: 'Débutant',
    category: 'Production',
    estimatedHours: 12,
    tags: ['Studio', 'Templates'],
    stats: {
      completionRate: 91,
      satisfactionScore: 4.9,
      enrolledStudents: 2540
    },
    syllabus: chapters
  }
];

export const demoProgress: ProgressSnapshot[] = [
  {
    userId: 'demo-user',
    courseId: 'learning-experience-design',
    completedChapters: 3,
    totalChapters: 6,
    averageScore: 82,
    badges: ['Starter', 'UX Lover'],
    lastAccessedAt: new Date().toISOString()
  },
  {
    userId: 'demo-user',
    courseId: 'ai-coach',
    completedChapters: 1,
    totalChapters: 5,
    averageScore: 76,
    badges: ['AI Explorer'],
    lastAccessedAt: new Date().toISOString()
  }
];
