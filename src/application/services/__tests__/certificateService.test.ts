import { describe, expect, it } from 'vitest';
import { CertificateService } from '@/application/services/certificateService';
import { InMemoryCertificateRepository } from '@/infrastructure/stubs/inMemoryCertificateRepository';

const service = new CertificateService(new InMemoryCertificateRepository());

describe('CertificateService', () => {
  it('liste les certificats existants pour un utilisateur', async () => {
    const certificates = await service.listCertificatesForUser('demo-user');

    expect(certificates.length).toBeGreaterThan(0);
    expect(certificates.every(cert => cert.userId === 'demo-user')).toBe(true);
  });
});
