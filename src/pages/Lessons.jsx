import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, CheckCircle, ChevronRight, X } from 'lucide-react';

const lessons = {
  Guitar: [
    { id:'g1', title:'G Major Chord', free:true, xp:50, description:'The G major chord is one of the most important chords in folk and bluegrass. It uses three fingers and resonates across all 6 strings.', exercise:'Place your middle finger on string 6 fret 3, index on string 5 fret 2, ring on string 1 fret 3. Strum all 6 strings.', quiz:[{q:'How many strings does a guitar have?',options:['4','5','6','7'],answer:2},{q:'G chord open strings include?',options:['Only 1','Strings 4,3,2','No open strings','Only string 6'],answer:1},{q:'Standard guitar tuning?',options:['GDAE','EADGBE','gDGBD','CGDA'],answer:1}] },
    { id:'g2', title:'D Major Chord', free:true, xp:50, description:'The D chord is played on the top 4 strings and is essential for countless folk songs. It has a bright, ringing quality.', exercise:'Mute strings 6 and 5. Index on string 3 fret 2, middle on string 1 fret 2, ring on string 2 fret 3. Strum strings 4-1.', quiz:[{q:'D chord uses how many strings?',options:['6','5','4','3'],answer:2},{q:'Which strings are muted in D?',options:['1 and 2','5 and 6','3 and 4','None'],answer:1},{q:'D major contains?',options:['D F A','D F# A','D G A','D E A'],answer:1}] },
    { id:'g3', title:'Travis Picking', free:true, xp:50, description:'Travis picking is a fingerstyle pattern named after Merle Travis. The thumb alternates between bass strings while fingers pick melody notes.', exercise:'On G chord: thumb alternates strings 6 and 4, index picks string 3, middle picks string 2, ring picks string 1. Practice slowly.', quiz:[{q:'Travis picking is named after?',options:['Randy Travis','Merle Travis','Doc Travis','Bob Travis'],answer:1},{q:'Which finger plays bass strings?',options:['Index','Middle','Thumb','Ring'],answer:2},{q:'Travis picking is what style?',options:['Flatpicking','Strumming','Fingerstyle','Clawhammer'],answer:2}] },
    { id:'g4', title:'C Major & Am', free:false, xp:75, description:'C major and A minor share two fingers and form the backbone of hundreds of folk songs with G and D.', exercise:'C chord: ring on string 5 fret 3, middle on string 4 fret 2, index on string 2 fret 1. Am: ring on string 4 fret 2, middle on string 3 fret 2, index on string 2 fret 1.', quiz:[{q:'Am is relative minor of?',options:['G major','D major','C major','F major'],answer:2},{q:'How many notes in a major chord?',options:['2','3','4','5'],answer:1},{q:'C major scale has how many sharps?',options:['0','1','2','3'],answer:0}] },
    { id:'g5', title:'Flatpicking Basics', free:false, xp:75, description:'Flatpicking uses a plectrum to play single-note melodies. Made famous by Doc Watson, it is central to bluegrass guitar.', exercise:'Hold pick between thumb and index, use alternating down-up strokes. Practice the G major scale starting on the 3rd fret low E string.', quiz:[{q:'Flatpicking uses what tool?',options:['Fingers','Thumbpick','Flat pick','Bow'],answer:2},{q:'Doc Watson is known for?',options:['Clawhammer','Fingerstyle','Flatpicking','Slide'],answer:2},{q:'Alternating picking means?',options:['All down','All up','Down-up alternating','Random'],answer:2}] },
    { id:'g6', title:'Blues in G', free:false, xp:100, description:'The G blues scale adds a flat 5th to the pentatonic scale, giving it that characteristic bluesy sound used across country and blues.', exercise:'G Blues scale: frets 3-5-6 on low E, 3-5-6 on A, 3-5 on D, 3-5 on G, 3-4 on B, 3-5-6 on high E. Practice ascending and descending.', quiz:[{q:'Blues scale adds which note to pentatonic?',options:['Major 7th','Flat 5th','Perfect 4th','Major 6th'],answer:1},{q:'G blues scale has how many notes?',options:['5','6','7','8'],answer:1},{q:'G blues includes?',options:['F#','Bb','Db','Eb'],answer:1}] },
  ],
  Banjo: [
    { id:'b1', title:'G Tuning & Basic Roll', free:true, xp:50, description:'The 5-string banjo in open G tuning (gDGBD) is the standard for bluegrass. The basic alternating thumb roll is your first step.', exercise:'Tune strings 5-1 to g-D-G-B-D. Alternating thumb roll: thumb on string 3, index on string 2, thumb on string 1. Repeat continuously.', quiz:[{q:'Standard banjo tuning?',options:['EADGBE','GDAE','gDGBD','DADGAD'],answer:2},{q:'How many strings on a 5-string banjo?',options:['4','5','6','7'],answer:1},{q:'5th string is tuned to?',options:['Low D','High g','Middle G','Open A'],answer:1}] },
    { id:'b2', title:'Forward Roll', free:true, xp:50, description:'The forward roll is the most common Scruggs-style pattern, rolling from lower to higher strings using thumb, index and middle.', exercise:'T-I-M pattern on strings 3-2-1: thumb on 3, index on 2, middle on 1. Repeat at 60 BPM and gradually increase speed.', quiz:[{q:'Forward roll goes which direction?',options:['High to low','Low to high','Random','Only bass'],answer:1},{q:'Forward roll uses which fingers?',options:['All four','Thumb, index, middle','Index and middle','Thumb only'],answer:1},{q:'Scruggs style named after?',options:['Earl Scruggs','Pete Scruggs','Doc Scruggs','Bill Scruggs'],answer:0}] },
    { id:'b3', title:'Clawhammer', free:true, xp:50, description:'Clawhammer is an Appalachian style where the back of the fingernail strikes down on the strings, creating the bum-ditty rhythm.', exercise:'Bum-ditty: Strike down with index fingernail on melody string (bum), brush down across strings, pluck 5th string with thumb (ditty). Repeat.', quiz:[{q:'Clawhammer uses which part of finger?',options:['Fingertip','Back of fingernail','Side of thumb','Flat of fingers'],answer:1},{q:'Clawhammer rhythm is called?',options:['Roll pattern','Bum-ditty','Forward roll','Travis pick'],answer:1},{q:'Clawhammer is from which tradition?',options:['Hawaiian','Appalachian/Old-time','Celtic','Cajun'],answer:1}] },
    { id:'b4', title:'Backup Positions', free:false, xp:75, description:'Playing backup means supporting other musicians with chord rhythms. The chop stroke creates a percussive rhythmic foundation.', exercise:'Chop: fret a D chord shape, strum down and immediately mute with left hand palm. Creates the "chk" sound. Practice at 80 BPM.', quiz:[{q:'Backup means?',options:['Playing lead','Supporting musicians','Bass lines only','Singing harmony'],answer:1},{q:'Chop stroke creates?',options:['Ringing sustain','Percussive chk sound','Harmonic tone','Slide effect'],answer:1},{q:'Chopping requires?',options:['Full sustain','Palm muting after strum','Only picking','Slide technique'],answer:1}] },
    { id:'b5', title:'Single-String Style', free:false, xp:75, description:'Single-string banjo plays individual melodic notes across strings, similar to guitar flatpicking but adapted for banjo.', exercise:'Practice G major scale using single-string technique with alternating T-I picking. Start slowly and build speed gradually.', quiz:[{q:'Single-string is similar to guitar?',options:['Fingerpicking','Flatpicking','Travis picking','Slide'],answer:1},{q:'Single-string emphasizes?',options:['Chords only','Individual notes','Percussion','Bass strings'],answer:1},{q:'Don Reno pioneered?',options:['Clawhammer','Three-finger Scruggs','Single-string','Melodic'],answer:2}] },
    { id:'b6', title:'Melodic Style', free:false, xp:100, description:'Melodic (Keith) style was developed by Bill Keith to play scales without repeating any string — every note on a different string.', exercise:'Work out G major scale melodic style: no string repeats consecutively. One octave of G major using this constraint.', quiz:[{q:'Melodic banjo developed by?',options:['Earl Scruggs','Bill Keith','Pete Seeger','Bela Fleck'],answer:1},{q:'In melodic style each note is?',options:['Same string','Different string each time','Only string 1','Using slides'],answer:1},{q:'Melodic style allows?',options:['Only chords','Complete scales without repeating strings','Only rhythm','Hawaiian music'],answer:1}] },
  ],
  Mandolin: [
    { id:'m1', title:'Tuning & G Chord', free:true, xp:50, description:'The mandolin has 4 pairs (courses) of strings tuned G-D-A-E like a violin. The G chord is your starting point.', exercise:'Tuning courses 4-1: G3-D4-A4-E5 (each course has 2 strings in unison). G chord: index bar at 2nd fret strings 1-2, ring finger at 5th fret string 4.', quiz:[{q:'Mandolin courses are tuned like?',options:['Guitar','Banjo','Violin','Ukulele'],answer:2},{q:'Mandolin has how many strings?',options:['4','6','8','12'],answer:2},{q:'Mandolin tuning from low to high?',options:['EADGBE','gDGBD','GDAE','CGDA'],answer:2}] },
    { id:'m2', title:'D Chord & Chop', free:true, xp:50, description:'The D chord and chop stroke are fundamental to bluegrass mandolin. The chop creates the rhythm backbone of the band.', exercise:'D chord: bar strings 1-3 at 4th fret. Chop technique: strum down and immediately mute strings with left hand palm for percussive chk sound.', quiz:[{q:'Chop stroke is used for?',options:['Lead playing','Rhythm/percussion','Bass lines','Harmonics'],answer:1},{q:'Bill Monroe popularized mandolin in?',options:['Jazz','Classical','Bluegrass','Hawaiian'],answer:2},{q:'Chopping on which beats?',options:['1 and 3','2 and 4 backbeat','Every beat','Only beat 1'],answer:1}] },
    { id:'m3', title:'G Major Scale', free:true, xp:50, description:'The G major scale is the foundation of melody playing. On mandolin scales often stay in one position using all four fingers.', exercise:'G major scale: course 4 open (G), fret 2 (A), fret 4 (B), course 3 open (D), fret 2 (E), fret 4 (F#), course 2 open (A), fret 2 (B). Practice slowly.', quiz:[{q:'G major has how many sharps?',options:['0','1','2','3'],answer:1},{q:'Which note is sharp in G major?',options:['C#','F#','G#','D#'],answer:1},{q:'Scale practice should start?',options:['Fastest tempo','Slow with metronome','Random speed','Without metronome'],answer:1}] },
    { id:'m4', title:'Crosspicking', free:false, xp:75, description:'Crosspicking mimics banjo rolls by picking across multiple strings in a rolling pattern, creating a cascading arpeggio effect.', exercise:'On G chord shape: pick strings 4-3-2-1-2-3 in rolling motion using alternating down-up strokes. Keep chord fretted throughout.', quiz:[{q:'Crosspicking mimics?',options:['Guitar rolls','Banjo rolls','Violin bowing','Piano arpeggios'],answer:1},{q:'Crosspicking creates?',options:['Staccato','Cascading arpeggio','Palm mute','Tremolo'],answer:1},{q:'Jesse McReynolds known for?',options:['Classical','Crosspicking','Hawaiian','Cajun'],answer:1}] },
    { id:'m5', title:'Tremolo', free:false, xp:75, description:'Tremolo is rapid alternating down-up picking of a single course, creating a sustained singing tone to hold long notes.', exercise:'On open E course: rapid down-up-down-up picking. Aim for 16th notes at 80 BPM, gradually increase tempo. Keep wrist relaxed.', quiz:[{q:'Tremolo creates?',options:['Rhythm pattern','Sustained singing tone','Percussive chop','Slide effect'],answer:1},{q:'Tremolo uses?',options:['Single downstroke','Rapid alternating down-up','Circular motion','Fingerpicking'],answer:1},{q:'For tremolo wrist should be?',options:['Stiff and locked','Relaxed and loose','Pressed on body','Lifted high'],answer:1}] },
    { id:'m6', title:'Lead Breaks', free:false, xp:100, description:'Taking a lead break means playing the melody during your solo section. Great bluegrass mandolin combines melody notes, double stops and ornaments.', exercise:'Practice Cripple Creek melody: D-D-E-D / B-G-G / D-D-E-D / A-A-A. Play slowly then add double stops by fretting string below melody note.', quiz:[{q:'Double stops means?',options:['Two notes at once','Very fast notes','Muted strings','Harmonics'],answer:0},{q:'A lead break is played during?',options:['Rhythm section','Vocal verse','Solo section','Intro only'],answer:2},{q:'Bluegrass ornaments include?',options:['Hammer-ons and pull-offs','Reverb effects','Capo only','Electronic effects'],answer:0}] },
  ],
};

