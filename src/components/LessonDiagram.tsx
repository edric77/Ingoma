export function LessonDiagram({ slug }: { slug: string }) {
  switch (slug) {
    case 'acteurs':
      return (
        <DiagramFrame title="Acteurs de la commande publique">
          <svg viewBox="0 0 320 120" className="w-full h-auto" role="img" aria-label="PRMP, DNCMP, ARMP">
            <rect x="8" y="30" width="88" height="56" rx="10" className="fill-forest/15 stroke-forest" strokeWidth="1.5" />
            <text x="52" y="55" textAnchor="middle" className="fill-ink text-[11px] font-semibold">PRMP</text>
            <text x="52" y="70" textAnchor="middle" className="fill-ink-muted text-[8px]">Procédures</text>
            <path d="M100 58 H120" className="stroke-forest" strokeWidth="1.5" markerEnd="url(#arr)" />
            <rect x="124" y="30" width="88" height="56" rx="10" className="fill-sky-100 stroke-sky-600" strokeWidth="1.5" />
            <text x="168" y="55" textAnchor="middle" className="fill-ink text-[11px] font-semibold">DNCMP</text>
            <text x="168" y="70" textAnchor="middle" className="fill-ink-muted text-[8px]">Contrôle a priori</text>
            <path d="M216 58 H236" className="stroke-forest" strokeWidth="1.5" markerEnd="url(#arr)" />
            <rect x="240" y="30" width="72" height="56" rx="10" className="fill-amber-100 stroke-amber-600" strokeWidth="1.5" />
            <text x="276" y="55" textAnchor="middle" className="fill-ink text-[11px] font-semibold">ARMP</text>
            <text x="276" y="70" textAnchor="middle" className="fill-ink-muted text-[8px]">Recours</text>
            <defs>
              <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" className="fill-forest" />
              </marker>
            </defs>
          </svg>
        </DiagramFrame>
      )
    case 'circuit-depense':
      return (
        <DiagramFrame title="Circuit de la dépense">
          <svg viewBox="0 0 320 100" className="w-full h-auto" role="img" aria-label="Engagement à paiement">
            {[
              { x: 8, label: 'Engagement', sub: 'Crédits' },
              { x: 90, label: 'Liquidation', sub: 'Service fait' },
              { x: 172, label: 'Ordonnanc.', sub: 'Ordre de payer' },
              { x: 254, label: 'Paiement', sub: 'Comptable' },
            ].map((s, i) => (
              <g key={s.label}>
                <rect x={s.x} y="24" width="58" height="52" rx="8" className="fill-forest/10 stroke-forest" strokeWidth="1.5" />
                <text x={s.x + 29} y="48" textAnchor="middle" className="fill-ink text-[9px] font-semibold">{s.label}</text>
                <text x={s.x + 29} y="62" textAnchor="middle" className="fill-ink-muted text-[7px]">{s.sub}</text>
                {i < 3 && <path d={`M${s.x + 58} 50 H${s.x + 70}`} className="stroke-forest" strokeWidth="1.5" markerEnd="url(#arr2)" />}
              </g>
            ))}
            <defs>
              <marker id="arr2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" className="fill-forest" />
              </marker>
            </defs>
          </svg>
        </DiagramFrame>
      )
    case 'principes':
      return (
        <DiagramFrame title="Séparation des fonctions">
          <svg viewBox="0 0 320 110" className="w-full h-auto" role="img" aria-label="Ordonnateur et comptable">
            <rect x="16" y="20" width="120" height="70" rx="10" className="fill-forest/15 stroke-forest" strokeWidth="1.5" />
            <text x="76" y="48" textAnchor="middle" className="fill-ink text-[11px] font-semibold">Ordonnateur</text>
            <text x="76" y="64" textAnchor="middle" className="fill-ink-muted text-[8px]">Engage · Liquide</text>
            <text x="76" y="76" textAnchor="middle" className="fill-ink-muted text-[8px]">Ordonnance</text>
            <rect x="184" y="20" width="120" height="70" rx="10" className="fill-amber-100 stroke-amber-600" strokeWidth="1.5" />
            <text x="244" y="48" textAnchor="middle" className="fill-ink text-[11px] font-semibold">Comptable</text>
            <text x="244" y="64" textAnchor="middle" className="fill-ink-muted text-[8px]">Contrôle · Paie</text>
            <text x="244" y="76" textAnchor="middle" className="fill-ink-muted text-[8px]">Responsabilité</text>
            <line x1="160" y1="30" x2="160" y2="80" className="stroke-red-flag" strokeWidth="2" strokeDasharray="4 3" />
            <text x="160" y="98" textAnchor="middle" className="fill-red-flag text-[8px] font-medium">Séparation</text>
          </svg>
        </DiagramFrame>
      )
    case 'procedures':
      return (
        <DiagramFrame title="Appel d'offres ouvert (séquence)">
          <svg viewBox="0 0 320 90" className="w-full h-auto" role="img" aria-label="Étapes appel d'offres">
            {['Avis', 'Dépôt', 'Ouverture', 'Éval.', 'Attribut.'].map((lab, i) => {
              const x = 10 + i * 62
              return (
                <g key={lab}>
                  <circle cx={x + 22} cy="36" r="18" className="fill-forest/15 stroke-forest" strokeWidth="1.5" />
                  <text x={x + 22} y="40" textAnchor="middle" className="fill-ink text-[8px] font-semibold">{lab}</text>
                  {i < 4 && <path d={`M${x + 42} 36 H${x + 58}`} className="stroke-forest" strokeWidth="1.5" />}
                </g>
              )
            })}
          </svg>
        </DiagramFrame>
      )
    default:
      return null
  }
}

function DiagramFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-forest/25 bg-paper-light p-3 space-y-2">
      <p className="text-xs font-medium text-forest uppercase tracking-wide">{title}</p>
      {children}
    </div>
  )
}
