import { useMemo, useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  addToBilan,
  bilanToCsv,
  buildReportFromProgress,
  clearBilan,
  decodeMany,
  loadBilan,
  saveBilan,
  statusOf,
  type PilotReport,
} from '../lib/pilotReport'
import { ClipboardPaste, Download, Trash2, BarChart3, Check, AlertCircle } from 'lucide-react'
import { cn } from '../lib/utils'

export default function BilanPilotePage() {
  const [params] = useSearchParams()
  const [reports, setReports] = useState<PilotReport[]>(() => loadBilan())
  const [paste, setPaste] = useState('')
  const [msg, setMsg] = useState<string | null>(null)

  useEffect(() => {
    const r = params.get('r')
    if (!r) return
    const decoded = decodeMany(decodeURIComponent(r))
    if (decoded.length) {
      const next = saveBilan([...loadBilan(), ...decoded])
      setReports(next)
      setMsg(`${decoded.length} rapport(s) importé(s) depuis le lien`)
    }
  }, [params])

  const stats = useMemo(() => {
    const ok = reports.filter((r) => statusOf(r) === 'ok').length
    const partiel = reports.filter((r) => statusOf(r) === 'partiel').length
    const vide = reports.filter((r) => statusOf(r) === 'vide').length
    const totalPts = reports.reduce((s, r) => s + r.points, 0)
    const avg = reports.length ? Math.round(totalPts / reports.length) : 0
    return { ok, partiel, vide, totalPts, avg, n: reports.length }
  }, [reports])

  function importPaste() {
    const decoded = decodeMany(paste)
    if (!decoded.length) {
      setMsg('Aucun rapport valide. Collez des lignes INGOMA1|…')
      return
    }
    const next = saveBilan([...loadBilan(), ...decoded])
    setReports(next)
    setPaste('')
    setMsg(`${decoded.length} rapport(s) ajouté(s) · total ${next.length}`)
  }

  function addMine() {
    const r = buildReportFromProgress()
    const next = addToBilan(r)
    setReports(next)
    setMsg(`Ajouté : ${r.name} (${r.points} pts)`)
  }

  function downloadCsv() {
    const csv = bilanToCsv(reports)
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ingoma-bilan-pilote-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  function reset() {
    if (!confirm('Effacer tout le bilan sur cet appareil ?')) return
    clearBilan()
    setReports([])
    setMsg('Bilan vidé')
  }

  return (
    <div className="space-y-6 pb-10">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-forest">Pilote</p>
        <h1 className="font-serif text-2xl font-semibold text-forest mt-1 flex items-center gap-2">
          <BarChart3 className="size-7" />
          Bilan des 10 téléphones
        </h1>
        <p className="text-sm text-ink-muted mt-2 leading-relaxed">
          Collectez les rapports des testeurs (collage, lien ou « ajouter mon résultat »), puis
          exportez le CSV.
        </p>
      </div>

      {msg && (
        <p className="text-sm rounded-xl border border-forest/30 bg-forest/10 text-forest px-3 py-2">
          {msg}
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <Stat label="Rapports" value={String(stats.n)} />
        <Stat label="OK" value={String(stats.ok)} tone="ok" />
        <Stat label="Partiel" value={String(stats.partiel)} tone="warn" />
        <Stat label="Moy. points" value={String(stats.avg)} />
      </div>

      <div className="rounded-xl border border-line overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-line/40 text-left text-ink-muted text-xs">
              <th className="px-2 py-2">#</th>
              <th className="px-2 py-2">Testeur</th>
              <th className="px-2 py-2 text-right">Pts</th>
              <th className="px-2 py-2 text-right">Leçons</th>
              <th className="px-2 py-2 text-center">Défi</th>
              <th className="px-2 py-2">Statut</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center text-ink-muted">
                  Aucun rapport. Collez les codes des téléphones ci-dessous.
                </td>
              </tr>
            )}
            {reports.map((r, i) => {
              const st = statusOf(r)
              return (
                <tr key={r.name + r.at} className="border-t border-line">
                  <td className="px-2 py-2 tabular-nums text-ink-muted">{i + 1}</td>
                  <td className="px-2 py-2 font-medium">{r.name}</td>
                  <td className="px-2 py-2 text-right tabular-nums text-forest font-medium">{r.points}</td>
                  <td className="px-2 py-2 text-right tabular-nums">{r.lessonsDone}/{r.lessonsTotal}</td>
                  <td className="px-2 py-2 text-center">
                    {r.dailyDone ? <Check className="size-4 text-forest inline" /> : <span className="text-ink-muted">—</span>}
                  </td>
                  <td className="px-2 py-2">
                    <span
                      className={cn(
                        'text-xs font-medium px-1.5 py-0.5 rounded',
                        st === 'ok' && 'bg-forest/15 text-forest',
                        st === 'partiel' && 'bg-amber-100 text-amber-800',
                        st === 'vide' && 'bg-line text-ink-muted'
                      )}
                    >
                      {st === 'ok' ? 'OK' : st === 'partiel' ? 'Partiel' : 'Vide'}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={downloadCsv} disabled={!reports.length} className="inline-flex items-center gap-1.5 rounded-xl bg-forest text-white text-sm font-medium px-4 py-2.5 disabled:opacity-40">
          <Download className="size-4" /> Export CSV
        </button>
        <button type="button" onClick={addMine} className="inline-flex items-center gap-1.5 rounded-xl border border-forest text-forest text-sm font-medium px-4 py-2.5">
          Ajouter mon résultat
        </button>
        <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 rounded-xl border border-line text-sm px-4 py-2.5 text-ink-muted">
          <Trash2 className="size-4" /> Vider
        </button>
      </div>

      <section className="space-y-2">
        <h2 className="font-serif font-semibold text-ink flex items-center gap-2">
          <ClipboardPaste className="size-5 text-forest" />
          Coller les rapports
        </h2>
        <p className="text-xs text-ink-muted leading-relaxed">
          Sur chaque téléphone : Kit test → « Copier mon rapport ». Collez ici toutes les lignes d’un coup.
        </p>
        <textarea
          value={paste}
          onChange={(e) => setPaste(e.target.value)}
          rows={5}
          placeholder={'INGOMA1|01|Testeur 01|45|1|2|20|1|0|1||2026-08-21T10:00:00'}
          className="w-full rounded-xl border border-line bg-paper-light px-3 py-2 text-xs font-mono outline-none focus:border-forest"
        />
        <button type="button" onClick={importPaste} className="w-full rounded-xl bg-forest text-white font-medium py-3 text-sm">
          Importer dans le bilan
        </button>
      </section>

      <div className="rounded-xl border border-line bg-paper-light p-4 text-sm space-y-2">
        <p className="font-medium text-ink flex items-center gap-2">
          <AlertCircle className="size-4 text-forest" />
          Comment collecter les 10
        </p>
        <ol className="list-decimal list-inside text-ink-muted space-y-1 text-xs leading-relaxed">
          <li>Chaque testeur termine la checklist.</li>
          <li>Il appuie sur « Copier mon rapport » (ou WhatsApp).</li>
          <li>Vous recevez les 10 lignes et les collez ici.</li>
          <li>Tableau + export CSV pour votre compte-rendu.</li>
        </ol>
        <Link to="/kit-test" className="inline-block text-forest text-sm font-medium underline mt-1">
          Retour au kit test
        </Link>
      </div>
    </div>
  )
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: 'ok' | 'warn' }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-line bg-paper-light p-3 text-center',
        tone === 'ok' && 'border-forest/30 bg-forest/5',
        tone === 'warn' && 'border-amber-200 bg-amber-50'
      )}
    >
      <p className="text-xs text-ink-muted">{label}</p>
      <p className="text-xl font-semibold text-ink tabular-nums">{value}</p>
    </div>
  )
}
