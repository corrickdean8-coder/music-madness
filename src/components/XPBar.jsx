import { useApp } from '../context/AppContext';

export default function XPBar() {
  const { xp, level, nextLevel } = useApp();
  const min = level.min;
  const max = nextLevel ? nextLevel.min : level.min + 1000;
  const pct = Math.min(100, ((xp - min) / (max - min)) * 100);
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span className="text-amber-400 font-semibold">{level.name}</span>
        <span>{xp} / {nextLevel ? nextLevel.min : '∞'} XP</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-amber-400 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
