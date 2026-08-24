/**
 * Programme Ingoma — 90 jours (≈ 3 mois)
 * 1 micro-leçon + 1 activité par jour. Contenu fidèle au cadre burundais.
 * Pas un avis juridique officiel.
 */
import type { ActivityItem } from './catalog-types'
import { DAYS_47_90 } from './program-days-47-90'

export type ProgramDay = {
  day: number
  week: number
  title: string
  trackSlug: 'commande-publique' | 'comptabilite-publique' | 'revision'
  relatedLessonSlug?: string
  content: string[]
  keyPoint: string
  activity: ActivityItem
}

type DaySeed = {
  title: string
  track: ProgramDay['trackSlug']
  lesson?: string
  content: string[]
  keyPoint: string
  activity: ActivityItem
}

function mcq(
  id: string,
  question: string,
  choices: string[],
  correctIndex: number,
  explanation: string,
  timedSeconds = 40
): ActivityItem {
  return { type: 'mcq', id, question, choices, correctIndex, explanation, timedSeconds }
}

function tf(id: string, statement: string, correct: boolean, explanation: string): ActivityItem {
  return { type: 'truefalse', id, statement, correct, explanation }
}

function fill(
  id: string,
  text: string,
  answer: string,
  explanation: string,
  alternatives?: string[]
): ActivityItem {
  return { type: 'fillblank', id, text, answer, alternatives, explanation }
}

