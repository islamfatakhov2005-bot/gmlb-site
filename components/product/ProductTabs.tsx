'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface ProductTabsProps {
  tabs: Tab[]
}

export function ProductTabs({ tabs }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id)
  const activeContent = tabs.find((t) => t.id === activeTab)

  return (
    <div>
      {/* Вкладки */}
      <div className="flex overflow-x-auto gap-1 pb-1 mb-8 border-b border-border scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id ? 'text-accent' : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Контент вкладки */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeContent?.content}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
