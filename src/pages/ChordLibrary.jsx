import { useApp } from '../context/AppContext';
import { useAudio } from '../hooks/useAudio';
import { Play } from 'lucide-react';

const CHORD_MIDI = {
  Guitar: { openNotes: [40,45,50,55,59,64], strings: 6 },
  Banjo: { openNotes: [67,50,55,59,62], strings: 5 },
  Mandolin: { openNotes: [55,62,69,76], strings: 4 },
};

const chords = {
  Guitar: [
    { name:'G', fingers:[{s:6,f:3},{s:5,f:2},{s:1,f:3}], open:[4,3,2], muted:[] },
    { name:'D', fingers:[{s:3,f:2},{s:2,f:3},{s:1,f:2}], open:[4], muted:[6,5] },
    { name:'C', fingers:[{s:5,f:3},{s:4,f:2},{s:2,f:1}], open:[3,1], muted:[6] },
    { name:'Am', fingers:[{s:4,f:2},{s:3,f:2},{s:2,f:1}], open:[5,1], muted:[6] },
    { name:'Em', fingers:[{s:5,f:2},{s:4,f:2}], open:[6,3,2,1], muted:[] },
    { name:'E7', fingers:[{s:5,f:2},{s:3,f:1}], open:[6,4,2,1], muted:[] },
    { name:'F', fingers:[{s:1,f:1,barre:true},{s:2,f:1,barre:true},{s:3,f:2},{s:4,f:3},{s:5,f:3}], open:[], muted:[6] },
    { name:'G7', fingers:[{s:6,f:3},{s:5,f:2},{s:1,f:1}], open:[4,3,2], muted:[] },
  ],
  Banjo: [
    { name:'G', fingers:[], open:[5,4,3,2,1], muted:[] },
    { name:'D', fingers:[{s:3,f:2},{s:2,f:3},{s:1,f:2}], open:[5,4], muted:[] },
    { name:'C', fingers:[{s:4,f:2},{s:2,f:1},{s:1,f:2}], open:[5,3], muted:[] },
    { name:'Em', fingers:[{s:3,f:2}], open:[5,4,2,1], muted:[] },
    { name:'Am', fingers:[{s:4,f:2},{s:3,f:2},{s:2,f:1}], open:[5,1], muted:[] },
    { name:'F', fingers:[{s:4,f:3},{s:3,f:2},{s:2,f:1},{s:1,f:1}], open:[5], muted:[] },
  ],
  Mandolin: [
    { name:'G', fingers:[{s:3,f:2}], open:[4,2,1], muted:[] },
    { name:'D', fingers:[{s:3,f:4},{s:2,f:3}], open:[4,1], muted:[] },
    { name:'A', fingers:[{s:3,f:2},{s:2,f:2}], open:[4,1], muted:[] },
    { name:'Em', fingers:[{s:2,f:2}], open:[4,3,1], muted:[] },
    { name:'C', fingers:[{s:4,f:3},{s:3,f:2},{s:2,f:1}], open:[1], muted:[] },
    { name:'Am', fingers:[{s:3,f:2},{s:2,f:1}], open:[4,1], muted:[] },
  ],
};

function ChordDiagram({ chord, instrument, onPlay }) {
  const numStrings = CHORD_MIDI[instrument].strings;
  const openNotes = CHORD_MIDI[instrument].openNotes;
  const W = 130, H = 155, PAD = 20, FRETS_SHOWN = 5;
  const strGap = numStrings > 1 ? (W-PAD*2)/(numStrings-1) : W/2;
  const fretGap = (H-55)/FRETS_SHOWN;
  const allFrets = chord.fingers.filter(f=>f.f>0).map(f=>f.f);
  const startFret = allFrets.length > 0 ? Math.min(...allFrets) : 1;
  const strX = (s) => PAD+(s-1)*strGap;
  const getMidi = () => {
    const notes = [];
    for (let s=1;s<=numStrings;s++) {
      if (chord.muted.includes(s)) continue;
      const finger = chord.fingers.find(f=>f.s===s);
      if (finger) notes.push(openNotes[s-1]+finger.f);
      else if (chord.open.includes(s)) notes.push(openNotes[s-1]);
    }
    return notes;
  };
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex flex-col items-center hover:border-amber-400/40 transition-all">
      <div className="text-white font-bold text-lg mb-1">{chord.name}</div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {Array.from({length:numStrings},(_,i)=>{
          const s=i+1;
          const isMuted=chord.muted.includes(s);
          const isOpen=chord.open.includes(s)||(!chord.muted.includes(s)&&!chord.fingers.find(f=>f.s===s&&f.f>0));
          return <text key={s} x={strX(s)} y={13} textAnchor="middle" fontSize={11} fill={isMuted?'#ef4444':'#22c55e'}>{isMuted?'✕':isOpen?'○':''}</text>;
        })}
        {startFret===1
          ? <rect x={PAD-2} y={31} width={W-PAD*2+4} height={4} fill="#e8e0c8" />
          : <text x={W-6} y={36+fretGap/2} fontSize={9} fill="#aaa" textAnchor="end">{startFret}fr</text>}
        {Array.from({length:FRETS_SHOWN},(_,i)=>(
          <line key={i} x1={PAD} y1={35+i*fretGap} x2={W-PAD} y2={35+i*fretGap} stroke="#555" strokeWidth={1} />
        ))}
        {Array.from({length:numStrings},(_,i)=>(
          <line key={i} x1={strX(i+1)} y1={35} x2={strX(i+1)} y2={35+FRETS_SHOWN*fretGap} stroke="#888" strokeWidth={1} />
        ))}
        {chord.fingers.filter(f=>f.f>0).map((f,i)=>(
          <circle key={i} cx={strX(f.s)} cy={35+(f.f-startFret+0.5)*fretGap} r={9} fill="#f59e0b" />
        ))}
      </svg>
      <button onClick={()=>onPlay(getMidi())} className="mt-2 flex items-center gap-1 text-xs bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold px-4 py-1.5 rounded-full transition-colors">
        <Play size={12} />Play
      </button>
    </div>
  );
}

export default function ChordLibrary() {
  const { selectedInstrument, setSelectedInstrument, incrementChordsPlayed } = useApp();
  const { playChord } = useAudio();
  const handlePlay = (midiNotes) => { if(midiNotes.length>0){ playChord(midiNotes, 1.5); incrementChordsPlayed(); } };
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Chord Library</h2>
      <p className="text-gray-400 mb-6">Click Play to hear each chord via Web Audio API.</p>
      <div className="flex bg-gray-800 rounded-lg p-1 mb-6 w-fit">
        {Object.keys(chords).map(inst=>(
          <button key={inst} onClick={()=>setSelectedInstrument(inst)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${selectedInstrument===inst?'bg-amber-400 text-gray-900':'text-gray-400 hover:text-white'}`}>{inst}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {(chords[selectedInstrument]||[]).map(chord=>(
          <ChordDiagram key={chord.name} chord={chord} instrument={selectedInstrument} onPlay={handlePlay} />
        ))}
      </div>
    </div>
  );
}
