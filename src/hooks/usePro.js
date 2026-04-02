import { useState } from 'react';

export function usePro() {
  const [isPro, setIsPro] = useState(() => {
    try {
      return localStorage.getItem('isPro') === 'true';
    } catch {
      return false;
    }
  });

  const setPro = (value) => {
    setIsPro(value);
    try {
      localStorage.setItem('isPro', value ? 'true' : 'false');
    } catch {}
  };

  return { isPro, setPro };
}
