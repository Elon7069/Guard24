import { getConfidenceLevel, getConfidenceBadgeColor, formatConfidence } from '@/utils/confidence'
import { cn } from '@/utils/cn'

interface ConfidenceBadgeProps {
  score: number
  label?: string
  showPercentage?: boolean
}

export function ConfidenceBadge({ 
  score, 
  label, 
  showPercentage = true 
}: ConfidenceBadgeProps) {
  const level = getConfidenceLevel(score)
  const colorClass = getConfidenceBadgeColor(level)
  const percentage = formatConfidence(score)

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        colorClass
      )}
      title={`Confidence: ${percentage}`}
    >
      {label && <span className="mr-1">{label}:</span>}
      {showPercentage && <span>{percentage}</span>}
      {!showPercentage && (
        <span className="capitalize">{level}</span>
      )}
    </span>
  )
}