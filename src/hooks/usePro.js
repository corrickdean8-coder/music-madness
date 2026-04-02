import { useState } from 'react'

export function usePro() {
  const [isPro, setIsPro] = useState(() => localStorage.getItem('mm_pro') === 'true')
  const unlockPro = () => { localStorage.setItem('mm_pro', 'true'); setIsPro(true) }
  return { isPro, unlockPro }
}
