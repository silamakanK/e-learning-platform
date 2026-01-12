import { NextResponse } from 'next/server';
import { getServices } from '@/lib/container';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') ?? process.env.NEXT_PUBLIC_DEMO_USER_ID ?? 'demo-user';
  const { progressService } = getServices();

  const progress = await progressService.getProgressForUser(userId);
  return NextResponse.json({ data: progress });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const { progressService } = getServices();

  const updated = await progressService.saveProgress({
    userId: payload.userId,
    courseId: payload.courseId,
    completedChapters: payload.completedChapters,
    totalChapters: payload.totalChapters,
    averageScore: payload.averageScore,
    badges: payload.badges ?? [],
    lastAccessedAt: new Date().toISOString()
  });

  return NextResponse.json({ data: updated });
}
