import { useState } from 'react'
import { ChevronLeft, Star, Lock } from 'lucide-react'
import { useAudio } from '../hooks/useAudio'
import { usePro } from '../hooks/usePro'
import ProGate from './ProGate'

export default function LessonDetail({ lesson, navigate, addXP }) {
  const { isPro } = usePro()
  const [stage, setStage] = useState('content')
  const [quizIndex, setQuizIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const { playNote } = useAudio()

  if (!lesson) return <div className="text-gray-400 p-8">No lesson selected. <button className="text-amber-400 underline" onClick={() => navigate('lessons')}>Go to Lessons</button></div>

  if (!lesson.free && !isPro) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <button onClick={() => navigate('lessons')} className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition text-sm">
          <ChevronLeft className="w-4 h-4" /> Back to Lessons
        </button>
        <ProGate navigateTo={navigate}>
          <div className="bg-[#12122a] border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{lesson.instrument === 'guitar' ? '🎸' : lesson.instrument === 'banjo' ? '🪕' : '🎻'}</span>
                <div>
                  <h1 className="font-display text-2xl font-bold text-white">{lesson.title}</h1>
                  <p className="text-gray-400 text-sm capitalize">{lesson.instrument} · {lesson.xp} XP on completion</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-300 leading-relaxed">{lesson.description}</p>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 mt-4">
                <h3 className="font-semibold text-amber-400 mb-2">Instructions</h3>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{lesson.content.slice(0, 200)}...</p>
              </div>
            </div>
          </div>
        </ProGate>
      </div>
    )
  }

  const currentQ = lesson.quiz[quizIndex]
  const NOTE_NAMES = ['C','D','E','F','G','A','B','C\'']
  const NOTE_MIDI = [60,62,64,65,67,69,71,72]

  const handleAnswer = (idx) => {
    if (selected !== null) return
    setSelected(idx)
    if (idx === currentQ.answer) setScore(s => s + 1)
    setTimeout(() => {
      if (quizIndex < lesson.quiz.length - 1) { setQuizIndex(q => q + 1); setSelected(null) }
      else {
        setStage('done')
        const completed = JSON.parse(localStorage.getItem('mm_completed') || '[]')
        if (!completed.includes(lesson.id)) {
          localStorage.setItem('mm_completed', JSON.stringify([...completed, lesson.id]))
          addXP(lesson.xp, lesson.title)
        }
      }
    }, 1000)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button onClick={() => navigate('lessons')} className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition text-sm">
        <ChevronLeft className="w-4 h-4" /> Back to Lessons
      </button>
      <div className="bg-[#12122a] border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{lesson.instrument === 'guitar' ? '🎸' : lesson.instrument === 'banjo' ? '🪕' : '🎻'}</span>
            <div>
              <h1 className="font-display text-2xl font-bold text-white">{lesson.title}</h1>
              <p className="text-gray-400 text-sm capitalize">{lesson.instrument} · {lesson.xp} XP on completion</p>
            </div>
          </div>
        </div>
        <div className="flex border-b border-white/10">
          {['Learn','Practice','Quiz'].map((s, i) => {
            const stages = ['content','exercise','quiz']
            const active = stage === stages[i]
            const done = (stage === 'quiz' && i < 2) || (stage === 'done') || (stage === 'exercise' && i === 0)
            return (
              <div key={s} className={`flex-1 p-3 text-center text-sm font-medium transition
                ${active ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-500' : done ? 'text-emerald-400' : 'text-gray-600'}`}>
                {s}
              </div>
            )
          })}
        </div>
        <div className="p-6">
          {stage === 'content' && (
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">{lesson.description}</p>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="font-semibold text-amber-400 mb-2">Instructions</h3>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{lesson.content}</p>
              </div>
              <button onClick={() => setStage('exercise')} className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-xl transition">Continue to Practice →</button>
            </div>
          )}
          {stage === 'exercise' && (
            <div className="space-y-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="font-semibold text-amber-400 mb-2">Practice Exercise</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{lesson.exercise}</p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center py-4">
                {NOTE_MIDI.map((midi, i) => (
                  <button key={midi} onClick={() => playNote(midi)}
                    className="w-12 h-12 bg-amber-500/20 border border-amber-500/40 rounded-lg text-amber-300 font-semibold text-sm hover:bg-amber-500/40 transition active:scale-95">
                    {NOTE_NAMES[i]}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 text-center">Click notes to hear them (C Major scale)</p>
              <button onClick={() => setStage('quiz')} className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-xl transition">Take the Quiz →</button>
            </div>
          )}
          {stage === 'quiz' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-white">Question {quizIndex + 1} of {lesson.quiz.length}</h3>
                <div className="flex gap-1">
                  {lesson.quiz.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i < quizIndex ? 'bg-emerald-400' : i === quizIndex ? 'bg-amber-400' : 'bg-gray-700'}`} />
                  ))}
                </div>
              </div>
              <p className="text-gray-200 font-medium text-lg">{currentQ.question}</p>
              <div className="space-y-2">
                {currentQ.options.map((opt, i) => {
                  let cls = 'bg-[#1a1a35] border border-white/10 text-gray-300 hover:border-amber-500/40'
                  if (selected !== null) {
                    if (i === currentQ.answer) cls = 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    else if (i === selected) cls = 'bg-red-500/20 border-red-500 text-red-300'
                  }
                  return (
                    <button key={i} onClick={() => handleAnswer(i)}
                      className={`w-full text-left px-4 py-3 rounded-xl border transition-all font-medium ${cls}`}>
                      <span className="text-gray-500 mr-3">{String.fromCharCode(65+i)}.</span>{opt}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
          {stage === 'done' && (
            <div className="text-center py-6 space-y-4">
              <div className="text-6xl">🎉</div>
              <h2 className="font-display text-2xl font-bold text-white">Lesson Complete!</h2>
              <p className="text-gray-400">You scored {score} / {lesson.quiz.length} on the quiz</p>
              <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 text-amber-400 font-bold px-6 py-3 rounded-xl text-lg">
                <Star className="w-5 h-5" /> +{lesson.xp} XP Earned!
              </div>
              <div className="flex gap-3 justify-center mt-4">
                <button onClick={() => navigate('lessons')} className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-2.5 rounded-lg transition">More Lessons</button>
                <button onClick={() => navigate('dashboard')} className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-2.5 rounded-lg transition">Dashboard</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
