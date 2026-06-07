import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  feedback: 'correct' | 'incorrect' | null
  correctAnswer: string[]
}

export function FeedbackOverlay({ feedback, correctAnswer }: Props) {
  return (
    <AnimatePresence>
      {feedback && (
        <motion.div
          key={feedback}
          className={`fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-50
            ${feedback === 'correct' ? 'bg-green-500/20' : 'bg-red-500/20'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            className={`text-6xl font-black tracking-wider
              ${feedback === 'correct' ? 'text-green-400' : 'text-red-400'}`}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={
              feedback === 'incorrect'
                ? { scale: 1, opacity: 1, x: [0, -12, 12, -8, 8, -4, 4, 0] }
                : { scale: [0.4, 1.2, 1], opacity: 1 }
            }
            transition={{ duration: 0.4 }}
          >
            {feedback === 'correct' ? 'CORRECT!' : 'WRONG!'}
          </motion.div>

          {feedback === 'incorrect' && (
            <motion.div
              className="mt-4 px-6 py-3 bg-slate-900/90 rounded-xl text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-slate-400 text-xs mb-1">正解</p>
              <p className="text-white font-semibold text-lg">{correctAnswer.join(' ')}</p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
