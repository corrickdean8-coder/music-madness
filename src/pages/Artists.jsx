const artists = [
  { name:'Bill Monroe', instrument:'Mandolin', era:'1930s–1990s', known:'Father of Bluegrass', bio:'Founded the Blue Grass Boys and created the bluegrass style. His mandolin playing set the standard for generations of musicians.' },
  { name:'Chris Thile', instrument:'Mandolin', era:'2000s–present', known:'Modern virtuoso', bio:"Nickel Creek founder, NPR's Live From Here host, and MacArthur Fellow. Pushed mandolin into jazz, classical, and folk-rock." },
  { name:'Earl Scruggs', instrument:'Banjo', era:'1940s–2000s', known:'Three-finger roll pioneer', bio:'Revolutionized banjo picking with his signature three-finger style, permanently defining the sound of bluegrass music.' },
  { name:'Béla Fleck', instrument:'Banjo', era:'1980s–present', known:'Genre-defying banjo', bio:'Multiple Grammy winner who pushed banjo into jazz, classical, and world music. One of the most innovative instrumentalists alive.' },
  { name:'Doc Watson', instrument:'Guitar', era:'1960s–2000s', known:'Flatpicking legend', bio:'Blind guitarist who defined flatpicking and Americana music. His lightning-fast single-note runs influenced countless guitarists.' },
  { name:'Robert Johnson', instrument:'Guitar', era:'1930s', known:'Delta blues pioneer', bio:'Legendary blues guitarist whose 29 known recordings influenced rock, folk, and country. His mythology shaped music history.' },
  { name:'Pete Seeger', instrument:'Banjo', era:'1940s–2000s', known:'Folk revival icon', bio:'Political folk singer who popularized the five-string banjo and inspired the American folk revival of the 1950s and 60s.' },
  { name:'Clarence White', instrument:'Guitar', era:'1960s–1970s', known:'Country-rock pioneer', bio:'Kentucky Colonels and Byrds guitarist who pioneered B-bender technique and helped create the country-rock sound.' },
];

const instGrad = {
  Mandolin: { from:'from-purple-900/60', to:'to-purple-800/30', border:'border-purple-700/50', badge:'text-purple-300 bg-purple-900/50' },
  Banjo: { from:'from-amber-900/60', to:'to-amber-800/30', border:'border-amber-700/50', badge:'text-amber-300 bg-amber-900/50' },
  Guitar: { from:'from-blue-900/60', to:'to-blue-800/30', border:'border-blue-700/50', badge:'text-blue-300 bg-blue-900/50' },
};

const instEmoji = { Guitar:'🎸', Banjo:'🪕', Mandolin:'🎻' };

export default function Artists() {
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Artist Profiles</h2>
      <p className="text-gray-400 mb-6">Legends of folk, bluegrass, and Americana music.</p>
      <div className="grid md:grid-cols-2 gap-5">
        {artists.map(artist=>{
          const g = instGrad[artist.instrument];
          return (
            <div key={artist.name} className={`bg-gradient-to-br ${g.from} ${g.to} border ${g.border} rounded-2xl overflow-hidden`}>
              <div className={`px-5 py-4 bg-gradient-to-r ${g.from} ${g.to}`}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{instEmoji[artist.instrument]}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>{artist.name}</h3>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${g.badge}`}>{artist.instrument}</span>
                  </div>
                </div>
              </div>
              <div className="px-5 py-4">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-xs bg-gray-700/80 text-gray-300 px-2 py-1 rounded">{artist.era}</span>
                  <span className="text-xs text-gray-400 italic">{artist.known}</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{artist.bio}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
