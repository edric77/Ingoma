import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDailyChallenge } from '../lib/catalog'
import { completeDaily, getProgress } from '../lib/progress'
import { ActivityPlayer } from '../components/activities/ActivityPlayer'
import { Flame, Zap } from 'lucide-react'

export default function DailyPage() {
  const challenge = useMemo(() => getDailyChallenge(), [])
  const progress = useMemo(() => getProgress(), [])
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
          <Link to="/" className="inline-block mt-2 text-sm text-forest font-medium underline">
            Retour à l&apos;accueil
          </Link>
        </div>
      ) : (
        <ActivityPlayer activities={[challenge.activity]} onComplete={handleComplete} />
      )}

      <p className="text-xs text-ink-muted leading-relaxed">
        Les défis quotidiens renforcent la régularité (streak). Revenez chaque jour pour conserver
        votre série et débloquer les badges.
      </p>
    </div>
  )
}
