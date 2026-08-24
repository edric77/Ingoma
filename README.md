# Ingoma

**Microlearning** pour les fonctionnaires du Burundi — **commande publique** et **comptabilité publique**.

Logo : tambour sacré (karyenda) aux couleurs du drapeau (rouge `#CE1126`, vert `#1EB53A`, blanc).

## Contenu v0.4

| Parcours | Leçons |
| --- | --- |
| Commande publique | **10** (cadre juridique → intégrité) |
| Comptabilité publique | **10** (principes → responsabilités) |
| **Programme 3 mois** | **90** micro-leçons quotidiennes uniques |

### Programme 90 jours

Une micro-leçon + un défi chaque jour (`/programme`). Progression Jour X/90 sur l’accueil.

### Assistant tuteur (gratuit)

Page **Assistant** (`/tuteur`) : réponses à partir des leçons et du glossaire, **sans API payante**.

### Gamification

- QCM chronométrés, vrai/faux, rappel actif, association colorée
- Glisser-déposer, textes à trous, ordonnancement, décisions
- Défi du jour, séries, badges, kit test 10 téléphones + bilan CSV

## Démarrage

```bash
npm install
npm run dev
```

OTP démo : n’importe quel code à 6 chiffres (ex. `123456`).

## Stack

Vite 5 · React 19 · TypeScript · React Router 7 · Tailwind CSS v4 · Lucide

## Déploiement Vercel

Repo : [github.com/edric77/Ingoma](https://github.com/edric77/Ingoma)  
Build : `npm run build` · Output : `dist` · Rewrites SPA dans `vercel.json`.

Les pushes sur `main` redéploient automatiquement si le projet est lié à Vercel.

## Avertissement

Contenu pédagogique uniquement. **Non constitutif d’avis juridique officiel.**

## Licence

Usage institutionnel.
