import { useParams, Link } from 'react-router-dom'
import { getTrack } from '../lib/catalog'
import { completeCase, getProgress } from '../lib/progress'
import { useState } from 'react'

export default function CasePage() {
  const { track: trackSlug } = useParams<{ track: string }>()
  const track = getTrack(trackSlug || '')
  const cas = track?.caseStudy
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(() =>
    cas ? getProgress().completedCases.includes(cas.id) : false
  )

  if (!track || !cas) {
    return <p className="text-ink-muted">Cas introuvable.</p>
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    completeCase(cas!.id)
    setSubmitted(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-ink-muted uppercase tracking-wide">Cas pratique</p>
        <h1 className="font-serif text-2xl font-semibold text-forest mt-1">{cas.title}</h1>
      </div>

      <div className="rounded-xl border border-line bg-paper-light p-4 text-sm leading-relaxed">
        <p className="font-medium text-ink mb-2">Scénario</p>
        <p className="text-ink-muted">{cas.scenario}</p>
      </div>

      {submitted ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-forest/30 bg-forest/5 p-4 text-center">
            <p className="font-medium text-forest">Cas validé · +30 points</p>
            <p className="text-sm text-ink-muted mt-1">
              Merci pour votre réflexion. En situation réelle, validez toujours avec la PRMP / DNCMP.
            </p>
          </div>
          <Link
            to={`/parcours/${trackSlug}`}
            className="block text-center rounded-xl bg-forest text-white font-medium py-3"
          >
            Retour au parcours
          </Link>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-5">
          {cas.questions.map((q, i) => (
            <div key={q.id}>
              <label className="block text-sm font-medium text-ink mb-1.5">
                {i + 1}. {q.prompt}
              </label>
              <textarea
                required
                rows={3}
                value={answers[q.id] || ''}
                onChange={(e) =>
                  setAnswers((a) => ({ ...a, [q.id]: e.target.value }))
                }
                className="w-full rounded-xl border border-line bg-paper-light px-3 py-2.5 text-sm outline-none focus:border-forest resize-y"
                placeholder="Votre réponse…"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full rounded-xl bg-forest text-white font-medium py-3"
          >
            Valider le cas (+30 pts)
          </button>
        </form>
      )}
    </div>
  )
}
