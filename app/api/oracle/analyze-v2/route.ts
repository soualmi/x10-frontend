import { NextRequest, NextResponse } from 'next/server';
import { calculateOracleAnalysis } from '@/lib/oracle';

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();
    
    const analysis = calculateOracleAnalysis({
      id: productData.id,
      title: productData.title,
      category: productData.category,
      listingText: productData.listingText
    });
    
    return NextResponse.json(analysis);
    
  } catch (error) {
    return NextResponse.json({ 
      error: 'Analyse Oracle V2 failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
