import { BookOpen, Guitar, Library, Ear, Circle, BarChart2, Music2, Users, Award, Star, Flame, Crown, Zap } from 'lucide-react'

const INSTRUMENTS = [
  { key: 'guitar', name: 'Guitar', emoji: '🎸', desc: '6 strings · EADGBE · 24 frets', color: 'from-amber-500/20 to-amber-700/10 border-amber-500/30' },
  { key: 'banjo', name: 'Banjo', emoji: '🪕', desc: '5 strings · gDGBD · 22 frets', color: 'from-purple-500/20 to-purple-700/10 border-purple-500/30' },
  { key: 'mandolin', name: 'Mandolin', emoji: '🎻', desc: '4 courses · GDAE · 20 frets', color: 'from-emerald-500/20 to-emerald-700/10 border-emerald-500/30' },
]

const QUICK_NAV = [
  { id: 'lessons', label: 'Lessons', icon: BookOpen, desc: 'Learn technique & theory', color: 'text-amber-400' },
  { id: 'fretboard', label: 'Fretboard', icon: Guitar, desc: 'Interactive fret visualizer', color: 'text-blue-400' },
  { id: 'chords', label: 'Chords', icon: Library, desc: 'Chord diagrams & playback', color: 'text-green-400' },
  { id: 'ear-training', label: 'Ear Training', icon: Ear, desc: 'Train your musical ear', color: 'text-pink-400' },
  { id: 'circle', label: 'Circle of Fifths', icon: Circle, desc: 'Keys & harmony', color: 'text-purple-400' },
  { id: 'practice', label: 'Practice', icon: BarChart2, desc: 'Track your sessions', color: 'text-cyan-400' },
  { id: 'songs', label: 'Songs', icon: Music2, desc: '15 folk & bluegrass songs', color: 'text-orange-400' },
  { id: 'artists', label: 'Artists', icon: Users, desc: '8 legendary musicians', color: 'text-red-400' },
  { id: 'achievements', label: 'Achievements', icon: Award, desc: 'Badges & milestones', color: 'text-yellow-400' },
]

export default function Dashboard({ navigate, xp, level, streak, levelInfo, isPro, tier }) {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">Welcome back! 🎵</h1>
          <p className="text-gray-400 mt-1">Keep strumming — every note counts.</p>
        </div>
        {tier === 'premium'
          ? <span className="flex items-center gap-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-3 py-1.5 rounded-full text-sm"><Crown className="w-4 h-4" /> PREMIUM</span>
          : tier === 'pro'
          ? <span className="flex items-center gap-1.5 bg-amber-500 text-black font-bold px-3 py-1.5 rounded-full text-sm"><Star className="w-4 h-4" /> PRO</span>
          : <button onClick={() => navigate('pricing')} className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold px-3 py-1.5 rounded-full text-sm hover:opacity-90 transition"><Zap className="w-4 h-4" /> Go Pro</button>
        }
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: <Star className="w-6 h-6 text-amber-400" />, value: xp, label: 'Total XP' },
          { icon: <Flame className="w-6 h-6 text-orange-400" />, value: streak, label: 'Day Streak' },
          { icon: <span className="text-2xl">{level === 'Master' ? '🏆' : level === 'Flatpicker' ? '⚡' : level === 'Picker' ? '🎯' : level === 'Apprentice' ? '🌟' : '🌱'}</span>, value: level, label: 'Level', small: true },
        ].map((stat, i) => (
          <div key={i} className="bg-[#12122a] border border-white/10 rounded-xl p-4 text-center">
            <div className="flex justify-center mb-2">{stat.icon}</div>
            <div className={`font-bold text-white ${stat.small ? 'text-sm' : 'text-2xl'}`}>{stat.value}</div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#12122a] border border-white/10 rounded-xl p-5">
        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold text-gray-200">Level Progress</span>
          <span className="text-sm text-gray-400">{levelInfo.xpInLevel} / {levelInfo.max === Infinity ? '∞' : levelInfo.max - levelInfo.min} XP</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-3">
          <div className="bg-gradient-to-r from-amber-500 to-orange-400 h-3 rounded-full transition-all duration-700" style={{ width: `${levelInfo.progress}%` }} />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>{level}</span>
          {levelInfo.xpToNext > 0 && <span>{levelInfo.xpToNext} XP to next level</span>}
        </div>
      </div>

      <div>
        <h2 className="font-display text-xl font-bold text-white mb-4">Choose Your Instrument</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {INSTRUMENTS.map(inst => (
            <button key={inst.key} onClick={() => navigate('lessons')}
              className={`bg-gradient-to-br ${inst.color} border rounded-xl p-6 text-left hover:scale-105 transition-all duration-200`}>
              <div className="text-4xl mb-3">{inst.emoji}</div>
              <h3 className="font-display text-lg font-bold text-white">{inst.name}</h3>
              <p className="text-sm text-gray-400 mt-1">{inst.desc}</p>
              <div className="mt-3 text-xs text-gray-300 flex items-center gap-1">
                <BookOpen className="w-3 h-3" /> 6 lessons available
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-display text-xl font-bold text-white mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {QUICK_NAV.map(item => (
            <button key={item.id} onClick={() => navigate(item.id)}
              className="bg-[#12122a] border border-white/10 rounded-xl p-4 text-left hover:border-amber-500/40 hover:bg-white/5 transition-all group">
              <item.icon className={`w-5 h-5 mb-2 ${item.color} group-hover:scale-110 transition-transform`} />
              <div className="font-semibold text-sm text-gray-200">{item.label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
