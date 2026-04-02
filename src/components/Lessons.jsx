import { useState } from 'react'
import { Lock, CheckCircle, PlayCircle, Star } from 'lucide-react'
import { LESSONS } from '../data/lessons'
import { usePro } from '../hooks/usePro'

const EMOJI = { guitar: '🎸', banjo: '🪕', mandolin: '🎻' }

export default function Lessons({ navigate }) {
  const { isPro } = usePro()
  const [filter, setFilter] = useState('all')
  const completed = JSON.parse(localStorage.getItem('mm_completed') || '[]')
  const allLessons = [...LESSONS.guitar, ...LESSONS.banjo, ...LESSONS.mandolin]
  const filtered = filter === 'all' ? allLessons : LESSONS[filter]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Lessons</h1>
        <p className="text-gray-400 mt-1">Structured learning for folk & bluegrass instruments</p>
      </div>
      <div className="flex gap-2 flex-wrap">
        {['all', 'guitar', 'banjo', 'mandolin'].map(inst => (
          <button key={inst} onClick={() => setFilter(inst)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize
              ${filter === inst ? 'bg-amber-500 text-black' : 'bg-[#12122a] border border-white/10 text-gray-300 hover:border-amber-500/40'}`}>
            {inst === 'all' ? 'All' : `${EMOJI[inst]} ${inst.charAt(0).toUpperCase() + inst.slice(1)}`}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map(lesson => {
          const isCompleted = completed.includes(lesson.id)
          const isLocked = !lesson.free && !isPro
          return (
            <div key={lesson.id} onClick={() => isLocked ? navigate('pricing') : navigate('lesson-detail', { lesson })}
              className={`bg-[#12122a] border rounded-xl p-5 flex items-center gap-4 transition-all cursor-pointer
                ${isLocked ? 'border-white/5 opacity-50' : 'border-white/10 hover:border-amber-500/40 hover:bg-white/5'}`}>
              <div className="text-2xl flex-shrink-0">{EMOJI[lesson.instrument]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-gray-200">{lesson.title}</span>
                  {!lesson.free && <span className="text-xs bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-medium">PRO</span>}
                  {isCompleted && <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">Completed</span>}
                </div>
                <p className="text-sm text-gray-500 mt-1 truncate">{lesson.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-600 capitalize">{lesson.instrument}</span>
                  <span className="text-xs text-gray-700">·</span>
                  <span className="flex items-center gap-1 text-xs text-amber-500"><Star className="w-3 h-3" /> {lesson.xp} XP</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                {isLocked ? <Lock className="w-5 h-5 text-gray-600" /> : isCompleted ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <PlayCircle className="w-5 h-5 text-amber-400" />}
              </div>
            </div>
          )
        })}
      </div>
      {!isPro && (
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-6 text-center">
          <Lock className="w-8 h-8 text-amber-400 mx-auto mb-3" />
          <h3 className="font-display text-lg font-bold text-white mb-2">Unlock All 18 Lessons</h3>
          <p className="text-gray-400 text-sm mb-4">Upgrade to Pro to access 9 additional lessons across all instruments.</p>
          <button onClick={() => navigate('pricing')} className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-2.5 rounded-lg transition">Upgrade to Pro — $9.99/mo</button>
        </div>
      )}
    </div>
  )
}
