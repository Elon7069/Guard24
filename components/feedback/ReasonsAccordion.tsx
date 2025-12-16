'use client'

import { useState } from 'react'
import { ReasonWithRelations } from '@/types/feedback'
import { ReasonItem } from './ReasonItem'
import { motion } from 'framer-motion'

interface ReasonsAccordionProps {
  reasons: ReasonWithRelations[]
}

export function ReasonsAccordion({ reasons }: ReasonsAccordionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  if (!reasons || reasons.length === 0) {
    return (
      <div className="bg-surface rounded-lg border border-border p-6 transition-theme">
        <p className="text-foreground-muted text-center">No reasons found</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">
        Reasons ({reasons.length})
      </h2>
      <div className="grid grid-cols-1 gap-3">
        {reasons.map((reason, index) => (
          <motion.div
            key={reason.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ReasonItem
              reason={reason}
              isExpanded={expandedIndex === index}
              onToggle={() => handleToggle(index)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}