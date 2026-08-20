import { getProgress } from '../lib/progress'
import { useMemo } from 'react'

const DEMO = [
  { name: 'Jean-Bosco N.', institution: 'Min. Finances', points: 420 },
  { name: 'Alice K.', institution: 'ARMP', points: 385 },
  { name: 'Pierre M.', institution: 'DNCMP', points: 310 },
  { name: 'Grace H.', institution: 'Min. Éducation', points: 275 },
  { name: 'Eric T.', institution: 'Collectivité', points: 190 },
]

export default function RankingPage() {
  const me = useMemo(() => getProgress(), [])
  const myName = me.displayName || 'Vous (invité)'
  const rows = [...DEMO]
  if (me.points > 0) {
    rows.push({
      name: myName,
      institution: me.institution || '—',
      points: me.points,
    })
  }
  rows.sort((a, b) => b.points - a.points)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-forest">Classement</h1>
        <p className="text-sm text-ink-muted mt-1">
          National (démo) · Affichage sobre — points uniquement
        </p>
      </div>

      <div className="rounded-xl border border-line overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-line/40 text-left text-ink-muted">
              <th className="px-3 py-2.5 font-medium w-10">#</th>
              <th className="px-3 py-2.5 font-medium">Agent</th>
              <th className="px-3 py-2.5 font-medium text-right">Points</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const isMe = r.name === myName
              return (
                <tr
                  key={i}
                  className={
                    isMe
                      ? 'bg-forest/10 font-medium text-forest'
                      : 'border-t border-line'
                  }
                >
                  <td className="px-3 py-2.5 tabular-nums">{i + 1}</td>
                  <td className="px-3 py-2.5">
                    <div>{r.name}</div>
                    <div className="text-xs text-ink-muted font-normal">{r.institution}</div>
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{r.points}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-ink-muted leading-relaxed">
        Classement illustratif. En production : national, par institution et hebdomadaire
        (reset chaque lundi). Pas de mode combat.
      </p>
    </div>
  )
}
