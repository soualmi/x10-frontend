"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)' }}>
      <nav className="border-b" style={{ borderColor: 'rgba(212, 165, 116, 0.1)' }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold" style={{ color: '#d4a574' }}>Oracle</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>by x10commerce</div>
          </div>
          <Link href="/dashboard" className="rounded-lg px-6 py-2.5 text-sm font-semibold" style={{ background: '#4a5f73', color: '#fff' }}>
            Connexion →
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h1 className="mb-6 text-5xl font-bold" style={{ color: '#fff' }}>
          Oracle transforme les données du web en <span style={{ color: '#d4a574' }}>produits e-commerce rentables</span>
        </h1>
        <p className="mx-auto mb-10 max-w-3xl text-lg" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Analyse des signaux réels de TikTok, Facebook et des marketplaces pour identifier quoi vendre, quand, et pourquoi.
        </p>
        <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-semibold" style={{ background: 'linear-gradient(135deg, #d4a574, #b8935f)', color: '#0f172a' }}>
          Accéder au cockpit →
        </Link>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { value: "2,847", label: "produits analysés" },
            { value: "143", label: "opportunités détectées" },
            { value: "6/6", label: "sources actives" },
          ].map((stat, i) => (
            <div key={i} className="rounded-xl p-6 text-center" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div className="mb-2 text-4xl font-bold" style={{ color: '#d4a574' }}>{stat.value}</div>
              <div className="text-sm" style={{ color: '#fff' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
