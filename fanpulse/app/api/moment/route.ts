import { NextResponse } from 'next/server';
import { getModel } from '@/lib/gemini';
import { MatchEvent } from '@/types';

export async function POST(req: Request) {
  let event: MatchEvent | null = null;
  try {
    const clonedReq = req.clone();
    event = await req.json();
    const model = getModel();

    const prompt = `You are a cricket match analyst. Given this match event: ${JSON.stringify(event)}, 
classify it as one of: WICKET, SIX, FOUR, CENTURY_APPROACHING, LAST_OVER, PARTNERSHIP_MILESTONE, MATCH_TIED.
Return ONLY a JSON object: 
{ "momentType": "string", "emotionalWeight": "HIGH" | "MEDIUM" | "LOW", "summary": "string (max 12 words)" }`;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();
    // Clean up potential markdown formatting
    if (text.startsWith('\`\`\`json')) text = text.slice(7);
    if (text.endsWith('\`\`\`')) text = text.slice(0, -3);
    
    return NextResponse.json(JSON.parse(text));
  } catch (error) {
    console.error('Moment Agent error:', error);
    // Fallback for demo stability
    return NextResponse.json({
      momentType: event?.momentType || 'WICKET',
      emotionalWeight: 'HIGH',
      summary: 'Huge moment in the match!',
    });
  }
}
