import { motion } from 'framer-motion'
import type { Level, BestRecords } from '../types'
import { questions } from '../data/questions'
import { Footer } from '../components/Footer'

interface LevelMeta {
  level: Level
  name: string
  subtitle: string
  color: string
  bg: string
  emoji: string
}

const LEVELS: LevelMeta[] = [
  { level: 1, name: '初級', subtitle: 'TOEIC ~600 / 英検3級', color: '#3b82f6', bg: '#1e3a5f', emoji: '🌱' },
  { level: 2, name: '中級', subtitle: 'TOEIC ~730 / 英検2級', color: '#8b5cf6', bg: '#2d1b6b', emoji: '🔥' },
  { level: 3, name: '上級', subtitle: 'TOEIC 900+ / 英検準1級',color: '#ef4444', bg: '#5b1a1a', emoji: '⚡' },
]

interface Props {
  bestRecords: BestRecords
  onStart: (level: Level) => void
  onOpenPrivacy: () => void
}

export function LevelSelectScreen({ bestRecords, onStart, onOpenPrivacy }: Props) {
  return (
    <motion.div
      className="flex flex-col items-center min-h-screen px-4 py-8 gap-6 max-w-lg mx-auto"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="text-center">
        <h1 className="text-3xl font-black text-white">英作文タイムトライアル</h1>
        <p className="text-slate-400 mt-1">バラバラの単語を正しい順に並べよう！</p>
      </div>

      {/* ルール */}
      <div className="w-full bg-slate-800 rounded-xl px-5 py-3 text-sm text-slate-300 grid grid-cols-2 gap-1">
        <span>⏱ 制限時間 <b className="text-white">3分</b></span>
        <span>✅ 正解 <b className="text-white">+100点</b></span>
        <span>🔥 コンボ <b className="text-white">連続正解×20点</b></span>
        <span>↩ 不正解 <b className="text-white">正解確認→再挑戦</b></span>
      </div>

      {/* レベルカード */}
      <div className="w-full flex flex-col gap-4">
        {LEVELS.map(({ level, name, subtitle, color, bg, emoji }, i) => {
          const best = bestRecords[level]
          const count = questions.filter((q) => q.level === level).length

          return (
            <motion.button
              key={level}
              onClick={() => onStart(level)}
              className="w-full rounded-2xl p-5 text-left flex items-center gap-4 transition-all"
              style={{ backgroundColor: bg, border: `2px solid ${color}44` }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, borderColor: color }}
              whileTap={{ scale: 0.97 }}
            >
              {/* アイコン */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{ backgroundColor: color + '33' }}
              >
                {emoji}
              </div>

              {/* テキスト */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-white">Level {level}</span>
                  <span
                    className="text-sm font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: color + '33', color }}
                  >
                    {name}
                  </span>
                </div>
                <p className="text-slate-400 text-xs mt-0.5">{subtitle} / {count}問</p>

                {best ? (
                  <p className="text-xs mt-1" style={{ color }}>
                    🏆 {best.score}点 / {best.cleared}問 / コンボ×{best.maxCombo}
                  </p>
                ) : (
                  <p className="text-slate-600 text-xs mt-1">まだ記録なし</p>
                )}
              </div>

              <svg className="w-5 h-5 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          )
        })}
      </div>

      <Footer onOpenPrivacy={onOpenPrivacy} />
    </motion.div>
  )
}
