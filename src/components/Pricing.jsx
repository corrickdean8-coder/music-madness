import { useState } from 'react'
import { Check, Crown, Zap, Star } from 'lucide-react'

const FREE_FEATURES = [
  '9 free lessons (3 per instrument)',
  'Fretboard explorer',
  'Chord library with playback',
  'Ear training (intervals & chords)',
  'Circle of Fifths',
  'Practice tracker',
  'Song & artist library',
  'XP & level progression',
]

const PRO_FEATURES = [
  'All 18 lessons unlocked',
  'Advanced technique lessons',
  'Priority support',
  'Future features included',
  'Help support indie development',
]

export default function Pricing({ isPro, unlockPro, showToast, navigate }) {
  const [annual, setAnnual] = useState(false)

  if (isPro) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 space-y-4">
        <Crown className="w-16 h-16 text-amber-400 mx-auto" />
        <h1 className="font-display text-3xl font-bold text-white">You're a Pro! 🎉</h1>
        <p className="text-gray-400">Thank you for supporting Music Madness. All lessons and features are unlocked.</p>
        <button onClick={() => navigate('lessons')} className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-2.5 rounded-lg transition">Browse All Lessons</button>
      </div>
    )
  }

  const price = annual ? '$79.99/yr' : '$9.99/mo'
  const paypalAmount = annual ? '79.99' : '9.99'
  const paypalPeriod = annual ? 'Y' : 'M'

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">Upgrade to Pro</h1>
        <p className="text-gray-400 mt-2">Unlock all lessons and support indie music education</p>
      </div>

      <div className="flex justify-center">
        <div className="flex bg-[#12122a] border border-white/10 rounded-lg p-1">
          <button onClick={() => setAnnual(false)}
            className={`px-4 py-2 rounded text-sm font-medium transition ${!annual ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-white'}`}>
            Monthly
          </button>
          <button onClick={() => setAnnual(true)}
            className={`px-4 py-2 rounded text-sm font-medium transition ${annual ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-white'}`}>
            Annual <span className="text-xs opacity-75">Save 33%</span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Free Card */}
        <div className="bg-[#12122a] border border-white/10 rounded-2xl p-6">
          <h2 className="font-display text-xl font-bold text-white mb-1">Free</h2>
          <p className="text-3xl font-bold text-white mb-1">$0</p>
          <p className="text-sm text-gray-500 mb-6">Forever free</p>
          <ul className="space-y-3">
            {FREE_FEATURES.map(f => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <button onClick={() => navigate('dashboard')}
            className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 rounded-xl transition">
            Current Plan
          </button>
        </div>

        {/* Pro Card */}
        <div className="bg-gradient-to-b from-amber-500/10 to-transparent border-2 border-amber-500/40 rounded-2xl p-6 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1">
            <Zap className="w-3 h-3" /> RECOMMENDED
          </div>
          <h2 className="font-display text-xl font-bold text-white mb-1 flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-400" /> Pro
          </h2>
          <p className="text-3xl font-bold text-white mb-1">{price}</p>
          <p className="text-sm text-gray-500 mb-6">{annual ? 'Billed annually' : 'Billed monthly'}</p>
          <ul className="space-y-3 mb-6">
            {FREE_FEATURES.slice(0, 3).map(f => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                {f}
              </li>
            ))}
            {PRO_FEATURES.map(f => (
              <li key={f} className="flex items-start gap-2 text-sm text-amber-300 font-medium">
                <Star className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" className="mb-3">
            <input type="hidden" name="cmd" value="_xclick-subscriptions" />
            <input type="hidden" name="business" value="corrickdean8@gmail.com" />
            <input type="hidden" name="item_name" value="Music Madness Pro" />
            <input type="hidden" name="a3" value={paypalAmount} />
            <input type="hidden" name="p3" value="1" />
            <input type="hidden" name="t3" value={paypalPeriod} />
            <input type="hidden" name="src" value="1" />
            <input type="hidden" name="currency_code" value="USD" />
            <button type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
              <Crown className="w-5 h-5" /> Subscribe with PayPal — {price}
            </button>
          </form>

          <button onClick={() => { unlockPro(); showToast('🎉 Pro unlocked! All lessons available.', 'level') }}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 rounded-xl transition text-sm">
            I've Subscribed — Unlock Pro
          </button>
        </div>
      </div>
    </div>
  )
}
