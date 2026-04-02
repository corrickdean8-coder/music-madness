import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Toast from './components/Toast';
import Dashboard from './pages/Dashboard';
import Lessons from './pages/Lessons';
import Fretboard from './pages/Fretboard';
import ChordLibrary from './pages/ChordLibrary';
import EarTraining from './pages/EarTraining';
import CircleOfFifths from './pages/CircleOfFifths';
import Plans from './pages/Plans';
import PracticeTracker from './pages/PracticeTracker';
import Songs from './pages/Songs';
import Artists from './pages/Artists';

function AppInner() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const pages = {
    dashboard: <Dashboard setCurrentPage={setCurrentPage} />,
    lessons: <Lessons setCurrentPage={setCurrentPage} />,
    fretboard: <Fretboard />,
    chords: <ChordLibrary />,
    eartraining: <EarTraining />,
    circle: <CircleOfFifths />,
    practice: <PracticeTracker />,
    songs: <Songs />,
    artists: <Artists />,
    plans: <Plans />,
  };

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {pages[currentPage] || pages.dashboard}
      <Toast />
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
