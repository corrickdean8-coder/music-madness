import { Zap, Trophy, Star } from 'lucide-react'

export default function Toast({ message, type = 'success' }) {
  const icons = { xp: <Zap className="w-4 h-4" />, level: <Trophy className="w-4 h-4" />, success: <Star className="w-4 h-4" /> }
  const colors = { xp: 'bg-amber-500 text-black', level: 'bg-purple-600 text-white', success: 'bg-emerald-600 text-white' }
  return (
    <div className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-xl font-semibold text-sm ${colors[type] || colors.success}`}>
      {icons[type] || icons.success}
      <span>{message}</span>
    </div>
  )
}
