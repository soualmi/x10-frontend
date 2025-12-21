export function InsufficientSignal() {
  return (
    <div className="rounded-xl border p-12 text-center" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
      <div className="text-5xl mb-4">📡</div>
      <h3 className="text-lg font-semibold mb-2">Signal insuffisant pour agir</h3>
      <p className="text-sm max-w-md mx-auto leading-relaxed" style={{ color: 'rgb(148, 163, 184)' }}>
        Les données collectées ne permettent pas encore de recommandation fiable. 
        Oracle continue la surveillance et vous alertera quand le signal sera confirmé.
      </p>
      <div className="mt-6 rounded-lg p-4 max-w-sm mx-auto" style={{ background: 'rgba(74, 95, 115, 0.1)', border: '1px solid rgba(74, 95, 115, 0.2)' }}>
        <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'rgb(148, 163, 184)' }}>
          Critères Oracle
        </div>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: 'rgb(251, 191, 36)' }} />
            <span style={{ color: 'rgb(203, 213, 225)' }}>Volume de signal : En cours</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: 'rgb(251, 191, 36)' }} />
            <span style={{ color: 'rgb(203, 213, 225)' }}>Confirmation multi-sources : Partielle</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: 'rgb(148, 163, 184)' }} />
            <span style={{ color: 'rgb(203, 213, 225)' }}>Stabilité tendance : Insuffisante</span>
          </div>
        </div>
      </div>
    </div>
  );
}
