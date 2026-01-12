# E-learning Platform — Architecture 3-tiers

Application Next.js modulaire pour piloter un catalogue de cours, des quiz et la progression des apprenants. Le socle applique une architecture 3-tiers inspirée de la Clean Architecture et s'appuie sur Supabase (Postgres + Auth + Storage) pour la couche données.

## Architecture

| Couche | Description | Dossiers |
| --- | --- | --- |
| Présentation | Pages Next.js (App Router), composants UI et API Routes très fines. | `src/app`, `src/presentation` |
| Métier | Services orchestrant les cas d'usage (cours, progression, quiz). Ils ne dépendent que d'interfaces. | `src/application/services` |
| Données / Infrastructure | Repositories Supabase + implémentations in-memory pour prototyper hors-ligne. | `src/infrastructure` |

L'injection est gérée par `src/lib/container.ts` qui choisit Supabase ou le mode in-memory selon la présence des variables d'environnement.

## Démarrage

```bash
cd nextjs/e-learning-platform
npm install
npm run dev
```

## Variables d'environnement (`.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_DEMO_USER_ID=demo-user
```

> Sans ces variables, l'application bascule automatiquement sur les jeux de données d'exemple (`src/infrastructure/stubs`).

## Modèle Supabase conseillé

Tables principales :

- `courses_public`: métadonnées des cours + KPIs
- `chapters`: chapitres reliés à un `course_id`
- `progress_snapshots`: progression par utilisateur/ cours
- `quizzes`: questions stockées en JSONB, corrigées via une RPC `submit_quiz_attempt`

## Points clés

- UI optimisée lecture (RSC + streaming) capable d'encaisser les pics de consultation.
- `app/api/progress` illustre l'exposition d'une API REST sécurisée.
- Services métiers testables via les repositories in-memory.
- Instructions Supabase fournies pour relier rapidement la base de données.
