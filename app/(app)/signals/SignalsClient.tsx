"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type Plateforme = "TikTok" | "Instagram" | "Facebook" | "YouTube" | "Amazon" | "AliExpress" | "Google Tendances";
type Niveau = "Très fort" | "Fort" | "Moyen" | "Faible";

type SignalItem = {
  id: string;
  plateforme: Plateforme;
  titre: string;
  niche: string;
  niveau: Niveau;
  preuve: {
    vues?: number;
    likes?: number;
    commentaires?: number;
    croissance24h?: number;
    date: string;
  };
  media: {
    type: "video" | "image";
    miniature: string; // poster
    videoUrl?: string; // mp4
    urlSource: string;
  };
  lectureOracle: string;
  tags: string[];
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function fmt(n?: number) {
  if (n === undefined) return "—";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(".", ",")}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}k`;
  return `${n}`;
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

function BadgeNiveau({ niveau }: { niveau: Niveau }) {
  const map: Record<Niveau, string> = {
    "Très fort": "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
    Fort: "bg-sky-500/15 text-sky-300 border-sky-500/25",
    Moyen: "bg-amber-500/15 text-amber-300 border-amber-500/25",
    Faible: "bg-red-500/15 text-red-300 border-red-500/25",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${map[niveau]}`}>
      {niveau}
    </span>
  );
}

