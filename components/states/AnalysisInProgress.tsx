export function AnalysisInProgress() {
  return (
    <div className="rounded-xl border p-12 text-center" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full animate-pulse" style={{ background: 'rgba(96, 165, 250, 0.1)' }}>
        <div className="text-3xl">🔄</div>
      </div>
      <h3 className="text-lg font-semibold mb-2">Analyse en cours...</h3>
      <p className="text-sm max-w-md mx-auto" style={{ color: 'rgb(148, 163, 184)' }}>
        Oracle scanne les sources et calcule les scores. Les opportunités seront disponibles dans quelques instants.
      </p>
      <div className="mt-6 flex items-center justify-center gap-2">
        <span className="inline-block h-2 w-2 rounded-full animate-bounce" style={{ background: 'rgb(96, 165, 250)', animationDelay: '0ms' }} />
        <span className="inline-block h-2 w-2 rounded-full animate-bounce" style={{ background: 'rgb(96, 165, 250)', animationDelay: '150ms' }} />
        <span className="inline-block h-2 w-2 rounded-full animate-bounce" style={{ background: 'rgb(96, 165, 250)', animationDelay: '300ms' }} />
      </div>
    </div>
  );
}
