import * as React from "react";
import Link from "next/link";
import OracleShell from "../_components/OracleShell";
import GlassCard from "@/components/ui/GlassCard";
import { fetchProducts } from "@/lib/api";
import { transformProductToOpportunity, transformProductsToOpportunities } from "@/lib/transformers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Status = "hot" | "watch" | "ignore";
type DecisionWindow = "courte" | "moyenne" | "longue";

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

function normalizeWindow(win: any): DecisionWindow {
  const w = String(win ?? "").toLowerCase();
  if (w === "courte") return "courte";
  if (w === "moyenne") return "moyenne";
  if (w === "longue") return "longue";
  return "moyenne";
}

export default async function OpportunitiesPage() {
  const products = await fetchProducts({ limit: 50 });

  // Oracle = async => il faut await
  const opportunities = transformProductsToOpportunities(products);

  const hotOpps = opportunities.filter((o) => o.status === "hot");
  const watchOpps = opportunities.filter((o) => o.status === "watch");
  const ignoreOpps = opportunities.filter((o) => o.status === "ignore");

  return (
    <OracleShell title="Fenêtres de décision" subtitle="Oracle détecte les opportunités avant saturation.">
      <div className="space-y-8">
        <GlassCard className="p-6">
          <div className="text-[11px] tracking-[0.22em] text-white/45">ORACLE // OPPORTUNITÉS</div>
          <div className="mt-3 text-sm text-white/70">
            Une opportunité n’est pas une promesse. C’est une fenêtre de décision.
          </div>

          <div className="mt-5 flex flex-wrap gap-2 text-[11px] tracking-[0.18em]">
            <span className="rounded-xl border border-red-400/25 bg-red-400/10 px-3 py-2 text-red-200">
              HOT : <span className="text-red-100">{hotOpps.length}</span>
            </span>
            <span className="rounded-xl border border-amber-300/25 bg-amber-300/10 px-3 py-2 text-amber-200">
              WATCH : <span className="text-amber-100">{watchOpps.length}</span>
            </span>
            <span className="rounded-xl border border-white/12 bg-white/5 px-3 py-2 text-white/60">
              IGNORED : <span className="text-white/80">{ignoreOpps.length}</span>
            </span>
          </div>
        </GlassCard>

        {hotOpps.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-lg font-semibold text-white">
                HOT <span className="text-white/50">({hotOpps.length})</span>
              </h2>
              <div className="text-xs text-white/45">
                Priorité : <span className="text-red-200/90 font-semibold">action rapide</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {hotOpps.map((opp) => {
                const win = normalizeWindow(opp.window);
                return (
                  <Link key={opp.id} href={`/opportunities/${opp.id}`} className="block">
                    <GlassCard className="p-5 transition hover:bg-white/[0.055] hover:scale-[1.01]">
                      <div className="mb-3 flex items-start justify-between gap-2">
                        <h3 className="flex-1 text-sm font-semibold leading-tight text-white">{opp.title}</h3>
                        <span className={`shrink-0 rounded-lg px-2 py-1 text-[11px] tracking-[0.16em] border font-semibold ${statusBadgeClass("hot")}`}>
                          HOT
                        </span>
                      </div>

                      <div className="mb-3 flex items-center gap-2 text-xs text-white/55">
                        <span>{opp.category ?? "—"}</span>
                        <span className="text-white/25">•</span>
                        <span className={`rounded-lg px-2 py-1 text-[11px] border ${windowPillClass(win)}`}>
                          Fenêtre {win}
                        </span>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-black/25 p-3 text-xs leading-relaxed mb-4 text-white/60">
                        <span className="text-white/50">Lecture Oracle :</span> {opp.oracleReading}
                      </div>

                      {opp.tags?.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                          {opp.tags.slice(0, 4).map((t) => (
                            <span key={t} className="rounded-xl border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] tracking-[0.14em] text-white/60">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className={`text-2xl font-semibold ${statusScoreClass("hot")}`}>{opp.score.toFixed(1)}</div>
                        <div className="text-xs font-semibold text-white/45">Oracle Score</div>
                      </div>
                    </GlassCard>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {watchOpps.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-lg font-semibold text-white">
                WATCH <span className="text-white/50">({watchOpps.length})</span>
              </h2>
              <div className="text-xs text-white/45">
                Mode : <span className="text-amber-200/90 font-semibold">surveillance active</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {watchOpps.map((opp) => {
                const win = normalizeWindow(opp.window);
                return (
                  <Link key={opp.id} href={`/opportunities/${opp.id}`} className="block">
                    <GlassCard className="p-5 transition hover:bg-white/[0.055] hover:scale-[1.01]">
                      <div className="mb-3 flex items-start justify-between gap-2">
                        <h3 className="flex-1 text-sm font-semibold leading-tight text-white">{opp.title}</h3>
                        <span className={`shrink-0 rounded-lg px-2 py-1 text-[11px] tracking-[0.16em] border font-semibold ${statusBadgeClass("watch")}`}>
                          WATCH
                        </span>
                      </div>

                      <div className="mb-3 flex items-center gap-2 text-xs text-white/55">
                        <span>{opp.category ?? "—"}</span>
                        <span className="text-white/25">•</span>
                        <span className={`rounded-lg px-2 py-1 text-[11px] border ${windowPillClass(win)}`}>
                          Fenêtre {win}
                        </span>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-black/25 p-3 text-xs leading-relaxed mb-4 text-white/60">
                        <span className="text-white/50">Lecture Oracle :</span> {opp.oracleReading}
                      </div>

                      {opp.tags?.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                          {opp.tags.slice(0, 4).map((t) => (
                            <span key={t} className="rounded-xl border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] tracking-[0.14em] text-white/60">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className={`text-2xl font-semibold ${statusScoreClass("watch")}`}>{opp.score.toFixed(1)}</div>
                        <div className="text-xs font-semibold text-white/45">Oracle Score</div>
                      </div>
                    </GlassCard>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {ignoreOpps.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-lg font-semibold text-white/80">
                IGNORED <span className="text-white/40">({ignoreOpps.length})</span>
              </h2>
              <div className="text-xs text-white/45">
                Oracle a regardé : <span className="text-white/70 font-semibold">non prioritaire</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {ignoreOpps.slice(0, 9).map((opp) => {
                const win = normalizeWindow(opp.window);
                return (
                  <Link key={opp.id} href={`/opportunities/${opp.id}`} className="block">
                    <GlassCard className="p-5 transition hover:bg-white/[0.045] hover:scale-[1.01] bg-white/[0.025]">
                      <div className="mb-3 flex items-start justify-between gap-2">
                        <h3 className="flex-1 text-sm font-semibold leading-tight text-white/80">{opp.title}</h3>
                        <span className={`shrink-0 rounded-lg px-2 py-1 text-[11px] tracking-[0.16em] border font-semibold ${statusBadgeClass("ignore")}`}>
                          IGNORE
                        </span>
                      </div>

                      <div className="mb-3 flex items-center gap-2 text-xs text-white/55">
                        <span>{opp.category ?? "—"}</span>
                        <span className="text-white/25">•</span>
                        <span className={`rounded-lg px-2 py-1 text-[11px] border ${windowPillClass(win)}`}>
                          Fenêtre {win}
                        </span>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-black/25 p-3 text-xs leading-relaxed mb-4 text-white/60">
                        <span className="text-white/50">Lecture Oracle :</span> {opp.oracleReading}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className={`text-2xl font-semibold ${statusScoreClass("ignore")}`}>{opp.score.toFixed(1)}</div>
                        <div className="text-xs font-semibold text-white/45">Oracle Score</div>
                      </div>
                    </GlassCard>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <div className="mt-14 text-xs text-white/35">oracle.x10commerce.com — Plateforme opérationnelle.</div>
      </div>
    </OracleShell>
  );
}
