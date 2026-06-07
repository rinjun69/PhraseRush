import { useState, useEffect, useCallback, useRef } from 'react'
import type { GameState, BestRecord, BestRecords, Level } from '../types'
import { questions } from '../data/questions'
import {
  trackGameStart,
  trackGameEnd,
  trackCorrectAnswer,
  trackIncorrectAnswer,
  trackNewBestRecord,
} from '../lib/analytics'

const GAME_DURATION = 180

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function bestKey(level: Level) {
  return `phrase-rush-best-${level}`
}

function loadBest(level: Level): BestRecord | null {
  try {
    const raw = localStorage.getItem(bestKey(level))
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function loadAllBest(): BestRecords {
  return { 1: loadBest(1) ?? undefined, 2: loadBest(2) ?? undefined, 3: loadBest(3) ?? undefined }
}

function saveBest(level: Level, record: BestRecord) {
  localStorage.setItem(bestKey(level), JSON.stringify(record))
}

function levelQuestions(level: Level) {
  return questions.filter((q) => q.level === level)
}

function initialState(): GameState {
  return {
    level: 1,
    phase: 'levelSelect',
    currentQuestionIndex: 0,
    selectedWords: [],
    availableWords: [],
    score: 0,
    combo: 0,
    maxCombo: 0,
    timeLeft: GAME_DURATION,
    cleared: 0,
    feedback: null,
  }
}

export function useGame() {
  const [state, setState] = useState<GameState>(initialState)
  const [bestRecords, setBestRecords] = useState<BestRecords>(loadAllBest)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const currentQuestion = levelQuestions(state.level)[state.currentQuestionIndex]

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  // タイマー起動
  useEffect(() => {
    if (state.phase !== 'playing') return
    timerRef.current = setInterval(() => {
      setState((s) => ({ ...s, timeLeft: Math.max(0, s.timeLeft - 1) }))
    }, 1000)
    return stopTimer
  }, [state.phase, stopTimer])

  // タイムアップ検知
  useEffect(() => {
    if (state.phase !== 'playing' || state.timeLeft > 0) return
    stopTimer()
    const { score, cleared, maxCombo, level } = state
    trackGameEnd({ level, score, cleared, maxCombo })
    const record: BestRecord = { score, cleared, maxCombo, date: new Date().toLocaleDateString('ja-JP') }
    const prev = loadBest(level)
    if (!prev || score > prev.score) {
      saveBest(level, record)
      setBestRecords((r) => ({ ...r, [level]: record }))
      trackNewBestRecord(level, score)
    }
    setState((s) => ({ ...s, phase: 'result' }))
  }, [state.timeLeft, state.phase])

  // 正誤フィードバック → 900ms後に次の問題へリセット
  useEffect(() => {
    if (state.feedback === null) return
    const timer = setTimeout(() => {
      setState((s) => {
        const lqs = levelQuestions(s.level)
        return {
          ...s,
          feedback: null,
          selectedWords: [],
          availableWords: shuffle(lqs[s.currentQuestionIndex].words),
        }
      })
    }, 900)
    return () => clearTimeout(timer)
  }, [state.feedback])

  const startGame = useCallback((level: Level) => {
    const lqs = levelQuestions(level)
    trackGameStart(level)
    setState({
      level,
      phase: 'playing',
      currentQuestionIndex: 0,
      selectedWords: [],
      availableWords: shuffle(lqs[0].words),
      score: 0,
      combo: 0,
      maxCombo: 0,
      timeLeft: GAME_DURATION,
      cleared: 0,
      feedback: null,
    })
  }, [])

  const goToLevelSelect = useCallback(() => {
    stopTimer()
    setState(initialState())
  }, [stopTimer])

  const selectWord = useCallback((word: string, index: number) => {
    setState((s) => {
      if (s.phase !== 'playing') return s
      const newAvailable = [...s.availableWords]
      newAvailable.splice(index, 1)
      const newSelected = [...s.selectedWords, word]

      const lqs = levelQuestions(s.level)
      const q = lqs[s.currentQuestionIndex]
      if (newSelected.length < q.answer.length) {
        return { ...s, availableWords: newAvailable, selectedWords: newSelected }
      }

      const isCorrect = newSelected.join(' ') === q.answer.join(' ')
      const newCombo = isCorrect ? s.combo + 1 : 0
      const newScore = s.score + (isCorrect ? 100 + (newCombo - 1) * 20 : 0)

      if (isCorrect) {
        trackCorrectAnswer(s.level, q.id, newCombo)
      } else {
        trackIncorrectAnswer(s.level, q.id)
      }

      return {
        ...s,
        selectedWords: newSelected,
        availableWords: newAvailable,
        feedback: isCorrect ? 'correct' : 'incorrect',
        combo: newCombo,
        maxCombo: Math.max(s.maxCombo, newCombo),
        score: newScore,
        cleared: isCorrect ? s.cleared + 1 : s.cleared,
        currentQuestionIndex: isCorrect
          ? (s.currentQuestionIndex + 1) % lqs.length
          : s.currentQuestionIndex,
      }
    })
  }, [])

  const removeWord = useCallback((index: number) => {
    setState((s) => {
      if (s.phase !== 'playing' || s.feedback !== null) return s
      const word = s.selectedWords[index]
      const newSelected = [...s.selectedWords]
      newSelected.splice(index, 1)
      return { ...s, selectedWords: newSelected, availableWords: [...s.availableWords, word] }
    })
  }, [])

  const retryGame = useCallback(() => {
    startGame(state.level)
  }, [startGame, state.level])

  return { state, bestRecords, currentQuestion, startGame, goToLevelSelect, selectWord, removeWord, retryGame }
}
