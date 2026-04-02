import { useApp } from '../context/AppContext';
import XPBar from '../components/XPBar';

const instruments = [
  { name: 'Guitar', emoji: '🎸', desc: '6-string, EADGBE' },
  { name: 'Banjo', emoji: '🪕', desc: '5-string, gDGBD' },
  { name: 'Mandolin', emoji: '🎻', desc: '4 courses, GDAE' },
];

const quickLinks = [
  { label: 'Lessons', page: 'lessons', emoji: '📚', desc: 'Interactive lessons' },
  { label: 'Fretboard', page: 'fretboard', emoji: '🎸', desc: 'Visual note explorer' },
  { label: 'Chords', page: 'chords', emoji: '🎵', desc: 'Chord diagrams' },
  { label: 'Ear Training', page: 'eartraining', emoji: '👂', desc: 'Train your ear' },
  { label: 'Circle of 5ths', page: 'circle', emoji: '⭕', desc: 'Key relationships' },
  { label: 'Practice', page: 'practice', emoji: '📊', desc: 'Track your sessions' },
  { label: 'Songs', page: 'songs', emoji: '🎼', desc: '15 folk/bluegrass songs' },
  { label: 'Artists', page: 'artists', emoji: '🏆', desc: 'Legendary musicians' },
];

export default function Dashboard({ setCurrentPage }) {
  const { xp, level, nextLevel, streak, isPro, selectedInstrument, setSelectedInstrument, completedLessons, achievements, achievementDefs } = useApp();
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Welcome back! 🎸</h2>
      <p className="text-gray-400 mb-8">Keep up your practice streak and level up your skills.</p>
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-amber-400 mb-3">Your Instrument</h3>
        <div className="grid grid-cols-3 gap-4">
          {instruments.map(inst => (
            <button key={inst.name} onClick={() => setSelectedInstrument(inst.name)}
              className={`p-4 rounded-xl border-2 text-center transition-all ${selectedInstrument === inst.name ? 'border-amber-400 bg-amber-400/10' : 'border-gray-700 bg-gray-800 hover:border-gray-500'}`}>
              <div className="text-4xl mb-2">{inst.emoji}</div>
              <div className="font-semibold text-white">{inst.name}</div>
              <div className="text-xs text-gray-400 mt-1">{inst.desc}</div>
            </button>
          ))}
        </div>
      </section>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <div className="text-gray-400 text-sm mb-1">XP Progress</div>
          <div className="text-2xl font-bold text-amber-400 mb-2">{xp} XP</div>
          <XPBar />
          <div className="text-xs text-gray-500 mt-1">{level.name} to {nextLevel ? nextLevel.name : 'Max'}</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <div className="text-gray-400 text-sm mb-1">Daily Streak</div>
          <div className="text-4xl mb-1">🔥</div>
          <div className="text-2xl font-bold text-orange-400">{streak} days</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <div className="text-gray-400 text-sm mb-1">Status</div>
          <div className={`text-2xl font-bold mb-1 ${isPro ? 'text-amber-400' : 'text-gray-300'}`}>{isPro ? '⭐ PRO' : '🆓 Free'}</div>
          <div className="text-xs text-gray-500">{completedLessons.length} lessons completed</div>
          {!isPro && <button onClick={() => setCurrentPage('plans')} className="mt-2 text-xs text-amber-400 hover:text-amber-300 underline">Upgrade to Pro</button>}
        </div>
      </div>
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-amber-400 mb-3">Quick Access</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickLinks.map(link => (
            <button key={link.page} onClick={() => setCurrentPage(link.page)}
              className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-amber-400/30 rounded-xl p-4 text-left transition-all group">
              <div className="text-2xl mb-2">{link.emoji}</div>
              <div className="font-semibold text-white text-sm group-hover:text-amber-400 transition-colors">{link.label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{link.desc}</div>
            </button>
          ))}
        </div>
      </section>
      {achievements.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-amber-400 mb-3">Your Achievements</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {achievements.map(id => {
              const def = achievementDefs.find(a => a.id === id);
              if (!def) return null;
              return (
                <div key={id} className="flex items-center gap-3 bg-gray-800 border border-amber-400/30 rounded-lg p-3">
                  <span className="text-2xl">{def.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-amber-300">{def.name}</div>
                    <div className="text-xs text-gray-400">{def.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
