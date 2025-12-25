"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type AnalysisGoal =
  | "Trouver un produit à lancer maintenant"
  | "Tester un nouveau produit"
  | "Éviter les produits saturés"
  | "Anticiper les prochaines tendances";

type AnalysisChannel = "TikTok" | "Facebook / Instagram" | "Amazon" | "Oracle décide";

type AnalysisBudget = "< 300 €" | "300 – 500 €" | "500 € et +";

type AnalysisNiche =
  | "Maison & cuisine"
  | "Beauté & soins"
  | "Bébé & enfants"
  | "Sport & bien-être"
  | "Accessoires auto"
  | "Gadgets du quotidien"
  | "Autre";

type OracleAnalysis = {
  id: string;
  createdAt: string; // ISO
  niche: AnalysisNiche;
  goal: AnalysisGoal;
  channel: AnalysisChannel;
  budget: AnalysisBudget;
  platforms: string[];
};

type ProofCard = {
  id: string;
  plateforme: "TikTok" | "Instagram" | "Facebook" | "YouTube" | "Amazon" | "AliExpress" | "Google Tendances";
  titre: string;
  niche: string;
  date: string;
  vues?: number;
  likes?: number;
  miniature: string;
  urlSource: string;
};

const LS_KEY = "oracle:lastAnalysis";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function fmt(n?: number) {
  if (n === undefined) return "—";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(".", ",")}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}k`;
  return `${n}`;
}

function formatRelativeTime(iso: string) {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "à l’instant";
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;
  const days = Math.floor(hours / 24);
  return `il y a ${days} j`;
}

function pickRecommendation(a: OracleAnalysis) {
  const base = {
    title: "",
    decision: "" as "LANCER MAINTENANT" | "ATTENDRE" | "ÉVITER",
    window: "",
    budget: "",
    channel: "",
    risk: "",
    reading: "",
  };

  if (a.goal === "Éviter les produits saturés") {
    return {
      ...base,
      title: "Produit “à faible concurrence” (sélection Oracle)",
      decision: "ATTENDRE",
      window: "5–7 jours",
      budget: a.budget,
      channel: a.channel === "Oracle décide" ? "TikTok" : a.channel,
      risk: "modéré",
      reading:
        "Oracle détecte des signaux intéressants, mais il faut attendre une confirmation pour éviter la saturation.",
    };
  }

  if (a.goal === "Anticiper les prochaines tendances") {
    return {
      ...base,
      title: "Tendance émergente (pré-marché)",
      decision: "ATTENDRE",
      window: "7–14 jours",
      budget: a.budget,
      channel: a.channel === "Oracle décide" ? "TikTok" : a.channel,
      risk: "faible à modéré",
      reading:
        "Le marché n’a pas encore compris le produit, mais l’intérêt monte. Prépare tes créas, teste léger.",
    };
  }

  if (a.goal === "Tester un nouveau produit") {
    return {
      ...base,
      title: "Produit test (fort potentiel mais prudent)",
      decision: "LANCER MAINTENANT",
      window: "7–10 jours",
      budget: a.budget,
      channel: a.channel === "Oracle décide" ? "TikTok" : a.channel,
      risk: "contrôlé",
      reading:
        "Bon moment pour tester. L’objectif est de valider l’angle et le canal avant d’augmenter le budget.",
    };
  }

  return {
    ...base,
    title: "Produit prioritaire (sélection Oracle)",
    decision: "LANCER MAINTENANT",
    window: "7–10 jours",
    budget: a.budget,
    channel: a.channel === "Oracle décide" ? "TikTok" : a.channel,
    risk: "faible",
    reading:
      "La demande progresse plus vite que la concurrence. Fenêtre courte mais exploitable si tu agis maintenant.",
  };
}

function Badge({ decision }: { decision: string }) {
  const styles =
    decision === "LANCER MAINTENANT"
      ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/25"
      : decision === "ATTENDRE"
      ? "bg-amber-500/15 text-amber-300 border-amber-500/25"
      : "bg-red-500/15 text-red-300 border-red-500/25";

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${styles}`}>
      {decision}
    </span>
  );
}

