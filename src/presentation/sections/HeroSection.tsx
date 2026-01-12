import Link from 'next/link';

export const HeroSection = () => (
  <section className="card fade-in" style={{ marginBottom: '2rem', background: 'linear-gradient(135deg, #4f46e5, #312e81)', color: 'white' }}>
    <p className="tag" style={{ background: 'rgba(255,255,255,0.18)', color: 'white' }}>
      Architecture 3-tiers
    </p>
    <h1 style={{ marginTop: '0.25rem', fontSize: '2.4rem' }}>
      Plateforme E-learning modulaire propulsée par Next.js & Supabase
    </h1>
    <p style={{ maxWidth: '640px', lineHeight: 1.6 }}>
      Basée sur notre architecture hexagonale inspirée des 3 couches (Présentation, Métier, Infrastructure).
      Votre code reste lisible, testable et prêt à monter en charge dès le premier sprint.
    </p>
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Link className="button" style={{ background: 'white', color: '#312e81' }} href="/courses">
        Explorer les cours
      </Link>
    </div>
  </section>
);
