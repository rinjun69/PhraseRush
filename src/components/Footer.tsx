interface Props {
  onOpenPrivacy: () => void
}

export function Footer({ onOpenPrivacy }: Props) {
  return (
    <footer className="mt-auto pt-6 pb-4 text-center">
      <button
        onClick={onOpenPrivacy}
        className="text-slate-500 hover:text-slate-300 text-xs underline underline-offset-2 transition-colors"
      >
        プライバシーポリシー / Privacy Policy
      </button>
    </footer>
  )
}
