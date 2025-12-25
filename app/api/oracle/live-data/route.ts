import { NextRequest, NextResponse } from 'next/server';
import { OracleApifyClient } from '@/lib/integrations/apify/client';

export async function POST(request: NextRequest) {
  try {
    const { platform, keyword, limit = 20 } = await request.json();
    
    if (!platform || !keyword) {
      return NextResponse.json({ 
        error: 'Platform and keyword are required' 
      }, { status: 400 });
    }
    
    const oracle = new OracleApifyClient();
    let result;
    
    switch (platform.toLowerCase()) {
      case 'tiktok':
        result = await oracle.scrapeTikTokTrends(keyword, limit);
        break;
      case 'amazon':
        result = await oracle.scrapeAmazonProducts(keyword, limit);
        break;
      case 'aliexpress':
        result = await oracle.scrapeAliExpressProducts(keyword, limit);
        break;
      default:
        return NextResponse.json({ 
          error: 'Platform not supported. Use: tiktok, amazon, aliexpress' 
        }, { status: 400 });
    }
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Oracle live data error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
