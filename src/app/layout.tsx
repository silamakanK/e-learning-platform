import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'E-learning Platform',
  description: 'Three-tier Next.js + Supabase starter for a modern e-learning experience.',
  keywords: ['e-learning', 'architecture 3 tiers', 'nextjs', 'supabase'],
  openGraph: {
    title: 'E-learning Platform',
    description: 'Plateforme pédagogique modulaire propulsée par Next.js et Supabase.',
    type: 'website'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
