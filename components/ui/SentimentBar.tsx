import { getSentimentColor, getSentimentTextColor, formatSentimentScore } from '@/utils/sentiment'
import { cn } from '@/utils/cn'

interface SentimentBarProps {
  score: number
  confidence: number
  showLabel?: boolean
}

export function SentimentBar({ 
  score, 
  confidence, 
  showLabel = true 
}: SentimentBarProps) {
  // Convert score from -1,1 to 0,100 for percentage
  const percentage = ((score + 1) / 2) * 100
  const bgColor = getSentimentColor(score)
  const textColor = getSentimentTextColor(score)

  return (
    <div className="space-y-2">
      {showLabel && (
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium text-foreground">Sentiment</span>
          <span className={cn('font-semibold', textColor)}>
            {formatSentimentScore(score)}
          </span>
        </div>
      )}
      <div className="relative w-full h-3 bg-surface-elevated rounded-full overflow-hidden transition-theme">
        <div
          className={cn('absolute left-0 top-0 h-full transition-all duration-300', bgColor)}
          style={{ width: `${percentage}%` }}
        />
        {/* Center marker */}
        <div className="absolute left-1/2 top-0 w-0.5 h-full bg-border-hover -translate-x-1/2" />
      </div>
      <div className="flex justify-between text-xs text-foreground-muted">
        <span>Negative</span>
        <span>Neutral</span>
        <span>Positive</span>
      </div>
    </div>
  )
}