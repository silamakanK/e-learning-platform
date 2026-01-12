# Architecture de la plateforme E-learning

Cette documentation synthétise la vision ciblée pour le projet « E-learning Platform ». Elle assemble le diagramme UML, les choix 3-tiers et les justifications technologiques nécessaires pour soutenir le livrable d'architecture demandé dans le cours.

## 1. Diagramme UML du domaine

Le diagramme UML décrit les entités métier clés (User, Course, Chapter, Quiz, Progress, Certificate) ainsi que leurs relations. Il sert de référence partagée entre la conception et le développement. Une représentation maintenable au format Mermaid est disponible dans [`docs/uml.md`](./uml.md).

## 2. Architecture 3-tiers

Nous réutilisons une architecture 3-tiers enrichie par des principes de Clean et d'injection de dépendances.

- **Couche Présentation** : pages Next.js (App Router), composants et API Routes responsables de l'IHM, des validations basiques et des appels aux services métier. Elle ne contient aucune logique fonctionnelle durable.
- **Couche Logique Métier** : services TypeScript (courses, quiz, progression, certificats) orchestrant les cas d'usage et appliquant les règles fonctionnelles (calcul de progression, validation de quiz, attribution de badges, émission de certificats).
- **Couche Données / Infrastructure** : repositories Supabase (PostgreSQL + Storage) et adaptateurs in-memory pour le mode démonstration. Cette couche encapsule l'accès aux tables, RPC, storage et futures intégrations (cache, emails, analytics).

Les couches communiquent uniquement avec la couche adjacente. La Présentation consomme la Logique Métier via un container, tandis que la Logique Métier s'appuie sur les interfaces des repositories fournis par l'Infrastructure.

## 3. Flux de communication

1. L'utilisateur interagit avec l'interface Next.js (parcours, quiz, progression).
2. La Présentation valide l'entrée, construit les DTOs puis invoque le service métier adéquat.
3. Le service métier appelle les repositories via leurs interfaces pour lire/écrire les données ou déclencher des actions (quiz RPC, storage, certificats).
4. Le résultat remonté vers l'UI est sérialisé par des DTOs/formatteurs.

Ce flux unidirectionnel garantit un couplage faible, simplifie l'écriture de tests et autorise le remplacement d'une infrastructure (ex : Supabase) sans refactoriser la Présentation.

## 4. Choix technologiques

| Domaine | Choix | Justification |
| --- | --- | --- |
| Frontend + Backend | Next.js (App Router) | Unifie SSR/SSG, fournit les API Routes et simplifie le déploiement du front + back dans un seul repo. |
| Base de données | Supabase (PostgreSQL managé) | Cohérence transactionnelle, SQL expressif, policies de sécurité (RLS) et migrations simples. |
| Stockage de fichiers | Supabase Storage | Stockage objet évolutif adapté aux vidéos, documents et assets pédagogiques. |
| Performance | Index PostgreSQL, RPC Supabase, cache dédié (Redis optionnel) | Optimise les lectures massivement majoritaires du e-learning et limite la charge backend. |

## 5. Organisation du code

| Dossier | Rôle |
| --- | --- |
| `src/presentation` | Composants UI réutilisables et sections. |
| `src/app` | Pages Next.js (RSC) et API Routes. |
| `src/application` | Services métier (cours, quiz, progression, statistiques). |
| `src/domain` | Entités et interfaces de repositories. |
| `src/infrastructure` | Implémentations Supabase, stubs in-memory et client partagé. |
| `src/lib` | Composition root (`getServices`) qui instancie les couches. |

Cette structure s'aligne avec la description fournie par le module d'architecture (séparation claire Présentation / Métier / Données) et prépare l'application pour des évolutions professionnelles.
