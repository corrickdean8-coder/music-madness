import { useState } from 'react'
import { Play, Lock } from 'lucide-react'
import { CHORDS } from '../data/chords'
import { INSTRUMENTS } from '../data/instruments'
import { useAudio } from '../hooks/useAudio'
import { usePro } from '../hooks/usePro'

const FREE_CHORDS = ['G', 'D', 'C']

function ChordDiagram({ chord, instrument }) {
  const inst = INSTRUMENTS[instrument]
  const numStrings = inst.strings
  const numFrets = 4
  const w = numStrings * 28 + 20
  const h = numFrets * 30 + 50
  const stringSpacing = 28
  const fretSpacing = 30
  const leftPad = 20
  const topPad = 30

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <rect x={leftPad} y={topPad} width={(numStrings - 1) * stringSpacing} height={3} fill="#d4a037" rx={1} />
      {Array.from({ length: numFrets }, (_, f) => (
        <line key={f} x1={leftPad} y1={topPad + (f + 1) * fretSpacing} x2={leftPad + (numStrings - 1) * stringSpacing} y2={topPad + (f + 1) * fretSpacing} stroke="#444" strokeWidth={1} />
      ))}
      {Array.from({ length: numStrings }, (_, s) => (
        <line key={s} x1={leftPad + s * stringSpacing} y1={topPad} x2={leftPad + s * stringSpacing} y2={topPad + numFrets * fretSpacing} stroke="#666" strokeWidth={1} />
      ))}
      {chord.frets.map((fret, s) => {
        const x = leftPad + s * stringSpacing
        if (fret === -1) return <text key={s} x={x} y={topPad - 8} textAnchor="middle" fill="#ef4444" fontSize={14} fontWeight="bold">✕</text>
        if (fret === 0) return <circle key={s} cx={x} cy={topPad - 10} r={5} fill="none" stroke="#9ca3af" strokeWidth={1.5} />
        return <circle key={s} cx={x} cy={topPad + (fret - 0.5) * fretSpacing} r={9} fill="#f59e0b" stroke="#fbbf24" strokeWidth={1} />
      })}
    </svg>
  )
}

export default function ChordLibrary({ navigate }) {
  const [instrument, setInstrument] = useState('guitar')
  const { playChord } = useAudio()
  const { isPro } = usePro()
  const allChords = CHORDS[instrument]
  const inst = INSTRUMENTS[instrument]

  const freeChords = allChords.filter(c => FREE_CHORDS.includes(c.name))
  const proChords = allChords.filter(c => !FREE_CHORDS.includes(c.name))
  const visibleChords = isPro ? allChords : freeChords

  const getChordMidi = (chord) => {
    return chord.frets.map((fret, i) => {
      if (fret === -1) return null
      return inst.openMidi[i] + fret
    }).filter(m => m !== null)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Chord Library</h1>
        <p className="text-gray-400 mt-1">Essential chords for folk & bluegrass</p>
      </div>

      <div className="flex gap-1 bg-[#12122a] border border-white/10 rounded-lg p-1 w-fit">
        {Object.entries(INSTRUMENTS).map(([key, val]) => (
          <button key={key} onClick={() => setInstrument(key)}
            className={`px-3 py-1.5 rounded text-sm font-medium transition ${instrument === key ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-white'}`}>
            {val.emoji} {val.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visibleChords.map(chord => (
          <div key={chord.name} className="bg-[#12122a] border border-white/10 rounded-xl p-4 flex flex-col items-center hover:border-amber-500/40 transition">
            <h3 className="font-display text-xl font-bold text-white mb-2">{chord.name}</h3>
            <ChordDiagram chord={chord} instrument={instrument} />
            <button onClick={() => playChord(getChordMidi(chord))}
              className="mt-3 flex items-center gap-2 bg-amber-500/20 hover:bg-amber-500/40 border border-amber-500/30 text-amber-400 font-medium px-4 py-2 rounded-lg text-sm transition active:scale-95">
              <Play className="w-4 h-4" /> Play
            </button>
          </div>
        ))}
      </div>

      {!isPro && proChords.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-6 text-center">
          <Lock className="w-8 h-8 text-amber-400 mx-auto mb-3" />
          <h3 className="font-display text-lg font-bold text-white mb-2">Unlock {proChords.length} more chords with Pro</h3>
          <p className="text-gray-400 text-sm mb-4">Get access to {proChords.map(c => c.name).join(', ')} and more.</p>
          <button onClick={() => navigate('pricing')} className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-2.5 rounded-lg transition">Upgrade to Pro</button>
        </div>
      )}
    </div>
  )
}
