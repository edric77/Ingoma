import { useParams, Link } from 'react-router-dom'
import { getTrack } from '../lib/catalog'
import { getProgress } from '../lib/progress'
import { Logo } from '../components/Logo'
import { useMemo } from 'react'

export default function CertificatePage() {
  const { slug } = useParams<{ slug: string }>()
  const track = getTrack(slug || '')
  const p = useMemo(() => getProgress(), [])

  if (!track) {
    return <p className="text-ink-muted">Parcours introuvable.</p>
  }

  const name = p.displayName || "Agent de l'État"
  const date = new Date().toLocaleDateString('fr-BI', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="space-y-6">
      <div className="print:hidden flex justify-between items-center">
        <h1 className="font-serif text-xl font-semibold text-forest">Certificat</h1>
        <button
          onClick={() => window.print()}
          className="rounded-lg bg-forest text-white text-sm font-medium px-4 py-2"
        >
          Imprimer
        </button>
      </div>

      <div className="rounded-xl border-2 border-forest bg-paper-light p-6 sm:p-8 text-center space-y-4 print:border print:shadow-none">
        <Logo size={48} className="mx-auto" />
        <p className="text-xs uppercase tracking-widest text-ink-muted">Ingoma</p>
        <h2 className="font-serif text-2xl font-semibold text-forest">
          Certificat de parcours
        </h2>
        <p className="text-sm text-ink-muted">Décerné à</p>
        <p className="font-serif text-xl font-semibold text-ink">{name}</p>
        {p.institution && (
          <p className="text-sm text-ink-muted">{p.institution}</p>
        )}
        <p className="text-sm leading-relaxed max-w-sm mx-auto">
          pour avoir suivi avec succès le parcours
          <br />
          <strong className="text-forest">{track.title}</strong>
        </p>
        <p className="text-xs text-ink-muted pt-4">
          Bujumbura, le {date}
        </p>
        <p className="text-[10px] text-ink-muted leading-relaxed max-w-xs mx-auto pt-2">
          Document de formation — non constitutif d'avis juridique officiel.
          Ingoma · Microlearning pour les fonctionnaires du Burundi.
        </p>
      </div>

      <Link
        to={`/parcours/${slug}`}
        className="print:hidden block text-center text-sm text-ink-muted hover:text-ink"
      >
        Retour au parcours
      </Link>
    </div>
  )
}
