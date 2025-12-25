"use client";
import Link from "next/link";

export default function PricingClient() {
  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight md:text-5xl text-white">
          Choisissez votre niveau d'accès
        </h1>
        <p className="text-lg text-white/60">
          Détection et analyse précoce du marché.
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Plan 1 */}
        <div
          className="group rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-8 transition-all duration-300 hover:scale-[1.02]"
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
            e.currentTarget.style.boxShadow = "0 18px 60px rgba(255,255,255,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div className="mb-6">
            <div className="text-[11px] tracking-[0.22em] text-white/45">DÉCOUVERTE</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-semibold text-white">49€</span>
              <span className="text-sm text-white/45">/mois</span>
            </div>
          </div>

          <ul className="mb-8 space-y-3 text-sm text-white/70">
            {[
              "Recherche simple",
              "Filtres essentiels",
              "Résultats limités",
              "Lecture synthétique",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0 text-white/70">✓</span>
                <span>{t}</span>
              </li>
            ))}
            {["Pas d'export", "Pas de sauvegarde"].map((t) => (
              <li key={t} className="flex items-start gap-2 opacity-50">
                <span className="mt-0.5 shrink-0 text-white/35">✗</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/login"
            className="block rounded-xl border border-white/15 bg-black/20 px-6 py-3 text-center font-semibold text-white/85
                       transition hover:bg-white/5"
          >
            Commencer
          </Link>
        </div>

        {/* Plan 2 (Populaire) */}
        <div
          className="group relative rounded-2xl border border-white/15 bg-white/[0.045] backdrop-blur-xl p-8 transition-all duration-300 hover:scale-[1.02]"
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 24px 80px rgba(255,255,255,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
          }}
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <span className="rounded-full px-4 py-1 text-xs font-semibold shadow-lg border border-white/15 bg-white text-black">
              POPULAIRE
            </span>
          </div>

          <div className="mb-6">
            <div className="text-[11px] tracking-[0.22em] text-white/45">CROISSANCE</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-semibold text-white">149€</span>
              <span className="text-sm text-white/45">/mois</span>
            </div>
          </div>

          <ul className="mb-8 space-y-3 text-sm text-white/70">
            {[
              "Recherche avancée",
              "Filtres détaillés",
              "Résultats complets",
              "Comparaison produits",
              "Sauvegardes",
              "Export basique",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0 text-white/70">✓</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/login"
            className="block rounded-xl bg-white px-6 py-3 text-center font-semibold text-black transition hover:opacity-90"
          >
            Commencer
          </Link>
        </div>

        {/* Plan 3 */}
        <div
          className="group rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-8 transition-all duration-300 hover:scale-[1.02]"
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
            e.currentTarget.style.boxShadow = "0 18px 60px rgba(99,102,241,0.14)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div className="mb-6">
            <div className="text-[11px] tracking-[0.22em] text-white/45">PRO</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-semibold text-white">499€</span>
              <span className="text-sm text-white/45">/mois</span>
            </div>
          </div>

          <ul className="mb-8 space-y-3 text-sm text-white/70">
            {[
              "Accès total",
              "Filtres experts",
              "Données profondes",
              "Automatisation",
              "Vision stratégique",
              "Support prioritaire",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0 text-white/70">✓</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/login"
            className="block rounded-xl border border-white/15 bg-black/20 px-6 py-3 text-center font-semibold text-white/85
                       transition hover:bg-white/5"
          >
            Commencer
          </Link>
        </div>
      </div>

      {/* Tableau comparatif */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl">
        <div className="p-6">
          <h2 className="mb-6 text-2xl font-semibold text-white">Tableau comparatif</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white/70">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-4 text-left font-semibold text-white/85">Fonctionnalité</th>
                  <th className="pb-4 text-center font-semibold text-white/70">Découverte</th>
                  <th className="pb-4 text-center font-semibold text-white/70">Croissance</th>
                  <th className="pb-4 text-center font-semibold text-white/70">Pro</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Recherches par jour", "5", "20", "Illimité"],
                  ["Produits par recherche", "10", "50", "Illimité"],
                  ["Filtres disponibles", "3 basiques", "8 avancés", "15+ experts"],
                  ["Export données", "—", "CSV (50 lignes)", "Excel complet"],
                  ["Sauvegardes", "—", "5 recherches", "Illimité"],
                  ["Refresh données", "1x/jour", "3x/jour", "Temps réel"],
                  ["Alertes", "—", "1 alerte", "Illimité"],
                  ["Launch Blueprint", "—", "—", "✓ Auto"],
                  ["Support", "Email 48h", "Email 24h", "Prioritaire"],
                  ["API Access", "—", "—", "+200€/mois"],
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="transition-colors border-b border-white/10 hover:bg-white/5"
                  >
                    <td className="py-3 text-white/80">{row[0]}</td>
                    <td className="py-3 text-center">{row[1]}</td>
                    <td className="py-3 text-center">{row[2]}</td>
                    <td className="py-3 text-center">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/demo"
          className="inline-block rounded-xl border border-white/15 bg-black/20 px-8 py-3 font-semibold text-white/85
                     transition hover:bg-white/5 hover:scale-[1.02]"
        >
          Voir la démo
        </Link>
      </div>
    </div>
  );
}
