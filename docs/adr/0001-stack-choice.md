# ADR 0001 — Choix Next.js + Supabase

- Date : 2025-02-14
- Statut : Acceptée

## Contexte
Le projet doit livrer rapidement une plateforme e-learning moderne, orientée consultation, avec des besoins d'API, de SSR et de données relationnelles. L'équipe dispose déjà d'une expertise Next.js.

## Décision
Utiliser **Next.js (App Router)** pour regrouper frontend et backend (API Routes) dans un seul monorepo, et **Supabase** comme backend managé (PostgreSQL + Auth + Storage).

## Alternatives envisagées
- Couple React SPA + NestJS/Express séparé : plus de friction DevOps et duplication de modèles.
- Remix + PlanetScale : difficile d'exploiter les fonctionnalités temps réel/stockage attendues sans multiplier les services.
- Firebase (Firestore + Hosting) : modèle NoSQL moins adapté aux relations riches (cours, chapitres, quiz, progression).

## Conséquences
- Déploiement simplifié (un seul projet Next.js).
- SQL pleinement disponible pour modéliser cours/chapitres/quiz.
- Possibilité d'utiliser Supabase Storage et RPC pour optimiser les quiz.
- Dépendance forte à Supabase (verrou fournisseur acceptable pour ce périmètre).
