# E-learning Platform

## 🎯 Objectif du projet
Ce projet est une plateforme **E-learning** permettant aux utilisateurs de suivre des cours en ligne organisés par chapitres, avec des vidéos, des quiz et un suivi de progression.

L’objectif principal est de mettre en place une **architecture claire et maintenable** basée sur Next.js et Supabase, en appliquant les bonnes pratiques d’architecture logicielle.

---

## 🧱 Stack technique
- **Next.js** (Frontend + API Routes)
- **Supabase** :
  - PostgreSQL (base de données)
  - Authentification
  - Storage (ressources et médias)

---

## 🚀 Installation

### 1. Cloner le dépôt
```bash
git clone <URL_DU_REPO_GITHUB>
cd <NOM_DU_PROJET>
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration

Créer un fichier `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Lancer le projet

```bash
npm run dev
```

➡️ Application accessible sur `http://localhost:3000`

---

## 📄 Livrables

* Code source
* Diagramme UML
* ADR (Architecture Decision Records)
* Documentation d’architecture
