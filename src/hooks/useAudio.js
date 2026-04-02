import { useRef, useCallback } from 'react';

export function useAudio() {
  const audioCtxRef = useRef(null);

  const getCtx = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtxRef.current;
  };

  const midiToFreq = (midi) => 440 * Math.pow(2, (midi - 69) / 12);

  const playNote = useCallback((midiNote, duration = 0.5) => {
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(midiToFreq(midiNote), ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }, []);

  const playChord = useCallback((midiNotes, duration = 1.0) => {
    try {
      const ctx = getCtx();
      midiNotes.forEach((midi, i) => {
        setTimeout(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(midiToFreq(midi), ctx.currentTime);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + duration);
        }, i * 60);
      });
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }, []);

  const playScale = useCallback((midiNotes, noteDuration = 0.35) => {
    midiNotes.forEach((midi, i) => {
      setTimeout(() => playNote(midi, noteDuration), i * (noteDuration * 800));
    });
  }, [playNote]);

  return { playNote, playChord, playScale };
}
