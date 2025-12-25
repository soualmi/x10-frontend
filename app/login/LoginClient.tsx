"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (email && password) {
        localStorage.setItem("oracle_token", "demo_token");
        router.push("/dashboard");
      } else {
        setError("Veuillez saisir vos identifiants");
      }
    } catch {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-[11px] tracking-[0.22em] text-white/45">ORACLE // ACCESS</div>
          <h1 className="mt-2 text-2xl font-semibold text-white">Accès</h1>
          <p className="mt-2 text-sm text-white/60">Connexion à votre espace.</p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-6">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[12px] text-white/70 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-black/25 border border-white/10 px-4 py-3 text-white placeholder-white/30
                           focus:outline-none focus:ring-2 focus:ring-white/15"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-[12px] text-white/70 mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl bg-black/25 border border-white/10 px-4 py-3 text-white placeholder-white/30
                           focus:outline-none focus:ring-2 focus:ring-white/15"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="rounded-xl border border-white/10 bg-black/25 p-3">
                <p className="text-white/75 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-white text-black font-semibold py-3 px-4 transition
                         hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Connexion…" : "Accéder"}
            </button>

            <div className="pt-4 border-t border-white/10 text-center">
              <p className="text-xs text-white/45">
                Détection et analyse précoce du marché.
              </p>
              <div className="mt-3 text-xs text-white/45">
                <Link href="/pricing" className="hover:text-white/70 transition">
                  Voir les tarifs
                </Link>
              </div>
            </div>
          </form>
        </div>

        {/* Small hint */}
        <div className="mt-6 text-center text-xs text-white/35">
          oracle.x10commerce.com — Intelligence, pas opinions.
        </div>
      </div>
    </div>
  );
}
