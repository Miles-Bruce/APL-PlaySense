'use client';

import React, { useState } from 'react';
import { Interaction } from '@/types';

interface TriviaCardProps {
  interaction: Interaction;
}

export default function TriviaCard({ interaction }: TriviaCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(index);
  };

  const getButtonClass = (index: number) => {
    if (selectedIndex === null) return 'bg-white/10 hover:bg-white/20 text-white border-white/10';
    
    if (index === interaction.correctIndex) {
      return 'bg-green-600/20 border-green-500 text-green-400';
    }
    
    if (index === selectedIndex && index !== interaction.correctIndex) {
      return 'bg-red-600/20 border-red-500 text-red-400';
    }
    
    return 'bg-white/5 opacity-50 border-transparent text-gray-500';
  };

  return (
    <div className="flex flex-col animate-fade-in mt-2">
      <div className="flex items-center gap-2 mb-4 justify-center">
        <span className="bg-amber-500/20 text-amber-500 text-xs font-bold px-2 py-1 rounded uppercase tracking-widest">
          Trivia Time
        </span>
      </div>
      
      <h3 className="text-lg font-medium text-white mb-6 text-center leading-snug">
        {interaction.question}
      </h3>
      
      <div className="space-y-3">
        {interaction.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={`w-full py-3 px-4 rounded-lg text-sm font-medium border text-left transition-all duration-300 flex justify-between items-center ${getButtonClass(index)}`}
          >
            <span>{String.fromCharCode(65 + index)}. {option}</span>
            {selectedIndex !== null && index === interaction.correctIndex && (
              <span className="text-green-500">✓</span>
            )}
            {selectedIndex === index && index !== interaction.correctIndex && (
              <span className="text-red-500">✕</span>
            )}
          </button>
        ))}
      </div>

      {selectedIndex !== null && interaction.funFact && (
        <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10 animate-fade-in">
          <p className="text-sm text-gray-300">
            <span className="text-amber-500 font-bold mr-2">Did you know?</span>
            {interaction.funFact}
          </p>
        </div>
      )}
    </div>
  );
}
