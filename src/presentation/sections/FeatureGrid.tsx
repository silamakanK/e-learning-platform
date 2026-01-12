const features = [
  {
    title: 'Expérience immersive',
    description:
      'Dashboard Next.js App Router optimisé pour la lecture : chapitres, quiz, certificats et statistiques servies en React Server Components.'
  },
  {
    title: 'Logique pédagogique centralisée',
    description:
      'Services métiers (cours, progression, badges, certificats) orchestrent les règles d’achèvement et les parcours adaptatifs.'
  },
  {
    title: 'Données maîtrisées',
    description:
      'Repositories Supabase encapsulent PostgreSQL + Storage pour stocker cours, tentatives de quiz et snapshots de progression.'
  },
  {
    title: 'Performance e-learning',
    description:
      'Procédures Supabase pour corriger les quiz, cache mémoire pour les parcours populaires et endpoints REST dédiés à la progression.'
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
