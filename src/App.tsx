import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useGame } from './hooks/useGame'
import { LevelSelectScreen } from './screens/LevelSelectScreen'
import { GameScreen } from './screens/GameScreen'
import { ResultScreen } from './screens/ResultScreen'
import { PrivacyPolicyScreen } from './screens/PrivacyPolicyScreen'
import { trackPageView } from './lib/analytics'

const PAGE_META: Record<string, { path: string; title: string }> = {
  levelSelect: { path: '/',       title: 'レベル選択' },
  playing:     { path: '/game',   title: 'ゲームプレイ' },
  result:      { path: '/result', title: 'リザルト' },
}

export default function App() {
  const { state, bestRecords, currentQuestion, startGame, goToLevelSelect, selectWord, removeWord, retryGame } = useGame()
  const [showPrivacy, setShowPrivacy] = useState(false)

  // 画面遷移ごとに仮想ページビューを送信
  useEffect(() => {
    if (showPrivacy) {
      trackPageView('/privacy', 'プライバシーポリシー')
      return
    }
    const meta = PAGE_META[state.phase]
    if (!meta) return
    const path = state.phase === 'playing' ? `/game/level-${state.level}` : meta.path
    const title = state.phase === 'playing' ? `ゲームプレイ - Level ${state.level}` : meta.title
    trackPageView(path, title)
  }, [state.phase, state.level, showPrivacy])

  return (
    <>
      {state.phase === 'levelSelect' && (
        <LevelSelectScreen
          bestRecords={bestRecords}
          onStart={startGame}
          onOpenPrivacy={() => setShowPrivacy(true)}
        />
      )}
      {state.phase === 'playing' && currentQuestion && (
        <GameScreen
          state={state}
          currentQuestion={currentQuestion}
          onSelectWord={selectWord}
          onRemoveWord={removeWord}
        />
      )}
      {state.phase === 'result' && (
        <ResultScreen
          state={state}
          bestRecords={bestRecords}
          onRetry={retryGame}
          onLevelSelect={goToLevelSelect}
          onOpenPrivacy={() => setShowPrivacy(true)}
        />
      )}

      <AnimatePresence>
        {showPrivacy && (
          <PrivacyPolicyScreen onClose={() => setShowPrivacy(false)} />
        )}
      </AnimatePresence>
    </>
  )
}
