import { NextRequest, NextResponse } from 'next/server';
import { calculateOracleAnalysis } from '@/lib/oracle';

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();
    
    // Validation des données
    if (!productData.id || !productData.title || !productData.listingText) {
      return NextResponse.json({ 
        error: 'Missing required fields: id, title, listingText' 
      }, { status: 400 });
    }
    
    // Analyse Oracle V2
    const analysis = calculateOracleAnalysis({
      id: productData.id,
      title: productData.title,
      category: productData.category || 'General',
      listingText: productData.listingText
    });
    
    return NextResponse.json({
      productId: productData.id,
      oracleScore: analysis.oracleScore,
      status: analysis.status,
      window: analysis.window,
      oracleReading: analysis.reading,
      _metadata: analysis.metadata,
      _decision: analysis.decision,
      _prediction_signals: {
        intelligent_analysis: true,
        calibrated_algorithm: true,
        french_guidance: true
      }
    });
    
  } catch (error) {
    console.error('Oracle analyze error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
