'use client';

import React, { useEffect, useState } from 'react';
import { Interaction } from '@/types';

interface InteractionCardProps {
  interaction: Interaction;
  onDismiss: () => void;
  children: React.ReactNode;
}

export default function InteractionCard({ interaction, onDismiss, children }: InteractionCardProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const duration = interaction.timer * 1000;
    const intervalTime = 100;
    const step = (100 / duration) * intervalTime;
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev - step <= 0) {
          clearInterval(interval);
          setTimeout(onDismiss, 500); // slight delay before dismiss
          return 0;
        }
        return prev - step;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [interaction.timer, onDismiss]);

  const borderColors: Record<string, string> = {
    WICKET: 'border-red-500',
    SIX: 'border-purple-500',
    CENTURY_APPROACHING: 'border-amber-500', // Gold
    LAST_OVER: 'border-orange-500',
  };

  const borderColor = borderColors[interaction.momentType] || 'border-pink-500';

  return (
    <div className={`w-full max-w-[400px] bg-[#1A1A2E] rounded-xl border-t-4 ${borderColor} shadow-2xl relative overflow-hidden transition-transform duration-500 translate-y-0`}>
      <div className="absolute top-0 left-0 h-1 bg-white/20 w-full" />
      <div 
        className="absolute top-0 left-0 h-1 bg-white transition-all duration-100 ease-linear"
        style={{ width: `${progress}%` }}
      />
      <button 
        onClick={onDismiss}
        className="absolute top-3 right-3 text-gray-400 hover:text-white"
      >
        ✕
      </button>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
