export type QuizQuestion = {
  id: string
  question: string
  choices: string[]
  correctIndex: number
  explanation: string
}

export type Lesson = {
  id: string
  slug: string
  title: string
  durationMin: number
  content: string[]
  keyPoints: string[]
  quiz: QuizQuestion[]
}

export type CaseStudy = {
  id: string
  title: string
  scenario: string
  questions: { id: string; prompt: string; expectedKeywords: string[] }[]
}

export type Track = {
  slug: string
  title: string
  description: string
  lessons: Lesson[]
  caseStudy: CaseStudy
  color: string
}

export const TRACKS: Track[] = [
  {
    slug: "commande-publique",
    title: "Commande publique",
    description:
      "Cadre juridique, procédures, acteurs et contrôles de la commande publique au Burundi.",
    color: "forest",
    lessons: [
      {
        id: "cp-1",
        slug: "cadre-juridique",
        title: "Cadre juridique de la commande publique",
        durationMin: 7,
        content: [
          "La commande publique au Burundi est régie principalement par la loi n°1/14 du 27 avril 2015 portant Code des marchés publics et des délégations de service public, ainsi que ses textes d'application.",
          "Elle vise à assurer la transparence, l'égalité de traitement des candidats, la libre concurrence et l'efficacité de la dépense publique.",
          "Les principes fondamentaux sont : libre accès à la commande publique, égalité de traitement, transparence des procédures, et respect de l'environnement et du développement durable lorsque c'est pertinent.",
          "Important : ce contenu est une aide à la formation. Il ne constitue pas un avis juridique officiel. Toujours se référer aux textes en vigueur et aux instructions de l'ARMP.",
        ],
        keyPoints: [
          "Loi n°1/14 du 27 avril 2015 (Code des marchés publics)",
          "Principes : transparence, égalité, concurrence",
          "ARMP : Autorité de Régulation des Marchés Publics",
          "Pas d'avis juridique officiel — se référer aux textes",
        ],
        quiz: [
          {
            id: "cp-1-q1",
            question: "Quelle est la principale loi régissant la commande publique au Burundi ?",
            choices: [
              "La loi n°1/14 du 27 avril 2015",
              "Le Code civil burundais",
              "La loi sur les sociétés commerciales",
              "Le règlement de l'OHADA",
            ],
            correctIndex: 0,
            explanation:
              "La loi n°1/14 du 27 avril 2015 constitue le Code des marchés publics et des délégations de service public au Burundi.",
          },
          {
            id: "cp-1-q2",
            question: "Parmi les principes suivants, lequel n'est PAS un principe fondamental de la commande publique ?",
            choices: [
              "La transparence",
              "L'égalité de traitement",
              "La préférence exclusive pour les entreprises étrangères",
              "La libre concurrence",
            ],
            correctIndex: 2,
            explanation:
              "La préférence exclusive pour les entreprises étrangères contredit le principe d'égalité et de libre concurrence. Des marges de préférence nationales peuvent exister, mais pas une exclusion.",
          },
          {
            id: "cp-1-q3",
            question: "Quel organe est chargé de la régulation des marchés publics au Burundi ?",
            choices: [
              "La DNCMP uniquement",
              "L'ARMP (Autorité de Régulation des Marchés Publics)",
              "Le Ministère des Finances seul",
              "La Cour des comptes",
            ],
            correctIndex: 1,
            explanation:
              "L'ARMP est l'autorité indépendante de régulation. La DNCMP assure le contrôle a priori et l'appui technique.",
          },
        ],
      },
      {
        id: "cp-2",
        slug: "acteurs",
        title: "Les acteurs de la commande publique",
        durationMin: 8,
        content: [
          "Plusieurs acteurs interviennent dans le cycle de la commande publique au Burundi.",
          "L'autorité contractante (ministère, institution, collectivité) initie le besoin et lance la procédure via sa Personne Responsable des Marchés Publics (PRMP).",
          "La Direction Nationale du Contrôle des Marchés Publics (DNCMP) exerce un contrôle a priori sur les dossiers selon les seuils.",
          "L'Autorité de Régulation des Marchés Publics (ARMP) régule le système, traite les recours et publie des avis.",
          "Les soumissionnaires (entreprises) présentent des offres. Les commissions d'ouverture et d'évaluation analysent les offres de manière collégiale.",
          "La séparation des fonctions (initiation, contrôle, régulation) vise à limiter les risques de conflits d'intérêts et de corruption.",
        ],
        keyPoints: [
          "PRMP : Personne Responsable des Marchés Publics de l'autorité contractante",
          "DNCMP : contrôle a priori",
          "ARMP : régulation et recours",
          "Commissions collégiales d'ouverture et d'évaluation",
        ],
        quiz: [
          {
            id: "cp-2-q1",
            question: "Que signifie l'acronyme PRMP ?",
            choices: [
              "Président de la République des Marchés Publics",
              "Personne Responsable des Marchés Publics",
              "Procédure de Règlement des Marchés Publics",
              "Plan de Réalisation des Marchés Publics",
            ],
            correctIndex: 1,
            explanation:
              "La PRMP est la Personne Responsable des Marchés Publics au sein de chaque autorité contractante.",
          },
          {
            id: "cp-2-q2",
            question: "Quel est le rôle principal de la DNCMP ?",
            choices: [
              "Réguler le secteur et juger les recours",
              "Contrôle a priori des dossiers de marchés selon les seuils",
              "Exécuter les paiements des marchés",
              "Représenter les soumissionnaires",
            ],
            correctIndex: 1,
            explanation:
              "La DNCMP (Direction Nationale du Contrôle des Marchés Publics) assure le contrôle a priori. L'ARMP régule et traite les recours.",
          },
          {
            id: "cp-2-q3",
            question: "Pourquoi la séparation des fonctions (initiation / contrôle / régulation) est-elle importante ?",
            choices: [
              "Pour accélérer uniquement les procédures",
              "Pour limiter les conflits d'intérêts et renforcer l'intégrité",
              "Pour supprimer tout contrôle",
              "Pour centraliser tout pouvoir sur un seul acteur",
            ],
            correctIndex: 1,
            explanation:
              "La séparation des rôles réduit les risques de conflits d'intérêts et de malversation, et renforce la confiance dans le système.",
          },
        ],
      },
      {
        id: "cp-3",
        slug: "procedures",
        title: "Les procédures de passation",
        durationMin: 9,
        content: [
          "Les principales procédures de passation au Burundi sont : l'appel d'offres ouvert, l'appel d'offres restreint, la procédure négociée, et les demandes de cotation (selon seuils).",
          "L'appel d'offres ouvert est la procédure de droit commun : tout candidat peut soumissionner après publication d'un avis.",
          "L'appel d'offres restreint limite la participation à des candidats préqualifiés ou invités selon des critères objectifs.",
          "La procédure négociée est exceptionnelle et motivée (urgence, spécificité technique, etc.). Elle doit être justifiée et souvent soumise à avis de la DNCMP.",
          "Les seuils monétaires déterminent les obligations de publicité, de contrôle et le type de procédure applicable. Ces seuils sont fixés par voie réglementaire et doivent être vérifiés régulièrement.",
          "Toute procédure doit respecter les délais de publication, de dépôt et d'évaluation prévus par les textes.",
        ],
        keyPoints: [
          "Appel d'offres ouvert = procédure de droit commun",
          "Procédure négociée = exception motivée",
          "Seuils réglementaires à respecter",
          "Publicité et délais obligatoires",
        ],
        quiz: [
          {
            id: "cp-3-q1",
            question: "Quelle est la procédure de passation de droit commun ?",
            choices: [
              "La procédure négociée",
              "L'appel d'offres ouvert",
              "La gré à gré pure et simple",
              "L'appel d'offres restreint uniquement",
            ],
            correctIndex: 1,
            explanation:
              "L'appel d'offres ouvert est la procédure de droit commun. Les autres sont des exceptions encadrées.",
          },
          {
            id: "cp-3-q2",
            question: "La procédure négociée peut-elle être utilisée sans justification ?",
            choices: [
              "Oui, librement",
              "Non, elle doit être motivée et souvent soumise à contrôle",
              "Uniquement pour les marchés de moins de 1 000 FBu",
              "Oui, si le ministre le décide oralement",
            ],
            correctIndex: 1,
            explanation:
              "La procédure négociée est exceptionnelle. Elle nécessite une motivation solide et, selon les cas, un avis ou une autorisation de la DNCMP.",
          },
          {
            id: "cp-3-q3",
            question: "Pourquoi les seuils monétaires sont-ils importants ?",
            choices: [
              "Ils n'ont aucune importance",
              "Ils déterminent publicité, type de procédure et niveau de contrôle",
              "Ils servent uniquement à calculer les impôts",
              "Ils fixent le salaire des PRMP",
            ],
            correctIndex: 1,
            explanation:
              "Les seuils fixent les obligations de publicité, le choix de la procédure et le passage devant la DNCMP ou non.",
          },
        ],
      },
      {
        id: "cp-4",
        slug: "controles",
        title: "Contrôles et recours",
        durationMin: 6,
        content: [
          "Le système burundais prévoit des contrôles a priori (avant attribution) et a posteriori (après).",
          "La DNCMP examine les dossiers (DAO, PV d'évaluation, projets de marchés) selon les seuils avant signature.",
          "L'ARMP reçoit les recours des candidats lésés (recours gracieux puis contentieux selon les modalités prévues).",
          "La Cour des comptes et l'Inspection générale des finances interviennent également dans le contrôle de la dépense publique liée aux marchés.",
          "Tout agent public doit conserver les pièces justificatives et respecter les délais de transmission des dossiers.",
          "En cas de doute, il est recommandé de consulter la documentation de l'ARMP et les guides de la DNCMP plutôt que d'improviser.",
        ],
        keyPoints: [
          "Contrôle a priori (DNCMP) et a posteriori",
          "Recours auprès de l'ARMP",
          "Conservation des pièces",
          "Référence aux guides officiels",
        ],
        quiz: [
          {
            id: "cp-4-q1",
            question: "Qui traite principalement les recours des soumissionnaires ?",
            choices: [
              "La PRMP seule",
              "L'ARMP",
              "Le fournisseur concurrent",
              "Le journal local",
            ],
            correctIndex: 1,
            explanation:
              "L'ARMP est l'instance de régulation compétente pour les recours en matière de marchés publics.",
          },
          {
            id: "cp-4-q2",
            question: "Que signifie un contrôle « a priori » ?",
            choices: [
              "Un contrôle après l'exécution du marché uniquement",
              "Un contrôle avant l'attribution / signature du marché",
              "Un contrôle sans dossier",
              "Un contrôle réservé aux marchés privés",
            ],
            correctIndex: 1,
            explanation:
              "Le contrôle a priori intervient avant la conclusion du marché (examen des dossiers par la DNCMP notamment).",
          },
        ],
      },
    ],
    caseStudy: {
      id: "cp-cas-1",
      title: "Cas pratique : choix de procédure",
      scenario:
        "Votre ministère doit acquérir du matériel informatique pour un montant estimé de 45 millions de FBu. Le besoin est standard (ordinateurs et imprimantes courants). Aucune urgence extrême n'est alléguée. Vous êtes chargé d'appuyer la PRMP.",
      questions: [
        {
          id: "cp-cas-q1",
          prompt:
            "Quelle procédure de passation recommandez-vous en priorité et pourquoi ?",
          expectedKeywords: ["appel d'offres ouvert", "droit commun", "concurrence", "transparence"],
        },
        {
          id: "cp-cas-q2",
          prompt:
            "Quels documents et acteurs principaux devez-vous mobiliser avant le lancement ?",
          expectedKeywords: ["DAO", "PRMP", "DNCMP", "avis", "seuil", "commission"],
        },
      ],
    },
  },
  {
    slug: "comptabilite-publique",
    title: "Comptabilité publique",
    description:
      "Exécution budgétaire, rôles de l'ordonnateur et du comptable, contrôles et outils (SIGEFI).",
    color: "forest",
    lessons: [
      {
        id: "co-1",
        slug: "principes",
        title: "Principes de la comptabilité publique",
        durationMin: 7,
        content: [
          "La comptabilité publique au Burundi repose sur la séparation des fonctions d'ordonnateur et de comptable public.",
          "L'ordonnateur engage, liquide et ordonnance les dépenses. Le comptable public prend en charge et paie, sous sa responsabilité personnelle et pécuniaire.",
          "Cette séparation est un principe fondamental de contrôle interne et de protection des deniers publics.",
          "Les opérations sont retracées dans les comptes selon les règles de la comptabilité de l'État et les instructions du Ministère des Finances.",
          "Le système d'information SIGEFI (ou équivalent) appuie la gestion et le suivi de l'exécution budgétaire.",
          "Ce module est une formation pratique. Il ne remplace pas les textes réglementaires ni les instructions de service.",
        ],
        keyPoints: [
          "Séparation ordonnateur / comptable",
          "Responsabilité personnelle du comptable",
          "SIGEFI : outil de gestion",
          "Textes du Ministère des Finances",
        ],
        quiz: [
          {
            id: "co-1-q1",
            question: "Qui engage et ordonnance la dépense ?",
            choices: [
              "Le comptable public seul",
              "L'ordonnateur",
              "Le fournisseur",
              "L'ARMP",
            ],
            correctIndex: 1,
            explanation:
              "L'ordonnateur engage, liquide et ordonnance. Le comptable paie après contrôle de la régularité.",
          },
          {
            id: "co-1-q2",
            question: "Pourquoi séparer ordonnateur et comptable ?",
            choices: [
              "Pour ralentir les paiements",
              "Pour renforcer le contrôle interne et protéger les deniers publics",
              "Parce que c'est une tradition sans utilité",
              "Pour permettre au comptable d'engager aussi",
            ],
            correctIndex: 1,
            explanation:
              "La séparation des fonctions limite les risques de fraude et assure un double regard sur la dépense.",
          },
        ],
      },
    ],
    caseStudy: {
      id: "co-cas-1",
      title: "Cas pratique : circuit de la dépense",
      scenario:
        "Une facture de fourniture de bureau arrive. L'engagement a été fait correctement. Vous devez vérifier le circuit avant paiement.",
      questions: [
        {
          id: "co-cas-q1",
          prompt: "Quelles étapes doivent être respectées entre l'engagement et le paiement ?",
          expectedKeywords: ["liquidation", "ordonnancement", "comptable", "contrôle", "pièces"],
        },
      ],
    },
  },
]

