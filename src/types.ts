export type Level = 1 | 2 | 3

export interface Question {
  id: number
  level: Level
  words: string[]
  answer: string[]
  japanese: string
  hint: string
  placeholderColor: string
}

export interface GameState {
  level: Level
  phase: 'levelSelect' | 'playing' | 'result'
  currentQuestionIndex: number
  selectedWords: string[]
  availableWords: string[]
  score: number
  combo: number
  maxCombo: number
  timeLeft: number
  cleared: number
  feedback: 'correct' | 'incorrect' | null
}

export interface BestRecord {
  score: number
  cleared: number
  maxCombo: number
  date: string
}

export type BestRecords = Partial<Record<Level, BestRecord>>
