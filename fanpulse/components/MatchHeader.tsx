'use client';

import React from 'react';
import { mockMatchContext } from '@/lib/mockData';

export default function MatchHeader() {
  return (
    <div className="w-full bg-[#1A1A2E] border-b border-white/10 px-6 py-4 flex flex-col z-10 shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Live</span>
        </div>
        <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">IPL Match 42</span>
      </div>
      
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-white text-lg font-bold mb-1">CSK vs MI</h2>
          <div className="text-3xl font-mono font-bold text-white tracking-tight">
            {mockMatchContext.score} <span className="text-gray-500 text-lg font-medium">({mockMatchContext.overs} ov)</span>
          </div>
        </div>
        
        <div className="text-right flex flex-col items-end">
          <div className="bg-white/10 px-3 py-1 rounded text-sm text-gray-300 font-medium mb-1">
            Need <span className="text-white font-bold">{mockMatchContext.requiredRuns}</span> off <span className="text-white font-bold">{mockMatchContext.ballsRemaining}</span>
          </div>
          <span className="text-gray-500 text-xs">CRR: 8.1 • RRR: 14.4</span>
        </div>
      </div>
    </div>
  );
}
