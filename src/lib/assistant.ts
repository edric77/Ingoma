/**
 * Assistant tuteur Ingoma — 100 % gratuit, sans API payante.
 * Répond à partir du catalogue pédagogique et du glossaire (retrieval local).
 */
import { TRACKS, GLOSSARY, getLesson } from './catalog'

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  text: string
  sources?: { title: string; href?: string }[]
}

type Chunk = {
  id: string
  title: string
  text: string
  trackSlug?: string
  lessonSlug?: string
  kind: 'glossary' | 'lesson' | 'keypoints' | 'faq'
}

const FAQ: { q: string[]; a: string }[] = [
  {
    q: ['bonjour', 'salut', 'hello', 'bonsoir'],
    a: "Bonjour. Je suis l'assistant tuteur Ingoma. Posez une question sur la commande publique ou la comptabilité publique au Burundi (ex. : « Qu'est-ce que la PRMP ? », « circuit de la dépense »).",
  },
  {
    q: ['qui es-tu', 'tu es qui', 'assistant'],
    a: "Je suis l'assistant pédagogique d'Ingoma. Je m'appuie uniquement sur le contenu de formation de l'application (leçons et glossaire). Je ne remplace pas un avis juridique officiel.",
  },
  {
    q: ['avis juridique', 'officiel', 'avocat'],
    a: "Ingoma est un outil de microlearning. Ce n'est pas un avis juridique officiel. En cas de doute opérationnel, consultez la PRMP, la DNCMP, l'ARMP ou le service compétent de votre institution.",
  },
  {
    q: ['points', 'score', 'classement', 'badge'],
    a: "Vous gagnez des points en terminant des leçons (+10), en réussissant les défis (≥70 % : +15, 100 % : +25), les cas pratiques (+30) et le défi du jour. La série (streak) et les badges récompensent la régularité. Voir Profil et Classement.",
  },
  {
    q: ['certificat'],
    a: "Le certificat s'obtient en terminant un parcours (leçons + défis + cas pratique). Il est imprimable depuis la page Certificat, avec votre nom.",
  },
]

function stripAccents(s: string) {
  return s.normalize('NFD').replace(/\p{M}/gu, '')
}

function tokenize(s: string): string[] {
  return stripAccents(s.toLowerCase())
    .replace(/[^a-z0-9àâäéèêëïîôùûüç\s-]/gi, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2)
}

function buildIndex(): Chunk[] {
  const chunks: Chunk[] = []

  for (const g of GLOSSARY) {
    chunks.push({
      id: `gl-${g.term}`,
      title: g.term,
      text: `${g.term} : ${g.definition}`,
      kind: 'glossary',
    })
  }

  for (const track of TRACKS) {
    for (const lesson of track.lessons) {
      chunks.push({
        id: lesson.id,
        title: lesson.title,
        text: [lesson.title, ...lesson.content, ...lesson.keyPoints].join(' '),
        trackSlug: track.slug,
        lessonSlug: lesson.slug,
        kind: 'lesson',
      })
      chunks.push({
        id: `${lesson.id}-kp`,
        title: `Points clés — ${lesson.title}`,
        text: lesson.keyPoints.join('. '),
        trackSlug: track.slug,
        lessonSlug: lesson.slug,
        kind: 'keypoints',
      })
    }
  }

  return chunks
}

const INDEX = buildIndex()

function scoreChunk(queryTokens: string[], chunk: Chunk): number {
  const hay = stripAccents(chunk.text.toLowerCase())
  const title = stripAccents(chunk.title.toLowerCase())
  let score = 0
  for (const t of queryTokens) {
    if (title === t || title.includes(t)) score += 8
    if (hay.includes(t)) score += 2
  }
  // Bonus acronymes exacts
  for (const t of queryTokens) {
    if (t.length <= 6 && title.toLowerCase() === t) score += 12
  }
  if (chunk.kind === 'glossary') score += 1
  return score
}

function matchFaq(q: string): string | null {
  const norm = stripAccents(q.toLowerCase())
  for (const f of FAQ) {
    if (f.q.some((k) => norm.includes(stripAccents(k)))) return f.a
  }
  return null
}

