import { useState, useEffect, useCallback } from 'react'
import { summarize } from '../utils/expenseStats'
import { useUser } from './useUser'

// 로컬 개발은 localhost:4000, 배포 시에는 Netlify 환경변수 VITE_API_URL에 Render 서버 주소를 넣는다
const API_URL = `${import.meta.env.VITE_API_URL ?? 'http://localhost:4000'}/api/expenses`

export function useExpenses() {
  const { name } = useUser()
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    if (!name) return
    fetch(`${API_URL}?user=${encodeURIComponent(name)}`)
      .then((res) => res.json())
      .then(setExpenses)
  }, [name])

  const addExpense = useCallback(
    async (expense) => {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...expense, user: name }),
      })
      const saved = await res.json()
      setExpenses((prev) => [...prev, saved])
    },
    [name],
  )

  const removeExpense = useCallback(async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    setExpenses((prev) => prev.filter((e) => e.id !== id))
  }, [])

  return { expenses, addExpense, removeExpense, ...summarize(expenses) }
}
