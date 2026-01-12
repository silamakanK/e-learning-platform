import { NextResponse } from 'next/server';
import { getServices } from '@/lib/container';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') ?? process.env.NEXT_PUBLIC_DEMO_USER_ID ?? 'demo-user';
  const { certificateService } = getServices();

  const certificates = await certificateService.listCertificatesForUser(userId);
  return NextResponse.json({ data: certificates });
}
