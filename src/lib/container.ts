import { CourseService } from '@/application/services/courseService';
import { ProgressService } from '@/application/services/progressService';
import { QuizService } from '@/application/services/quizService';
import { StatisticsService } from '@/application/services/statisticsService';
import { CertificateService } from '@/application/services/certificateService';
import { buildSupabaseServerClient } from '@/infrastructure/supabase/serverClient';
import { SupabaseCourseRepository } from '@/infrastructure/repositories/supabaseCourseRepository';
import { SupabaseProgressRepository } from '@/infrastructure/repositories/supabaseProgressRepository';
import { SupabaseQuizRepository } from '@/infrastructure/repositories/supabaseQuizRepository';
import { SupabaseCertificateRepository } from '@/infrastructure/repositories/supabaseCertificateRepository';
import { InMemoryCourseRepository } from '@/infrastructure/stubs/inMemoryCourseRepository';
import { InMemoryProgressRepository } from '@/infrastructure/stubs/inMemoryProgressRepository';
import { InMemoryQuizRepository } from '@/infrastructure/stubs/inMemoryQuizRepository';
import { InMemoryCertificateRepository } from '@/infrastructure/stubs/inMemoryCertificateRepository';

const servicesCache = new Map<string, ServiceRegistry>();

export type ServiceRegistry = {
  courseService: CourseService;
  progressService: ProgressService;
  quizService: QuizService;
  statisticsService: StatisticsService;
  certificateService: CertificateService;
};

export const getServices = (): ServiceRegistry => {
  if (servicesCache.has('default')) {
    return servicesCache.get('default')!;
  }

  const supabaseReady = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const registry = supabaseReady ? buildSupabaseServices() : buildInMemoryServices();

  servicesCache.set('default', registry);
  return registry;
};

const buildSupabaseServices = (): ServiceRegistry => {
  const supabaseClient = buildSupabaseServerClient();

  const courseService = new CourseService(new SupabaseCourseRepository(supabaseClient));
  const progressService = new ProgressService(new SupabaseProgressRepository(supabaseClient));
  const quizService = new QuizService(new SupabaseQuizRepository(supabaseClient));
  const certificateService = new CertificateService(new SupabaseCertificateRepository(supabaseClient));
  const statisticsService = new StatisticsService();

  return { courseService, progressService, quizService, statisticsService, certificateService };
};

const buildInMemoryServices = (): ServiceRegistry => {
  const courseService = new CourseService(new InMemoryCourseRepository());
  const progressService = new ProgressService(new InMemoryProgressRepository());
  const quizService = new QuizService(new InMemoryQuizRepository());
  const statisticsService = new StatisticsService();
  const certificateService = new CertificateService(new InMemoryCertificateRepository());

  return { courseService, progressService, quizService, statisticsService, certificateService };
};
