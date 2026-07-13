import Card from './Card'

export default function StatCard({ label, value }) {
  return (
    <Card className="flex h-full flex-col items-center p-3">
      <p className="text-xs text-[var(--color-text-muted)]">{label}</p>
      <div className="flex flex-1 items-center justify-center">
        <p className="tabular-nums whitespace-nowrap text-base font-semibold">{value}</p>
      </div>
    </Card>
  )
}
