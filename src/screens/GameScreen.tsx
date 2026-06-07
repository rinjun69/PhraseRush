import { motion } from 'framer-motion'
import { Timer } from '../components/Timer'
import { ScoreBoard } from '../components/ScoreBoard'
import { WordSlot } from '../components/WordSlot'
import { WordBank } from '../components/WordBank'
import { FeedbackOverlay } from '../components/FeedbackOverlay'
import type { GameState, Question } from '../types'

interface Props {
  state: GameState
  currentQuestion: Question
  onSelectWord: (word: string, index: number) => void
  onRemoveWord: (index: number) => void
}

const LEVEL_COLORS: Record<number, string> = { 1: '#3b82f6', 2: '#8b5cf6', 3: '#ef4444' }
const LEVEL_NAMES: Record<number, string> = { 1: '初級', 2: '中級', 3: '上級' }

export function GameScreen({ state, currentQuestion: q, onSelectWord, onRemoveWord }: Props) {
  const isLocked = state.feedback !== null
  const levelColor = LEVEL_COLORS[state.level]

  return (
    <motion.div
      className="flex flex-col min-h-screen px-4 py-4 max-w-2xl mx-auto gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <FeedbackOverlay feedback={state.feedback} correctAnswer={q.answer} />

      {/* ヘッダー */}
      <div className="flex items-center justify-between bg-slate-800 rounded-2xl px-5 py-3">
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: levelColor + '33', color: levelColor }}
          >
            Lv{state.level} {LEVEL_NAMES[state.level]}
          </span>
          <ScoreBoard score={state.score} cleared={state.cleared} combo={state.combo} />
        </div>
        <Timer timeLeft={state.timeLeft} />
      </div>

      {/* 挿絵プレースホルダー */}
      <motion.div
        key={q.id}
        className="rounded-2xl flex items-center justify-center h-28 font-semibold"
        style={{ backgroundColor: q.placeholderColor + '22', border: `2px solid ${q.placeholderColor}44` }}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
      >
        <span className="text-3xl">🖼</span>
        <span className="ml-3 text-sm text-slate-400">{q.hint}</span>
      </motion.div>

      {/* 日本語問題文 */}
      <motion.div
        key={`jp-${q.id}`}
        className="bg-slate-800 rounded-xl px-5 py-3 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <p className="text-slate-400 text-xs mb-1">次の文を英語に</p>
        <p className="text-white text-lg font-semibold">{q.japanese}</p>
      </motion.div>

      {/* 選択エリア */}
      <div>
        <p className="text-slate-500 text-xs mb-1 ml-1">並べた単語（クリックで戻す）</p>
        <WordSlot
          words={state.selectedWords}
          onRemove={onRemoveWord}
          totalSlots={q.answer.length}
          color={q.placeholderColor}
          locked={isLocked}
        />
      </div>

      {/* 単語バンク */}
      <div>
        <p className="text-slate-500 text-xs mb-1 ml-1">単語を選ぼう</p>
        <WordBank
          words={state.availableWords}
          onSelect={onSelectWord}
          disabled={isLocked}
        />
      </div>
    </motion.div>
  )
}
