import { useState } from 'react'
import { Music2 } from 'lucide-react'
import { SONGS } from '../data/songs'

const EMOJI = { guitar: '🎸', banjo: '🪕', mandolin: '🎻', multi: '🎵' }
const DIFF_COLORS = { Beginner: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', Intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/30', Advanced: 'bg-red-500/20 text-red-400 border-red-500/30' }

export default function Songs() {
  const [instFilter, setInstFilter] = useState('all')
  const [diffFilter, setDiffFilter] = useState('all')

  const filtered = SONGS.filter(s =>
    (instFilter === 'all' || s.instrument === instFilter) &&
    (diffFilter === 'all' || s.difficulty === diffFilter)
  )

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Song Library</h1>
        <p className="text-gray-400 mt-1">15 folk & bluegrass songs to learn</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {['all', 'guitar', 'banjo', 'mandolin', 'multi'].map(inst => (
          <button key={inst} onClick={() => setInstFilter(inst)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition capitalize
              ${instFilter === inst ? 'bg-amber-500 text-black' : 'bg-[#12122a] border border-white/10 text-gray-300 hover:border-amber-500/40'}`}>
            {inst === 'all' ? 'All' : `${EMOJI[inst]} ${inst.charAt(0).toUpperCase() + inst.slice(1)}`}
          </button>
        ))}
        <div className="w-px bg-white/10 mx-1" />
        {['all', 'Beginner', 'Intermediate', 'Advanced'].map(d => (
          <button key={d} onClick={() => setDiffFilter(d)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition
              ${diffFilter === d ? 'bg-amber-500 text-black' : 'bg-[#12122a] border border-white/10 text-gray-300 hover:border-amber-500/40'}`}>
            {d === 'all' ? 'All Levels' : d}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(song => (
          <div key={song.id} className="bg-[#12122a] border border-white/10 rounded-xl p-5 hover:border-amber-500/30 transition">
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{EMOJI[song.instrument]}</span>
              <span className={`text-xs border px-2 py-0.5 rounded-full font-medium ${DIFF_COLORS[song.difficulty]}`}>
                {song.difficulty}
              </span>
            </div>
            <h3 className="font-display text-lg font-bold text-white">{song.title}</h3>
            <p className="text-sm text-gray-400 mt-1 leading-relaxed">{song.description}</p>
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded-full">Key: {song.key}</span>
              {song.chords.map(c => (
                <span key={c} className="text-xs bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full">{c}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Music2 className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500">No songs match your filters.</p>
        </div>
      )}
    </div>
  )
}
