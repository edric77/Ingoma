import type { Lesson } from "./catalog-types"

export const CO_LESSONS: Lesson[] = [
  {
    id: 'co-1',
    slug: 'principes',
    title: 'Principes de la comptabilité publique',
    durationMin: 8,
    content: [
      "La comptabilité publique repose sur la séparation des fonctions d'ordonnateur et de comptable public.",
      "L'ordonnateur engage, liquide et ordonnance. Le comptable paie sous responsabilité personnelle et pécuniaire.",
      'Cette séparation protège les deniers publics et organise un double regard.',
      "SIGEFI (ou équivalent) appuie le suivi de l'exécution budgétaire.",
    ],
    keyPoints: [
      'Séparation ordonnateur / comptable',
      'Responsabilité personnelle du comptable',
      'SIGEFI : outil de gestion',
    ],
    activities: [
      {
        type: 'mcq',
        id: 'co-1-q1',
        question: 'Qui engage et ordonnance la dépense ?',
        choices: ['Le comptable public seul', "L'ordonnateur", 'Le fournisseur', "L'ARMP"],
        correctIndex: 1,
        explanation: "L'ordonnateur engage, liquide et ordonnance ; le comptable paie après contrôle.",
        timedSeconds: 35,
      },
      {
        type: 'truefalse',
        id: 'co-1-tf1',
        statement: "Le comptable public peut engager une dépense à la place de l'ordonnateur.",
        correct: false,
        explanation: "Faux. La séparation des fonctions l'interdit.",
      },
    ],
  },
  {
    id: 'co-2',
    slug: 'circuit-depense',
    title: 'Le circuit de la dépense',
    durationMin: 9,
    content: [
      'Étapes classiques : engagement → liquidation → ordonnancement → prise en charge et paiement par le comptable.',
      "L'engagement réserve les crédits. La liquidation constate le service fait. L'ordonnancement donne l'ordre de payer.",
      'Le comptable contrôle la régularité avant de payer.',
      "Toute rupture de chaîne expose l'agent à des risques de régularisation ou de responsabilité.",
    ],
    keyPoints: [
      'Engagement → liquidation → ordonnancement → paiement',
      'Service fait avant liquidation',
      'Contrôle du comptable',
    ],
    activities: [
      {
        type: 'order',
        id: 'co-2-order',
        prompt: 'Ordonnez le circuit de la dépense',
        items: ['Engagement', 'Liquidation', 'Ordonnancement', 'Paiement par le comptable'],
        correctOrder: [0, 1, 2, 3],
        explanation: 'La séquence engagement → liquidation → ordonnancement → paiement est le socle du circuit.',
      },
    ],
  },
  {
    id: 'co-3',
    slug: 'ordonnateur',
    title: "Rôle de l'ordonnateur",
    durationMin: 7,
    content: [
      "L'ordonnateur principal ou secondaire dispose des crédits et engage les dépenses dans la limite des autorisations.",
      "Il s'assure de la réalité du service fait avant de liquider.",
      "Il émet les ordres de paiement (ordonnancement) à destination du comptable.",
      "Il reste responsable de ses choix de gestion devant les autorités de contrôle.",
    ],
    keyPoints: [
      'Disposition des crédits',
      'Constat du service fait',
      "Émission des ordres de payer",
    ],
    activities: [
      {
        type: 'fillblank',
        id: 'co-3-fb1',
        text: "Avant de liquider, l'ordonnateur doit s'assurer du ___ fait.",
        answer: 'service',
        alternatives: ['Service'],
        explanation: 'La liquidation constate le service fait.',
      },
      {
        type: 'flashcard',
        id: 'co-3-fc1',
        front: 'Ordonnateur',
        back: "Autorité qui engage, liquide et ordonnance les dépenses publiques.",
      },
    ],
  },
  {
    id: 'co-4',
    slug: 'comptable-public',
    title: 'Rôle du comptable public',
    durationMin: 8,
    content: [
      "Le comptable public est responsable personnellement et pécuniairement des opérations qu'il exécute.",
      "Il vérifie la régularité de la dépense (qualité de l'ordonnateur, disponibilité des crédits, service fait, etc.) avant paiement.",
      "Il peut suspendre un paiement en cas d'irrégularité et demander régularisation.",
      'Sa responsabilité peut être mise en jeu devant le juge des comptes.',
    ],
    keyPoints: [
      'Responsabilité personnelle et pécuniaire',
      'Contrôle de régularité avant paiement',
      'Pouvoir de suspension',
    ],
    activities: [
      {
        type: 'decision',
        id: 'co-4-dec',
        scenario:
          "Vous êtes comptable. Un ordre de paiement arrive sans pièce justifiant le service fait, alors que le montant est important. L'ordonnateur insiste pour un paiement urgent.",
        role: 'Comptable public',
        choices: [
          {
            id: 'a',
            label: 'Payer immédiatement pour ne pas bloquer le service',
            consequence: 'Exposition de votre responsabilité personnelle.',
            correct: false,
          },
          {
            id: 'b',
            label: 'Suspendre le paiement et demander les pièces manquantes',
            consequence: 'Exercice correct du contrôle de régularité.',
            correct: true,
          },
          {
            id: 'c',
            label: 'Payer et compléter le dossier plus tard sans trace',
            consequence: 'Pratique irrégulière et risquée.',
            correct: false,
          },
        ],
        debrief:
          "Le comptable doit refuser ou suspendre un paiement irrégulier. La pression hiérarchique ne transfère pas sa responsabilité.",
      },
    ],
  },
  {
    id: 'co-5',
    slug: 'credits-budgetaires',
    title: 'Crédits budgétaires et disponibilité',
    durationMin: 7,
    content: [
      "Aucune dépense ne peut être engagée sans crédits disponibles sur la bonne ligne budgétaire.",
      "L'engagement consomme (réserve) les crédits. Un suivi rigoureux évite les dépassements.",
      'Les virements et reports de crédits obéissent à des règles strictes.',
      'SIGEFI permet de visualiser les disponibilités en temps réel.',
    ],
    keyPoints: [
      "Pas d'engagement sans crédits",
      'Suivi des consommations',
      'Règles de virement / report',
    ],
    activities: [
      {
        type: 'truefalse',
        id: 'co-5-tf1',
        statement: "On peut engager une dépense même si les crédits de la ligne sont épuisés, en attendant un virement.",
        correct: false,
        explanation: "Faux. L'engagement suppose des crédits disponibles.",
      },
      {
        type: 'mcq',
        id: 'co-5-q1',
        question: 'Quel outil appuie le suivi des crédits au Burundi ?',
        choices: ['ARMP', 'SIGEFI', 'DAO', 'CCTP'],
        correctIndex: 1,
        explanation: "SIGEFI est le système d'information de gestion des finances.",
        timedSeconds: 30,
      },
    ],
  },
  {
    id: 'co-6',
    slug: 'pieces-justificatives',
    title: 'Pièces justificatives',
    durationMin: 8,
    content: [
      "Chaque étape du circuit s'appuie sur des pièces : bon de commande, facture, PV de réception, ordre de paiement, etc.",
      'Le comptable exige un dossier complet et cohérent.',
      'La conservation des pièces est obligatoire pour les contrôles a posteriori.',
      'Des modèles et check-lists réduisent les rejets.',
    ],
    keyPoints: [
      'Dossier complet à chaque étape',
      'Conservation pour les contrôles',
      'Cohérence des pièces',
    ],
    activities: [
      {
        type: 'dragdrop',
        id: 'co-6-dd',
        prompt: "Associez chaque pièce à l'étape principale",
        items: ['Bon de commande', 'PV de réception', 'Facture visée', 'Ordre de paiement'],
        categories: [
          { id: 'eng', label: 'Engagement', correctItems: ['Bon de commande'] },
          { id: 'liq', label: 'Liquidation', correctItems: ['PV de réception', 'Facture visée'] },
          { id: 'ord', label: 'Ordonnancement', correctItems: ['Ordre de paiement'] },
        ],
        explanation: "Le bon de commande illustre l'engagement ; réception et facture servent la liquidation ; l'ordre de paiement formalise l'ordonnancement.",
      },
    ],
  },
  {
    id: 'co-7',
    slug: 'recettes-publiques',
    title: 'Les recettes publiques',
    durationMin: 7,
    content: [
      'Les recettes (impôts, taxes, produits divers) sont constatées et prises en charge selon des règles spécifiques.',
      'Le comptable encaisse et reverse selon les circuits prévus.',
      'La séparation des fonctions s\'applique aussi côté recettes (ordonnateur des recettes / comptable).',
      'Le suivi des restes à recouvrer est un enjeu de performance.',
    ],
    keyPoints: [
      'Constatation et prise en charge',
      'Encaissement par le comptable',
      'Suivi des restes à recouvrer',
    ],
    activities: [
      {
        type: 'match',
        id: 'co-7-match',
        prompt: 'Associez les notions',
        pairs: [
          { left: 'Ordonnateur des recettes', right: 'Constate les droits' },
          { left: 'Comptable public', right: 'Encaisse et reverse' },
          { left: 'Reste à recouvrer', right: 'Créance non encore encaissée' },
        ],
        explanation: 'La dualité ordonnateur / comptable structure aussi le circuit des recettes.',
      },
    ],
  },
  {
    id: 'co-8',
    slug: 'controles-financiers',
    title: 'Contrôles financiers',
    durationMin: 8,
    content: [
      "Contrôle interne (au sein de l'administration) et contrôle externe (Cour des comptes, Inspection, etc.).",
      'Le contrôle budgétaire vérifie la disponibilité des crédits et la conformité de l\'imputation.',
      'Le contrôle de la dépense par le comptable est un verrou essentiel.',
      'Les recommandations de contrôle doivent être suivies et documentées.',
    ],
    keyPoints: [
      'Contrôle interne et externe',
      'Rôle du comptable',
      'Suivi des recommandations',
    ],
    activities: [
      {
        type: 'mcq',
        id: 'co-8-q1',
        question: 'Qui exerce notamment le contrôle juridictionnel des comptes publics ?',
        choices: ['La PRMP', 'La Cour des comptes', 'Le fournisseur', "L'ARMP seule"],
        correctIndex: 1,
        explanation: 'La Cour des comptes exerce un contrôle juridictionnel sur les comptes.',
        timedSeconds: 35,
      },
    ],
  },
  {
    id: 'co-9',
    slug: 'sigefi-outils',
    title: 'SIGEFI et outils de gestion',
    durationMin: 7,
    content: [
      'SIGEFI centralise engagement, liquidation, ordonnancement et suivi budgétaire.',
      'Une saisie rigoureuse et à jour est indispensable pour des données fiables.',
      'Les extractions et tableaux de bord aident le pilotage.',
      "En cas d'écart entre SIGEFI et la réalité, priorisez la régularisation documentée.",
    ],
    keyPoints: [
      'Saisie rigoureuse dans SIGEFI',
      'Pilotage par tableaux de bord',
      'Régularisation des écarts',
    ],
    activities: [
      {
        type: 'truefalse',
        id: 'co-9-tf1',
        statement: 'On peut ignorer SIGEFI si on a un tableau Excel personnel à jour.',
        correct: false,
        explanation: 'Faux. SIGEFI est le système de référence pour la traçabilité officielle.',
      },
      {
        type: 'flashcard',
        id: 'co-9-fc1',
        front: 'SIGEFI',
        back: "Système d'Information de Gestion des Finances — outil de suivi de l'exécution budgétaire.",
      },
    ],
  },
  {
    id: 'co-10',
    slug: 'responsabilites',
    title: 'Responsabilités et bonnes pratiques',
    durationMin: 8,
    content: [
      'Ordonnateur et comptable ont des responsabilités distinctes mais complémentaires.',
      'Documenter chaque décision, respecter les délais et alerter en cas d\'anomalie sont des réflexes professionnels.',
      'La formation continue et le recours aux guides officiels réduisent les erreurs.',
      'En cas de doute : ne pas improviser — demander un avis écrit à la hiérarchie ou au service compétent.',
    ],
    keyPoints: [
      'Responsabilités distinctes',
      'Traçabilité et alerte',
      'Formation et guides officiels',
    ],
    activities: [
      {
        type: 'decision',
        id: 'co-10-dec',
        scenario:
          "Une dépense urgente est demandée oralement, sans engagement préalable ni pièces. On vous assure que « le dossier suivra ».",
        role: 'Agent chargé de la chaîne de la dépense',
        choices: [
          {
            id: 'a',
            label: 'Accepter et régulariser plus tard sans trace',
            consequence: 'Pratique irrégulière, risques disciplinaires et de contrôle.',
            correct: false,
          },
          {
            id: 'b',
            label: 'Exiger le respect du circuit (engagement, pièces) avant toute suite',
            consequence: 'Conformité aux règles et protection de tous les acteurs.',
            correct: true,
          },
          {
            id: 'c',
            label: 'Payer sur vos deniers personnels en attendant',
            consequence: 'Confusion des deniers et risque élevé.',
            correct: false,
          },
        ],
        debrief:
          "L'urgence ne supprime pas le cadre légal. Anticipez les procédures d'urgence prévues par les textes plutôt que de les contourner.",
      },
    ],
  },
]
