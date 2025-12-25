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

function statusBadgeClass(status: Status) {
  switch (status) {
    case "hot":
      return "text-red-400 border-red-400/30 bg-red-400/10";
    case "watch":
      return "text-amber-300 border-amber-300/30 bg-amber-300/10";
    case "ignore":
    default:
      return "text-white/55 border-white/12 bg-white/5";
  }
}

function statusScoreClass(status: Status) {
  switch (status) {
    case "hot":
      return "text-red-300";
    case "watch":
      return "text-amber-200";
    case "ignore":
    default:
      return "text-white/75";
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

export default function OpportunityDetailClient({ opportunity }: { opportunity: Opportunity }) {
  const win = opportunity.window ?? "moyenne";
  const status = opportunity.status ?? "ignore";

  return (
    <OracleShell
      title="Opportunité"
      subtitle="Détail Oracle — lecture client-safe (sans recette)."
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/opportunities"
            className="rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-[12px] tracking-[0.14em] font-semibold text-white/75 hover:text-white hover:bg-white/[0.05] transition"
          >
            ← RETOUR
          </Link>

          <span
            className={`rounded-xl border px-3 py-2 text-[11px] tracking-[0.18em] font-semibold ${statusBadgeClass(
              status
            )}`}
          >
            {status.toUpperCase()}
          </span>
        </div>

        <GlassCard className="p-6">
          <div className="text-[11px] tracking-[0.22em] text-white/45">ORACLE // OPPORTUNITÉ</div>

          <div className="mt-3 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-white/90">
                  {opportunity.title}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-white/55">
                  <span>{opportunity.category ?? "—"}</span>
                  <span className="text-white/25">•</span>
                  <span className={`rounded-lg px-2 py-1 text-[11px] border ${windowPillClass(win)}`}>
                    Fenêtre {win}
                  </span>
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
                <div className={`text-3xl font-semibold ${statusScoreClass(status)}`}>
                  {Number(opportunity.score ?? 0).toFixed(1)}
                </div>
                <div className="text-xs font-semibold text-white/45">Oracle Score</div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-relaxed text-white/70">
              <div className="text-[11px] tracking-[0.18em] text-white/45 mb-2">LECTURE ORACLE</div>
              <div>
                <span className="text-white/55">Lecture Oracle :</span> {opportunity.oracleReading}
              </div>
            </div>

            {opportunity.tags?.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-[11px] tracking-[0.18em] text-white/45 mb-2">TAGS</div>
                <div className="flex flex-wrap gap-2">
                  {opportunity.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-xl border border-white/10 bg-black/25 px-2.5 py-1 text-[11px] tracking-[0.14em] text-white/60"
                    >
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

        <div className="mt-10 text-xs text-white/35">
          oracle.x10commerce.com — Plateforme opérationnelle.
        </div>
      </div>
    </OracleShell>
  );
}
