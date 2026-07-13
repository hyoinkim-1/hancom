import { useRef, useState } from 'react'
import { formatNumber, parseDigits } from '../utils/format'

const CATEGORIES = [
  {
    value: 'food',
    label: '식비',
    badgeClass: 'bg-[var(--cat-food-bg)] text-[var(--cat-food-text)]',
    barClass: 'bg-[var(--cat-food-text)]',
  },
  {
    value: 'transport',
    label: '교통',
    badgeClass: 'bg-[var(--cat-transport-bg)] text-[var(--cat-transport-text)]',
    barClass: 'bg-[var(--cat-transport-text)]',
  },
  {
    value: 'etc',
    label: '기타',
    badgeClass: 'bg-[var(--cat-etc-bg)] text-[var(--cat-etc-text)]',
    barClass: 'bg-[var(--cat-etc-text)]',
  },
]

const inputClass =
  'rounded-[6px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--color-primary)]'

export default function ExpenseForm({ onAdd }) {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0].value)
  const [memo, setMemo] = useState('')
  const [error, setError] = useState('')
  const amountRef = useRef(null)

  const handleAmountChange = (e) => {
    const input = e.target
    const digitsBeforeCursor = parseDigits(input.value.slice(0, input.selectionStart)).length
    const digits = parseDigits(input.value)
    setAmount(digits)

    const formatted = formatNumber(digits)
    let cursorPos = formatted.length
    let seen = 0
    for (let i = 0; i < formatted.length; i++) {
      if (/\d/.test(formatted[i])) seen++
      if (seen === digitsBeforeCursor) {
        cursorPos = i + 1
        break
      }
    }
    if (digitsBeforeCursor === 0) cursorPos = 0

    requestAnimationFrame(() => {
      amountRef.current?.setSelectionRange(cursorPos, cursorPos)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const value = Number(amount)
    if (!amount || value <= 0) {
      setError('금액은 0보다 큰 숫자로 입력해주세요.')
      return
    }
    setError('')
    onAdd({ amount: value, category, memo })
    setAmount('')
    setMemo('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="grid w-full grid-cols-[auto_1fr_auto] gap-2">
        <div
          className={`relative col-span-3 after:pointer-events-none after:absolute after:right-3 after:top-1/2 after:-translate-y-1/2 after:text-sm after:text-[var(--color-text-muted)] ${
            amount ? "after:content-['원']" : ''
          }`}
        >
          <input
            ref={amountRef}
            type="text"
            inputMode="numeric"
            placeholder="금액"
            value={formatNumber(amount)}
            onChange={handleAmountChange}
            className={`${inputClass} w-full pr-6`}
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`${inputClass} min-w-0`}
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="메모"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          className={`${inputClass} min-w-0`}
        />
        <button
          type="submit"
          className="rounded-[6px] bg-[var(--color-primary)] px-4 py-2 text-sm text-[var(--color-surface)] transition-all hover:bg-[var(--color-primary-hover)] active:scale-[0.98]"
        >
          추가
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-[#9f2f2d]">{error}</p>}
    </form>
  )
}

export { CATEGORIES }
