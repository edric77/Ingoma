import { useState, useEffect, useMemo } from 'react'
import type { ActivityItem } from '../../lib/catalog'
import { cn } from '../../lib/utils'

export function MatchActivity({
  activity,
  onResult,
}: {
  activity: Extract<ActivityItem, { type: 'match' }>
  onResult: (c: boolean) => void
}) {
  const PAIR_STYLES = [
    { bg: 'bg-emerald-100', border: 'border-emerald-500', text: 'text-emerald-900', ring: 'ring-emerald-400', dot: 'bg-emerald-500' },
    { bg: 'bg-sky-100', border: 'border-sky-500', text: 'text-sky-900', ring: 'ring-sky-400', dot: 'bg-sky-500' },
    { bg: 'bg-amber-100', border: 'border-amber-500', text: 'text-amber-900', ring: 'ring-amber-400', dot: 'bg-amber-500' },
    { bg: 'bg-rose-100', border: 'border-rose-500', text: 'text-rose-900', ring: 'ring-rose-400', dot: 'bg-rose-500' },
    { bg: 'bg-teal-100', border: 'border-teal-500', text: 'text-teal-900', ring: 'ring-teal-400', dot: 'bg-teal-500' },
    { bg: 'bg-indigo-100', border: 'border-indigo-500', text: 'text-indigo-900', ring: 'ring-indigo-400', dot: 'bg-indigo-500' },
  ]

  const colorByLeft = useMemo(() => {
    const m: Record<string, (typeof PAIR_STYLES)[0]> = {}
    activity.pairs.forEach((p, i) => {
      m[p.left] = PAIR_STYLES[i % PAIR_STYLES.length]
    })
    return m
  }, [activity.id])

  const lefts = activity.pairs.map((p) => p.left)
  const rights = useMemo(() => {
    const r = activity.pairs.map((p) => p.right)
    for (let i = r.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[r[i], r[j]] = [r[j], r[i]]
    }
    return r
  }, [activity.id])

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [matched, setMatched] = useState<Record<string, string>>({})
  const [wrong, setWrong] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [errors, setErrors] = useState(0)

  useEffect(() => {
    setSelectedLeft(null)
    setMatched({})
    setWrong(null)
    setRevealed(false)
    setErrors(0)
  }, [activity.id])

  function pickRight(right: string) {
    if (!selectedLeft || matched[selectedLeft]) return
    const correct = activity.pairs.find((p) => p.left === selectedLeft)?.right === right
    if (correct) {
      setMatched((m) => ({ ...m, [selectedLeft]: right }))
      setSelectedLeft(null)
      setWrong(null)
    } else {
      setWrong(right)
      setErrors((e) => e + 1)
      setTimeout(() => setWrong(null), 700)
    }
  }

  const allDone = Object.keys(matched).length === activity.pairs.length
  const success = allDone && errors <= 1

  return (
    <div className="space-y-4">
      <h3 className="font-serif text-lg font-semibold text-ink">{activity.prompt}</h3>
      <p className="text-xs text-ink-muted">
        Touchez un terme à gauche (sa couleur s&apos;affiche), puis la définition. Chaque paire a sa propre couleur.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {lefts.map((l) => {
            const style = colorByLeft[l]
            const isMatched = !!matched[l]
            const isSelected = selectedLeft === l
            return (
              <button
                key={l}
                type="button"
                disabled={isMatched || revealed}
                onClick={() => setSelectedLeft(l)}
                className={cn(
                  'w-full rounded-xl border-2 px-3 py-2.5 text-sm text-left flex items-center gap-2 transition-colors',
                  isMatched && `${style.bg} ${style.border} ${style.text}`,
                  isSelected && !isMatched && `ring-2 ${style.ring} ${style.bg} ${style.border}`,
                  !isMatched && !isSelected && 'border-line bg-paper-light'
                )}
              >
                <span className={cn('size-2.5 rounded-full shrink-0', style.dot)} />
                {l}
              </button>
            )
          })}
        </div>
        <div className="space-y-2">
          {rights.map((r) => {
            const leftOf = Object.entries(matched).find(([, right]) => right === r)?.[0]
            const used = !!leftOf
            const style = leftOf ? colorByLeft[leftOf] : null
            return (
              <button
                key={r}
                type="button"
                disabled={used || !selectedLeft || revealed}
                onClick={() => pickRight(r)}
                className={cn(
                  'w-full rounded-xl border-2 px-3 py-2.5 text-sm text-left transition-colors',
                  used && style && `${style.bg} ${style.border} ${style.text}`,
                  wrong === r && 'border-red-flag bg-red-flag/10',
                  !used && wrong !== r && 'border-line bg-paper-light'
                )}
              >
                {r}
              </button>
            )
          })}
        </div>
      </div>
      {allDone && !revealed && (
        <button type="button" onClick={() => setRevealed(true)} className="w-full rounded-xl bg-forest text-white font-medium py-3">
          Voir le bilan
        </button>
      )}
      {revealed && (
        <>
          <div className={cn('rounded-xl border p-3 text-sm', success ? 'border-forest/30 bg-forest/5' : 'border-red-flag/30 bg-red-flag/5')}>
            <p className="font-medium mb-1">
              {success ? 'Associations correctes' : `Réussi avec ${errors} erreur(s) — à revoir`}
            </p>
            <p className="text-ink-muted">{activity.explanation}</p>
          </div>
          <button type="button" onClick={() => onResult(success)} className="w-full rounded-xl bg-forest text-white font-medium py-3">
            Continuer
          </button>
        </>
      )}
    </div>
  )
}
