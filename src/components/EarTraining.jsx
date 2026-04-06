import { useState, useCallback } from 'react'
import { Volume2, SkipForward, Star, RotateCcw } from 'lucide-react'
import { useAudio } from '../hooks/useAudio'
import ProGate from './ProGate'

const INTERVALS = [
  { name: 'Minor 2nd', semitones: 1 },
  { name: 'Major 2nd', semitones: 2 },
  { name: 'Minor 3rd', semitones: 3 },
  { name: 'Major 3rd', semitones: 4 },
  { name: 'Perfect 4th', semitones: 5 },
  { name: 'Tritone', semitones: 6 },
  { name: 'Perfect 5th', semitones: 7 },
  { name: 'Minor 6th', semitones: 8 },
  { name: 'Major 6th', semitones: 9 },
  { name: 'Minor 7th', semitones: 10 },
  { name: 'Major 7th', semitones: 11 },
  { name: 'Octave', semitones: 12 },
]

const CHORD_TYPES = [
  { name: 'Major', intervals: [0, 4, 7] },
  { name: 'Minor', intervals: [0, 3, 7] },
  { name: 'Diminished', intervals: [0, 3, 6] },
  { name: 'Augmented', intervals: [0, 4, 8] },
]

const MODES = ['intervals', 'chords']

function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)] }
function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a }

function generateQuestion(mode) {
  const baseMidi = 60 + Math.floor(Math.random() * 12)
  if (mode === 'intervals') {
    const correct = pickRandom(INTERVALS)
    const wrong = shuffle(INTERVALS.filter(i => i.name !== correct.name)).slice(0, 3)
    const options = shuffle([correct, ...wrong])
    return { correct: correct.name, options: options.map(o => o.name), midi1: baseMidi, midi2: baseMidi + correct.semitones, mode }
  } else {
    const correct = pickRandom(CHORD_TYPES)
    const wrong = CHORD_TYPES.filter(c => c.name !== correct.name)
    const options = shuffle([correct, ...wrong])
    return { correct: correct.name, options: options.map(o => o.name), midiNotes: correct.intervals.map(i => baseMidi + i), mode }
  }
}

export default function EarTraining({ addXP, isPro, navigate }) {
  const [mode, setMode] = useState('intervals')
  const [question, setQuestion] = useState(() => generateQuestion('intervals'))
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const { playInterval, playChord } = useAudio()

  const playSound = useCallback(() => {
    if (question.mode === 'intervals') {
      playInterval(question.midi1, question.midi2)
    } else {
      playChord(question.midiNotes)
    }
  }, [question, playInterval, playChord])

  const handleAnswer = (opt) => {
    if (selected !== null) return
    setSelected(opt)
    setTotal(t => t + 1)
    if (opt === question.correct) {
      setScore(s => s + 1)
      addXP(10, `Ear training: ${opt}`)
    }
  }

  const nextQuestion = () => {
    setQuestion(generateQuestion(mode))
    setSelected(null)
  }

  const changeMode = (newMode) => {
    setMode(newMode)
    setQuestion(generateQuestion(newMode))
    setSelected(null)
    setScore(0)
    setTotal(0)
  }

  return (
    <ProGate
      isPro={isPro}
      navigate={navigate}
      featureName="Ear Training"
      description="Train your ear to recognize musical intervals and chord patterns. An essential skill for any folk or bluegrass musician."
    >
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Ear Training</h1>
        <p className="text-gray-400 mt-1">Train your ear to recognize intervals and chords</p>
      </div>

      <div className="flex gap-2">
        {MODES.map(m => (
          <button key={m} onClick={() => changeMode(m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition capitalize
              ${mode === m ? 'bg-amber-500 text-black' : 'bg-[#12122a] border border-white/10 text-gray-300 hover:border-amber-500/40'}`}>
            {m}
          </button>
        ))}
      </div>

      <div className="bg-[#12122a] border border-white/10 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-amber-400" />
            <span className="text-gray-200 font-semibold">{score} / {total} correct</span>
          </div>
          <button onClick={() => { setScore(0); setTotal(0); nextQuestion() }}
            className="flex items-center gap-1.5 text-gray-400 hover:text-gray-200 text-sm transition">
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>

        <div className="text-center space-y-4">
          <p className="text-gray-300 text-lg font-medium">
            {question.mode === 'intervals' ? 'What interval is this?' : 'What chord quality is this?'}
          </p>
          <button onClick={playSound}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-3 rounded-xl text-lg transition active:scale-95">
            <Volume2 className="w-5 h-5" /> Play Sound
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {question.options.map(opt => {
            let cls = 'bg-[#1a1a35] border border-white/10 text-gray-300 hover:border-amber-500/40'
            if (selected !== null) {
              if (opt === question.correct) cls = 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
              else if (opt === selected) cls = 'bg-red-500/20 border-red-500 text-red-300'
            }
            return (
              <button key={opt} onClick={() => handleAnswer(opt)}
                className={`px-4 py-3 rounded-xl border transition-all font-medium text-sm ${cls}`}>
                {opt}
              </button>
            )
          })}
        </div>

        {selected !== null && (
          <div className="text-center">
            <p className={`font-semibold mb-3 ${selected === question.correct ? 'text-emerald-400' : 'text-red-400'}`}>
              {selected === question.correct ? '✅ Correct! +10 XP' : `❌ It was ${question.correct}`}
            </p>
            <button onClick={nextQuestion}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-2.5 rounded-lg transition">
              <SkipForward className="w-4 h-4" /> Next
            </button>
          </div>
        )}
      </div>
    </div>
    </ProGate>
  )
}
