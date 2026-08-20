import { Link, useParams, useNavigate } from 'react-router-dom'
import { getLesson } from '../lib/catalog'
import { completeLesson, getProgress } from '../lib/progress'
import { useState } from 'react'
import { ArrowRight, Check, Gamepad2 } from 'lucide-react'

export default function LessonPage() {
  const { track: trackSlug, lesson: lessonSlug } = useParams<{ track: string; lesson: string }>()
  const data = getLesson(trackSlug || '', lessonSlug || '')
  const navigate = useNavigate()
  const [done, setDone] = useState(() => {
    if (!data) return false
    return getProgress().completedLessons.includes(data.id)
  })

  if (!data) {
    return <p className="text-ink-muted">Leçon introuvable.</p>
  }

  const activityTypes = [...new Set(data.activities.map((a) => a.type))]

  function markDone() {
    completeLesson(data!.id)
    setDone(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-ink-muted uppercase tracking-wide">
          {trackSlug?.replace(/-/g, ' ')} · {data.durationMin} min
        </p>
        <h1 className="font-serif text-2xl font-semibold text-forest mt-1">{data.title}</h1>
      </div>

      <div className="space-y-4 text-ink leading-relaxed text-sm">
        {data.content.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="rounded-xl border border-line bg-paper-light p-4">
        <h2 className="font-serif font-semibold text-ink mb-2">Points clés</h2>
        <ul className="space-y-1.5">
          {data.keyPoints.map((k, i) => (
            <li key={i} className="flex gap-2 text-sm">
              <span className="text-forest mt-0.5">•</span>
              <span>{k}</span>
            </li>
          ))}
        </ul>
      </div>

      {activityTypes.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {activityTypes.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 rounded-full bg-forest/10 text-forest text-xs px-2.5 py-1"
            >
              <Gamepad2 className="size-3" />
              {t === 'mcq' && 'QCM'}
              {t === 'truefalse' && 'Vrai/Faux'}
              {t === 'flashcard' && 'Flashcards'}
              {t === 'fillblank' && 'Texte à trous'}
              {t === 'order' && 'Ordonnancement'}
              {t === 'match' && 'Association'}
              {t === 'dragdrop' && 'Glisser-déposer'}
              {t === 'decision' && 'Décision'}
            </span>
          ))}
        </div>
      )}

      <p className="text-xs text-ink-muted leading-relaxed">
        Contenu pédagogique uniquement — non constitutif d&apos;avis juridique officiel.
      </p>

      <div className="flex flex-col gap-2">
        {!done ? (
          <button
            type="button"
            onClick={markDone}
            className="w-full rounded-xl border border-forest text-forest font-medium py-3 flex items-center justify-center gap-2 hover:bg-forest/5"
          >
            <Check className="size-4" />
            Marquer comme lue (+10 pts)
          </button>
        ) : (
          <p className="text-center text-sm text-forest font-medium">Leçon terminée ✓</p>
        )}
        <button
          type="button"
          onClick={() => navigate(`/quiz/${trackSlug}/${lessonSlug}`)}
          className="w-full rounded-xl bg-forest text-white font-medium py-3 flex items-center justify-center gap-2"
        >
          Lancer les défis ({data.activities.length})
          <ArrowRight className="size-4" />
        </button>
        <Link
          to={`/parcours/${trackSlug}`}
          className="text-center text-sm text-ink-muted hover:text-ink py-2"
        >
          Retour au parcours
        </Link>
      </div>
    </div>
  )
}
