'use client';

import React, { useState } from 'react';
import { Interaction } from '@/types';
import { submitVote } from '@/lib/firebase';
import SocialPulse from './SocialPulse';

interface PredictionPollProps {
  interaction: Interaction;
}

export default function PredictionPoll({ interaction }: PredictionPollProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleVote = async (option: string) => {
    if (selectedOption) return; // Cannot change vote
    setSelectedOption(option);
    
    // Get fanTeam from localStorage if available
    const fanTeam = typeof window !== 'undefined' ? localStorage.getItem('fanTeam') || 'Neutral' : 'Neutral';
    
    await submitVote(interaction.id, option, fanTeam);
  };

  return (
    <div className="flex flex-col animate-fade-in mt-4">
      <h3 className="text-xl font-bold text-white mb-6 text-center">{interaction.question}</h3>
      
      {!selectedOption ? (
        <div className="grid grid-cols-2 gap-3">
          {interaction.options?.map((option) => (
            <button
              key={option}
              onClick={() => handleVote(option)}
              className="bg-white/10 hover:bg-white/20 active:bg-[#7C3AED] transition-colors py-3 px-4 rounded-lg text-white font-medium border border-white/10 hover:border-white/30"
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <SocialPulse interactionId={interaction.id} />
      )}
    </div>
  );
}
