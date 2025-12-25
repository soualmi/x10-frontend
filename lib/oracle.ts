import type { OracleRawProduct } from './api';

export interface OracleSecretMetadata {
  friction: number;
  temporalite_anormale: number;
  langage_faible: number;
  desalignement: number;
}

export interface OracleAnalysis {
  oracleScore: number;
  status: 'hot' | 'watch' | 'ignore';
  window: 'courte' | 'moyenne' | 'longue';
  metadata: OracleSecretMetadata;
  decision: 'GO' | 'TEST' | 'WAIT' | 'KILL';
  reading: string;
}

export function calculateOracleAnalysis(product: OracleRawProduct): OracleAnalysis {
  // 1. FRICTION - Patterns élargis (résistances clients)
  const frictionPatterns = [
    'compatible', 'compatibilité', 'nettoyage', 'difficile', 'problème',
    'compliqué', 'attention', 'risque', 'fragile', 'installation',
    'montage', 'assemblage', 'manuel', 'notice', 'configuration'
  ];
  
  const frictionCount = frictionPatterns.filter(pattern => 
    product.listingText.toLowerCase().includes(pattern)).length;
  const friction = Math.min(100, frictionCount * 15);
  
  // 2. TEMPORALITÉ ANORMALE - Fausse urgence marketing
  const urgencyPatterns = [
    'limité', 'urgent', 'rapidement', 'derniers', 'dernières',
    'maintenant', 'immédiatement', 'bientôt', 'fin', 'expire',
    'stock', 'exemplaires', 'offre spéciale', 'promo'
  ];
  
  const urgencyCount = urgencyPatterns.filter(pattern =>
    product.listingText.toLowerCase().includes(pattern)).length;
  const temporalite_anormale = Math.min(100, urgencyCount * 18);
  
  // 3. LANGAGE FAIBLE - Mots marketing vides
  const weakLanguagePatterns = [
    'facile', 'simple', 'pratique', 'génial', 'fantastique',
    'incroyable', 'révolutionnaire', 'unique', 'parfait',
    'extraordinaire', 'magique', 'miracle', 'sensationnel'
  ];
  
  const weakCount = weakLanguagePatterns.filter(pattern =>
    product.listingText.toLowerCase().includes(pattern)).length;
  const langage_faible = Math.min(100, weakCount * 12);
  
  // 4. DÉSALIGNEMENT - Cohérence titre/description améliorée
  const titleWords = product.title.toLowerCase().split(' ')
    .filter(w => w.length > 3);
  const descWords = product.listingText.toLowerCase().split(' ')
    .filter(w => w.length > 3);
    
  const commonWords = titleWords.filter(w => descWords.includes(w));
  const desalignement = Math.max(0, 
    100 - (commonWords.length / Math.max(titleWords.length, 1)) * 100);
  
  // 5. ORACLE SCORE V2 (formule ChatGPT)
  const qualiteInterne = calculateQualiteInterne({
    friction, temporalite_anormale, langage_faible, desalignement
  });
  
  const signalExterne = 50; // TODO: données plateformes
  const timingMultiplier = 1.0; // TODO: fenêtre temporelle
  
  const oracleScore = (qualiteInterne * 0.45 + signalExterne * 0.35) * timingMultiplier;
  
  // 6. DÉCISION & STATUS
  const { status, window, decision } = determineDecision(oracleScore, {
    friction, temporalite_anormale, langage_faible, desalignement
  });
  
  // 7. ORACLE READING (français)
  const reading = generateOracleReading(status, {
    friction, temporalite_anormale, langage_faible, desalignement
  });
  
  return {
    oracleScore: Math.round(oracleScore * 100) / 100,
    status,
    window,
    metadata: { friction, temporalite_anormale, langage_faible, desalignement },
    decision,
    reading
  };
}

function calculateQualiteInterne(metadata: OracleSecretMetadata): number {
  const score = 100 - (
    metadata.desalignement * 0.30 +
    metadata.friction * 0.25 +
    metadata.langage_faible * 0.25 +
    metadata.temporalite_anormale * 0.20
  );
  return Math.max(0, Math.min(100, score));
}

function determineDecision(score: number, metadata: OracleSecretMetadata) {
  if (score >= 65) return { status: 'hot' as const, window: 'courte' as const, decision: 'GO' as const };
  if (score >= 50) return { status: 'watch' as const, window: 'moyenne' as const, decision: 'TEST' as const };
  return { status: 'ignore' as const, window: 'longue' as const, decision: 'KILL' as const };
}

function generateOracleReading(status: string, metadata: OracleSecretMetadata): string {
  if (status === 'hot') {
    return "Le produit montre des signaux intéressants. La structure semble saine pour un lancement.";
  } else if (status === 'watch') {
    return "Des opportunités émergent, mais le produit nécessite une surveillance avant action.";
  } else {
    return "Le produit présente des signaux faibles. Mieux vaut passer à autre chose.";
  }
}

// Fonction de compatibilité pour transformers.ts
export function analyzeWithOracle(product: OracleRawProduct) {
  const analysis = calculateOracleAnalysis(product);
  
  // Retourner au format attendu par transformers.ts
  return {
    score: analysis.oracleScore,
    status: analysis.status,
    window: analysis.window,
    metadata: analysis.metadata,
    reading: analysis.reading
  };
}
