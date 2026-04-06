import React from 'react';
import { Lock } from 'lucide-react';

export default function ProGate({ isPro, navigate, featureName, description, children }) {
  if (isPro) return children;

  return (
    <div className="relative">
      {/* Blurred preview */}
      <div className="pointer-events-none select-none blur-sm opacity-40">
        {children}
      </div>
      {/* Lock overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#12122a]/80 rounded-xl z-10">
        <div className="bg-[#1e1e3a] border border-amber-500/30 rounded-2xl p-8 flex flex-col items-center gap-4 max-w-sm mx-auto text-center shadow-2xl">
          <div className="bg-amber-500/10 rounded-full p-4">
            <Lock className="w-10 h-10 text-amber-400" />
          </div>
          <span className="text-xs font-bold tracking-widest text-amber-400 uppercase bg-amber-500/10 px-3 py-1 rounded-full">Pro Feature</span>
          <h3 className="text-xl font-bold text-white">{featureName}</h3>
          <p className="text-slate-400 text-sm">{description}</p>
          <button
            onClick={() => navigate('pricing')}
            className="mt-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3 rounded-xl transition-all duration-200 flex items-center gap-2"
          >
            Unlock with Pro →
          </button>
        </div>
      </div>
    </div>
  );
}
