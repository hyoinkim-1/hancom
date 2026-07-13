import { useRef } from 'react'
import { formatNumber, parseDigits } from '../utils/format'

const inputClass =
  'rounded-[6px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--color-primary)]'

export default function AmountInput({ value, onChange, className = '' }) {
  const ref = useRef(null)

  const handleChange = (e) => {
    const input = e.target
    const digitsBeforeCursor = parseDigits(input.value.slice(0, input.selectionStart)).length
    const digits = parseDigits(input.value)
    onChange(digits)

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
      ref.current?.setSelectionRange(cursorPos, cursorPos)
    })
  }

  return (
    <div
      className={`relative after:pointer-events-none after:absolute after:right-3 after:top-1/2 after:-translate-y-1/2 after:text-sm after:text-[var(--color-text-muted)] ${
        value ? "after:content-['원']" : ''
      } ${className}`}
    >
      <input
        ref={ref}
        type="text"
        inputMode="numeric"
        placeholder="금액"
        value={formatNumber(value)}
        onChange={handleChange}
        className={`${inputClass} w-full pr-6`}
      />
    </div>
  )
}
