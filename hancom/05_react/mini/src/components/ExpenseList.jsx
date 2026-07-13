import { useState } from 'react'
import { CATEGORIES } from './ExpenseForm'
import Card from './Card'
import AmountInput from './AmountInput'

const categoryInfo = (value) => CATEGORIES.find((c) => c.value === value)

const smallInputClass =
  'min-w-0 rounded-[6px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]'

function EditRow({ expense, onUpdate, onCancel, isSaving }) {
  const [amount, setAmount] = useState(String(expense.amount))
  const [category, setCategory] = useState(expense.category)
  const [memo, setMemo] = useState(expense.memo ?? '')
  const [error, setError] = useState('')

  const handleSave = () => {
    const value = Number(amount)
    if (!amount || value <= 0) {
      setError('금액은 0보다 큰 숫자로 입력해주세요.')
      return
    }
    setError('')
    // 성공했을 때만 편집 행을 닫는다 — 실패하면 값을 그대로 유지해서 재시도할 수 있게 함
    onUpdate({ id: expense.id, amount: value, category, memo }, { onSuccess: onCancel })
  }

  return (
    <Card className="grid w-full grid-cols-1 gap-2 px-4 py-3 sm:grid-cols-[auto_1fr]">
      <AmountInput value={amount} onChange={setAmount} className="col-span-full" />
      <select value={category} onChange={(e) => setCategory(e.target.value)} className={smallInputClass}>
        {CATEGORIES.map((c) => (
          <option key={c.value} value={c.value}>{c.label}</option>
        ))}
      </select>
      <input
        type="text"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        className={smallInputClass}
      />
      <div className="col-span-full flex flex-wrap items-center justify-end gap-2">
        {error && <p className="mr-auto text-xs text-[#9f2f2d]">{error}</p>}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="rounded-[6px] bg-[var(--color-primary)] px-3 py-1 text-xs text-[var(--color-surface)] transition-all hover:bg-[var(--color-primary-hover)] active:scale-[0.98] disabled:opacity-50"
        >
          {isSaving ? '저장 중...' : '저장'}
        </button>
        <button
          onClick={onCancel}
          disabled={isSaving}
          className="rounded-[6px] border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)] disabled:opacity-50"
        >
          취소
        </button>
      </div>
    </Card>
  )
}

export default function ExpenseList({ expenses, onRemove, onUpdate, isUpdating }) {
  const [editingId, setEditingId] = useState(null)

  if (expenses.length === 0) {
    return (
      <p className="rounded-[var(--radius)] border border-dashed border-[var(--color-border)] px-4 py-8 text-center text-sm text-[var(--color-text-muted)]">
        아직 지출 내역이 없습니다.
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-2">
      {expenses.map((e) =>
        editingId === e.id ? (
          <EditRow
            key={e.id}
            expense={e}
            onUpdate={onUpdate}
            onCancel={() => setEditingId(null)}
            isSaving={isUpdating}
          />
        ) : (
          <Card
            as="li"
            key={e.id}
            className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-[var(--color-bg)]"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-xs uppercase tracking-wide ${categoryInfo(e.category)?.badgeClass}`}
              >
                {categoryInfo(e.category)?.label ?? e.category}
              </span>
              {e.memo && <span className="truncate text-sm text-[var(--color-text-muted)]">{e.memo}</span>}
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="tabular-nums text-sm font-medium">{e.amount.toLocaleString()}원</span>
              <button
                onClick={() => setEditingId(e.id)}
                className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              >
                수정
              </button>
              <button
                onClick={() => onRemove(e.id)}
                className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[#9f2f2d]"
              >
                삭제
              </button>
            </div>
          </Card>
        ),
      )}
    </ul>
  )
}
