import { Award, Lock } from 'lucide-react'

const BADGES = [
  { id: 'first-note', name: 'First Note', emoji: '🎵', desc: 'Earn your first XP', check: (xp) => xp >= 1 },
  { id: 'chord-master', name: 'Chord Master', emoji: '🎶', desc: 'Earn 20+ XP', check: (xp) => xp >= 20 },
  { id: 'ear-opener', name: 'Ear Opener', emoji: '👂', desc: 'Earn 50+ XP', check: (xp) => xp >= 50 },
  { id: '7-day-streak', name: '7-Day Streak', emoji: '🔥', desc: 'Log 7+ practice sessions', check: (xp, sessions) => sessions >= 7 },
  { id: 'theory-nerd', name: 'Theory Nerd', emoji: '🧠', desc: 'Complete 3+ lessons', check: (xp, sessions, completed) => completed >= 3 },
  { id: 'circle-wizard', name: 'Circle Wizard', emoji: '⭕', desc: 'Earn 24+ XP (explore all keys)', check: (xp) => xp >= 24 },
  { id: 'picker', name: 'Picker', emoji: '🎯', desc: 'Reach 500 XP (Picker level)', check: (xp) => xp >= 500 },
  { id: 'pro-player', name: 'Pro Player', emoji: '⚡', desc: 'Reach 1000 XP (Flatpicker level)', check: (xp) => xp >= 1000 },
  { id: 'completionist', name: 'Completionist', emoji: '🏆', desc: 'Complete 9+ lessons', check: (xp, sessions, completed) => completed >= 9 },
]

export default function Achievements({ xp }) {
  const sessions = JSON.parse(localStorage.getItem('mm_sessions') || '[]').length
  const completed = JSON.parse(localStorage.getItem('mm_completed') || '[]').length
  const unlocked = BADGES.filter(b => b.check(xp, sessions, completed)).length

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Achievements</h1>
        <p className="text-gray-400 mt-1">Collect badges as you master folk & bluegrass</p>
      </div>

      <div className="bg-[#12122a] border border-white/10 rounded-xl p-5">
        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold text-gray-200 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" /> {unlocked} / {BADGES.length} Unlocked
          </span>
          <span className="text-sm text-gray-400">{Math.round(unlocked / BADGES.length * 100)}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-3">
          <div className="bg-gradient-to-r from-amber-500 to-orange-400 h-3 rounded-full transition-all duration-700"
            style={{ width: `${(unlocked / BADGES.length) * 100}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {BADGES.map(badge => {
          const isUnlocked = badge.check(xp, sessions, completed)
          return (
            <div key={badge.id}
              className={`rounded-xl p-5 text-center transition-all
                ${isUnlocked
                  ? 'bg-[#12122a] border-2 border-amber-500/50 shadow-lg shadow-amber-500/10'
                  : 'bg-[#12122a] border border-white/5 opacity-50'}`}>
              <div className="text-4xl mb-3">{isUnlocked ? badge.emoji : '🔒'}</div>
              <h3 className={`font-display text-lg font-bold mb-1 ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                {badge.name}
              </h3>
              <p className="text-xs text-gray-400">{badge.desc}</p>
              {isUnlocked && (
                <div className="mt-2 inline-flex items-center gap-1 text-xs text-amber-400 font-semibold">
                  <Award className="w-3 h-3" /> Unlocked!
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
