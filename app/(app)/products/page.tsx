import * as React from "react";
import Link from "next/link";
import { fetchProducts } from "@/lib/api";
import { transformProductToOpportunity } from "@/lib/transformers";

export default async function ProductsPage() {
  const products = await fetchProducts({ limit: 50 });
  const opportunities = products.map(transformProductToOpportunity);

  // Stats
  const testProducts = opportunities.filter(o => o.status === 'hot' || o.status === 'watch');
  const noProducts = opportunities.filter(o => o.status === 'ignore');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border p-6" style={{ background: 'linear-gradient(135deg, rgb(30, 41, 59), rgb(15, 23, 42))', borderColor: 'rgb(51, 65, 85)' }}>
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔍</div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight">Produits Analysés</h1>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: 'rgb(148, 163, 184)' }}>
              <strong style={{ color: 'rgb(248, 250, 252)' }}>Base de données complète</strong> des produits scannés sur TikTok. 
              Chaque produit est évalué avec un <strong style={{ color: 'rgb(212, 165, 116)' }}>Oracle Score</strong> et un verdict (TEST/NO).
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-md px-2.5 py-1 text-xs font-medium" style={{ background: 'rgba(74, 222, 128, 0.15)', border: '1px solid rgba(74, 222, 128, 0.3)', color: 'rgb(74, 222, 128)' }}>
                ✅ TEST : {testProducts.length}
              </span>
              <span className="rounded-md px-2.5 py-1 text-xs font-medium" style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: 'rgb(239, 68, 68)' }}>
                ❌ NO : {noProducts.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grille produits */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {opportunities.map((opp) => {
          const verdict = opp.status === 'ignore' ? 'NO' : 'TEST';
          
          return (
            <Link
              key={opp.id}
              href={`/opportunities/${opp.id}`}
              className="rounded-xl border p-5 transition-all hover:scale-[1.02] hover:border-blue-500/30"
              style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}
            >
              {/* Placeholder image */}
              <div className="mb-4 flex h-40 w-full items-center justify-center rounded-lg" style={{ background: 'rgba(15, 23, 42, 0.5)' }}>
                <span className="text-6xl">📦</span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <h3 className="flex-1 text-sm font-semibold leading-tight">{opp.name}</h3>
                    <span className={`shrink-0 rounded px-1.5 py-0.5 text-xs font-bold`} style={
                      verdict === 'TEST' 
                        ? { background: 'rgb(74, 222, 128)', color: 'rgb(15, 23, 42)' }
                        : { background: 'rgb(239, 68, 68)', color: 'white' }
                    }>
                      {verdict}
                    </span>
                  </div>
                  <div className="text-xs" style={{ color: 'rgb(148, 163, 184)' }}>
                    {opp.category}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase" style={{ color: 'rgb(148, 163, 184)' }}>Oracle Score</div>
                    <div className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, rgb(96, 125, 149), rgb(212, 165, 116))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      {opp.score}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold uppercase" style={{ color: 'rgb(148, 163, 184)' }}>Lifecycle</div>
                    <div className="text-sm font-semibold capitalize">{opp.metrics.lifecycle}</div>
                  </div>
                </div>

                <div className="rounded-lg p-3 text-xs leading-relaxed" style={{ background: 'rgba(15, 23, 42, 0.5)', color: 'rgb(148, 163, 184)' }}>
                  {opp.explanation}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
