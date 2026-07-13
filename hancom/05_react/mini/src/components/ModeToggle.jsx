const buttonClass = (active) =>
  `rounded-[6px] px-3 py-1 text-sm transition-colors ${
    active ? 'bg-[var(--color-primary)] text-[var(--color-surface)]' : 'text-[var(--color-text-muted)]'
  }`

export default function ModeToggle({ mode, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <button className={buttonClass(mode === 'day')} onClick={() => onChange('day')}>일별</button>
      <button className={buttonClass(mode === 'month')} onClick={() => onChange('month')}>월별</button>
    </div>
  )
}
