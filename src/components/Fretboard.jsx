import { useState } from 'react'
import { Volume2, Eye, EyeOff } from 'lucide-react'
import { INSTRUMENTS, NOTE_NAMES, SCALES } from '../data/instruments'
import { useAudio } from '../hooks/useAudio'
import ProGate from './ProGate'

const MAX_FRETS = 15

export default function Fretboard({ addXP, navigate }) {
  const [instrument, setInstrument] = useState('guitar')
  const [rootNote, setRootNote] = useState(0)
  const [scale, setScale] = useState('Major')
  const [showLabels, setShowLabels] = useState(true)

  const { playNote } = useAudio()
  const inst = INSTRUMENTS[instrument]
  const scaleNotes = SCALES[scale].map(n => (n + rootNote) % 12)

  const width = 900
  const height = inst.strings * 30 + 60
  const fretWidth = (width - 60) / MAX_FRETS
  const stringSpacing = 28
  const topPad = 40
  const leftPad = 50

  const handleNoteClick = (midi, noteName) => {
    playNote(midi)
    addXP(1, 'Note played')
  }

  return (
    <ProGate navigateTo={navigate}>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Fretboard Explorer</h1>
          <p className="text-gray-400 mt-1">Visualize scales and notes on any instrument</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex gap-1 bg-[#12122a] border border-white/10 rounded-lg p-1">
            {Object.entries(INSTRUMENTS).map(([key, val]) => (
              <button key={key} onClick={() => setInstrument(key)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition ${instrument === key ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-white'}`}>
                {val.emoji} {val.name}
              </button>
            ))}
          </div>
          <select value={rootNote} onChange={e => setRootNote(Number(e.target.value))}
            className="bg-[#12122a] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-200 focus:outline-none focus:border-amber-500">
            {NOTE_NAMES.map((n, i) => <option key={i} value={i}>{n}</option>)}
          </select>
          <select value={scale} onChange={e => setScale(e.target.value)}
            className="bg-[#12122a] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-200 focus:outline-none focus:border-amber-500">
            {Object.keys(SCALES).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button onClick={() => setShowLabels(!showLabels)}
            className="flex items-center gap-1.5 bg-[#12122a] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300 hover:border-amber-500/40 transition">
            {showLabels ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {showLabels ? 'Labels On' : 'Labels Off'}
          </button>
        </div>

        <div className="bg-[#12122a] border border-white/10 rounded-2xl p-4 overflow-x-auto">
          <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="min-w-[800px]">
            <rect x={leftPad - 2} y={topPad - 5} width={4} height={inst.strings * stringSpacing - stringSpacing + 10} fill="#d4a037" rx={2} />
            {Array.from({ length: MAX_FRETS }, (_, f) => (
              <line key={f} x1={leftPad + (f + 1) * fretWidth} y1={topPad - 5} x2={leftPad + (f + 1) * fretWidth} y2={topPad + (inst.strings - 1) * stringSpacing + 5} stroke="#444" strokeWidth={1.5} />
            ))}
            {Array.from({ length: inst.strings }, (_, s) => (
              <line key={s} x1={leftPad} y1={topPad + s * stringSpacing} x2={width - 10} y2={topPad + s * stringSpacing} stroke="#888" strokeWidth={s < inst.strings / 2 ? 1 : 1.5} />
            ))}
            {inst.fretMarkers.filter(f => f <= MAX_FRETS).map(f => {
              const cx = leftPad + (f - 0.5) * fretWidth
              const cy = topPad + (inst.strings - 1) * stringSpacing + 20
              if (f === 12) {
                return <g key={f}>
                  <circle cx={cx - 6} cy={cy} r={3} fill="#555" />
                  <circle cx={cx + 6} cy={cy} r={3} fill="#555" />
                </g>
              }
              return <circle key={f} cx={cx} cy={cy} r={3} fill="#555" />
            })}
            {inst.fretMarkers.filter(f => f <= MAX_FRETS).map(f => (
              <text key={f} x={leftPad + (f - 0.5) * fretWidth} y={topPad + (inst.strings - 1) * stringSpacing + 38}
                textAnchor="middle" fill="#555" fontSize={10}>{f}</text>
            ))}
            {inst.tuning.map((t, s) => (
              <text key={s} x={leftPad - 20} y={topPad + s * stringSpacing + 4} textAnchor="middle" fill="#888" fontSize={11} fontWeight="500">{t}</text>
            ))}
            {inst.openMidi.map((openMidi, s) => (
              Array.from({ length: MAX_FRETS + 1 }, (_, f) => {
                const midi = openMidi + f
                const noteIdx = midi % 12
                const noteName = NOTE_NAMES[noteIdx]
                const isRoot = noteIdx === rootNote
                const isInScale = scaleNotes.includes(noteIdx)
                const cx = f === 0 ? leftPad - 8 : leftPad + (f - 0.5) * fretWidth
                const cy = topPad + s * stringSpacing
                if (!isInScale && f !== 0) return null
                return (
                  <g key={`${s}-${f}`} onClick={() => handleNoteClick(midi, noteName)} className="cursor-pointer">
                    <circle cx={cx} cy={cy} r={f === 0 ? 8 : 10}
                      fill={isRoot ? '#f59e0b' : isInScale ? '#3b82f6' : 'transparent'}
                      stroke={isRoot ? '#fbbf24' : isInScale ? '#60a5fa' : 'transparent'}
                      strokeWidth={1.5} opacity={isInScale ? 0.9 : 0.3}
                      className="hover:opacity-100 transition-opacity" />
                    {showLabels && isInScale && (
                      <text x={cx} y={cy + 4} textAnchor="middle" fill={isRoot ? '#000' : '#fff'} fontSize={9} fontWeight="bold">{noteName}</text>
                    )}
                  </g>
                )
              })
            ))}
          </svg>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-amber-500" />
            <span className="text-gray-400">Root ({NOTE_NAMES[rootNote]})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500" />
            <span className="text-gray-400">Scale Note</span>
          </div>
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-gray-500" />
            <span className="text-gray-400">Click any note to hear it</span>
          </div>
        </div>
      </div>
    </ProGate>
  )
}
