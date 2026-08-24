import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getProgramDay,
  getProgramDayNumber,
  PROGRAM_LENGTH,
  weekLabel,
} from '../lib/program-90'
import {
  completeProgramDay,
  ensureProgramStarted,
  getProgress,
} from '../lib/progress'
import { ActivityPlayer } from '../components/activities/ActivityPlayer'
import { CalendarDays, Check, ChevronRight, BookOpen } from 'lucide-react'

export default function ProgramDayPage() {
  const progress = useMemo(() => {
    ensureProgramStarted()
    return getProgress()
  }, [])
  const dayNum = getProgramDayNumber(progress.programStartDate)
  const day = getProgramDay(dayNum)
  const already = progress.completedProgramDays.includes(day.day)
  const [phase, setPhase] = useState<'read' | 'activity' | 'done'>(
    already ? 'done' : 'read'
  )
  const [activityOk, setActivityOk] = useState(already)

  const doneCount = progress.completedProgramDays.length
  const pct = Math.round((doneCount / PROGRAM_LENGTH) * 100)

  function startActivity() {
    setPhase('activity')
  }

  function onActivityComplete(scorePct: number) {
    const ok = scorePct >= 70
    completeProgramDay(day.day, ok)
    setActivityOk(ok)
    setPhase('done')
  }

  return (
    <div className="space-y-6 pb-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-forest">
          Programme 3 mois · Jour {day.day}/{PROGRAM_LENGTH}
        </p>
        <h1 className="font-serif text-2xl font-semibold text-forest mt-1 leading-snug">
          {day.title}
        </h1>
        <p className="text-sm text-ink-muted mt-1">
          Semaine {day.week} — {weekLabel(day.week)}
        </p>
      </div>

      {/* Progress bar */}
      <div className="rounded-xl border border-line bg-paper-light p-3">
        <div className="flex justify-between text-xs text-ink-muted mb-1.5">
          <span className="flex items-center gap-1">
            <CalendarDays className="size-3.5" /> Progression programme
          </span>
          <span className="tabular-nums">
            {doneCount}/{PROGRAM_LENGTH} ({pct}%)
          </span>
        </div>
        <div className="h-2 rounded-full bg-line overflow-hidden">
          <div className="h-full bg-forest rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {phase === 'read' && (
        <>
          <div className="space-y-3">
            {day.content.map((p, i) => (
              <article key={i} className="flex gap-3 rounded-xl border border-line bg-paper-light p-3">
                <div className="shrink-0 size-8 rounded-lg bg-forest/15 text-forest flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                <p className="text-sm text-ink leading-relaxed self-center">{p}</p>
              </article>
            ))}
          </div>

          <div className="rounded-xl border border-forest/30 bg-forest/5 p-4">
            <p className="text-xs font-medium text-forest uppercase tracking-wide mb-1">À retenir</p>
            <p className="text-sm font-medium text-ink">{day.keyPoint}</p>
          </div>

          {day.relatedLessonSlug && day.trackSlug !== 'revision' && (
            <Link
              to={`/lecon/${day.trackSlug}/${day.relatedLessonSlug}`}
              className="flex items-center gap-2 text-sm text-forest font-medium"
            >
              <BookOpen className="size-4" /> Approfondir la leçon du parcours
              <ChevronRight className="size-4" />
            </Link>
          )}

          <button
            type="button"
            onClick={startActivity}
            className="w-full rounded-xl bg-forest text-white font-medium py-3"
          >
            Passer au défi du jour (+25 pts si réussi)
          </button>
        </>
      )}

      {phase === 'activity' && (
        <ActivityPlayer activities={[day.activity]} onComplete={onActivityComplete} />
      )}

      {phase === 'done' && (
        <div className="rounded-xl border border-line bg-paper-light p-6 text-center space-y-3">
          <Check className="size-10 text-forest mx-auto" />
          <p className="font-serif text-lg font-semibold text-ink">
            {activityOk ? `Jour ${day.day} validé` : `Jour ${day.day} enregistré`}
          </p>
          <p className="text-sm text-ink-muted">
            Revenez demain pour le jour {Math.min(day.day + 1, PROGRAM_LENGTH)}.
          </p>
          <Link to="/" className="inline-block text-sm text-forest font-medium underline">
            Retour à l&apos;accueil
          </Link>
        </div>
      )}

      <p className="text-xs text-ink-muted leading-relaxed">
        Programme pédagogique sur 90 jours. Contenu non constitutif d&apos;avis juridique officiel.
      </p>
    </div>
  )
}
