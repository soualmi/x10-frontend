import * as React from "react";
import Link from "next/link";
import { KpiCard } from "@/components/ui";
import { fetchStats, fetchProducts } from "@/lib/api";
import { calculateDashboardMetrics, transformProductToOpportunity } from "@/lib/transformers";

export default async function DashboardPage() {
  // Fetch vraies données
  const stats = await fetchStats();
  const products = await fetchProducts({ limit: 50 });
  const metrics = calculateDashboardMetrics(products);
  
  // Top 4 opportunités
  const topOpportunities = products
    .map(transformProductToOpportunity)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border p-6" style={{ background: 'linear-gradient(135deg, rgb(30, 41, 59), rgb(15, 23, 42))', borderColor: 'rgb(51, 65, 85)' }}>
        <div className="mb-3 flex items-center gap-3">
          <div className="text-3xl">📊</div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Intelligence Dashboard</h1>
            <p className="text-sm" style={{ color: 'rgb(148, 163, 184)' }}>
              Vue d'ensemble de l'analyse produits et opportunités stratégiques
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium" style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.3)', color: 'rgb(34, 197, 94)' }}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: 'rgb(34, 197, 94)' }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: 'rgb(34, 197, 94)' }} />
            </span>
            Système actif
          </span>
          <span className="rounded-md px-2.5 py-1 text-xs font-medium" style={{ background: 'rgba(74, 95, 115, 0.15)', border: '1px solid rgba(74, 95, 115, 0.3)', color: 'rgb(148, 163, 184)' }}>
            Dernière analyse : il y a {metrics.last_update}
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <KpiCard label="Produits" value={metrics.total_products.toLocaleString()} color="rgb(212, 165, 116)" />
        <KpiCard label="Opportunités" value={metrics.opportunities_count} color="rgb(96, 165, 250)" />
        <KpiCard label="Score moyen" value={metrics.avg_score} color="rgb(212, 165, 116)" />
        <KpiCard label="Sources" value={`${metrics.sources_active}/6`} color="rgb(74, 222, 128)" />
        <KpiCard label="Signaux" value={metrics.signals_detected} color="rgb(96, 165, 250)" />
        <KpiCard label="MAJ" value={metrics.last_update} color="rgb(251, 191, 36)" />
      </div>

      {/* Top Opportunités */}
      <div className="rounded-xl border p-6" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Top Opportunités</h2>
          <Link href="/opportunities" className="text-sm font-medium transition-colors hover:underline" style={{ color: 'rgb(212, 165, 116)' }}>
            Voir tout →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {topOpportunities.map((opp) => (
            <Link
              key={opp.id}
              href={`/opportunities/${opp.id}`}
              className="rounded-lg border p-4 transition-all hover:border-blue-500/30 hover:scale-[1.02]"
              style={{ background: 'rgba(15, 23, 42, 0.5)', borderColor: 'rgba(74, 95, 115, 0.2)' }}
            >
              <div className="mb-3 flex items-start justify-between">
                <h3 className="text-sm font-semibold leading-tight">{opp.name}</h3>
                <span className={`shrink-0 ml-2 rounded px-1.5 py-0.5 text-xs font-bold uppercase`} style={
                  opp.status === 'hot' ? { background: 'rgb(239, 68, 68)', color: 'white' } :
                  { background: 'rgb(251, 191, 36)', color: 'rgb(15, 23, 42)' }
                }>
                  {opp.status === 'hot' ? '🔥' : '👀'}
                </span>
              </div>
              <div className="mb-3 text-xs" style={{ color: 'rgb(148, 163, 184)' }}>
                {opp.category}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, rgb(96, 125, 149), rgb(212, 165, 116))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {opp.score}
                </div>
                <div className="text-xs font-medium" style={{ color: 'rgb(148, 163, 184)' }}>
                  Oracle Score
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border p-6" style={{ background: 'linear-gradient(135deg, rgba(212, 165, 116, 0.1), rgba(74, 95, 115, 0.1))', borderColor: 'rgba(212, 165, 116, 0.3)' }}>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            <h3 className="font-semibold">Insight du Jour</h3>
          </div>
          <p className="mb-4 text-sm leading-relaxed" style={{ color: 'rgb(203, 213, 225)' }}>
            {metrics.hot_count > 0 
              ? `${metrics.hot_count} opportunité${metrics.hot_count > 1 ? 's' : ''} HOT détectée${metrics.hot_count > 1 ? 's' : ''} avec fenêtre d'action courte. Agir rapidement recommandé.`
              : "Marché calme actuellement. Surveillance active en cours sur toutes les sources."}
          </p>
          <Link href="/opportunities" className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all hover:opacity-90" style={{ background: 'rgba(212, 165, 116, 0.1)', color: 'rgb(212, 165, 116)', border: '1px solid rgba(212, 165, 116, 0.3)' }}>
            Analyser →
          </Link>
        </div>

        <div className="rounded-xl border p-6" style={{ background: 'rgba(96, 165, 250, 0.05)', borderColor: 'rgba(96, 165, 250, 0.2)' }}>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            <h3 className="font-semibold">Action Prioritaire</h3>
          </div>
          <p className="mb-4 text-sm leading-relaxed" style={{ color: 'rgb(203, 213, 225)' }}>
            {topOpportunities.length > 0
              ? `Analyser "${topOpportunities[0].name}" (Score ${topOpportunities[0].score}) - ${topOpportunities[0].explanation}`
              : "Aucune action urgente. Continuer la surveillance."}
          </p>
          <Link href={topOpportunities.length > 0 ? `/opportunities/${topOpportunities[0].id}` : "/opportunities"} className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, rgb(74, 95, 115), rgb(96, 125, 149))', color: 'white' }}>
            Voir →
          </Link>
        </div>
      </div>

      {/* Analyse par Source */}
      <div className="rounded-xl border p-6" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
        <h2 className="mb-4 text-lg font-semibold">Analyse par Source</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          <div className="rounded-lg border p-3 text-center" style={{ background: 'rgba(15, 23, 42, 0.5)', borderColor: 'rgba(244, 63, 94, 0.3)' }}>
            <div className="mb-1 text-2xl font-bold" style={{ color: 'rgb(244, 63, 94)' }}>{metrics.total_products}</div>
            <div className="text-xs" style={{ color: 'rgb(148, 163, 184)' }}>TikTok</div>
          </div>
          <div className="rounded-lg border p-3 text-center opacity-40" style={{ background: 'rgba(15, 23, 42, 0.5)', borderColor: 'rgba(74, 95, 115, 0.2)' }}>
            <div className="mb-1 text-2xl font-bold" style={{ color: 'rgb(251, 146, 60)' }}>0</div>
            <div className="text-xs" style={{ color: 'rgb(148, 163, 184)' }}>Amazon</div>
          </div>
          <div className="rounded-lg border p-3 text-center opacity-40" style={{ background: 'rgba(15, 23, 42, 0.5)', borderColor: 'rgba(74, 95, 115, 0.2)' }}>
            <div className="mb-1 text-2xl font-bold" style={{ color: 'rgb(239, 68, 68)' }}>0</div>
            <div className="text-xs" style={{ color: 'rgb(148, 163, 184)' }}>AliExpress</div>
          </div>
          <div className="rounded-lg border p-3 text-center opacity-40" style={{ background: 'rgba(15, 23, 42, 0.5)', borderColor: 'rgba(74, 95, 115, 0.2)' }}>
            <div className="mb-1 text-2xl font-bold" style={{ color: 'rgb(239, 68, 68)' }}>0</div>
            <div className="text-xs" style={{ color: 'rgb(148, 163, 184)' }}>YouTube</div>
          </div>
          <div className="rounded-lg border p-3 text-center opacity-40" style={{ background: 'rgba(15, 23, 42, 0.5)', borderColor: 'rgba(74, 95, 115, 0.2)' }}>
            <div className="mb-1 text-2xl font-bold" style={{ color: 'rgb(168, 85, 247)' }}>0</div>
            <div className="text-xs" style={{ color: 'rgb(148, 163, 184)' }}>Instagram</div>
          </div>
          <div className="rounded-lg border p-3 text-center opacity-40" style={{ background: 'rgba(15, 23, 42, 0.5)', borderColor: 'rgba(74, 95, 115, 0.2)' }}>
            <div className="mb-1 text-2xl font-bold" style={{ color: 'rgb(59, 130, 246)' }}>0</div>
            <div className="text-xs" style={{ color: 'rgb(148, 163, 184)' }}>Facebook</div>
          </div>
        </div>
      </div>
    </div>
  );
}
