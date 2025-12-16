import { HeatmapCell as HeatmapCellType } from '@/utils/heatmap'
import { getSentimentGradientColor } from '@/utils/sentiment'
import { getIntentIcon } from '@/utils/intent'
import { cn } from '@/utils/cn'

interface HeatmapCellProps {
  cell: HeatmapCellType
  size: 'small' | 'medium' | 'large'
}

export function HeatmapCell({ cell, size }: HeatmapCellProps) {
  const bgColor = getSentimentGradientColor(cell.sentiment)
  const { Icon, color } = getIntentIcon(cell.intent)

  // Enhanced sizing with better visual hierarchy
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-20 h-20',
    large: 'w-24 h-24'
  }

  // Sentiment-based glow effect
  const glowClass = cell.sentiment > 0.5 
    ? 'shadow-[0_0_20px_rgba(34,197,94,0.4)]' 
    : cell.sentiment < -0.5 
    ? 'shadow-[0_0_20px_rgba(239,68,68,0.4)]'
    : ''

  return (
    <div
      className={cn(
        'relative rounded-xl border border-border/50 shadow-md transition-all duration-300 cursor-pointer group overflow-hidden',
        'hover:scale-110 hover:shadow-2xl hover:z-20',
        sizeClasses[size],
        glowClass
      )}
      style={{ 
        backgroundColor: bgColor,
        backdropFilter: 'blur(10px)'
      }}
      title={`${cell.reasonLabel}\nSentiment: ${cell.sentiment.toFixed(2)}\nIntent: ${cell.intent}\nEvidence: ${cell.evidenceCount}`}
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50" />
      
      {/* Intent Icon - Larger and more prominent */}
      <div className="absolute top-1.5 right-1.5 z-10">
        <div className="bg-background/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg border border-border/30 transition-all duration-300 group-hover:scale-125">
          <Icon className={cn('w-4 h-4', color)} strokeWidth={2.5} />
        </div>
      </div>

      {/* Evidence Count Badge - More prominent */}
      <div className="absolute bottom-1.5 left-1.5 z-10">
        <div className="bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-bold text-foreground shadow-lg border border-border/30 transition-all duration-300 group-hover:scale-110">
          {cell.evidenceCount}
        </div>
      </div>

      {/* Enhanced Tooltip on hover */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block z-30 animate-in fade-in slide-in-from-bottom-2 duration-200">
        <div className="bg-surface-elevated/95 backdrop-blur-md text-foreground text-xs rounded-lg px-3 py-2 shadow-2xl border border-border min-w-[200px]">
          <div className="font-bold text-sm mb-1 text-foreground">{cell.reasonLabel}</div>
          <div className="space-y-0.5 text-foreground-muted">
            <div className="flex justify-between">
              <span>Sentiment:</span>
              <span className={cn(
                'font-semibold',
                cell.sentiment > 0 ? 'text-green-500' : cell.sentiment < 0 ? 'text-red-500' : 'text-yellow-500'
              )}>{cell.sentiment.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Intent:</span>
              <span className="font-medium">{cell.intent}</span>
            </div>
            <div className="flex justify-between">
              <span>Evidence:</span>
              <span className="font-semibold">{cell.evidenceCount} snippet{cell.evidenceCount !== 1 ? 's' : ''}</span>
            </div>
          </div>
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
            <div className="border-8 border-transparent border-t-surface-elevated/95" />
          </div>
        </div>
      </div>
    </div>
  )
}