"use client";
import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// MOCK DATA - même source que la liste
const MOCK_OPPORTUNITIES = {
  "opp-001": {
    id: "opp-001",
    name: "Kit accessoires mobilité quotidienne",
    score: 87.5,
    status: "hot",
    category: "Health & Wellness",
    sources: ["TikTok", "Amazon", "YouTube"],
    metrics: {
      demand: "Très élevé",
      competition: "Moyenne",
      margin: "45-60%",
      lifecycle: "Early (2-3 mois)"
    },
    window: "24-48h",
    windowStatus: "open",
    explanation: "Signal fort détecté sur TikTok avec +72% de croissance en 48h. UGC répété sur 5 créateurs fitness différents. Amazon montre une hausse de recherches (+34%) sans saturation ads. Fenêtre d'opportunité ouverte pour 2-3 jours avant pic de compétition.",
    price: "€39-€69",
    confidence: "high",
    signals: [
      { source: "TikTok", metric: "Croissance vues", value: "+72%", status: "positive", detail: "5 créateurs fitness différents avec UGC organique" },
      { source: "TikTok", metric: "Engagement rate", value: "8.4%", status: "positive", detail: "3x supérieur à la moyenne catégorie" },
      { source: "Amazon", metric: "Volume recherches", value: "+34%", status: "positive", detail: "Tendance croissante sur 7 jours" },
      { source: "Amazon", metric: "Saturation ads", value: "Faible", status: "positive", detail: "Seulement 12 sellers actifs" },
      { source: "YouTube", metric: "Tutorials", value: "+18", status: "neutral", detail: "Contenu éducatif en hausse" },
    ],
    strategy: {
      what: "Lancer rapidement avec bundle 3 produits accessoires mobilité",
      why: "Fenêtre d'opportunité courte (24-48h) avant saturation compétitive. Signal TikTok fort + faible saturation Amazon = timing optimal.",
      how: "Focus créatives mobilité urbaine + récupération active. Angle: gain de temps + santé quotidienne.",
      when: "Lancement immédiat recommandé",
      budget: "€500-€1000 test initial",
      channels: ["TikTok Ads", "Amazon Sponsored", "Instagram Stories"]
    },
    risks: [
      "Fenêtre courte : agir dans les 48h",
      "Compétition probable en augmentation rapide",
      "Nécessite créatives de qualité immédiate"
    ]
  },
  "opp-002": {
    id: "opp-002",
    name: "Gadgets tech posture bureau",
    score: 82.3,
    status: "hot",
    category: "Tech & Workspace",
    sources: ["Amazon", "AliExpress", "Instagram"],
    metrics: {
      demand: "Élevé",
      competition: "Faible",
      margin: "50-65%",
      lifecycle: "Growth (4-6 mois)"
    },
    window: "72h",
    windowStatus: "open",
    explanation: "Demande croissante sur Amazon (+45% recherches) avec faible saturation publicitaire. AliExpress montre 12 nouveaux fournisseurs cette semaine. Instagram ads encore peu présents. Timing optimal pour positioning premium.",
    price: "€49-€89",
    confidence: "high",
    signals: [
      { source: "Amazon", metric: "Volume recherches", value: "+45%", status: "positive", detail: "Croissance soutenue sur 14 jours" },
      { source: "AliExpress", metric: "Nouveaux fournisseurs", value: "+12", status: "neutral", detail: "Disponibilité produit en hausse" },
      { source: "Instagram", metric: "Saturation ads", value: "Faible", status: "positive", detail: "Peu de concurrence publicitaire" },
      { source: "Amazon", metric: "Reviews positives", value: "89%", status: "positive", detail: "Satisfaction client élevée" },
    ],
    strategy: {
      what: "Positionner premium avec angle santé workspace",
      why: "Faible compétition actuelle + demande croissante = opportunité de capturer marché avec positionnement premium.",
      how: "Target: télétravail + gaming. Angle santé dos/nuque. Créatives avant/après.",
      when: "Lancement sous 72h recommandé",
      budget: "€800-€1500 test initial",
      channels: ["Amazon Sponsored", "Instagram Ads", "Google Shopping"]
    },
    risks: [
      "Marché en croissance : nouveaux entrants probables",
      "Nécessite positioning premium crédible"
    ]
  }
};

