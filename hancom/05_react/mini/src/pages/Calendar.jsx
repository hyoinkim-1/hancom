import { useMemo, useState } from 'react'
import { useExpenses } from '../hooks/useExpenses'
import { summarize } from '../utils/expenseStats'
import { dayKey, shiftMonth } from '../utils/date'
import ExpenseList from '../components/ExpenseList'
import CalendarGrid from '../components/CalendarGrid'
import PeriodNav from '../components/PeriodNav'

export default function Calendar() {
  const { expenses, removeExpense } = useExpenses()
  const [cursor, setCursor] = useState(new Date())
  const [selected, setSelected] = useState(new Date())

  const expensesByDay = useMemo(() => {
    const map = {}
    for (const e of expenses) {
      const key = dayKey(new Date(e.date))
      ;(map[key] ??= []).push(e)
    }
    return map
  }, [expenses])

  const selectedExpenses = expensesByDay[dayKey(selected)] ?? []
  const { total: selectedTotal } = summarize(selectedExpenses)

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">캘린더</h1>

      <div className="mb-4">
        <PeriodNav
          label={`${cursor.getFullYear()}.${cursor.getMonth() + 1}`}
          onPrev={() => setCursor((c) => shiftMonth(c, -1))}
          onNext={() => setCursor((c) => shiftMonth(c, 1))}
        />
      </div>

      <CalendarGrid cursor={cursor} expensesByDay={expensesByDay} selected={selected} onSelect={setSelected} />

      <div className="mt-6">
        <p className="mb-2 text-sm font-medium">
          {selected.getFullYear()}.{selected.getMonth() + 1}.{selected.getDate()} 지출{' '}
          <span className="tabular-nums text-[var(--color-text-muted)]">
            (총 {selectedTotal.toLocaleString()}원)
          </span>
        </p>
        <ExpenseList expenses={selectedExpenses} onRemove={removeExpense} />
      </div>
    </main>
  )
}
