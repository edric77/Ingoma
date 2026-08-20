import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { setProfile, getProgress, touchActivity } from '../lib/progress'
import {
  Smartphone,
  Copy,
  Check,
  QrCode,
  ListChecks,
  Users,
  ExternalLink,
  RotateCcw,
} from 'lucide-react'
import { cn } from '../lib/utils'

const TESTEURS = Array.from({ length: 10 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0')
  return {
    id: n,
    name: `Testeur ${n}`,
    phone: `79${String(100000 + i).slice(1)}`,
    institution: 'Pilote Ingoma',
  }
})

const CHECKLIST = [
  { id: 'open', label: 'Ouvrir le lien sur le téléphone (Chrome ou Safari)' },
  { id: 'install', label: 'Optionnel : Ajouter à l’écran d’accueil' },
  { id: 'profil', label: 'Vérifier le nom Testeur XX sur Profil' },
  { id: 'login', label: 'Connexion téléphone + OTP (ex. 123456)' },
  { id: 'lecon', label: 'Lire 1 leçon et la marquer comme lue' },
  { id: 'defis', label: 'Lancer les défis de la leçon (QCM, etc.)' },
  { id: 'daily', label: 'Faire le Défi du jour' },
  { id: 'classement', label: 'Ouvrir le Classement (points visibles)' },
]