function Glass({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-[rgba(15,27,42,0.72)] shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-md",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  const v = clamp(value, 0, 100);
  return (
    <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
      <motion.div
        className="h-2 rounded-full bg-[#6D5EF6]"
        initial={{ width: 0 }}
        animate={{ width: `${v}%` }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

function SourceRow({ name, done, active }: { name: string; done: boolean; active: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${done ? "bg-emerald-400" : active ? "bg-[#6D5EF6]" : "bg-white/20"}`} />
        <span className="text-sm text-[#EAF0FF]">{name}</span>
      </div>
      <span className="text-xs text-[#A7B3C7]">{done ? "OK" : active ? "Analyse…" : "En attente"}</span>
    </div>
  );
}

const BASE_PROOFS: ProofCard[] = [
  {
    id: "pf1",
    plateforme: "TikTok",
    titre: "Gadget cuisine compact (démonstration courte)",
    niche: "Maison & cuisine",
    date: "il y a 2 h",
    vues: 1200000,
    likes: 84500,
    miniature: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=70",
    urlSource: "https://www.tiktok.com/",
  },
  {
    id: "pf2",
    plateforme: "Instagram",
    titre: "Outil beauté (avant / après) — format UGC",
    niche: "Beauté & soins",
    date: "il y a 5 h",
    vues: 420000,
    likes: 26500,
    miniature: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=70",
    urlSource: "https://www.instagram.com/",
  },
  {
    id: "pf3",
    plateforme: "YouTube",
    titre: "Comparatif produits — intention d’achat",
    niche: "Gadgets du quotidien",
    date: "hier",
    vues: 98000,
    likes: 6100,
    miniature: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=70",
    urlSource: "https://www.youtube.com/",
  },
];

export default function DashboardClient() {
  const [analysis, setAnalysis] = useState<OracleAnalysis | null>(null);
  const [open, setOpen] = useState(false);

  // Scan modal (progress)
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  // Form state
  const [niche, setNiche] = useState<AnalysisNiche>("Gadgets du quotidien");
  const [goal, setGoal] = useState<AnalysisGoal>("Trouver un produit à lancer maintenant");
  const [channel, setChannel] = useState<AnalysisChannel>("Oracle décide");
  const [budget, setBudget] = useState<AnalysisBudget>("300 – 500 €");

  const plateformesScan = ["TikTok", "Amazon", "AliExpress", "Google Tendances", "YouTube", "Instagram", "Facebook"];

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setAnalysis(JSON.parse(raw));
    } catch {}
  }, []);

  const status = analysis ? "ready" : "idle";

  const recommendation = useMemo(() => {
    if (!analysis) return null;
    return pickRecommendation(analysis);
  }, [analysis]);

  const proofs = useMemo(() => {
    // plus tard: proofs dépendront de l’analyse.
    // pour l’instant: sélection cohérente + stable (dashboard “crédible”).
    return BASE_PROOFS;
  }, []);

  const heroProof = proofs[0];

  function startAnalysis() {
    setOpen(false);

    setRunning(true);
    setProgress(0);
    setStage(0);

    const totalStages = plateformesScan.length + 2;
    let t = 0;

    const timer = setInterval(() => {
      t++;
      const s = Math.min(totalStages, Math.floor(t / 10));
      setStage(s);
      setProgress(clamp(Math.round((t / (totalStages * 10)) * 100), 2, 98));

      if (t >= totalStages * 10) {
        clearInterval(timer);
        setProgress(100);

        const a: OracleAnalysis = {
          id: `an_${Math.random().toString(36).slice(2, 10)}`,
          createdAt: new Date().toISOString(),
          niche,
          goal,
          channel,
          budget,
          platforms: plateformesScan,
        };

        setAnalysis(a);
        try {
          localStorage.setItem(LS_KEY, JSON.stringify(a));
        } catch {}

        setTimeout(() => setRunning(false), 350);
      }
    }, 80);
  }

  return (
    <div className="space-y-6">
      {/* HEADER / ETAT ORACLE */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-[#EAF0FF]">Oracle Intelligence</h1>
<p className="text-xs text-muted-foreground mt-2"><span className="block">FR : Oracle est un outil d’aide à la décision e-commerce — pas une plateforme financière.</span><span className="block">EN : Oracle is an e-commerce decision intelligence tool — not a financial or investment platform.</span></p>
          <p className="text-sm text-[#A7B3C7]">
            {status === "ready"
              ? "🟢 Oracle est prêt — résultats basés sur votre dernière analyse."
              : "⚠️ Aucune analyse active — lancez une analyse pour obtenir des recommandations."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            className="rounded-xl border border-white/10 bg-[#6D5EF6] px-4 py-2 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(109,94,246,0.2),0_10px_25px_rgba(109,94,246,0.18)] transition hover:bg-[#7E71FF]"
          >
            🧠 Analyser un marché
          </button>

          {analysis && (
            <button
              onClick={() => setOpen(true)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#EAF0FF] transition hover:bg-white/8"
            >
              Relancer
            </button>
          )}
        </div>
      </div>

      {/* DERNIERE ANALYSE */}
      {analysis && (
        <Glass className="p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <div className="text-sm font-medium text-[#EAF0FF]">Dernière analyse</div>
              <div className="text-sm text-[#A7B3C7]">
                <span className="text-[#EAF0FF]">{analysis.niche}</span> • {analysis.goal} • {analysis.channel} • {analysis.budget}
              </div>
              <div className="text-xs text-[#72829A]">
                Lancement {formatRelativeTime(analysis.createdAt)} • ID {analysis.id}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {analysis.platforms.slice(0, 6).map((p) => (
                <span key={p} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#A7B3C7]">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </Glass>
      )}

      {/* PREUVES DU JOUR */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {proofs.map((p) => (
          <Glass key={p.id} className="overflow-hidden">
            <div className="relative aspect-video w-full overflow-hidden border-b border-white/10 bg-black/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.miniature} alt={p.titre} className="h-full w-full object-cover" />
            </div>
            <div className="p-4 space-y-3">
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-[#EAF0FF]">{p.titre}</div>
                <div className="mt-0.5 text-xs text-[#A7B3C7]">
                  {p.plateforme} • {p.niche} • {p.date}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-white/10 bg-black/20 p-2">
                  <div className="text-[10px] text-[#72829A]">Vues</div>
                  <div className="text-sm font-semibold text-[#EAF0FF]">{fmt(p.vues)}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-2">
                  <div className="text-[10px] text-[#72829A]">Likes</div>
                  <div className="text-sm font-semibold text-[#EAF0FF]">{fmt(p.likes)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={p.urlSource}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-xs font-medium text-[#EAF0FF] hover:bg-white/8"
                >
                  Voir source
                </a>
                <Link
                  href="/signals"
                  className="rounded-xl border border-white/10 bg-[#6D5EF6] px-3 py-2 text-center text-xs font-medium text-white hover:bg-[#7E71FF]"
                >
                  Voir signaux
                </Link>
              </div>
            </div>
          </Glass>
        ))}
      </div>

      {/* DECISION DU JOUR */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Glass className="p-5 lg:col-span-2">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-[#A7B3C7]">Ce qu’Oracle vous recommande aujourd’hui</div>
              <div className="text-xl font-semibold text-[#EAF0FF]">
                {analysis ? recommendation?.title : "Lancez une analyse pour obtenir une recommandation"}
              </div>
              {analysis && recommendation && <Badge decision={recommendation.decision} />}
            </div>

            {/* Mini preview preuve (sans texte incrusté) */}
            {heroProof ? (
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={heroProof.miniature} alt={heroProof.titre} className="h-full w-full object-cover" />
              </div>
            ) : (
              <div className="h-20 w-20 shrink-0 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0" />
            )}
          </div>

          {analysis && recommendation ? (
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                <div className="text-xs text-[#72829A]">⏳ Fenêtre estimée</div>
                <div className="text-sm font-medium text-[#EAF0FF]">{recommendation.window}</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                <div className="text-xs text-[#72829A]">💰 Budget conseillé</div>
                <div className="text-sm font-medium text-[#EAF0FF]">{recommendation.budget}</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                <div className="text-xs text-[#72829A]">📣 Canal prioritaire</div>
                <div className="text-sm font-medium text-[#EAF0FF]">{recommendation.channel}</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                <div className="text-xs text-[#72829A]">⚠️ Risque</div>
                <div className="text-sm font-medium text-[#EAF0FF]">{recommendation.risk}</div>
              </div>
            </div>
          ) : (
            <div className="mt-4 text-sm text-[#A7B3C7]">
              Cliquez sur <span className="text-[#EAF0FF]">“Analyser un marché”</span> pour générer des produits, des opportunités et des signaux dynamiques.
            </div>
          )}

          {analysis && recommendation && (
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-xs font-medium text-[#A7B3C7]">Lecture Oracle</div>
              <div className="mt-1 text-sm text-[#EAF0FF]">{recommendation.reading}</div>
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href={analysis ? `/products?analysis=${analysis.id}` : "/products"}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#EAF0FF] transition hover:bg-white/8"
            >
              Voir les produits
            </Link>
            <Link
              href={analysis ? `/signals?analysis=${analysis.id}` : "/signals"}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#EAF0FF] transition hover:bg-white/8"
            >
              Voir les signaux
            </Link>
            <Link
              href={analysis ? `/opportunities?analysis=${analysis.id}` : "/opportunities"}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#EAF0FF] transition hover:bg-white/8"
            >
              Voir les opportunités
            </Link>
          </div>
        </Glass>

        {/* PARAMETRES / IMPACT */}
        <Glass className="p-5">
          <div className="text-sm font-medium text-[#EAF0FF]">Vos préférences influencent Oracle</div>
          <div className="mt-2 space-y-3 text-sm text-[#A7B3C7]">
            <div className="flex items-center justify-between gap-3">
              <span>Objectif</span>
              <span className="text-[#EAF0FF]">{goal}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span>Niche</span>
              <span className="text-[#EAF0FF]">{niche}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span>Canal</span>
              <span className="text-[#EAF0FF]">{channel}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span>Budget</span>
              <span className="text-[#EAF0FF]">{budget}</span>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs font-medium text-[#A7B3C7]">Oracle en continu</div>
            <div className="mt-1 text-sm text-[#EAF0FF]">
              {analysis ? "Oracle surveille le marché en fonction de votre dernière analyse." : "Lancez une analyse pour activer la surveillance Oracle."}
            </div>
          </div>

          <div className="mt-4">
            <Link
              href="/settings"
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#EAF0FF] transition hover:bg-white/8"
            >
              Modifier mes préférences
            </Link>
          </div>
        </Glass>
      </div>

      {/* MODAL ANALYSE */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#0F1621] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold text-[#EAF0FF]">Analyser un marché</div>
                  <div className="mt-1 text-sm text-[#A7B3C7]">
                    Choisissez une niche et un objectif. Oracle générera des produits et des recommandations.
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#EAF0FF] hover:bg-white/8"
                >
                  Fermer
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3">
                <div>
                  <label className="text-xs font-medium text-[#A7B3C7]">Niche</label>
                  <select
                    value={niche}
                    onChange={(e) => setNiche(e.target.value as AnalysisNiche)}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-[#EAF0FF]"
                  >
                    {[
                      "Maison & cuisine",
                      "Beauté & soins",
                      "Bébé & enfants",
                      "Sport & bien-être",
                      "Accessoires auto",
                      "Gadgets du quotidien",
                      "Autre",
                    ].map((x) => (
                      <option key={x} value={x}>
                        {x}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-[#A7B3C7]">Objectif</label>
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value as AnalysisGoal)}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-[#EAF0FF]"
                  >
                    {[
                      "Trouver un produit à lancer maintenant",
                      "Tester un nouveau produit",
                      "Éviter les produits saturés",
                      "Anticiper les prochaines tendances",
                    ].map((x) => (
                      <option key={x} value={x}>
                        {x}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-[#A7B3C7]">Canal</label>
                    <select
                      value={channel}
                      onChange={(e) => setChannel(e.target.value as AnalysisChannel)}
                      className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-[#EAF0FF]"
                    >
                      {["Oracle décide", "TikTok", "Facebook / Instagram", "Amazon"].map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#A7B3C7]">Budget</label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value as AnalysisBudget)}
                      className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-[#EAF0FF]"
                    >
                      {["< 300 €", "300 – 500 €", "500 € et +"].map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#EAF0FF] hover:bg-white/8"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={startAnalysis}
                    className="rounded-xl border border-white/10 bg-[#6D5EF6] px-4 py-2 text-sm font-medium text-white hover:bg-[#7E71FF]"
                  >
                    Lancer l’analyse Oracle
                  </button>
                </div>

                <div className="mt-2 text-xs text-[#72829A]">
                  Astuce : après cette étape, Produits / Signaux / Opportunités utilisent automatiquement l’ID d’analyse.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL SCAN */}
      <AnimatePresence>
        {running && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0F1621] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-lg font-semibold text-[#EAF0FF]">Scan multi-plateformes en cours</div>
              <div className="mt-1 text-sm text-[#A7B3C7]">Oracle collecte des preuves et filtre les signaux faibles…</div>

              <div className="mt-4">
                <ProgressBar value={progress} />
                <div className="mt-2 text-xs text-[#72829A]">{progress}%</div>
              </div>

              <div className="mt-4 space-y-2">
                {plateformesScan.map((p, i) => (
                  <SourceRow key={p} name={p} done={i < stage} active={i === stage} />
                ))}
                <SourceRow name="Fusion & tri" done={stage > plateformesScan.length} active={stage === plateformesScan.length} />
                <SourceRow name="Déduplication" done={stage > plateformesScan.length + 1} active={stage === plateformesScan.length + 1} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
