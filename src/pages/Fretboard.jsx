import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAudio } from '../hooks/useAudio';

const INSTRUMENTS = {
  Guitar: { strings: 6, frets: 24, openNotes: [40,45,50,55,59,64], labels: ['E2','A2','D3','G3','B3','E4'] },
  Banjo: { strings: 5, frets: 22, openNotes: [67,50,55,59,62], labels: ['g4','D3','G3','B3','D4'] },
  Mandolin: { strings: 4, frets: 20, openNotes: [55,62,69,76], labels: ['G3','D4','A4','E5'] },
};

const SCALES = {
  Major: [0,2,4,5,7,9,11],
  Minor: [0,2,3,5,7,8,10],
  'Pentatonic Major': [0,2,4,7,9],
  'Pentatonic Minor': [0,3,5,7,10],
  Blues: [0,3,5,6,7,10],
};

const KEYS = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const MARKER_FRETS = [3,5,7,9,12,15,17,19,21];

export default function Fretboard() {
  const { selectedInstrument, setSelectedInstrument, incrementFretboardClicks } = useApp();
  const { playNote } = useAudio();
  const [rootKey, setRootKey] = useState('G');
  const [scale, setScale] = useState('Major');
  const [showLabels, setShowLabels] = useState(true);
  const [lastPlayed, setLastPlayed] = useState(null);

  const inst = INSTRUMENTS[selectedInstrument];
  const rootMidi = 60 + KEYS.indexOf(rootKey);
  const scaleIntervals = SCALES[scale];
  const isInScale = (midi) => scaleIntervals.includes(((midi - rootMidi) % 12 + 12) % 12);
  const isRoot = (midi) => ((midi - rootMidi) % 12 + 12) % 12 === 0;
  const noteName = (midi) => NOTE_NAMES[midi % 12];

  const W = 900, H = 30 + inst.strings * 30 + 40;
  const LEFT = 55, RIGHT = W - 20;
  const FRET_W = (RIGHT - LEFT) / inst.frets;
  const TOP = 30, STR_GAP = 30;
  const stringY = (s) => TOP + s * STR_GAP;
  const fretX = (f) => LEFT + f * FRET_W;

  const handleFretClick = (sIdx, fret) => {
    const midi = inst.openNotes[sIdx] + fret;
    playNote(midi, 0.7);
    incrementFretboardClicks();
    setLastPlayed({ sIdx, fret, midi });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Fretboard Visualizer</h2>
      <p className="text-gray-400 mb-6">Click any fret position to hear the note. Select a scale to highlight positions.</p>
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex bg-gray-800 rounded-lg p-1">
          {Object.keys(INSTRUMENTS).map(i => (
            <button key={i} onClick={() => setSelectedInstrument(i)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${selectedInstrument === i ? 'bg-amber-400 text-gray-900' : 'text-gray-400 hover:text-white'}`}>{i}</button>
          ))}
        </div>
        <select value={rootKey} onChange={e => setRootKey(e.target.value)} className="bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-1.5 text-sm">
          {KEYS.map(k => <option key={k}>{k}</option>)}
        </select>
        <select value={scale} onChange={e => setScale(e.target.value)} className="bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-1.5 text-sm">
          {Object.keys(SCALES).map(s => <option key={s}>{s}</option>)}
        </select>
        <button onClick={() => setShowLabels(l => !l)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${showLabels ? 'border-amber-400 bg-amber-400/20 text-amber-400' : 'border-gray-600 text-gray-400 hover:text-white'}`}>
          {showLabels ? 'Hide Labels' : 'Show Labels'}
        </button>
      </div>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 500 }}>
          <rect x={LEFT} y={TOP - 14} width={RIGHT - LEFT} height={inst.strings * STR_GAP + 12} fill="#2d1b0e" rx="4" />
          {MARKER_FRETS.filter(f => f <= inst.frets).map(f => (
            <circle key={f} cx={fretX(f) - FRET_W/2} cy={TOP + (inst.strings-1)*STR_GAP/2 + STR_GAP/2} r={5} fill="#555" opacity={0.4} />
          ))}
          <rect x={LEFT-5} y={TOP-14} width={7} height={inst.strings*STR_GAP+12} fill="#e8e0c8" rx="1" />
          {Array.from({length:inst.frets},(_,f)=>(
            <line key={f} x1={fretX(f+1)} y1={TOP-14} x2={fretX(f+1)} y2={TOP+inst.strings*STR_GAP-STR_GAP/2+6} stroke="#888" strokeWidth={1} />
          ))}
          {Array.from({length:inst.strings},(_,s)=>(
            <line key={s} x1={LEFT-5} y1={stringY(s)} x2={RIGHT} y2={stringY(s)} stroke="#ccc" strokeWidth={1+(inst.strings-1-s)*0.3} opacity={0.7} />
          ))}
          {Array.from({length:inst.strings},(_,s)=>(
            <text key={s} x={LEFT-8} y={stringY(s)+4} textAnchor="end" fill="#aaa" fontSize={10}>{inst.labels[s]}</text>
          ))}
          {[1,3,5,7,9,12,15,17,19,21,24].filter(f=>f<=inst.frets).map(f=>(
            <text key={f} x={fretX(f)-FRET_W/2} y={TOP+inst.strings*STR_GAP+20} textAnchor="middle" fill="#666" fontSize={10}>{f}</text>
          ))}
          {Array.from({length:inst.strings},(_,s)=>
            Array.from({length:inst.frets+1},(_,f)=>{
              const midi = inst.openNotes[s]+f;
              const inScale = isInScale(midi);
              const root = isRoot(midi);
              const isActive = lastPlayed && lastPlayed.sIdx===s && lastPlayed.fret===f;
              const cx = f===0 ? LEFT-22 : fretX(f)-FRET_W/2;
              const cy = stringY(s);
              return (
                <g key={`${s}-${f}`} onClick={()=>handleFretClick(s,f)} style={{cursor:'pointer'}}>
                  <circle cx={cx} cy={cy} r={14} fill="transparent" />
                  {(inScale||isActive) && (
                    <circle cx={cx} cy={cy} r={11} fill={root?'#f59e0b':isActive?'#fbbf24':'#92400e'} stroke={root?'#fbbf24':'#b45309'} strokeWidth={1.5} />
                  )}
                  {showLabels && inScale && (
                    <text x={cx} y={cy+4} textAnchor="middle" fill={root?'#1f2937':'#fef3c7'} fontSize={8} fontWeight="bold" style={{pointerEvents:'none'}}>{noteName(midi)}</text>
                  )}
                </g>
              );
            })
          )}
        </svg>
      </div>
      {lastPlayed && (
        <div className="mt-4 text-center text-sm text-gray-400">
          Last played: <span className="text-amber-400 font-semibold">{NOTE_NAMES[lastPlayed.midi%12]}</span> (MIDI {lastPlayed.midi}, string {lastPlayed.sIdx+1}, fret {lastPlayed.fret})
        </div>
      )}
      <div className="flex gap-6 mt-4 text-xs text-gray-400">
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-400"></div>Root note</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{background:'#92400e'}}></div>Scale note</div>
      </div>
    </div>
  );
}
