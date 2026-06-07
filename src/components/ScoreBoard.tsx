import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  score: number
  cleared: number
  combo: number
}

export function ScoreBoard({ score, cleared, combo }: Props) {
  return (
    <div className="flex gap-6 text-center">
      <div>
        <div className="text-xs text-slate-400 uppercase tracking-wider">Score</div>
        <motion.div
          key={score}
          className="text-2xl font-bold text-white"
          initial={{ scale: 1.3, color: '#86efac' }}
          animate={{ scale: 1, color: '#ffffff' }}
          transition={{ duration: 0.3 }}
        >
          {score}
        </motion.div>
      </div>
      <div>
        <div className="text-xs text-slate-400 uppercase tracking-wider">Cleared</div>
        <div className="text-2xl font-bold text-white">{cleared}</div>
      </div>
      <div>
        <div className="text-xs text-slate-400 uppercase tracking-wider">Combo</div>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={combo}
            className={`text-2xl font-bold ${
              combo >= 3 ? 'text-yellow-400' : combo >= 2 ? 'text-orange-400' : 'text-white'
            }`}
            initial={{ scale: 1.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 18 }}
          >
            {combo > 1 ? `×${combo}` : combo === 0 ? '-' : '×1'}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