export default function OpportunityDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const opportunity = MOCK_OPPORTUNITIES[id as keyof typeof MOCK_OPPORTUNITIES];

  if (!opportunity) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border p-12 text-center" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
          <div className="text-4xl mb-4">❌</div>
          <div className="text-lg font-semibold mb-2">Opportunité introuvable</div>
          <div className="text-sm mb-4" style={{ color: 'rgb(148, 163, 184)' }}>
            Cette opportunité n'existe pas ou a été supprimée
          </div>
          <Link href="/opportunities" className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold" style={{ background: 'linear-gradient(135deg, rgb(74, 95, 115), rgb(96, 125, 149))', color: 'white' }}>
            ← Retour aux opportunités
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link href="/opportunities" className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:underline" style={{ color: 'rgb(148, 163, 184)' }}>
        ← Retour aux opportunités
      </Link>

      {/* Header */}
      <div className="rounded-xl border p-6" style={{ background: 'linear-gradient(135deg, rgb(30, 41, 59), rgb(15, 23, 42))', borderColor: 'rgb(51, 65, 85)' }}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <h1 className="text-2xl font-bold">{opportunity.name}</h1>
              <span className="rounded px-2 py-0.5 text-xs font-bold uppercase" style={
                opportunity.status === "hot" ? { background: 'rgb(239, 68, 68)', color: 'white' } :
                { background: 'rgb(251, 191, 36)', color: 'rgb(15, 23, 42)' }
              }>
                {opportunity.status === "hot" ? "HOT" : "WATCH"}
              </span>
              <span className="rounded px-2 py-0.5 text-xs font-medium" style={{ background: 'rgba(74, 95, 115, 0.2)', color: 'rgb(148, 163, 184)' }}>
                Fenêtre: {opportunity.window}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm" style={{ color: 'rgb(148, 163, 184)' }}>
              <span>{opportunity.category}</span>
              <span>•</span>
              <span className="font-semibold" style={{ color: 'rgb(74, 222, 128)' }}>{opportunity.price}</span>
              <span>•</span>
              <div className="flex gap-1">
                {opportunity.sources.map(s => (
                  <span key={s} className="rounded px-2 py-0.5 text-xs font-medium" style={{ background: 'rgba(34, 197, 94, 0.15)', color: 'rgb(34, 197, 94)' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Oracle Score */}
          <div className="flex flex-col items-center justify-center shrink-0 rounded-lg p-6" style={{ background: 'rgba(15, 23, 42, 0.5)' }}>
            <div className="text-5xl font-bold" style={{ background: 'linear-gradient(135deg, rgb(96, 125, 149), rgb(212, 165, 116))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {opportunity.score}
            </div>
            <div className="mt-2 text-xs font-semibold" style={{ color: 'rgb(148, 163, 184)' }}>Oracle Score</div>
            <div className="mt-1 rounded px-2 py-0.5 text-xs font-medium" style={
              opportunity.confidence === "high" ? { background: 'rgba(74, 222, 128, 0.2)', color: 'rgb(74, 222, 128)' } :
              { background: 'rgba(251, 191, 36, 0.2)', color: 'rgb(251, 191, 36)' }
            }>
              {opportunity.confidence === "high" ? "Haute confiance" : "Confiance moyenne"}
            </div>
          </div>
        </div>
      </div>

      {/* Analyse Oracle */}
      <div className="rounded-xl border p-6" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
        <div className="mb-4 flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          <h2 className="text-lg font-semibold">Analyse Oracle</h2>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'rgb(203, 213, 225)' }}>
          {opportunity.explanation}
        </p>
      </div>

      {/* Métriques clés */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border p-4" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'rgb(148, 163, 184)' }}>Demande</div>
          <div className="text-xl font-bold">{opportunity.metrics.demand}</div>
        </div>
        <div className="rounded-xl border p-4" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'rgb(148, 163, 184)' }}>Concurrence</div>
          <div className="text-xl font-bold">{opportunity.metrics.competition}</div>
        </div>
        <div className="rounded-xl border p-4" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'rgb(148, 163, 184)' }}>Marge estimée</div>
          <div className="text-xl font-bold" style={{ color: 'rgb(74, 222, 128)' }}>{opportunity.metrics.margin}</div>
        </div>
        <div className="rounded-xl border p-4" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'rgb(148, 163, 184)' }}>Lifecycle</div>
          <div className="text-xl font-bold">{opportunity.metrics.lifecycle}</div>
        </div>
      </div>

      {/* Signaux observés */}
      <div className="rounded-xl border p-6" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
        <div className="mb-4 flex items-center gap-2">
          <span className="text-2xl">📊</span>
          <h2 className="text-lg font-semibold">Signaux observés</h2>
        </div>
        <div className="space-y-3">
          {opportunity.signals.map((signal, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border p-4" style={{ background: 'rgba(15, 23, 42, 0.5)', borderColor: 'rgba(74, 95, 115, 0.2)' }}>
              <div className="shrink-0">
                <span className={`inline-block h-2 w-2 rounded-full ${
                  signal.status === "positive" ? "bg-green-500" :
                  signal.status === "neutral" ? "bg-yellow-500" :
                  "bg-red-500"
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold" style={{ color: 'rgb(212, 165, 116)' }}>{signal.source}</span>
                  <span className="text-xs" style={{ color: 'rgb(148, 163, 184)' }}>•</span>
                  <span className="text-xs font-medium">{signal.metric}</span>
                </div>
                <div className="text-sm font-bold mb-1">{signal.value}</div>
                <div className="text-xs" style={{ color: 'rgb(148, 163, 184)' }}>{signal.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stratégie recommandée */}
      <div className="rounded-xl border p-6" style={{ background: 'linear-gradient(135deg, rgba(212, 165, 116, 0.1), rgba(74, 95, 115, 0.1))', borderColor: 'rgba(212, 165, 116, 0.3)' }}>
        <div className="mb-4 flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          <h2 className="text-lg font-semibold">Stratégie recommandée</h2>
        </div>
        <div className="space-y-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'rgb(212, 165, 116)' }}>Quoi faire</div>
            <p className="text-sm" style={{ color: 'rgb(203, 213, 225)' }}>{opportunity.strategy.what}</p>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'rgb(212, 165, 116)' }}>Pourquoi</div>
            <p className="text-sm" style={{ color: 'rgb(203, 213, 225)' }}>{opportunity.strategy.why}</p>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'rgb(212, 165, 116)' }}>Comment</div>
            <p className="text-sm" style={{ color: 'rgb(203, 213, 225)' }}>{opportunity.strategy.how}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'rgb(212, 165, 116)' }}>Quand</div>
              <p className="text-sm font-semibold">{opportunity.strategy.when}</p>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'rgb(212, 165, 116)' }}>Budget initial</div>
              <p className="text-sm font-semibold" style={{ color: 'rgb(74, 222, 128)' }}>{opportunity.strategy.budget}</p>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'rgb(212, 165, 116)' }}>Canaux</div>
              <div className="flex flex-wrap gap-1">
                {opportunity.strategy.channels.map(c => (
                  <span key={c} className="rounded px-2 py-0.5 text-xs font-medium" style={{ background: 'rgba(74, 95, 115, 0.2)', color: 'rgb(203, 213, 225)' }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risques */}
      {opportunity.risks && opportunity.risks.length > 0 && (
        <div className="rounded-xl border p-6" style={{ background: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
          <div className="mb-4 flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            <h2 className="text-lg font-semibold">Points d'attention</h2>
          </div>
          <ul className="space-y-2">
            {opportunity.risks.map((risk, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'rgb(203, 213, 225)' }}>
                <span className="shrink-0 text-red-400">•</span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button className="flex-1 md:flex-none rounded-lg px-6 py-3 text-sm font-semibold transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, rgb(74, 95, 115), rgb(96, 125, 149))', color: 'white' }}>
          🚀 Lancer le test
        </button>
        <button className="rounded-lg px-6 py-3 text-sm font-medium transition-all" style={{ background: 'rgba(74, 95, 115, 0.1)', color: 'rgb(203, 213, 225)', border: '1px solid rgba(74, 95, 115, 0.2)' }}>
          📤 Exporter l'analyse
        </button>
        <button className="rounded-lg px-6 py-3 text-sm font-medium transition-all" style={{ background: 'rgba(74, 95, 115, 0.1)', color: 'rgb(203, 213, 225)', border: '1px solid rgba(74, 95, 115, 0.2)' }}>
          🔗 Partager
        </button>
      </div>
    </div>
  );
}
