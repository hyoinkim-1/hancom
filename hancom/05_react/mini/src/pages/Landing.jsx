import { useState } from 'react'
import { useUser } from '../hooks/useUser'
import Card from '../components/Card'

export default function Landing() {
  const { setName } = useUser()
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setName(input.trim())
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-sm items-center px-4">
      <Card className="w-full p-2">
        <h1 className="mb-1 text-xl font-semibold tracking-tight">간단 가계부</h1>
        <p className="mb-4 text-sm text-[var(--color-text-muted)]">
          이름을 입력하면 그 이름으로 가계부가 저장돼요.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            autoFocus
            type="text"
            placeholder="이름"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 min-w-0 rounded-[6px] border border-[var(--color-border)] bg-[var(--color-surface)] px-1 py-1 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
          />
          <button
            type="submit"
            className="rounded-[6px] bg-[var(--color-primary)] px-2 py-2 text-sm text-[var(--color-surface)] transition-all hover:bg-[var(--color-primary-hover)] active:scale-[0.98]"
          >
            시작하기
          </button>
        </form>
      </Card>
    </main>
  )
}
