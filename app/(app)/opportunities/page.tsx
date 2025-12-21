"use client";
import * as React from "react";
import Link from "next/link";

// MOCK DATA - Phase 2 = API réelle
const MOCK_OPPORTUNITIES = [
  {
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
    explanation: "Signal fort détecté sur TikTok avec +72% de croissance en 48h. UGC répété sur 5 créateurs fitness différents. Amazon montre une hausse de recherches (+34%) sans saturation ads. Fenêtre d'opportunité ouverte pour 2-3 jours avant pic de compétition.",
    price: "€39-€69",
    confidence: "high"
  },
  {
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
    explanation: "Demande croissante sur Amazon (+45% recherches) avec faible saturation publicitaire. AliExpress montre 12 nouveaux fournisseurs cette semaine. Instagram ads encore peu présents. Timing optimal pour positioning premium.",
    price: "€49-€89",
    confidence: "high"
  },
  {
    id: "opp-003",
    name: "Équipement récupération sportive",
    score: 79.8,
    status: "hot",
    category: "Fitness & Recovery",
    sources: ["TikTok", "YouTube", "Facebook"],
    metrics: {
      demand: "Croissant",
      competition: "Moyenne-élevée",
      margin: "40-55%",
      lifecycle: "Early (2-4 mois)"
    },
    window: "48-72h",
    explanation: "TikTok montre engagement 3x supérieur à la moyenne sur vidéos récupération. YouTube tutorials en hausse. Facebook groups actifs. Marché encore ouvert mais compétition s'intensifie.",
    price: "€59-€99",
    confidence: "medium"
  },
  {
    id: "opp-004",
    name: "Home office ergonomie",
    score: 76.2,
    status: "watch",
    category: "Workspace",
    sources: ["Amazon", "Meta"],
    metrics: {
      demand: "Stable",
      competition: "Élevée",
      margin: "35-50%",
      lifecycle: "Mature (6+ mois)"
    },
    window: "7d",
    explanation: "Demande stable mais marché saturé. Amazon CPM élevé. Potentiel en positioning de niche ou bundle différencié. Surveiller évolution concurrence avant test.",
    price: "€69-€129",
    confidence: "medium"
  },
  {
    id: "opp-005",
    name: "Accessoires cuisine innovation",
    score: 68.4,
    status: "watch",
    category: "Home & Kitchen",
    sources: ["TikTok", "Amazon"],
    metrics: {
      demand: "Modéré",
      competition: "Moyenne",
      margin: "40-55%",
      lifecycle: "Early (3-5 mois)"
    },
    window: "7-14d",
    explanation: "Signal émergent sur TikTok mais volume encore faible. Amazon montre intérêt croissant. Attendre confirmation sur 7-14 jours avant investissement.",
    price: "€29-€49",
    confidence: "low"
  },
  {
    id: "opp-006",
    name: "Produits beauté tendance K-beauty",
    score: 54.2,
    status: "ignore",
    category: "Beauty",
    sources: ["Instagram", "TikTok"],
    metrics: {
      demand: "Saturé",
      competition: "Très élevée",
      margin: "25-35%",
      lifecycle: "Declining"
    },
    window: "n/a",
    explanation: "Marché saturé avec forte compétition publicitaire. CPM élevé, marge faible. Fenêtre d'opportunité fermée. Ne pas tester.",
    price: "€19-€39",
    confidence: "high"
  },
];

