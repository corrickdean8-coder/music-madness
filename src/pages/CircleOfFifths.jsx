import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAudio } from '../hooks/useAudio';

const KEYS = [
  { major:'C', minor:'Am', rootMidi:60 },
  { major:'G', minor:'Em', rootMidi:67 },
  { major:'D', minor:'Bm', rootMidi:62 },
  { major:'A', minor:'F#m', rootMidi:69 },
  { major:'E', minor:'C#m', rootMidi:64 },
  { major:'B', minor:'G#m', rootMidi:71 },
  { major:'F#', minor:'D#m', rootMidi:66 },
  { major:'Db', minor:'Bbm', rootMidi:61 },
  { major:'Ab', minor:'Fm', rootMidi:68 },
  { major:'Eb', minor:'Cm', rootMidi:63 },
  { major:'Bb', minor:'Gm', rootMidi:70 },
  { major:'F', minor:'Dm', rootMidi:65 },
];

const DIATONIC = {
  C:['C','Dm','Em','F','G','Am','Bdim'],
  G:['G','Am','Bm','C','D','Em','F#dim'],
  D:['D','Em','F#m','G','A','Bm','C#dim'],
  A:['A','Bm','C#m','D','E','F#m','G#dim'],
  E:['E','F#m','G#m','A','B','C#m','D#dim'],
  B:['B','C#m','D#m','E','F#','G#m','A#dim'],
  'F#':['F#','G#m','A#m','B','C#','D#m','E#dim'],
  Db:['Db','Ebm','Fm','Gb','Ab','Bbm','Cdim'],
  Ab:['Ab','Bbm','Cm','Db','Eb','Fm','Gdim'],
  Eb:['Eb','Fm','Gm','Ab','Bb','Cm','Ddim'],
  Bb:['Bb','Cm','Dm','Eb','F','Gm','Adim'],
  F:['F','Gm','Am','Bb','C','Dm','Edim'],
};

const ROMAN = ['I','ii','iii','IV','V','vi','vii°'];
const SIZE = 560, CX = 280, CY = 280;
const OUTER_R = 200, INNER_R = 130, MINOR_R = 90;

export default function CircleOfFifths() {
  const { incrementCircleKeys } = useApp();
  const { playNote } = useAudio();
  const [selected, setSelected] = useState(null);
  const [exploredKeys, setExploredKeys] = useState(new Set());

  const handleSelect = (key, idx) => {
    setSelected(idx);
    playNote(key.rootMidi, 1.0);
    setExploredKeys(prev => {
      const next = new Set(prev).add(idx);
      incrementCircleKeys(next.size);
      return next;
    });
  };

  const segPath = (idx, r1, r2) => {
    const n = 12;
    const a1 = ((idx - 0.5) / n) * Math.PI * 2 - Math.PI / 2;
    const a2 = ((idx + 0.5) / n) * Math.PI * 2 - Math.PI / 2;
    const x1=CX+Math.cos(a1)*r1, y1=CY+Math.sin(a1)*r1;
    const x2=CX+Math.cos(a2)*r1, y2=CY+Math.sin(a2)*r1;
    const x3=CX+Math.cos(a2)*r2, y3=CY+Math.sin(a2)*r2;
    const x4=CX+Math.cos(a1)*r2, y4=CY+Math.sin(a1)*r2;
    return `M${x1},${y1} A${r1},${r1},0,0,1,${x2},${y2} L${x3},${y3} A${r2},${r2},0,0,0,${x4},${y4} Z`;
  };

  const textPos = (idx, r) => {
    const a = (idx / 12) * Math.PI * 2 - Math.PI / 2;
    return { x: CX + Math.cos(a) * r, y: CY + Math.sin(a) * r };
  };

  const selectedKey = selected !== null ? KEYS[selected] : null;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Circle of Fifths</h2>
      <p className="text-gray-400 mb-6">Click any segment to hear the root note and see diatonic chords.</p>
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-shrink-0">
          <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="max-w-full" style={{maxWidth:460}}>
            <circle cx={CX} cy={CY} r={OUTER_R+18} fill="#1f2937" />
            {KEYS.map((key,idx)=>{
              const isSel = selected === idx;
              const isExp = exploredKeys.has(idx);
              return (
                <g key={idx} onClick={()=>handleSelect(key,idx)} style={{cursor:'pointer'}}>
                  <path d={segPath(idx, INNER_R, OUTER_R)} fill={isSel?'#f59e0b':isExp?'#78350f':'#374151'} stroke="#1f2937" strokeWidth={2} />
                  <path d={segPath(idx, MINOR_R, INNER_R-4)} fill={isSel?'#d97706':isExp?'#4c1d95':'#1f2937'} stroke="#374151" strokeWidth={1} />
                  {(()=>{ const p=textPos(idx,(OUTER_R+INNER_R)/2); return <text x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" fill={isSel?'#1f2937':'#f3f4f6'} fontSize={15} fontWeight="bold">{key.major}</text>; })()}
                  {(()=>{ const p=textPos(idx,(INNER_R+MINOR_R)/2-2); return <text x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" fill={isSel?'#fef3c7':'#9ca3af'} fontSize={9}>{key.minor}</text>; })()}
                </g>
              );
            })}
            <circle cx={CX} cy={CY} r={MINOR_R-8} fill="#111827" />
            <text x={CX} y={CY-8} textAnchor="middle" fill="#6b7280" fontSize={11}>Circle of</text>
            <text x={CX} y={CY+8} textAnchor="middle" fill="#6b7280" fontSize={11}>Fifths</text>
            <text x={CX} y={CY+24} textAnchor="middle" fill="#4b5563" fontSize={9}>{exploredKeys.size}/12</text>
          </svg>
        </div>
        <div className="flex-1">
          {selectedKey ? (
            <div className="bg-gray-800 border border-amber-400/30 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-amber-400 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>{selectedKey.major} Major</h3>
              <p className="text-gray-400 text-sm mb-5">Relative minor: <span className="text-purple-400 font-medium">{selectedKey.minor}</span></p>
              <h4 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide">Diatonic Chords</h4>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {(DIATONIC[selectedKey.major]||[]).map((chord,i)=>(
                  <div key={i} className="text-center">
                    <div className="text-xs text-gray-500 mb-1">{ROMAN[i]}</div>
                    <div className={`px-1 py-1.5 rounded-lg text-xs font-semibold ${i===0||i===3||i===4?'bg-amber-400/20 text-amber-300':'bg-gray-700 text-gray-300'}`}>{chord}</div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-4">Keys explored: {exploredKeys.size}/12 {exploredKeys.size>=12&&'🎉 Circle Wizard!'}</div>
            </div>
          ) : (
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">⭕</div>
              <p className="text-gray-400">Click any segment to see key information and diatonic chords.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
