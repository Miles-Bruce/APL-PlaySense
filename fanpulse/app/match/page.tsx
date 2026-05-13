'use client';

import React, { useState } from 'react';
import MatchHeader from '@/components/MatchHeader';
import MomentTrigger from '@/components/MomentTrigger';
import InteractionCard from '@/components/InteractionCard';
import PredictionPoll from '@/components/PredictionPoll';
import TriviaCard from '@/components/TriviaCard';
import HypeCard from '@/components/HypeCard';
import { MatchEvent, Interaction } from '@/types';
import { triggerAgentChain } from '@/lib/agents';

export default function MatchPage() {
  const [activeInteraction, setActiveInteraction] = useState<Interaction | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrigger = async (event: MatchEvent) => {
    setIsLoading(true);
    setActiveInteraction(null); // Clear existing

    const interaction = await triggerAgentChain(event);
    if (interaction) {
      setActiveInteraction(interaction);
    }
    
    setIsLoading(false);
  };

  const renderInteraction = () => {
    if (!activeInteraction) return null;

    return (
      <InteractionCard 
        key={activeInteraction.id} 
        interaction={activeInteraction} 
        onDismiss={() => setActiveInteraction(null)}
      >
        {activeInteraction.type === 'PredictionPoll' && (
          <PredictionPoll interaction={activeInteraction} />
        )}
        {activeInteraction.type === 'TriviaCard' && (
          <TriviaCard interaction={activeInteraction} />
        )}
        {activeInteraction.type === 'HypeCard' && (
          <HypeCard interaction={activeInteraction} />
        )}
      </InteractionCard>
    );
  };

  return (
    <div className="flex flex-col min-h-screen relative pb-32">
      <MatchHeader />
      
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {!activeInteraction && !isLoading && (
          <div className="text-gray-500 flex flex-col items-center animate-pulse">
            <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-purple-500 animate-spin mb-4" />
            <p>Watching for key moments...</p>
          </div>
        )}
        
        {isLoading && (
          <div className="text-purple-400 flex flex-col items-center animate-pulse">
            <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-pink-500 animate-spin mb-4" />
            <p>Agents analyzing event...</p>
          </div>
        )}

        {renderInteraction()}
      </div>

      <MomentTrigger onTrigger={handleTrigger} isLoading={isLoading} />
    </div>
  );
}
