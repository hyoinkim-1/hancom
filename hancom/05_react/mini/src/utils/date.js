const pad = (n) => String(n).padStart(2, '0')

// ponytail: local-time based (no timezone lib) — fine for a single-user local demo
export const dayKey = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
export const monthKey = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}`
export const shiftDay = (date, delta) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + delta)
export const shiftMonth = (date, delta) => new Date(date.getFullYear(), date.getMonth() + delta, 1)
export const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
export const firstWeekdayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()
