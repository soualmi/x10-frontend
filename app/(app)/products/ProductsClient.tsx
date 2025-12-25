"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";

const MotionGlassCard = motion(GlassCard);

type PlatformScan = "TikTok" | "Amazon" | "AliExpress" | "Google Tendances" | "YouTube" | "Instagram" | "Facebook";
type Decision = "LANCER" | "TESTER" | "ATTENDRE" | "ÉVITER";

type CategoryId = "all" | "lifestyle" | "tech" | "fitness" | "beauty";

type AnalysisGoal = "Lancer maintenant" | "Tester" | "Éviter les saturés";
type AnalysisBudget = "< 300 €" | "300 – 500 €" | "500 € et +";
type AnalysisNiche = "Toutes" | "Lifestyle" | "Tech & gadgets" | "Sport" | "Beauté";

type ProductWithOracle = {
  id: string;
  name: string;
  score: number;
  category: CategoryId;
  decision: Decision;
  reading: string;
  channels: PlatformScan[];
  priceRange: string;

  media: {
    type: "image" | "video";
    poster: string;
    videoUrl?: string;
    sourceUrl?: string;
  };

  proof: {
    vues?: number;
    likes?: number;
    date: string;
    plateforme: PlatformScan;
  };

  demand: number;
  competition: number;
  saturation: number;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function uid(prefix = "p") {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function fmt(n?: number) {
  if (n === undefined) return "—";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(".", ",")}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}k`;
  return `${n}`;
}

function parseMinPrice(priceRange: string) {
  // Ex: "24–29€" ou "24-29€"
  const m = priceRange.match(/(\d+)/);
  return m ? Number(m[1]) : 0;
}

function getScoreTone(score: number) {
  if (score >= 72) return "text-emerald-300";
  if (score >= 58) return "text-sky-300";
  if (score >= 45) return "text-amber-300";
  return "text-red-300";
}

function decisionStyle(d: Decision) {
  switch (d) {
    case "LANCER":
      return { bg: "bg-emerald-500/15", text: "text-emerald-300", border: "border-emerald-500/25", label: "Lancer" };
    case "TESTER":
      return { bg: "bg-sky-500/15", text: "text-sky-300", border: "border-sky-500/25", label: "Tester" };
    case "ATTENDRE":
      return { bg: "bg-amber-500/15", text: "text-amber-300", border: "border-amber-500/25", label: "Attendre" };
    default:
      return { bg: "bg-red-500/15", text: "text-red-300", border: "border-red-500/25", label: "Éviter" };
  }
}

function TinyBar({ value }: { value: number }) {
  const v = clamp(Math.round(value), 0, 100);
  return (
    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
      <div className="h-1.5 rounded-full bg-white/25" style={{ width: `${v}%` }} />
    </div>
  );
}

function MediaPreview({ p }: { p: ProductWithOracle }) {
  const vidRef = useRef<HTMLVideoElement | null>(null);
  const [hovered, setHovered] = useState(false);

  const onEnter = () => {
    setHovered(true);
    if (p.media.type !== "video") return;
    const v = vidRef.current;
    if (!v) return;
    try {
      v.muted = true;
      v.playsInline = true;
      v.loop = true;
      v.currentTime = 0;
      const pr = v.play();
      if (pr && typeof (pr as any).catch === "function") (pr as any).catch(() => {});
    } catch {}
  };

  const onLeave = () => {
    setHovered(false);
    if (p.media.type !== "video") return;
    const v = vidRef.current;
    if (!v) return;
    try {
      v.pause();
      v.currentTime = 0;
    } catch {}
  };

  return (
    <div className="space-y-2">
      <div
        className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black/30"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.02 : 1 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          {p.media.type === "video" ? (
            <video ref={vidRef} className="h-full w-full object-cover" poster={p.media.poster} preload="metadata" muted playsInline>
              {p.media.videoUrl ? <source src={p.media.videoUrl} type="video/mp4" /> : null}
            </video>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.media.poster} alt={p.name} className="h-full w-full object-cover" />
          )}
        </motion.div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl border border-white/10 bg-black/20 p-2">
          <div className="text-[10px] text-white/45">Plateforme</div>
          <div className="text-xs font-medium text-white/90">{p.proof.plateforme}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-2">
          <div className="text-[10px] text-white/45">Vues</div>
          <div className="text-xs font-medium text-white/90">{fmt(p.proof.vues)}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-2">
          <div className="text-[10px] text-white/45">Likes</div>
          <div className="text-xs font-medium text-white/90">{fmt(p.proof.likes)}</div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-white/55">
        <span>{p.proof.date}</span>
        <a href={`/signals?focus=${p.id}`} className="text-white/70 hover:text-white underline decoration-white/20">
          Voir la source
        </a>
      </div>
    </div>
  );
}

function buildBaseProducts(): ProductWithOracle[] {
  return [
    {
      id: uid(),
      name: "Kit accessoires picnic (UGC démonstration)",
      score: 74.2,
      category: "lifestyle",
      decision: "LANCER",
      reading: "Demande claire + angle démonstration facile. Lance avec créa simple et répétable.",
      channels: ["TikTok", "Instagram"],
      priceRange: "24–29€",
      media: {
        type: "video",
        poster: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=70",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        sourceUrl: "https://oracle.x10commerce.com/signals",
      },
      proof: { plateforme: "TikTok", vues: 1200000, likes: 84500, date: "il y a 2 h" },
      demand: 78,
      competition: 46,
      saturation: 32,
    },
    {
      id: uid(),
      name: "Brosse animaux (preuve avant/après)",
      score: 63.6,
      category: "lifestyle",
      decision: "TESTER",
      reading: "Bon potentiel, mais l’angle créatif doit être validé vite avec un micro-budget.",
      channels: ["Facebook", "TikTok"],
      priceRange: "19–24€",
      media: {
        type: "video",
        poster: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=70",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        sourceUrl: "https://oracle.x10commerce.com/signals",
      },
      proof: { plateforme: "Facebook", vues: 160000, likes: 3200, date: "il y a 9 h" },
      demand: 62,
      competition: 55,
      saturation: 49,
    },
    {
      id: uid(),
      name: "Soin peau (format UGC rassurant)",
      score: 58.4,
      category: "beauty",
      decision: "TESTER",
      reading: "Marché concurrentiel : tester uniquement avec une promesse sobre + preuve visuelle.",
      channels: ["Instagram", "TikTok"],
      priceRange: "15–20€",
      media: {
        type: "image",
        poster: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=70",
        sourceUrl: "https://oracle.x10commerce.com/signals",
      },
      proof: { plateforme: "Instagram", vues: 420000, likes: 26500, date: "il y a 5 h" },
      demand: 55,
      competition: 72,
      saturation: 61,
    },
    {
      id: uid(),
      name: "Distributeur huile/vinaigre (cuisine)",
      score: 46.9,
      category: "lifestyle",
      decision: "ATTENDRE",
      reading: "Signaux faibles : à surveiller, mais pas de budget tant que la preuve ne s’épaissit pas.",
      channels: ["Facebook", "Amazon"],
      priceRange: "16–22€",
      media: {
        type: "image",
        poster: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=70",
        sourceUrl: "https://oracle.x10commerce.com/signals",
      },
      proof: { plateforme: "Amazon", vues: 98000, likes: 6100, date: "hier" },
      demand: 41,
      competition: 58,
      saturation: 66,
    },
  ];
}

function generateMore(base: ProductWithOracle[], n = 14): ProductWithOracle[] {
  const posters = [
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1517524206127-48bbd363f3f7?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=1200&q=70",
  ];

  const names = [
    "Gadget rangement compact",
    "Accessoire sport posture",
    "Outil cuisine démonstration",
    "Produit beauté avant/après",
    "Support voiture solution rapide",
    "Accessoire bébé apaisant",
    "Gadget quotidien “wow”",
    "Outil nettoyage express",
  ];

  const cats: CategoryId[] = ["lifestyle", "tech", "fitness", "beauty"];
  const chans: PlatformScan[] = ["TikTok", "Instagram", "Facebook", "YouTube", "Amazon", "AliExpress", "Google Tendances"];

  const out: ProductWithOracle[] = [];
  for (let i = 0; i < n; i++) {
    const seed = Math.random();
    const score = Math.round((40 + seed * 45) * 10) / 10;
    const decision: Decision = score >= 72 ? "LANCER" : score >= 58 ? "TESTER" : score >= 47 ? "ATTENDRE" : "ÉVITER";

    const demand = clamp(Math.round(40 + score * 0.7 + (Math.random() * 12 - 6)), 0, 100);
    const competition = clamp(Math.round(75 - score * 0.5 + (Math.random() * 14 - 7)), 0, 100);
    const saturation = clamp(Math.round((competition + (100 - demand)) / 2 + (Math.random() * 10 - 5)), 0, 100);

    const plateforme = chans[Math.floor(Math.random() * chans.length)];
    const vues = Math.round(20000 + Math.random() * 900000);
    const likes = Math.round(vues * (0.02 + Math.random() * 0.08));

    out.push({
      id: uid(),
      name: `${names[Math.floor(Math.random() * names.length)]}`,
      score,
      category: cats[Math.floor(Math.random() * cats.length)],
      decision,
      reading:
        decision === "LANCER"
          ? "Preuve visuelle claire : lance en priorité avec une créa démonstration."
          : decision === "TESTER"
          ? "Potentiel crédible : teste petit budget, valide l’angle avant d’accélérer."
          : decision === "ATTENDRE"
          ? "Surveille : les signaux existent, mais pas assez stables pour engager."
          : "Évite : marché trop encombré ou promesse trop risquée.",
      channels: [plateforme, chans[Math.floor(Math.random() * chans.length)]].filter((v, idx, arr) => arr.indexOf(v) === idx),
      priceRange: `${Math.floor(12 + Math.random() * 18)}–${Math.floor(25 + Math.random() * 35)}€`,
      media: {
        type: "image",
        poster: posters[Math.floor(Math.random() * posters.length)],
        sourceUrl: "https://oracle.x10commerce.com/signals",
      },
      proof: { plateforme, vues, likes, date: "à l’instant" },
      demand,
      competition,
      saturation,
    });
  }

  return [...base, ...out];
}

function nicheToCategory(n: AnalysisNiche): CategoryId {
  if (n === "Lifestyle") return "lifestyle";
  if (n === "Tech & gadgets") return "tech";
  if (n === "Sport") return "fitness";
  if (n === "Beauté") return "beauty";
  return "all";
}

export default function ProductsClient() {
  const [mounted, setMounted] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>("all");

  const [niche, setNiche] = useState<AnalysisNiche>("Toutes");
  const [budget, setBudget] = useState<AnalysisBudget>("< 300 €");
  const [goal, setGoal] = useState<AnalysisGoal>("Lancer maintenant");

  const [products, setProducts] = useState<ProductWithOracle[]>(() => buildBaseProducts());

  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  const plateformesScan: PlatformScan[] = ["TikTok", "Amazon", "AliExpress", "Google Tendances", "YouTube", "Instagram", "Facebook"];

  useEffect(() => setMounted(true), []);

  const categories = useMemo(
    () => [
      { id: "all" as const, name: "Toutes", count: 2847 },
      { id: "lifestyle" as const, name: "Lifestyle", count: 892 },
      { id: "tech" as const, name: "Tech & gadgets", count: 534 },
      { id: "fitness" as const, name: "Sport", count: 423 },
      { id: "beauty" as const, name: "Beauté", count: 387 },
    ],
    []
  );

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    // niche (simple) = un 2e filtre par-dessus category
    const nicheCat = nicheToCategory(niche);

    const list = products.filter((p) => {
      const matchesSearch = !q || p.name.toLowerCase().includes(q);
      const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
      const matchesNiche = nicheCat === "all" || p.category === nicheCat;
      return matchesSearch && matchesCategory && matchesNiche;
    });

    // tri simulé (objectif + budget)
    const sorted = [...list].sort((a, b) => {
      // objectif
      const goalBoost = (p: ProductWithOracle) => {
        if (goal === "Lancer maintenant") return p.decision === "LANCER" ? 100 : p.decision === "TESTER" ? 40 : -10;
        if (goal === "Tester") return p.decision === "TESTER" ? 100 : p.decision === "LANCER" ? 60 : 0;
        // Éviter les saturés
        return (
100 - p.saturation) + (100 - p.competition);
      };

      // budget (on privilégie juste le ticket “produit”, pas le spend pub)
      const budgetBoost = (p: ProductWithOracle) => {
        const min = parseMinPrice(p.priceRange);
        if (budget === "< 300 €") return -min;           // moins cher = mieux
        if (budget === "300 – 500 €") return -Math.abs(min - 25); // milieu
        return min;                                      // plus cher = mieux
      };

      const scoreA = a.score * 2 + goalBoost(a) * 0.6 + budgetBoost(a) * 0.4;
      const scoreB = b.score * 2 + goalBoost(b) * 0.6 + budgetBoost(b) * 0.4;
      return scoreB - scoreA;
    });

    return sorted;
  }, [products, searchQuery, selectedCategory, niche, budget, goal]);

  function lancerAnalyse() {
    if (running) return;
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

        const base = buildBaseProducts();
        const big = generateMore(base, 18);
        setProducts(big);

        setTimeout(() => setRunning(false), 350);
      }
    }, 80);
  }

  useEffect(() => {
    // synchro niche -> category si category reste "all"
    const cat = nicheToCategory(niche);
    if (selectedCategory === "all" && cat !== "all") setSelectedCategory(cat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [niche]);

  if (!mounted) return null;

  return (
    <div className="space-y-6">

        <p className="text-xs text-muted-foreground mb-3">
          <span className="block">
            FR : Indice interne (demande / concurrence / saturation) — pas une promesse de revenus, ni un score financier.
          </span>
          <span className="block">
            EN : Internal index (demand/competition/saturation) — not a financial score or promise of revenue.
          </span>
        </p>
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-3">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1">
            <div className="text-sm text-white/60">Oracle observe le marché et transforme des signaux en décisions.</div>
            <div className="text-white text-xl font-semibold">Machine à décider quoi vendre</div>
          </div>

          <button
            onClick={lancerAnalyse}
            className="rounded-xl border border-white/10 bg-[#6D5EF6] px-4 py-2 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(109,94,246,0.2),0_10px_25px_rgba(109,94,246,0.18)] transition hover:bg-[#7E71FF]"
          >
            🔎 Analyser le marché
          </button>
        </div>

        {/* Filtres “décision” */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="md:col-span-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#6D5EF6]/50"
          />

          <select
            value={niche}
            onChange={(e) => setNiche(e.target.value as AnalysisNiche)}
            className="px-3 py-2.5 rounded-xl border border-white/10 bg-black/20 text-sm text-white"
          >
            {(["Toutes", "Lifestyle", "Tech & gadgets", "Sport", "Beauté"] as const).map((x) => (
              <option key={x} value={x}>{x}</option>
            ))}
          </select>

          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value as AnalysisGoal)}
            className="px-3 py-2.5 rounded-xl border border-white/10 bg-black/20 text-sm text-white"
          >
            {(["Lancer maintenant", "Tester", "Éviter les saturés"] as const).map((x) => (
              <option key={x} value={x}>{x}</option>
            ))}
          </select>

          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value as AnalysisBudget)}
            className="px-3 py-2.5 rounded-xl border border-white/10 bg-black/20 text-sm text-white md:col-span-2"
          >
            {(["< 300 €", "300 – 500 €", "500 € et +"] as const).map((x) => (
              <option key={x} value={x}>{x}</option>
            ))}
          </select>

          <div className="flex flex-wrap gap-2 md:col-span-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  selectedCategory === c.id ? "bg-[#6D5EF6] text-white" : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white/70">
          <span className="text-white/90 font-medium">Oracle ajuste le tri</span> — Objectif :{" "}
          <span className="text-white/90">{goal}</span> • Budget : <span className="text-white/90">{budget}</span> • Niche :{" "}
          <span className="text-white/90">{niche}</span>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }} className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-white/60 text-sm">
            <span className="text-white font-medium">{filteredProducts.length}</span> produits visibles
          </div>
          <Link href="/signals" className="text-sm text-white/70 hover:text-white underline decoration-white/20">
            Voir les preuves (Signals)
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredProducts.map((p, index) => {
            const ds = decisionStyle(p.decision);
            return (
              <MotionGlassCard
                key={p.id}
                className="p-5 hover:bg-white/[0.055] transition cursor-pointer"
                initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: 0.04 * index }}
                whileHover={{ scale: 1.01, y: -3 }}
              >
                <MediaPreview p={p} />

                <div className="mt-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white truncate">{p.name}</div>
                      <div className="mt-0.5 text-[11px] text-white/55">
                        Prix cible : <span className="text-white/80">{p.priceRange}</span> • Canaux :{" "}
                        <span className="text-white/80">{p.channels.join(", ")}</span>
                      </div>
                    </div>

                    <div className={`shrink-0 text-lg font-semibold ${getScoreTone(p.score)}`}>{p.score}</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] tracking-[0.18em] text-white/45">DÉCISION</span>
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${ds.bg} ${ds.text} ${ds.border}`}>
                      {ds.label}
                    </span>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <div className="text-xs font-medium text-white/65">Lecture Oracle</div>
                    <div className="mt-1 text-sm text-white/90">{p.reading}</div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <div className="text-[10px] text-white/55">Demande</div>
                      <TinyBar value={p.demand} />
                      <div className="text-[10px] text-white/45">{p.demand}%</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] text-white/55">Concurrence</div>
                      <TinyBar value={p.competition} />
                      <div className="text-[10px] text-white/45">{p.competition}%</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] text-white/55">Saturation</div>
                      <TinyBar value={p.saturation} />
                      <div className="text-[10px] text-white/45">{p.saturation}%</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={`/signals?focus=${p.id}`}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-xs font-medium text-white/90 hover:bg-white/10"
                    >
                      Voir preuves
                    </a>
                    <Link
                      href={`/opportunities?focus=${p.id}`}
                      className="rounded-xl border border-white/10 bg-[#6D5EF6] px-3 py-2 text-center text-xs font-medium text-white hover:bg-[#7E71FF]"
                    >
                      Voir opportunité
                    </Link>
                  </div>
                </div>
              </MotionGlassCard>
            );
          })}
        </div>
      </motion.section>

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
              <div className="text-lg font-semibold text-white">Analyse multi-plateformes</div>
              <div className="mt-1 text-sm text-white/70">Oracle collecte des preuves et filtre les faux signaux…</div>

              <div className="mt-4">
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <motion.div className="h-2 rounded-full bg-[#6D5EF6]" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} />
                </div>
                <div className="mt-2 text-xs text-white/50">{progress}%</div>
              </div>

              <div className="mt-4 space-y-2">
                {plateformesScan.map((p, i) => (
                  <div key={p} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${i < stage ? "bg-emerald-400" : i === stage ? "bg-[#6D5EF6]" : "bg-white/20"}`} />
                      <span className="text-sm text-white">{p}</span>
                    </div>
                    <span className="text-xs text-white/60">{i < stage ? "OK" : i === stage ? "Analyse…" : "En attente"}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${stage > plateformesScan.length ? "bg-emerald-400" : stage === plateformesScan.length ? "bg-[#6D5EF6]" : "bg-white/20"}`} />
                    <span className="text-sm text-white">Fusion & tri</span>
                  </div>
                  <span className="text-xs text-white/60">{stage > plateformesScan.length ? "OK" : stage === plateformesScan.length ? "Analyse…" : "En attente"}</span>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${stage > plateformesScan.length + 1 ? "bg-emerald-400" : stage === plateformesScan.length + 1 ? "bg-[#6D5EF6]" : "bg-white/20"}`} />
                    <span className="text-sm text-white">Déduplication</span>
                  </div>
                  <span className="text-xs text-white/60">{stage > plateformesScan.length + 1 ? "OK" : stage === plateformesScan.length + 1 ? "Analyse…" : "En attente"}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
