"use client";
import * as React from "react";
import { useSettings } from "@/app/settings-context";
import GlassCard from "@/components/ui/GlassCard";

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <GlassCard className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {subtitle ? <p className="mt-2 text-sm text-white/60">{subtitle}</p> : null}
      </div>
      {children}
    </GlassCard>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-lg border border-white/10 bg-black/25 px-2.5 py-1 text-[11px] tracking-[0.16em] text-white/75">
      {children}
    </span>
  );
}

function Button({
  children,
  variant = "ghost",
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  onClick?: () => void;
  className?: string;
}) {
  if (variant === "primary") {
    return (
      <button
        onClick={onClick}
        className={`rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90 ${className}`}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border border-white/12 bg-black/20 px-6 py-3 text-sm font-medium text-white/80 transition hover:bg-white/5 ${className}`}
    >
      {children}
    </button>
  );
}

export default function SettingsClient() {
  const { settings, updateSettings, resetSettings } = useSettings();
  const [localHot, setLocalHot] = React.useState(settings.hotThreshold);
  const [localWatch, setLocalWatch] = React.useState(settings.watchThreshold);
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    setLocalHot(settings.hotThreshold);
    setLocalWatch(settings.watchThreshold);
  }, [settings]);

  const handleSave = () => {
    updateSettings({ hotThreshold: localHot, watchThreshold: localWatch });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    resetSettings();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Estimation demo
  const estimateHot = Math.round(11 * (1 - (localHot - 50) / 50));
  const estimateWatch = Math.round(11 * (1 - (localWatch - 40) / 60)) - estimateHot;
  const safeWatch = estimateWatch > 0 ? estimateWatch : 0;
  const ignored = 11 - estimateHot - safeWatch;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-[11px] tracking-[0.22em] text-white/45">ORACLE // SETTINGS</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">Paramètres</h1>
        <p className="mt-2 text-sm text-white/60">
          Personnalisez les seuils de détection selon votre stratégie.
        </p>
      </div>

      {/* Saved toast */}
      {saved && (
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <span className="text-lg">✓</span>
            <span className="text-sm font-medium text-white/80">
              Paramètres sauvegardés
            </span>
          </div>
        </GlassCard>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Thresholds */}
        <Panel
          title="Seuils de scoring"
          subtitle="Définissez ce qui devient HOT et WATCH."
        >
          <div className="space-y-6">
            {/* HOT */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-semibold text-white/85">Seuil HOT</label>
                <Pill>{localHot}</Pill>
              </div>

              <input
                type="range"
                min="50"
                max="100"
                value={localHot}
                onChange={(e) => setLocalHot(Number(e.target.value))}
                className="w-full accent-white"
              />

              <div className="mt-2 flex justify-between text-xs text-white/45">
                <span>50 (agressif)</span>
                <span>100 (conservateur)</span>
              </div>

              <p className="mt-3 text-xs text-white/55">
                Score <span className="text-white/80 font-semibold">≥ {localHot}</span> → HOT
              </p>
            </div>

            {/* WATCH */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-semibold text-white/85">Seuil WATCH</label>
                <Pill>{localWatch}</Pill>
              </div>

              <input
                type="range"
                min="40"
                max={localHot - 5}
                value={localWatch}
                onChange={(e) => setLocalWatch(Number(e.target.value))}
                className="w-full accent-white"
              />

              <div className="mt-2 flex justify-between text-xs text-white/45">
                <span>40</span>
                <span>{localHot - 5} (max)</span>
              </div>

              <p className="mt-3 text-xs text-white/55">
                Score <span className="text-white/80 font-semibold">≥ {localWatch}</span> et{" "}
                <span className="text-white/80 font-semibold">&lt; {localHot}</span> → WATCH
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="primary" onClick={handleSave} className="flex-1">
              Sauvegarder
            </Button>
            <Button variant="ghost" onClick={handleReset}>
              Réinitialiser
            </Button>
          </div>
        </Panel>

        {/* Right side */}
        <div className="space-y-6">
          <Panel
            title="Estimation"
            subtitle="Basé sur les 11 produits actuels (démo)."
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-4">
                <span className="text-sm font-medium text-white/75">HOT</span>
                <span className="text-lg font-semibold text-white">~{estimateHot}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-4">
                <span className="text-sm font-medium text-white/75">WATCH</span>
                <span className="text-lg font-semibold text-white">~{safeWatch}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-4">
                <span className="text-sm font-medium text-white/60">Ignorées</span>
                <span className="text-lg font-semibold text-white/80">~{ignored}</span>
              </div>
            </div>
          </Panel>

          <Panel title="Recommandations">
            <div className="space-y-3 text-sm text-white/70">
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <div className="text-[11px] tracking-[0.18em] text-white/45">DÉBUTANT</div>
                <div className="mt-2">
                  HOT ≥ <b className="text-white/85">60</b>, WATCH ≥ <b className="text-white/85">45</b>
                </div>
                <div className="mt-2 text-xs text-white/45">Plus d’opportunités pour tester vite.</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <div className="text-[11px] tracking-[0.18em] text-white/45">BUSINESS ÉTABLI</div>
                <div className="mt-2">
                  HOT ≥ <b className="text-white/85">70</b>, WATCH ≥ <b className="text-white/85">55</b>
                </div>
                <div className="mt-2 text-xs text-white/45">Seulement les meilleures opportunités.</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <div className="text-[11px] tracking-[0.18em] text-white/45">AGENCE</div>
                <div className="mt-2">
                  HOT ≥ <b className="text-white/85">75</b>, WATCH ≥ <b className="text-white/85">60</b>
                </div>
                <div className="mt-2 text-xs text-white/45">Qualité maximale pour les clients.</div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
