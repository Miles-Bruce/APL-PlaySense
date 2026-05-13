'use client';

import React, { useState } from 'react';
import { mockEvents } from '@/lib/mockData';
import { MatchEvent } from '@/types';

interface MomentTriggerProps {
  onTrigger: (event: MatchEvent) => void;
  isLoading: boolean;
}

export default function MomentTrigger({ onTrigger, isLoading }: MomentTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const triggerButtons = [
    { type: 'WICKET', label: '⚡ Wicket' },
    { type: 'SIX', label: '💥 Six' },
    { type: 'FOUR', label: '4️⃣ Four' },
    { type: 'CENTURY_APPROACHING', label: '💯 100 Alert' },
    { type: 'LAST_OVER', label: '🔔 Last Over' },
    { type: 'PARTNERSHIP_MILESTONE', label: '🤝 Partnership' },
    { type: 'MATCH_TIED', label: '⚖️ Tied' },
  ];

  const handleTrigger = (type: string) => {
    const event = mockEvents.find(e => e.momentType === type);
    if (event) {
      onTrigger(event);
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full max-w-[430px] mx-auto right-0 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#1A1A2E] border-t border-white/10 py-3 text-xs text-gray-400 font-medium tracking-widest uppercase flex justify-center items-center hover:bg-white/5 transition-colors"
      >
        {isOpen ? 'Close Demo Trigger' : 'Demo Trigger Panel'}
      </button>

      {isOpen && (
        <div className="bg-[#0D0D0D] p-4 border-t border-white/5 grid grid-cols-2 gap-2 pb-8">
          {triggerButtons.map(({ type, label }) => (
            <button
              key={type}
              onClick={() => handleTrigger(type)}
              disabled={isLoading}
              className={`py-3 px-2 rounded bg-white/10 text-white text-sm font-medium border border-white/10 hover:bg-white/20 hover:border-white/30 transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
