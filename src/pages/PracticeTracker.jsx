import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Flame, Plus } from 'lucide-react';

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

export default function PracticeTracker() {
  const { practiceLog, logPractice, addXP, streak } = useApp();
  const [instrument, setInstrument] = useState('Guitar');
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState(15);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    logPractice({ instrument, topic, duration: parseInt(duration) });
    addXP(15);
    setTopic('');
    setDuration(15);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  const now = new Date();
  const weeklyMinutes = DAYS.map((_, idx) => {
    const date = new Date(now);
    const diff = ((now.getDay() + 6) % 7) - idx;
    date.setDate(now.getDate() - diff);
    const dateStr = date.toISOString().split('T')[0];
    return practiceLog.filter(s => s.date && s.date.startsWith(dateStr)).reduce((sum, s) => sum + (s.duration || 0), 0);
  });

  const maxMin = Math.max(...weeklyMinutes, 60);
  const CHART_H = 100, CHART_W = 280;
  const barW = CHART_W / 7 - 6;

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Practice Tracker</h2>
      <p className="text-gray-400 mb-6">Log your sessions and earn XP.</p>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Plus size={18} className="text-amber-400" />Log Session</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Instrument</label>
              <select value={instrument} onChange={e=>setInstrument(e.target.value)} className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm">
                <option>Guitar</option><option>Banjo</option><option>Mandolin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">What you practiced</label>
              <input type="text" value={topic} onChange={e=>setTopic(e.target.value)} placeholder="e.g. G major scale, forward roll..." className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm placeholder-gray-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Duration: {duration} min</label>
              <input type="range" min={5} max={120} step={5} value={duration} onChange={e=>setDuration(e.target.value)} className="w-full accent-amber-400" />
              <div className="flex justify-between text-xs text-gray-500 mt-1"><span>5m</span><span>60m</span><span>120m</span></div>
            </div>
            <button type="submit" className="w-full bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold py-3 rounded-xl transition-colors">
              {submitted ? '✓ Logged! +15 XP' : 'Log Practice (+15 XP)'}
            </button>
          </form>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <Flame size={30} className="text-orange-400" />
              <div>
                <div className="text-2xl font-bold text-orange-400">{streak} days</div>
                <div className="text-sm text-gray-400">Current streak</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
            <h4 className="text-sm font-semibold text-gray-300 mb-4">This Week (minutes)</h4>
            <svg width="100%" viewBox={`0 0 ${CHART_W} ${CHART_H+30}`}>
              <line x1={0} y1={CHART_H-(60/maxMin)*CHART_H} x2={CHART_W} y2={CHART_H-(60/maxMin)*CHART_H} stroke="#f59e0b" strokeWidth={1} strokeDasharray="4 4" opacity={0.5} />
              {weeklyMinutes.map((mins, idx) => {
                const barH = maxMin > 0 ? (mins/maxMin)*CHART_H : 0;
                const x = idx*(CHART_W/7)+3;
                return (
                  <g key={idx}>
                    <rect x={x} y={CHART_H-barH} width={barW} height={barH} fill={mins>=60?'#f59e0b':'#4b5563'} rx={3} />
                    <text x={x+barW/2} y={CHART_H+14} textAnchor="middle" fill="#9ca3af" fontSize={9}>{DAYS[idx]}</text>
                    {mins>0&&<text x={x+barW/2} y={CHART_H-barH-3} textAnchor="middle" fill="#f59e0b" fontSize={8}>{mins}</text>}
                  </g>
                );
              })}
              <text x={CHART_W-2} y={CHART_H-(60/maxMin)*CHART_H-4} textAnchor="end" fill="#f59e0b" fontSize={8}>60m goal</text>
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Practice History</h3>
        {practiceLog.length === 0
          ? <p className="text-gray-500 text-sm">No sessions yet. Start practicing!</p>
          : <div className="space-y-2 max-h-60 overflow-y-auto">{[...practiceLog].reverse().map((session,idx)=>(
              <div key={idx} className="flex items-center justify-between bg-gray-700 rounded-lg px-4 py-2 text-sm">
                <div><span className="text-white font-medium">{session.topic}</span><span className="text-gray-400 ml-2">({session.instrument})</span></div>
                <div className="flex items-center gap-3 text-gray-400"><span>{session.duration}m</span><span>{session.date?new Date(session.date).toLocaleDateString():''}</span></div>
              </div>
            ))}</div>
        }
      </div>
    </div>
  );
}
