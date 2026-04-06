import { useState } from 'react';

export function usePro() {
  const getInitialTier = () => {
    const saved = localStorage.getItem('musicMadnessTier');
    if (saved) return saved;
    // backward compat
    const legacyPro = localStorage.getItem('musicMadnessPro');
    return legacyPro === 'true' ? 'pro' : 'free';
  };

  const [tier, setTierState] = useState(getInitialTier);

  const setTier = (newTier) => {
    localStorage.setItem('musicMadnessTier', newTier);
    localStorage.setItem('musicMadnessPro', newTier !== 'free' ? 'true' : 'false');
    setTierState(newTier);
  };

  const isPro = tier !== 'free';
  const setPro = (val) => setTier(val ? 'pro' : 'free');

  return { tier, setTier, isPro, setPro };
}
