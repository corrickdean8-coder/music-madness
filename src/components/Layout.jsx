import { useState } from 'react'
import { Music, BookOpen, Guitar, Library, Ear, Circle, CreditCard, BarChart2, Music2, Users, Award, Menu, Star, Flame, Crown } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: Music },
  { id: 'lessons', label: 'Lessons', icon: BookOpen },
  { id: 'fretboard', label: 'Fretboard', icon: Guitar },
  { id: 'chords', label: 'Chord Library', icon: Library },
  { id: 'ear-training', label: 'Ear Training', icon: Ear },
  { id: 'circle', label: 'Circle of Fifths', icon: Circle },
  { id: 'practice', label: 'Practice', icon: BarChart2 },
  { id: 'songs', label: 'Songs', icon: Music2 },
  { id: 'artists', label: 'Artists', icon: Users },
  { id: 'achievements', label: 'Achievements', icon: Award },
  { id: 'pricing', label: 'Upgrade', icon: CreditCard },
]

export default function Layout({ children, page, navigate, xp, level, streak, levelInfo, isPro }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#12122a] border-r border-white/10">
      <div className="p-6 border-b border-white/10">
        <h1 className="font-display text-2xl font-bold text-amber-400">🎸 Music Madness</h1>
        <p className="text-xs text-gray-400 mt-1">Folk & Bluegrass Theory</p>
      </div>
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-200">{level}</span>
          {isPro
            ? <span className="flex items-center gap-1 text-xs bg-amber-500 text-black font-bold px-2 py-0.5 rounded-full"><Crown className="w-3 h-3" /> PRO</span>
            : <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">FREE</span>
          }
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
          <div className="bg-amber-500 h-2 rounded-full transition-all duration-500" style={{ width: `${levelInfo.progress}%` }} />
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400" /> {xp} XP</span>
          <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-orange-400" /> {streak} streak</span>
        </div>
      </div>
      <nav className="flex-1 p-3 overflow-y-auto">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => { navigate(id); setMobileOpen(false) }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-all
              ${page === id ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}`}>
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
            {id === 'pricing' && !isPro && <span className="ml-auto text-xs bg-amber-500 text-black font-bold px-1.5 py-0.5 rounded">PRO</span>}
          </button>
        ))}
      </nav>
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden lg:flex lg:w-64 lg:flex-shrink-0"><SidebarContent /></div>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 z-10"><SidebarContent /></div>
        </div>
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="lg:hidden flex items-center justify-between p-4 bg-[#12122a] border-b border-white/10">
          <h1 className="font-display text-lg font-bold text-amber-400">🎸 Music Madness</h1>
          <button onClick={() => setMobileOpen(true)} className="text-gray-400 hover:text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
