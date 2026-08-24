import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDailyChallenge } from '../lib/catalog'
import { completeDaily, getProgress, ensureProgramStarted } from '../lib/progress'
import { getProgramDay, getProgramDayNumber, PROGRAM_LENGTH } from '../lib/program-90'
import { ActivityPlayer } from '../components/activities/ActivityPlayer'
import { Flame, Zap, CalendarDays } from 'lucide-react'

export default function DailyPage() {
  const progress = useMemo(() => {
    ensureProgramStarted()
    return getProgress()
  }, [])
  const dayNum = getProgramDayNumber(progress.programStartDate)
  const programDay = getProgramDay(dayNum)
  const challenge = useMemo(() => getDailyChallenge(), [])
  const alreadyDone = progress.completedDailies.includes(challenge.id)
  const [finished, setFinished] = useState(alreadyDone)
  const [success, setSuccess] = useState(alreadyDone)

  function handleComplete(pct: number) {
    const ok = pct >= 70
    if (ok) completeDaily(challenge.id, true)
    setSuccess(ok)
    setFinished(true)
  }

  return (
    <div className="space-y-6">
      {/* CTA programme 90 j */}
      <Link
        to="/programme"
        className="flex items-center gap-3 rounded-xl border border-forest/30 bg-forest/5 p-4 hover:bg-forest/10"
      >
        <CalendarDays className="size-6 text-forest shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-forest">Leçon du jour — programme 3 mois</p>
          <p className="text-xs text-ink-muted truncate">
            Jour {programDay.day}/{PROGRAM_LENGTH} · {programDay.title}
          </p>
        </div>
      </Link>

      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-forest/10 p-3">
          <Zap className="size-6 text-forest" />
        </div>
        <div>
          <h1 className="font-serif text-2xl font-semibold text-forest">{challenge.title}</h1>
          <p className="text-sm text-ink-muted mt-0.5">
            {challenge.date} · +{challenge.points} pts si réussi · série {progress.streak} j
          </p>
        </div>
      </div>

      {finished ? (
        <div className="rounded-xl border border-line bg-paper-light p-6 text-center space-y-3">
          <Flame className={success ? 'size-10 text-forest mx-auto' : 'size-10 text-ink-muted mx-auto'} />
          <p className="font-serif text-lg font-semibold text-ink">
            {success ? 'Défi du jour validé' : 'Réessayez demain ou relancez'}
          </p>
          {success && (
            <p className="text-sm text-forest">+{challenge.points} points · série maintenue</p>
          )}
          <Link to="/programme" className="inline-block mt-2 text-sm text-forest font-medium underline">
            Ouvrir la leçon programme du jour
          </Link>
        </div>
      ) : (
        <ActivityPlayer activities={[challenge.activity]} onComplete={handleComplete} />
      )}

      <p className="text-xs text-ink-muted leading-relaxed">
        Le programme 90 jours propose une micro-leçon quotidienne. Le défi ci-dessus renforce la
        régularité (streak).
      </p>
    </div>
  )
}
