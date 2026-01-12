export type CertificateStatus = 'in_progress' | 'ready' | 'issued';

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  courseTitle: string;
  issuedAt?: string;
  credentialUrl?: string;
  status: CertificateStatus;
}
