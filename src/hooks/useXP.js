import { useState } from 'react'

const LEVELS = [
  { name: 'Beginner', min: 0, max: 200 },
  { name: 'Apprentice', min: 200, max: 500 },
  { name: 'Picker', min: 500, max: 1000 },
  { name: 'Flatpicker', min: 1000, max: 2000 },
  { name: 'Master', min: 2000, max: Infinity },
]

function getLevelInfo(xp) {
  const lvl = LEVELS.find(l => xp >= l.min && xp < l.max) || LEVELS[LEVELS.length - 1]
  const progress = lvl.max === Infinity ? 100 : Math.round(((xp - lvl.min) / (lvl.max - lvl.min)) * 100)
  return { ...lvl, progress, xpInLevel: xp - lvl.min, xpToNext: lvl.max === Infinity ? 0 : lvl.max - xp }
}

export function useXP() {
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem('mm_xp') || '0'))
  const [streak] = useState(() => parseInt(localStorage.getItem('mm_streak') || '0'))

  const addXP = (amount) => {
    let leveledUp = false, newLevel = ''
    setXp(prev => {
      const oldInfo = getLevelInfo(prev)
      const newXp = prev + amount
      const newInfo = getLevelInfo(newXp)
      if (newInfo.name !== oldInfo.name) { leveledUp = true; newLevel = newInfo.name }
      localStorage.setItem('mm_xp', newXp)
      return newXp
    })
    return { leveledUp, newLevel }
  }

  return { xp, level: getLevelInfo(xp).name, streak, addXP, levelInfo: getLevelInfo(xp) }
}
