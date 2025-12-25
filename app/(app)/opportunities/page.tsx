import * as React from "react";
import Link from "next/link";
import OracleShell from "../_components/OracleShell";
import OpportunitiesClientFocus from "./OpportunitiesClientFocus";
import GlassCard from "@/components/ui/GlassCard";
import { fetchProducts } from "@/lib/api";
import { transformProductsToOpportunities } from "@/lib/transformers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Status = "hot" | "watch" | "ignore";
type DecisionWindow = "courte" | "moyenne" | "longue";

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

function normalizeWindow(win: any): DecisionWindow {
  const w = String(win ?? "").toLowerCase();
  if (w === "courte") return "courte";
  if (w === "moyenne") return "moyenne";
  if (w === "longue") return "longue";
  return "moyenne";
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

function imageFor(category?: string) {
  const c = String(category ?? "").toLowerCase();
  if (c.includes("beaut") || c.includes("soin")) {
    return "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=70";
  }
  if (c.includes("cuisine") || c.includes("maison")) {
    return "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=70";
  }
  if (c.includes("auto")) {
    return "https://images.unsplash.com/photo-1517524206127-48bbd363f3f7?auto=format&fit=crop&w=1200&q=70";
  }
  if (c.includes("sport") || c.includes("bien")) {
    return "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=1200&q=70";
  }
  return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=70";
}

export default async function OpportunitiesPage({ searchParams }: { searchParams?: Promise<{ focus?: string }> }) {

  const sp = await searchParams;
  const focus = (sp?.focus ?? "").trim();
const products = await fetchProducts({ limit: 60 });
  const opportunities = transformProductsToOpportunities(products);

  const hotOpps = opportunities.filter((o) => o.status === "hot");
  const watchOpps = opportunities.filter((o) => o.status === "watch");
  const ignoreOpps = opportunities.filter((o) => o.status === "ignore");

  const Card = ({ opp }: { opp: any }) => {
    const win = normalizeWindow(opp.window);
    const plan = getPlan(opp.status as Status, win);
    const img = imageFor(opp.category);

    return (
      <Link id={`opp_${opp.id}`} href={`/opportunities/${opp.id}`} className="block">
        <GlassCard className="overflow-hidden transition hover:bg-white/[0.055] hover:scale-[1.01]">
          <div className="relative aspect-video w-full border-b border-white/10 bg-black/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} alt={opp.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
          </div>

          <div className="p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold leading-tight text-white truncate">{opp.title}</div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/55">
                  <span>{opp.category ?? "—"}</span>
                  <span className="text-white/25">•</span>
                  <span className={`rounded-lg px-2 py-1 text-[11px] border ${windowPillClass(win)}`}>
                    Fenêtre {win}
                  </span>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <div className={`text-2xl font-semibold ${scoreClass(opp.status as Status)}`}>{Number(opp.score ?? 0).toFixed(1)}</div>
                <div className="text-xs font-semibold text-white/45">Opportunity Index</div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className={`rounded-xl border px-3 py-2 text-[11px] tracking-[0.18em] font-semibold ${statusBadgeClass(opp.status as Status)}`}>
                {plan.action}
              </span>
              <Link
                href={`/signals?focus=`}
                className="rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-[12px] font-semibold text-white/75 hover:text-white hover:bg-white/[0.05] transition"
              >
                Voir preuves
              </Link>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="text-[11px] tracking-[0.18em] text-white/45 mb-2">PLAN D’ACTION</div>
              <div className="grid grid-cols-2 gap-2 text-sm text-white/80">
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

              <div className="mt-3 text-xs text-white/60 italic">
                Pourquoi Oracle : {plan.pourquoi}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-relaxed text-white/65">
              <span className="text-white/45">Lecture Oracle :</span> {opp.oracleReading}
            </div>

            {opp.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {opp.tags.slice(0, 4).map((t: string) => (
                  <span key={t} className="rounded-xl border border-white/10 bg-black/25 px-2.5 py-1 text-[11px] tracking-[0.14em] text-white/60">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </GlassCard>
      </Link>
    );
  };

  return (
    <OracleShell title="Opportunités" subtitle="Décisions prêtes à exécuter : canal, budget, création, fenêtre.">
      
      <p className="text-xs text-muted-foreground mt-2">
        <span className="block">
          FR : Oracle est un outil d’aide à la décision e-commerce — pas une plateforme financière.
        </span>
        <span className="block">
          EN : Oracle is an e-commerce decision intelligence tool — not a financial or investment platform.
        </span>
      </p>

<OpportunitiesClientFocus focus={focus} />
      <div className="space-y-8">
        <GlassCard className="p-6">
          <div className="text-[11px] tracking-[0.22em] text-white/45">ORACLE // OPPORTUNITÉS</div>
          <div className="mt-3 text-sm text-white/70">Ici, Oracle ne te noie pas : il te donne une action claire et une preuve derrière.</div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/dashboard" className="rounded-xl border border-white/10 bg-[#6D5EF6] px-4 py-2 text-sm font-semibold text-white hover:bg-[#7E71FF] transition">
              🧠 Analyser
            </Link>
            <Link href="/signals" className="rounded-xl border border-white/12 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/[0.05] transition">
              Voir signaux
            </Link>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 text-[11px] tracking-[0.18em]">
            <span className="rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-3 py-2 text-emerald-200">
              LANCER : <span className="text-emerald-100">{hotOpps.length}</span>
            </span>
            <span className="rounded-xl border border-amber-300/25 bg-amber-300/10 px-3 py-2 text-amber-200">
              TESTER : <span className="text-amber-100">{watchOpps.length}</span>
            </span>
            <span className="rounded-xl border border-red-400/25 bg-red-400/10 px-3 py-2 text-red-200">
              ÉVITER : <span className="text-red-100">{ignoreOpps.length}</span>
            </span>
          </div>
        </GlassCard>

        {hotOpps.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-lg font-semibold text-white">
                LANCER MAINTENANT <span className="text-white/50">({hotOpps.length})</span>
              </h2>
              <div className="text-xs text-white/45">Priorité : <span className="text-emerald-200/90 font-semibold">action rapide</span></div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {hotOpps.map((opp) => <Card key={opp.id} opp={opp} />)}
            </div>
          </section>
        )}

        {watchOpps.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-lg font-semibold text-white">
                TESTER EN DOUCEUR <span className="text-white/50">({watchOpps.length})</span>
              </h2>
              <div className="text-xs text-white/45">Mode : <span className="text-amber-200/90 font-semibold">validation</span></div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {watchOpps.map((opp) => <Card key={opp.id} opp={opp} />)}
            </div>
          </section>
        )}

        {ignoreOpps.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-lg font-semibold text-white/85">
                À ÉVITER <span className="text-white/45">({ignoreOpps.length})</span>
              </h2>
              <div className="text-xs text-white/45">Oracle a déjà filtré : <span className="text-white/70 font-semibold">non prioritaire</span></div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {ignoreOpps.slice(0, 12).map((opp) => <Card key={opp.id} opp={opp} />)}
            </div>
          </section>
        )}
      </div>
    </OracleShell>
  );
}
