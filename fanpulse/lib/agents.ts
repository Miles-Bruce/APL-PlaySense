import { MatchEvent, Interaction } from '../types';

export const triggerAgentChain = async (event: MatchEvent): Promise<Interaction | null> => {
  try {
    // Agent 1: Moment Detection
    const momentRes = await fetch('/api/moment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
    
    if (!momentRes.ok) throw new Error('Moment detection failed');
    const momentData = await momentRes.json();

    // Agent 2: Experience Trigger
    const experienceRes = await fetch('/api/experience', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...event,
        momentType: momentData.momentType,
        emotionalWeight: momentData.emotionalWeight,
      }),
    });

    if (!experienceRes.ok) throw new Error('Experience trigger failed');
    const interaction: Interaction = await experienceRes.json();

    // Agent 3: Gemini Trivia (if interaction type is TriviaCard)
    if (interaction.type === 'TriviaCard') {
      const triviaRes = await fetch('/api/gemini/trivia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerName: event.playerName,
          matchContext: event.matchContext,
        }),
      });

      if (triviaRes.ok) {
        const triviaData = await triviaRes.json();
        return { ...interaction, ...triviaData };
      } else {
        // Fallback trivia if API fails
        return {
          ...interaction,
          question: `What is ${event.playerName}'s highest score?`,
          options: ['183*', '120', '150', '200'],
          correctIndex: 0,
          funFact: 'He is a legend of the game.',
        };
      }
    }

    return interaction;
  } catch (error) {
    console.error('Agent chain error:', error);
    return null;
  }
};
