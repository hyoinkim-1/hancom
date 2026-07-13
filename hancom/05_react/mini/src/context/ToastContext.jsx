import { createContext, useCallback, useState } from 'react'

export const ToastContext = createContext(null)

let nextToastId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'success') => {
    const id = ++nextToastId
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`rounded-[6px] border px-4 py-2 text-sm shadow-sm ${
              t.type === 'error'
                ? 'border-[#9f2f2d] bg-[var(--cat-food-bg)] text-[#9f2f2d]'
                : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]'
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
