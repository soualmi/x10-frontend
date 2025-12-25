"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

const MotionGlassCard = motion(GlassCard);

interface ProductWithOracle {
  id: number;
  name: string;
  score: number;
  category: string;
  emoji: string;
  metadata?: {
    friction: number;
    temporalite_anormale: number;
    langage_faible: number;
    desalignement: number;
  };
  decision?: 'GO' | 'TEST' | 'WAIT' | 'KILL';
  reading?: string;
  channels?: string[];
  priceRange?: string;
}

export default function ProductsClient() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = [
    { id: "all", name: "Toutes catégories", count: 2847 },
    { id: "lifestyle", name: "Lifestyle", count: 892 },
    { id: "tech", name: "Tech & Gadgets", count: 534 },
    { id: "fitness", name: "Fitness", count: 423 },
    { id: "beauty", name: "Beauté", count: 387 },
  ];

  // Mock produits enrichis avec Oracle V2
  const mockProducts: ProductWithOracle[] = [
    { 
      id: 1, 
      name: "Kit accessoires picnic", 
      score: 68.5, 
      category: "lifestyle", 
      emoji: "🧺",
      metadata: { friction: 10, temporalite_anormale: 15, langage_faible: 8, desalignement: 25 },
      decision: 'GO',
      reading: "Structure saine, marché en formation. Opportunité à saisir.",
      channels: ['TikTok', 'Instagram'],
      priceRange: '24-29€'
    },
    { 
      id: 2, 
      name: "Cat Brush", 
      score: 61.5, 
      category: "lifestyle", 
      emoji: "🐱",
      metadata: { friction: 20, temporalite_anormale: 12, langage_faible: 15, desalignement: 30 },
      decision: 'TEST',
      reading: "Signaux positifs mais nécessite surveillance.",
      channels: ['Facebook', 'TikTok'],
      priceRange: '19-24€'
    },
    { 
      id: 3, 
      name: "Produit soin RiteAid", 
      score: 60.5, 
      category: "beauty", 
      emoji: "🧴",
      metadata: { friction: 25, temporalite_anormale: 20, langage_faible: 18, desalignement: 35 },
      decision: 'TEST',
      reading: "Marché concurrentiel, tester avec prudence.",
      channels: ['Instagram', 'Pinterest'],
      priceRange: '15-20€'
    },
    { 
      id: 4, 
      name: "Dispensador aceite vinagre", 
      score: 52.5, 
      category: "lifestyle", 
      emoji: "🍽️",
      metadata: { friction: 35, temporalite_anormale: 30, langage_faible: 25, desalignement: 40 },
      decision: 'WAIT',
      reading: "Signaux faibles, attendre évolution marché.",
      channels: ['Facebook'],
      priceRange: '16-22€'
    },
  ];

  const getScoreTone = (score: number) => {
    if (score >= 65) return "text-[#22C55E]"; // HOT
    if (score >= 50) return "text-[#F59E0B]"; // WATCH  
    return "text-[#EF4444]"; // IGNORE
  };

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case 'GO': return '#22C55E';
      case 'TEST': return '#F59E0B';
      case 'WAIT': return '#38BDF8';
      case 'KILL': return '#EF4444';
      default: return '#6D5EF6';
    }
  };

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      {/* Filters */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#6D5EF6]/50"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-[#6D5EF6] text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </motion.section>

      {/* Results */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <div className="text-white/60 text-sm">
            <span className="text-white font-medium">{filteredProducts.length}</span> produits analysés
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredProducts.map((product, index) => (
            <MotionGlassCard
              key={product.id}
              className="p-5 hover:bg-white/[0.055] transition cursor-pointer"
              initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.06 * index }}
              whileHover={{ scale: 1.01, y: -3 }}
            >
              {/* Visual */}
              <div className="w-full h-28 rounded-xl border border-white/10 bg-black/30 flex items-center justify-center mb-4">
                <span className="text-4xl">{product.emoji}</span>
              </div>

              {/* Info */}
              <div className="space-y-3">
                <h3 className="font-semibold text-white text-sm">{product.name}</h3>
                
                <div className="flex items-center justify-between">
                  <span className="text-[11px] tracking-[0.22em] text-white/45">ORACLE SCORE</span>
                  <span className={`font-semibold text-lg ${getScoreTone(product.score)}`}>
                    {product.score}
                  </span>
                </div>

                {/* Métadonnées Oracle V2 */}
                {product.metadata && (
                  <div className="space-y-2">
                    <div className="text-[11px] tracking-[0.18em] text-white/45 mb-2">MÉTADONNÉES</div>
                    {[
                      { label: 'Friction', value: product.metadata.friction },
                      { label: 'Temporalité', value: product.metadata.temporalite_anormale },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-center">
                        <span className="text-[10px] text-white/60">{label}</span>
                        <div className="flex-1 mx-2 h-1 bg-white/8 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-white/20 rounded-full transition-all duration-500"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-white/60 w-8 text-right">{value}%</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Oracle Reading */}
                {product.reading && (
                  <div className="p-3 rounded-lg border border-white/8" style={{ background: 'rgba(0,0,0,0.18)' }}>
                    <p className="text-[11px] text-white/80 leading-relaxed">{product.reading}</p>
                  </div>
                )}

                {/* Décision & Guidage */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.18em] text-white/45">DÉCISION</span>
                    <div 
                      className="px-2 py-1 rounded text-[10px] font-medium"
                      style={{ 
                        backgroundColor: `${getDecisionColor(product.decision!)}20`,
                        color: getDecisionColor(product.decision!)
                      }}
                    >
                      {product.decision}
                    </div>
                  </div>
                  
                  {product.channels && (
                    <div className="text-[10px] text-white/60">
                      <span className="text-white/45">Canaux: </span>
                      {product.channels.join(', ')}
                    </div>
                  )}
                  
                  {product.priceRange && (
                    <div className="text-[10px] text-white/60">
                      <span className="text-white/45">Prix: </span>
                      {product.priceRange}
                    </div>
                  )}
                </div>
              </div>
            </MotionGlassCard>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