function PlateformePuce({ p }: { p: Plateforme }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#EAF0FF]">
      {p}
    </span>
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

/**
 * NOTE: MP4 publics placeholder
 */
const BASE_SIGNALS: SignalItem[] = [
  {
    id: "s1",
    plateforme: "TikTok",
    titre: "Gadget cuisine compact (démonstration courte)",
    niche: "Maison & cuisine",
    niveau: "Très fort",
    preuve: { vues: 1200000, likes: 84500, commentaires: 2400, croissance24h: 18, date: "il y a 2 h" },
    media: {
      type: "video",
      miniature: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=70",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      urlSource: "https://www.tiktok.com/",
    },
    lectureOracle: "Montée rapide et démonstration claire : bon candidat pour une pub simple et répétable.",
    tags: ["Démonstration", "Usage évident", "Partageable"],
  },
  {
    id: "s2",
    plateforme: "Instagram",
    titre: "Outil beauté (avant / après) — format UGC",
    niche: "Beauté & soins",
    niveau: "Fort",
    preuve: { vues: 420000, likes: 26500, commentaires: 980, croissance24h: 9, date: "il y a 5 h" },
    media: {
      type: "video",
      miniature: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=70",
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
      urlSource: "https://www.instagram.com/",
    },
    lectureOracle: "Le format avant/après réduit le doute : test conseillé avec une promesse sobre.",
    tags: ["Avant/après", "UGC", "Confiance"],
  },
  {
    id: "s3",
    plateforme: "Facebook",
    titre: "Accessoire voiture — angle “solution rapide”",
    niche: "Accessoires auto",
    niveau: "Moyen",
    preuve: { vues: 160000, likes: 3200, commentaires: 410, croissance24h: 4, date: "il y a 9 h" },
    media: {
      type: "image",
      miniature: "https://images.unsplash.com/photo-1517524206127-48bbd363f3f7?auto=format&fit=crop&w=1200&q=70",
      urlSource: "https://www.facebook.com/",
    },
    lectureOracle: "Signal présent mais marché souvent saturé : intéressant uniquement avec un angle unique.",
    tags: ["Solution", "Marché dense", "Angle requis"],
  },
  {
    id: "s4",
    plateforme: "YouTube",
    titre: "Comparatif produits — mention récurrente en commentaires",
    niche: "Gadgets du quotidien",
    niveau: "Fort",
    preuve: { vues: 98000, likes: 6100, commentaires: 780, croissance24h: 12, date: "hier" },
    media: {
      type: "video",
      miniature: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=70",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      urlSource: "https://www.youtube.com/",
    },
    lectureOracle: "Quand les commentaires demandent ‘où acheter’, la demande est plus chaude qu’elle n’en a l’air.",
    tags: ["Intentions d'achat", "Comparatif", "Demande"],
  },
  {
    id: "s5",
    plateforme: "Google Tendances",
    titre: "Requête en hausse sur 7 jours — pic inhabituel",
    niche: "Sport & bien-être",
    niveau: "Moyen",
    preuve: { croissance24h: 6, date: "il y a 1 j" },
    media: {
      type: "image",
      miniature: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=1200&q=70",
      urlSource: "https://trends.google.com/",
    },
    lectureOracle: "Bon signal de curiosité : à croiser avec TikTok avant d’investir.",
    tags: ["Curiosité", "Validation", "Croisement"],
  },
  {
    id: "s6",
    plateforme: "Amazon",
    titre: "Avis récents + photos clients — montée régulière",
    niche: "Maison & cuisine",
    niveau: "Moyen",
    preuve: { commentaires: 120, croissance24h: 3, date: "il y a 2 j" },
    media: {
      type: "image",
      miniature: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=1200&q=70",
      urlSource: "https://www.amazon.com/",
    },
    lectureOracle: "Les photos clients indiquent un usage réel : bon pour des pubs ‘preuve sociale’.",
    tags: ["Preuve sociale", "Avis", "Usage réel"],
  },
  {
    id: "s7",
    plateforme: "AliExpress",
    titre: "Commandes en hausse — livraison stable",
    niche: "Gadgets du quotidien",
    niveau: "Faible",
    preuve: { commentaires: 45, croissance24h: 2, date: "il y a 3 j" },
    media: {
      type: "image",
      miniature: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=70",
      urlSource: "https://www.aliexpress.com/",
    },
    lectureOracle: "Signal faible : utile comme backup si un angle créatif très fort est trouvé.",
    tags: ["Backup", "Créa", "Faible signal"],
  },
];

function SignalCard({ s }: { s: SignalItem }) {
  const vidRef = useRef<HTMLVideoElement | null>(null);
  const [hovered, setHovered] = useState(false);

  const onEnter = () => {
    setHovered(true);
    if (s.media.type !== "video") return;
    const v = vidRef.current;
    if (!v) return;
    try {
      v.muted = true;
      v.playsInline = true;
      v.loop = true;
      v.currentTime = 0;
      const p = v.play();
      if (p && typeof (p as any).catch === "function") (p as any).catch(() => {});
    } catch {}
  };

  const onLeave = () => {
    setHovered(false);
    if (s.media.type !== "video") return;
    const v = vidRef.current;
    if (!v) return;
    try {
      v.pause();
      v.currentTime = 0;
    } catch {}
  };

  return (
    <Glass className="overflow-hidden">
      {/* Média propre : pas de texte incrusté */}
      <div
        className="relative aspect-video w-full overflow-hidden border-b border-white/10 bg-black/20"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.02 : 1 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          {s.media.type === "video" ? (
            <video
              ref={vidRef}
              className="h-full w-full object-cover"
              poster={s.media.miniature}
              preload="metadata"
              muted
              playsInline
            >
              {s.media.videoUrl ? <source src={s.media.videoUrl} type="video/mp4" /> : null}
            </video>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={s.media.miniature} alt={s.titre} className="h-full w-full object-cover" />
          )}
        </motion.div>

        {/* léger voile au hover (premium, sans texte) */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.18 }}
        />
      </div>

      {/* Infos sous la vidéo */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-[#EAF0FF]">{s.titre}</div>
            <div className="mt-0.5 text-xs text-[#A7B3C7]">
              {s.niche} • {s.preuve.date}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <PlateformePuce p={s.plateforme} />
            <BadgeNiveau niveau={s.niveau} />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <div className="rounded-xl border border-white/10 bg-black/20 p-2">
            <div className="text-[10px] text-[#72829A]">Vues</div>
            <div className="text-sm font-semibold text-[#EAF0FF]">{fmt(s.preuve.vues)}</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-2">
            <div className="text-[10px] text-[#72829A]">Likes</div>
            <div className="text-sm font-semibold text-[#EAF0FF]">{fmt(s.preuve.likes)}</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-2">
            <div className="text-[10px] text-[#72829A]">Com.</div>
            <div className="text-sm font-semibold text-[#EAF0FF]">{fmt(s.preuve.commentaires)}</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-2">
            <div className="text-[10px] text-[#72829A]">+24 h</div>
            <div className="text-sm font-semibold text-[#EAF0FF]">
              {s.preuve.croissance24h !== undefined ? `${s.preuve.croissance24h}%` : "—"}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <div className="text-xs font-medium text-[#A7B3C7]">Lecture Oracle</div>
          <div className="mt-1 text-sm text-[#EAF0FF]">{s.lectureOracle}</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {s.tags.slice(0, 4).map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-[#A7B3C7]">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <a
            href={s.media.urlSource}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-xs font-medium text-[#EAF0FF] hover:bg-white/8"
          >
            Voir la source
          </a>
          <Link
            href="/products"
            className="rounded-xl border border-white/10 bg-[#6D5EF6] px-3 py-2 text-center text-xs font-medium text-white hover:bg-[#7E71FF]"
          >
            Voir les produits
          </Link>
        </div>
      </div>
    </Glass>
  );
}

export default function SignalsPage() {
  const searchParams = useSearchParams();
  const focus = (searchParams?.get("focus") || "").trim();

  const [signals, setSignals] = useState<SignalItem[]>(BASE_SIGNALS);

  const [plateforme, setPlateforme] = useState<Plateforme | "Toutes">("Toutes");
  const [niche, setNiche] = useState<string>("Toutes");
  const [niveau, setNiveau] = useState<Niveau | "Tous">("Tous");
  const [q, setQ] = useState("");

  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  const plateformesScan: Plateforme[] = ["TikTok", "Amazon", "AliExpress", "Google Tendances", "YouTube", "Instagram", "Facebook"];

  const niches = useMemo(() => {
    const set = new Set<string>(signals.map((s) => s.niche));
    return ["Toutes", ...Array.from(set)];
  }, [signals]);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return signals.filter((s) => {
      if (plateforme !== "Toutes" && s.plateforme !== plateforme) return false;
      if (niche !== "Toutes" && s.niche !== niche) return false;
      if (niveau !== "Tous" && s.niveau !== niveau) return false;
      if (qq && !(s.titre.toLowerCase().includes(qq) || s.tags.join(" ").toLowerCase().includes(qq))) return false;
      return true;
    });
  }, [signals, plateforme, niche, niveau, q]);

  function lancerScan() {
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

        const extra: SignalItem[] = BASE_SIGNALS.slice(0, 2).map((x) => ({
          ...x,
          id: `${x.id}_new_${Math.random().toString(36).slice(2, 8)}`,
          preuve: { ...x.preuve, date: "à l’instant", croissance24h: clamp((x.preuve.croissance24h ?? 4) + 3, 1, 28) },
          lectureOracle: "Preuve visuelle solide : bon test pour valider l’angle sans surinvestir.",
        }));

        setSignals((prev) => [...extra, ...prev]);
        setTimeout(() => setRunning(false), 350);
      }
    }, 80);
  }

  const totals = useMemo(() => {
    const fort = signals.filter((s) => s.niveau === "Très fort" || s.niveau === "Fort").length;
    const preuves = signals.filter((s) => (s.preuve.vues ?? 0) > 0 || (s.preuve.likes ?? 0) > 0 || (s.preuve.commentaires ?? 0) > 0 || (s.preuve.croissance24h ?? 0) > 0).length;
    return { fort, preuves };
  }, [signals]);

  return (
    <>
      <p className="text-xs text-muted-foreground mt-2">
        <span className="block">
          FR : Signaux e-commerce basés sur des données produit — pas des signaux financiers.
        </span>
        <span className="block">
          EN : E-commerce product signals — not financial or investment signals.
        </span>
      </p>


<div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-[#EAF0FF]">Signaux</h1>
<p className="text-sm text-[#A7B3C7]">
            Des <span className="text-[#EAF0FF]">preuves visuelles</span> + des chiffres, pour décider vite.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={lancerScan}
            className="rounded-xl border border-white/10 bg-[#6D5EF6] px-4 py-2 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(109,94,246,0.2),0_10px_25px_rgba(109,94,246,0.18)] transition hover:bg-[#7E71FF]"
          >
            🔎 Lancer un scan
          </button>
          <Link href="/products" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#EAF0FF] transition hover:bg-white/8">
            Produits
          </Link>
          <Link href="/dashboard" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#EAF0FF] transition hover:bg-white/8">
            Dashboard
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Glass className="p-4">
          <div className="text-xs text-[#A7B3C7]">Signaux total</div>
          <div className="mt-1 text-2xl font-semibold text-[#EAF0FF]">{signals.length}</div>
          <div className="mt-2 text-xs text-[#72829A]">Après scan, de nouveaux signaux apparaissent</div>
        </Glass>
        <Glass className="p-4">
          <div className="text-xs text-[#A7B3C7]">Signaux forts</div>
          <div className="mt-1 text-2xl font-semibold text-[#EAF0FF]">{totals.fort}</div>
          <div className="mt-2 text-xs text-[#72829A]">Très fort + Fort</div>
        </Glass>
        <Glass className="p-4">
          <div className="text-xs text-[#A7B3C7]">Preuves chiffrées</div>
          <div className="mt-1 text-2xl font-semibold text-[#EAF0FF]">{totals.preuves}</div>
          <div className="mt-2 text-xs text-[#72829A]">Vues, likes, commentaires, croissance</div>
        </Glass>
      </div>

      <Glass className="p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <div>
            <div className="text-xs font-medium text-[#A7B3C7]">Plateforme</div>
            <select value={plateforme} onChange={(e) => setPlateforme(e.target.value as any)} className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-[#EAF0FF]">
              {(["Toutes", ...plateformesScan] as const).map((x) => (
                <option key={x} value={x}>{x}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="text-xs font-medium text-[#A7B3C7]">Niche</div>
            <select value={niche} onChange={(e) => setNiche(e.target.value)} className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-[#EAF0FF]">
              {niches.map((x) => (
                <option key={x} value={x}>{x}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="text-xs font-medium text-[#A7B3C7]">Niveau</div>
            <select value={niveau} onChange={(e) => setNiveau(e.target.value as any)} className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-[#EAF0FF]">
              {(["Tous", "Très fort", "Fort", "Moyen", "Faible"] as const).map((x) => (
                <option key={x} value={x}>{x}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="text-xs font-medium text-[#A7B3C7]">Recherche</div>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ex: démonstration, UGC, avis..." className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-[#EAF0FF] placeholder:text-[#72829A]" />
          </div>
        </div>
      </Glass>

      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        initial="hidden"
        animate="show"
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } }}
      >
        {filtered.length === 0 ? (
          <Glass className="p-6 sm:col-span-2 lg:col-span-3 xl:col-span-4">
            <div className="text-sm font-semibold text-[#EAF0FF]">
              Aucun signal ne correspond à ces filtres
            </div>
            <div className="mt-1 text-sm text-[#A7B3C7]">
              Essaie d’élargir la plateforme, la niche, le niveau, ou de vider la recherche.
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setPlateforme("Toutes");
                  setNiche("Toutes");
                  setNiveau("Tous");
                  setQ("");
                }}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#EAF0FF] transition hover:bg-white/8"
              >
                Réinitialiser les filtres
              </button>
              <button
                onClick={lancerScan}
                className="rounded-xl border border-white/10 bg-[#6D5EF6] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#7E71FF]"
              >
                🔎 Lancer un scan
              </button>
            </div>
          </Glass>
        ) : (
          filtered.map((s) => (
            <motion.div
              key={s.id}
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <SignalCard s={s} />
            </motion.div>
          ))
        )}
      </motion.div>

      <AnimatePresence>
        {running && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0F1621] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.6)]" initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }} transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}>
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
    </>
  );
}