# Ingoma

**Microlearning** pour les fonctionnaires du Burundi — **commande publique** et **comptabilite publique**.

Logo : tambour sacre (karyenda) stylise aux couleurs du drapeau national (rouge `#CE1126`, vert `#1EB53A`, blanc).

## Objectif

Former les agents de l'Etat par de courtes lecons, des quiz et des cas pratiques, avec progression mesurable et reconnaissance de la regularite.

## Parcours

| Parcours | Contenu |
| --- | --- |
| Commande publique | Cadre juridique, procedures, acteurs (ARMP, DNCMP, PRMP) |
| Comptabilite publique | Ordonnateur / comptable, execution, controles, SIGEFI |

## Fonctionnalites prevues

- Lecons courtes + quiz (seuil 70 %)
- Cas pratiques
- **Points** et **classements** (national, institution, hebdomadaire)
- **Series de regularite** (streaks) + badges
- Inscription par **numero burundais (+257)** + OTP SMS
- Certificats de parcours
- Tuteur IA (contexte droit burundais)

Voir le detail dans [`docs/PRODUCT.md`](docs/PRODUCT.md).

## Stack cible

- TanStack Start (React)
- Tailwind CSS
- Auth telephone / OTP
- Base Postgres (Neon / equivalent)
- Deploiement : Vercel ou `*.grok.me`

## Deploiement GitHub → Vercel

1. Importer ce repo dans [Vercel](https://vercel.com/new)
2. Configurer les variables d'environnement (DB, SMS, auth)
3. Chaque `push` sur `main` declenche un deploiement production

## Statut

Repo initialise. Le code source de l'application App Builder sera ajoute ici (export Build ou synchronisation).

## Licence

Usage institutionnel — contenu pedagogique, non constitutif d'avis juridique officiel.
