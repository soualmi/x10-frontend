export async function fetchTrendingProducts(region = 'FR', timeframe = 'now 7-d') {
  try {
    const response = await fetch(`/api/integrations/google-trends?region=${region}&time=${timeframe}`);
    return await response.json();
  } catch (error) {
    console.error('Google Trends API error:', error);
    return [];
  }
}
