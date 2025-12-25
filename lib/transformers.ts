import { analyzeWithOracle } from './oracle';
import type { ProductRaw, OracleRawProduct } from './api';

export type DecisionWindow = 'courte' | 'moyenne' | 'longue';

export interface OpportunityData {
  id: string;
  product_id: string;
  name: string;
  title: string;
  score: number;
  status: 'hot' | 'watch' | 'ignore';
  category: string;
  window: DecisionWindow;
  confidence: 'high' | 'medium' | 'low';
  explanation: string;
  oracleReading: string;
  tags: string[];
}

function parseScoreBreakdown(breakdown: string) {
  try {
    return JSON.parse(breakdown);
  } catch {
    return {};
  }
}

function generateExplanation(product: ProductRaw, breakdown: any): string {
  if (product.oracle_score >= 78) {
    return `Signal forte détecté pour ${product.product_name}. Opportunité immédiate.`;
  } else if (product.oracle_score >= 62) {
    return `Signal modéré pour ${product.product_name}. À surveiller.`;
  }
  return `Signal faible pour ${product.product_name}. Exploitabilité limitée.`;
}

export function transformProductToOpportunity(product: ProductRaw): OpportunityData {
  const breakdown = parseScoreBreakdown(product.oracle_score_breakdown);
  
  let status: 'hot' | 'watch' | 'ignore' = 'ignore';
  if (product.oracle_score >= 78) status = 'hot';
  else if (product.oracle_score >= 62) status = 'watch';
  
  let window: DecisionWindow = 'longue';
  if (product.lifecycle_phase === 'early') window = 'courte';
  else if (product.lifecycle_phase === 'growth') window = 'moyenne';
  else if (product.lifecycle_phase === 'saturated') window = 'longue';
  
  let confidence: 'high' | 'medium' | 'low' = 'low';
  if (product.oracle_score >= 78) confidence = 'high';
  else if (product.oracle_score >= 62) confidence = 'medium';

  const oracleReading = generateExplanation(product, breakdown);
  const tags = breakdown.tags || ["Analyse Oracle"];

  return {
    id: `opp-${String(product.id)}`,
    product_id: product.product_id,
    name: product.product_name,
    title: product.product_name,
    score: product.oracle_score,
    status,
    category: product.category,
    window,
    confidence,
    explanation: oracleReading,
    oracleReading,
    tags
  };
}

export function transformProductsToOpportunities(products: ProductRaw[]): OpportunityData[] {
  return products.map(product => transformProductToOpportunity(product));
}
