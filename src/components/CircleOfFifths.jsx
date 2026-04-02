import { useState } from 'react'
import { useAudio } from '../hooks/useAudio'

const KEYS = [
  { name: 'C', minor: 'Am', midi: 60, chords: ['C','Dm','Em','F','G','Am','B°'], color: '#ef4444' },
  { name: 'G', minor: 'Em', midi: 67, chords: ['G','Am','Bm','C','D','Em','F#°'], color: '#f97316' },
  { name: 'D', minor: 'Bm', midi: 62, chords: ['D','Em','F#m','G','A','Bm','C#°'], color: '#f59e0b' },
  { name: 'A', minor: 'F#m', midi: 69, chords: ['A','Bm','C#m','D','E','F#m','G#°'], color: '#eab308' },
  { name: 'E', minor: 'C#m', midi: 64, chords: ['E','F#m','G#m','A','B','C#m','D#°'], color: '#84cc16' },
  { name: 'B', minor: 'G#m', midi: 71, chords: ['B','C#m','D#m','E','F#','G#m','A#°'], color: '#22c55e' },
  { name: 'F#', minor: 'D#m', midi: 66, chords: ['F#','G#m','A#m','B','C#','D#m','E#°'], color: '#10b981' },
  { name: 'Db', minor: 'Bbm', midi: 61, chords: ['Db','Ebm','Fm','Gb','Ab','Bbm','C°'], color: '#14b8a6' },
  { name: 'Ab', minor: 'Fm', midi: 68, chords: ['Ab','Bbm','Cm','Db','Eb','Fm','G°'], color: '#06b6d4' },
  { name: 'Eb', minor: 'Cm', midi: 63, chords: ['Eb','Fm','Gm','Ab','Bb','Cm','D°'], color: '#3b82f6' },
  { name: 'Bb', minor: 'Gm', midi: 70, chords: ['Bb','Cm','Dm','Eb','F','Gm','A°'], color: '#8b5cf6' },
  { name: 'F', minor: 'Dm', midi: 65, chords: ['F','Gm','Am','Bb','C','Dm','E°'], color: '#a855f7' },
]

const NUMERALS = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°']

export default function CircleOfFifths({ addXP }) {
  const [selected, setSelected] = useState(null)
  const { playNote } = useAudio()

  const cx = 200, cy = 200, r = 160

  const handleClick = (key) => {
    setSelected(key)
    playNote(key.midi)
    addXP(2, `Circle of Fifths: ${key.name}`)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Circle of Fifths</h1>
        <p className="text-gray-400 mt-1">Explore keys, their relative minors, and diatonic chords</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="bg-[#12122a] border border-white/10 rounded-2xl p-6 flex-shrink-0">
          <svg width={400} height={400} viewBox="0 0 400 400">
            {KEYS.map((key, i) => {
              const angle = (i * 30 - 90) * Math.PI / 180
              const nextAngle = ((i + 1) * 30 - 90) * Math.PI / 180
              const innerR = 80
              const isSelected = selected?.name === key.name

              const x1 = cx + r * Math.cos(angle)
              const y1 = cy + r * Math.sin(angle)
              const x2 = cx + r * Math.cos(nextAngle)
              const y2 = cy + r * Math.sin(nextAngle)
              const x3 = cx + innerR * Math.cos(nextAngle)
              const y3 = cy + innerR * Math.sin(nextAngle)
              const x4 = cx + innerR * Math.cos(angle)
              const y4 = cy + innerR * Math.sin(angle)

              const labelR = (r + innerR) / 2
              const midAngle = ((i * 30 + 15) - 90) * Math.PI / 180
              const lx = cx + labelR * Math.cos(midAngle)
              const ly = cy + labelR * Math.sin(midAngle)

              const minorR = innerR - 25
              const mx = cx + minorR * Math.cos(midAngle)
              const my = cy + minorR * Math.sin(midAngle)

              return (
                <g key={key.name} onClick={() => handleClick(key)} className="cursor-pointer">
                  <path
                    d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 0 0 ${x4} ${y4} Z`}
                    fill={isSelected ? key.color : `${key.color}33`}
                    stroke={isSelected ? '#fff' : key.color}
                    strokeWidth={isSelected ? 2 : 1}
                    className="hover:opacity-80 transition-opacity"
                  />
                  <text x={lx} y={ly + 1} textAnchor="middle" dominantBaseline="middle"
                    fill={isSelected ? '#000' : '#fff'} fontSize={16} fontWeight="bold">{key.name}</text>
                  <text x={mx} y={my + 1} textAnchor="middle" dominantBaseline="middle"
                    fill="#9ca3af" fontSize={10}>{key.minor}</text>
                </g>
              )
            })}

            {/* Center */}
            <circle cx={cx} cy={cy} r={50} fill="#0f0f1a" stroke="#333" strokeWidth={1} />
            <text x={cx} y={cy - 5} textAnchor="middle" fill={selected ? '#f59e0b' : '#666'} fontSize={selected ? 14 : 12} fontWeight="bold">
              {selected ? selected.name : 'Click'}
            </text>
            <text x={cx} y={cy + 12} textAnchor="middle" fill="#666" fontSize={10}>
              {selected ? `${selected.minor}` : 'a key'}
            </text>
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          {selected ? (
            <div className="bg-[#12122a] border border-white/10 rounded-2xl p-6 space-y-5">
              <div>
                <h2 className="font-display text-2xl font-bold text-white flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: selected.color }} />
                  Key of {selected.name} Major
                </h2>
                <p className="text-gray-400 text-sm mt-1">Relative minor: {selected.minor}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-3">Diatonic Chords</h3>
                <div className="grid grid-cols-7 gap-2">
                  {selected.chords.map((chord, i) => (
                    <div key={i} className="text-center">
                      <div className="bg-white/5 border border-white/10 rounded-lg py-2 px-1">
                        <div className="text-xs text-amber-400 font-mono mb-1">{NUMERALS[i]}</div>
                        <div className="text-sm font-semibold text-white">{chord}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-sm font-semibold text-amber-400 mb-2">Common Progressions in {selected.name}</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p><span className="text-gray-500">I–IV–V–I:</span> {selected.chords[0]} – {selected.chords[3]} – {selected.chords[4]} – {selected.chords[0]}</p>
                  <p><span className="text-gray-500">I–V–vi–IV:</span> {selected.chords[0]} – {selected.chords[4]} – {selected.chords[5]} – {selected.chords[3]}</p>
                  <p><span className="text-gray-500">I–vi–IV–V:</span> {selected.chords[0]} – {selected.chords[5]} – {selected.chords[3]} – {selected.chords[4]}</p>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                The key of {selected.name} Major contains {selected.chords.filter(c => !c.includes('m') && !c.includes('°')).length} major chords,
                {' '}{selected.chords.filter(c => c.includes('m') && !c.includes('°')).length} minor chords,
                {' '}and 1 diminished chord. Use the diatonic chords above to write songs or jam in this key.
              </p>
            </div>
          ) : (
            <div className="bg-[#12122a] border border-white/10 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">🎵</div>
              <h2 className="font-display text-xl font-bold text-white mb-2">Click a Key</h2>
              <p className="text-gray-400 text-sm">Select a key on the circle to see its diatonic chords, relative minor, and common progressions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
