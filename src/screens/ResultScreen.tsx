import { motion } from 'framer-motion'
import type { GameState, BestRecords } from '../types'
import { Footer } from '../components/Footer'

interface Props {
  state: GameState
  bestRecords: BestRecords
  onRetry: () => void
  onLevelSelect: () => void
  onOpenPrivacy: () => void
}

const LEVEL_NAMES: Record<number, string> = { 1: '初級', 2: '中級', 3: '上級' }
const LEVEL_COLORS: Record<number, string> = { 1: '#3b82f6', 2: '#8b5cf6', 3: '#ef4444' }

export function ResultScreen({ state, bestRecords, onRetry, onLevelSelect, onOpenPrivacy }: Props) {
  const best = bestRecords[state.level]
  const isNewBest = best?.score === state.score
  const levelColor = LEVEL_COLORS[state.level]

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen gap-6 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center">
        <p className="text-sm font-bold mb-1" style={{ color: levelColor }}>
          Level {state.level} {LEVEL_NAMES[state.level]}
        </p>
        <h2 className="text-3xl font-black text-white">タイムアップ！</h2>
        {isNewBest && (
          <motion.p
            className="text-yellow-400 font-bold text-lg mt-1"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, delay: 0.3 }}
          >
            🎉 新記録達成！
          </motion.p>
        )}
      </div>

      <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-sm space-y-4">
        <div className="text-center">
          <p className="text-slate-400 text-sm">SCORE</p>
          <motion.p
            className="text-5xl font-black text-white"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
          >
            {state.score}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center border-t border-slate-700 pt-4">
          <div>
            <p className="text-slate-400 text-xs">クリア問題数</p>
            <p className="text-2xl font-bold text-white">{state.cleared}</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs">最大コンボ</p>
            <p className="text-2xl font-bold text-yellow-400">×{state.maxCombo}</p>
          </div>
        </div>

        {best && (
          <div className="text-center border-t border-slate-700 pt-4">
            <p className="text-slate-400 text-xs">このレベルの自己ベスト</p>
            <p className="text-xl font-bold text-yellow-300">{best.score}点</p>
            <p className="text-slate-500 text-xs">{best.date}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        <motion.button
          onClick={onRetry}
          className="w-full py-4 bg-blue-600 text-white text-lg font-bold rounded-2xl shadow-lg shadow-blue-900"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          もう一度（同じレベル）
        </motion.button>
        <motion.button
          onClick={onLevelSelect}
          className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white text-base font-semibold rounded-2xl"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          レベル選択に戻る
        </motion.button>
      </div>

      <Footer onOpenPrivacy={onOpenPrivacy} />
    </motion.div>
  )
}
