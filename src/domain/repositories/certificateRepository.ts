import type { Certificate } from '@/domain/entities/certificate';

export interface CertificateRepository {
  listByUser(userId: string): Promise<Certificate[]>;
}
