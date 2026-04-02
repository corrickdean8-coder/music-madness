# 🎸 Music Madness — Folk & Bluegrass Theory Learning App

A Duolingo-style interactive music theory learning app for folk and bluegrass string instruments (Guitar, Banjo, Mandolin). Built with React + Vite + Tailwind CSS.

## ✨ Features

- **18 structured lessons** across Guitar, Banjo, and Mandolin (3 free + 3 Pro per instrument)
- **Interactive SVG Fretboard** — click any fret to hear the note, highlight scales by root and type
- **Chord Library** — SVG chord diagrams with audio playback for Guitar, Banjo, and Mandolin
- **Ear Training** — Identify intervals, chord qualities, and scales by ear
- **Circle of Fifths** — Clickable interactive SVG with diatonic chord display
- **Practice Tracker** — Log sessions, track weekly goals, earn XP
- **Songs Library** — 15 folk & bluegrass songs with chord charts
- **Artist Profiles** — 8 legendary folk/bluegrass musicians
- **Gamification** — XP system, 5 levels, 9 achievement badges, streak counter
- **Freemium model** — 3 free lessons + Pro subscription via PayPal ($9.99/mo or $79.99/yr)

## 🛠 Tech Stack

- **React 18** with hooks (useState, useEffect, useRef)
- **Vite** — fast build tooling
- **Tailwind CSS v3** — utility-first dark theme with amber/gold accents
- **lucide-react** — icons
- **Web Audio API** — real-time note and chord playback (no external audio files)
- **localStorage** — XP, progress, subscription state (no backend required)
- **Hash-based routing** — fully static, no React Router needed

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/corrickdean8-coder/music-madness.git
cd music-madness

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
src/
├── App.jsx              # Main app with hash-based routing
├── main.jsx
├── index.css            # Tailwind directives + Google Fonts
├── components/
│   ├── Layout.jsx       # Sidebar nav + top bar
│   ├── Dashboard.jsx    # Home: XP, level, instrument selector
│   ├── Lessons.jsx      # Lesson list (free/pro)
│   ├── LessonDetail.jsx # Learn → Practice → Quiz flow
│   ├── Fretboard.jsx    # Interactive SVG fretboard
│   ├── ChordLibrary.jsx # SVG chord diagrams + playback
│   ├── EarTraining.jsx  # Ear training exercises
│   ├── CircleOfFifths.jsx # Interactive circle SVG
│   ├── Pricing.jsx      # Free vs Pro cards + PayPal
│   ├── PracticeTracker.jsx # Session logging + stats
│   ├── Songs.jsx        # 15 song library
│   ├── Artists.jsx      # 8 artist profiles
│   ├── Achievements.jsx # Badge system
│   └── Toast.jsx        # XP/level notifications
├── hooks/
│   ├── useXP.js         # XP/level system
│   ├── useAudio.js      # Web Audio API helpers
│   └── usePro.js        # Pro subscription state
└── data/
    ├── lessons.js       # 18 full lessons with quizzes
    ├── chords.js        # Chord fingering data
    ├── songs.js         # 15 song entries
    ├── artists.js       # 8 artist profiles
    └── instruments.js   # Tunings, MIDI data, scales
```

## 🎵 Instruments

| Instrument | Strings | Tuning | Frets |
|------------|---------|--------|-------|
| Guitar | 6 | EADGBE | 24 |
| Banjo | 5 | gDGBD | 22 |
| Mandolin | 4 (courses) | GDAE | 20 |

## 💰 Subscription

Powered by PayPal. Business account: corrickdean8@gmail.com

- **Monthly**: $9.99/month
- **Annual**: $79.99/year (save 33%)

After subscribing, click "I've Subscribed — Unlock Pro" to activate Pro features locally.

## 🎮 XP & Levels

| Level | XP Required |
|-------|-------------|
| Beginner | 0 |
| Apprentice | 200 |
| Picker | 500 |
| Flatpicker | 1,000 |
| Master | 2,000 |

XP sources: Lessons (+50), Practice sessions (+15), Ear training (+10/correct), Notes played (+1), Chords played (+2).

## 🏆 Achievements

First Note · Chord Master · Ear Opener · 7-Day Streak · Theory Nerd · Circle Wizard · Picker · Pro Player · Completionist

## 📄 License

MIT License — feel free to fork and build on this.
