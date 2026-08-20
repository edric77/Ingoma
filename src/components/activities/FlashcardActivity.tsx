import { useState, useEffect, useMemo } from 'react'
import type { ActivityItem } from '../../lib/catalog'
import { cn } from '../../lib/utils'

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
    const bank = [
      "Agent qui paie les dépenses sans contrôle préalable",
      "Instance qui rédige uniquement les DAO des entreprises",
      "Procédure de gré à gré sans aucune publicité obligatoire",
      "Organe chargé uniquement de la paie des agents de l'État",
      "Registre commercial des sociétés privées",
      "Taxe communale sans lien avec l'exécution budgétaire",
      "Décision orale remplaçant tout engagement écrit",
      "Contrôle exercé uniquement après prescription des délais",
    ]
    const distractors = bank.filter((b) => b !== correct)
    for (let i = distractors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[distractors[i], distractors[j]] = [distractors[j], distractors[i]]
    }
    const pool = [correct, ...distractors.slice(0, 3)]
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[pool[i], pool[j]] = [pool[j], pool[i]]
    }
    return pool
  }, [activity.id, activity.back])

  useEffect(() => {
    setPhase('prompt')
    setPicked(null)
  }, [activity.id])

  const isCorrect = picked === activity.back

  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-forest uppercase tracking-wide">Rappel actif</p>
      <div className="rounded-xl border-2 border-forest/30 bg-paper-light p-5 text-center">
        <p className="text-xs text-ink-muted mb-2">Quel est le sens de ce terme ?</p>
        <p className="font-serif text-xl font-semibold text-ink">{activity.front}</p>
      </div>

      {phase === 'prompt' && (
        <div className="space-y-2">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                setPicked(opt)
                setPhase('answered')
              }}
              className="w-full text-left rounded-xl border border-line bg-paper-light px-4 py-3 text-sm hover:border-forest/40"
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {phase === 'answered' && (
        <>
          <div
            className={cn(
              'rounded-xl border p-3 text-sm',
              isCorrect ? 'border-forest/30 bg-forest/5' : 'border-red-flag/30 bg-red-flag/5'
            )}
          >
            <p className="font-medium mb-1">{isCorrect ? 'Correct' : 'Incorrect'}</p>
            <p className="text-ink-muted">
              <span className="font-medium text-ink">{activity.front}</span> — {activity.back}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onResult(isCorrect)}
            className="w-full rounded-xl bg-forest text-white font-medium py-3"
          >
            Continuer
          </button>
        </>
      )}
    </div>
  )
}
