'use client';

import React, { useEffect, useState } from 'react';
import { subscribeToResults } from '@/lib/firebase';

interface SocialPulseProps {
  interactionId: string;
}

interface PulseResult {
  option: string;
  count: number;
  percentage: number;
}

export default function SocialPulse({ interactionId }: SocialPulseProps) {
  const [results, setResults] = useState<PulseResult[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    const unsubscribe = subscribeToResults(interactionId, (data) => {
      setResults(data.results);
      setTotalVotes(data.totalVotes);
    });

    return () => unsubscribe();
  }, [interactionId]);

  if (totalVotes === 0) return null;

  return (
    <div className="mt-6 w-full animate-fade-in">
      <h4 className="text-xs text-gray-400 mb-3 text-center uppercase tracking-wider font-semibold">
        Live from {totalVotes} fan{totalVotes !== 1 ? 's' : ''}
      </h4>
      <div className="space-y-2">
        {results.map((result) => (
          <div key={result.option} className="relative h-8 rounded-md overflow-hidden bg-white/5 flex items-center px-3">
            <div 
              className="absolute top-0 left-0 h-full bg-purple-600/40 transition-all duration-500 ease-out"
              style={{ width: `${result.percentage}%` }}
            />
            <div className="relative z-10 w-full flex justify-between items-center text-sm font-medium">
              <span className="text-white drop-shadow-md">{result.option}</span>
              <span className="text-white drop-shadow-md">{result.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
