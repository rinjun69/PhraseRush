interface Props {
  timeLeft: number
}

export function Timer({ timeLeft }: Props) {
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const isWarning = timeLeft <= 30
  const isCritical = timeLeft <= 10

  return (
    <div
      className={`text-3xl font-mono font-bold tabular-nums transition-colors ${
        isCritical
          ? 'text-red-400 animate-pulse'
          : isWarning
          ? 'text-yellow-400'
          : 'text-green-400'
      }`}
    >
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  )
}
