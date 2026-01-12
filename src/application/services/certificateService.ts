import type { Certificate } from '@/domain/entities/certificate';
import type { CertificateRepository } from '@/domain/repositories/certificateRepository';

export class CertificateService {
  constructor(private readonly repository: CertificateRepository) {}

  listCertificatesForUser(userId: string): Promise<Certificate[]> {
    return this.repository.listByUser(userId);
  }
}
