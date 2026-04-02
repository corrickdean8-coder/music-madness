import { useState, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { useAudio } from '../hooks/useAudio';
import { RefreshCw } from 'lucide-react';

const INTERVALS = [
  { name: 'Unison', semitones: 0 },
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
];

const CHORD_TYPES = [
  { name: 'Major', semitones: [0,4,7] },
  { name: 'Minor', semitones: [0,3,7] },
  { name: 'Dom7', semitones: [0,4,7,10] },
  { name: 'Diminished', semitones: [0,3,6] },
];

const SCALE_TYPES = [
  { name: 'Major', semitones: [0,2,4,5,7,9,11,12] },
  { name: 'Minor', semitones: [0,2,3,5,7,8,10,12] },
  { name: 'Pentatonic', semitones: [0,2,4,7,9,12] },
  { name: 'Blues', semitones: [0,3,5,6,7,10,12] },
];

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

export default function EarTraining() {
  const { addXP, incrementEarTraining } = useApp();
  const { playNote, playChord, playScale } = useAudio();
  const [exerciseType, setExerciseType] = useState('interval');
  const [difficulty, setDifficulty] = useState('easy');
  const [current, setCurrent] = useState(null);
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const generateAndPlay = useCallback(() => {
    setAnswered(null);
    const baseNote = 60 + Math.floor(Math.random() * 12);
    let correct, opts;

    if (exerciseType === 'interval') {
      const pool = difficulty === 'easy' ? INTERVALS.slice(0, 6) : INTERVALS;
      correct = rand(pool);
      opts = shuffle([correct, ...shuffle(pool.filter(i => i.name !== correct.name)).slice(0,3)]);
      setCurrent({ type: 'interval', correct, baseNote });
      setOptions(opts);
      playNote(baseNote, 0.6);
      setTimeout(() => playNote(baseNote + correct.semitones, 0.6), 800);
    } else if (exerciseType === 'chord') {
      correct = rand(CHORD_TYPES);
      setCurrent({ type: 'chord', correct, baseNote });
      setOptions(CHORD_TYPES);
      playChord(correct.semitones.map(s => baseNote + s), 1.5);
    } else {
      const pool = difficulty === 'easy' ? SCALE_TYPES.slice(0,2) : SCALE_TYPES;
      correct = rand(pool);
      opts = shuffle([correct, ...shuffle(pool.filter(s => s.name !== correct.name)).slice(0,3)]);
      setCurrent({ type: 'scale', correct, baseNote });
      setOptions(opts);
      playScale(correct.semitones.map(s => baseNote + s), 0.3);
    }
  }, [exerciseType, difficulty, playNote, playChord, playScale]);

  const replay = useCallback(() => {
    if (!current) return;
    const { type, correct, baseNote } = current;
    if (type === 'interval') { playNote(baseNote, 0.6); setTimeout(() => playNote(baseNote + correct.semitones, 0.6), 800); }
    else if (type === 'chord') { playChord(correct.semitones.map(s => baseNote + s), 1.5); }
    else { playScale(correct.semitones.map(s => baseNote + s), 0.3); }
  }, [current, playNote, playChord, playScale]);

  const handleAnswer = (option) => {
    if (answered !== null || !current) return;
    const isCorrect = option.name === current.correct.name;
    setAnswered({ selected: option.name, correct: current.correct.name, isCorrect });
    setScore(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));
    if (isCorrect) { addXP(10); incrementEarTraining(); }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Ear Training</h2>
      <p className="text-gray-400 mb-6">Train your musical ear with interval, chord, and scale recognition.</p>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex bg-gray-800 rounded-lg p-1">
          {[['interval','Intervals'],['chord','Chords'],['scale','Scales']].map(([id,label])=>(
            <button key={id} onClick={()=>{setExerciseType(id);setCurrent(null);setAnswered(null);}}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${exerciseType===id?'bg-amber-400 text-gray-900':'text-gray-400 hover:text-white'}`}>{label}</button>
          ))}
        </div>
        <div className="flex bg-gray-800 rounded-lg p-1">
          {['easy','hard'].map(d=>(
            <button key={d} onClick={()=>{setDifficulty(d);setCurrent(null);setAnswered(null);}}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${difficulty===d?'bg-amber-400 text-gray-900':'text-gray-400 hover:text-white'}`}>{d}</button>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-400 mb-5">Score: <span className="text-amber-400 font-semibold">{score.correct}/{score.total}</span> correct</div>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 text-center">
        {!current ? (
          <div>
            <p className="text-gray-400 mb-6">Press the button to start your first exercise</p>
            <button onClick={generateAndPlay} className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold px-8 py-3 rounded-xl transition-colors">Start Exercise</button>
          </div>
        ) : (
          <div>
            <p className="text-gray-500 text-xs mb-4 uppercase tracking-wide">
              {exerciseType==='interval'?'Identify the interval':exerciseType==='chord'?'Identify the chord quality':'Identify the scale'}
            </p>
            <button onClick={replay} className="flex items-center gap-2 mx-auto bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold px-8 py-3 rounded-xl transition-colors mb-6">
              <RefreshCw size={18} />Play Again
            </button>
            <div className="grid grid-cols-2 gap-3 text-left">
              {options.map(opt=>{
                let cls='w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all ';
                if(answered===null) cls+='border-gray-600 bg-gray-700 hover:border-amber-400 text-gray-200 cursor-pointer';
                else if(opt.name===current.correct.name) cls+='border-green-400 bg-green-400/20 text-green-300';
                else if(opt.name===answered.selected) cls+='border-red-400 bg-red-400/20 text-red-300';
                else cls+='border-gray-600 bg-gray-700 text-gray-400';
                return <button key={opt.name} onClick={()=>handleAnswer(opt)} className={cls} disabled={answered!==null}>{opt.name}</button>;
              })}
            </div>
            {answered && (
              <div>
                <div className={`mt-4 text-sm font-semibold ${answered.isCorrect?'text-green-400':'text-red-400'}`}>
                  {answered.isCorrect?'Correct! +10 XP':`That was ${answered.correct}`}
                </div>
                <button onClick={generateAndPlay} className="mt-3 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold px-6 py-2 rounded-xl transition-colors">Next Exercise</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
