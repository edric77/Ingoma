import type { Track, Lesson, ActivityItem, DailyChallenge } from "./catalog-types"
export type * from "./catalog-types"
import { CP_LESSONS } from "./catalog-cp"
import { CO_LESSONS } from "./catalog-co"

export const TRACKS: Track[] = [
  {
    slug: 'commande-publique',
    title: 'Commande publique',
    description:
      'Cadre juridique, procédures, acteurs, contrôles, DAO, seuils, évaluation, attribution, exécution et intégrité.',
    lessons: CP_LESSONS,
    caseStudy: {
      id: 'cp-cas-1',
      title: 'Cas pratique : choix de procédure et acteurs',
      scenario:
        'Votre ministère doit acquérir du matériel informatique standard pour environ 45 millions de FBu. Aucune urgence extrême. Vous appuyez la PRMP.',
      role: 'Appui à la PRMP',
      questions: [
        {
          id: 'cp-cas-q1',
          prompt: 'Quelle procédure recommandez-vous en priorité et pourquoi ?',
          expectedKeywords: ["appel d'offres ouvert", 'droit commun', 'concurrence', 'transparence'],
        },
        {
          id: 'cp-cas-q2',
          prompt: 'Quels acteurs et documents mobiliser avant le lancement ?',
          expectedKeywords: ['DAO', 'PRMP', 'DNCMP', 'avis', 'seuil', 'commission'],
        },
      ],
    },
  },
  {
    slug: 'comptabilite-publique',
    title: 'Comptabilité publique',
    description:
      'Principes, circuit de la dépense, ordonnateur, comptable, crédits, pièces, recettes, contrôles, SIGEFI et responsabilités.',
    lessons: CO_LESSONS,
    caseStudy: {
      id: 'co-cas-1',
      title: 'Cas pratique : circuit de la dépense',
      scenario:
        "Une facture de fournitures arrive. L'engagement a été fait. Vous devez vérifier le circuit avant paiement.",
      role: 'Agent de la chaîne de la dépense',
      questions: [
        {
          id: 'co-cas-q1',
          prompt: 'Quelles étapes entre engagement et paiement ?',
          expectedKeywords: ['liquidation', 'ordonnancement', 'comptable', 'contrôle', 'pièces'],
        },
      ],
    },
  },
]

export const GLOSSARY: { term: string; definition: string }[] = [
  { term: 'ARMP', definition: 'Autorité de Régulation des Marchés Publics — régulation, recours et bonne gouvernance des marchés publics.' },
  { term: 'DNCMP', definition: 'Direction Nationale du Contrôle des Marchés Publics — contrôle a priori selon les seuils.' },
  { term: 'PRMP', definition: "Personne Responsable des Marchés Publics — conduit les procédures au sein de l'autorité contractante." },
  { term: 'SIGEFI', definition: "Système d'Information de Gestion des Finances — suivi de l'exécution budgétaire." },
  { term: 'Ordonnateur', definition: 'Autorité qui engage, liquide et ordonnance les dépenses. Distinct du comptable.' },
  { term: 'Comptable public', definition: 'Agent responsable du paiement et de la conservation des deniers, sous responsabilité personnelle et pécuniaire.' },
  { term: 'DAO', definition: "Dossier d'Appel d'Offres — documents fournis aux candidats (règlement, CCTP, CCAP…)." },
  { term: "Appel d'offres ouvert", definition: 'Procédure de droit commun : tout candidat peut soumissionner après publicité.' },
  { term: 'Engagement', definition: 'Acte réservant des crédits pour une dépense future.' },
  { term: 'Liquidation', definition: 'Constatation du service fait et détermination du montant dû.' },
  { term: 'Ordonnancement', definition: 'Ordre de payer adressé au comptable public.' },
  { term: 'Avenant', definition: "Acte modificatif d'un marché en cours, encadré par les textes." },
]

export const DAILY_POOL: ActivityItem[] = [
  {
    type: 'truefalse',
    id: 'daily-tf1',
    statement: "L'ARMP assure le contrôle a priori des dossiers de marchés selon les seuils.",
    correct: false,
    explanation: "Faux. C'est la DNCMP qui assure le contrôle a priori ; l'ARMP régule et traite les recours.",
  },
  {
    type: 'mcq',
    id: 'daily-mcq1',
    question: 'Dans le circuit de la dépense, que fait le comptable ?',
    choices: ['Engage la dépense', 'Liquide le service fait', 'Paie après contrôle de régularité', 'Rédige le DAO'],
    correctIndex: 2,
    explanation: 'Le comptable paie après avoir contrôlé la régularité.',
    timedSeconds: 40,
  },
  {
    type: 'fillblank',
    id: 'daily-fb1',
    text: 'La ___ est la Personne Responsable des Marchés Publics.',
    answer: 'PRMP',
    alternatives: ['Prmp'],
    explanation: 'PRMP = Personne Responsable des Marchés Publics.',
  },
  {
    type: 'truefalse',
    id: 'daily-tf2',
    statement: 'La séparation ordonnateur / comptable protège les deniers publics.',
    correct: true,
    explanation: "Vrai. C'est un principe fondamental de contrôle interne.",
  },
  {
    type: 'mcq',
    id: 'daily-mcq2',
    question: 'Quelle procédure est de droit commun en commande publique ?',
    choices: ['Procédure négociée', "Appel d'offres ouvert", 'Gré à gré', "Appel d'offres restreint seul"],
    correctIndex: 1,
    explanation: "L'appel d'offres ouvert est la procédure de droit commun.",
    timedSeconds: 30,
  },
]

export function getDailyChallenge(): DailyChallenge {
  const day = new Date().getDate()
  const activity = DAILY_POOL[day % DAILY_POOL.length]
  return {
    id: `daily-${day}`,
    date: new Date().toISOString().slice(0, 10),
    title: 'Défi du jour',
    trackSlug: day % 2 === 0 ? 'commande-publique' : 'comptabilite-publique',
    activity,
    points: 20,
  }
}

export function getTrack(slug: string): Track | undefined {
  return TRACKS.find((t) => t.slug === slug)
}

export function getLesson(trackSlug: string, lessonSlug: string): Lesson | undefined {
  return getTrack(trackSlug)?.lessons.find((l) => l.slug === lessonSlug)
}

export function getLessonById(id: string): { track: Track; lesson: Lesson } | undefined {
  for (const track of TRACKS) {
    const lesson = track.lessons.find((l) => l.id === id)
    if (lesson) return { track, lesson }
  }
  return undefined
}
