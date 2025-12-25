// API Client pour Oracle X10 - Version propre et cohérente

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
  oracle_score: number;
  oracle_score_breakdown: string;
  lifecycle_phase: string;
  created_at: string;
  updated_at: string;
}

export interface OracleRawProduct {
  id: string;
  title: string;
  category: string;
  listingText: string;
}

// Mock data
const MOCK_PRODUCTS: ProductRaw[] = [
  {
    id: 1,
    product_id: "p-001",
    product_name: "Kit accessoires picnic",
    category: "lifestyle",
    niche: "outdoor",
    video_url: "https://example.com/video1.mp4",
    thumbnail_url: "🧺",
    views: 2700000,
    likes: 396000,
    oracle_score: 68.5,
    oracle_score_breakdown: '{"traction": 75, "market": 62}',
    lifecycle_phase: "growth",
    created_at: "2024-12-01",
    updated_at: "2024-12-23"
  },
  {
    id: 2,
    product_id: "p-002", 
    product_name: "Cat Brush",
    category: "Pet Care",
    niche: "pets",
    video_url: "https://example.com/video2.mp4",
    thumbnail_url: "🐱",
    views: 1800000,
    likes: 280000,
    oracle_score: 61.5,
    oracle_score_breakdown: '{"traction": 65, "market": 58}',
    lifecycle_phase: "early",
    created_at: "2024-12-02",
    updated_at: "2024-12-23"
  },
  {
    id: 3,
    product_id: "p-003",
    product_name: "Produit soin RiteAid",
    category: "beauté et soins",
    niche: "health",
    video_url: "https://example.com/video3.mp4",
    thumbnail_url: "🧴",
    views: 2100000,
    likes: 380000,
    oracle_score: 60.5,
    oracle_score_breakdown: '{"traction": 60, "market": 61}',
    lifecycle_phase: "growth",
    created_at: "2024-12-03",
    updated_at: "2024-12-23"
  }
];

export const apiClient = {
  async getStats(): Promise<ApiStats> {
    return {
      total_products: 2847,
      high_potential: 143,
      avg_score: 68.5,
      trending: 45
    };
  },

  async getProducts(params: { limit?: number; min_score?: number } = {}): Promise<ProductRaw[]> {
    let filtered = MOCK_PRODUCTS;
    
    if (params.min_score) {
      filtered = filtered.filter(p => p.oracle_score >= params.min_score!);
    }
    
    return filtered.slice(0, params.limit || 10);
  }
};

export const fetchProducts = async (params: { limit?: number; min_score?: number } = {}): Promise<ProductRaw[]> => {
  return apiClient.getProducts(params);
};

export const getProductById = async (id: string): Promise<ProductRaw | null> => {
  const products = await fetchProducts();
  return products.find(p => p.id.toString() === id || p.product_id === id) || null;
};
