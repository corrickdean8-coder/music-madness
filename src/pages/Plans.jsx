import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Check, Star } from 'lucide-react';

const freeFeatures = [
  'First 3 lessons per instrument (9 total)',
  'Basic chord library',
  'Interactive fretboard visualizer',
  'Circle of Fifths explorer',
  'Practice tracker',
  'XP and leveling system',
];

const proFeatures = [
  'All 18 lessons (Guitar, Banjo, Mandolin)',
  'Full chord library with audio',
  'Ear training exercises',
  'All scale modes and advanced fretboard',
  'Song library (15 folk/bluegrass songs)',
  'Artist profiles and history',
  'Priority support',
  'Everything in Free',
];

export default function Plans() {
  const { isPro, setIsPro } = useApp();
  const [billing, setBilling] = useState('monthly');
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>Choose Your Plan</h2>
      <p className="text-gray-400 mb-6 text-center">Unlock the full Music Madness experience with Pro.</p>
      <div className="flex justify-center mb-8">
        <div className="flex bg-gray-800 rounded-lg p-1">
          <button onClick={()=>setBilling('monthly')} className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${billing==='monthly'?'bg-amber-400 text-gray-900':'text-gray-400 hover:text-white'}`}>Monthly</button>
          <button onClick={()=>setBilling('annual')} className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${billing==='annual'?'bg-amber-400 text-gray-900':'text-gray-400 hover:text-white'}`}>Annual <span className="text-xs font-bold ml-1">Save 33%</span></button>
        </div>
      </div>
      {isPro && (
        <div className="mb-6 bg-amber-400/10 border border-amber-400/40 rounded-xl p-4 text-center">
          <Star className="inline text-amber-400 mr-2" size={18} />
          <span className="text-amber-300 font-semibold">You have Pro access! All features are unlocked.</span>
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-1">Free</h3>
          <div className="text-3xl font-bold text-gray-300 mb-4">$0<span className="text-sm font-normal text-gray-500">/forever</span></div>
          <ul className="space-y-2 mb-6">
            {freeFeatures.map(f=>(
              <li key={f} className="flex items-start gap-2 text-sm text-gray-300"><Check size={16} className="text-green-400 mt-0.5 flex-shrink-0" />{f}</li>
            ))}
          </ul>
          <button className="w-full bg-gray-700 text-gray-300 font-semibold py-3 rounded-xl" disabled>Current Plan</button>
        </div>
        <div className="bg-gray-800 border-2 border-amber-400 rounded-2xl p-6 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>
          <h3 className="text-xl font-bold text-white mb-1">Pro</h3>
          <div className="text-3xl font-bold text-amber-400 mb-1">{billing==='monthly'?'$9.99':'$6.67'}<span className="text-sm font-normal text-gray-400">/mo</span></div>
          {billing==='annual'&&<div className="text-sm text-gray-400 mb-3">Billed as $79.99/year</div>}
          <ul className="space-y-2 mb-6 mt-4">
            {proFeatures.map(f=>(
              <li key={f} className="flex items-start gap-2 text-sm text-gray-300"><Check size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />{f}</li>
            ))}
          </ul>
          {!isPro && (
            <>
              {billing==='monthly'?(
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" className="mb-3">
                  <input type="hidden" name="cmd" value="_xclick-subscriptions" />
                  <input type="hidden" name="business" value="corrickdean8@gmail.com" />
                  <input type="hidden" name="item_name" value="Music Madness Pro Monthly" />
                  <input type="hidden" name="a3" value="9.99" />
                  <input type="hidden" name="p3" value="1" />
                  <input type="hidden" name="t3" value="M" />
                  <input type="hidden" name="src" value="1" />
                  <input type="hidden" name="sra" value="1" />
                  <input type="hidden" name="currency_code" value="USD" />
                  <button type="submit" className="w-full bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold py-3 rounded-xl transition-colors">Subscribe Monthly — $9.99/mo</button>
                </form>
              ):(
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" className="mb-3">
                  <input type="hidden" name="cmd" value="_xclick-subscriptions" />
                  <input type="hidden" name="business" value="corrickdean8@gmail.com" />
                  <input type="hidden" name="item_name" value="Music Madness Pro Annual" />
                  <input type="hidden" name="a3" value="79.99" />
                  <input type="hidden" name="p3" value="1" />
                  <input type="hidden" name="t3" value="Y" />
                  <input type="hidden" name="src" value="1" />
                  <input type="hidden" name="sra" value="1" />
                  <input type="hidden" name="currency_code" value="USD" />
                  <button type="submit" className="w-full bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold py-3 rounded-xl transition-colors">Subscribe Annually — $79.99/yr (Save 33%)</button>
                </form>
              )}
              <button onClick={()=>setIsPro(true)} className="w-full text-sm text-amber-400 hover:text-amber-300 underline py-2">I have subscribed — Unlock Pro access</button>
            </>
          )}
          {isPro&&<div className="w-full bg-green-500/20 border border-green-500/40 text-green-400 font-semibold py-3 rounded-xl text-center">Pro Active</div>}
        </div>
      </div>
    </div>
  );
}
