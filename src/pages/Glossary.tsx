import { GLOSSARY } from '../lib/catalog'

export default function GlossaryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-forest">Glossaire</h1>
        <p className="text-sm text-ink-muted mt-1">
          Termes clés de la commande publique et de la comptabilité publique au Burundi.
        </p>
      </div>
      <div className="space-y-3">
        {GLOSSARY.map((g) => (
          <div
            key={g.term}
            className="rounded-xl border border-line bg-paper-light p-4"
          >
            <h2 className="font-semibold text-forest">{g.term}</h2>
            <p className="text-sm text-ink-muted mt-1 leading-relaxed">{g.definition}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
