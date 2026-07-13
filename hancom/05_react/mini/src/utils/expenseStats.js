export function summarize(expenses) {
  const totalsByCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] ?? 0) + e.amount
    return acc
  }, {})
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)
  return { total, totalsByCategory, count: expenses.length }
}
