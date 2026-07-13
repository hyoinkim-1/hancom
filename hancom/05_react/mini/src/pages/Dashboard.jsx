import { useMemo, useState } from 'react'
import { useExpenses } from '../hooks/useExpenses'
import { summarize } from '../utils/expenseStats'
import { dayKey, monthKey, shiftDay, shiftMonth } from '../utils/date'
import StatCard from '../components/StatCard'
import PeriodNav from '../components/PeriodNav'
import ModeToggle from '../components/ModeToggle'
import CategoryBreakdown from '../components/CategoryBreakdown'
import Card from '../components/Card'

export default function Dashboard() {
  const { expenses } = useExpenses()
  const [mode, setMode] = useState('month') // 'day' | 'month'
  const [cursor, setCursor] = useState(new Date())

  const filtered = useMemo(() => {
    if (mode === 'day') {
      return expenses.filter((e) => dayKey(new Date(e.date)) === dayKey(cursor))
    }
    return expenses.filter((e) => monthKey(new Date(e.date)) === monthKey(cursor))
  }, [expenses, mode, cursor])

  const { total, totalsByCategory, count } = summarize(filtered)
  const average = count ? Math.round(total / count) : 0

  const periodLabel =
    mode === 'day'
      ? `${cursor.getFullYear()}.${cursor.getMonth() + 1}.${cursor.getDate()}`
      : `${cursor.getFullYear()}.${cursor.getMonth() + 1}`

  const shift = (delta) => setCursor((c) => (mode === 'day' ? shiftDay(c, delta) : shiftMonth(c, delta)))

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">대시보드</h1>

      <div className="mb-4 flex items-center gap-2">
        <ModeToggle mode={mode} onChange={setMode} />
        <div className="ml-auto">
          <PeriodNav label={periodLabel} onPrev={() => shift(-1)} onNext={() => shift(1)} />
        </div>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-2">
        <StatCard label="총 지출" value={`${total.toLocaleString()}원`} />
        <StatCard label="건수" value={`${count}건`} />
        <StatCard label="건당 평균" value={`${average.toLocaleString()}원`} />
      </div>

      <Card className="p-4">
        <h2 className="mb-3 text-sm font-medium text-[var(--color-text-muted)]">카테고리별 비중</h2>
        <CategoryBreakdown totalsByCategory={totalsByCategory} total={total} />
      </Card>
    </main>
  )
}
