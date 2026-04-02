import { ARTISTS } from '../data/artists'

const INST_EMOJI = { Mandolin: '🎻', Banjo: '🪕', Guitar: '🎸', 'Guitar & Banjo': '🎸🪕' }

export default function Artists() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Legendary Artists</h1>
        <p className="text-gray-400 mt-1">The musicians who shaped folk & bluegrass</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ARTISTS.map(artist => (
          <div key={artist.id} className="bg-[#12122a] border border-white/10 rounded-xl p-5 hover:border-amber-500/30 transition">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-3xl">{INST_EMOJI[artist.instrument] || '🎵'}</span>
              <div>
                <h3 className="font-display text-lg font-bold text-white">{artist.name}</h3>
                <p className="text-sm text-gray-500">{artist.instrument} · {artist.years}</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{artist.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {artist.tags.map(tag => (
                <span key={tag} className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
