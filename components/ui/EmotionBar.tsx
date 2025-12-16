interface EmotionBarProps {
    name: string
    value: number
    color: string
  }
  
  export function EmotionBar({ name, value, color }: EmotionBarProps) {
    const percentage = value * 100
  
    return (
      <div className="space-y-1">
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium text-foreground">{name}</span>
          <span className="text-foreground-muted">{percentage.toFixed(0)}%</span>
        </div>
        <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden transition-theme">
          <div
            className="h-full transition-all duration-300"
            style={{ 
              width: `${percentage}%`,
              backgroundColor: color
            }}
          />
        </div>
      </div>
    )
  }