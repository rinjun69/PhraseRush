import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  words: string[]
  onRemove: (index: number) => void
  totalSlots: number
  color: string
  locked: boolean
}

export function WordSlot({ words, onRemove, totalSlots, color, locked }: Props) {
  const empties = totalSlots - words.length

  return (
    <div className="flex flex-wrap gap-2 justify-center min-h-[60px] p-3 rounded-xl bg-slate-800 border-2 border-slate-600">
      <AnimatePresence mode="popLayout">
        {words.map((word, i) => (
          <motion.button
            key={`sel-${word}-${i}`}
            onClick={() => !locked && onRemove(i)}
            disabled={locked}
            className={`px-3 py-1.5 rounded-lg font-semibold text-white
              ${locked ? 'cursor-default opacity-80' : 'cursor-pointer'}`}
            style={{ backgroundColor: color }}
            initial={{ opacity: 0, scale: 0.5, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            whileHover={locked ? {} : { scale: 1.08, filter: 'brightness(1.15)' }}
            whileTap={locked ? {} : { scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            {word}
          </motion.button>
        ))}
      </AnimatePresence>

      {Array.from({ length: empties }).map((_, i) => (
        <div
          key={`empty-${i}`}
          className="px-3 py-1.5 rounded-lg border-2 border-dashed border-slate-600 min-w-[48px]"
        />
      ))}
    </div>
  )
}
