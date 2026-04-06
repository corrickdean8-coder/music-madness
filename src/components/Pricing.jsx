import React, { useState } from 'react';
import { Check, Star, Crown, Zap } from 'lucide-react';

const PAYPAL_BUSINESS = 'corrickdean8@gmail.com';

// Hidden PayPal image pixel for tracking
const PAYPAL_IMG = 'https://www.paypalobjects.com/en_US/i/scr/pixel.gif';

function PayPalSubscribeForm({ amount, period, planName, billingCycle }) {
  // period: 'M' for monthly, 'Y' for annual
  return (
    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
      <input type="hidden" name="cmd" value="_xclick-subscriptions" />
      <input type="hidden" name="business" value={PAYPAL_BUSINESS} />
      <input type="hidden" name="lc" value="US" />
      <input type="hidden" name="item_name" value={`Music Madness ${planName} (${billingCycle})`} />
      <input type="hidden" name="no_note" value="1" />
      <input type="hidden" name="src" value="1" />
      <input type="hidden" name="a3" value={amount} />
      <input type="hidden" name="p3" value="1" />
      <input type="hidden" name="t3" value={period} />
      <input type="hidden" name="currency_code" value="USD" />
      <input type="hidden" name="bn" value="PP-SubscriptionsBF:btn_subscribeCC_LG.gif:NonHosted" />
      <button
        type="submit"
        className="w-full bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-black font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.26-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.477z"/>
        </svg>
        Subscribe with PayPal
      </button>
      <img alt="" src={PAYPAL_IMG} width="1" height="1" style={{border: 0}} />
    </form>
  );
}

const FREE_FEATURES = [
  'First 3 lessons per instrument',
  'Basic chord library',
  'Fretboard visualizer',
  'Circle of Fifths',
  'Beginner difficulty only',
];

const PRO_FEATURES = [
  'All lessons (unlimited)',
  'Full chord library',
  'Ear Training game',
  'Practice tracker',
  'Songs & artist library',
  'Achievements system',
  'Beginner + Intermediate difficulty',
  'Everything in Free',
];

const PREMIUM_FEATURES = [
  'Everything in Pro',
  'Advanced difficulty levels',
  'Priority support badge',
  'Early access to new features',
  'Exclusive premium content',
];

