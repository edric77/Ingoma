import { useState, useEffect, useMemo } from 'react'
import type { ActivityItem } from '../../lib/catalog'
import { cn } from '../../lib/utils'

const DOMAIN_SWAPS: [RegExp, string][] = [
  [/Personne Responsable des Marchés Publics/gi, 'Direction Nationale du Contrôle des Marchés Publics'],
  [/Direction Nationale du Contrôle des Marchés Publics/gi, 'Autorité de Régulation des Marchés Publics'],
  [/Autorité de Régulation des Marchés Publics/gi, 'Personne Responsable des Marchés Publics'],
  [/contrôle a priori/gi, 'contrôle a posteriori'],
  [/contrôle a posteriori/gi, 'contrôle a priori'],
  [/ordonnateur/gi, 'comptable public'],
  [/comptable public/gi, 'ordonnateur'],
  [/engage, liquide et ordonnance/gi, 'prend en charge et paie'],
  [/prend en charge et paie/gi, 'engage, liquide et ordonnance'],
  [/exécution budgétaire/gi, 'passation des marchés'],
  [/passation des marchés/gi, 'exécution budgétaire'],
  [/intérêt personnel/gi, "intérêt de l'autorité contractante"],
  [/fonction publique/gi, 'activité commerciale'],
  [/agent désigné/gi, 'organe collégial'],
  [/autorité contractante/gi, 'soumissionnaire'],
]

function buildDistractors(correct: string, provided?: string[]): string[] {
  if (provided && provided.length >= 3) return provided.slice(0, 3)
  const out: string[] = []
  for (const [re, repl] of DOMAIN_SWAPS) {
    if (re.test(correct)) {
      const variant = correct.replace(re, repl)
      if (variant !== correct && !out.includes(variant)) out.push(variant)
    }
  }
  if (out.length < 3 && correct.includes('—')) {
    const [left, right] = correct.split('—').map((s) => s.trim())
    out.push(`${left} — rôle purement consultatif sans pouvoir de décision.`)
    out.push(`${left} — compétence exclusive du secteur privé.`)
    if (right) out.push(`Organe distinct — ${right}`)
  }
  return [...new Set(out)].filter((x) => x !== correct).slice(0, 3)
}

export function FlashcardActivity({
  activity,
  onResult,
}: {
  activity: Extract<ActivityItem, { type: 'flashcard' }>
  onResult: (c: boolean) => void
}) {
  const [phase, setPhase] = useState<'prompt' | 'answered'>('prompt')
  const [picked, setPicked] = useState<string | null>(null)

  const options = useMemo(() => {
    const correct = activity.back
    const distractors = buildDistractors(correct, activity.distractors)
    const pool = [correct, ...distractors]
    while (pool.length < 4) pool.push(correct + ' (hors cadre légal)')
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[pool[i], pool[j]] = [pool[j], pool[i]]
    }
    return pool.slice(0, 4)
  }, [activity.id, activity.back, activity.distractors])

  useEffect(() => {
    setPhase('prompt')
    setPicked(null)
  }, [activity.id])

  const isCorrect = picked === activity.back

  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-forest uppercase tracking-wide">Rappel actif</p>
      <div className="rounded-xl border-2 border-forest/30 bg-paper-light p-5 text-center">
        <p className="text-xs text-ink-muted mb-2">Quelle définition est exacte ?</p>
        <p className="font-serif text-xl font-semibold text-ink">{activity.front}</p>
      </div>
      {phase === 'prompt' && (
        <div className="space-y-2">
          {options.map((opt, i) => (
            <button
              key={opt + i}
              type="button"
              onClick={() => {
                setPicked(opt)
                setPhase('answered')
              }}
              className="w-full text-left rounded-xl border border-line bg-paper-light px-4 py-3 text-sm hover:border-forest/40 leading-snug"
            >
              <span className="text-forest font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          ))}
        </div>
      )}
      {phase === 'answered' && (
        <>
          <div className={cn('rounded-xl border p-3 text-sm', isCorrect ? 'border-forest/30 bg-forest/5' : 'border-red-flag/30 bg-red-flag/5')}>
            <p className="font-medium mb-1">{isCorrect ? 'Correct' : 'Incorrect'}</p>
            <p className="text-ink-muted">
              <span className="font-medium text-ink">{activity.front}</span> — {activity.back}
            </p>
          </div>
          <button type="button" onClick={() => onResult(isCorrect)} className="w-full rounded-xl bg-forest text-white font-medium py-3">
            Continuer
          </button>
        </>
      )}
    </div>
  )
}
