import { useState } from 'react';
import { useApp } from '../context/AppContext';
import XPBar from './XPBar';
import { LayoutDashboard, BookOpen, Guitar, Music, Headphones, Circle, BarChart2, Music2, Users, CreditCard, Menu } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'lessons', label: 'Lessons', icon: BookOpen },
  { id: 'fretboard', label: 'Fretboard', icon: Guitar },
  { id: 'chords', label: 'Chords', icon: Music },
  { id: 'eartraining', label: 'Ear Training', icon: Headphones },
  { id: 'circle', label: 'Circle of 5ths', icon: Circle },
  { id: 'practice', label: 'Practice', icon: BarChart2 },
  { id: 'songs', label: 'Songs', icon: Music2 },
  { id: 'artists', label: 'Artists', icon: Users },
  { id: 'plans', label: 'Plans', icon: CreditCard },
];

const instEmoji = { Guitar: '🎸', Banjo: '🪕', Mandolin: '🎻' };

export default function Layout({ currentPage, setCurrentPage, children }) {
  const { xp, level, isPro, selectedInstrument } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-gray-700">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🎸</span>
          <h1 className="text-xl font-bold text-amber-400" style={{ fontFamily: 'Playfair Display, serif' }}>Music Madness</h1>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span>{instEmoji[selectedInstrument]}</span>
          <span className="text-sm text-gray-300">{selectedInstrument}</span>
          <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-semibold ${isPro ? 'bg-amber-400 text-gray-900' : 'bg-gray-600 text-gray-300'}`}>{isPro ? 'PRO' : 'FREE'}</span>
        </div>
        <XPBar />
        <div className="text-xs text-gray-500 mt-1">{level.name} · {xp} XP</div>
      </div>
      <nav className="flex-1 p-3 overflow-y-auto">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => { setCurrentPage(id); setMobileOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-all ${currentPage === id ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'}`}>
            <Icon size={17} />{label}
          </button>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <aside className="hidden md:flex flex-col w-60 bg-gray-800 border-r border-gray-700 flex-shrink-0"><SidebarContent /></aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-60 bg-gray-800 border-r border-gray-700 z-10"><SidebarContent /></aside>
        </div>
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-gray-800 border-b border-gray-700">
          <button onClick={() => setMobileOpen(true)} className="text-gray-400 hover:text-white"><Menu size={22} /></button>
          <span className="text-amber-400 font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Music Madness</span>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
