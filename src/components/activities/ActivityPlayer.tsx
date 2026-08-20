import { useState, useEffect, useMemo } from 'react'
import type { ActivityItem } from '../../lib/catalog'
import { cn } from '../../lib/utils'
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react'

type Props = {
  activities: ActivityItem[]
  onComplete: (scorePercent: number) => void
}

export function ActivityPlayer({ activities, onComplete }: Props) {
  const [idx, setIdx] = useState(0)
  const [results, setResults] = useState<boolean[]>([])
  const [finished, setFinished] = useState(false)

  const current = activities[idx]
  const scorePct = results.length
    ? Math.round((results.filter(Boolean).length / results.length) * 100)
    : 0

  function handleResult(correct: boolean) {
    const next = [...results, correct]
    setResults(next)
    if (idx + 1 >= activities.length) {
      const pct = Math.round((next.filter(Boolean).length / next.length) * 100)
      setFinished(true)
      onComplete(pct)
    } else {
      setIdx((i) => i + 1)
    }
  }

  if (finished) {
    const passed = scorePct >= 70
    return (
      <div className="text-center space-y-4 py-6">
        <div
          className={cn(
            'mx-auto size-16 rounded-full flex items-center justify-center',
            passed ? 'bg-forest/15 text-forest' : 'bg-red-flag/15 text-red-flag'
          )}
        >
          {passed ? <CheckCircle2 className="size-8" /> : <XCircle className="size-8" />}
        </div>
        <p className="font-serif text-2xl font-semibold text-ink">
          {passed ? 'Défi réussi' : 'À retravailler'}
        </p>
        <p className="text-3xl font-semibold text-forest">{scorePct}%</p>
        <p className="text-sm text-ink-muted">
          {results.filter(Boolean).length}/{results.length} réussis
        </p>
      </div>
    )
  }

  if (!current) return null

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-xs text-ink-muted">
        <span>Activité {idx + 1}/{activities.length}</span>
        <span className="capitalize">{labelType(current.type)}</span>
      </div>
      <div className="h-1.5 rounded-full bg-line overflow-hidden">
        <div
          className="h-full bg-forest transition-all"
          style={{ width: `${(idx / activities.length) * 100}%` }}
        />
      </div>
      {current.type === 'mcq' && <Mcq activity={current} onResult={handleResult} />}
      {current.type === 'truefalse' && <TrueFalse activity={current} onResult={handleResult} />}
      {current.type === 'flashcard' && <Flashcard activity={current} onResult={handleResult} />}
      {current.type === 'fillblank' && <FillBlank activity={current} onResult={handleResult} />}
      {current.type === 'order' && <Order activity={current} onResult={handleResult} />}
      {current.type === 'match' && <Match activity={current} onResult={handleResult} />}
      {current.type === 'dragdrop' && <DragDrop activity={current} onResult={handleResult} />}
      {current.type === 'decision' && <Decision activity={current} onResult={handleResult} />}
    </div>
  )
}

function labelType(t: string) {
  const map: Record<string, string> = {
    mcq: 'QCM',
    truefalse: 'Vrai / Faux',
    flashcard: 'Flashcard',
    fillblank: 'Texte à trous',
    order: 'Ordonnancement',
    match: 'Association',
    dragdrop: 'Glisser-déposer',
    decision: 'Prise de décision',
  }
  return map[t] || t
}

