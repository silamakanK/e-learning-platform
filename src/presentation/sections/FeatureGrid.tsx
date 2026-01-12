const features = [
  {
    title: 'Couche Présentation',
    description:
      'Next.js (App Router) expose des pages React Server Components, controllers API et interactions UI orientées lecture.'
  },
  {
    title: 'Couche Métier',
    description:
      'Services TypeScript orchestrent les cas usages (cours, quiz, progression) et restent testables indépendamment de Next.'
  },
  {
    title: 'Couche Infrastructure',
    description:
      'Repositories Supabase et adaptateurs (in-memory en dev) pilotent les accès aux tables et RPC.'
  },
  {
    title: 'Supabase Ready',
    description: 'Un client unique sécurisé côté serveur, des procédures stockées pour les quiz et un cache local pour la lecture.'
  }
];

export const FeatureGrid = () => (
  <section className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
    {features.map(feature => (
      <article key={feature.title} className="card fade-in">
        <h3 style={{ marginTop: 0 }}>{feature.title}</h3>
        <p style={{ marginBottom: 0, color: 'var(--muted)' }}>{feature.description}</p>
      </article>
    ))}
  </section>
);
