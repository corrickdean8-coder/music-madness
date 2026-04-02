import { useState } from 'react'
import { Plus, Clock, Flame, Calendar, BarChart2 } from 'lucide-react'

const TOPICS = ['Chords', 'Scales', 'Fingerpicking', 'Flatpicking', 'Ear Training', 'Songs', 'Theory', 'Improvisation']

function getWeekDates() {
  const now = new Date()
  const day = now.getDay()
  const start = new Date(now)
  start.setDate(now.getDate() - day)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return d.toISOString().split('T')[0]
  })
}

export default function PracticeTracker({ addXP }) {
  const [sessions, setSessions] = useState(() => JSON.parse(localStorage.getItem('mm_sessions') || '[]'))
  const [instrument, setInstrument] = useState('Guitar')
  const [topic, setTopic] = useState('Chords')
  const [duration, setDuration] = useState(15)
  const [notes, setNotes] = useState('')

  const weekDates = getWeekDates()
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const weeklyMinutes = weekDates.reduce((sum, date) => {
    return sum + sessions.filter(s => s.date === date).reduce((s, sess) => s + sess.duration, 0)
  }, 0)

  const dailyMinutes = weekDates.map(date =>
    sessions.filter(s => s.date === date).reduce((s, sess) => s + sess.duration, 0)
  )
  const maxDaily = Math.max(...dailyMinutes, 1)

  const streak = (() => {
    let count = 0
    const today = new Date()
    for (let i = 0; i < 365; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      if (sessions.some(s => s.date === dateStr)) count++
      else break
    }
    return count
  })()

  const logSession = () => {
    const session = {
      id: Date.now(),
      instrument,
      topic,
      duration,
      notes,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
    }
    const updated = [session, ...sessions]
    setSessions(updated)
    localStorage.setItem('mm_sessions', JSON.stringify(updated))
    addXP(15, `${duration}min ${instrument} practice`)
    setNotes('')
    setDuration(15)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Practice Tracker</h1>
        <p className="text-gray-400 mt-1">Log your sessions and build a practice streak</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: <Flame className="w-5 h-5 text-orange-400" />, value: streak, label: 'Day Streak' },
          { icon: <Clock className="w-5 h-5 text-blue-400" />, value: `${weeklyMinutes}m`, label: 'This Week' },
          { icon: <Calendar className="w-5 h-5 text-purple-400" />, value: sessions.length, label: 'Total Sessions' },
          { icon: <BarChart2 className="w-5 h-5 text-emerald-400" />, value: `${Math.min(Math.round(weeklyMinutes / 120 * 100), 100)}%`, label: 'Weekly Goal (2hr)' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#12122a] border border-white/10 rounded-xl p-4 text-center">
            <div className="flex justify-center mb-2">{stat.icon}</div>
            <div className="text-xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Weekly bar chart */}
      <div className="bg-[#12122a] border border-white/10 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-gray-200 mb-4">This Week</h3>
        <div className="flex items-end gap-2 h-32">
          {dailyMinutes.map((mins, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-gray-500">{mins > 0 ? `${mins}m` : ''}</span>
              <div className="w-full bg-gray-800 rounded-t relative" style={{ height: '100px' }}>
                <div
                  className="absolute bottom-0 w-full bg-gradient-to-t from-amber-500 to-amber-400 rounded-t transition-all duration-500"
                  style={{ height: `${(mins / maxDaily) * 100}%`, minHeight: mins > 0 ? '4px' : '0' }}
                />
              </div>
              <span className="text-xs text-gray-500">{dayNames[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Log form */}
      <div className="bg-[#12122a] border border-white/10 rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-gray-200 mb-4">Log a Session</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Instrument</label>
            <select value={instrument} onChange={e => setInstrument(e.target.value)}
              className="w-full bg-[#1a1a35] border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-amber-500">
              {['Guitar', 'Banjo', 'Mandolin'].map(i => <option key={i}>{i}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Topic</label>
            <select value={topic} onChange={e => setTopic(e.target.value)}
              className="w-full bg-[#1a1a35] border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-amber-500">
              {TOPICS.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Duration (minutes)</label>
            <input type="number" min={1} max={300} value={duration} onChange={e => setDuration(Number(e.target.value))}
              className="w-full bg-[#1a1a35] border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-amber-500" />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Notes (optional)</label>
            <input type="text" value={notes} onChange={e => setNotes(e.target.value)} placeholder="What did you work on?"
              className="w-full bg-[#1a1a35] border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-amber-500" />
          </div>
        </div>
        <button onClick={logSession}
          className="mt-4 bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-2.5 rounded-lg transition flex items-center gap-2">
          <Plus className="w-4 h-4" /> Log Session (+15 XP)
        </button>
      </div>

      {/* Recent sessions */}
      {sessions.length > 0 && (
        <div className="bg-[#12122a] border border-white/10 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-gray-200 mb-4">Recent Sessions</h3>
          <div className="space-y-2">
            {sessions.slice(0, 10).map(s => (
              <div key={s.id} className="flex items-center gap-3 text-sm bg-white/5 rounded-lg px-4 py-3">
                <span>{s.instrument === 'Guitar' ? '🎸' : s.instrument === 'Banjo' ? '🪕' : '🎻'}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-gray-200 font-medium">{s.topic} — {s.duration}min</div>
                  {s.notes && <div className="text-gray-500 text-xs truncate">{s.notes}</div>}
                </div>
                <span className="text-xs text-gray-500 flex-shrink-0">{s.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
