'use client';

import { useRouter } from 'next/navigation';

export default function Onboarding() {
  const router = useRouter();

  const handleSelectTeam = (team: string) => {
    localStorage.setItem('fanTeam', team);
    router.push('/match');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
      <div className="mb-16 text-center animate-fade-in">
        <h1 className="text-5xl font-extrabold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#EC4899]">
          FanPulse
        </h1>
        <p className="text-gray-400 text-lg">Feel every moment. Live.</p>
      </div>

      <h2 className="text-xl font-medium text-white mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
        Who are you cheering for?
      </h2>

      <div className="flex flex-col gap-4 w-full animate-fade-in" style={{ animationDelay: '200ms' }}>
        <button
          onClick={() => handleSelectTeam('CSK')}
          className="w-full relative group overflow-hidden rounded-2xl h-32 border-2 border-[#F9A825]/30 hover:border-[#F9A825] transition-all bg-gradient-to-br from-[#1A1A2E] to-[#0D0D0D]"
        >
          <div className="absolute inset-0 bg-[#F9A825] opacity-0 group-hover:opacity-10 transition-opacity" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-[#F9A825]">CSK</span>
          </div>
        </button>

        <button
          onClick={() => handleSelectTeam('MI')}
          className="w-full relative group overflow-hidden rounded-2xl h-32 border-2 border-[#1565C0]/30 hover:border-[#1565C0] transition-all bg-gradient-to-br from-[#1A1A2E] to-[#0D0D0D]"
        >
          <div className="absolute inset-0 bg-[#1565C0] opacity-0 group-hover:opacity-10 transition-opacity" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-[#1565C0]">MI</span>
          </div>
        </button>
      </div>
    </div>
  );
}
