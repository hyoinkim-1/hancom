import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { summarize } from '../utils/expenseStats'
import { useUser } from './useUser'
import { useToast } from './useToast'

// 로컬 개발은 localhost:4000, 배포 시에는 Netlify 환경변수 VITE_API_URL에 Render 서버 주소를 넣는다
const API_URL = `${import.meta.env.VITE_API_URL ?? 'http://localhost:4000'}/api/expenses`
// const API_URL = `${'http://localhost:4000'}/api/expenses`

async function fetchExpenses(name) {
  if (!name) return []
  const res = await fetch(`${API_URL}?user=${encodeURIComponent(name)}`)
  if (!res.ok) throw new Error('지출 목록을 불러오지 못했어요.')
  return res.json()
}

export function useExpenses() {
  const { name } = useUser()
  const { showToast } = useToast()
  const queryClient = useQueryClient()
  const queryKey = ['expenses', name]

  const { data: expenses } = useSuspenseQuery({
    queryKey,
    queryFn: () => fetchExpenses(name),
  })

  const addExpense = useMutation({
    mutationFn: async (expense) => {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...expense, user: name }),
      })
      if (!res.ok) throw new Error('지출 추가에 실패했어요.')
      return res.json()
    },
    onSuccess: (saved) => {
      queryClient.setQueryData(queryKey, (prev) => [...(prev ?? []), saved])
      showToast('지출을 추가했어요.', 'success')
    },
    onError: () => showToast('지출 추가에 실패했어요.', 'error'),
  })

  const removeExpense = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('삭제에 실패했어요.')
      return id
    },
    onSuccess: (id) => {
      queryClient.setQueryData(queryKey, (prev) => (prev ?? []).filter((e) => e.id !== id))
      showToast('삭제했어요.', 'success')
    },
    onError: () => showToast('삭제에 실패했어요.', 'error'),
  })

  const updateExpense = useMutation({
    mutationFn: async ({ id, ...changes }) => {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(changes),
      })
      if (!res.ok) throw new Error('수정에 실패했어요.')
      return res.json()
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(queryKey, (prev) => (prev ?? []).map((e) => (e.id === updated.id ? updated : e)))
      showToast('수정했어요.', 'success')
    },
    onError: () => showToast('수정에 실패했어요.', 'error'),
  })

  return {
    expenses,
    addExpense: addExpense.mutate,
    removeExpense: removeExpense.mutate,
    updateExpense: updateExpense.mutate,
    addExpenseAsync: addExpense.mutateAsync,
    removeExpenseAsync: removeExpense.mutateAsync,
    updateExpenseAsync: updateExpense.mutateAsync,
    isUpdatingExpense: updateExpense.isPending,
    ...summarize(expenses),
  }
}
