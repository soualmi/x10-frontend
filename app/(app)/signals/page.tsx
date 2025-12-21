"use client";
import * as React from "react";

// MOCK DATA - Phase 2 = API réelle
const MOCK_SIGNALS = [
  {
    source: "TikTok",
    status: "active",
    icon: "📱",
    color: "rgb(244, 63, 94)",
    metrics: {
      productsScanned: 1247,
      signalsDetected: 143,
      hotOpportunities: 23,
      lastSync: "il y a 2 min"
    },
    trends: [
      { topic: "Récupération active", growth: "+72%", status: "hot" },
      { topic: "Mobilité quotidienne", growth: "+58%", status: "hot" },
      { topic: "Home workspace", growth: "+34%", status: "rising" },
      { topic: "Beauty K-trend", growth: "-12%", status: "declining" }
    ],
    health: {
      apiStatus: "operational",
      dataQuality: "high",
      coverage: "95%"
    }
  },
  {
    source: "Amazon",
    status: "active",
    icon: "📦",
    color: "rgb(251, 146, 60)",
    metrics: {
      productsScanned: 892,
      signalsDetected: 98,
      hotOpportunities: 18,
      lastSync: "il y a 3 min"
    },
    trends: [
      { topic: "Tech posture bureau", growth: "+45%", status: "hot" },
      { topic: "Accessoires fitness", growth: "+38%", status: "rising" },
      { topic: "Kitchen innovation", growth: "+22%", status: "rising" },
      { topic: "Pet accessories", growth: "+15%", status: "stable" }
    ],
    health: {
      apiStatus: "operational",
      dataQuality: "high",
      coverage: "92%"
    }
  },
  {
    source: "AliExpress",
    status: "active",
    icon: "🛒",
    color: "rgb(239, 68, 68)",
    metrics: {
      productsScanned: 456,
      signalsDetected: 67,
      hotOpportunities: 12,
      lastSync: "il y a 5 min"
    },
    trends: [
      { topic: "Nouveaux fournisseurs tech", growth: "+28%", status: "rising" },
      { topic: "Prix compétitifs gadgets", growth: "+19%", status: "stable" },
      { topic: "Stock disponibilité", growth: "+12%", status: "stable" }
    ],
    health: {
      apiStatus: "operational",
      dataQuality: "medium",
      coverage: "78%"
    }
  },
  {
    source: "YouTube",
    status: "active",
    icon: "🎥",
    color: "rgb(239, 68, 68)",
    metrics: {
      productsScanned: 178,
      signalsDetected: 34,
      hotOpportunities: 8,
      lastSync: "il y a 8 min"
    },
    trends: [
      { topic: "Tutorials produits tech", growth: "+42%", status: "hot" },
      { topic: "Reviews fitness", growth: "+31%", status: "rising" },
      { topic: "Unboxing gadgets", growth: "+18%", status: "stable" }
    ],
    health: {
      apiStatus: "operational",
      dataQuality: "high",
      coverage: "85%"
    }
  },
  {
    source: "Instagram",
    status: "active",
    icon: "📸",
    color: "rgb(168, 85, 247)",
    metrics: {
      productsScanned: 52,
      signalsDetected: 12,
      hotOpportunities: 3,
      lastSync: "il y a 12 min"
    },
    trends: [
      { topic: "Ads saturation beauty", growth: "-8%", status: "declining" },
      { topic: "UGC fitness", growth: "+24%", status: "rising" },
      { topic: "Stories shopping", growth: "+15%", status: "stable" }
    ],
    health: {
      apiStatus: "operational",
      dataQuality: "medium",
      coverage: "68%"
    }
  },
  {
    source: "Facebook",
    status: "active",
    icon: "👥",
    color: "rgb(59, 130, 246)",
    metrics: {
      productsScanned: 22,
      signalsDetected: 8,
      hotOpportunities: 2,
      lastSync: "il y a 15 min"
    },
    trends: [
      { topic: "Groups discussions fitness", growth: "+18%", status: "stable" },
      { topic: "Marketplace local", growth: "+12%", status: "stable" }
    ],
    health: {
      apiStatus: "operational",
      dataQuality: "low",
      coverage: "45%"
    }
  }
];

