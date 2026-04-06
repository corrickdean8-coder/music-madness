import { useState } from 'react'
import { useXP } from './hooks/useXP'
import { usePro } from './hooks/usePro'
import Layout from './components/Layout'
import Toast from './components/Toast'
import Dashboard from './components/Dashboard'
import Lessons from './components/Lessons'
import LessonDetail from './components/LessonDetail'
import Fretboard from './components/Fretboard'
import ChordLibrary from './components/ChordLibrary'
import EarTraining from './components/EarTraining'
import CircleOfFifths from './components/CircleOfFifths'
import Pricing from './components/Pricing'
import PracticeTracker from './components/PracticeTracker'
import Songs from './components/Songs'
import Artists from './components/Artists'
import Achievements from './components/Achievements'

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [pageParams, setPageParams] = useState({})
  const [toasts, setToasts] = useState([])
  const { xp, level, streak, addXP, levelInfo } = useXP()
  const { tier, setTier, isPro, setPro } = usePro()

  const navigate = (newPage, params = {}) => { setPage(newPage); setPageParams(params); window.scrollTo(0, 0) }
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

  const shared = { navigate, tier, setTier, isPro, setPro, xp, level, streak, levelInfo, addXP: handleAddXP, showToast }

  const pages = {
    dashboard: <Dashboard {...shared} />,
    lessons: <Lessons {...shared} />,
    'lesson-detail': <LessonDetail lesson={pageParams.lesson} {...shared} />,
    fretboard: <Fretboard {...shared} />,
    chords: <ChordLibrary {...shared} />,
    'ear-training': <EarTraining {...shared} />,
    circle: <CircleOfFifths {...shared} />,
    pricing: <Pricing {...shared} />,
    practice: <PracticeTracker {...shared} />,
    songs: <Songs {...shared} />,
    artists: <Artists {...shared} />,
    achievements: <Achievements {...shared} />,
  }

  return (
    <Layout page={page} navigate={navigate} xp={xp} level={level} streak={streak} levelInfo={levelInfo} isPro={isPro} tier={tier}>
      {pages[page] || pages.dashboard}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <Toast key={t.id} message={t.message} type={t.type} />
        ))}
      </div>
    </Layout>
  )
}
