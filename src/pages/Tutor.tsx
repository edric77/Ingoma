import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { askAssistant, SUGGESTED_QUESTIONS, type ChatMessage } from '../lib/assistant'
import { Send, Bot, User, BookOpen } from 'lucide-react'
import { cn } from '../lib/utils'

function formatText(text: string) {
  // simple **bold** and newlines
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return (
        <strong key={i} className="text-ink font-semibold">
          {p.slice(2, -2)}
        </strong>
      )
    }
    return p.split('\n').map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </span>
    ))
  })
}

export default function TutorPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Bonjour. Je suis l'assistant tuteur Ingoma (gratuit, sans connexion à un service payant). Posez une question sur la commande publique ou la comptabilité publique au Burundi.",
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  function send(text: string) {
    const q = text.trim()
    if (!q || typing) return
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: q,
    }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setTyping(true)
    // Léger délai pour feedback UX (pas un vrai appel réseau)
    window.setTimeout(() => {
      const res = askAssistant(q)
      const bot: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        text: res.text,
        sources: res.sources,
      }
      setMessages((m) => [...m, bot])
      setTyping(false)
    }, 280)
  }

  return (
    <div className="flex flex-col min-h-[calc(100svh-8rem)]">
      <div className="mb-4">
        <h1 className="font-serif text-2xl font-semibold text-forest flex items-center gap-2">
          <Bot className="size-7" />
          Assistant tuteur
        </h1>
        <p className="text-sm text-ink-muted mt-1 leading-relaxed">
          Gratuit · réponses issues des leçons et du glossaire Ingoma · pas d’API payante.
        </p>
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {SUGGESTED_QUESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="rounded-full border border-forest/30 bg-forest/5 text-forest text-xs px-3 py-1.5 hover:bg-forest/10"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 space-y-3 pb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn('flex gap-2', msg.role === 'user' ? 'justify-end' : 'justify-start')}
          >
            {msg.role === 'assistant' && (
              <div className="size-8 rounded-full bg-forest/15 text-forest flex items-center justify-center shrink-0">
                <Bot className="size-4" />
              </div>
            )}
            <div
              className={cn(
                'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                msg.role === 'user'
                  ? 'bg-forest text-white rounded-br-md'
                  : 'bg-paper-light border border-line text-ink rounded-bl-md'
              )}
            >
              <div>{formatText(msg.text)}</div>
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-2 pt-2 border-t border-line/60 space-y-1">
                  <p className="text-[10px] uppercase tracking-wide text-ink-muted">Sources</p>
                  {msg.sources.map((s) =>
                    s.href ? (
                      <Link
                        key={s.title}
                        to={s.href}
                        className="flex items-center gap-1 text-xs text-forest font-medium hover:underline"
                      >
                        <BookOpen className="size-3" />
                        {s.title}
                      </Link>
                    ) : (
                      <p key={s.title} className="text-xs text-ink-muted">
                        {s.title}
                      </p>
                    )
                  )}
                </div>
              )}
            </div>
            {msg.role === 'user' && (
              <div className="size-8 rounded-full bg-line text-ink-muted flex items-center justify-center shrink-0">
                <User className="size-4" />
              </div>
            )}
          </div>
        ))}
        {typing && (
          <div className="flex gap-2 items-center text-ink-muted text-xs">
            <div className="size-8 rounded-full bg-forest/15 flex items-center justify-center">
              <Bot className="size-4 text-forest" />
            </div>
            <span className="animate-pulse">Recherche dans le contenu…</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        className="sticky bottom-0 pt-2 pb-1 bg-paper border-t border-line -mx-4 px-4"
        onSubmit={(e) => {
          e.preventDefault()
          send(input)
        }}
      >
        <div className="flex gap-2 items-end">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ex. : rôle de la DNCMP…"
            className="flex-1 rounded-xl border border-line bg-paper-light px-3 py-3 text-sm outline-none focus:border-forest"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={!input.trim() || typing}
            className="rounded-xl bg-forest text-white p-3 disabled:opacity-40"
            aria-label="Envoyer"
          >
            <Send className="size-5" />
          </button>
        </div>
        <p className="text-[10px] text-ink-muted mt-1.5 leading-relaxed">
          Assistant local gratuit. Ne constitue pas un avis juridique officiel.
        </p>
      </form>
    </div>
  )
}
