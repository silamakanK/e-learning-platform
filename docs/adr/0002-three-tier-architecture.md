# ADR 0002 — Architecture 3-tiers avec services métier

- Date : 2025-02-14
- Statut : Acceptée

## Contexte
Le module d'architecture impose une séparation claire Présentation / Métier / Données pour documenter le projet e-learning. L'application doit pouvoir évoluer (ajout de badges, certificats, analytics) sans réécrire l'UI.

## Décision
Structurer le code en trois couches :
1. **Présentation** (`src/app`, `src/presentation`)
2. **Application/Métier** (`src/application` + `src/domain`)
3. **Infrastructure** (`src/infrastructure`, `src/lib`)

L'injection de dépendances se fait via `getServices()` qui instancie les repositories Supabase ou les stubs.

## Alternatives envisagées
- Architecture monolithique « pages + services » sans séparation stricte : rapide mais peu alignée avec le livrable attendu et difficile à tester.
- Microservices : surdimensionné pour un MVP, délais incompatibles.

## Conséquences
- Lisibilité accrue et respect des attentes pédagogiques.
- Possibilité de tester les services métier via les repositories in-memory.
- Légère surcharge initiale (plus de fichiers/interfaces) mais amortie dès les premiers sprints.
