import { Lock } from 'lucide-react';
import { usePro } from '../hooks/usePro';

export default function ProGate({ children, navigateTo }) {
  const { isPro } = usePro();

  if (isPro) return <>{children}</>;

  return (
    <div className="relative">
      {/* Blurred content underneath */}
      <div className="pointer-events-none select-none blur-sm opacity-40">
        {children}
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 rounded-xl z-10">
        <div className="bg-gray-800 border border-amber-500/50 rounded-2xl p-8 text-center max-w-xs mx-auto shadow-2xl">
          <div className="w-14 h-14 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-amber-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Pro Feature</h3>
          <p className="text-gray-400 text-sm mb-6">Upgrade to Pro to unlock this content and all lessons, features, and tools.</p>
          <button
            onClick={() => navigateTo && navigateTo('pricing')}
            className="w-full bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Upgrade to Pro →
          </button>
        </div>
      </div>
    </div>
  );
}
