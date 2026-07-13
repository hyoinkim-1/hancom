export function parseDigits(value) {
  return String(value).replace(/\D/g, '')
}

export function formatNumber(value) {
  const digits = parseDigits(value)
  return digits ? Number(digits).toLocaleString() : ''
}
