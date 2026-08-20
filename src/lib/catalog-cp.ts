import type { Lesson } from "./catalog-types"

export const CP_LESSONS: Lesson[] = [
  {
    id: 'cp-1',
    slug: 'cadre-juridique',
    title: 'Cadre juridique de la commande publique',
    durationMin: 8,
    content: [
      "La commande publique au Burundi est régie principalement par la loi n°1/14 du 27 avril 2015 portant Code des marchés publics et des délégations de service public, ainsi que ses textes d'application.",
      "Elle vise la transparence, l'égalité de traitement, la libre concurrence et l'efficacité de la dépense publique.",
      "Principes fondamentaux : libre accès, égalité de traitement, transparence, et prise en compte du développement durable lorsque pertinent.",
      "Avertissement : contenu pédagogique uniquement. Non constitutif d'avis juridique officiel. Référez-vous aux textes en vigueur et à l'ARMP.",
    ],
    keyPoints: [
      'Loi n°1/14 du 27 avril 2015 (Code des marchés publics)',
      'Principes : transparence, égalité, concurrence',
      'ARMP : Autorité de Régulation des Marchés Publics',
    ],
    activities: [
      {
        type: 'mcq',
        id: 'cp-1-q1',
        question: 'Quelle est la principale loi régissant la commande publique au Burundi ?',
        choices: [
          'La loi n°1/14 du 27 avril 2015',
          'Le Code civil burundais',
          'La loi sur les sociétés commerciales',
          "Le règlement de l'OHADA",
        ],
        correctIndex: 0,
        explanation: 'La loi n°1/14 du 27 avril 2015 constitue le Code des marchés publics.',
        timedSeconds: 45,
      },
      {
        type: 'truefalse',
        id: 'cp-1-tf1',
        statement: "La préférence exclusive pour les entreprises étrangères est un principe fondamental de la commande publique.",
        correct: false,
        explanation: "Faux. L'égalité de traitement et la concurrence s'opposent à une exclusion pure et simple.",
      },
    ],
  },
  {
    id: 'cp-2',
    slug: 'acteurs',
    title: 'Les acteurs de la commande publique',
    durationMin: 8,
    content: [
      "L'autorité contractante initie le besoin via sa Personne Responsable des Marchés Publics (PRMP).",
      "La DNCMP exerce un contrôle a priori selon les seuils. L'ARMP régule le système et traite les recours.",
      "Les commissions d'ouverture et d'évaluation travaillent de manière collégiale.",
      "La séparation initiation / contrôle / régulation limite les conflits d'intérêts.",
    ],
    keyPoints: [
      'PRMP : Personne Responsable des Marchés Publics',
      'DNCMP : contrôle a priori',
      'ARMP : régulation et recours',
    ],
    activities: [
      {
        type: 'match',
        id: 'cp-2-match',
        prompt: 'Associez chaque acteur à son rôle principal',
        pairs: [
          { left: 'PRMP', right: "Conduit les procédures de l'autorité contractante" },
          { left: 'DNCMP', right: 'Contrôle a priori selon les seuils' },
          { left: 'ARMP', right: 'Régulation et traitement des recours' },
          { left: "Commission d'évaluation", right: 'Analyse collégiale des offres' },
        ],
        explanation: "Chaque acteur a un rôle distinct pour assurer l'intégrité du cycle.",
      },
      {
        type: 'flashcard',
        id: 'cp-2-fc1',
        front: 'PRMP',
        back: "Personne Responsable des Marchés Publics — agent désigné au sein de l'autorité contractante.",
      },
      {
        type: 'flashcard',
        id: 'cp-2-fc2',
        front: 'DNCMP',
        back: 'Direction Nationale du Contrôle des Marchés Publics — contrôle a priori.',
      },
    ],
  },
  {
    id: 'cp-3',
    slug: 'procedures',
    title: 'Les procédures de passation',
    durationMin: 9,
    content: [
      "Procédures principales : appel d'offres ouvert (droit commun), appel d'offres restreint, procédure négociée, demandes de cotation selon seuils.",
      "L'appel d'offres ouvert permet à tout candidat de soumissionner après publicité.",
      "La procédure négociée est exceptionnelle et doit être motivée (urgence, spécificité technique…).",
      'Les seuils monétaires déterminent publicité, type de procédure et niveau de contrôle.',
    ],
    keyPoints: [
      "Appel d'offres ouvert = droit commun",
      'Procédure négociée = exception motivée',
      'Seuils réglementaires à respecter',
    ],
    activities: [
      {
        type: 'order',
        id: 'cp-3-order',
        prompt: "Ordonnez les étapes typiques d'un appel d'offres ouvert",
        items: [
          "Publication de l'avis",
          'Réception des offres',
          'Ouverture des plis',
          'Évaluation des offres',
          'Attribution et notification',
        ],
        correctOrder: [0, 1, 2, 3, 4],
        explanation: 'La séquence respecte publicité → dépôt → ouverture → évaluation → attribution.',
      },
      {
        type: 'mcq',
        id: 'cp-3-q1',
        question: 'Quelle procédure est de droit commun ?',
        choices: [
          'Procédure négociée',
          "Appel d'offres ouvert",
          'Gré à gré pure',
          "Appel d'offres restreint uniquement",
        ],
        correctIndex: 1,
        explanation: "L'appel d'offres ouvert est la procédure de droit commun.",
        timedSeconds: 30,
      },
    ],
  },
  {
    id: 'cp-4',
    slug: 'controles',
    title: 'Contrôles et recours',
    durationMin: 7,
    content: [
      'Contrôles a priori (avant attribution, DNCMP) et a posteriori (après).',
      "L'ARMP reçoit les recours des candidats lésés.",
      "La Cour des comptes et l'Inspection générale des finances interviennent aussi sur la dépense.",
      'Conservez les pièces et respectez les délais de transmission.',
    ],
    keyPoints: [
      'Contrôle a priori (DNCMP)',
      "Recours auprès de l'ARMP",
      'Conservation des pièces',
    ],
    activities: [
      {
        type: 'truefalse',
        id: 'cp-4-tf1',
        statement: 'Un contrôle a priori intervient après la signature du marché.',
        correct: false,
        explanation: 'Faux. A priori = avant attribution / signature.',
      },
      {
        type: 'fillblank',
        id: 'cp-4-fb1',
        text: "Les recours des soumissionnaires sont principalement traités par l'___.",
        answer: 'ARMP',
        alternatives: ['Armp', 'autorité de régulation'],
        explanation: "L'ARMP est l'instance de régulation compétente pour les recours.",
      },
    ],
  },
  {
    id: 'cp-5',
    slug: 'dao-et-documents',
    title: 'DAO et documents de la procédure',
    durationMin: 8,
    content: [
      "Le Dossier d'Appel d'Offres (DAO) regroupe règlement de la consultation, CCTP, CCAP, bordereaux, modèles de soumission, etc.",
      'Un DAO clair réduit les contentieux et les offres non conformes.',
      "Les critères d'évaluation (techniques et financiers) doivent être objectifs et publiés.",
      'Toute modification substantielle du DAO peut imposer une prolongation de délai ou une republication.',
    ],
    keyPoints: [
      'DAO = ensemble des documents fournis aux candidats',
      'Critères objectifs et publiés',
      'Modifications = vigilance sur les délais',
    ],
    activities: [
      {
        type: 'dragdrop',
        id: 'cp-5-dd',
        prompt: 'Classez les éléments dans la bonne catégorie',
        items: ['CCTP', 'CCAP', 'Bordereau des prix', "Avis d'appel d'offres", "PV d'ouverture", "Rapport d'évaluation"],
        categories: [
          { id: 'dao', label: 'Dans le DAO', correctItems: ['CCTP', 'CCAP', 'Bordereau des prix'] },
          { id: 'procedure', label: 'Documents de procédure', correctItems: ["Avis d'appel d'offres", "PV d'ouverture", "Rapport d'évaluation"] },
        ],
        explanation: 'CCTP, CCAP et bordereaux font partie du DAO ; avis, PV et rapport appartiennent au déroulement de la procédure.',
      },
    ],
  },
  {
    id: 'cp-6',
    slug: 'seuils-et-publicite',
    title: 'Seuils et obligations de publicité',
    durationMin: 7,
    content: [
      'Les seuils monétaires fixés par voie réglementaire déterminent le type de procédure et les obligations de publicité.',
      "En dessous de certains seuils, des procédures simplifiées (demande de cotation) peuvent s'appliquer.",
      "Au-delà, l'appel d'offres ouvert et le passage devant la DNCMP deviennent obligatoires.",
      'Vérifiez toujours les seuils en vigueur : ils peuvent être révisés.',
    ],
    keyPoints: [
      'Seuils → type de procédure + publicité + contrôle',
      'Seuils réglementaires à tenir à jour',
    ],
    activities: [
      {
        type: 'mcq',
        id: 'cp-6-q1',
        question: 'Les seuils monétaires servent principalement à :',
        choices: [
          'Fixer le salaire des PRMP',
          'Déterminer publicité, procédure et niveau de contrôle',
          'Calculer uniquement la TVA',
          'Remplacer le DAO',
        ],
        correctIndex: 1,
        explanation: 'Les seuils orientent publicité, choix de procédure et passage éventuel devant la DNCMP.',
        timedSeconds: 40,
      },
      {
        type: 'truefalse',
        id: 'cp-6-tf1',
        statement: 'Les seuils de marchés publics ne changent jamais.',
        correct: false,
        explanation: 'Faux. Ils sont fixés par voie réglementaire et peuvent être révisés.',
      },
    ],
  },
  {
    id: 'cp-7',
    slug: 'evaluation-offres',
    title: 'Évaluation des offres',
    durationMin: 9,
    content: [
      "L'évaluation est collégiale. Les critères doivent être ceux du DAO, appliqués de façon uniforme.",
      'Séparation fréquente : évaluation technique puis financière (selon le mode retenu).',
      'Les offres non conformes aux exigences essentielles peuvent être écartées avec motivation.',
      "Le rapport d'évaluation documente le raisonnement et justifie le choix.",
    ],
    keyPoints: [
      'Critères = ceux du DAO uniquement',
      'Collégialité et traçabilité',
      'Motivation des écarts',
    ],
    activities: [
      {
        type: 'decision',
        id: 'cp-7-dec',
        scenario:
          "Lors de l'évaluation, une offre est techniquement excellente mais le bordereau des prix présente une anomalie mineure de forme (tampon manquant sur une page annexe). Le règlement du DAO exige un dossier complet.",
        role: "Membre de la commission d'évaluation",
        choices: [
          {
            id: 'a',
            label: 'Écarter immédiatement sans demander de précision',
            consequence: "Risque de recours si l'anomalie n'est pas essentielle.",
            correct: false,
          },
          {
            id: 'b',
            label: "Vérifier si l'exigence est essentielle ; demander une précision si le DAO le permet",
            consequence: 'Approche proportionnée et conforme aux bonnes pratiques.',
            correct: true,
          },
          {
            id: 'c',
            label: "Ignorer le DAO et retenir l'offre car le prix est le plus bas",
            consequence: "Violation des règles d'égalité et de transparence.",
            correct: false,
          },
        ],
        debrief:
          'La commission doit appliquer le DAO de façon proportionnée. Les irrégularités non essentielles peuvent parfois être régularisées selon les textes et le règlement de consultation.',
      },
    ],
  },
  {
    id: 'cp-8',
    slug: 'attribution-notification',
    title: 'Attribution et notification',
    durationMin: 7,
    content: [
      "L'attribution intervient après évaluation et, le cas échéant, avis de la DNCMP.",
      'La notification aux attributaires et aux candidats évincés est une obligation de transparence.',
      'Les délais de recours courent souvent à compter de la notification.',
      "Le marché n'est parfait qu'après formalités de signature et, si requis, approbation.",
    ],
    keyPoints: [
      'Notification aux candidats',
      'Délais de recours',
      'Formalités de signature',
    ],
    activities: [
      {
        type: 'order',
        id: 'cp-8-order',
        prompt: 'Ordonnez la séquence après évaluation',
        items: [
          'Avis DNCMP si requis',
          "Décision d'attribution",
          'Notification aux candidats',
          'Signature du marché',
        ],
        correctOrder: [0, 1, 2, 3],
        explanation: 'Contrôle éventuel → attribution → notification → signature.',
      },
    ],
  },
  {
    id: 'cp-9',
    slug: 'execution-marche',
    title: "Exécution du marché et avenants",
    durationMin: 8,
    content: [
      "L'exécution doit respecter les délais, quantités et spécifications du contrat.",
      'Les avenants modifiant substantiellement le marché sont encadrés ; ils ne doivent pas contourner les règles de mise en concurrence.',
      'Le suivi technique et financier (PV de réception, factures) est essentiel pour le paiement.',
      "Tout litige d'exécution se gère selon les clauses du marché et les textes applicables.",
    ],
    keyPoints: [
      'Respect du contrat',
      'Avenants encadrés',
      'Traçabilité pour le paiement',
    ],
    activities: [
      {
        type: 'truefalse',
        id: 'cp-9-tf1',
        statement: 'Un avenant peut librement transformer un marché de fournitures en un marché de travaux sans nouvelle procédure.',
        correct: false,
        explanation: 'Faux. Les modifications substantielles sont limitées pour ne pas fausser la concurrence initiale.',
      },
      {
        type: 'fillblank',
        id: 'cp-9-fb1',
        text: 'Les modifications importantes du marché se formalisent en général par un ___.',
        answer: 'avenant',
        alternatives: ['Avenant'],
        explanation: "L'avenant formalise les modifications dans le respect du cadre légal.",
      },
    ],
  },
  {
    id: 'cp-10',
    slug: 'integrite-ethique',
    title: "Intégrité et prévention des conflits d'intérêts",
    durationMin: 8,
    content: [
      "L'intégrité est au cœur de la commande publique : corruption, favoritisme et conflits d'intérêts sont sanctionnés.",
      'Les membres des commissions doivent déclarer tout intérêt et se déporter si nécessaire.',
      "L'ARMP et les corps de contrôle jouent un rôle de dissuasion et de sanction.",
      'Former les agents et documenter chaque décision réduit les risques.',
    ],
    keyPoints: [
      'Déclaration des intérêts',
      'Déport en cas de conflit',
      'Traçabilité et formation',
    ],
    activities: [
      {
        type: 'decision',
        id: 'cp-10-dec',
        scenario:
          "Vous êtes membre de la commission d'évaluation. L'un des soumissionnaires est une entreprise dans laquelle votre frère est actionnaire minoritaire. Le DAO ne mentionne pas explicitement ce cas.",
        role: 'Membre de commission',
        choices: [
          {
            id: 'a',
            label: 'Participer normalement sans rien dire',
            consequence: "Conflit d'intérêts non déclaré — risque disciplinaire et pénal.",
            correct: false,
          },
          {
            id: 'b',
            label: "Déclarer la situation et se retirer de l'évaluation de ce dossier",
            consequence: "Comportement conforme à l'intégrité et à la transparence.",
            correct: true,
          },
          {
            id: 'c',
            label: 'Influencer discrètement pour écarter ce soumissionnaire',
            consequence: "Manipulation et atteinte à l'égalité de traitement.",
            correct: false,
          },
        ],
        debrief:
          "La déclaration et le déport protègent l'agent et la procédure. En cas de doute, consultez la PRMP ou l'ARMP.",
      },
      {
        type: 'flashcard',
        id: 'cp-10-fc1',
        front: "Conflit d'intérêts",
        back: "Situation où l'intérêt personnel d'un agent peut influencer l'exercice impartial de sa fonction publique.",
      },
    ],
  },
]
