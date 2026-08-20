# Ingoma

**Microlearning** pour les fonctionnaires du Burundi — **commande publique** et **comptabilité publique**.

Logo : tambour sacré (karyenda) stylisé aux couleurs du drapeau national (rouge `#CE1126`, vert `#1EB53A`, blanc).

## Objectif

Former les agents de l'État par de courtes leçons, des quiz et des cas pratiques, avec progression mesurable et reconnaissance de la régularité.

## Fonctionnalités (v0.1)

- Accueil + parcours **Commande publique** (4 leçons + quiz + cas) et amorce **Comptabilité publique**
- Quiz avec feedback immédiat (seuil 70 %)
- Points, streak, badges (stockage local)
- Connexion téléphone +257 (OTP simulé)
- Classement (démo), glossaire, certificat imprimable
- UI institutionnelle (fond papier crème, vert forêt, Fraunces)

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir http://localhost:5173

**OTP démo** : n'importe quel code à 6 chiffres (ex. `123456`).

## Stack

- Vite 5 + React 19 + TypeScript
- React Router 7
- Tailwind CSS v4
- Lucide icons
- Progression en localStorage (prêt pour sync serveur)

## Avertissement

Contenu pédagogique uniquement. **Non constitutif d'avis juridique officiel.**  
Référez-vous aux textes en vigueur (ARMP, DNCMP, Ministère des Finances).

## Licence

Usage institutionnel.
