import { Link } from 'react-router-dom'
import { getProgress, BADGE_LABELS } from '../lib/progress'
import { useMemo } from 'react'
import { Flame, Star, Phone } from 'lucide-react'

export default function ProfilePage() {
  const p = useMemo(() => getProgress(), [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-forest">
          {p.displayName || 'Profil'}
        </h1>
        {p.institution && (
          <p className="text-sm text-ink-muted mt-0.5">{p.institution}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-line bg-paper-light p-4">
          <Star className="size-5 text-forest mb-1" />
          <p className="text-2xl font-semibold text-forest tabular-nums">{p.points}</p>
          <p className="text-xs text-ink-muted">Points</p>
        </div>
        <div className="rounded-xl border border-line bg-paper-light p-4">
          <Flame className="size-5 text-red-flag mb-1" />
          <p className="text-2xl font-semibold text-forest tabular-nums">{p.streak} j</p>
          <p className="text-xs text-ink-muted">Série en cours</p>
        </div>
      </div>

      {p.phone && (
        <div className="flex items-center gap-2 text-sm text-ink-muted">
          <Phone className="size-4" />
          {p.phone}
        </div>
      )}

      {p.badges.length > 0 && (
        <div>
          <h2 className="font-serif font-semibold text-ink mb-2">Badges</h2>
          <div className="flex flex-wrap gap-2">
            {p.badges.map((b) => (
              <span
                key={b}
                className="rounded-full bg-forest/10 text-forest text-xs font-medium px-3 py-1"
              >
                {BADGE_LABELS[b] || b}
              </span>
            ))}
          </div>
        </div>
      )}

      {p.activityDays.length > 0 && (
        <div>
          <h2 className="font-serif font-semibold text-ink mb-2">Activité récente</h2>
          <div className="flex flex-wrap gap-1">
            {p.activityDays.slice(-14).map((d) => (
              <span
                key={d}
                className="size-7 rounded-md bg-forest/20 text-[10px] flex items-center justify-center text-forest"
                title={d}
              >
                {d.slice(8)}
              </span>
            ))}
          </div>
        </div>
      )}

      {!p.phone && (
        <Link
          to="/login"
          className="block w-full text-center rounded-xl bg-forest text-white font-medium py-3"
        >
          Se connecter (+257)
        </Link>
      )}
    </div>
  )
}
