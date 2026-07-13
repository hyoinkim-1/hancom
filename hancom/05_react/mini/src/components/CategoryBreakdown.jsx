import { CATEGORIES } from './ExpenseForm'

export default function CategoryBreakdown({ totalsByCategory, total }) {
  if (total === 0) {
    return <p className="text-sm text-[var(--color-text-muted)]">해당 기간에 지출 내역이 없습니다.</p>
  }

  const topCategory = CATEGORIES.map((c) => ({ ...c, sum: totalsByCategory[c.value] ?? 0 })).sort(
    (a, b) => b.sum - a.sum,
  )[0]

  return (
    <ul className="flex flex-col gap-3">
      {CATEGORIES.map((c) => {
        const sum = totalsByCategory[c.value] ?? 0
        const pct = total ? Math.round((sum / total) * 100) : 0
        return (
          <li key={c.value}>
            <div className="mb-1 flex justify-between text-xs">
              <span>{c.label}{topCategory?.value === c.value && sum > 0 ? ' · 최다 지출' : ''}</span>
              <span className="tabular-nums text-[var(--color-text-muted)]">
                {sum.toLocaleString()}원 ({pct}%)
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-bg)]">
              <div className={`h-full rounded-full transition-all ${c.barClass}`} style={{ width: `${pct}%` }} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
