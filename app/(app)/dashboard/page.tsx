import * as React from "react";
import Link from "next/link";
import { KpiCard } from "@/components/KpiCard";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Intelligence Dashboard</h1>
          <p className="mt-1 text-sm" style={{ color: 'rgb(148, 163, 184)' }}>
            Vue d'ensemble de l'analyse produits et opportunités stratégiques
          </p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row">
          <span className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium" style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.3)', color: 'rgb(34, 197, 94)' }}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: 'rgb(34, 197, 94)' }}></span>
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: 'rgb(34, 197, 94)' }}></span>
            </span>
            Système actif
          </span>
          <span className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium" style={{ background: 'rgba(74, 95, 115, 0.2)', color: 'rgb(248, 250, 252)' }}>
            Dernière analyse : il y a 2 min
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        <KpiCard value="2,847" label="Produits" color="#d4a574" />
        <KpiCard value="143" label="Opportunités" color="rgb(96, 165, 250)" />
        <KpiCard value="68.5" label="Score moyen" color="#d4a574" />
        <KpiCard value="6/6" label="Sources" color="rgb(74, 222, 128)" />
        <KpiCard value="856" label="Signaux" color="rgb(148, 163, 184)" />
        <KpiCard value="2min" label="MAJ" color="rgb(251, 191, 36)" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl border p-6" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Top Opportunités</h2>
              <Link href="/opportunities" className="text-sm font-medium hover:underline" style={{ color: 'rgb(212, 165, 116)' }}>
                Voir tout →
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { name: "Accessoires mobilité", score: 87.5, trend: "📈 Rising", cat: "Health & Wellness" },
                { name: "Tech gadgets posture", score: 82.3, trend: "🔥 Hot", cat: "Tech" },
                { name: "Kit récupération sport", score: 79.8, trend: "📈 Rising", cat: "Fitness" },
                { name: "Home office ergonomie", score: 76.2, trend: "💎 Stable", cat: "Workspace" },
              ].map((opp, i) => (
                <Link key={i} href="/opportunities" className="flex items-center justify-between rounded-lg border p-4" style={{ background: 'rgba(30, 41, 59, 0.6)', borderColor: 'rgba(74, 95, 115, 0.2)' }}>
                  <div className="flex-1">
                    <div className="font-medium">{opp.name}</div>
                    <div className="mt-1 flex items-center gap-2 text-xs" style={{ color: 'rgb(148, 163, 184)' }}>
                      <span>{opp.cat}</span>
                      <span>•</span>
                      <span>{opp.trend}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold" style={{ background: 'linear-gradient(135deg, rgb(96, 125, 149), rgb(212, 165, 116))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{opp.score}</div>
                    <div className="text-xs" style={{ color: 'rgb(148, 163, 184)' }}>Oracle Score</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border p-5" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
            <div className="mb-3 flex items-center gap-2">
              <div className="text-xl">💡</div>
              <h3 className="font-semibold">Insight du Jour</h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgb(148, 163, 184)' }}>
              Les produits "récupération active" montrent une croissance de 24% sur TikTok avec un engagement 3x supérieur.
            </p>
            <Link href="/opportunities" className="mt-4 inline-block text-sm font-medium hover:underline" style={{ color: 'rgb(212, 165, 116)' }}>
              Analyser →
            </Link>
          </div>

          <div className="rounded-xl border p-5" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
            <div className="mb-3 flex items-center gap-2">
              <div className="text-xl">🎯</div>
              <h3 className="font-semibold">Action Prioritaire</h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgb(148, 163, 184)' }}>
              3 nouvelles opportunités détectées dans "Tech Workspace" nécessitent validation.
            </p>
            <Link href="/opportunities" className="mt-4 inline-block text-sm font-medium hover:underline" style={{ color: 'rgb(212, 165, 116)' }}>
              Voir →
            </Link>
          </div>
        </div>
      </div>

      <div className="rounded-xl border p-6" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
        <h2 className="mb-4 text-lg font-semibold">Analyse par Source</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {[
            { name: "TikTok", count: "1,247", color: "rgb(244, 63, 94)" },
            { name: "Amazon", count: "892", color: "rgb(251, 146, 60)" },
            { name: "AliExpress", count: "456", color: "rgb(239, 68, 68)" },
            { name: "YouTube", count: "178", color: "rgb(239, 68, 68)" },
            { name: "Instagram", count: "52", color: "rgb(168, 85, 247)" },
            { name: "Facebook", count: "22", color: "rgb(59, 130, 246)" },
          ].map((s) => (
            <div key={s.name} className="text-center">
              <div className="text-3xl font-bold" style={{ color: s.color }}>{s.count}</div>
              <div className="mt-1 text-sm" style={{ color: 'rgb(148, 163, 184)' }}>{s.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