function LessonModal({ lesson, onClose, onComplete, isCompleted }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [quizIdx, setQuizIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const currentQ = lesson.quiz[quizIdx];
  const handleAnswer = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === currentQ.answer) setScore(s => s + 1);
  };
  const nextQ = () => {
    if (quizIdx < lesson.quiz.length - 1) { setQuizIdx(q => q + 1); setSelected(null); setAnswered(false); }
    else setStep(3);
  };
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>{lesson.title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={20} /></button>
        </div>
        <div className="p-6">
          {step === 0 && (
            <div>
              <p className="text-amber-400 text-xs font-semibold mb-2 uppercase tracking-wide">Lesson</p>
              <p className="text-gray-200 mb-6 leading-relaxed">{lesson.description}</p>
              <button onClick={() => setStep(1)} className="w-full bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold py-3 rounded-xl">Start Exercise</button>
            </div>
          )}
          {step === 1 && (
            <div>
              <p className="text-amber-400 text-xs font-semibold mb-2 uppercase tracking-wide">Exercise</p>
              <p className="text-gray-200 mb-6 leading-relaxed">{lesson.exercise}</p>
              <button onClick={() => setStep(2)} className="w-full bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold py-3 rounded-xl">Take the Quiz</button>
            </div>
          )}
          {step === 2 && (
            <div>
              <p className="text-amber-400 text-xs font-semibold mb-2 uppercase tracking-wide">Quiz {quizIdx + 1}/{lesson.quiz.length}</p>
              <p className="text-gray-200 font-medium mb-4">{currentQ.q}</p>
              <div className="space-y-2 mb-4">
                {currentQ.options.map((opt, idx) => {
                  let cls = 'w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ';
                  if (!answered) cls += 'border-gray-600 bg-gray-700 hover:border-amber-400 text-gray-200 cursor-pointer';
                  else if (idx === currentQ.answer) cls += 'border-green-400 bg-green-400/20 text-green-300';
                  else if (idx === selected) cls += 'border-red-400 bg-red-400/20 text-red-300';
                  else cls += 'border-gray-600 bg-gray-700 text-gray-400';
                  return <button key={idx} onClick={() => handleAnswer(idx)} className={cls} disabled={answered}>{opt}</button>;
                })}
              </div>
              {answered && <button onClick={nextQ} className="w-full bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold py-3 rounded-xl">{quizIdx < lesson.quiz.length - 1 ? 'Next Question' : 'See Results'}</button>}
            </div>
          )}
          {step === 3 && (
            <div className="text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h4 className="text-xl font-bold text-white mb-2">Lesson Complete!</h4>
              <p className="text-gray-400 mb-2">Score: {score}/{lesson.quiz.length}</p>
              <p className="text-amber-400 font-bold text-lg mb-6">+{lesson.xp} XP!</p>
              {!isCompleted
                ? <button onClick={() => { onComplete(); onClose(); }} className="w-full bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold py-3 rounded-xl">Collect XP</button>
                : <button onClick={onClose} className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-xl">Already Completed</button>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Lessons({ setCurrentPage }) {
  const { selectedInstrument, completedLessons, isPro, addXP, completeLesson } = useApp();
  const [activeLesson, setActiveLesson] = useState(null);
  const instrumentLessons = lessons[selectedInstrument] || [];
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Lessons</h2>
      <p className="text-gray-400 mb-6">{selectedInstrument} — 3 free, 3 Pro</p>
      <div className="grid gap-4">
        {instrumentLessons.map((lesson, idx) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isLocked = !lesson.free && !isPro;
          return (
            <div key={lesson.id} onClick={() => !isLocked && setActiveLesson(lesson)}
              className={`bg-gray-800 border rounded-xl p-5 flex items-center gap-4 transition-all ${isLocked ? 'border-gray-700 opacity-70' : 'border-gray-700 hover:border-amber-400/40 cursor-pointer'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${isCompleted ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'}`}>
                {isCompleted ? <CheckCircle size={20} /> : idx + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-white">{lesson.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${lesson.free ? 'bg-green-500/20 text-green-400' : 'bg-amber-400/20 text-amber-400'}`}>{lesson.free ? 'Free' : 'Pro'}</span>
                </div>
                <div className="text-xs text-gray-400">{lesson.xp} XP reward</div>
              </div>
              {isLocked
                ? <div className="flex items-center gap-2"><Lock size={18} className="text-gray-500" /><button onClick={e => { e.stopPropagation(); setCurrentPage('plans'); }} className="text-xs text-amber-400 hover:text-amber-300 underline">Unlock Pro</button></div>
                : <ChevronRight size={18} className="text-gray-500" />}
            </div>
          );
        })}
      </div>
      {activeLesson && <LessonModal lesson={activeLesson} onClose={() => setActiveLesson(null)} isCompleted={completedLessons.includes(activeLesson.id)} onComplete={() => { addXP(activeLesson.xp); completeLesson(activeLesson.id); }} />}
    </div>
  );
}
