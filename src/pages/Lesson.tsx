import { Link, useParams, useNavigate } from 'react-router-dom'
import { getLesson } from '../lib/catalog'
import { completeLesson, getProgress } from '../lib/progress'
import { useState } from 'react'
import { ArrowRight, Check, Gamepad2 } from 'lucide-react'
import { LessonDiagram } from '../components/LessonDiagram'

const STEP_COLORS = [
  'bg-forest/15 text-forest border-forest/30',
  'bg-sky-100 text-sky-900 border-sky-300',
  'bg-amber-100 text-amber-900 border-amber-300',
  'bg-rose-100 text-rose-900 border-rose-300',
]

export default function LessonPage() {
  const { track: trackSlug, lesson: lessonSlug } = useParams<{ track: string; lesson: string }>()
  const data = getLesson(trackSlug || '', lessonSlug || '')
  const navigate = useNavigate()
  const [done, setDone] = useState(() => {
    if (!data) return false
    return getProgress().completedLessons.includes(data.id)
  })

  if (!data) return <p className="text-ink-muted">Leçon introuvable.</p>

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
        <h1 className="font-serif text-2xl font-semibold text-forest mt-1 leading-snug">{data.title}</h1>
      </div>

      <LessonDiagram slug={data.slug} />

      <div className="rounded-2xl border border-forest/25 bg-forest/5 p-4">
        <p className="text-xs font-medium text-forest uppercase tracking-wide mb-2">À retenir</p>
        <ul className="space-y-1.5">
          {data.keyPoints.map((k, i) => (
            <li key={i} className="flex gap-2 text-sm text-ink">
              <span className={`shrink-0 size-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${STEP_COLORS[i % STEP_COLORS.length]}`}>
                {i + 1}
              </span>
              <span className="leading-snug">{k}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        {data.content.map((paragraph, i) => {
          const isWarning =
            paragraph.toLowerCase().includes('avertissement') ||
            paragraph.toLowerCase().includes('pas un avis')
          if (isWarning) {
            return (
              <p key={i} className="text-xs text-ink-muted leading-relaxed border-l-2 border-line pl-3">
                {paragraph}
              </p>
            )
          }
          return (
            <article key={i} className="flex gap-3 rounded-xl border border-line bg-paper-light p-3">
              <div className={`shrink-0 size-10 rounded-xl border flex items-center justify-center text-sm font-bold ${STEP_COLORS[i % STEP_COLORS.length]}`}>
                {i + 1}
              </div>
              <p className="text-sm text-ink leading-relaxed self-center">{paragraph}</p>
            </article>
          )
        })}
      </div>

      {activityTypes.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {activityTypes.map((t) => (
            <span key={t} className="inline-flex items-center gap-1 rounded-full bg-forest/10 text-forest text-xs px-2.5 py-1">
              <Gamepad2 className="size-3" />
              {t === 'mcq' && 'QCM'}
              {t === 'truefalse' && 'Vrai/Faux'}
              {t === 'flashcard' && 'Rappel actif'}
              {t === 'fillblank' && 'Texte à trous'}
              {t === 'order' && 'Ordonnancement'}
              {t === 'match' && 'Association'}
              {t === 'dragdrop' && 'Classement'}
              {t === 'decision' && 'Décision'}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2">
        {!done ? (
          <button type="button" onClick={markDone} className="w-full rounded-xl border border-forest text-forest font-medium py-3 flex items-center justify-center gap-2 hover:bg-forest/5">
            <Check className="size-4" /> Marquer comme lue (+10 pts)
          </button>
        ) : (
          <p className="text-center text-sm text-forest font-medium">Leçon terminée ✓</p>
        )}
        <button type="button" onClick={() => navigate(`/quiz/${trackSlug}/${lessonSlug}`)} className="w-full rounded-xl bg-forest text-white font-medium py-3 flex items-center justify-center gap-2">
          Lancer les défis ({data.activities.length}) <ArrowRight className="size-4" />
        </button>
        <Link to={`/parcours/${trackSlug}`} className="text-center text-sm text-ink-muted hover:text-ink py-2">
          Retour au parcours
        </Link>
      </div>
    </div>
  )
}
