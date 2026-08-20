import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setProfile } from '../lib/progress'
import { Logo } from '../components/Logo'

export default function LoginPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<'phone' | 'otp' | 'profile'>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [name, setName] = useState('')
  const [institution, setInstitution] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const fullPhone = `+257${phone.replace(/\D/g, '').slice(0, 8)}`

  function requestOtp(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const digits = phone.replace(/\D/g, '')
    if (digits.length !== 8 || !/^[67]/.test(digits)) {
      setError('Numéro invalide. Format : 6X XXX XXX ou 7X XXX XXX')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep('otp')
    }, 600)
  }

  function verifyOtp(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (otp.length !== 6) {
      setError('Code à 6 chiffres requis')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep('profile')
    }, 400)
  }

  function finish(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) {
      setError('Indiquez votre nom')
      return
    }
    setProfile({
      phone: fullPhone,
      displayName: name.trim(),
      institution: institution.trim() || undefined,
    })
    navigate('/')
  }

  return (
    <div className="max-w-sm mx-auto space-y-6 pt-4">
      <div className="text-center">
        <Logo size={56} className="mx-auto" />
        <h1 className="font-serif text-2xl font-semibold text-forest mt-3">Connexion</h1>
        <p className="text-sm text-ink-muted mt-1">
          Numéro burundais (+257) — OTP simulé pour la démo
        </p>
      </div>

      {step === 'phone' && (
        <form onSubmit={requestOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Numéro de téléphone
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-line bg-line/40 text-ink-muted text-sm font-medium">
                +257
              </span>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="79 123 456"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 rounded-r-xl border border-line bg-paper-light px-3 py-2.5 text-ink outline-none focus:border-forest focus:ring-1 focus:ring-forest"
              />
            </div>
          </div>
          {error && <p className="text-sm text-red-flag">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-forest text-white font-medium py-3 hover:bg-forest/90 disabled:opacity-60"
          >
            {loading ? 'Envoi…' : 'Recevoir le code'}
          </button>
          <p className="text-xs text-ink-muted text-center">
            Démo : le code OTP accepté est n'importe quel code à 6 chiffres (ex. 123456).
          </p>
        </form>
      )}

      {step === 'otp' && (
        <form onSubmit={verifyOtp} className="space-y-4">
          <p className="text-sm text-ink-muted">
            Code envoyé au {fullPhone}
          </p>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Code OTP</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              className="w-full rounded-xl border border-line bg-paper-light px-3 py-2.5 text-center text-lg tracking-widest outline-none focus:border-forest"
            />
          </div>
          {error && <p className="text-sm text-red-flag">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-forest text-white font-medium py-3 disabled:opacity-60"
          >
            {loading ? 'Vérification…' : 'Valider'}
          </button>
          <button
            type="button"
            onClick={() => setStep('phone')}
            className="w-full text-sm text-ink-muted hover:text-ink"
          >
            Modifier le numéro
          </button>
        </form>
      )}

      {step === 'profile' && (
        <form onSubmit={finish} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Nom complet</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex. Marie Ndayishimiye"
              className="w-full rounded-xl border border-line bg-paper-light px-3 py-2.5 outline-none focus:border-forest"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Institution (optionnel)
            </label>
            <input
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder="Ex. Ministère des Finances"
              className="w-full rounded-xl border border-line bg-paper-light px-3 py-2.5 outline-none focus:border-forest"
            />
          </div>
          {error && <p className="text-sm text-red-flag">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-forest text-white font-medium py-3"
          >
            Continuer
          </button>
        </form>
      )}
    </div>
  )
}