/** Différence entre A et B */
function tryDifference(q: string): string | null {
  const m = stripAccents(q.toLowerCase()).match(
    /difference entre\s+([\w'-]+)\s+et\s+([\w'-]+)/
  )
  if (!m) return null
  const a = m[1]
  const b = m[2]
  const ga = GLOSSARY.find((g) => stripAccents(g.term.toLowerCase()).includes(a))
  const gb = GLOSSARY.find((g) => stripAccents(g.term.toLowerCase()).includes(b))
  if (ga && gb) {
    return `**${ga.term}** : ${ga.definition}\n\n**${gb.term}** : ${gb.definition}\n\nRetenez la distinction : chaque acteur a un rôle séparé pour renforcer le contrôle et limiter les conflits d'intérêts.`
  }
  return null
}

export function askAssistant(question: string): {
  text: string
  sources: { title: string; href?: string }[]
} {
  const q = question.trim()
  if (!q) {
    return {
      text: 'Posez une question, par exemple : « Qu’est-ce que la DNCMP ? » ou « Quelles sont les étapes du circuit de la dépense ? »',
      sources: [],
    }
  }

  const faq = matchFaq(q)
  if (faq) return { text: faq, sources: [] }

  const diff = tryDifference(q)
  if (diff) {
    return {
      text: diff,
      sources: [{ title: 'Glossaire', href: '/glossaire' }],
    }
  }

  const tokens = tokenize(q)
  if (!tokens.length) {
    return {
      text: 'Reformulez avec des mots-clés (PRMP, ARMP, engagement, appel d’offres…).',
      sources: [],
    }
  }

  const ranked = INDEX.map((c) => ({ c, s: scoreChunk(tokens, c) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 4)

  if (!ranked.length) {
    return {
      text: "Je n'ai pas trouvé de passage correspondant dans le contenu Ingoma. Essayez un terme du glossaire (PRMP, DNCMP, ARMP, SIGEFI, ordonnateur, engagement…) ou ouvrez la leçon concernée.\n\nRappel : ceci n'est pas un avis juridique officiel.",
      sources: [{ title: 'Glossaire', href: '/glossaire' }],
    }
  }

  const top = ranked[0].c
  const sources: { title: string; href?: string }[] = []
  const seen = new Set<string>()

  for (const { c } of ranked) {
    const key = c.lessonSlug || c.title
    if (seen.has(key)) continue
    seen.add(key)
    if (c.kind === 'glossary') {
      sources.push({ title: `Glossaire · ${c.title}`, href: '/glossaire' })
    } else if (c.trackSlug && c.lessonSlug) {
      sources.push({
        title: c.title.replace(/^Points clés — /, ''),
        href: `/lecon/${c.trackSlug}/${c.lessonSlug}`,
      })
    }
  }

  // Réponse pédagogique structurée
  let text = ''
  if (top.kind === 'glossary') {
    text = `**${top.title}**\n\n${GLOSSARY.find((g) => g.term === top.title)?.definition || top.text}`
  } else if (top.kind === 'keypoints') {
    const lesson =
      top.trackSlug && top.lessonSlug
        ? getLesson(top.trackSlug, top.lessonSlug)
        : undefined
    text = `Voici l’essentiel sur **${lesson?.title || top.title}** :\n\n`
    if (lesson) {
      text += lesson.keyPoints.map((k, i) => `${i + 1}. ${k}`).join('\n')
      text += `\n\n${lesson.content[0] || ''}`
    } else {
      text += top.text
    }
  } else {
    const lesson =
      top.trackSlug && top.lessonSlug
        ? getLesson(top.trackSlug, top.lessonSlug)
        : undefined
    if (lesson) {
      text = `D’après la leçon **${lesson.title}** :\n\n`
      text += lesson.content.filter((p) => !p.toLowerCase().includes('avertissement')).slice(0, 2).join('\n\n')
      text += '\n\n**À retenir :**\n'
      text += lesson.keyPoints.map((k) => `• ${k}`).join('\n')
    } else {
      text = top.text
    }
  }

  text +=
    '\n\n— *Contenu pédagogique Ingoma. Pas un avis juridique officiel. En cas de doute, consultez les textes et votre institution.*'

  return { text, sources: sources.slice(0, 3) }
}

export const SUGGESTED_QUESTIONS = [
  'Qu’est-ce que la PRMP ?',
  'Différence entre DNCMP et ARMP',
  'Étapes du circuit de la dépense',
  'Rôle de l’ordonnateur',
  'Appel d’offres ouvert',
  'Qu’est-ce que le SIGEFI ?',
]
