# Ingoma

**Microlearning** pour les fonctionnaires du Burundi — **commande publique** et **comptabilité publique**.

Logo : tambour sacré (karyenda) stylisé aux couleurs du drapeau national (rouge `#CE1126`, vert `#1EB53A`, blanc).

## Objectif

Former les agents de l'État par de courtes leçons, des quiz et des cas pratiques, avec progression mesurable et reconnaissance de la régularité.

## Parcours

| Parcours | Contenu |
| --- | --- |
| Commande publique | Cadre juridique, procédures, acteurs (ARMP, DNCMP, PRMP) |
| Comptabilité publique | Ordonnateur / comptable, exécution, contrôles, SIGEFI |

## Fonctionnalités prévues

- Leçons courtes + quiz (seuil 70 %)
- Cas pratiques
- **Points** et **classements** (national, institution, hebdomadaire)
- **Séries de régularité** (streaks) + badges
- Inscription par **numéro burundais (+257)** + OTP SMS
- Certificats de parcours
- Tuteur IA (contexte droit burundais)

Voir le détail dans [`docs/PRODUCT.md`](docs/PRODUCT.md).

## Stack

- Vite + React + TypeScript
- Tailwind CSS (à venir)
- Auth téléphone / OTP
- Base Postgres (Neon / équivalent)
- Déploiement : Vercel

## Démarrage local

```bash
npm install
npm run dev
```

## Statut

Code starter Vite + React poussé. Le développement de l'application (parcours, quiz, points, auth) se poursuit ici.

## Licence

Usage institutionnel — contenu pédagogique, non constitutif d'avis juridique officiel.
