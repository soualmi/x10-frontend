export function NoHotOpportunities() {
  return (
    <div className="rounded-xl border p-12 text-center" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
      <div className="text-5xl mb-4">❄️</div>
      <h3 className="text-lg font-semibold mb-2">Aucune opportunité Hot</h3>
      <p className="text-sm max-w-md mx-auto leading-relaxed" style={{ color: 'rgb(148, 163, 184)' }}>
        Les signaux actuels ne justifient pas un test immédiat. 
        Consultez les opportunités en "Surveillance" ou attendez les prochaines analyses.
      </p>
      <div className="mt-6 flex flex-wrap gap-2 justify-center">
        <button className="rounded-lg px-4 py-2 text-sm font-medium transition-all hover:opacity-80" style={{ background: 'rgba(74, 95, 115, 0.1)', color: 'rgb(203, 213, 225)', border: '1px solid rgba(74, 95, 115, 0.2)' }}>
          Voir opportunités "Watch"
        </button>
        <button className="rounded-lg px-4 py-2 text-sm font-medium transition-all hover:opacity-80" style={{ background: 'rgba(74, 95, 115, 0.1)', color: 'rgb(203, 213, 225)', border: '1px solid rgba(74, 95, 115, 0.2)' }}>
          Configurer alertes
        </button>
      </div>
    </div>
  );
}
