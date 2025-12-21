import * as React from "react";
import Link from "next/link";
import { fetchProducts } from "@/lib/api";
import { transformProductToOpportunity } from "@/lib/transformers";

export default async function OpportunitiesPage() {
  // Fetch toutes les opportunités
  const products = await fetchProducts({ limit: 50 });
  const opportunities = products.map(transformProductToOpportunity);

  // Filtres pour la démo (côté serveur pour l'instant)
  const hotOpps = opportunities.filter(o => o.status === 'hot');
  const watchOpps = opportunities.filter(o => o.status === 'watch');
  const ignoreOpps = opportunities.filter(o => o.status === 'ignore');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border p-6" style={{ background: 'linear-gradient(135deg, rgb(30, 41, 59), rgb(15, 23, 42))', borderColor: 'rgb(51, 65, 85)' }}>
        <div className="flex items-start gap-4">
          <div className="text-4xl">💎</div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight">Opportunités Oracle</h1>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: 'rgb(148, 163, 184)' }}>
              <strong style={{ color: 'rgb(248, 250, 252)' }}>Opportunités détectées</strong> par Oracle sur TikTok, Amazon, AliExpress et autres sources. 
              Chaque opportunité est analysée avec un <strong style={{ color: 'rgb(212, 165, 116)' }}>Oracle Score</strong>, 
              un <strong style={{ color: 'rgb(239, 68, 68)' }}>statut</strong> (HOT/WATCH/IGNORE), 
              et une <strong style={{ color: 'rgb(96, 165, 250)' }}>fenêtre d'action</strong> pour décider vite.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-md px-2.5 py-1 text-xs font-medium" style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: 'rgb(239, 68, 68)' }}>
                HOT : {hotOpps.length}
              </span>
              <span className="rounded-md px-2.5 py-1 text-xs font-medium" style={{ background: 'rgba(251, 191, 36, 0.15)', border: '1px solid rgba(251, 191, 36, 0.3)', color: 'rgb(251, 191, 36)' }}>
                WATCH : {watchOpps.length}
              </span>
              <span className="rounded-md px-2.5 py-1 text-xs font-medium" style={{ background: 'rgba(148, 163, 184, 0.15)', border: '1px solid rgba(148, 163, 184, 0.3)', color: 'rgb(148, 163, 184)' }}>
                IGNORE : {ignoreOpps.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* HOT Opportunités */}
      {hotOpps.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold">🔥 Opportunités HOT ({hotOpps.length})</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {hotOpps.map((opp) => (
              <Link
                key={opp.id}
                href={`/opportunities/${opp.id}`}
                className="rounded-xl border p-5 transition-all hover:scale-[1.02] hover:border-red-500/30"
                style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h3 className="flex-1 text-sm font-semibold leading-tight">{opp.name}</h3>
                  <span className="shrink-0 rounded px-1.5 py-0.5 text-xs font-bold" style={{ background: 'rgb(239, 68, 68)', color: 'white' }}>
                    HOT
                  </span>
                </div>
                
                <div className="mb-3 flex items-center gap-2 text-xs" style={{ color: 'rgb(148, 163, 184)' }}>
                  <span>{opp.category}</span>
                  {opp.window !== 'n/a' && (
                    <>
                      <span>•</span>
                      <span className="rounded px-1.5 py-0.5 font-medium" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'rgb(239, 68, 68)' }}>
                        ⏱️ {opp.window}
                      </span>
                    </>
                  )}
                </div>

                <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="font-semibold uppercase" style={{ color: 'rgb(148, 163, 184)' }}>Demande</div>
                    <div className="font-medium">{opp.metrics.demand}</div>
                  </div>
                  <div>
                    <div className="font-semibold uppercase" style={{ color: 'rgb(148, 163, 184)' }}>Lifecycle</div>
                    <div className="font-medium capitalize">{opp.metrics.lifecycle}</div>
                  </div>
                </div>

                <div className="rounded-lg p-3 text-xs leading-relaxed mb-3" style={{ background: 'rgba(15, 23, 42, 0.5)', color: 'rgb(148, 163, 184)' }}>
                  {opp.explanation}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, rgb(96, 125, 149), rgb(212, 165, 116))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {opp.score}
                  </div>
                  <div className="text-xs font-semibold" style={{ color: 'rgb(148, 163, 184)' }}>Oracle Score</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* WATCH Opportunités */}
      {watchOpps.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold">👀 Opportunités WATCH ({watchOpps.length})</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {watchOpps.map((opp) => (
              <Link
                key={opp.id}
                href={`/opportunities/${opp.id}`}
                className="rounded-xl border p-5 transition-all hover:scale-[1.02] hover:border-yellow-500/30"
                style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h3 className="flex-1 text-sm font-semibold leading-tight">{opp.name}</h3>
                  <span className="shrink-0 rounded px-1.5 py-0.5 text-xs font-bold" style={{ background: 'rgb(251, 191, 36)', color: 'rgb(15, 23, 42)' }}>
                    WATCH
                  </span>
                </div>
                
                <div className="mb-3 text-xs" style={{ color: 'rgb(148, 163, 184)' }}>{opp.category}</div>

                <div className="rounded-lg p-3 text-xs leading-relaxed mb-3" style={{ background: 'rgba(15, 23, 42, 0.5)', color: 'rgb(148, 163, 184)' }}>
                  {opp.explanation}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, rgb(96, 125, 149), rgb(212, 165, 116))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {opp.score}
                  </div>
                  <div className="text-xs font-semibold" style={{ color: 'rgb(148, 163, 184)' }}>Oracle Score</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* IGNORE (masqué par défaut, juste le count) */}
      {ignoreOpps.length > 0 && (
        <div className="rounded-xl border p-4 text-center" style={{ background: 'rgba(30, 41, 59, 0.5)', borderColor: 'rgb(51, 65, 85)' }}>
          <p className="text-sm" style={{ color: 'rgb(148, 163, 184)' }}>
            {ignoreOpps.length} opportunité{ignoreOpps.length > 1 ? 's' : ''} ignorée{ignoreOpps.length > 1 ? 's' : ''} (score trop faible)
          </p>
        </div>
      )}
    </div>
  );
}
