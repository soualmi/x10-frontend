import { ApifyClient } from 'apify-client';

export class OracleApifyClient {
  private client: ApifyClient;
  
  constructor() {
    const token = process.env.APIFY_TOKEN;
    if (!token) {
      throw new Error('APIFY_TOKEN environment variable is required');
    }
    this.client = new ApifyClient({ token });
  }
  
  // TikTok Trending Products
  async scrapeTikTokTrends(hashtag: string, limit = 20) {
    try {
      const run = await this.client.actor('clockworks/free-tiktok-scraper').call({
        hashtags: [hashtag],
        resultsLimit: limit
      });
      
      const dataset = await this.client.dataset(run.defaultDatasetId).listItems();
      return {
        success: true,
        data: dataset.items,
        platform: 'tiktok',
        source: hashtag
      };
    } catch (error) {
      console.error('TikTok scraping error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
  
  // Amazon Products  
  async scrapeAmazonProducts(keyword: string, limit = 15) {
    try {
      const run = await this.client.actor('misceres/amazon-scraper').call({
        searchKeywords: keyword,
        maxItems: limit,
        countryCode: 'FR'
      });
      
      const dataset = await this.client.dataset(run.defaultDatasetId).listItems();
      return {
        success: true,
        data: dataset.items,
        platform: 'amazon',
        source: keyword
      };
    } catch (error) {
      console.error('Amazon scraping error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
  
  // AliExpress Dropshipping
  async scrapeAliExpressProducts(keyword: string, limit = 25) {
    try {
      const run = await this.client.actor('dtrungtin/aliexpress-scraper').call({
        searchKeyword: keyword,
        maxItems: limit
      });
      
      const dataset = await this.client.dataset(run.defaultDatasetId).listItems();
      return {
        success: true,
        data: dataset.items,
        platform: 'aliexpress',
        source: keyword
      };
    } catch (error) {
      console.error('AliExpress scraping error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}