export default function Pricing({ tier, setTier }) {
  const [billing, setBilling] = useState('monthly');
  const [unlocked, setUnlocked] = useState(null);

  const isAnnual = billing === 'annual';

  const handleUnlock = (newTier) => {
    setTier(newTier);
    setUnlocked(newTier);
  };

  return (
    <div className="min-h-screen bg-[#12122a] text-white py-12 px-4">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold mb-3 text-amber-400">Choose Your Journey</h1>
        <p className="text-slate-400 text-lg">Unlock the full folk & bluegrass learning experience</p>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
          <button
            onClick={() => setBilling(isAnnual ? 'monthly' : 'annual')}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${isAnnual ? 'bg-amber-500' : 'bg-slate-600'}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform duration-300 ${isAnnual ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
          <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-slate-500'}`}>
            Annual <span className="text-amber-400 font-bold ml-1">Save 33%</span>
          </span>
        </div>
      </div>

      {/* Unlock success banner */}
      {unlocked && (
        <div className="max-w-5xl mx-auto mb-8">
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center text-green-400 font-medium">
            🎉 {unlocked.charAt(0).toUpperCase() + unlocked.slice(1)} access unlocked! Enjoy your premium features.
          </div>
        </div>
      )}

      {/* Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* FREE */}
        <div className={`relative bg-[#1a1a35] border rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300 ${tier === 'free' ? 'border-slate-400 shadow-lg shadow-slate-500/10' : 'border-slate-700/50'}`}>
          {tier === 'free' && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-600 text-white text-xs font-bold px-4 py-1 rounded-full">Current Plan</span>
          )}
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Free</h2>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">$0</span>
              <span className="text-slate-400">/forever</span>
            </div>
            <p className="text-slate-500 text-sm mt-2">Perfect to get started</p>
          </div>

          <ul className="flex flex-col gap-2.5 flex-1">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                <Check className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <button
            disabled
            className="w-full bg-slate-700 text-slate-400 font-bold py-3 px-6 rounded-xl cursor-not-allowed"
          >
            {tier === 'free' ? 'Current Plan' : 'Downgrade'}
          </button>
        </div>

        {/* PRO - Most Popular */}
        <div className={`relative bg-[#1a1a35] border rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300 scale-105 ${tier === 'pro' ? 'border-amber-500 shadow-xl shadow-amber-500/20' : 'border-amber-500/40 shadow-lg shadow-amber-500/10'}`}>
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3" /> Most Popular
          </span>
          {tier === 'pro' && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-full">Current Plan</span>
          )}

          <div>
            <h2 className="text-2xl font-bold text-amber-400 mb-1">Pro</h2>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">{isAnnual ? '$79.99' : '$9.99'}</span>
              <span className="text-slate-400">/{isAnnual ? 'year' : 'month'}</span>
            </div>
            {isAnnual && <p className="text-amber-400 text-sm mt-1">$6.67/mo billed annually</p>}
            <p className="text-slate-500 text-sm mt-2">For serious learners</p>
          </div>

          <ul className="flex flex-col gap-2.5 flex-1">
            {PRO_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-200">
                <Check className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          {tier === 'pro' || tier === 'premium' ? (
            <button disabled className="w-full bg-amber-500/20 text-amber-400 font-bold py-3 px-6 rounded-xl cursor-not-allowed border border-amber-500/30">
              {tier === 'pro' ? 'Current Plan' : 'Included in Premium'}
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <PayPalSubscribeForm
                amount={isAnnual ? '79.99' : '9.99'}
                period={isAnnual ? 'Y' : 'M'}
                planName="Pro"
                billingCycle={isAnnual ? 'Annual' : 'Monthly'}
              />
              <button
                onClick={() => handleUnlock('pro')}
                className="w-full border border-amber-500/40 text-amber-400 hover:bg-amber-500/10 font-medium py-2 px-4 rounded-xl transition-all duration-200 text-sm"
              >
                I've subscribed — Unlock Pro Access
              </button>
            </div>
          )}
        </div>

        {/* PREMIUM - Best Value */}
        <div className={`relative bg-[#1a1a35] border rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300 ${tier === 'premium' ? 'border-purple-500 shadow-xl shadow-purple-500/20' : 'border-purple-500/40 shadow-lg shadow-purple-500/10'}`}>
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
            <Crown className="w-3 h-3" /> Best Value
          </span>
          {tier === 'premium' && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-full">Current Plan</span>
          )}

          <div>
            <h2 className="text-2xl font-bold text-purple-400 mb-1">Premium</h2>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">{isAnnual ? '$159.99' : '$19.99'}</span>
              <span className="text-slate-400">/{isAnnual ? 'year' : 'month'}</span>
            </div>
            {isAnnual && <p className="text-purple-400 text-sm mt-1">$13.33/mo billed annually</p>}
            <p className="text-slate-500 text-sm mt-2">The complete experience</p>
          </div>

          <ul className="flex flex-col gap-2.5 flex-1">
            {PREMIUM_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-200">
                <Check className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          {tier === 'premium' ? (
            <button disabled className="w-full bg-purple-500/20 text-purple-400 font-bold py-3 px-6 rounded-xl cursor-not-allowed border border-purple-500/30">
              Current Plan
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <PayPalSubscribeForm
                amount={isAnnual ? '159.99' : '19.99'}
                period={isAnnual ? 'Y' : 'M'}
                planName="Premium"
                billingCycle={isAnnual ? 'Annual' : 'Monthly'}
              />
              <button
                onClick={() => handleUnlock('premium')}
                className="w-full border border-purple-500/40 text-purple-400 hover:bg-purple-500/10 font-medium py-2 px-4 rounded-xl transition-all duration-200 text-sm"
              >
                I've subscribed — Unlock Premium Access
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Feature comparison note */}
      <div className="max-w-5xl mx-auto mt-12 text-center">
        <p className="text-slate-500 text-sm">
          All plans include access to our folk & bluegrass community. Upgrade or downgrade anytime through PayPal.
        </p>
        <p className="text-slate-600 text-xs mt-2">
          Payments processed securely via PayPal. Cancel anytime.
        </p>
      </div>
    </div>
  );
}
