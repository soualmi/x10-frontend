"use client";

import { motion } from "framer-motion";

const ease = "easeInOut";

const heroTitle = {
  hidden: { opacity: 0, y: 16, scale: 0.985, filter: "blur(10px)" },
  show:   { opacity: 1, y: 0,  scale: 1,     filter: "blur(0px)" },
};

const heroSub = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)" },
};

const panel = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)" },
};

export default function HomeClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-bg text-fg">
      <div className="pointer-events-none absolute inset-0 oracle-aurora oracle-noise" />

      <section className="relative mx-auto max-w-6xl px-6 pt-40">
        <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.12 }}>
          <motion.h1
            variants={heroTitle}
            transition={{ duration: 0.8, ease }}
            className="text-5xl md:text-6xl font-semibold tracking-tight"
          >
            Oracle Intelligence Platform
          </motion.h1>

          <motion.p
            variants={heroSub}
            transition={{ duration: 0.65, ease }}
            className="mt-6 max-w-xl text-lg text-muted"
          >
            Le marché parle. Nous écoutons en premier.
          </motion.p>

          <motion.div
            variants={panel}
            transition={{ duration: 0.8, ease, delay: 0.25 }}
            className="oracle-glass mt-16 rounded-2xl p-6"
          >
            <div className="grid grid-cols-3 gap-6 text-sm">
              <div>
                <div className="text-muted">Signaux détectés</div>
                <div className="mt-1 text-2xl font-semibold">451</div>
              </div>
              <div>
                <div className="text-muted">Anomalies actives</div>
                <div className="mt-1 text-2xl font-semibold text-red-200">80</div>
              </div>
              <div>
                <div className="text-muted">Sources analysées</div>
                <div className="mt-1 text-2xl font-semibold">7 / 7</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={heroSub}
            transition={{ duration: 0.6, ease, delay: 0.45 }}
            className="mt-12"
          >
            <a href="/signals" className="inline-flex items-center text-sm text-fg/80 hover:text-fg transition">
              Demander un accès →
            </a>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
