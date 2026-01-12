import type { CertificateRepository } from '@/domain/repositories/certificateRepository';
import type { Certificate } from '@/domain/entities/certificate';
import { demoCertificates } from '@/infrastructure/stubs/dataset';

export class InMemoryCertificateRepository implements CertificateRepository {
  async listByUser(userId: string): Promise<Certificate[]> {
    return demoCertificates.filter(cert => cert.userId === userId);
  }
}
