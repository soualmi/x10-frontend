import * as React from "react";
import {
  AnalysisInProgress,
  MarketCalm,
  NoHotOpportunities,
  DataUnavailable,
  InsufficientSignal
} from "@/components/states";

export default function DemoStatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">États UX - Démo</h1>
        <p className="mt-1 text-sm" style={{ color: 'rgb(148, 163, 184)' }}>
          Tous les états possibles du système Oracle
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold mb-3">1. Analyse en cours</h2>
          <AnalysisInProgress />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">2. Marché calme</h2>
          <MarketCalm />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">3. Aucune opportunité Hot</h2>
          <NoHotOpportunities />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">4. Données indisponibles</h2>
          <DataUnavailable />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">5. Signal insuffisant</h2>
          <InsufficientSignal />
        </div>
      </div>
    </div>
  );
}
