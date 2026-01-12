import type { Certificate } from '@/domain/entities/certificate';

interface Props {
  certificates: Certificate[];
}

const statusLabel: Record<Certificate['status'], { label: string; color: string }> = {
  issued: { label: 'Certificat délivré', color: '#22c55e' },
  ready: { label: 'Prêt à générer', color: '#f97316' },
  in_progress: { label: 'En cours', color: '#6366f1' }
};

export const CertificateShelf = ({ certificates }: Props) => (
  <section className="card fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <header>
      <p className="tag">Certificats</p>
      <h2 style={{ margin: 0 }}>Reconnaissance des parcours</h2>
      <p style={{ color: 'var(--muted)', marginBottom: 0 }}>
        Chaque certificat est émis lorsque les chapitres sont complétés et que les quiz dépassent le seuil requis.
      </p>
    </header>
    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
      {certificates.map(cert => {
        const status = statusLabel[cert.status];
        return (
          <article key={cert.id} className="card" style={{ boxShadow: 'none', border: '1px solid rgba(17,24,39,0.05)' }}>
            <h3 style={{ marginTop: 0 }}>{cert.courseTitle}</h3>
            <p style={{ marginBottom: '0.5rem', color: 'var(--muted)' }}>#{cert.id}</p>
            <span
              className="badge"
              style={{
                background: `${status.color}20`,
                color: status.color
              }}
            >
              {status.label}
            </span>
            {cert.issuedAt && (
              <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                Émis le {new Date(cert.issuedAt).toLocaleDateString('fr-FR')}
              </p>
            )}
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                className="button"
                style={{ marginTop: '0.75rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                Consulter
              </a>
            )}
          </article>
        );
      })}
    </div>
  </section>
);