/** Jours 1–46 */
const SEEDS: DaySeed[] = [
  {
    title: 'Pourquoi une loi sur les marchés publics ?',
    track: 'commande-publique',
    lesson: 'cadre-juridique',
    content: [
      "La commande publique mobilise des deniers de l'État et des collectivités. Sans règles claires, le risque de favoritisme et de gaspillage augmente.",
      "Au Burundi, le Code des marchés publics (loi n°1/14 du 27 avril 2015) pose les principes de transparence, d'égalité et de concurrence.",
      "Ces principes protègent l'intérêt public et l'égalité entre opérateurs économiques.",
    ],
    keyPoint: "La loi protège l'intérêt public et l'égalité entre opérateurs.",
    activity: mcq('p1', 'La commande publique vise surtout à :', ["Dépenser sans contrôle", "Assurer transparence et concurrence", "Favoriser un seul fournisseur", "Remplacer le budget"], 1, "Transparence, égalité et concurrence sont au cœur du Code."),
  },
  {
    title: 'Principes : libre accès et égalité',
    track: 'commande-publique',
    lesson: 'cadre-juridique',
    content: [
      "Le libre accès signifie que tout opérateur qualifié peut, en principe, participer selon la procédure publiée.",
      "L'égalité de traitement interdit de privilégier un candidat hors critères objectifs du dossier.",
      "Toute discrimination non prévue par les textes fragilise la procédure.",
    ],
    keyPoint: 'Critères objectifs et publiés = base de l\'égalité.',
    activity: tf('p2', "On peut ajouter un critère secret après ouverture des offres.", false, "Faux. Les critères doivent être connus à l'avance."),
  },
  {
    title: 'Transparence et traçabilité',
    track: 'commande-publique',
    lesson: 'cadre-juridique',
    content: [
      "La transparence passe par la publicité des avis, la clarté du DAO et la motivation des décisions.",
      "Conserver les pièces (PV, rapports, notifications) permet de justifier chaque étape devant un contrôleur.",
      "Sans traçabilité, même une décision correcte devient difficile à défendre.",
    ],
    keyPoint: 'Documenter chaque étape réduit les contentieux.',
    activity: fill('p3', "La ___ des avis permet aux candidats de connaître les opportunités.", 'publicité', "La publicité est un pilier de la transparence.", ['Publicité']),
  },
  {
    title: "Rôle de l'ARMP",
    track: 'commande-publique',
    lesson: 'acteurs',
    content: [
      "L'Autorité de Régulation des Marchés Publics (ARMP) veille au bon fonctionnement du système et traite les recours des candidats.",
      "Elle ne remplace pas la PRMP ni la DNCMP : régulation ≠ passation ≠ contrôle a priori.",
      "Saisir la bonne instance évite les retards et les irrecevabilités.",
    ],
    keyPoint: 'ARMP = régulation et recours.',
    activity: mcq('p4', "L'ARMP a principalement pour mission :", ["Payer les factures", "Réguler et traiter les recours", "Rédiger tous les DAO", "Engager les crédits"], 1, "Régulation et recours relèvent de l'ARMP."),
  },
  {
    title: 'Rôle de la DNCMP',
    track: 'commande-publique',
    lesson: 'acteurs',
    content: [
      "La Direction Nationale du Contrôle des Marchés Publics exerce un contrôle a priori selon les seuils réglementaires.",
      "Avant certaines attributions, le dossier doit obtenir un avis conforme dans les cas prévus par les textes.",
      "Anticipez ce passage dans le calendrier de passation.",
    ],
    keyPoint: 'DNCMP = contrôle a priori (selon seuils).',
    activity: tf('p5', "Le contrôle a priori de la DNCMP intervient après la signature du marché.", false, "Faux. A priori = avant attribution / signature."),
  },
  {
    title: 'Rôle de la PRMP',
    track: 'commande-publique',
    lesson: 'acteurs',
    content: [
      "La Personne Responsable des Marchés Publics conduit les procédures au sein de l'autorité contractante.",
      "Elle s'appuie sur les commissions d'ouverture et d'évaluation et veille au respect du DAO.",
      "La PRMP est le pivot opérationnel de la passation, pas le régulateur national.",
    ],
    keyPoint: "PRMP = pilotage des procédures de l'autorité contractante.",
    activity: fill('p6', "La ___ conduit les procédures de marchés au sein de l'autorité contractante.", 'PRMP', "PRMP = Personne Responsable des Marchés Publics.", ['Prmp']),
  },
  {
    title: "Révision S1 : acteurs en un coup d'œil",
    track: 'revision',
    content: [
      "PRMP : passation. DNCMP : contrôle a priori. ARMP : régulation et recours.",
      "Séparer ces rôles limite les conflits d'intérêts et renforce la confiance des opérateurs.",
      "En cas de doute sur la saisine, relisez les attributions de chaque organe.",
    ],
    keyPoint: 'Passation ≠ contrôle ≠ régulation.',
    activity: mcq('p7', 'Qui traite principalement les recours des soumissionnaires ?', ['PRMP', 'DNCMP', 'ARMP', 'Comptable public'], 2, "L'ARMP traite les recours."),
  },
  {
    title: "Appel d'offres ouvert",
    track: 'commande-publique',
    lesson: 'procedures',
    content: [
      "L'appel d'offres ouvert est la procédure de droit commun : tout candidat peut soumissionner après publicité.",
      "Il favorise la concurrence lorsque le besoin est clairement défini dans le DAO.",
      "C'est le choix par défaut sauf exception motivée.",
    ],
    keyPoint: "Droit commun = appel d'offres ouvert.",
    activity: tf('p8', "L'appel d'offres ouvert est réservé aux urgences extrêmes.", false, "Faux. C'est la procédure de droit commun."),
  },
  {
    title: "Appel d'offres restreint",
    track: 'commande-publique',
    lesson: 'procedures',
    content: [
      "Dans l'appel d'offres restreint, seuls les candidats présélectionnés sont invités à soumissionner.",
      "Il s'utilise lorsque les conditions légales sont réunies (complexité, nombre limité d'opérateurs qualifiés…).",
      "La présélection elle-même doit être objective et tracée.",
    ],
    keyPoint: 'Restreint = candidats présélectionnés, sous conditions.',
    activity: mcq('p9', "Dans l'appel d'offres restreint :", ["Tout le monde soumissionne librement", "Seuls les présélectionnés sont invités", "Aucun avis n'est publié", "La PRMP choisit sans critères"], 1, "Seuls les candidats présélectionnés sont invités."),
  },
  {
    title: 'Procédure négociée',
    track: 'commande-publique',
    lesson: 'procedures',
    content: [
      "La procédure négociée est exceptionnelle. Elle doit être motivée (urgence, spécificité technique, etc.).",
      "Elle ne doit pas servir à contourner la concurrence sans justification écrite solide.",
      "Motivez par des faits, pas par la seule volonté d'aller plus vite.",
    ],
    keyPoint: 'Négociée = exception motivée, pas la norme.',
    activity: tf('p10', 'La procédure négociée peut être utilisée sans motivation écrite.', false, 'Faux. Elle doit être motivée.'),
  },
  {
    title: 'Demande de cotation et seuils',
    track: 'commande-publique',
    lesson: 'seuils-et-publicite',
    content: [
      "En dessous de certains seuils, des procédures simplifiées (demande de cotation) peuvent s'appliquer.",
      "Au-delà, publicité renforcée, appel d'offres et contrôle DNCMP deviennent obligatoires selon les textes.",
      "Vérifiez toujours le seuil applicable à la date de lancement.",
    ],
    keyPoint: 'Les seuils orientent la procédure et le contrôle.',
    activity: fill('p11', "Les ___ monétaires déterminent le type de procédure et la publicité.", 'seuils', 'Les seuils réglementaires sont décisifs.', ['Seuils']),
  },
  {
    title: 'Publicité des marchés',
    track: 'commande-publique',
    lesson: 'seuils-et-publicite',
    content: [
      "La publicité informe les opérateurs et ouvre la concurrence. Le support et la durée dépendent des seuils et de la procédure.",
      "Un avis incomplet ou trop court peut fausser la concurrence et exposer la procédure à un recours.",
      "Intégrez la publicité dans le planning dès le cadrage du besoin.",
    ],
    keyPoint: 'Publicité adaptée = concurrence effective.',
    activity: mcq('p12', 'Un avis de publicité trop vague :', ['Améliore toujours le prix', 'Peut fausser la concurrence', "Remplace le DAO", 'Annule la DNCMP'], 1, "Un avis vague nuit à l'égalité et à la concurrence."),
  },
  {
    title: "Séquence type d'un AO ouvert",
    track: 'commande-publique',
    lesson: 'procedures',
    content: [
      "Séquence typique : publication de l'avis → dépôt des offres → ouverture → évaluation → attribution → notification → signature.",
      "Chaque étape produit des pièces (PV, rapport) à conserver.",
      "Ne sautez aucune étape pour 'gagner du temps' : le contentieux coûte plus cher.",
    ],
    keyPoint: 'Avis → dépôt → ouverture → évaluation → attribution.',
    activity: tf('p13', "L'évaluation des offres a lieu avant la publication de l'avis.", false, "Faux. L'avis précède le dépôt et l'évaluation."),
  },
  {
    title: 'Révision S2 : choisir la bonne procédure',
    track: 'revision',
    content: [
      "Droit commun : AO ouvert. Restreint et négocié : sous conditions. Seuils : orientent publicité et contrôle.",
      "En cas de doute, documentez le choix de procédure et vérifiez les textes en vigueur.",
      "La motivation écrite est votre meilleure protection.",
    ],
    keyPoint: 'Toujours justifier le choix de procédure.',
    activity: mcq('p14', 'Quelle procédure est de droit commun ?', ['Négociée', "Appel d'offres ouvert", 'Gré à gré pur', 'Restreint seul'], 1, "L'AO ouvert est de droit commun."),
  },
  {
    title: "Qu'est-ce que le DAO ?",
    track: 'commande-publique',
    lesson: 'dao-et-documents',
    content: [
      "Le Dossier d'Appel d'Offres regroupe les documents fournis aux candidats : règlement, CCTP, CCAP, bordereaux, modèles…",
      "Un DAO clair réduit les offres non conformes et les litiges.",
      "Faites relire le DAO par un pair avant publication.",
    ],
    keyPoint: 'DAO = règles du jeu pour tous les candidats.',
    activity: fill('p15', "Le ___ regroupe les documents fournis aux candidats.", 'DAO', "DAO = Dossier d'Appel d'Offres.", ['Dao']),
  },
  {
    title: 'CCTP et CCAP',
    track: 'commande-publique',
    lesson: 'dao-et-documents',
    content: [
      "Le CCTP décrit le besoin technique. Le CCAP fixe les clauses administratives particulières du marché.",
      "Ils doivent être cohérents entre eux et avec l'avis de publicité.",
      "Incohérence CCTP/CCAP = source classique de contentieux.",
    ],
    keyPoint: 'CCTP = technique · CCAP = clauses administratives.',
    activity: mcq('p16', 'Le CCTP porte principalement sur :', ['Le paiement des salaires', 'Les spécifications techniques du besoin', 'Les recours ARMP', 'Le contrôle a priori'], 1, 'CCTP = cahier des clauses techniques particulières.'),
  },
  {
    title: "Critères d'évaluation",
    track: 'commande-publique',
    lesson: 'evaluation-offres',
    content: [
      "Seuls les critères publiés dans le DAO s'appliquent. Ils doivent être objectifs et mesurables autant que possible.",
      "Changer les critères après ouverture des offres viole l'égalité de traitement.",
      "Annoncez aussi les pondérations lorsque le mode d'évaluation le prévoit.",
    ],
    keyPoint: 'Critères = ceux du DAO, appliqués uniformément.',
    activity: tf('p17', "On peut inventer un nouveau critère après avoir lu les offres.", false, "Faux. Les critères sont fixés à l'avance."),
  },
  {
    title: "Commission d'évaluation",
    track: 'commande-publique',
    lesson: 'evaluation-offres',
    content: [
      "L'évaluation est collégiale. Les membres déclarent tout conflit d'intérêts et se déportent si nécessaire.",
      "Le rapport d'évaluation motive les scores et les écarts.",
      "Un rapport lacunaire fragilise l'attribution en cas de recours.",
    ],
    keyPoint: 'Collégialité + traçabilité + déport si conflit.',
    activity: mcq('p18', "En cas de conflit d'intérêts, le membre de commission doit :", ['Voter en secret pour son proche', 'Se déporter et déclarer la situation', 'Détruire le DAO', 'Ignorer le règlement'], 1, 'Déclaration et déport protègent la procédure.'),
  },
  {
    title: 'Offres non conformes',
    track: 'commande-publique',
    lesson: 'evaluation-offres',
    content: [
      "Une offre qui ne respecte pas une exigence essentielle du DAO peut être écartée, avec motivation.",
      "Les irrégularités mineures peuvent parfois être précisées si le règlement le permet — proportionnalité.",
      "La motivation de l'écart est aussi importante que la décision elle-même.",
    ],
    keyPoint: 'Écarter = motiver · proportionnalité pour les détails mineurs.',
    activity: tf('p19', 'Toute erreur de forme, même mineure, impose toujours le rejet sans examen.', false, 'Faux. La proportionnalité et le DAO guident le traitement.'),
  },
  {
    title: 'Attribution et notification',
    track: 'commande-publique',
    lesson: 'attribution-notification',
    content: [
      "Après évaluation (et avis DNCMP si requis), l'autorité attribue et notifie attributaire et évincés.",
      "Les délais de recours courent souvent à compter de la notification.",
      "Conservez la preuve de notification (accusé, registre).",
    ],
    keyPoint: 'Notification = transparence + point de départ des recours.',
    activity: fill('p20', "La ___ aux candidats évincés est une obligation de transparence.", 'notification', 'La notification informe attributaire et évincés.', ['Notification']),
  },
  {
    title: 'Révision S3 : du DAO à la notification',
    track: 'revision',
    content: [
      "DAO clair → critères connus → évaluation collégiale → attribution → notification.",
      "Sans traçabilité, la procédure est fragile face aux recours et contrôles.",
      "Entraînez-vous à reconstituer le dossier d'un marché type de votre service.",
    ],
    keyPoint: 'Traçabilité de bout en bout.',
    activity: mcq('p21', "Le rapport d'évaluation sert surtout à :", ['Remplacer le budget', 'Documenter et motiver le choix', 'Payer le fournisseur', 'Nommer la PRMP'], 1, "Il documente le raisonnement de la commission."),
  },
  {
    title: 'Exécution du marché',
    track: 'commande-publique',
    lesson: 'execution-marche',
    content: [
      "L'exécution respecte délais, quantités et spécifications du contrat.",
      "PV de réception et factures conditionnent la suite vers le paiement (chaîne de la dépense).",
      "Suivez les livraisons : le retard non géré devient contentieux.",
    ],
    keyPoint: 'Exécuter = respecter le contrat signé.',
    activity: tf('p22', "On peut livrer un produit très différent du CCTP si le prix est plus bas.", false, "Faux. Le contrat et le CCTP s'imposent."),
  },
  {
    title: 'Avenants',
    track: 'commande-publique',
    lesson: 'execution-marche',
    content: [
      "Un avenant modifie le marché en cours. Les modifications substantielles sont encadrées.",
      "Un avenant ne doit pas servir à contourner les règles de mise en concurrence initiales.",
      "Documentez l'intérêt public de la modification.",
    ],
    keyPoint: 'Avenant = modification encadrée, pas un détournement.',
    activity: fill('p23', "Une modification importante se formalise en général par un ___.", 'avenant', "L'avenant formalise les modifications.", ['Avenant']),
  },
  {
    title: "Conflits d'intérêts",
    track: 'commande-publique',
    lesson: 'integrite-ethique',
    content: [
      "Il y a conflit d'intérêts lorsque l'intérêt personnel d'un agent peut influencer l'exercice impartial de sa fonction.",
      "La bonne conduite : déclarer et se déporter. Le silence expose à des sanctions.",
      "Le déport n'est pas un aveu de faute : c'est une protection.",
    ],
    keyPoint: 'Déclarer + se déporter.',
    activity: mcq('p24', "Si votre frère est actionnaire d'un soumissionnaire, vous devez :", ['Participer sans rien dire', 'Déclarer et vous déporter', "Influencer pour l'écarter", 'Modifier le DAO'], 1, 'Déclaration et déport.'),
  },
  {
    title: 'Corruption et favoritisme',
    track: 'commande-publique',
    lesson: 'integrite-ethique',
    content: [
      "Corruption, pots-de-vin et favoritisme minent la commande publique et sont sanctionnés.",
      "La traçabilité, la collégialité et le contrôle (DNCMP, ARMP, IGF, Cour des comptes) jouent un rôle dissuasif.",
      "Signaler un soupçon selon les canaux institutionnels fait partie de l'intégrité professionnelle.",
    ],
    keyPoint: 'Intégrité = condition de légitimité de la dépense.',
    activity: tf('p25', "Accepter un cadeau d'un soumissionnaire pendant l'évaluation n'est jamais un problème.", false, 'Faux. Cela crée un risque grave de partialité.'),
  },
  {
    title: 'Contrôle a posteriori',
    track: 'commande-publique',
    lesson: 'controles',
    content: [
      "Après attribution et exécution, d'autres contrôles (IGF, Cour des comptes…) peuvent examiner la régularité de la dépense.",
      "Conserver les pièces plusieurs années selon les règles de conservation applicables.",
      "Préparez les dossiers demandés dans les délais impartis.",
    ],
    keyPoint: "Le contrôle ne s'arrête pas à la signature.",
    activity: mcq('p26', 'Le contrôle a posteriori intervient :', ["Uniquement avant l'avis", 'Après les opérations, sur pièces', 'Seulement pour le secteur privé', 'À la place de la PRMP'], 1, 'A posteriori = après coup, sur la base des pièces.'),
  },
  {
    title: 'Bonnes pratiques documentaires',
    track: 'commande-publique',
    content: [
      "Classez : avis, DAO, offres, PV d'ouverture, rapport d'évaluation, avis DNCMP, notifications, contrat, avenants, réceptions.",
      "Un dossier complet protège l'agent et l'institution.",
      "Numérisez lorsque c'est possible, en restant cohérent avec l'original.",
    ],
    keyPoint: "Dossier complet = protection de l'agent.",
    activity: tf('p27', 'Il est inutile de conserver les PV une fois le marché signé.', false, "Faux. Les contrôles a posteriori s'appuient sur ces pièces."),
  },
  {
    title: 'Révision S4 : intégrité et exécution',
    track: 'revision',
    content: [
      "Exécuter le contrat, encadrer les avenants, déclarer les conflits, documenter tout.",
      "L'intégrité n'est pas un module isolé : elle traverse chaque étape de la commande publique.",
      "Passez à la comptabilité publique : la chaîne de la dépense prolonge la passation.",
    ],
    keyPoint: "L'intégrité est transverse.",
    activity: fill('p28', "En cas de conflit d'intérêts, l'agent doit se ___.", 'déporter', 'Se déporter et déclarer.', ['Déporter', 'retirer']),
  },
  {
    title: 'Passer à la comptabilité publique',
    track: 'comptabilite-publique',
    lesson: 'principes',
    content: [
      "Après l'attribution, la dépense suit le circuit de la comptabilité publique : engagement, liquidation, ordonnancement, paiement.",
      "La séparation ordonnateur / comptable protège les deniers publics.",
      "Passation et paiement sont deux mondes liés : maîtrisez les deux.",
    ],
    keyPoint: 'Commande publique et comptabilité publique sont liées.',
    activity: mcq('p29', 'Qui paie en principe la dépense publique ?', ['La PRMP', "L'ordonnateur seul", 'Le comptable public', "L'ARMP"], 2, 'Le comptable public paie après contrôles.'),
  },
  {
    title: 'Principe de séparation des fonctions',
    track: 'comptabilite-publique',
    lesson: 'principes',
    content: [
      "L'ordonnateur engage, liquide et ordonnance. Le comptable contrôle et paie.",
      "Une même personne ne doit pas cumuler librement ces rôles : c'est un pilier du contrôle interne.",
      "Cette séparation n'est pas une méfiance personnelle : c'est une règle d'organisation.",
    ],
    keyPoint: 'Ordonnateur ≠ comptable.',
    activity: tf('p30', "L'ordonnateur peut aussi être le payeur sans aucune séparation.", false, 'Faux. La séparation est un principe fondamental.'),
  },
  {
    title: 'Engagement de la dépense',
    track: 'comptabilite-publique',
    lesson: 'circuit-depense',
    content: [
      "L'engagement réserve des crédits pour une dépense future. Sans crédits disponibles, l'engagement n'est pas régulier.",
      "C'est la première étape du circuit avant liquidation et paiement.",
      "Vérifiez la disponibilité budgétaire avant d'engager.",
    ],
    keyPoint: 'Engagement = réserver des crédits.',
    activity: fill('p31', "L'___ réserve des crédits pour une dépense future.", 'engagement', "L'engagement ouvre le circuit.", ['Engagement']),
  },
  {
    title: 'Liquidation',
    track: 'comptabilite-publique',
    lesson: 'circuit-depense',
    content: [
      "La liquidation constate le service fait et détermine le montant dû au créancier.",
      "Sans service fait (ou sans pièces), la liquidation est irrégulière.",
      "Ajustez le montant si la livraison est partielle ou réservée.",
    ],
    keyPoint: 'Liquidation = service fait + montant dû.',
    activity: mcq('p32', 'La liquidation consiste à :', ['Publier un avis', 'Constater le service fait et le montant', 'Attribuer un marché', 'Réguler un recours'], 1, 'Service fait et montant dû.'),
  },
  {
    title: 'Ordonnancement',
    track: 'comptabilite-publique',
    lesson: 'circuit-depense',
    content: [
      "L'ordonnancement est l'ordre de payer adressé au comptable public par l'ordonnateur.",
      "Il s'appuie sur les pièces de liquidation et l'engagement préalable.",
      "Un ordonnancement hors séquence est une irrégularité classique.",
    ],
    keyPoint: 'Ordonnancement = ordre de payer.',
    activity: tf('p33', "L'ordonnancement est émis par le comptable public.", false, "Faux. C'est l'ordonnateur qui ordonnance."),
  },
  {
    title: 'Paiement par le comptable',
    track: 'comptabilite-publique',
    lesson: 'comptable-public',
    content: [
      "Le comptable paie après contrôle de régularité (pièces, imputation, qualité du créancier…).",
      "Sa responsabilité personnelle et pécuniaire justifie ce contrôle avant décaissement.",
      "Respectez son rôle : c'est un contrôle, pas un caprice.",
    ],
    keyPoint: 'Paiement = après contrôle du comptable.',
    activity: mcq('p34', 'Avant de payer, le comptable :', ['Ignore les pièces', 'Contrôle la régularité', 'Modifie le DAO', 'Attribue le marché'], 1, 'Contrôle de régularité obligatoire.'),
  },
  {
    title: "Rôle de l'ordonnateur",
    track: 'comptabilite-publique',
    lesson: 'ordonnateur',
    content: [
      "L'ordonnateur décide de la dépense dans le cadre budgétaire : engagement, liquidation, ordonnancement.",
      "Il ne se substitue pas au comptable pour le paiement.",
      "Il assume la régularité de ses propres actes.",
    ],
    keyPoint: 'Ordonnateur = décideur de la chaîne (hors paiement).',
    activity: fill('p35', "L'___ engage, liquide et ordonnance.", 'ordonnateur', "Rôle clé de l'ordonnateur.", ['Ordonnateur']),
  },
  {
    title: 'Responsabilité du comptable public',
    track: 'comptabilite-publique',
    lesson: 'comptable-public',
    content: [
      "Le comptable public est responsable personnellement et pécuniairement des opérations qu'il exécute.",
      "D'où l'exigence de pièces justificatives complètes avant paiement.",
      "Cette responsabilité fonde son indépendance dans le contrôle de régularité.",
    ],
    keyPoint: 'Responsabilité personnelle et pécuniaire du comptable.',
    activity: tf('p36', 'Le comptable peut payer sans aucune pièce justificative.', false, 'Faux. Les pièces sont exigées.'),
  },
  {
    title: 'Révision : circuit complet',
    track: 'revision',
    content: [
      "Engagement → Liquidation → Ordonnancement → Paiement.",
      "Ordonnateur (trois premières étapes) · Comptable (paiement après contrôle).",
      "Mémorisez E-L-O-P comme réflexe professionnel.",
    ],
    keyPoint: 'E-L-O-P : mémorisez le circuit.',
    activity: mcq('p37', 'Ordre correct du circuit :', ['Paiement puis engagement', 'Engagement → liquidation → ordonnancement → paiement', 'Liquidation seule', 'Attribution → paiement direct'], 1, 'Circuit classique de la dépense.'),
  },
  {
    title: 'Crédits budgétaires',
    track: 'comptabilite-publique',
    lesson: 'credits-budgetaires',
    content: [
      "On ne peut engager et payer que dans la limite des crédits ouverts et disponibles.",
      "Dépasser les crédits expose l'ordonnateur et fragilise la régularité de la dépense.",
      "Suivez les consommations pour anticiper les redéploiements légaux.",
    ],
    keyPoint: 'Pas de dépense sans crédits disponibles.',
    activity: tf('p38', 'On peut engager librement au-delà des crédits votés.', false, 'Faux. Les crédits limitent la dépense.'),
  },
  {
    title: 'Imputation budgétaire',
    track: 'comptabilite-publique',
    lesson: 'credits-budgetaires',
    content: [
      "Chaque dépense est imputée sur la bonne ligne budgétaire (nature, programme, etc.).",
      "Une mauvaise imputation fausse le suivi et peut être relevée en contrôle.",
      "Corrigez dès la détection d'une erreur d'imputation.",
    ],
    keyPoint: 'Bonne imputation = suivi budgétaire fiable.',
    activity: fill('p39', "L'___ budgétaire rattache la dépense à la bonne ligne.", 'imputation', 'Imputation correcte exigée.', ['Imputation']),
  },
  {
    title: 'Pièces justificatives',
    track: 'comptabilite-publique',
    lesson: 'pieces-justificatives',
    content: [
      "Factures, PV de réception, contrats, ordres de mission… constituent le dossier de la dépense.",
      "Le comptable s'appuie sur ces pièces pour accepter ou rejeter le paiement.",
      "Présentez un dossier ordonné : vous gagnez du temps.",
    ],
    keyPoint: 'Pas de paiement sans pièces suffisantes.',
    activity: mcq('p40', 'Les pièces justificatives servent à :', ["Remplacer l'ARMP", 'Prouver la réalité et la régularité de la dépense', 'Choisir la PRMP', 'Publier un DAO'], 1, 'Elles prouvent service fait et régularité.'),
  },
  {
    title: 'Service fait',
    track: 'comptabilite-publique',
    lesson: 'pieces-justificatives',
    content: [
      "Le principe du service fait : on ne paie en principe que ce qui a été livré ou exécuté conformément au contrat.",
      "Les avances et exceptions sont strictement encadrées par les textes.",
      "Ne confondez pas urgence opérationnelle et contournement du service fait.",
    ],
    keyPoint: 'Payer le service fait (sauf exceptions légales).',
    activity: tf('p41', 'On doit toujours payer avant toute livraison, sans exception possible dans les textes.', false, 'Faux. Le principe est le service fait ; les exceptions sont encadrées.'),
  },
  {
    title: 'Recettes publiques',
    track: 'comptabilite-publique',
    lesson: 'recettes-publiques',
    content: [
      "Les recettes (impôts, taxes, produits divers) alimentent le budget. Leur encaissement suit des règles strictes.",
      "Le comptable intervient aussi sur la chaîne des recettes selon son poste.",
      "Recettes et dépenses forment les deux faces de la gestion publique.",
    ],
    keyPoint: 'Recettes = autre face de la gestion publique.',
    activity: mcq('p42', 'Les recettes publiques :', ['Ne concernent jamais le comptable', 'Alimentent le budget selon des règles', 'Remplacent les marchés', 'Sont gérées uniquement par la PRMP'], 1, 'Elles alimentent le budget dans un cadre légal.'),
  },
  {
    title: 'Contrôles financiers',
    track: 'comptabilite-publique',
    lesson: 'controles-financiers',
    content: [
      "Contrôle interne, inspection, Cour des comptes : plusieurs couches vérifient la régularité et la bonne gestion.",
      "Anticiper le contrôle, c'est classer et motiver chaque opération au fil de l'eau.",
      "Un service organisé redoute moins le contrôle externe.",
    ],
    keyPoint: 'Le contrôle est permanent, pas seulement annuel.',
    activity: tf('p43', 'Seule la signature du ministre suffit, les pièces sont optionnelles.', false, 'Faux. Les pièces et contrôles restent exigés.'),
  },
  {
    title: 'SIGEFI — à quoi ça sert ?',
    track: 'comptabilite-publique',
    lesson: 'sigefi-outils',
    content: [
      "Le Système d'Information de Gestion des Finances appuie le suivi de l'exécution budgétaire.",
      "Saisir correctement les opérations dans l'outil renforce la traçabilité nationale.",
      "Données de qualité = pilotage de qualité.",
    ],
    keyPoint: "SIGEFI = suivi informatisé de l'exécution.",
    activity: fill('p44', "Le ___ appuie le suivi de l'exécution budgétaire.", 'SIGEFI', "SIGEFI = système d'information finances.", ['Sigefi']),
  },
  {
    title: 'Saisie et traçabilité numérique',
    track: 'comptabilite-publique',
    lesson: 'sigefi-outils',
    content: [
      "Une saisie tardive ou erronée dans le système fausse les tableaux de bord et les contrôles.",
      "Bon réflexe : aligner pièces papier (ou PDF) et enregistrements système.",
      "Corrigez les écarts dès qu'ils apparaissent.",
    ],
    keyPoint: 'Cohérence pièces ↔ système.',
    activity: mcq('p45', 'Une saisie inexacte dans SIGEFI :', ['Est sans conséquence', 'Peut fausser le suivi et les contrôles', 'Remplace le Code des marchés', "Annule l'ARMP"], 1, 'La qualité des données conditionne le pilotage.'),
  },
  {
    title: 'Révision : comptabilité publique',
    track: 'revision',
    content: [
      "Circuit E-L-O-P, séparation des fonctions, crédits, pièces, SIGEFI.",
      "Relisez les leçons du parcours Comptabilité publique pour approfondir.",
      "À partir du jour 47 : cas pratiques et consolidation unique.",
    ],
    keyPoint: "Maîtriser le circuit avant d'approfondir les cas.",
    activity: mcq('p46', 'Qui ordonnance la dépense ?', ['Le comptable', "L'ordonnateur", 'La DNCMP', "L'ARMP"], 1, "L'ordonnateur ordonnance."),
  },
]

