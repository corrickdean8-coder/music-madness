import { useState } from 'react';

export function usePro() {
  const [isPro, setIsPro] = useState(() => {
    try { return localStorage.getItem('mm_isPro') === 'true'; } catch { return false; }
  });

  const setPro = (value) => {
    setIsPro(value);
    try { localStorage.setItem('mm_isPro', value ? 'true' : 'false'); } catch {}
  };

  return { isPro, setPro };
}
