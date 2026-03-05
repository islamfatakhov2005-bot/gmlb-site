import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
}

const variants = {
  primary: 'btn-gradient',
  secondary: 'bg-white/5 text-white border border-border hover:bg-white/10 hover:border-border-hover',
  outline: 'bg-transparent text-accent border border-accent/30 hover:bg-accent/10 hover:border-accent',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  onClick,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
