export default function PeriodNav({ label, onPrev, onNext }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <button onClick={onPrev} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]">◀</button>
      <span className="tabular-nums">{label}</span>
      <button onClick={onNext} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]">▶</button>
    </div>
  )
}
