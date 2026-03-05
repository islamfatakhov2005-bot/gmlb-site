interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeading({ title, subtitle, className = '' }: SectionHeadingProps) {
  return (
    <div className={`text-center mb-12 lg:mb-16 ${className}`}>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{title}</h2>
      {subtitle && (
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  )
}