function Mcq({
  activity,
  onResult,
}: {
  activity: Extract<ActivityItem, { type: 'mcq' }>
  onResult: (c: boolean) => void
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [timeLeft, setTimeLeft] = useState(activity.timedSeconds ?? 0)

  useEffect(() => {
    if (!activity.timedSeconds || revealed) return
    if (timeLeft <= 0) {
      setRevealed(true)
      return
    }
    const t = setTimeout(() => setTimeLeft((x) => x - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, activity.timedSeconds, revealed])

  useEffect(() => {
    setSelected(null)
    setRevealed(false)
    setTimeLeft(activity.timedSeconds ?? 0)
  }, [activity.id])

  const isCorrect = selected === activity.correctIndex

  return (
    <div className="space-y-4">
      {activity.timedSeconds && !revealed && (
        <div className="text-center">
          <span
            className={cn(
              'inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium tabular-nums',
              timeLeft <= 10 ? 'bg-red-flag/15 text-red-flag' : 'bg-forest/10 text-forest'
            )}
          >
            {timeLeft}s
          </span>
        </div>
      )}
      <h3 className="font-serif text-lg font-semibold text-ink leading-snug">{activity.question}</h3>
      <div className="space-y-2">
        {activity.choices.map((c, i) => {
          let style = 'border-line bg-paper-light hover:border-forest/40'
          if (revealed) {
            if (i === activity.correctIndex) style = 'border-forest bg-forest/10 text-forest'
            else if (i === selected) style = 'border-red-flag bg-red-flag/10 text-red-flag'
            else style = 'border-line opacity-50'
          } else if (selected === i) style = 'border-forest bg-forest/5'
          return (
            <button
              key={i}
              type="button"
              disabled={revealed || (activity.timedSeconds !== undefined && timeLeft <= 0)}
              onClick={() => {
                if (revealed) return
                setSelected(i)
                setRevealed(true)
              }}
              className={cn('w-full text-left rounded-xl border px-4 py-3 text-sm transition-colors', style)}
            >
              {c}
            </button>
          )
        })}
      </div>
      {revealed && (
        <>
          <div
            className={cn(
              'rounded-xl border p-3 text-sm',
              isCorrect ? 'border-forest/30 bg-forest/5' : 'border-red-flag/30 bg-red-flag/5'
            )}
          >
            <p className="font-medium mb-1">
              {isCorrect ? 'Correct' : timeLeft <= 0 && selected === null ? 'Temps écoulé' : 'Incorrect'}
            </p>
            <p className="text-ink-muted">{activity.explanation}</p>
          </div>
          <button
            type="button"
            onClick={() => onResult(isCorrect)}
            className="w-full rounded-xl bg-forest text-white font-medium py-3 flex items-center justify-center gap-2"
          >
            Continuer <ChevronRight className="size-4" />
          </button>
        </>
      )}
    </div>
  )
}

function TrueFalse({
  activity,
  onResult,
}: {
  activity: Extract<ActivityItem, { type: 'truefalse' }>
  onResult: (c: boolean) => void
}) {
  const [choice, setChoice] = useState<boolean | null>(null)
  const [revealed, setRevealed] = useState(false)
  const isCorrect = choice === activity.correct

  useEffect(() => {
    setChoice(null)
    setRevealed(false)
  }, [activity.id])

  return (
    <div className="space-y-4">
      <h3 className="font-serif text-lg font-semibold text-ink leading-snug">{activity.statement}</h3>
      <div className="grid grid-cols-2 gap-3">
        {[true, false].map((v) => {
          let style = 'border-line bg-paper-light'
          if (revealed) {
            if (v === activity.correct) style = 'border-forest bg-forest/10 text-forest'
            else if (v === choice) style = 'border-red-flag bg-red-flag/10 text-red-flag'
            else style = 'opacity-50'
          } else if (choice === v) style = 'border-forest bg-forest/5'
          return (
            <button
              key={String(v)}
              type="button"
              disabled={revealed}
              onClick={() => {
                setChoice(v)
                setRevealed(true)
              }}
              className={cn('rounded-xl border py-4 font-medium text-sm transition-colors', style)}
            >
              {v ? 'Vrai' : 'Faux'}
            </button>
          )
        })}
      </div>
      {revealed && (
        <>
          <div
            className={cn(
              'rounded-xl border p-3 text-sm',
              isCorrect ? 'border-forest/30 bg-forest/5' : 'border-red-flag/30 bg-red-flag/5'
            )}
          >
            <p className="font-medium mb-1">{isCorrect ? 'Correct' : 'Incorrect'}</p>
            <p className="text-ink-muted">{activity.explanation}</p>
          </div>
          <button type="button" onClick={() => onResult(!!isCorrect)} className="w-full rounded-xl bg-forest text-white font-medium py-3">
            Continuer
          </button>
        </>
      )}
    </div>
  )
}

function Flashcard({
  activity,
  onResult,
}: {
  activity: Extract<ActivityItem, { type: 'flashcard' }>
  onResult: (c: boolean) => void
}) {
  const [flipped, setFlipped] = useState(false)
  useEffect(() => setFlipped(false), [activity.id])

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="w-full min-h-[140px] rounded-xl border-2 border-forest/30 bg-paper-light p-6 text-center shadow-sm active:scale-[0.99] transition-transform"
      >
        <p className="text-xs text-ink-muted mb-2">{flipped ? 'Définition' : 'Terme'} · appuyer pour retourner</p>
        <p className="font-serif text-lg font-semibold text-ink">{flipped ? activity.back : activity.front}</p>
      </button>
      {flipped && (
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={() => onResult(false)} className="rounded-xl border border-line py-3 text-sm font-medium">
            À revoir
          </button>
          <button type="button" onClick={() => onResult(true)} className="rounded-xl bg-forest text-white py-3 text-sm font-medium">
            Je sais
          </button>
        </div>
      )}
    </div>
  )
}

function FillBlank({
  activity,
  onResult,
}: {
  activity: Extract<ActivityItem, { type: 'fillblank' }>
  onResult: (c: boolean) => void
}) {
  const [value, setValue] = useState('')
  const [revealed, setRevealed] = useState(false)
  useEffect(() => {
    setValue('')
    setRevealed(false)
  }, [activity.id])

  const normalized = (s: string) => s.trim().toLowerCase()
  const ok =
    normalized(value) === normalized(activity.answer) ||
    (activity.alternatives || []).some((a) => normalized(a) === normalized(value))
  const parts = activity.text.split('___')

  return (
    <div className="space-y-4">
      <p className="text-ink leading-relaxed">
        {parts[0]}
        <input
          type="text"
          value={value}
          disabled={revealed}
          onChange={(e) => setValue(e.target.value)}
          className="inline-block mx-1 w-32 border-b-2 border-forest bg-transparent px-1 text-center font-medium outline-none"
          placeholder="…"
        />
        {parts[1] || ''}
      </p>
      {!revealed ? (
        <button type="button" disabled={!value.trim()} onClick={() => setRevealed(true)} className="w-full rounded-xl bg-forest text-white font-medium py-3 disabled:opacity-50">
          Valider
        </button>
      ) : (
        <>
          <div className={cn('rounded-xl border p-3 text-sm', ok ? 'border-forest/30 bg-forest/5' : 'border-red-flag/30 bg-red-flag/5')}>
            <p className="font-medium mb-1">{ok ? 'Correct' : `Réponse : ${activity.answer}`}</p>
            <p className="text-ink-muted">{activity.explanation}</p>
          </div>
          <button type="button" onClick={() => onResult(ok)} className="w-full rounded-xl bg-forest text-white font-medium py-3">
            Continuer
          </button>
        </>
      )}
    </div>
  )
}

function Order({
  activity,
  onResult,
}: {
  activity: Extract<ActivityItem, { type: 'order' }>
  onResult: (c: boolean) => void
}) {
  const [order, setOrder] = useState(() => activity.items.map((_, i) => i))
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const idx = activity.items.map((_, i) => i)
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[idx[i], idx[j]] = [idx[j], idx[i]]
    }
    setOrder(idx)
    setRevealed(false)
  }, [activity.id])

  function move(i: number, dir: -1 | 1) {
    if (revealed) return
    const j = i + dir
    if (j < 0 || j >= order.length) return
    const next = [...order]
    ;[next[i], next[j]] = [next[j], next[i]]
    setOrder(next)
  }

  const isCorrect =
    order.length === activity.correctOrder.length && order.every((v, i) => v === activity.correctOrder[i])

  return (
    <div className="space-y-4">
      <h3 className="font-serif text-lg font-semibold text-ink">{activity.prompt}</h3>
      <p className="text-xs text-ink-muted">Utilisez ↑ ↓ pour réordonner</p>
      <ul className="space-y-2">
        {order.map((itemIdx, pos) => (
          <li
            key={itemIdx}
            className={cn(
              'flex items-center gap-2 rounded-xl border bg-paper-light px-3 py-2.5 text-sm',
              revealed && (itemIdx === activity.correctOrder[pos] ? 'border-forest bg-forest/10' : 'border-red-flag/40')
            )}
          >
            <span className="text-ink-muted tabular-nums w-5">{pos + 1}.</span>
            <span className="flex-1">{activity.items[itemIdx]}</span>
            {!revealed && (
              <span className="flex gap-1">
                <button type="button" onClick={() => move(pos, -1)} className="px-2 py-1 rounded border border-line text-xs">↑</button>
                <button type="button" onClick={() => move(pos, 1)} className="px-2 py-1 rounded border border-line text-xs">↓</button>
              </span>
            )}
          </li>
        ))}
      </ul>
      {!revealed ? (
        <button type="button" onClick={() => setRevealed(true)} className="w-full rounded-xl bg-forest text-white font-medium py-3">
          Valider l&apos;ordre
        </button>
      ) : (
        <>
          <div className={cn('rounded-xl border p-3 text-sm', isCorrect ? 'border-forest/30 bg-forest/5' : 'border-red-flag/30 bg-red-flag/5')}>
            <p className="font-medium mb-1">{isCorrect ? 'Correct' : 'Ordre incorrect'}</p>
            <p className="text-ink-muted">{activity.explanation}</p>
          </div>
          <button type="button" onClick={() => onResult(isCorrect)} className="w-full rounded-xl bg-forest text-white font-medium py-3">
            Continuer
          </button>
        </>
      )}
    </div>
  )
}

