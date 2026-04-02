import { useState } from 'react';
import { Check, Lock } from 'lucide-react';
import { usePro } from '../hooks/usePro';

const FREE_FEATURES = [
  'First 3 lessons per instrument',
  'Basic chord library',
  'Practice tracker',
  'Fretboard visualizer',
  'Circle of Fifths',
];

const PRO_FEATURES = [
  'All 18 lessons (6 per instrument)',
  'Full chord library',
  'Advanced ear training',
  'Unlimited practice logging',
  'Song library access',
  'Artist profiles',
  'Achievement badges',
  'Priority support',
];

export default function Pricing() {
  const [billing, setBilling] = useState('monthly');
  const [unlocked, setUnlocked] = useState(false);
  const { isPro, setPro } = usePro();

  const handleUnlock = () => {
    setPro(true);
    setUnlocked(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-display font-bold text-amber-400 mb-2 text-center">Choose Your Plan</h1>
      <p className="text-gray-400 text-center mb-8">Unlock every lesson, chord, and feature with Pro</p>

      {/* Billing toggle */}
      <div className="flex justify-center mb-10">
        <div className="bg-gray-800 rounded-full p-1 flex gap-1">
          <button
            onClick={() => setBilling('monthly')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${billing === 'monthly' ? 'bg-amber-500 text-gray-900' : 'text-gray-400 hover:text-white'}`}
          >Monthly</button>
          <button
            onClick={() => setBilling('annual')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${billing === 'annual' ? 'bg-amber-500 text-gray-900' : 'text-gray-400 hover:text-white'}`}
          >Annual <span className="text-xs text-green-400 font-bold">Save 33%</span></button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-xl font-display font-bold text-white mb-1">Free</h2>
          <p className="text-4xl font-bold text-white mb-6">$0</p>
          <ul className="space-y-3 mb-8">
            {FREE_FEATURES.map(f => (
              <li key={f} className="flex items-center gap-2 text-gray-300 text-sm">
                <Check size={16} className="text-amber-400 flex-shrink-0" /> {f}
              </li>
            ))}
          </ul>
          {isPro ? (
            <div className="text-center text-gray-500 text-sm py-3">You're on Pro</div>
          ) : (
            <div className="text-center text-amber-400 font-semibold py-3 border border-amber-500/30 rounded-lg">Current Plan</div>
          )}
        </div>

        {/* Pro Plan */}
        <div className="bg-gray-800 rounded-2xl p-8 border-2 border-amber-500 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-gray-900 text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</div>
          <h2 className="text-xl font-display font-bold text-amber-400 mb-1">Pro</h2>
          <p className="text-4xl font-bold text-white mb-1">
            {billing === 'monthly' ? '$9.99' : '$79.99'}
            <span className="text-base font-normal text-gray-400">/{billing === 'monthly' ? 'mo' : 'yr'}</span>
          </p>
          {billing === 'annual' && <p className="text-green-400 text-sm mb-4">Save $39.89 vs monthly</p>}
          <ul className="space-y-3 mb-8">
            {PRO_FEATURES.map(f => (
              <li key={f} className="flex items-center gap-2 text-gray-300 text-sm">
                <Check size={16} className="text-amber-400 flex-shrink-0" /> {f}
              </li>
            ))}
          </ul>

          {isPro ? (
            <div className="text-center text-amber-400 font-semibold py-3 border border-amber-500 rounded-lg">✓ Pro Active</div>
          ) : (
            <>
              {/* PayPal Monthly Form */}
              {billing === 'monthly' && (
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                  <input type="hidden" name="cmd" value="_xclick-subscriptions" />
                  <input type="hidden" name="business" value="corrickdean8@gmail.com" />
                  <input type="hidden" name="lc" value="US" />
                  <input type="hidden" name="item_name" value="Music Madness Pro - Monthly" />
                  <input type="hidden" name="no_note" value="1" />
                  <input type="hidden" name="src" value="1" />
                  <input type="hidden" name="a3" value="9.99" />
                  <input type="hidden" name="p3" value="1" />
                  <input type="hidden" name="t3" value="M" />
                  <input type="hidden" name="currency_code" value="USD" />
                  <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors">
                    Subscribe Monthly — $9.99/mo
                  </button>
                </form>
              )}

              {/* PayPal Annual Form */}
              {billing === 'annual' && (
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                  <input type="hidden" name="cmd" value="_xclick-subscriptions" />
                  <input type="hidden" name="business" value="corrickdean8@gmail.com" />
                  <input type="hidden" name="lc" value="US" />
                  <input type="hidden" name="item_name" value="Music Madness Pro - Annual" />
                  <input type="hidden" name="no_note" value="1" />
                  <input type="hidden" name="src" value="1" />
                  <input type="hidden" name="a3" value="79.99" />
                  <input type="hidden" name="p3" value="1" />
                  <input type="hidden" name="t3" value="Y" />
                  <input type="hidden" name="currency_code" value="USD" />
                  <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors">
                    Subscribe Annually — $79.99/yr
                  </button>
                </form>
              )}

              {/* Unlock Pro after PayPal checkout */}
              <div className="mt-4">
                {unlocked ? (
                  <div className="text-center text-green-400 text-sm font-semibold py-2">🎉 Pro access unlocked!</div>
                ) : (
                  <button
                    onClick={handleUnlock}
                    className="w-full border border-amber-500 text-amber-400 hover:bg-amber-500/10 font-semibold py-3 px-6 rounded-lg transition-colors text-sm"
                  >
                    I've subscribed — Unlock Pro Access
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
