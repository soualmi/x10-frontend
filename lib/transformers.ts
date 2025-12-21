import type { ProductRaw } from './api';

// Parse oracle_score_breakdown (JSON string → object)
export function parseScoreBreakdown(breakdown: string) {
  try {
    return JSON.parse(breakdown);
  } catch {
    return null;
  }
}

// Transformer Product API → Opportunity UI
export function transformProductToOpportunity(product: ProductRaw) {
  const breakdown = parseScoreBreakdown(product.oracle_score_breakdown);
  
  // Déterminer le statut
  let status: 'hot' | 'watch' | 'ignore' = 'ignore';
  if (product.oracle_score >= 70) status = 'hot';
  else if (product.oracle_score >= 55) status = 'watch';
  
  // Calculer fenêtre d'opportunité basée sur lifecycle
  let window = 'n/a';
  if (product.lifecycle_phase === 'early') window = '24-48h';
  else if (product.lifecycle_phase === 'growth') window = '72h';
  else if (product.lifecycle_phase === 'saturated') window = '7-14d';
  
  // Confiance basée sur score
  let confidence: 'high' | 'medium' | 'low' = 'low';
  if (product.oracle_score >= 75) confidence = 'high';
  else if (product.oracle_score >= 60) confidence = 'medium';
  
  return {
    id: `opp-${product.id}`,
    product_id: product.product_id,
    name: product.product_name,
    score: product.oracle_score,
    status,
    category: product.category,
    niche: product.niche,
    sources: ['TikTok'], // Actuellement tout vient de TikTok
    metrics: {
      demand: breakdown?.validation?.details?.likes?.status || 'Moyen',
      competition: breakdown?.competition?.details?.saturation?.value || 'Moyenne',
      margin: 'À calculer', // Pas dans l'API actuellement
      lifecycle: product.lifecycle_phase
    },
    window,
    confidence,
    explanation: generateExplanation(product, breakdown),
    price: 'À définir', // Pas dans l'API
    views: product.views,
    likes: product.likes,
    comments: product.comments,
    shares: product.shares,
    video_url: product.video_url,
    detected_at: product.detected_at
  };
}

// Générer explication basée sur le breakdown
function generateExplanation(product: ProductRaw, breakdown: any): string {
  if (!breakdown) return "Analyse en cours...";
  
  const parts: string[] = [];
  
  // Momentum
  if (breakdown.momentum) {
    const virality = breakdown.momentum.details?.virality;
    if (virality) {
      parts.push(`${virality.status}: ${virality.value}`);
    }
  }
  
  // Validation
  if (breakdown.validation) {
    const likes = breakdown.validation.details?.likes;
    if (likes) {
      parts.push(`${likes.status} (${likes.value} likes)`);
    }
  }
  
  // Competition
  if (breakdown.competition) {
    const saturation = breakdown.competition.details?.saturation;
    if (saturation) {
      parts.push(`Saturation ${saturation.value.toLowerCase()}`);
    }
  }
  
  return parts.join('. ') || "Opportunité détectée sur TikTok";
}

// Calculer métriques Dashboard
export function calculateDashboardMetrics(products: ProductRaw[]) {
  const opportunities = products.map(transformProductToOpportunity);
  
  const hot = opportunities.filter(o => o.status === 'hot').length;
  const watch = opportunities.filter(o => o.status === 'watch').length;
  
  return {
    total_products: products.length,
    opportunities_count: opportunities.length,
    hot_count: hot,
    watch_count: watch,
    avg_score: products.length > 0 
      ? (products.reduce((sum, p) => sum + p.oracle_score, 0) / products.length).toFixed(1)
      : '0',
    sources_active: 1, // TikTok seulement pour l'instant
    signals_detected: products.length * 3, // Approximation
    last_update: '2 min' // Hardcodé pour l'instant
  };
}