export default function KitTestPage() {
  const [params] = useSearchParams()
  const tParam = params.get('t')
  const progress = useMemo(() => getProgress(), [])
  const [copied, setCopied] = useState<string | null>(null)
  const [done, setDone] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem('ingoma-kit-checklist') || '{}')
    } catch {
      return {}
    }
  })

  const baseUrl =
    typeof window !== 'undefined' ? window.location.origin : 'https://votre-app.vercel.app'

  useEffect(() => {
    if (!tParam) return
    const t = TESTEURS.find((x) => x.id === tParam.padStart(2, '0'))
    if (!t) return
    setProfile({
      displayName: t.name,
      phone: t.phone,
      institution: t.institution,
    })
    touchActivity()
  }, [tParam])

  function toggleCheck(id: string) {
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      localStorage.setItem('ingoma-kit-checklist', JSON.stringify(next))
      return next
    })
  }

  async function copyText(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      prompt('Copiez ce lien :', text)
    }
  }

  const assigned = tParam
    ? TESTEURS.find((x) => x.id === tParam.padStart(2, '0'))
    : null

  const checkedCount = CHECKLIST.filter((c) => done[c.id]).length

  return (
    <div className="space-y-8 pb-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-forest">Pilote</p>
        <h1 className="font-serif text-2xl font-semibold text-forest mt-1">
          Kit test — 10 téléphones
        </h1>
        <p className="text-sm text-ink-muted mt-2 leading-relaxed">
          Session de test en parallèle : chaque téléphone reçoit un lien unique (Testeur 01 à
          10). Pas besoin d’App Store.
        </p>
      </div>

      {assigned && (
        <div className="rounded-xl border border-forest/40 bg-forest/10 p-4">
          <p className="text-xs text-forest font-medium">Ce téléphone est configuré comme</p>
          <p className="font-serif text-xl font-semibold text-ink mt-1">{assigned.name}</p>
          <p className="text-sm text-ink-muted">
            {assigned.institution} · tél. fictif {assigned.phone}
          </p>
          <p className="text-xs text-ink-muted mt-2">
            Points actuels : <strong className="text-forest">{progress.points}</strong>
          </p>
        </div>
      )}

      <section className="space-y-3">
        <h2 className="font-serif text-lg font-semibold text-ink flex items-center gap-2">
          <ExternalLink className="size-5 text-forest" />
          Lien de l’app
        </h2>
        <div className="rounded-xl border border-line bg-paper-light p-3 flex items-center gap-2">
          <code className="flex-1 text-xs break-all text-ink">{baseUrl}</code>
          <button
            type="button"
            onClick={() => copyText(baseUrl, 'base')}
            className="shrink-0 rounded-lg bg-forest text-white p-2"
            aria-label="Copier"
          >
            {copied === 'base' ? <Check className="size-4" /> : <Copy className="size-4" />}
          </button>
        </div>
        <p className="text-xs text-ink-muted">
          Envoyez ce lien par WhatsApp / SMS, ou générez un QR code via le bouton QR de cette page
          une fois déployée.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-lg font-semibold text-ink flex items-center gap-2">
          <Users className="size-5 text-forest" />
          10 liens testeurs
        </h2>
        <p className="text-sm text-ink-muted">
          Un lien par téléphone : le profil se configure automatiquement.
        </p>
        <ul className="space-y-2">
          {TESTEURS.map((t) => {
            const url = `${baseUrl}/kit-test?t=${t.id}`
            return (
              <li
                key={t.id}
                className="flex items-center gap-2 rounded-xl border border-line bg-paper-light px-3 py-2"
              >
                <Smartphone className="size-4 text-forest shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink">{t.name}</p>
                  <p className="text-xs text-ink-muted truncate">{url}</p>
                </div>
                <button
                  type="button"
                  onClick={() => copyText(url, t.id)}
                  className="shrink-0 rounded-lg border border-line px-2 py-1.5 text-xs font-medium"
                >
                  {copied === t.id ? 'OK' : 'Copier'}
                </button>
                <Link
                  to={`/kit-test?t=${t.id}`}
                  className="shrink-0 text-xs text-forest font-medium underline"
                >
                  Ouvrir
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-lg font-semibold text-ink flex items-center gap-2">
          <ListChecks className="size-5 text-forest" />
          Checklist (ce téléphone)
        </h2>
        <p className="text-xs text-ink-muted">
          {checkedCount}/{CHECKLIST.length} étapes · enregistrée sur cet appareil
        </p>
        <ul className="space-y-2">
          {CHECKLIST.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => toggleCheck(c.id)}
                className={cn(
                  'w-full flex items-start gap-3 rounded-xl border px-3 py-3 text-left text-sm transition-colors',
                  done[c.id]
                    ? 'border-forest/40 bg-forest/10 text-forest'
                    : 'border-line bg-paper-light'
                )}
              >
                <span
                  className={cn(
                    'mt-0.5 size-5 rounded border flex items-center justify-center shrink-0',
                    done[c.id] ? 'bg-forest border-forest text-white' : 'border-line'
                  )}
                >
                  {done[c.id] && <Check className="size-3" />}
                </span>
                {c.label}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => {
            setDone({})
            localStorage.removeItem('ingoma-kit-checklist')
          }}
          className="flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink"
        >
          <RotateCcw className="size-3" /> Réinitialiser la checklist
        </button>
      </section>

      <section className="rounded-xl border border-line bg-paper-light p-4 space-y-3">
        <h2 className="font-serif text-lg font-semibold text-ink flex items-center gap-2">
          <QrCode className="size-5 text-forest" />
          Protocole animateur (30 min)
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-ink leading-relaxed">
          <li>Déployer l’app (Vercel) et ouvrir cette page sur votre PC.</li>
          <li>Copier les 10 liens testeurs (ou un QR du lien principal).</li>
          <li>Donner 1 téléphone = 1 lien Testeur 01…10 (WhatsApp).</li>
          <li>Chacun suit la checklist (~5–8 min).</li>
          <li>
            Noter sur papier : téléphone OK / bloqué / remarque (réseau, OTP, quiz…).
          </li>
          <li>
            Points et progression sont <strong>par téléphone</strong> (pas de serveur
            partagé en mode pilote).
          </li>
        </ol>
        <div className="pt-2 flex flex-wrap gap-2">
          <Link
            to="/parcours/commande-publique"
            className="rounded-xl bg-forest text-white text-sm font-medium px-4 py-2.5"
          >
            Aller au parcours
          </Link>
          <Link
            to="/defi"
            className="rounded-xl border border-forest text-forest text-sm font-medium px-4 py-2.5"
          >
            Défi du jour
          </Link>
          <Link
            to="/profil"
            className="rounded-xl border border-line text-sm font-medium px-4 py-2.5"
          >
            Profil
          </Link>
        </div>
      </section>

      <p className="text-xs text-ink-muted leading-relaxed">
        Astuce Android : Chrome → menu → « Ajouter à l’écran d’accueil ». iPhone : Safari →
        Partager → « Sur l’écran d’accueil ».
      </p>
    </div>
  )
}
