import { useGame } from './hooks/useGame'
import { LevelSelectScreen } from './screens/LevelSelectScreen'
import { GameScreen } from './screens/GameScreen'
import { ResultScreen } from './screens/ResultScreen'

export default function App() {
  const { state, bestRecords, currentQuestion, startGame, goToLevelSelect, selectWord, removeWord, retryGame } = useGame()

  return (
    <>
      {state.phase === 'levelSelect' && (
        <LevelSelectScreen bestRecords={bestRecords} onStart={startGame} />
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
        />
      )}
    </>
  )
}
