"use client";
import { useEffect, useState } from "react";
import { ProductRaw } from "@/lib/api";
import { apiClient, fetchProducts, ApiStats } from "@/lib/api";
import GlassCard from "@/components/ui/GlassCard";
import { motion } from "framer-motion";

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <GlassCard className="p-4">
      <p className="text-[11px] tracking-[0.18em] text-white/45 mb-2">{label}</p>
      <p className="text-2xl font-semibold text-white">{value}</p>
    </GlassCard>
  );
}

function OracleAnalysisCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassCard className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <p className="text-[13px] text-white/60">{subtitle}</p>
        </div>
        {children}
      </GlassCard>
    </motion.div>
  );
}

function OracleScore({ score, status }: { score: number; status: string }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return '#22C55E';
      case 'watch': return '#F59E0B'; 
      case 'ignore': return '#EF4444';
      default: return '#6D5EF6';
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <div className="text-3xl font-bold" style={{ color: getStatusColor(status) }}>
          {score.toFixed(1)}
        </div>
        <div className="text-[11px] tracking-[0.18em] text-white/45 uppercase">
          Oracle Score
        </div>
      </div>
    </div>
  );
}

export default function DashboardClient() {
  const [stats, setStats] = useState<ApiStats | null>(null);
  const [topProducts, setTopProducts] = useState<ProductRaw[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsData, productsData] = await Promise.all([
          apiClient.getStats(),
          apiClient.getProducts({ limit: 4, min_score: 0 }),
        ]);
        setStats(statsData);
        setTopProducts(productsData);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="text-white/60">Chargement...</div>
    </div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Kpi label="OPPORTUNITÉS" value={stats?.total_products?.toString() || "0"} />
        <Kpi label="SCORE MOYEN" value={stats?.avg_score?.toFixed(1) || "0"} />
        <Kpi label="SIGNAUX ACTIFS" value={topProducts.length.toString()} />
        <Kpi label="ANALYSES" value="127" />
      </div>

      <OracleAnalysisCard title="Analyse Oracle" subtitle="Intelligence prédictive en temps réel">
        <OracleScore score={67.3} status="hot" />
        <div className="mt-4 p-4 rounded-lg border border-white/8" style={{ background: 'rgba(0,0,0,0.18)' }}>
          <p className="text-[13px] text-white/80">Le marché montre des signaux prometteurs avec une structure saine.</p>
        </div>
      </OracleAnalysisCard>
    </div>
  );
}
