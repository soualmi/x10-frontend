import type { OracleRawProduct } from './api';

export interface OracleSecretMetadata {
  friction: number;
  temporalite_anormale: number;
  langage_faible: number;
  desalignement: number;
}

export function calculateSecretMetadata(product: OracleRawProduct): OracleSecretMetadata {
  // Friction - mots-clés de résistance
  const frictionKeywords = ['compatible?', 'nettoyage?', 'difficile', 'problème'];
  const friction = Math.min(100, frictionKeywords.filter(k => 
    product.listingText.toLowerCase().includes(k)).length * 25);
  
  // Temporalité anormale - urgence artificielle
  const urgencyPattern = /(?:limité|urgent|derniers?|rapidement)/gi;
  const temporalite_anormale = Math.min(100, (product.listingText.match(urgencyPattern) || []).length * 30);
  
  // Langage faible - mots vagues
  const weakWords = ['facile', 'simple', 'pratique', 'génial'];
  const langage_faible = Math.min(100, weakWords.filter(w => 
    product.listingText.toLowerCase().includes(w)).length * 20);
  
  // Désalignement - cohérence titre/description
  const titleWords = product.title.toLowerCase().split(' ');
  const descWords = product.listingText.toLowerCase().split(' ');
  const commonWords = titleWords.filter(w => descWords.includes(w));
  const desalignement = Math.max(0, 100 - (commonWords.length / titleWords.length) * 100);
  
  return { friction, temporalite_anormale, langage_faible, desalignement };
}

export function analyzeWithOracle(product: OracleRawProduct): {
  score: number;
  status: 'hot' | 'watch' | 'ignore';
  window: 'courte' | 'moyenne' | 'longue';
  reading: string;
  tags: string[];
} {
  const metadata = calculateSecretMetadata(product);
  const score = Math.random() * 100; // Algorithme simple pour l'instant
  
  let status: 'hot' | 'watch' | 'ignore' = 'ignore';
  if (score >= 75) status = 'hot';
  else if (score >= 50) status = 'watch';
  
  let window: 'courte' | 'moyenne' | 'longue' = 'longue';
  if (score >= 75) window = 'courte';
  else if (score >= 50) window = 'moyenne';
  
  // Générer lecture intelligente basée sur métadonnées
  let reading = "Signal identifié, mais exploitabilité limitée pour l'instant.";
  if (metadata.friction > 50) {
    reading = "Signal faible, mais friction visible : à reconsidérer si l'usage se stabilise.";
  }
  if (metadata.temporalite_anormale > 60) {
    reading = "Pic temporel détecté. Fenêtre d'opportunité potentielle.";
  }
  
  // Tags basés sur métadonnées
  const tags: string[] = [];
  if (metadata.langage_faible > 40) tags.push("Sémantique instable");
  if (metadata.friction > 30) tags.push("Compatibilité", "Nettoyage");
  if (metadata.temporalite_anormale > 40) tags.push("Urgence artificielle");
  
  return { score, status, window, reading, tags };
}
