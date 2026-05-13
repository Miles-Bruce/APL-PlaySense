import { NextResponse } from 'next/server';
import { getModel } from '@/lib/gemini';

export async function POST(req: Request) {
  let playerName = 'the player';
  try {
    const clonedReq = req.clone();
    const body = await req.json();
    playerName = body.playerName || playerName;
    const { matchContext } = body;
    const model = getModel();

    const prompt = `You are a cricket trivia host at a live IPL match. Generate 1 multiple-choice 
trivia question about ${playerName} that is relevant to this match context: ${JSON.stringify(matchContext)}. 
The question must be answerable by a passionate fan. 
Return ONLY a JSON object:
{ "question": "string", "options": ["option1", "option2", "option3", "option4"], "correctIndex": number (0-3), "funFact": "string (max 20 words, shown after answer)" }`;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();
    if (text.startsWith('\`\`\`json')) text = text.slice(7);
    if (text.endsWith('\`\`\`')) text = text.slice(0, -3);

    return NextResponse.json(JSON.parse(text));
  } catch (error) {
    console.error('Trivia Agent error:', error);
    // Fallback for demo stability
    return NextResponse.json({
      question: `What is ${playerName}'s highest score?`,
      options: ['183*', '120', '150', '200'],
      correctIndex: 0,
      funFact: 'He is a legend of the game.',
    });
  }
}
