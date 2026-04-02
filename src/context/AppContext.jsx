import { createContext, useContext, useState, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AppContext = createContext(null);

const LEVEL_THRESHOLDS = [
  { name: 'Beginner', min: 0, max: 199 },
  { name: 'Apprentice', min: 200, max: 499 },
  { name: 'Picker', min: 500, max: 999 },
  { name: 'Flatpicker', min: 1000, max: 1999 },
  { name: 'Master', min: 2000, max: Infinity },
];

function getLevel(xp) {
  return LEVEL_THRESHOLDS.find(l => xp >= l.min && xp <= l.max) || LEVEL_THRESHOLDS[0];
}

export const achievementDefs = [
  { id: 'first_note', name: 'First Note', icon: '🎵', description: 'Play your first note on the fretboard' },
  { id: 'chord_master', name: 'Chord Master', icon: '🎸', description: 'Play 10 different chords' },
  { id: 'ear_opener', name: 'Ear Opener', icon: '👂', description: 'Complete 5 ear training exercises' },
  { id: 'streak_7', name: '7-Day Streak', icon: '🔥', description: 'Practice 7 days in a row' },
  { id: 'theory_nerd', name: 'Theory Nerd', icon: '📚', description: 'Complete 5 lessons' },
  { id: 'circle_wizard', name: 'Circle Wizard', icon: '⭕', description: 'Explore all 12 keys in the Circle of Fifths' },
];

export function AppProvider({ children }) {
  const [xp, setXp] = useLocalStorage('mm_xp', 0);
  const [streak] = useLocalStorage('mm_streak', 1);
  const [isPro, setIsProRaw] = useLocalStorage('mm_isPro', false);
  const [selectedInstrument, setSelectedInstrument] = useLocalStorage('mm_instrument', 'Guitar');
  const [completedLessons, setCompletedLessons] = useLocalStorage('mm_completedLessons', []);
  const [achievements, setAchievements] = useLocalStorage('mm_achievements', []);
  const [practiceLog, setPracticeLog] = useLocalStorage('mm_practiceLog', []);
  const [fretboardClicks, setFretboardClicks] = useLocalStorage('mm_fretboardClicks', 0);
  const [chordsPlayed, setChordsPlayed] = useLocalStorage('mm_chordsPlayed', 0);
  const [earTrainingCompleted, setEarTrainingCompleted] = useLocalStorage('mm_earTraining', 0);
  const [circleKeysExplored, setCircleKeysExplored] = useLocalStorage('mm_circleKeys', 0);
  const [toasts, setToasts] = useState([]);

  const level = getLevel(xp);
  const nextLevel = LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.indexOf(level) + 1];

  const showToast = useCallback((message) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  const checkAchievements = useCallback((state) => {
    const checks = [
      { id: 'first_note', condition: state.fretboardClicks >= 1 },
      { id: 'chord_master', condition: state.chordsPlayed >= 10 },
      { id: 'ear_opener', condition: state.earTrainingCompleted >= 5 },
      { id: 'streak_7', condition: state.streak >= 7 },
      { id: 'theory_nerd', condition: state.completedLessons.length >= 5 },
      { id: 'circle_wizard', condition: state.circleKeysExplored >= 12 },
    ];
    checks.forEach(({ id, condition }) => {
      if (condition && !state.achievements.includes(id)) {
        const def = achievementDefs.find(a => a.id === id);
        setAchievements(prev => [...prev, id]);
        if (def) showToast(`Achievement Unlocked: ${def.name} ${def.icon}`);
      }
    });
  }, [setAchievements, showToast]);

  const addXP = useCallback((amount) => {
    setXp(prev => { showToast(`+${amount} XP`); return prev + amount; });
  }, [setXp, showToast]);

  const completeLesson = useCallback((id) => {
    setCompletedLessons(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      checkAchievements({ fretboardClicks, chordsPlayed, earTrainingCompleted, streak, completedLessons: next, achievements, circleKeysExplored });
      return next;
    });
  }, [setCompletedLessons, checkAchievements, fretboardClicks, chordsPlayed, earTrainingCompleted, streak, achievements, circleKeysExplored]);

  const logPractice = useCallback((session) => {
    setPracticeLog(prev => [...prev, { ...session, date: new Date().toISOString() }]);
  }, [setPracticeLog]);

  const setIsPro = useCallback((val) => {
    setIsProRaw(val);
    if (val) showToast('🎉 Pro Unlocked! All features available.');
  }, [setIsProRaw, showToast]);

  const incrementFretboardClicks = useCallback(() => {
    setFretboardClicks(prev => {
      const next = prev + 1;
      checkAchievements({ fretboardClicks: next, chordsPlayed, earTrainingCompleted, streak, completedLessons, achievements, circleKeysExplored });
      return next;
    });
  }, [setFretboardClicks, checkAchievements, chordsPlayed, earTrainingCompleted, streak, completedLessons, achievements, circleKeysExplored]);

  const incrementChordsPlayed = useCallback(() => {
    setChordsPlayed(prev => {
      const next = prev + 1;
      checkAchievements({ fretboardClicks, chordsPlayed: next, earTrainingCompleted, streak, completedLessons, achievements, circleKeysExplored });
      return next;
    });
  }, [setChordsPlayed, checkAchievements, fretboardClicks, earTrainingCompleted, streak, completedLessons, achievements, circleKeysExplored]);

  const incrementEarTraining = useCallback(() => {
    setEarTrainingCompleted(prev => {
      const next = prev + 1;
      checkAchievements({ fretboardClicks, chordsPlayed, earTrainingCompleted: next, streak, completedLessons, achievements, circleKeysExplored });
      return next;
    });
  }, [setEarTrainingCompleted, checkAchievements, fretboardClicks, chordsPlayed, streak, completedLessons, achievements, circleKeysExplored]);

  const incrementCircleKeys = useCallback((count) => {
    setCircleKeysExplored(prev => {
      const next = Math.max(prev, count);
      checkAchievements({ fretboardClicks, chordsPlayed, earTrainingCompleted, streak, completedLessons, achievements, circleKeysExplored: next });
      return next;
    });
  }, [setCircleKeysExplored, checkAchievements, fretboardClicks, chordsPlayed, earTrainingCompleted, streak, completedLessons, achievements]);

  return (
    <AppContext.Provider value={{
      xp, level, nextLevel, streak, isPro, selectedInstrument, setSelectedInstrument,
      completedLessons, achievements, practiceLog, toasts, LEVEL_THRESHOLDS, achievementDefs,
      addXP, completeLesson, logPractice, setIsPro,
      incrementFretboardClicks, incrementChordsPlayed, incrementEarTraining, incrementCircleKeys,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
