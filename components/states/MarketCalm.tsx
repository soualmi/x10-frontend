export function MarketCalm() {
  return (
    <div className="rounded-xl border p-12 text-center" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
      <div className="text-5xl mb-4">🌙</div>
      <h3 className="text-lg font-semibold mb-2">Marché calme</h3>
      <p className="text-sm max-w-md mx-auto leading-relaxed" style={{ color: 'rgb(148, 163, 184)' }}>
        Aucun signal fort détecté actuellement. Les sources sont surveillées en continu. 
        Oracle vous alertera dès qu'une opportunité émergera.
      </p>
      <div className="mt-6 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium" style={{ background: 'rgba(74, 95, 115, 0.1)', border: '1px solid rgba(74, 95, 115, 0.2)', color: 'rgb(148, 163, 184)' }}>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: 'rgb(74, 222, 128)' }} />
          <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: 'rgb(74, 222, 128)' }} />
        </span>
        Surveillance active
      </div>
    </div>
  );
}
