import { useParams, Link } from 'react-router-dom'
import { getLesson } from '../lib/catalog'
import { completeQuiz } from '../lib/progress'
import { ActivityPlayer } from '../components/activities/ActivityPlayer'
import { useState } from 'react'

export default function QuizPage() {
  const { track: trackSlug, lesson: lessonSlug } = useParams<{ track: string; lesson: string }>()
  const data = getLesson(trackSlug || '', lessonSlug || '')
  const [done, setDone] = useState(false)
  const [score, setScore] = useState(0)

  if (!data || !data.activities?.length) {
    return <p className="text-ink-muted">Activités introuvables.</p>
  }

  function handleComplete(pct: number) {
    completeQuiz(data!.id, pct)
    setScore(pct)
    setDone(true)
  }

  if (done) {
    const passed = score >= 70
    return (
      <div className="space-y-6 text-center pt-4">
        <p className="text-sm text-ink-muted">{data.title}</p>
        <p className="font-serif text-xl font-semibold text-ink">
          {passed ? "Parcours d'activités terminé" : 'Seuil 70 % non atteint'}
        </p>
        <p className="text-3xl font-semibold text-forest">{score}%</p>
        <div className="flex flex-col gap-2">
          <Link
            to={`/parcours/${trackSlug}`}
            className="rounded-xl bg-forest text-white font-medium py-3"
          >
            Retour au parcours
          </Link>
          {!passed && (
            <button
              type="button"
              onClick={() => {
                setDone(false)
                setScore(0)
              }}
              className="rounded-xl border border-line py-3 font-medium"
            >
              Réessayer
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-ink-muted uppercase tracking-wide">Défis d&apos;assimilation</p>
        <h1 className="font-serif text-xl font-semibold text-forest">{data.title}</h1>
      </div>
      <ActivityPlayer activities={data.activities} onComplete={handleComplete} />
    </div>
  )
}
