export default function TutorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-forest">Tuteur / Aide</h1>
        <p className="text-sm text-ink-muted mt-1">
          Aide contextuelle pour la commande publique et la comptabilité publique.
        </p>
      </div>

      <div className="rounded-xl border border-line bg-paper-light p-4 space-y-3 text-sm leading-relaxed">
        <p>
          <strong>Besoin d'aide sur une notion ?</strong> Relisez la leçon concernée et le glossaire.
          Les définitions ARMP, DNCMP, PRMP, SIGEFI, ordonnateur / comptable y sont précisées.
        </p>
        <p>
          <strong>Quiz en échec ?</strong> Le seuil est de 70 %. Relisez les points clés de la leçon,
          puis réessayez. Chaque explication de réponse vous guide.
        </p>
        <p>
          <strong>Cas pratique</strong> : il n'y a pas de « bonne réponse unique ». L'objectif
          est de mobiliser les principes (transparence, séparation des fonctions, contrôles).
        </p>
        <p>
          <strong>Avertissement important</strong> — Ingoma est un outil de microlearning. Il ne
          remplace pas les textes officiels ni les instructions de votre institution. En cas de
          doute opérationnel, consultez la PRMP, la DNCMP, l'ARMP ou le service compétent.
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-line p-4 text-sm text-ink-muted">
        <p className="font-medium text-ink mb-1">Prochaine version</p>
        <p>
          Un tuteur conversationnel (IA) contextualisé sur le droit burundais de la commande et
          de la comptabilité publiques sera ajouté ici.
        </p>
      </div>
    </div>
  )
}