export default function OpportunitiesPage() {
  const [selectedFilter, setSelectedFilter] = React.useState<string>("all");
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  // Filtrage
  const filteredOpportunities = MOCK_OPPORTUNITIES.filter(opp => {
    const matchesFilter = selectedFilter === "all" || opp.status === selectedFilter;
    const matchesSearch = opp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          opp.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const counts = {
    all: MOCK_OPPORTUNITIES.length,
    hot: MOCK_OPPORTUNITIES.filter(o => o.status === "hot").length,
    watch: MOCK_OPPORTUNITIES.filter(o => o.status === "watch").length,
    ignore: MOCK_OPPORTUNITIES.filter(o => o.status === "ignore").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Opportunités Produits</h1>
          <p className="mt-1 text-sm" style={{ color: 'rgb(148, 163, 184)' }}>
            Produits détectés avec scoring Oracle et stratégie actionnable
          </p>
        </div>
        <button className="rounded-lg px-4 py-2.5 text-sm font-semibold transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, rgb(74, 95, 115), rgb(96, 125, 149))', color: 'white' }}>
          + Analyser nouveau produit
        </button>
      </div>

      {/* Filtres rapides */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedFilter("all")}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${selectedFilter === "all" ? 'font-semibold' : ''}`}
          style={selectedFilter === "all" 
            ? { background: 'rgba(74, 95, 115, 0.2)', color: 'rgb(212, 165, 116)', border: '1px solid rgba(212, 165, 116, 0.3)' }
            : { background: 'rgba(74, 95, 115, 0.1)', color: 'rgb(148, 163, 184)', border: '1px solid rgba(74, 95, 115, 0.2)' }
          }
        >
          Tous ({counts.all})
        </button>
        <button
          onClick={() => setSelectedFilter("hot")}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${selectedFilter === "hot" ? 'font-semibold' : ''}`}
          style={selectedFilter === "hot"
            ? { background: 'rgba(239, 68, 68, 0.2)', color: 'rgb(239, 68, 68)', border: '1px solid rgba(239, 68, 68, 0.3)' }
            : { background: 'rgba(74, 95, 115, 0.1)', color: 'rgb(148, 163, 184)', border: '1px solid rgba(74, 95, 115, 0.2)' }
          }
        >
          🔥 Hot ({counts.hot})
        </button>
        <button
          onClick={() => setSelectedFilter("watch")}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${selectedFilter === "watch" ? 'font-semibold' : ''}`}
          style={selectedFilter === "watch"
            ? { background: 'rgba(251, 191, 36, 0.2)', color: 'rgb(251, 191, 36)', border: '1px solid rgba(251, 191, 36, 0.3)' }
            : { background: 'rgba(74, 95, 115, 0.1)', color: 'rgb(148, 163, 184)', border: '1px solid rgba(74, 95, 115, 0.2)' }
          }
        >
          👁️ Surveiller ({counts.watch})
        </button>
        <button
          onClick={() => setSelectedFilter("ignore")}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${selectedFilter === "ignore" ? 'font-semibold' : ''}`}
          style={selectedFilter === "ignore"
            ? { background: 'rgba(148, 163, 184, 0.2)', color: 'rgb(148, 163, 184)', border: '1px solid rgba(148, 163, 184, 0.3)' }
            : { background: 'rgba(74, 95, 115, 0.1)', color: 'rgb(148, 163, 184)', border: '1px solid rgba(74, 95, 115, 0.2)' }
          }
        >
          ❌ Ignorer ({counts.ignore})
        </button>
      </div>

      {/* Recherche */}
      <div>
        <input
          type="text"
          placeholder="🔍 Rechercher un produit ou une catégorie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border px-4 py-2.5 text-sm transition-all focus:outline-none"
          style={{ 
            background: 'rgb(30, 41, 59)', 
            borderColor: 'rgb(51, 65, 85)',
            color: 'rgb(248, 250, 252)'
          }}
        />
      </div>

      {/* Résultats count */}
      <div className="text-sm" style={{ color: 'rgb(148, 163, 184)' }}>
        {filteredOpportunities.length} opportunité{filteredOpportunities.length > 1 ? 's' : ''} trouvée{filteredOpportunities.length > 1 ? 's' : ''}
      </div>

      {/* Liste opportunités */}
      {filteredOpportunities.length > 0 ? (
        <div className="space-y-4">
          {filteredOpportunities.map((opp) => (
            <div key={opp.id} className="rounded-xl border p-6 transition-all hover:border-blue-500/30" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
              {/* Header card */}
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  {/* Titre + badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{opp.name}</h3>
                    <span className={`rounded px-2 py-0.5 text-xs font-bold uppercase`} style={
                      opp.status === "hot" ? { background: 'rgb(239, 68, 68)', color: 'white' } :
                      opp.status === "watch" ? { background: 'rgb(251, 191, 36)', color: 'rgb(15, 23, 42)' } :
                      { background: 'rgb(148, 163, 184)', color: 'white' }
                    }>
                      {opp.status === "hot" ? "HOT" : opp.status === "watch" ? "WATCH" : "IGNORE"}
                    </span>
                    <span className="rounded px-2 py-0.5 text-xs font-medium" style={{ background: 'rgba(74, 95, 115, 0.2)', color: 'rgb(148, 163, 184)' }}>
                      {opp.window}
                    </span>
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-3 text-xs mb-4" style={{ color: 'rgb(148, 163, 184)' }}>
                    <span>{opp.category}</span>
                    <span>•</span>
                    <span className="font-semibold" style={{ color: 'rgb(74, 222, 128)' }}>{opp.price}</span>
                    <span>•</span>
                    <div className="flex gap-1">
                      {opp.sources.map(s => (
                        <span key={s} className="rounded px-1.5 py-0.5 text-xs font-medium" style={{ background: 'rgba(34, 197, 94, 0.15)', color: 'rgb(34, 197, 94)' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Métriques */}
                  <div className="grid grid-cols-2 gap-4 mb-4 md:grid-cols-4">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgb(148, 163, 184)' }}>Demande</div>
                      <div className="mt-1 text-sm font-semibold">{opp.metrics.demand}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgb(148, 163, 184)' }}>Concurrence</div>
                      <div className="mt-1 text-sm font-semibold">{opp.metrics.competition}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgb(148, 163, 184)' }}>Marge estimée</div>
                      <div className="mt-1 text-sm font-semibold" style={{ color: 'rgb(74, 222, 128)' }}>{opp.metrics.margin}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgb(148, 163, 184)' }}>Lifecycle</div>
                      <div className="mt-1 text-sm font-semibold">{opp.metrics.lifecycle}</div>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(74, 95, 115, 0.1)', border: '1px solid rgba(74, 95, 115, 0.2)' }}>
                    <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={{ color: 'rgb(212, 165, 116)' }}>
                      <span>💡</span>
                      <span>Analyse Oracle</span>
                      <span className="rounded px-1.5 py-0.5 text-xs font-medium normal-case" style={
                        opp.confidence === "high" ? { background: 'rgba(74, 222, 128, 0.2)', color: 'rgb(74, 222, 128)' } :
                        opp.confidence === "medium" ? { background: 'rgba(251, 191, 36, 0.2)', color: 'rgb(251, 191, 36)' } :
                        { background: 'rgba(148, 163, 184, 0.2)', color: 'rgb(148, 163, 184)' }
                      }>
                        {opp.confidence === "high" ? "Haute confiance" : opp.confidence === "medium" ? "Confiance moyenne" : "Faible confiance"}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgb(203, 213, 225)' }}>
                      {opp.explanation}
                    </p>
                  </div>
                </div>

                {/* Oracle Score */}
                <div className="flex flex-col items-center justify-center shrink-0 rounded-lg p-4" style={{ background: 'rgba(15, 23, 42, 0.5)' }}>
                  <div className="text-4xl font-bold" style={{ background: 'linear-gradient(135deg, rgb(96, 125, 149), rgb(212, 165, 116))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {opp.score}
                  </div>
                  <div className="mt-1 text-xs font-semibold" style={{ color: 'rgb(148, 163, 184)' }}>Oracle Score</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 border-t pt-4 mt-4" style={{ borderColor: 'rgb(51, 65, 85)' }}>
                <Link href={`/opportunities/${opp.id}`} className="flex-1 md:flex-none rounded-lg px-4 py-2 text-sm font-semibold text-center transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, rgb(74, 95, 115), rgb(96, 125, 149))', color: 'white' }}>
                  Voir l'analyse complète →
                </Link>
                <button className="rounded-lg px-4 py-2 text-sm font-medium transition-all" style={{ background: 'rgba(74, 95, 115, 0.1)', color: 'rgb(203, 213, 225)', border: '1px solid rgba(74, 95, 115, 0.2)' }}>
                  📤 Exporter
                </button>
                <button className="rounded-lg px-4 py-2 text-sm font-medium transition-all" style={{ background: 'rgba(74, 95, 115, 0.1)', color: 'rgb(203, 213, 225)', border: '1px solid rgba(74, 95, 115, 0.2)' }}>
                  🔗 Partager
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // État vide
        <div className="rounded-xl border p-12 text-center" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
          <div className="text-4xl mb-4">🔍</div>
          <div className="text-lg font-semibold mb-2">Aucune opportunité trouvée</div>
          <div className="text-sm" style={{ color: 'rgb(148, 163, 184)' }}>
            Essayez de modifier vos filtres ou votre recherche
          </div>
        </div>
      )}
    </div>
  );
}
