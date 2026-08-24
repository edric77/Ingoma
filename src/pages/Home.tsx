import { Link } from 'react-router-dom'
import { TRACKS } from '../lib/catalog'
import { getProgress, ensureProgramStarted } from '../lib/progress'
import { getProgramDay, getProgramDayNumber, PROGRAM_LENGTH } from '../lib/program-90'
import { BookOpen, ChevronRight, Flame, Star, CalendarDays } from 'lucide-react'
import { useMemo } from 'react'

export default function HomePage() {
  const progress = useMemo(() => {
    ensureProgramStarted()
    return getProgress()
  }, [])
  const name = progress.displayName || 'Agent'
  const dayNum = getProgramDayNumber(progress.programStartDate)
  const todayLesson = getProgramDay(dayNum)
  const progDone = progress.completedProgramDays?.length || 0
  const progPct = Math.round((progDone / PROGRAM_LENGTH) * 100)

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm text-ink-muted">Bonjour,</p>
        <h1 className="font-serif text-2xl font-semibold text-forest mt-0.5">{name}</h1>
        <p className="text-sm text-ink-muted mt-2 leading-relaxed">
          Microlearning pour les fonctionnaires du Burundi — commande publique et comptabilité publique.
        </p>
      </section>

      {(progress.points > 0 || progress.streak > 0) && (
        <section className="flex gap-3">
          <div className="flex-1 rounded-xl border border-line bg-paper-light p-3 flex items-center gap-2">
            <Star className="size-5 text-forest shrink-0" />
            <div>
              <p className="text-xs text-ink-muted">Points</p>
              <p className="font-semibold text-forest">{progress.points}</p>
            </div>
          </div>
          <div className="flex-1 rounded-xl border border-line bg-paper-light p-3 flex items-center gap-2">
            <Flame className="size-5 text-red-flag shrink-0" />
            <div>
              <p className="text-xs text-ink-muted">Série</p>
              <p className="font-semibold text-forest">{progress.streak} j</p>
            </div>
          </div>
        </section>
      )}

      {/* Programme 90 jours — prioritaire */}
      <Link
        to="/programme"
        className="block rounded-xl border-2 border-forest/40 bg-forest/5 p-4 hover:bg-forest/10 transition-colors"
      >
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-forest/15 p-2.5 shrink-0">
            <CalendarDays className="size-5 text-forest" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-forest uppercase tracking-wide">Programme 3 mois</p>
            <h2 className="font-semibold text-ink mt-0.5">Jour {todayLesson.day}/{PROGRAM_LENGTH}</h2>
            <p className="text-sm text-ink-muted mt-0.5 line-clamp-2">{todayLesson.title}</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-line overflow-hidden">
                <div className="h-full rounded-full bg-forest" style={{ width: `${progPct}%` }} />
              </div>
              <span className="text-xs text-ink-muted tabular-nums">{progDone}/{PROGRAM_LENGTH}</span>
            </div>
          </div>
          <ChevronRight className="size-4 text-forest shrink-0 mt-1" />
        </div>
      </Link>

      <section>
        <h2 className="font-serif text-lg font-semibold text-ink mb-3">Parcours approfondis</h2>
        <div className="space-y-3">
          {TRACKS.map((track) => {
            const done = track.lessons.filter((l) => progress.completedLessons.includes(l.id)).length
            const total = track.lessons.length
            const pct = total ? Math.round((done / total) * 100) : 0
            return (
              <Link key={track.slug} to={`/parcours/${track.slug}`} className="block rounded-xl border border-line bg-paper-light p-4 hover:border-forest/40 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-forest/10 p-2.5 shrink-0">
                    <BookOpen className="size-5 text-forest" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-ink">{track.title}</h3>
                      <ChevronRight className="size-4 text-ink-muted shrink-0" />
                    </div>
                    <p className="text-sm text-ink-muted mt-0.5 line-clamp-2">{track.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-line overflow-hidden">
                        <div className="h-full rounded-full bg-forest transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-ink-muted tabular-nums">{done}/{total}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <Link to="/defi" className="flex items-center gap-3 rounded-xl border border-forest/30 bg-forest/5 p-4 hover:bg-forest/10 transition-colors">
        <span className="text-2xl">⚡</span>
        <div className="flex-1">
          <p className="font-semibold text-forest">Défi du jour</p>
          <p className="text-xs text-ink-muted">Maintenez votre série · +20 pts</p>
        </div>
      </Link>

      <Link to="/kit-test" className="flex items-center gap-3 rounded-xl border border-line bg-paper-light p-4 hover:border-forest/40 transition-colors">
        <span className="text-xl">📱</span>
        <div className="flex-1">
          <p className="font-semibold text-ink">Kit test 10 téléphones</p>
          <p className="text-xs text-ink-muted">Liens testeurs + checklist pilote</p>
        </div>
      </Link>

      <section className="rounded-xl border border-dashed border-line bg-paper-light/50 p-4 text-sm text-ink-muted leading-relaxed">
        <p>
          <strong className="text-ink">Avertissement</strong> — Ingoma est un outil de formation.
          Le contenu ne constitue pas un avis juridique officiel. Référez-vous toujours aux textes
          en vigueur (ARMP, DNCMP, Ministère des Finances).
        </p>
      </section>

      {!progress.phone && (
        <Link to="/login" className="block w-full text-center rounded-xl bg-forest text-white font-medium py-3 hover:bg-forest/90 transition-colors">
          Se connecter avec mon numéro (+257)
        </Link>
      )}
    </div>
  )
}
