import { Link, useParams } from 'react-router-dom'
import { getTrack } from '../lib/catalog'
import { getProgress } from '../lib/progress'
import { CheckCircle2, Circle, ChevronRight, FileText } from 'lucide-react'
import { useMemo } from 'react'

export default function ParcoursPage() {
  const { slug } = useParams<{ slug: string }>()
  const track = getTrack(slug || '')
  const progress = useMemo(() => getProgress(), [])

  if (!track) {
    return <p className="text-ink-muted">Parcours introuvable.</p>
  }

  const allDone =
    track.lessons.every((l) => progress.completedLessons.includes(l.id)) &&
    progress.completedCases.includes(track.caseStudy.id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-forest">{track.title}</h1>
        <p className="text-sm text-ink-muted mt-1 leading-relaxed">{track.description}</p>
      </div>

      <div className="space-y-2">
        {track.lessons.map((lesson, i) => {
          const done = progress.completedLessons.includes(lesson.id)
          const score = progress.quizScores[lesson.id]
          const quizOk = score !== undefined && score >= 70
          return (
            <Link
              key={lesson.id}
              to={`/lecon/${track.slug}/${lesson.slug}`}
              className="flex items-center gap-3 rounded-xl border border-line bg-paper-light p-3.5 hover:border-forest/30 transition-colors"
            >
              <div className="shrink-0 text-forest">
                {done && quizOk ? (
                  <CheckCircle2 className="size-6" />
                ) : (
                  <Circle className="size-6 text-ink-muted" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-ink-muted">Leçon {i + 1} · {lesson.durationMin} min</p>
                <p className="font-medium text-ink">{lesson.title}</p>
                {score !== undefined && (
                  <p className="text-xs text-ink-muted mt-0.5">
                    Quiz : {score}% {score >= 70 ? '✓' : '(seuil 70 %)'}
                  </p>
                )}
              </div>
              <ChevronRight className="size-4 text-ink-muted shrink-0" />
            </Link>
          )
        })}

        <Link
          to={`/cas/${track.slug}`}
          className="flex items-center gap-3 rounded-xl border border-line bg-paper-light p-3.5 hover:border-forest/30"
        >
          <FileText className="size-6 text-forest shrink-0" />
          <div className="flex-1">
            <p className="text-xs text-ink-muted">Cas pratique</p>
            <p className="font-medium text-ink">{track.caseStudy.title}</p>
            {progress.completedCases.includes(track.caseStudy.id) && (
              <p className="text-xs text-forest mt-0.5">Validé</p>
            )}
          </div>
          <ChevronRight className="size-4 text-ink-muted" />
        </Link>
      </div>

      {allDone && (
        <Link
          to={`/certificat/${track.slug}`}
          className="block w-full text-center rounded-xl bg-forest text-white font-medium py-3"
        >
          Voir le certificat
        </Link>
      )}
    </div>
  )
}
