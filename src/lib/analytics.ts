import ReactGA from 'react-ga4'
import type { Level } from '../types'

const MEASUREMENT_ID = 'G-EH5919T17L'

const LEVEL_NAMES: Record<Level, string> = { 1: '初級', 2: '中級', 3: '上級' }

export function initGA() {
  ReactGA.initialize(MEASUREMENT_ID)
}

// ── ページビュー ────────────────────────────────────────────
export function trackPageView(path: string, title: string) {
  ReactGA.send({ hitType: 'pageview', page: path, title })
}

// ── ゲームイベント ──────────────────────────────────────────
export function trackGameStart(level: Level) {
  ReactGA.event('game_start', {
    level,
    level_name: LEVEL_NAMES[level],
  })
}

export function trackGameEnd(params: {
  level: Level
  score: number
  cleared: number
  maxCombo: number
}) {
  ReactGA.event('game_end', {
    level: params.level,
    level_name: LEVEL_NAMES[params.level],
    score: params.score,
    cleared: params.cleared,
    max_combo: params.maxCombo,
  })
}

export function trackCorrectAnswer(level: Level, questionId: number, combo: number) {
  ReactGA.event('correct_answer', {
    level,
    level_name: LEVEL_NAMES[level],
    question_id: questionId,
    combo,
  })
}

export function trackIncorrectAnswer(level: Level, questionId: number) {
  ReactGA.event('incorrect_answer', {
    level,
    level_name: LEVEL_NAMES[level],
    question_id: questionId,
  })
}

export function trackNewBestRecord(level: Level, score: number) {
  ReactGA.event('new_best_record', {
    level,
    level_name: LEVEL_NAMES[level],
    score,
  })
}
