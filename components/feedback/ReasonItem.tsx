'use client'

import { ReasonWithRelations } from '@/types/feedback'
import { ConfidenceBadge } from '@/components/ui/ConfidenceBadge'
import { getSentimentTextColor } from '@/utils/sentiment'
import { ReasonDetails } from './ReasonDetails'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'
import { motion, AnimatePresence } from 'framer-motion'

interface ReasonItemProps {
  reason: ReasonWithRelations
  isExpanded: boolean
  onToggle: () => void
}

export function ReasonItem({ reason, isExpanded, onToggle }: ReasonItemProps) {
  const sentimentColor = getSentimentTextColor(reason.reason_sentiment_score)

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-surface transition-theme hover:shadow-md">
      {/* Header - Always visible */}
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-surface-elevated transition-all duration-200 text-left"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-semibold text-foreground">
              {reason.reason_label || 'Uncategorized'}
            </h3>
            <ConfidenceBadge score={reason.reason_label_confidence} />
            <span className={cn('text-sm font-semibold', sentimentColor)}>
              {reason.reason_sentiment_score > 0 ? '+' : ''}
              {reason.reason_sentiment_score.toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-foreground-muted mt-1 line-clamp-1">
            {reason.extracted_reason_text}
          </p>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 ml-4"
        >
          <ChevronDown className="w-5 h-5 text-foreground-muted" />
        </motion.div>
      </button>

      {/* Content - Expandable with animation */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-4 border-t border-border">
              <ReasonDetails reason={reason} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}