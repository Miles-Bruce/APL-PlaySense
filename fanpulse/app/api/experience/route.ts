import { NextResponse } from 'next/server';
import { MatchEvent, Interaction } from '@/types';

export async function POST(req: Request) {
  try {
    const data: MatchEvent = await req.json();
    const { momentType, playerName, teamName, matchContext } = data;
    
    // Generate a unique ID for the interaction
    const id = `${momentType.toLowerCase()}_${Date.now()}`;
    
    let interaction: Interaction = {
      id,
      type: 'HypeCard',
      momentType,
      timer: 10,
    };

    switch (momentType) {
      case 'WICKET':
        interaction = {
          id,
          type: 'PredictionPoll',
          momentType,
          question: `What will the next batter's first ball be?`,
          options: ['Dot Ball', 'Single', 'Boundary', 'Wicket'],
          timer: 20,
        };
        break;
      case 'SIX':
        interaction = {
          id,
          type: 'HypeCard',
          momentType,
          hypeText: `MAXIMUM! ${playerName} sends it into orbit! 🚀`,
          emoji: '🚀',
          question: 'Next ball six too?', // Followup poll
          options: ['Yes', 'No'],
          timer: 15,
        };
        break;
      case 'FOUR':
        interaction = {
          id,
          type: 'HypeCard',
          momentType,
          hypeText: `FOUR! Gorgeous shot from ${playerName}!`,
          emoji: '🔥',
          timer: 10,
        };
        break;
      case 'CENTURY_APPROACHING':
        interaction = {
          id,
          type: 'TriviaCard',
          momentType,
          timer: 30,
        };
        break;
      case 'LAST_OVER':
        interaction = {
          id,
          type: 'PredictionPoll',
          momentType,
          question: `How many runs this over?`,
          options: ['1-6', '7-10', '11-14', '15+'],
          timer: 25,
        };
        break;
      case 'PARTNERSHIP_MILESTONE':
        interaction = {
          id,
          type: 'HypeCard',
          momentType,
          hypeText: `Great partnership building for ${teamName}!`,
          emoji: '🤝',
          timer: 12,
        };
        break;
      case 'MATCH_TIED':
        interaction = {
          id,
          type: 'PredictionPoll',
          momentType,
          question: `Who wins the Super Over?`,
          options: ['CSK', 'MI'], // Hardcoded for demo context
          timer: 30,
        };
        break;
    }

    return NextResponse.json(interaction);
  } catch (error) {
    console.error('Experience Agent error:', error);
    return NextResponse.json({ error: 'Failed to trigger experience' }, { status: 500 });
  }
}
