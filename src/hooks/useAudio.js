import { useRef } from 'react'

export function useAudio() {
  const ctxRef = useRef(null)

  const getCtx = () => {
    if (!ctxRef.current) ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    return ctxRef.current
  }

  const midiToFreq = (midi) => 440 * Math.pow(2, (midi - 69) / 12)

  const playNote = (midi, duration = 1.5, startTime = 0) => {
    const ctx = getCtx()
    const t = ctx.currentTime + startTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination)
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(midiToFreq(midi), t)
    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(0.3, t + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration)
    osc.start(t); osc.stop(t + duration)
  }

  const playChord = (midiNotes, strumDelay = 0.05) => midiNotes.forEach((midi, i) => playNote(midi, 2, i * strumDelay))
  const playInterval = (midi1, midi2) => { playNote(midi1, 1.5, 0); playNote(midi2, 1.5, 0.6) }

  return { playNote, playChord, playInterval, midiToFreq }
}
