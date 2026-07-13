import { CATEGORIES } from './ExpenseForm'
import Card from './Card'

const categoryInfo = (value) => CATEGORIES.find((c) => c.value === value)

export default function ExpenseList({ expenses, onRemove }) {
  if (expenses.length === 0) {
    return (
      <p className="rounded-[var(--radius)] border border-dashed border-[var(--color-border)] px-4 py-8 text-center text-sm text-[var(--color-text-muted)]">
        아직 지출 내역이 없습니다.
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-2">
      {expenses.map((e) => (
        <Card
          as="li"
          key={e.id}
          className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-[var(--color-bg)]"
        >
          <div className="flex items-center gap-3">
            <span
              className={`rounded-full px-2 py-0.5 text-xs uppercase tracking-wide ${categoryInfo(e.category)?.badgeClass}`}
            >
              {categoryInfo(e.category)?.label ?? e.category}
            </span>
            {e.memo && <span className="text-sm text-[var(--color-text-muted)]">{e.memo}</span>}
          </div>
          <div className="flex items-center gap-3">
            <span className="tabular-nums text-sm font-medium">{e.amount.toLocaleString()}원</span>
            <button
              onClick={() => onRemove(e.id)}
              className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[#9f2f2d]"
            >
              삭제
            </button>
          </div>
        </Card>
      ))}
    </ul>
  )
}