function Match({
  activity,
  onResult,
}: {
  activity: Extract<ActivityItem, { type: 'match' }>
  onResult: (c: boolean) => void
}) {
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

  useEffect(() => {
    setSelectedLeft(null)
    setMatched({})
    setWrong(null)
    setRevealed(false)
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
      setTimeout(() => setWrong(null), 600)
    }
  }

  const allDone = Object.keys(matched).length === activity.pairs.length

  return (
    <div className="space-y-4">
      <h3 className="font-serif text-lg font-semibold text-ink">{activity.prompt}</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {lefts.map((l) => (
            <button
              key={l}
              type="button"
              disabled={!!matched[l] || revealed}
              onClick={() => setSelectedLeft(l)}
              className={cn(
                'w-full rounded-xl border px-3 py-2.5 text-sm text-left',
                matched[l] ? 'border-forest bg-forest/10 text-forest' : selectedLeft === l ? 'border-forest bg-forest/5' : 'border-line bg-paper-light'
              )}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {rights.map((r) => {
            const used = Object.values(matched).includes(r)
            return (
              <button
                key={r}
                type="button"
                disabled={used || !selectedLeft || revealed}
                onClick={() => pickRight(r)}
                className={cn(
                  'w-full rounded-xl border px-3 py-2.5 text-sm text-left',
                  used ? 'border-forest bg-forest/10 text-forest' : wrong === r ? 'border-red-flag bg-red-flag/10' : 'border-line bg-paper-light'
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
          <div className="rounded-xl border border-forest/30 bg-forest/5 p-3 text-sm">
            <p className="font-medium mb-1">Associations correctes</p>
            <p className="text-ink-muted">{activity.explanation}</p>
          </div>
          <button type="button" onClick={() => onResult(true)} className="w-full rounded-xl bg-forest text-white font-medium py-3">
            Continuer
          </button>
        </>
      )}
    </div>
  )
}

function DragDrop({
  activity,
  onResult,
}: {
  activity: Extract<ActivityItem, { type: 'dragdrop' }>
  onResult: (c: boolean) => void
}) {
  const [assignments, setAssignments] = useState<Record<string, string>>({})
  const [selected, setSelected] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    setAssignments({})
    setSelected(null)
    setRevealed(false)
  }, [activity.id])

  const remaining = activity.items.filter((i) => !assignments[i])

  function assign(catId: string) {
    if (!selected) return
    setAssignments((a) => ({ ...a, [selected]: catId }))
    setSelected(null)
  }

  const allAssigned = activity.items.every((i) => assignments[i])
  let correctCount = 0
  if (revealed) {
    for (const item of activity.items) {
      const cat = activity.categories.find((c) => c.id === assignments[item])
      if (cat?.correctItems.includes(item)) correctCount++
    }
  }
  const isCorrect = revealed && correctCount === activity.items.length

  return (
    <div className="space-y-4">
      <h3 className="font-serif text-lg font-semibold text-ink">{activity.prompt}</h3>
      <p className="text-xs text-ink-muted">Touchez un élément puis une catégorie</p>
      <div className="flex flex-wrap gap-2">
        {remaining.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setSelected(item)}
            className={cn('rounded-lg border px-3 py-2 text-sm', selected === item ? 'border-forest bg-forest/10' : 'border-line bg-paper-light')}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid gap-2">
        {activity.categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => !revealed && assign(cat.id)}
            className="rounded-xl border border-line bg-paper-light p-3 text-left min-h-[64px]"
          >
            <p className="text-xs font-medium text-forest mb-1">{cat.label}</p>
            <div className="flex flex-wrap gap-1">
              {Object.entries(assignments)
                .filter(([, c]) => c === cat.id)
                .map(([item]) => (
                  <span
                    key={item}
                    className={cn(
                      'rounded-md px-2 py-0.5 text-xs',
                      revealed
                        ? cat.correctItems.includes(item)
                          ? 'bg-forest/20 text-forest'
                          : 'bg-red-flag/20 text-red-flag'
                        : 'bg-line text-ink'
                    )}
                  >
                    {item}
                  </span>
                ))}
            </div>
          </button>
        ))}
      </div>
      {allAssigned && !revealed && (
        <button type="button" onClick={() => setRevealed(true)} className="w-full rounded-xl bg-forest text-white font-medium py-3">
          Valider
        </button>
      )}
      {revealed && (
        <>
          <div className={cn('rounded-xl border p-3 text-sm', isCorrect ? 'border-forest/30 bg-forest/5' : 'border-red-flag/30 bg-red-flag/5')}>
            <p className="font-medium mb-1">{isCorrect ? 'Parfait' : `${correctCount}/${activity.items.length} corrects`}</p>
            <p className="text-ink-muted">{activity.explanation}</p>
          </div>
          <button type="button" onClick={() => onResult(isCorrect)} className="w-full rounded-xl bg-forest text-white font-medium py-3">
            Continuer
          </button>
        </>
      )}
    </div>
  )
}

function Decision({
  activity,
  onResult,
}: {
  activity: Extract<ActivityItem, { type: 'decision' }>
  onResult: (c: boolean) => void
}) {
  const [choiceId, setChoiceId] = useState<string | null>(null)
  const choice = activity.choices.find((c) => c.id === choiceId)

  useEffect(() => setChoiceId(null), [activity.id])

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-line bg-paper-light p-4 text-sm">
        <p className="text-xs font-medium text-forest mb-1">Rôle : {activity.role}</p>
        <p className="text-ink leading-relaxed">{activity.scenario}</p>
      </div>
      {!choice ? (
        <div className="space-y-2">
          {activity.choices.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setChoiceId(c.id)}
              className="w-full text-left rounded-xl border border-line bg-paper-light px-4 py-3 text-sm hover:border-forest/40"
            >
              {c.label}
            </button>
          ))}
        </div>
      ) : (
        <>
          <div className={cn('rounded-xl border p-4 text-sm space-y-2', choice.correct ? 'border-forest/30 bg-forest/5' : 'border-red-flag/30 bg-red-flag/5')}>
            <p className="font-medium">{choice.correct ? 'Bonne décision' : 'Décision risquée'}</p>
            <p className="text-ink-muted">{choice.consequence}</p>
            <p className="text-ink pt-2 border-t border-line/60">{activity.debrief}</p>
          </div>
          <button type="button" onClick={() => onResult(choice.correct)} className="w-full rounded-xl bg-forest text-white font-medium py-3">
            Continuer
          </button>
        </>
      )}
    </div>
  )
}