export const GLOSSARY: { term: string; definition: string }[] = [
  {
    term: "ARMP",
    definition:
      "Autorité de Régulation des Marchés Publics — organe indépendant de régulation, de recours et de promotion de la bonne gouvernance des marchés publics au Burundi.",
  },
  {
    term: "DNCMP",
    definition:
      "Direction Nationale du Contrôle des Marchés Publics — assure le contrôle a priori des procédures selon les seuils.",
  },
  {
    term: "PRMP",
    definition:
      "Personne Responsable des Marchés Publics — agent désigné au sein de l'autorité contractante pour conduire les procédures.",
  },
  {
    term: "SIGEFI",
    definition:
      "Système d'Information de Gestion des Finances — outil de suivi de l'exécution budgétaire et de la comptabilité de l'État.",
  },
  {
    term: "Ordonnateur",
    definition:
      "Autorité qui engage, liquide et ordonnance les dépenses publiques. Distinct du comptable public.",
  },
  {
    term: "Comptable public",
    definition:
      "Agent responsable du paiement et de la conservation des deniers publics, sous responsabilité personnelle et pécuniaire.",
  },
  {
    term: "DAO",
    definition:
      "Dossier d'Appel d'Offres — ensemble des documents (règlement, CCTP, CCAP, etc.) fournis aux candidats.",
  },
  {
    term: "Appel d'offres ouvert",
    definition:
      "Procédure de passation de droit commun dans laquelle tout candidat peut soumissionner après publicité.",
  },
]

export function getTrack(slug: string): Track | undefined {
  return TRACKS.find((t) => t.slug === slug)
}

export function getLesson(trackSlug: string, lessonSlug: string): Lesson | undefined {
  const track = getTrack(trackSlug)
  return track?.lessons.find((l) => l.slug === lessonSlug)
}

export function getLessonById(id: string): { track: Track; lesson: Lesson } | undefined {
  for (const track of TRACKS) {
    const lesson = track.lessons.find((l) => l.id === id)
    if (lesson) return { track, lesson }
  }
  return undefined
}
