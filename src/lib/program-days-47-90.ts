/**
 * Programme Ingoma — jours 47 à 90 (consolidation, cas, mémos uniques)
 * Contenu pédagogique, non constitutif d'avis juridique officiel.
 */
import type { ActivityItem } from './catalog-types'

export type DaySeed = {
  title: string
  track: 'commande-publique' | 'comptabilite-publique' | 'revision'
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

/** 44 jours uniques (47→90) */
export const DAYS_47_90: DaySeed[] = [
  {
    title: 'Urgence réelle vs urgence de convenance',
    track: 'commande-publique',
    lesson: 'procedures',
    content: [
      "L'urgence peut autoriser une procédure dérogatoire, mais elle doit être objective : risque grave, imprévisibilité raisonnable, nécessité d'agir vite.",
      "Une 'urgence' invoquée seulement pour éviter un appel d'offres expose l'autorité à un recours et à un contrôle a posteriori.",
      "Documentez les faits (dates, impacts, alternatives écartées) dans le dossier de passation.",
    ],
    keyPoint: 'Urgence = prouvée, proportionnée, écrite.',
    activity: tf('p47', "On peut invoquer l'urgence sans aucun élément factuel au dossier.", false, "Faux. L'urgence doit être établie et documentée."),
  },
  {
    title: 'Seuils : vérifier la version en vigueur',
    track: 'commande-publique',
    lesson: 'seuils-et-publicite',
    content: [
      "Les seuils monétaires orientent la procédure, la publicité et le passage éventuel devant la DNCMP.",
      "Ils sont fixés par voie réglementaire et peuvent être révisés : ne vous fiez pas à une ancienne circulaire seule.",
      "Bon réflexe : confirmer le seuil applicable à la date de lancement de la procédure.",
    ],
    keyPoint: 'Seuils à jour = conformité de la procédure.',
    activity: mcq('p48', 'Les seuils servent principalement à :', ['Fixer les salaires des PRMP', 'Orienter procédure, publicité et contrôle', 'Remplacer le CCTP', 'Choisir le comptable'], 1, 'Seuils → type de procédure, publicité, contrôle.'),
  },
  {
    title: 'Pièce manquante avant paiement',
    track: 'comptabilite-publique',
    lesson: 'pieces-justificatives',
    content: [
      "Si une pièce essentielle manque (facture, PV de réception, ordre de paiement…), le comptable peut suspendre le paiement.",
      "La bonne pratique pour l'ordonnateur : compléter le dossier, pas faire pression pour un paiement irrégulier.",
      "Cette tension est normale : elle protège les deniers publics et la responsabilité du comptable.",
    ],
    keyPoint: 'Régulariser les pièces, ne pas forcer le paiement.',
    activity: tf('p49', 'Le comptable doit payer sans pièces dès que la hiérarchie insiste.', false, 'Faux. Le contrôle de régularité prime.'),
  },
  {
    title: 'Avenant et objet du marché',
    track: 'commande-publique',
    lesson: 'execution-marche',
    content: [
      "Un avenant qui change radicalement l'objet, le volume ou la nature des prestations peut s'analyser comme un nouveau marché déguisé.",
      "Les textes limitent les modifications substantielles pour préserver la concurrence initiale.",
      "En cas de doute, sollicitez l'avis des instances compétentes avant de signer.",
    ],
    keyPoint: "Pas d'avenant pour contourner la mise en concurrence.",
    activity: mcq('p50', 'Un avenant trop large risque surtout de :', ["Améliorer l'égalité des candidats", 'Contourner les règles de concurrence', 'Remplacer SIGEFI', 'Annuler le budget de l\'État'], 1, 'Risque de contournement de la concurrence.'),
  },
  {
    title: 'Mémo ARMP / DNCMP / PRMP',
    track: 'revision',
    content: [
      "PRMP : conduit les procédures au sein de l'autorité contractante.",
      "DNCMP : contrôle a priori selon les seuils. ARMP : régulation et recours.",
      "Confondre ces rôles mène à de mauvaises saisines et à des retards de dossier.",
    ],
    keyPoint: 'Passation ≠ contrôle a priori ≠ régulation.',
    activity: fill('p51', "La ___ traite principalement les recours des soumissionnaires.", 'ARMP', "L'ARMP est l'instance de régulation et de recours.", ['Armp']),
  },
  {
    title: 'Sous-traitance et responsabilité',
    track: 'commande-publique',
    content: [
      "La sous-traitance, lorsqu'elle est autorisée, doit respecter le DAO et les textes : déclaration, agrément éventuel, limites de pourcentage.",
      "Le titulaire reste en principe responsable de l'exécution envers l'autorité contractante.",
      "Une sous-traitance occulte peut entraîner des sanctions contractuelles et des irrégularités.",
    ],
    keyPoint: 'Sous-traitance = encadrée et déclarée.',
    activity: tf('p52', 'Le titulaire peut sous-traiter 100 % du marché en secret sans en informer personne.', false, 'Faux. La sous-traitance est encadrée et doit être déclarée selon les règles.'),
  },
  {
    title: 'Offre anormalement basse',
    track: 'commande-publique',
    lesson: 'evaluation-offres',
    content: [
      "Une offre très inférieure aux autres peut cacher une erreur, une sous-estimation ou une pratique anticoncurrentielle.",
      "Les textes prévoient souvent une demande d'éclaircissements avant rejet motivé.",
      "Ne retenez pas automatiquement le prix le plus bas sans analyse de cohérence.",
    ],
    keyPoint: 'Prix bas = analyser avant de conclure.',
    activity: mcq('p53', 'Face à une offre anormalement basse, la bonne attitude est :', ['Accepter sans question', 'Demander des précisions puis motiver', 'Ignorer le DAO', 'Attribuer à un proche'], 1, 'Éclaircissements puis décision motivée.'),
  },
  {
    title: 'Délais de recours',
    track: 'commande-publique',
    lesson: 'attribution-notification',
    content: [
      "Après notification, les candidats évincés disposent de délais pour former un recours (selon les textes applicables).",
      "C'est pourquoi la notification claire et datée est essentielle : elle fait courir les délais.",
      "Conserver la preuve de notification protège l'autorité en cas de contestation.",
    ],
    keyPoint: 'Notification datée = point de départ des recours.',
    activity: tf('p54', "Il est inutile de notifier les candidats évincés si l'attributaire est choisi.", false, 'Faux. La notification est une obligation de transparence.'),
  },
  {
    title: 'Engagement sans crédits',
    track: 'comptabilite-publique',
    lesson: 'credits-budgetaires',
    content: [
      "Engager une dépense sans crédits ouverts et disponibles est une irrégularité majeure.",
      "L'ordonnateur doit vérifier la disponibilité budgétaire avant d'engager.",
      "Le contrôle ultérieur (comptable, inspection) relèvera souvent ce manquement.",
    ],
    keyPoint: 'Pas d\'engagement hors crédits disponibles.',
    activity: fill('p55', "On ne peut engager que dans la limite des ___ disponibles.", 'crédits', 'Les crédits limitent légalement la dépense.', ['credits', 'Crédits']),
  },
  {
    title: 'Liquidation et service non conforme',
    track: 'comptabilite-publique',
    lesson: 'circuit-depense',
    content: [
      "Si la livraison est partielle ou non conforme au contrat, la liquidation doit refléter la réalité du service fait.",
      "On ne liquide pas 'comme si' tout était parfait pour accélérer le paiement.",
      "PV de réception avec réserves et montants ajustés sont des outils de régularité.",
    ],
    keyPoint: 'Liquidation = réalité du service fait.',
    activity: mcq('p56', 'En cas de livraison non conforme, on doit :', ['Liquider le montant total sans réserve', 'Refléter la réalité dans la liquidation', 'Ignorer le contrat', 'Payer en cash hors circuit'], 1, 'La liquidation suit le service réellement fait.'),
  },
  {
    title: 'Ordonnancement anticipé',
    track: 'comptabilite-publique',
    lesson: 'ordonnateur',
    content: [
      "Ordonnancer avant engagement ou sans liquidation régulière casse la chaîne de la dépense.",
      "Chaque étape a une finalité de contrôle : sauter une étape fragilise l'agent et l'institution.",
      "En pratique : vérifier la séquence E → L → O avant d'envoyer l'ordre au comptable.",
    ],
    keyPoint: 'Respecter la séquence E-L-O avant paiement.',
    activity: tf('p57', "On peut ordonnancer librement avant tout engagement de crédits.", false, 'Faux. Engagement et liquidation précèdent en principe.'),
  },
  {
    title: 'Rejet de paiement par le comptable',
    track: 'comptabilite-publique',
    lesson: 'comptable-public',
    content: [
      "Le comptable peut refuser ou suspendre un paiement irrégulier (pièces, imputation, qualité du créancier…).",
      "Ce n'est pas une opposition personnelle : c'est l'exercice de sa responsabilité.",
      "L'ordonnateur corrige le dossier ; le dialogue institutionnel se fait sur pièces.",
    ],
    keyPoint: 'Rejet motivé du comptable = contrôle, pas blocage arbitraire.',
    activity: mcq('p58', 'Un rejet de paiement par le comptable vise surtout à :', ['Sanctionner la PRMP', 'Protéger la régularité des deniers publics', 'Remplacer le DAO', 'Attribuer un marché'], 1, 'Protection de la régularité de la dépense.'),
  },
  {
    title: 'Marché réservé et discrimination',
    track: 'commande-publique',
    content: [
      "Certaines mesures de préférence ou de réserve peuvent exister dans le cadre légal (PME, etc.), si les textes le prévoient.",
      "Hors cadre légal, favoriser un candidat pour des raisons personnelles est une discrimination illicite.",
      "Toujours s'appuyer sur une base textuelle claire, pas sur une pratique informelle.",
    ],
    keyPoint: 'Préférence = seulement si le droit le permet.',
    activity: tf('p59', 'On peut toujours écarter un candidat qualifié parce qu\'il déplaît à la commission.', false, "Faux. L'égalité de traitement s'impose."),
  },
  {
    title: 'Commission d\'ouverture des plis',
    track: 'commande-publique',
    lesson: 'evaluation-offres',
    content: [
      "L'ouverture des plis est un moment sensible : présence collégiale, PV, horodatage, intégrité des enveloppes.",
      "Un PV d'ouverture incomplet complique la défense de la procédure en cas de recours.",
      "Les membres signent le PV et signalent toute anomalie constatée.",
    ],
    keyPoint: 'Ouverture = collégiale, PVé, traçable.',
    activity: fill('p60', "Le ___ d'ouverture documente la séance de réception des offres.", 'PV', 'Le procès-verbal d\'ouverture est essentiel.', ['pv', 'procès-verbal']),
  },
  {
    title: 'Critères techniques vs prix',
    track: 'commande-publique',
    lesson: 'evaluation-offres',
    content: [
      "Selon le mode retenu dans le DAO, l'évaluation peut combiner note technique et note financière.",
      "Le poids de chaque critère doit être annoncé : on ne rééquilibre pas après lecture des offres.",
      "Un marché 'au prix seul' reste possible lorsque le besoin est standardisé et le DAO le prévoit.",
    ],
    keyPoint: 'Pondération = celle du DAO, figée.',
    activity: mcq('p61', 'La pondération technique/prix doit être :', ['Inventée après ouverture', 'Celle publiée dans le DAO', 'Fixée par le comptable', 'Secrète'], 1, 'Les critères et pondérations sont ceux du DAO.'),
  },
  {
    title: 'Avances et acomptes',
    track: 'comptabilite-publique',
    content: [
      "Les avances (avant service fait) et acomptes sont encadrés : conditions, plafonds, garanties éventuelles.",
      "Ce ne sont pas des facilités discrétionnaires hors texte.",
      "Vérifiez le contrat et les règles de la comptabilité publique avant tout déblocage.",
    ],
    keyPoint: 'Avances/acomptes = strictement encadrés.',
    activity: tf('p62', 'Toute avance est libre, sans condition légale ni contractuelle.', false, 'Faux. Avances et acomptes sont réglementés.'),
  },
  {
    title: 'Imputation erronée',
    track: 'comptabilite-publique',
    lesson: 'credits-budgetaires',
    content: [
      "Imputer une dépense de travaux sur une ligne de fournitures fausse le suivi budgétaire et peut être relevé en contrôle.",
      "Corrigez dès la détection ; ne laissez pas s'accumuler les erreurs de nature de dépense.",
      "SIGEFI et les tableaux de bord ne valent que si l'imputation est juste.",
    ],
    keyPoint: 'Bonne imputation = bons indicateurs.',
    activity: fill('p63', "L'___ budgétaire rattache la dépense à la bonne ligne.", 'imputation', 'Imputation correcte exigée.', ['Imputation']),
  },
  {
    title: 'Conservation des archives',
    track: 'revision',
    content: [
      "Les dossiers de marchés et de dépenses doivent être conservés selon les délais applicables (souvent plusieurs années).",
      "Destruction prématurée = impossibilité de se défendre en contrôle a posteriori.",
      "Classez par marché / par exercice : avis, DAO, offres, PV, rapports, notifications, contrat, avenants, réceptions, paiements.",
    ],
    keyPoint: 'Archiver = se protéger.',
    activity: mcq('p64', 'Détruire les PV dès la signature du marché :', ['Est recommandé', 'Empêche souvent de prouver la régularité plus tard', 'Remplace le contrôle DNCMP', 'Est exigé par l\'ARMP'], 1, 'Les contrôles a posteriori s\'appuient sur les archives.'),
  },
  {
    title: 'SIGEFI et pièces papier',
    track: 'comptabilite-publique',
    lesson: 'sigefi-outils',
    content: [
      "Le système informatique ne remplace pas les pièces justificatives : les deux doivent être cohérents.",
      "Saisie en retard ou montants divergents = alerte pour le contrôleur.",
      "Routine : après chaque opération majeure, vérifier l'enregistrement SIGEFI.",
    ],
    keyPoint: 'Pièces + SIGEFI = même vérité.',
    activity: tf('p65', 'Une saisie SIGEFI seule suffit, les factures peuvent être jetées.', false, 'Faux. Les pièces restent nécessaires.'),
  },
  {
    title: 'Recours à l\'ARMP : qui peut saisir ?',
    track: 'commande-publique',
    lesson: 'controles',
    content: [
      "Les candidats ou soumissionnaires qui s'estiment lésés peuvent former un recours selon les procédures prévues.",
      "La PRMP n'est pas juge et partie : l'ARMP assure la régulation indépendante du système.",
      "Respectez les formes et délais ; un recours hors délai peut être irrecevable.",
    ],
    keyPoint: 'Recours ARMP = voies et délais à respecter.',
    activity: mcq('p66', "L'ARMP intervient surtout pour :", ['Payer les fournisseurs', 'Réguler et traiter les recours', 'Engager les crédits', 'Tenir la caisse'], 1, 'Régulation et recours.'),
  },
  {
    title: 'Conflit d\'intérêts en commission',
    track: 'commande-publique',
    lesson: 'integrite-ethique',
    content: [
      "Lien familial, participation au capital, promesse d'emploi : autant de situations à déclarer.",
      "Le déport protège l'agent et la validité de la procédure.",
      "Mieux vaut se retirer trop tôt que trop tard : le doute profite à la transparence.",
    ],
    keyPoint: 'Doute sur un intérêt = déclarer et se déporter.',
    activity: fill('p67', "En cas de conflit d'intérêts, le membre se ___.", 'déporte', 'Déport et déclaration.', ['déporter', 'retire']),
  },
  {
    title: 'Responsabilité de l\'ordonnateur',
    track: 'comptabilite-publique',
    lesson: 'responsabilites',
    content: [
      "L'ordonnateur répond de la régularité de ses actes d'engagement, de liquidation et d'ordonnancement.",
      "Il ne peut se défausser entièrement sur le comptable pour des choix budgétaires irréguliers.",
      "Formation, check-lists et validation hiérarchique réduisent le risque personnel.",
    ],
    keyPoint: "L'ordonnateur assume ses actes de la chaîne de la dépense.",
    activity: tf('p68', "L'ordonnateur n'a aucune responsabilité dès que le comptable paie.", false, 'Faux. Chacun a sa sphère de responsabilité.'),
  },
  {
    title: 'Responsabilité du comptable',
    track: 'comptabilite-publique',
    lesson: 'responsabilites',
    content: [
      "Responsabilité personnelle et pécuniaire : le comptable peut être amené à répondre des manquants ou paiements irréguliers selon les règles.",
      "D'où l'exigence de pièces et de contrôles avant décaissement.",
      "Cette responsabilité justifie son indépendance fonctionnelle dans le contrôle de régularité.",
    ],
    keyPoint: 'Comptable = responsabilité renforcée sur le paiement.',
    activity: mcq('p69', 'La responsabilité du comptable public est notamment :', ['Uniquement morale', 'Personnelle et pécuniaire selon les textes', 'Transférée à la PRMP', 'Inexistante'], 1, 'Responsabilité personnelle et pécuniaire.'),
  },
  {
    title: 'Besoin mal défini dans le CCTP',
    track: 'commande-publique',
    lesson: 'dao-et-documents',
    content: [
      "Un CCTP flou attire des offres incomparables et des litiges d'exécution.",
      "Décrivez quantités, normes, délais, lieux, niveaux de performance de façon vérifiable.",
      "Faire relire le CCTP par un pair technique avant publication réduit les erreurs.",
    ],
    keyPoint: 'CCTP précis = offres comparables.',
    activity: tf('p70', 'Un CCTP vague facilite toujours une bonne concurrence.', false, 'Faux. Le flou nuit à la comparaison des offres.'),
  },
  {
    title: 'Publicité insuffisante',
    track: 'commande-publique',
    lesson: 'seuils-et-publicite',
    content: [
      "Réduire artificiellement la publicité pour 'aller vite' peut fausser la concurrence et entraîner l'annulation de la procédure.",
      "Durée, support et contenu de l'avis doivent coller aux exigences liées au seuil et à la procédure.",
      "Anticipez le calendrier de publicité dans le planning de passation.",
    ],
    keyPoint: 'Publicité conforme = procédure solide.',
    activity: mcq('p71', 'Une publicité trop courte ou incomplète :', ['N\'a aucun effet', 'Peut fragiliser la procédure', 'Remplace le contrôle DNCMP', 'Est toujours obligatoire sans texte'], 1, 'Risque de recours et d\'irrégularité.'),
  },
  {
    title: 'Réception provisoire et définitive',
    track: 'commande-publique',
    lesson: 'execution-marche',
    content: [
      "Selon le type de marché, la réception peut être provisoire puis définitive, avec levée de réserves.",
      "Ces actes conditionnent souvent le déclenchement du paiement et la fin des obligations du titulaire.",
      "Ne signez pas une réception 'pour faire plaisir' si les réserves sont encore bloquantes.",
    ],
    keyPoint: 'Réception = acte engageant, sur constat réel.',
    activity: fill('p72', "Le PV de ___ constate l'achèvement ou la conformité des prestations.", 'réception', 'La réception documente le service fait.', ['Reception', 'réception']),
  },
  {
    title: 'Pénalités de retard',
    track: 'commande-publique',
    content: [
      "Le CCAP ou le contrat prévoit souvent des pénalités si le titulaire dépasse les délais.",
      "Les appliquer (ou les remettre selon les règles) doit être motivé et tracé.",
      "Ignorer systématiquement les retards affaiblit l'autorité de l'administration.",
    ],
    keyPoint: 'Pénalités = outil contractuel à manier avec traçabilité.',
    activity: tf('p73', 'Les pénalités de retard prévues au contrat ne peuvent jamais être appliquées.', false, 'Faux. Elles s\'appliquent selon les clauses et les textes.'),
  },
  {
    title: 'Contrôle interne dans le service',
    track: 'comptabilite-publique',
    lesson: 'controles-financiers',
    content: [
      "Le contrôle interne, ce sont les procédures du service : double visa, check-list, séparation des tâches.",
      "Il précède le contrôle externe (inspection, Cour des comptes).",
      "Un service organisé réduit le stress des contrôles a posteriori.",
    ],
    keyPoint: 'Contrôle interne = première ligne de défense.',
    activity: mcq('p74', 'Le contrôle interne vise surtout à :', ['Remplacer le Code des marchés', 'Sécuriser les opérations au quotidien', 'Nommer l\'ARMP', 'Publier le DAO'], 1, 'Sécurisation quotidienne des actes.'),
  },
  {
    title: 'Inspection et Cour des comptes',
    track: 'comptabilite-publique',
    lesson: 'controles-financiers',
    content: [
      "L'Inspection générale des finances et la Cour des comptes interviennent sur la régularité et la bonne gestion.",
      "Préparez les dossiers demandés dans les délais ; la transparence vaut mieux que la rétention.",
      "Les observations formulées doivent être suivies d'actions correctives documentées.",
    ],
    keyPoint: 'Contrôle externe = répondre avec pièces et plan d\'action.',
    activity: tf('p75', 'On peut ignorer les demandes de la Cour des comptes sans conséquence.', false, 'Faux. Les contrôles externes s\'imposent.'),
  },
  {
    title: 'Cas intégré : de l\'AO au paiement',
    track: 'revision',
    content: [
      "Chaîne type : besoin → DAO → publicité → offres → évaluation → (DNCMP) → attribution → notification → contrat → exécution → réception → engagement/liquidation/ordonnancement → paiement comptable.",
      "Chaque maillon a ses acteurs et ses pièces.",
      "Visualisez cette chaîne pour situer votre rôle (PRMP, commission, ordonnateur, comptable…).",
    ],
    keyPoint: 'Voir la chaîne complète évite les raccourcis dangereux.',
    activity: mcq('p76', 'Le paiement intervient en principe :', ['Avant toute publicité', 'Après la chaîne de la dépense et contrôle du comptable', 'Uniquement par la PRMP', 'Sans pièces'], 1, 'Paiement en fin de chaîne, sous contrôle.'),
  },
  {
    title: 'Erreur matérielle dans une offre',
    track: 'commande-publique',
    lesson: 'evaluation-offres',
    content: [
      "Une erreur de calcul évidente peut parfois être corrigée selon les règles du DAO et la jurisprudence des bonnes pratiques.",
      "Ce n'est pas une invitation à renégocier discrètement une offre non conforme sur le fond.",
      "Toute correction doit être tracée et appliquée de façon égale à tous les candidats concernés.",
    ],
    keyPoint: 'Correction d\'erreur = égale, tracée, limitée.',
    activity: tf('p77', 'On peut modifier discrètement le prix d\'un seul ami après ouverture.', false, "Faux. L'égalité de traitement s'oppose à ce favoritisme."),
  },
  {
    title: 'Groupement d\'entreprises',
    track: 'commande-publique',
    content: [
      "Plusieurs entreprises peuvent se grouper pour soumissionner, selon les formes prévues (conjoint, solidaire…).",
      "Le DAO précise les exigences (mandat, responsabilité, capacités).",
      "Vérifiez la solidité du groupement : capacités cumulées, engagement de chaque membre.",
    ],
    keyPoint: 'Groupement = forme et responsabilités clarifiées dans le DAO.',
    activity: fill('p78', "Les règles du ___ précisent comment un groupement peut soumissionner.", 'DAO', 'Le DAO fixe les règles de candidature.', ['Dao']),
  },
  {
    title: 'Garantie de soumission et de bonne exécution',
    track: 'commande-publique',
    content: [
      "Des garanties (soumission, bonne exécution, retenue de garantie) sécurisent l'autorité contractante.",
      "Leur montant, durée et modalités de restitution sont fixés par les textes et le DAO/contrat.",
      "Gérer les garanties (appel, levée) fait partie de l'exécution administrative du marché.",
    ],
    keyPoint: 'Garanties = sécurité financière encadrée.',
    activity: mcq('p79', 'Les garanties de marché servent surtout à :', ["Payer les salaires de la commission", 'Sécuriser l\'autorité face aux risques du titulaire', 'Remplacer le budget', 'Éviter toute publicité'], 1, 'Sécurisation de l\'exécution et de la soumission.'),
  },
  {
    title: 'Recettes non fiscales',
    track: 'comptabilite-publique',
    lesson: 'recettes-publiques',
    content: [
      "Outre les impôts, l'État et les collectivités encaissent redevances, produits de services, cessions…",
      "Chaque type de recette a des règles d'assiette, de recouvrement et d'imputation.",
      "Le comptable intervient dans la chaîne d'encaissement selon son poste.",
    ],
    keyPoint: 'Recettes = cadre légal aussi strict que les dépenses.',
    activity: tf('p80', 'Les recettes publiques peuvent être encaissées sans aucune règle.', false, 'Faux. Le recouvrement est réglementé.'),
  },
  {
    title: 'Régies d\'avances et de recettes',
    track: 'comptabilite-publique',
    content: [
      "Des régies permettent, sous conditions, des encaissements ou paiements de proximité.",
      "Le régisseur rend compte au comptable ; les plafonds et justifications sont stricts.",
      "Une régie mal tenue est un risque élevé de manquant et de sanction.",
    ],
    keyPoint: 'Régie = délégation contrôlée, pas une caisse libre.',
    activity: mcq('p81', 'Le régisseur doit :', ['Ignorer le comptable', 'Rendre compte selon les règles de la régie', 'Attribuer les marchés', 'Modifier le DAO'], 1, 'Reddition de comptes au comptable / cadre de la régie.'),
  },
  {
    title: 'Plan de passation des marchés',
    track: 'commande-publique',
    content: [
      "Un plan annuel de passation aide à anticiper publicité, commissions, contrôles et délais budgétaires.",
      "Sans planification, les urgences artificielles se multiplient.",
      "Coordonnez le plan avec la programmation budgétaire de l'exercice.",
    ],
    keyPoint: 'Planifier la passation réduit les urgences de convenance.',
    activity: tf('p82', 'Il est inutile de planifier les marchés : tout se fait au dernier moment.', false, 'Faux. La planification est une bonne pratique de gouvernance.'),
  },
  {
    title: 'Formation continue des agents',
    track: 'revision',
    content: [
      "Les textes et les seuils évoluent ; les agents doivent mettre à jour leurs connaissances.",
      "Ingoma s'inscrit dans cette logique de microlearning régulier.",
      "Partagez en équipe les erreurs fréquentes détectées en contrôle pour progresser collectivement.",
    ],
    keyPoint: 'La compétence se maintient par la pratique et la formation.',
    activity: mcq('p83', 'Ingoma est :', ['Un avis juridique officiel', 'Un outil de formation continue', 'Un substitut à l\'ARMP', 'Un système de paiement'], 1, 'Outil pédagogique de microlearning.'),
  },
  {
    title: 'Éthique : cadeaux et invitations',
    track: 'commande-publique',
    lesson: 'integrite-ethique',
    content: [
      "Accepter cadeaux, voyages ou invitations d'un soumissionnaire pendant une procédure crée un risque de partialité.",
      "Les codes de conduite institutionnels fixent souvent des interdictions ou plafonds.",
      "En cas de doute, refusez et signalez à la hiérarchie.",
    ],
    keyPoint: 'Pendant la procédure : distance avec les candidats.',
    activity: tf('p84', "Accepter un voyage payé par un soumissionnaire pendant l'évaluation n'est jamais risqué.", false, 'Faux. C\'est un risque majeur de conflit d\'intérêts.'),
  },
  {
    title: 'Synthèse mois 1–2 : commande publique',
    track: 'revision',
    content: [
      "Retenez : principes (transparence, égalité, concurrence), acteurs (PRMP, DNCMP, ARMP), procédures selon seuils, DAO, évaluation collégiale, notification, exécution et intégrité.",
      "Chaque étape produit des pièces.",
      "Relisez le parcours Commande publique pour les détails.",
    ],
    keyPoint: 'Principes + acteurs + pièces = triptyque de base.',
    activity: fill('p85', "La procédure de droit commun est l'appel d'offres ___.", 'ouvert', "L'AO ouvert est le droit commun.", ['Ouvert']),
  },
  {
    title: 'Synthèse mois 2 : comptabilité publique',
    track: 'revision',
    content: [
      "Circuit E-L-O-P, séparation ordonnateur/comptable, crédits, imputation, pièces, service fait, SIGEFI, responsabilités.",
      "Le paiement n'est jamais 'automatique' : il clôt une chaîne de contrôles.",
      "Relisez le parcours Comptabilité publique pour approfondir.",
    ],
    keyPoint: 'E-L-O-P + séparation des fonctions.',
    activity: mcq('p86', 'Ordre correct :', ['Paiement → engagement', 'Engagement → liquidation → ordonnancement → paiement', 'Ordonnancement seul', 'Attribution → caisse'], 1, 'Circuit classique de la dépense.'),
  },
  {
    title: 'Cas final : choisir la procédure',
    track: 'commande-publique',
    lesson: 'procedures',
    content: [
      "Besoin standard, montant au-dessus des seuils de simplification, pas d'urgence réelle → en principe appel d'offres ouvert.",
      "Documentez pourquoi vous n'avez pas choisi une procédure exceptionnelle.",
      "Cette motivation écrite est votre meilleure défense en contrôle.",
    ],
    keyPoint: 'Droit commun par défaut ; exception motivée.',
    activity: tf('p87', 'Pour un besoin standard sans urgence, la procédure négociée est toujours le premier choix.', false, "Faux. L'AO ouvert est le droit commun."),
  },
  {
    title: 'Cas final : dossier de paiement',
    track: 'comptabilite-publique',
    lesson: 'pieces-justificatives',
    content: [
      "Checklist type : contrat/marché, engagement, PV de réception, facture conforme, liquidation, ordonnancement, éventuelles garanties.",
      "Présentez un dossier ordonné au comptable.",
      "Gagner du temps en amont évite les allers-retours et les tensions inutiles.",
    ],
    keyPoint: 'Dossier complet = paiement plus fluide et régulier.',
    activity: mcq('p88', 'Un dossier de paiement solide contient notamment :', ['Uniquement un SMS', 'Pièces de marché, service fait et chaîne de la dépense', 'Le seul nom de la PRMP', 'Aucun PV'], 1, 'Pièces de passation et d\'exécution + chaîne E-L-O.'),
  },
  {
    title: 'Auto-évaluation : où en êtes-vous ?',
    track: 'revision',
    content: [
      "Savez-vous expliquer en deux minutes la différence PRMP / DNCMP / ARMP ? Ordonnateur / comptable ?",
      "Si non, reprenez les jours concernés et le glossaire.",
      "L'objectif n'est pas de tout mémoriser d'un coup, mais de savoir où chercher et quels principes appliquer.",
    ],
    keyPoint: 'Savoir expliquer les rôles = maîtrise opérationnelle.',
    activity: fill('p89', "Le ___ public paie après contrôle de régularité.", 'comptable', 'Comptable public = paiement contrôlé.', ['Comptable']),
  },
  {
    title: 'Clôture du programme 90 jours',
    track: 'revision',
    content: [
      "Félicitations : vous avez parcouru un cycle de microlearning sur la commande et la comptabilité publiques au Burundi.",
      "Continuez via les parcours approfondis, le défi quotidien et l'assistant tuteur.",
      "Rappel final : Ingoma forme ; les textes officiels et votre institution tranchent en situation réelle.",
    ],
    keyPoint: 'Formation continue + textes officiels = pratique sécurisée.',
    activity: tf('p90', 'Ingoma remplace définitivement les textes officiels et les instructions de l\'institution.', false, "Faux. C'est un outil pédagogique, pas un avis juridique officiel."),
  },
]
