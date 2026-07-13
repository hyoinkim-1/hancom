import { useExpenses } from '../hooks/useExpenses'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'
import { CATEGORIES } from '../components/ExpenseForm'
import Card from '../components/Card'

export default function Expenses() {
  const { expenses, addExpense, removeExpense, updateExpense, isUpdatingExpense, totalsByCategory, total } =
    useExpenses()

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">간단 가계부</h1>

      <ExpenseForm onAdd={addExpense} />
      <ExpenseList
        expenses={expenses}
        onRemove={removeExpense}
        onUpdate={updateExpense}
        isUpdating={isUpdatingExpense}
      />

      <Card className="mt-6 p-4">
        <p className="tabular-nums text-lg font-semibold">총 지출 {total.toLocaleString()}원</p>
        {Object.keys(totalsByCategory).length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-2">
            {CATEGORIES.filter((c) => totalsByCategory[c.value]).map((c) => (
              <li key={c.value} className={`tabular-nums rounded-full px-3 py-1 text-xs ${c.badgeClass}`}>
                {c.label} {totalsByCategory[c.value].toLocaleString()}원
              </li>
            ))}
          </ul>
        )}
      </Card>
    </main>
  )
}
