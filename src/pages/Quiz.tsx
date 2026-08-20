import { useParams, Link } from 'react-router-dom'
import { getLesson } from '../lib/catalog'
import { completeQuiz } from '../lib/progress'
import { useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '../lib/utils'

export default function QuizPage() {
  const { track: trackSlug, lesson: lessonSlug } = useParams<{ track: string; lesson: string }>()
  const data = getLesson(trackSlug || '', lessonSlug || '')
  const questions = data?.quiz || []

  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)

  if (!data || questions.length === 0) {
    return <p className="text-ink-muted">Quiz introuvable.</p>
  }

  const q = questions[current]
  const isCorrect = selected === q.correctIndex

  function handleSelect(idx: number) {
    if (revealed) return
    setSelected(idx)
    setRevealed(true)
    if (idx === q.correctIndex) {
      setCorrectCount((c) => c + 1)
    }
  }

  function next() {
    if (current + 1 >= questions.length) {
      const finalPct = Math.round((correctCount / questions.length) * 100)
      completeQuiz(data!.id, finalPct)
      setFinished(true)
      return
    }
    setCurrent((c) => c + 1)
    setSelected(null)
    setRevealed(false)
  }

  if (finished) {
    const pct = Math.round((correctCount / questions.length) * 100)
    const passed = pct >= 70
    return (
      <div className="space-y-6 text-center pt-8">
        <div
          className={cn(
            "mx-auto size-16 rounded-full flex items-center justify-center",
            passed ? "bg-forest/15 text-forest" : "bg-red-flag/15 text-red-flag"
          )}
        >
          {passed ? <CheckCircle2 className="size-8" /> : <XCircle className="size-8" />}
        </div>
        <div>
          <h1 className="font-serif text-2xl font-semibold text-ink">
            {passed ? 'Quiz réussi' : 'Seuil non atteint'}
          </h1>
          <p className="text-3xl font-semibold text-forest mt-2">{pct}%</p>
          <p className="text-sm text-ink-muted mt-1">
            {correctCount}/{questions.length} bonnes réponses
            {passed ? ' · +15 à +25 points' : ' · Seuil de réussite : 70 %'}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Link
            to={`/parcours/${trackSlug}`}
            className="rounded-xl bg-forest text-white font-medium py-3"
          >
            Retour au parcours
          </Link>
          {!passed && (
            <button
              onClick={() => {
                setCurrent(0)
                setSelected(null)
                setRevealed(false)
                setCorrectCount(0)
                setFinished(false)
              }}
              className="rounded-xl border border-line py-3 text-ink font-medium"
            >
              Réessayer
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-ink-muted">
        <span>
          Question {current + 1}/{questions.length}
        </span>
        <span>{data.title}</span>
      </div>

      <div className="h-1.5 rounded-full bg-line overflow-hidden">
        <div
          className="h-full bg-forest transition-all"
          style={{ width: `${((current + (revealed ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      <h2 className="font-serif text-lg font-semibold text-ink leading-snug">
        {q.question}
      </h2>

      <div className="space-y-2">
        {q.choices.map((choice, idx) => {
          let style = "border-line bg-paper-light hover:border-forest/40"
          if (revealed) {
            if (idx === q.correctIndex) style = "border-forest bg-forest/10 text-forest"
            else if (idx === selected) style = "border-red-flag bg-red-flag/10 text-red-flag"
            else style = "border-line bg-paper-light opacity-60"
          } else if (selected === idx) {
            style = "border-forest bg-forest/5"
          }
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(idx)}
              disabled={revealed}
              className={cn(
                "w-full text-left rounded-xl border px-4 py-3 text-sm transition-colors",
                style
              )}
            >
              {choice}
            </button>
          )
        })}
      </div>

      {revealed && (
        <div
          className={cn(
            "rounded-xl border p-4 text-sm leading-relaxed",
            isCorrect ? "border-forest/30 bg-forest/5" : "border-red-flag/30 bg-red-flag/5"
          )}
        >
          <p className="font-medium mb-1">
            {isCorrect ? 'Correct' : 'Incorrect'}
          </p>
          <p className="text-ink-muted">{q.explanation}</p>
        </div>
      )}

      {revealed && (
        <button
          onClick={next}
          className="w-full rounded-xl bg-forest text-white font-medium py-3"
        >
          {current + 1 >= questions.length ? 'Voir le résultat' : 'Question suivante'}
        </button>
      )}
    </div>
  )
}