export default function SignalsPage() {
  const [selectedSource, setSelectedSource] = React.useState<string | null>(null);

  const totalMetrics = {
    productsScanned: MOCK_SIGNALS.reduce((acc, s) => acc + s.metrics.productsScanned, 0),
    signalsDetected: MOCK_SIGNALS.reduce((acc, s) => acc + s.metrics.signalsDetected, 0),
    hotOpportunities: MOCK_SIGNALS.reduce((acc, s) => acc + s.metrics.hotOpportunities, 0),
    activeSources: MOCK_SIGNALS.filter(s => s.status === "active").length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Signaux par Source</h1>
        <p className="mt-1 text-sm" style={{ color: 'rgb(148, 163, 184)' }}>
          Surveillance multi-plateformes en temps réel pour détection d'opportunités
        </p>
      </div>

      {/* Vue d'ensemble */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border p-4" style={{ background: 'linear-gradient(135deg, rgb(30, 41, 59), rgb(15, 23, 42))', borderColor: 'rgb(51, 65, 85)' }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'rgb(148, 163, 184)' }}>Produits scannés</div>
          <div className="text-2xl font-bold">{totalMetrics.productsScanned.toLocaleString()}</div>
        </div>
        <div className="rounded-xl border p-4" style={{ background: 'linear-gradient(135deg, rgb(30, 41, 59), rgb(15, 23, 42))', borderColor: 'rgb(51, 65, 85)' }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'rgb(148, 163, 184)' }}>Signaux détectés</div>
          <div className="text-2xl font-bold" style={{ color: 'rgb(96, 165, 250)' }}>{totalMetrics.signalsDetected}</div>
        </div>
        <div className="rounded-xl border p-4" style={{ background: 'linear-gradient(135deg, rgb(30, 41, 59), rgb(15, 23, 42))', borderColor: 'rgb(51, 65, 85)' }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'rgb(148, 163, 184)' }}>Hot détectés</div>
          <div className="text-2xl font-bold" style={{ color: 'rgb(239, 68, 68)' }}>{totalMetrics.hotOpportunities}</div>
        </div>
        <div className="rounded-xl border p-4" style={{ background: 'linear-gradient(135deg, rgb(30, 41, 59), rgb(15, 23, 42))', borderColor: 'rgb(51, 65, 85)' }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'rgb(148, 163, 184)' }}>Sources actives</div>
          <div className="text-2xl font-bold" style={{ color: 'rgb(74, 222, 128)' }}>{totalMetrics.activeSources}/6</div>
        </div>
      </div>

      {/* Sources grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_SIGNALS.map((signal) => (
          <div
            key={signal.source}
            className="rounded-xl border p-6 transition-all hover:border-blue-500/30 cursor-pointer"
            style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}
            onClick={() => setSelectedSource(selectedSource === signal.source ? null : signal.source)}
          >
            {/* Header source */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{signal.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg">{signal.source}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-block h-2 w-2 rounded-full" style={{ background: 'rgb(74, 222, 128)' }} />
                    <span className="text-xs font-medium" style={{ color: 'rgb(74, 222, 128)' }}>Opérationnel</span>
                  </div>
                </div>
              </div>
              <div className="text-xs" style={{ color: 'rgb(148, 163, 184)' }}>
                {signal.metrics.lastSync}
              </div>
            </div>

            {/* Métriques */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <div className="text-xs font-semibold uppercase" style={{ color: 'rgb(148, 163, 184)' }}>Produits</div>
                <div className="text-xl font-bold" style={{ color: signal.color }}>{signal.metrics.productsScanned}</div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase" style={{ color: 'rgb(148, 163, 184)' }}>Signaux</div>
                <div className="text-xl font-bold">{signal.metrics.signalsDetected}</div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase" style={{ color: 'rgb(148, 163, 184)' }}>Hot</div>
                <div className="text-xl font-bold" style={{ color: 'rgb(239, 68, 68)' }}>{signal.metrics.hotOpportunities}</div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase" style={{ color: 'rgb(148, 163, 184)' }}>Qualité</div>
                <div className="text-sm font-semibold capitalize">{signal.health.dataQuality}</div>
              </div>
            </div>

            {/* Tendances */}
            <div className="border-t pt-4" style={{ borderColor: 'rgb(51, 65, 85)' }}>
              <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'rgb(148, 163, 184)' }}>
                Tendances détectées
              </div>
              <div className="space-y-2">
                {signal.trends.slice(0, selectedSource === signal.source ? signal.trends.length : 2).map((trend, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="flex-1 truncate" style={{ color: 'rgb(203, 213, 225)' }}>{trend.topic}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs font-semibold ${
                        trend.status === "hot" ? "text-red-400" :
                        trend.status === "rising" ? "text-green-400" :
                        trend.status === "stable" ? "text-blue-400" :
                        "text-gray-400"
                      }`}>
                        {trend.growth}
                      </span>
                      <span className={`inline-block h-1.5 w-1.5 rounded-full ${
                        trend.status === "hot" ? "bg-red-500" :
                        trend.status === "rising" ? "bg-green-500" :
                        trend.status === "stable" ? "bg-blue-500" :
                        "bg-gray-500"
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
              {signal.trends.length > 2 && selectedSource !== signal.source && (
                <button className="mt-2 text-xs font-medium" style={{ color: 'rgb(212, 165, 116)' }}>
                  Voir tout ({signal.trends.length}) →
                </button>
              )}
            </div>

            {/* Health expanded */}
            {selectedSource === signal.source && (
              <div className="mt-4 border-t pt-4" style={{ borderColor: 'rgb(51, 65, 85)' }}>
                <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'rgb(148, 163, 184)' }}>
                  État de la source
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span style={{ color: 'rgb(203, 213, 225)' }}>API Status</span>
                    <span className="capitalize font-medium" style={{ color: 'rgb(74, 222, 128)' }}>{signal.health.apiStatus}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: 'rgb(203, 213, 225)' }}>Qualité données</span>
                    <span className="capitalize font-medium">{signal.health.dataQuality}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: 'rgb(203, 213, 225)' }}>Couverture</span>
                    <span className="font-medium">{signal.health.coverage}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Légende statuts */}
      <div className="rounded-xl border p-6" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
        <div className="text-sm font-semibold mb-3">Légende des tendances</div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
            <span className="text-sm" style={{ color: 'rgb(203, 213, 225)' }}>🔥 Hot - Croissance forte</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm" style={{ color: 'rgb(203, 213, 225)' }}>📈 Rising - En hausse</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-sm" style={{ color: 'rgb(203, 213, 225)' }}>💎 Stable - Constant</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-gray-500" />
            <span className="text-sm" style={{ color: 'rgb(203, 213, 225)' }}>⬇️ Declining - En baisse</span>
          </div>
        </div>
      </div>
    </div>
  );
}
