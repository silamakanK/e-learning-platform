# E-learning Platform

## 1. Contexte & Objectifs

Ce projet consiste à développer une **plateforme de e-learning** permettant aux utilisateurs de suivre des cours en ligne organisés par chapitres.

Le système répond aux besoins suivants :
- Consultation de contenus pédagogiques (cours, vidéos, ressources)
- Quiz interactifs pour valider les connaissances
- Suivi de la progression des apprenants

L’objectif principal est de concevoir une application avec une **architecture claire, maintenable et évolutive**, en appliquant les bonnes pratiques d’architecture logicielle.

---

## 2. Architecture choisie

L’application repose sur une **architecture 3-tiers**, inspirée des principes de la Clean Architecture :

- **Présentation** : interface utilisateur et API (Next.js)
- **Logique métier** : services, règles métier et cas d’usage
- **Données** : persistance et services techniques

### Choix technologiques
- **Next.js** : frontend + backend (API Routes)
- **Supabase** :
  - PostgreSQL pour la base de données
  - Auth pour l’authentification
  - Storage pour les fichiers et ressources

Ces choix garantissent une solution moderne, scalable et adaptée à un projet e-learning.

---

## 3. Démarrage (dev)

### Prérequis
- Node.js (version LTS)
- npm
- Un projet Supabase configuré

### Installation
```bash
git clone https://github.com/silamakanK/e-learning-platform
cd e-learning-platform
npm install
````

### Configuration

Créer un fichier `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Lancement

```bash
npm run dev
```

➡️ Application disponible sur `http://localhost:3000`

---

## 4. Tests

Le projet est structuré pour permettre l’ajout de **tests unitaires** et de **tests d’intégration** sur la logique métier et les services.

```bash
npm run test
```

(Les tests ne sont pas obligatoirement exhaustifs, l’accent étant mis sur l’architecture.)

---

## 5. Décisions clés

Les décisions architecturales majeures du projet sont documentées à l’aide d’**ADR (Architecture Decision Records)**, notamment :

* Choix de la stack Next.js + Supabase
* Adoption d’une architecture 3-tiers
* Séparation claire des responsabilités

Les ADR permettent de justifier les choix techniques et de faciliter l’évolution du projet.