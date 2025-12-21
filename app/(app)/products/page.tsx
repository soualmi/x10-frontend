"use client";
import * as React from "react";

// MOCK DATA - Phase 2 = API réelle
const MOCK_PRODUCTS = [
  { 
    id: "prod-001",
    name: "Kit accessoires picnic", 
    score: 68.5, 
    verdict: "TEST", 
    lifecycle: "Saturated", 
    category: "Home & Living",
    reason: "Forte traction, mais marché saturé",
    icon: "🧺",
    price: "€29-€49",
    sources: ["TikTok", "Amazon"]
  },
  { 
    id: "prod-002",
    name: "Cat Brush Premium", 
    score: 61.5, 
    verdict: "TEST", 
    lifecycle: "Early", 
    category: "Pet Care",
    reason: "Signal croissant, faible compétition",
    icon: "🐱",
    price: "€19-€34",
    sources: ["Amazon", "AliExpress"]
  },
  { 
    id: "prod-003",
    name: "Produit de soin visage K-beauty", 
    score: 60.5, 
    verdict: "NO", 
    lifecycle: "Declining", 
    category: "Beauty",
    reason: "Marché saturé, marge faible",
    icon: "💄",
    price: "€24-€39",
    sources: ["Instagram", "TikTok"]
  },
  { 
    id: "prod-004",
    name: "Dispensador de aceite cuisine", 
    score: 52.5, 
    verdict: "TEST", 
    lifecycle: "Early", 
    category: "Kitchen",
    reason: "Engagement solide : signal prometteur",
    icon: "🍳",
    price: "€15-€29",
    sources: ["Amazon", "YouTube"]
  },
  { 
    id: "prod-005",
    name: "Stylo ergonomique premium", 
    score: 51.5, 
    verdict: "TEST", 
    lifecycle: "Mature", 
    category: "Office",
    reason: "Niche stable, potentiel premium",
    icon: "🖊️",
    price: "€34-€59",
    sources: ["Amazon"]
  },
  { 
    id: "prod-006",
    name: "Amazon Finds Collection déco", 
    score: 50.5, 
    verdict: "TEST", 
    lifecycle: "Early", 
    category: "Home",
    reason: "Signal correct : à tester rapidement",
    icon: "📦",
    price: "€39-€69",
    sources: ["Amazon", "Pinterest"]
  },
  { 
    id: "prod-007",
    name: "Cheetos Reaper Edition", 
    score: 49.5, 
    verdict: "NO", 
    lifecycle: "Saturated", 
    category: "Snacks",
    reason: "Tendance virale saturée",
    icon: "🌶️",
    price: "€4-€8",
    sources: ["TikTok"]
  },
  { 
    id: "prod-008",
    name: "Slushie Cup self-freeze", 
    score: 47.5, 
    verdict: "NO", 
    lifecycle: "Unknown", 
    category: "Kitchen",
    reason: "Volume insuffisant pour validation",
    icon: "🥤",
    price: "€19-€29",
    sources: ["TikTok", "Amazon"]
  },
  { 
    id: "prod-009",
    name: "Lampe LED gaming RGB", 
    score: 73.2, 
    verdict: "TEST", 
    lifecycle: "Growth", 
    category: "Tech",
    reason: "Forte demande gaming, faible saturation",
    icon: "💡",
    price: "€44-€79",
    sources: ["Amazon", "YouTube"]
  },
  { 
    id: "prod-010",
    name: "Tapis yoga écologique", 
    score: 66.8, 
    verdict: "TEST", 
    lifecycle: "Early", 
    category: "Fitness",
    reason: "Niche éco-responsable en croissance",
    icon: "🧘",
    price: "€49-€89",
    sources: ["Instagram", "Amazon"]
  },
  { 
    id: "prod-011",
    name: "Organiseur câbles magnétique", 
    score: 58.3, 
    verdict: "TEST", 
    lifecycle: "Early", 
    category: "Tech",
    reason: "Problème réel, solution simple",
    icon: "🔌",
    price: "€12-€24",
    sources: ["Amazon", "AliExpress"]
  },
  { 
    id: "prod-012",
    name: "Snack protéiné tendance", 
    score: 44.2, 
    verdict: "NO", 
    lifecycle: "Saturated", 
    category: "Food",
    reason: "CPM élevé, compétition intense",
    icon: "🍫",
    price: "€3-€6",
    sources: ["Meta", "TikTok"]
  },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [selectedVerdict, setSelectedVerdict] = React.useState<string>("all");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  // Catégories uniques
  const categories = ["all", ...Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)))];

  // Filtrage
  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVerdict = selectedVerdict === "all" || p.verdict === selectedVerdict;
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesVerdict && matchesCategory;
  });

  const counts = {
    all: MOCK_PRODUCTS.length,
    TEST: MOCK_PRODUCTS.filter(p => p.verdict === "TEST").length,
    NO: MOCK_PRODUCTS.filter(p => p.verdict === "NO").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border p-6" style={{ background: 'linear-gradient(135deg, rgb(30, 41, 59), rgb(15, 23, 42))', borderColor: 'rgb(51, 65, 85)' }}>
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔍</div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight">Produits Analysés</h1>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: 'rgb(148, 163, 184)' }}>
              <strong style={{ color: 'rgb(248, 250, 252)' }}>Base de données complète</strong> des produits scannés sur TikTok, Amazon, AliExpress, YouTube, Instagram et Facebook. 
              Chaque produit est évalué avec un <strong style={{ color: 'rgb(212, 165, 116)' }}>Oracle Score</strong>, 
              un <strong style={{ color: 'rgb(74, 222, 128)' }}>verdict</strong> (TEST/NO), 
              et une analyse du <strong style={{ color: 'rgb(96, 165, 250)' }}>lifecycle</strong> pour décider vite.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-md px-2.5 py-1 text-xs font-medium" style={{ background: 'rgba(74, 222, 128, 0.15)', border: '1px solid rgba(74, 222, 128, 0.3)', color: 'rgb(74, 222, 128)' }}>
                Total : {MOCK_PRODUCTS.length} produits
              </span>
              <span className="rounded-md px-2.5 py-1 text-xs font-medium" style={{ background: 'rgba(74, 95, 115, 0.15)', border: '1px solid rgba(74, 95, 115, 0.3)', color: 'rgb(148, 163, 184)' }}>
                Dernière sync : il y a 5 min
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="space-y-4">
        {/* Recherche */}
        <div>
          <input
            type="text"
            placeholder="🔍 Rechercher un produit ou une catégorie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border px-4 py-2.5 text-sm transition-all focus:outline-none"
            style={{ 
              background: 'rgb(30, 41, 59)', 
              borderColor: 'rgb(51, 65, 85)',
              color: 'rgb(248, 250, 252)'
            }}
          />
        </div>

        {/* Filtres verdict */}
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgb(148, 163, 184)' }}>
            Filtrer par Verdict
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedVerdict("all")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${selectedVerdict === "all" ? 'font-semibold' : ''}`}
              style={selectedVerdict === "all"
                ? { background: 'rgba(74, 95, 115, 0.2)', color: 'rgb(212, 165, 116)', border: '1px solid rgba(212, 165, 116, 0.3)' }
                : { background: 'rgba(74, 95, 115, 0.1)', color: 'rgb(148, 163, 184)', border: '1px solid rgba(74, 95, 115, 0.2)' }
              }
            >
              Tous ({counts.all})
            </button>
            <button
              onClick={() => setSelectedVerdict("TEST")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${selectedVerdict === "TEST" ? 'font-semibold' : ''}`}
              style={selectedVerdict === "TEST"
                ? { background: 'rgba(74, 222, 128, 0.2)', color: 'rgb(74, 222, 128)', border: '1px solid rgba(74, 222, 128, 0.3)' }
                : { background: 'rgba(74, 95, 115, 0.1)', color: 'rgb(148, 163, 184)', border: '1px solid rgba(74, 95, 115, 0.2)' }
              }
            >
              ✅ TEST ({counts.TEST})
            </button>
            <button
              onClick={() => setSelectedVerdict("NO")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${selectedVerdict === "NO" ? 'font-semibold' : ''}`}
              style={selectedVerdict === "NO"
                ? { background: 'rgba(239, 68, 68, 0.2)', color: 'rgb(239, 68, 68)', border: '1px solid rgba(239, 68, 68, 0.3)' }
                : { background: 'rgba(74, 95, 115, 0.1)', color: 'rgb(148, 163, 184)', border: '1px solid rgba(74, 95, 115, 0.2)' }
              }
            >
              ❌ NO ({counts.NO})
            </button>
          </div>
        </div>

        {/* Filtres catégorie */}
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgb(148, 163, 184)' }}>
            Filtrer par Catégorie
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${selectedCategory === cat ? 'font-semibold' : ''}`}
                style={selectedCategory === cat
                  ? { background: 'rgba(74, 95, 115, 0.2)', color: 'rgb(212, 165, 116)', border: '1px solid rgba(212, 165, 116, 0.3)' }
                  : { background: 'rgba(74, 95, 115, 0.1)', color: 'rgb(148, 163, 184)', border: '1px solid rgba(74, 95, 115, 0.2)' }
                }
              >
                {cat === "all" ? "Toutes" : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Résultats count */}
      <div className="text-sm" style={{ color: 'rgb(148, 163, 184)' }}>
        {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
      </div>

      {/* Grille produits */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="rounded-xl border p-5 transition-all hover:scale-[1.02] hover:border-blue-500/30 cursor-pointer" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
              {/* Image placeholder */}
              <div className="mb-4 flex h-40 w-full items-center justify-center rounded-lg" style={{ background: 'rgba(15, 23, 42, 0.5)' }}>
                <span className="text-6xl">{product.icon}</span>
              </div>

              {/* Info produit */}
              <div className="space-y-3">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold leading-tight text-sm">{product.name}</h3>
                    <span className={`shrink-0 rounded px-1.5 py-0.5 text-xs font-bold`} style={
                      product.verdict === "TEST" 
                        ? { background: 'rgb(74, 222, 128)', color: 'rgb(15, 23, 42)' }
                        : { background: 'rgb(239, 68, 68)', color: 'white' }
                    }>
                      {product.verdict}
                    </span>
                  </div>
                  <div className="text-xs" style={{ color: 'rgb(148, 163, 184)' }}>
                    {product.category}
                  </div>
                </div>

                {/* Score + Lifecycle */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase" style={{ color: 'rgb(148, 163, 184)' }}>Oracle Score</div>
                    <div className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, rgb(96, 125, 149), rgb(212, 165, 116))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      {product.score}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold uppercase" style={{ color: 'rgb(148, 163, 184)' }}>Lifecycle</div>
                    <div className="text-sm font-semibold">{product.lifecycle}</div>
                  </div>
                </div>

                {/* Prix + Sources */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold" style={{ color: 'rgb(74, 222, 128)' }}>{product.price}</span>
                  <div className="flex gap-1">
                    {product.sources.map(s => (
                      <span key={s} className="rounded px-1.5 py-0.5 text-xs font-medium" style={{ background: 'rgba(74, 95, 115, 0.2)', color: 'rgb(148, 163, 184)' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Raison */}
                <div className="rounded-lg p-3 text-xs leading-relaxed" style={{ background: 'rgba(15, 23, 42, 0.5)', color: 'rgb(148, 163, 184)' }}>
                  {product.reason}
                </div>

                {/* Action */}
                <button className="w-full rounded-lg px-3 py-2 text-sm font-medium transition-all" style={{ background: 'rgba(74, 95, 115, 0.1)', color: 'rgb(203, 213, 225)', border: '1px solid rgba(74, 95, 115, 0.2)' }}>
                  Voir l'analyse →
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // État vide
        <div className="rounded-xl border p-12 text-center" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
          <div className="text-4xl mb-4">🔍</div>
          <div className="text-lg font-semibold mb-2">Aucun produit trouvé</div>
          <div className="text-sm" style={{ color: 'rgb(148, 163, 184)' }}>
            Essayez de modifier vos filtres ou votre recherche
          </div>
        </div>
      )}
    </div>
  );
}
