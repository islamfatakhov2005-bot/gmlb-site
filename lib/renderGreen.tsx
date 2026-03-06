import React from 'react'

/**
 * Renders text with **word** syntax highlighted in green (gradient-text class).
 * Example: "Наши **преимущества**" → "Наши " + <span class="gradient-text">преимущества</span>
 */
export function renderGreen(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? <span key={i} className="gradient-text">{part}</span> : part
  )
}
