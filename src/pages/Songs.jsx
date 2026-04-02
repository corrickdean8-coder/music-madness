import { useState } from 'react';

const songs = [
  { id:'s1', title:'Wagon Wheel', artist:'Old Crow Medicine Show', instrument:'Guitar', difficulty:'Beginner', key:'A', chords:['A','E','F#m','D'] },
  { id:'s2', title:'Country Roads', artist:'John Denver', instrument:'Guitar', difficulty:'Beginner', key:'G', chords:['G','D','Em','C'] },
  { id:'s3', title:"Knockin' on Heaven's Door", artist:'Bob Dylan', instrument:'Guitar', difficulty:'Beginner', key:'G', chords:['G','D','Am','C'] },
  { id:'s4', title:'Blackbird', artist:'Beatles', instrument:'Guitar', difficulty:'Intermediate', key:'G', chords:['G','Am','C','D'] },
  { id:'s5', title:'Freight Train', artist:'Elizabeth Cotten', instrument:'Guitar', difficulty:'Intermediate', key:'C', chords:['C','G7','E7','Am'] },
  { id:'s6', title:'Foggy Mountain Breakdown', artist:'Flatt & Scruggs', instrument:'Banjo', difficulty:'Advanced', key:'G', chords:['G','D','C'] },
  { id:'s7', title:'Cripple Creek', artist:'Traditional', instrument:'Banjo', difficulty:'Beginner', key:'A', chords:['A','D','E'] },
  { id:'s8', title:'Old Joe Clark', artist:'Traditional', instrument:'Banjo', difficulty:'Intermediate', key:'A', chords:['A','G'] },
  { id:'s9', title:'Ashokan Farewell', artist:'Jay Ungar', instrument:'Mandolin', difficulty:'Intermediate', key:'D', chords:['D','G','A'] },
  { id:'s10', title:'Man of Constant Sorrow', artist:'Traditional', instrument:'Mandolin', difficulty:'Beginner', key:'G', chords:['G','C','D'] },
  { id:'s11', title:'Jerusalem Ridge', artist:'Bill Monroe', instrument:'Mandolin', difficulty:'Advanced', key:'Am', chords:['Am','G','E'] },
  { id:'s12', title:'Will the Circle Be Unbroken', artist:'Traditional', instrument:'Multi', difficulty:'Beginner', key:'G', chords:['G','C','D'] },
  { id:'s13', title:'Rocky Top', artist:'Osborne Brothers', instrument:'Multi', difficulty:'Beginner', key:'G', chords:['G','C','D','Am'] },
  { id:'s14', title:"I'll Fly Away", artist:'Albert E. Brumley', instrument:'Multi', difficulty:'Beginner', key:'G', chords:['G','C','D'] },
  { id:'s15', title:'Nine Pound Hammer', artist:'Traditional', instrument:'Multi', difficulty:'Intermediate', key:'G', chords:['G','C','D'] },
];

const diffColors = {
  Beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  Intermediate: 'bg-amber-400/20 text-amber-400 border-amber-400/30',
  Advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const instEmoji = { Guitar:'🎸', Banjo:'🪕', Mandolin:'🎻', Multi:'🎼' };

export default function Songs() {
  const [filterInst, setFilterInst] = useState('All');
  const [filterDiff, setFilterDiff] = useState('All');
  const filtered = songs.filter(s => (filterInst==='All'||s.instrument===filterInst) && (filterDiff==='All'||s.difficulty===filterDiff));
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Song Library</h2>
      <p className="text-gray-400 mb-6">15 folk and bluegrass songs across Guitar, Banjo, and Mandolin.</p>
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex bg-gray-800 rounded-lg p-1">
          {['All','Guitar','Banjo','Mandolin','Multi'].map(f=>(
            <button key={f} onClick={()=>setFilterInst(f)} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${filterInst===f?'bg-amber-400 text-gray-900':'text-gray-400 hover:text-white'}`}>{f}</button>
          ))}
        </div>
        <div className="flex bg-gray-800 rounded-lg p-1">
          {['All','Beginner','Intermediate','Advanced'].map(f=>(
            <button key={f} onClick={()=>setFilterDiff(f)} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${filterDiff===f?'bg-amber-400 text-gray-900':'text-gray-400 hover:text-white'}`}>{f}</button>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map(song=>(
          <div key={song.id} className="bg-gray-800 border border-gray-700 hover:border-amber-400/30 rounded-xl p-4 transition-all">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{instEmoji[song.instrument]}</span>
                  <h3 className="font-semibold text-white">{song.title}</h3>
                </div>
                <p className="text-sm text-gray-400 mt-0.5">{song.artist}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full border font-medium ${diffColors[song.difficulty]}`}>{song.difficulty}</span>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">Key of {song.key}</span>
              <div className="flex flex-wrap gap-1">
                {song.chords.map(c=>(
                  <span key={c} className="text-xs bg-amber-400/10 text-amber-400 px-2 py-0.5 rounded border border-amber-400/20">{c}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
