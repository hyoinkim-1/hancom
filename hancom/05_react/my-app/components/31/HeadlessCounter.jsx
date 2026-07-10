export const HeadlessCounter = ({className, handler, children}) => {
  return (
    <div className={className} onClick={handler}>
      {children}
    </div>
  )
}
