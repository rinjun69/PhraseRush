import { motion } from 'framer-motion'

interface Props {
  words: string[]
  onSelect: (word: string, index: number) => void
  disabled: boolean
}

export function WordBank({ words, onSelect, disabled }: Props) {
  return (
    <div className="flex flex-wrap gap-2 justify-center min-h-[60px] p-3 rounded-xl bg-slate-900">
      {words.map((word, i) => (
        <motion.button
          key={`bank-${i}-${word}`}
          onClick={() => onSelect(word, i)}
          disabled={disabled}
          className="px-3 py-1.5 rounded-lg bg-slate-600 font-semibold text-white cursor-pointer
                     disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={disabled ? {} : { scale: 1.08, backgroundColor: '#64748b' }}
          whileTap={disabled ? {} : { scale: 0.9 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          {word}
        </motion.button>
      ))}
    </div>
  )
}
