export default function Card({ as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag
      className={`rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-surface)] ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
