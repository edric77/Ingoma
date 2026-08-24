# Ingoma

**Microlearning** pour les fonctionnaires du Burundi — **commande publique** et **comptabilité publique**.

Logo : tambour sacré (karyenda) aux couleurs du drapeau (rouge `#CE1126`, vert `#1EB53A`, blanc).

## Contenu v0.3

| Parcours | Leçons |
| --- | --- |
| Commande publique | **10** (cadre juridique → intégrité) |
| Comptabilité publique | **10** (principes → responsabilités) |

### Assistant tuteur (gratuit)

Page **Assistant** (`/tuteur`) : réponses pédagogiques à partir des leçons et du glossaire, **sans API payante**.

### Gamification

- **QCM chronométrés**, **vrai/faux**, **rappel actif** (flashcards)
- **Glisser-déposer**, **textes à trous**, **ordonnancement**, **association colorée**
- **Jeux de rôle / prise de décision**
- **Défi du jour** + **séries** (streaks) + badges
- **Kit test 10 téléphones** + **bilan pilote** (CSV)

### Points

| Action | Points |
| --- | --- |
| Leçon lue | +10 |
| Activités ≥ 70 % | +15 |
| Activités 100 % | +25 |
| Cas pratique | +30 |
| Connexion du jour | +5 |
| Défi du jour | +20 |
| Série 7 jours | +50 |

## Démarrage

```bash
npm install
npm run dev
```

OTP démo : n'importe quel code à 6 chiffres (ex. `123456`).

## Stack

Vite 5 · React 19 · TypeScript · React Router 7 · Tailwind CSS v4 · Lucide

## Déploiement Vercel

1. [vercel.com/new](https://vercel.com/new) → importer `edric77/Ingoma`
2. Framework : Vite · Build : `npm run build` · Output : `dist`
3. Deploy. Les pushes sur `main` redéploient automatiquement si le projet est lié.

Rewrites SPA dans `vercel.json`.

## Avertissement

Contenu pédagogique uniquement. **Non constitutif d'avis juridique officiel.**
Référez-vous aux textes en vigueur (ARMP, DNCMP, Ministère des Finances).

## Licence

Usage institutionnel.