const ALL_SEEDS: DaySeed[] = [...SEEDS, ...DAYS_47_90].slice(0, 90)

export const PROGRAM_LENGTH = 90

export function getProgramDay(day: number): ProgramDay {
  const d = Math.min(Math.max(1, Math.floor(day)), PROGRAM_LENGTH)
  const seed = ALL_SEEDS[d - 1] || ALL_SEEDS[ALL_SEEDS.length - 1]
  return {
    day: d,
    week: Math.ceil(d / 7),
    title: seed.title,
    trackSlug: seed.track,
    relatedLessonSlug: seed.lesson,
    content: seed.content,
    keyPoint: seed.keyPoint,
    activity: seed.activity,
  }
}

export function getProgramDayNumber(startDateIso: string | null, onDate = new Date()): number {
  if (!startDateIso) return 1
  const start = new Date(startDateIso.slice(0, 10) + 'T12:00:00')
  const cur = new Date(onDate.toISOString().slice(0, 10) + 'T12:00:00')
  const diff = Math.floor((cur.getTime() - start.getTime()) / 86400000)
  return Math.min(PROGRAM_LENGTH, Math.max(1, diff + 1))
}

export function weekLabel(week: number): string {
  if (week <= 4) return 'Commande publique — bases'
  if (week <= 6) return 'Commande publique — pratique'
  if (week <= 10) return 'Comptabilité publique'
  return 'Consolidation & cas'
}
