import { useState } from 'react'
import { useXP } from './hooks/useXP'
import { usePro } from './hooks/usePro'

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [pageParams, setPageParams] = useState({})
  const [toasts, setToasts] = useState([])
  const { xp, level, streak, addXP, levelInfo } = useXP()
  const { isPro, unlockPro } = usePro()

  const navigate = (newPage, params = {}) => { setPage(newPage); setPageParams(params); window.scrollTo(0,0) }
  const showToast = (message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }
  const handleAddXP = (amount, reason) => {
    const { leveledUp, newLevel } = addXP(amount)
    showToast(`+${amount} XP — ${reason}`, 'xp')
    if (leveledUp) setTimeout(() => showToast(`🎉 Level Up! You are now a ${newLevel}!`, 'level'), 500)
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold text-amber-400">🎸 Music Madness</h1>
        <p className="text-gray-400 mt-2">Loading app... (Pass 1 scaffold complete)</p>
        <p className="text-sm text-gray-600 mt-4">XP: {xp} | Level: {level} | Pro: {isPro ? 'Yes' : 'No'}</p>
      </div>
    </div>
  )
}
