'use client';

import React from 'react';
import { Interaction } from '@/types';
import PredictionPoll from './PredictionPoll';

interface HypeCardProps {
  interaction: Interaction;
}

export default function HypeCard({ interaction }: HypeCardProps) {
  // Highlight the player name in the text if possible, but for simplicity we'll just show it.
  const accentColor = interaction.momentType === 'SIX' ? 'text-purple-400' : 'text-pink-400';

  return (
    <div className="flex flex-col items-center animate-fade-in mt-4 text-center">
      {interaction.emoji && (
        <div className="text-6xl mb-6 animate-bounce">
          {interaction.emoji}
        </div>
      )}
      
      <h3 className={`text-2xl font-bold text-white mb-6 leading-tight`}>
        {interaction.hypeText?.split('!').map((part, i, arr) => (
          <React.Fragment key={i}>
            {part}{i < arr.length - 1 ? '!' : ''}
            {i < arr.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h3>

      {interaction.question && interaction.options && (
        <div className="w-full mt-4 pt-4 border-t border-white/10">
          <PredictionPoll interaction={{ ...interaction, type: 'PredictionPoll' }} />
        </div>
      )}
    </div>
  );
}
