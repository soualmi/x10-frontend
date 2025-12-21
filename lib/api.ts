// API Client pour Oracle X10
const API_BASE_URL = 'https://api.x10commerce.com';

export interface ApiStats {
  total_products: number;
  high_potential: number;
  avg_score: number;
  trending: number;
}

export interface ProductRaw {
  id: number;
  product_id: string;
  product_name: string;
  category: string;
  niche: string;
  video_url: string;
  thumbnail_url: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  engagement_rate: number;
  oracle_score: number;
  oracle_score_breakdown: string;
  lifecycle_phase: string;
  intent_score: number;
  trend_score: number;
  creative_intelligence: string;
  test_pack: string;
  detected_at: string;
}

// GET /api/stats
export async function fetchStats(): Promise<ApiStats> {
  const res = await fetch(`${API_BASE_URL}/api/stats`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error(`Stats API error: ${res.status}`);
  }
  
  return res.json();
}

// GET /api/products
export async function fetchProducts(params?: {
  limit?: number;
  min_score?: number;
}): Promise<ProductRaw[]> {
  const url = new URL(`${API_BASE_URL}/api/products`);
  
  if (params?.limit) url.searchParams.set('limit', params.limit.toString());
  if (params?.min_score) url.searchParams.set('min_score', params.min_score.toString());
  
  const res = await fetch(url.toString(), {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error(`Products API error: ${res.status}`);
  }
  
  return res.json();
}

// GET /api/products/{id}/aliexpress
export async function fetchProductAliexpress(productId: string) {
  const res = await fetch(`${API_BASE_URL}/api/products/${productId}/aliexpress`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error(`AliExpress API error: ${res.status}`);
  }
  
  return res.json();
}

// GET /api/products/{id}/trends
export async function fetchProductTrends(productId: string) {
  const res = await fetch(`${API_BASE_URL}/api/products/${productId}/trends`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error(`Trends API error: ${res.status}`);
  }
  
  return res.json();
}

// GET /api/products/{id}/lifecycle
export async function fetchProductLifecycle(productId: string) {
  const res = await fetch(`${API_BASE_URL}/api/products/${productId}/lifecycle`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error(`Lifecycle API error: ${res.status}`);
  }
  
  return res.json();
}
