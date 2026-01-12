import type { SupabaseClient } from '@supabase/supabase-js';
import type { Certificate } from '@/domain/entities/certificate';
import type { CertificateRepository } from '@/domain/repositories/certificateRepository';

export class SupabaseCertificateRepository implements CertificateRepository {
  constructor(private readonly client: SupabaseClient) {}

  async listByUser(userId: string): Promise<Certificate[]> {
    const { data, error } = await this.client
      .from('certificates')
      .select('id, user_id, course_id, course_title, status, issued_at, credential_url')
      .eq('user_id', userId);

    if (error) {
      console.error('[SupabaseCertificateRepository] listByUser', error.message);
      throw error;
    }

    return (data ?? []).map(row => ({
      id: row.id,
      userId: row.user_id,
      courseId: row.course_id,
      courseTitle: row.course_title,
      status: row.status,
      issuedAt: row.issued_at ?? undefined,
      credentialUrl: row.credential_url ?? undefined
    }));
  }
}
