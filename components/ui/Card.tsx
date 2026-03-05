interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div className={`glass-card p-6 ${hover ? '' : 'hover:transform-none hover:shadow-none hover:border-border hover:bg-surface-card'} ${className}`}>
      {children}
    </div>
  )
}
