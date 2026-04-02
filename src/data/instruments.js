export const INSTRUMENTS = {
  guitar: { name: 'Guitar', emoji: '🎸', strings: 6, openMidi: [40,45,50,55,59,64], tuning: ['E','A','D','G','B','e'], frets: 24, fretMarkers: [3,5,7,9,12,15,17,19,21,24], color: '#f59e0b' },
  banjo: { name: 'Banjo', emoji: '🪕', strings: 5, openMidi: [67,50,55,59,62], tuning: ['g','D','G','B','D'], frets: 22, fretMarkers: [3,5,7,9,12,15,17,19], color: '#8b5cf6' },
  mandolin: { name: 'Mandolin', emoji: '🎻', strings: 4, openMidi: [55,62,69,76], tuning: ['G','D','A','E'], frets: 20, fretMarkers: [3,5,7,10,12,15,17], color: '#10b981' },
}

export const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']

export const SCALES = {
  Major: [0,2,4,5,7,9,11],
  Minor: [0,2,3,5,7,8,10],
  Pentatonic: [0,2,4,7,9],
  Blues: [0,3,5,6,7,10],
}
