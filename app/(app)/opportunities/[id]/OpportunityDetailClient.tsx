"use client";

import * as React from "react";
import Link from "next/link";
import OracleShell from "../../_components/OracleShell";
import GlassCard from "@/components/ui/GlassCard";

type Status = "hot" | "watch" | "ignore";
type DecisionWindow = "courte" | "moyenne" | "longue";

type Opportunity = {
  id: string;
  title: string;
  category?: string;
  niche?: string;
  score: number;
  status: Status;
  window: DecisionWindow;
  oracleReading: string;
  tags: string[];
  confidence?: "high" | "medium" | "low";
  explanation?: string;
};

type ExecPlan = {
  action: "LANCER MAINTENANT" | "TESTER EN DOUCEUR" | "SURVEILLER" | "NE PAS LANCER";
  canal: string;
  budget: string;
  crea: string;
  timing: string;
  pourquoi: string;
};

function statusBadgeClass(status: Status) {
  switch (status) {
    case "hot":
      return "text-emerald-300 border-emerald-400/25 bg-emerald-400/10";
    case "watch":
      return "text-amber-300 border-amber-300/25 bg-amber-300/10";
    case "ignore":
    default:
      return "text-red-300 border-red-400/25 bg-red-400/10";
  }
}

function scoreClass(status: Status) {
  switch (status) {
    case "hot":
      return "text-emerald-200";
    case "watch":
      return "text-amber-200";
    case "ignore":
    default:
      return "text-red-200";
  }
}

function windowPillClass(win: DecisionWindow) {
  switch (win) {
    case "courte":
      return "text-red-300 border-red-400/25 bg-red-400/10";
    case "moyenne":
      return "text-amber-200 border-amber-300/25 bg-amber-300/10";
    case "longue":
    default:
      return "text-emerald-300 border-emerald-400/25 bg-emerald-400/10";
  }
}

function getPlan(status: Status, win: DecisionWindow): ExecPlan {
  if (status === "hot") {
    return {
      action: "LANCER MAINTENANT",
      canal: "TikTok (priorité) + Instagram",
      budget: "300 – 500 €",
      crea: "2–3 vidéos UGC (démonstration + preuve)",
      timing: win === "courte" ? "48–72 h" : "7 jours",
      pourquoi: "Signaux solides et fenêtre favorable : agir vite sans surinvestir.",
    };
  }
  if (status === "watch") {
    return {
      action: "TESTER EN DOUCEUR",
      canal: "TikTok (test) ou Facebook/Instagram (retarget)",
      budget: "150 – 300 €",
      crea: "1–2 vidéos simples + 1 variante d’angle",
      timing: "5 jours",
      pourquoi: "Potentiel intéressant, mais l’angle publicitaire doit être validé.",
    };
  }
  return {
    action: win === "longue" ? "SURVEILLER" : "NE PAS LANCER",
    canal: "—",
    budget: "—",
    crea: "—",
    timing: win === "longue" ? "Surveillance 10–14 jours" : "Marché non favorable",
    pourquoi: "Risque élevé ou marché encombré : mieux vaut éviter pour l’instant.",
  };
}

export default function OpportunityDetailClient({ opportunity }: { opportunity: Opportunity }) {
  const win = opportunity.window ?? "moyenne";
  const status = opportunity.status ?? "ignore";
  const plan = getPlan(status, win);

  return (
    <OracleShell title="Opportunité" subtitle="Décision + plan d’action (lisible, exécutable).">
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/opportunities"
            className="rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-[12px] tracking-[0.14em] font-semibold text-white/75 hover:text-white hover:bg-white/[0.05] transition"
          >
            ← RETOUR
          </Link>

          <span className={`rounded-xl border px-3 py-2 text-[11px] tracking-[0.18em] font-semibold ${statusBadgeClass(status)}`}>
            {plan.action}
          </span>
        </div>

        <GlassCard className="p-6">
          <div className="text-[11px] tracking-[0.22em] text-white/45">ORACLE // OPPORTUNITÉ</div>

          <div className="mt-3 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-white/90">{opportunity.title}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-white/55">
                  <span>{opportunity.category ?? "—"}</span>
                  <span className="text-white/25">•</span>
                  <span className={`rounded-lg px-2 py-1 text-[11px] border ${windowPillClass(win)}`}>Fenêtre {win}</span>
                  {opportunity.confidence && (
                    <>
                      <span className="text-white/25">•</span>
                      <span className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] tracking-[0.14em] text-white/60">
                        Confiance {opportunity.confidence.toUpperCase()}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="shrink-0 text-right">
                <div className={`text-3xl font-semibold ${scoreClass(status)}`}>{Number(opportunity.score ?? 0).toFixed(1)}</div>
                <div className="text-xs font-semibold text-white/45">Oracle Score</div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="text-[11px] tracking-[0.18em] text-white/45 mb-2">PLAN D’ACTION</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/80">
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-[11px] text-white/45">Canal</div>
                  <div className="mt-1 font-semibold text-white/90">{plan.canal}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-[11px] text-white/45">Budget</div>
                  <div className="mt-1 font-semibold text-white/90">{plan.budget}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-[11px] text-white/45">Création</div>
                  <div className="mt-1 font-semibold text-white/90">{plan.crea}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-[11px] text-white/45">Fenêtre</div>
                  <div className="mt-1 font-semibold text-white/90">{plan.timing}</div>
                </div>
              </div>
              <div className="mt-3 text-xs text-white/60 italic">Pourquoi Oracle : {plan.pourquoi}</div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link href="/signals" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-xs font-semibold text-white/85 hover:bg-white/8">
                  Voir les preuves
                </Link>
                <Link href="/products" className="rounded-xl border border-white/10 bg-[#6D5EF6] px-3 py-2 text-center text-xs font-semibold text-white hover:bg-[#7E71FF]">
                  Voir les produits
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-relaxed text-white/70">
              <div className="text-[11px] tracking-[0.18em] text-white/45 mb-2">LECTURE ORACLE</div>
              <div><span className="text-white/55">Lecture Oracle :</span> {opportunity.oracleReading}</div>
            </div>

            {opportunity.tags?.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-[11px] tracking-[0.18em] text-white/45 mb-2">TAGS</div>
                <div className="flex flex-wrap gap-2">
                  {opportunity.tags.slice(0, 10).map((t) => (
                    <span key={t} className="rounded-xl border border-white/10 bg-black/25 px-2.5 py-1 text-[11px] tracking-[0.14em] text-white/60">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {opportunity.explanation && (
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-xs text-white/55">
                <div className="text-[11px] tracking-[0.18em] text-white/45 mb-2">EXPLICATION</div>
                {opportunity.explanation}
              </div>
            )}
          </div>
        </GlassCard>

        <div className="mt-10 text-xs text-white/35">oracle.x10commerce.com — Plateforme opérationnelle.</div>
      </div>
    </OracleShell>
  );
}
