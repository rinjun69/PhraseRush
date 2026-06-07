import { motion } from 'framer-motion'
import type { BestRecord } from '../types'

interface Props {
  onStart: () => void
  best: BestRecord | null
}

export function StartScreen({ onStart, best }: Props) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen gap-8 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center">
        <h1 className="text-4xl font-black text-white mb-2">英作文タイムトライアル</h1>
        <p className="text-slate-400 text-lg">バラバラの単語を正しい順に並べよう！</p>
      </div>

      <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm text-center space-y-2">
        <p className="text-slate-300 text-sm">
          ⏱ 制限時間：<span className="font-bold text-white">3分</span>
        </p>
        <p className="text-slate-300 text-sm">
          ✅ 正解：<span className="font-bold text-white">+100点</span>
        </p>
        <p className="text-slate-300 text-sm">
          🔥 コンボボーナス：<span className="font-bold text-white">連続正解×20点</span>
        </p>
        <p className="text-slate-300 text-sm">
          ↩ 不正解なら正解を確認して再挑戦
        </p>
      </div>

      {best && (
        <motion.div
          className="bg-yellow-900/40 border border-yellow-600 rounded-xl p-4 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-yellow-400 font-bold text-sm mb-1">🏆 自己ベスト</p>
          <p className="text-white font-black text-2xl">{best.score}点</p>
          <p className="text-slate-400 text-xs">
            {best.cleared}問クリア / 最大コンボ×{best.maxCombo} / {best.date}
          </p>
        </motion.div>
      )}

      <motion.button
        onClick={onStart}
        className="px-12 py-4 bg-blue-600 text-white text-xl font-bold rounded-2xl shadow-lg shadow-blue-900"
        whileHover={{ scale: 1.05, backgroundColor: '#3b82f6' }}
        whileTap={{ scale: 0.95 }}
      >
        スタート
      </motion.button>
    </motion.div>
  )
}
