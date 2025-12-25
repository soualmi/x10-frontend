"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(!!mql.matches);
    onChange();
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function SplitLines({ text }: { text: string }) {
  const lines = text.split("\n").map((s) => s.trim()).filter(Boolean);
  return (
    <span className="inline-block">
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "110%", opacity: 0, filter: "blur(12px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.35, ease: "easeInOut", delay: 0.18 + i * 0.14 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <div className="text-[11px] tracking-[0.18em] text-white/45">{label}</div>
      <div className="text-[11px] tracking-[0.18em] text-white/85">{value}</div>
    </div>
  );
}

export default function HomeV2Client() {
  const reduced = usePrefersReducedMotion();

  // Parallax ultra-subtil (souris)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 80, damping: 22, mass: 0.6 });

  const bgX = useTransform(sx, (v) => `${v * 0.6}px`);
  const bgY = useTransform(sy, (v) => `${v * 0.35}px`);
  const glowX = useTransform(sx, (v) => `${v * 1.2}px`);
  const glowY = useTransform(sy, (v) => `${v * 0.9}px`);
  const specX = useTransform(sx, (v) => `${50 + v * 14}%`);
  const specY = useTransform(sy, (v) => `${40 + v * 10}%`);

  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduced) return;

    const el = rootRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / r.width;
      const y = (e.clientY - (r.top + r.height / 2)) / r.height;
      mx.set(x * 24);
      my.set(y * 24);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduced]);

  const hero = useMemo(
    () => ({
      title: "Oracle\nIntelligence Platform",
      baseline: "Détection et analyse précoce du marché",
    }),
    []
  );

  return (
    <div ref={rootRef} className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background base */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_40%,rgba(255,255,255,0.045),rgba(0,0,0,0.965))]" />
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      {/* Aurora + parallax */}
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ x: bgX, y: bgY }}>
        <div
          className="absolute -top-44 left-1/2 -translate-x-1/2 h-[560px] w-[980px] opacity-[0.16]
                     bg-[radial-gradient(closest-side,rgba(168,85,247,0.75),transparent_66%)] blur-[58px]"
        />
        <div
          className="absolute top-24 left-[-160px] h-[520px] w-[720px] opacity-[0.11]
                     bg-[radial-gradient(closest-side,rgba(59,130,246,0.75),transparent_70%)] blur-[64px]"
        />
        <div
          className="absolute bottom-[-240px] right-[-140px] h-[720px] w-[900px] opacity-[0.10]
                     bg-[radial-gradient(closest-side,rgba(99,102,241,0.72),transparent_68%)] blur-[70px]"
        />

        {!reduced && (
          <motion.div
            className="absolute inset-0 opacity-[0.10]"
            initial={{ opacity: 0.07 }}
            animate={{ opacity: [0.07, 0.12, 0.08] }}
            transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
            style={{
              background:
                "radial-gradient(900px 460px at 40% 30%, rgba(168,85,247,0.20), transparent 60%), radial-gradient(800px 520px at 60% 55%, rgba(59,130,246,0.14), transparent 62%)",
              filter: "blur(20px)",
            }}
          />
        )}
      </motion.div>

      {/* Scanner sweep */}
      {!reduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-screen"
          initial={{ y: "-25%" }}
          animate={{ y: ["-25%", "120%"] }}
          transition={{ duration: 7.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 2.8 }}
          style={{
            background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.18) 45%, transparent 75%)",
            filter: "blur(9px)",
          }}
        />
      )}

      {/* Noise grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.085] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-6 pt-14 pb-14">
        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="flex items-center justify-between gap-6"
        >
          {/* Brand */}
          <a href="/oracle" className="flex items-center gap-3 shrink-0">
            <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm" />
            <div className="text-sm tracking-wide text-white/70 whitespace-nowrap">ORACLE</div>
          </a>

          {/* Nav (desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-[12px] tracking-[0.16em] text-white/55">
            <a className="hover:text-white transition" href="/produit">PRODUIT</a>
            <a className="hover:text-white transition" href="/ressources">RESSOURCES</a>
            <a className="hover:text-white transition" href="/tarifs">TARIFS</a>
            <a className="hover:text-white transition" href="/clients">CLIENTS</a>
            <a className="hover:text-white transition" href="/contact">CONTACT</a>
          </nav>

          {/* Auth actions */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/login"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-xl
                         border border-white/12 bg-white/5 text-white/75
                         hover:bg-white/7 hover:text-white backdrop-blur-sm transition text-[12px]"
            >
              Connexion
            </a>

            <a
              href="/signup"
              className="inline-flex items-center px-4 py-2 rounded-xl
                         bg-white text-black font-medium
                         shadow-[0_0_0_1px_rgba(255,255,255,0.10)]
                         hover:shadow-[0_0_0_1px_rgba(255,255,255,0.22)]
                         transition text-[12px] overflow-hidden relative"
            >
              <span className="relative z-10">Inscription</span>
              {!reduced && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-[-120%] hover:translate-x-[120%] transition-transform duration-700"
                  style={{
                    background:
                      "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.65) 50%, transparent 70%)",
                    opacity: 0.55,
                    filter: "blur(2px)",
                  }}
                />
              )}
            </a>
          </div>
        </motion.div>

        {/* Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left */}
          <div className="lg:col-span-6">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut", delay: 0.05 }}
              className="text-5xl sm:text-7xl leading-[1.02] font-semibold tracking-[-0.04em]"
            >
              <SplitLines text={hero.title} />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.0, ease: "easeInOut", delay: 0.45 }}
              className="mt-3 text-base sm:text-lg text-white/70 max-w-xl"
            >
              {hero.baseline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: "easeInOut", delay: 0.55 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href="/signals"
                className="group relative inline-flex items-center gap-2 px-5 py-3 rounded-xl
                           bg-white text-black font-medium
                           shadow-[0_0_0_1px_rgba(255,255,255,0.10)]
                           hover:shadow-[0_0_0_1px_rgba(255,255,255,0.22)]
                           transition overflow-hidden"
              >
                <span className="relative z-10">Accéder aux signaux</span>
                <span className="relative z-10 opacity-70 group-hover:opacity-100 transition">↗</span>

                {!reduced && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700"
                    style={{
                      background:
                        "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.65) 50%, transparent 70%)",
                      opacity: 0.55,
                      filter: "blur(2px)",
                    }}
                  />
                )}
              </a>
            </motion.div>
          </div>

          {/* Monolith */}
          <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(16px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: "easeInOut", delay: 0.22 }}
            className="lg:col-span-6"
          >
            <motion.div
              className="relative"
              animate={reduced ? {} : { scale: [1, 1.006, 1] }}
              transition={reduced ? {} : { duration: 9.5, ease: "easeInOut", repeat: Infinity }}
            >
              <div className="relative rounded-[28px] border border-white/10 bg-white/[0.035] backdrop-blur-xl overflow-hidden">
                {/* Anisotropic edges */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.70]"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.00) 28%, rgba(255,255,255,0.00) 72%, rgba(255,255,255,0.14) 100%)",
                    maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.65))",
                    WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.65))",
                  }}
                />

                {/* Specular highlight follows cursor */}
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.20]"
                  style={{
                    background:
                      "radial-gradient(560px 320px at var(--x) var(--y), rgba(255,255,255,0.28), transparent 60%)",
                    filter: "blur(6px)",
                    // @ts-ignore
                    "--x": specX,
                    // @ts-ignore
                    "--y": specY,
                  }}
                />

                {/* Inner glow orb */}
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-14 -right-16 h-72 w-72 rounded-full opacity-[0.16] blur-[34px]"
                  style={{
                    x: glowX,
                    y: glowY,
                    background: "radial-gradient(circle at 30% 30%, rgba(168,85,247,0.65), transparent 60%)",
                  }}
                />

                <div className="relative p-7">
                  <div className="text-[11px] tracking-[0.24em] text-white/45">MONOLITH</div>

                  <div className="mt-3 text-lg font-semibold">Signal Acquisition</div>
                  <div className="mt-1 text-sm text-white/70">
                    Flux multi-sources. Détection d’anomalies. Priorisation.
                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Row label="LATENCE" value="< 1s" />
                    <Row label="COUVERTURE" value="GLOBAL" />
                    <Row label="RISQUE" value="FILTRÉ" />
                    <Row label="MODE" value="SILENCIEUX" />
                  </div>

                  <div id="proof" className="mt-7 rounded-2xl border border-white/10 bg-black/35 p-5">
                    <div className="text-[11px] tracking-[0.22em] text-white/45">PROOF OF WORK</div>
                    <div className="mt-2 text-sm text-white/80">
                      Ce qui compte : le signal avant le bruit.
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2 text-[11px] tracking-[0.18em] text-white/65">
                      <span className="px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5">451</span>
                      <span className="px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5">80</span>
                      <span className="px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5">7/7</span>
                      <span className="px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5">TRENDS</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Base shadow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-6 left-10 right-10 h-16 blur-2xl opacity-[0.35]"
                style={{
                  background: "radial-gradient(closest-side, rgba(0,0,0,0.95), transparent 70%)",
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-16 text-xs text-white/35">
          oracle.x10commerce.com — Intelligence, pas opinions.
        </div>
      </div>
    </div>
  );
}
