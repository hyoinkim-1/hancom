import { dayKey, daysInMonth, firstWeekdayOfMonth } from '../utils/date'
import { summarize } from '../utils/expenseStats'

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

export default function CalendarGrid({ cursor, expensesByDay, selected, onSelect }) {
  const leading = firstWeekdayOfMonth(cursor)
  const total = daysInMonth(cursor)
  const blanks = Array.from({ length: leading }, () => null)
  const days = Array.from({ length: total }, (_, i) => new Date(cursor.getFullYear(), cursor.getMonth(), i + 1))
  const cells = [...blanks, ...days]

  return (
    <>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-[var(--color-text-muted)]">
        {WEEKDAYS.map((w) => (
          <div key={w} className="py-1">{w}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={`blank-${i}`} />
          const key = dayKey(date)
          const { total: dayTotal } = summarize(expensesByDay[key] ?? [])
          const isSelected = key === dayKey(selected)
          const isToday = key === dayKey(new Date())
          return (
            <button
              key={key}
              onClick={() => onSelect(date)}
              className={`flex min-h-6 flex-col items-center justify-start rounded-[6px] border bg-[var(--color-surface)] p-1 text-xs transition-colors ${
                isSelected
                  ? 'border-[var(--color-primary)]'
                  : 'border-[var(--color-border)] hover:bg-[var(--color-bg)]'
              }`}
            >
              <span className={isToday ? 'font-semibold' : ''}>{date.getDate()}</span>
              {dayTotal > 0 && (
                <span className="tabular-nums text-[10px] text-[var(--color-text-muted)]">
                  {dayTotal.toLocaleString()}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </>
  )
}
