export function DataUnavailable() {
  return (
    <div className="rounded-xl border p-12 text-center" style={{ background: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
      <div className="text-5xl mb-4">⚠️</div>
      <h3 className="text-lg font-semibold mb-2">Données temporairement indisponibles</h3>
      <p className="text-sm max-w-md mx-auto leading-relaxed mb-4" style={{ color: 'rgb(148, 163, 184)' }}>
        Oracle ne peut pas accéder aux données en ce moment. 
        Cela peut être dû à une maintenance ou un problème technique.
      </p>
      <div className="space-y-2 text-xs max-w-sm mx-auto mb-6" style={{ color: 'rgb(148, 163, 184)' }}>
        <div className="flex items-center justify-between rounded-lg p-3" style={{ background: 'rgba(30, 41, 59, 0.5)' }}>
          <span>Sources API</span>
          <span className="font-medium" style={{ color: 'rgb(239, 68, 68)' }}>Erreur</span>
        </div>
        <div className="flex items-center justify-between rounded-lg p-3" style={{ background: 'rgba(30, 41, 59, 0.5)' }}>
          <span>Base de données</span>
          <span className="font-medium" style={{ color: 'rgb(251, 191, 36)' }}>Vérification</span>
        </div>
      </div>
      <button className="rounded-lg px-6 py-2.5 text-sm font-semibold transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, rgb(74, 95, 115), rgb(96, 125, 149))', color: 'white' }}>
        🔄 Réessayer
      </button>
    </div>
  );
}
