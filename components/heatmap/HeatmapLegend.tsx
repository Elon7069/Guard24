import { getSentimentGradientColor } from '@/utils/sentiment'
import { Zap, Star, Lightbulb, LogIn, CreditCard, Package, Stethoscope } from 'lucide-react'

export function HeatmapLegend() {
  const sentimentStops = [-1, -0.5, 0, 0.5, 1]
  const intents = [
    { label: 'App Performance', icon: Zap, color: 'text-yellow-500' },
    { label: 'Value Delivery', icon: Star, color: 'text-blue-500' },
    { label: 'Feature Content', icon: Lightbulb, color: 'text-purple-500' },
    { label: 'Login Issues', icon: LogIn, color: 'text-orange-500' },
    { label: 'Payment Issues', icon: CreditCard, color: 'text-green-500' },
    { label: 'Poor Packaging', icon: Package, color: 'text-red-500' },
    { label: 'Service Quality', icon: Stethoscope, color: 'text-cyan-500' },
  ]

  return (
    <div className="bg-gradient-to-br from-surface via-surface to-surface-elevated rounded-xl border border-border shadow-lg p-6 space-y-6 transition-theme">
      <h3 className="text-lg font-bold text-foreground">Legend</h3>

      {/* Sentiment Color Scale */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">
          Sentiment Score
        </h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {sentimentStops.map((score) => (
              <div key={score} className="flex-1 text-center">
                <div
                  className="w-full h-10 rounded-lg border border-border shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{ backgroundColor: getSentimentGradientColor(score) }}
                />
                <span className="text-xs font-semibold text-foreground-muted mt-1 block">
                  {score.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs font-medium text-foreground-muted px-1">
            <span>Negative</span>
            <span>Neutral</span>
            <span>Positive</span>
          </div>
        </div>
      </div>

      {/* Intent Icons */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">
          Intent Types
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {intents.map((intent) => (
            <div key={intent.label} className="flex items-center gap-2 p-2 rounded-lg bg-surface-hover/30 transition-all duration-200 hover:bg-surface-hover hover:scale-105">
              <div className="bg-background rounded-full p-1.5 shadow-sm">
                <intent.icon className={`w-4 h-4 ${intent.color}`} strokeWidth={2.5} />
              </div>
              <span className="text-sm font-medium text-foreground">{intent.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Size Indicator */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">
          Cell Size (Evidence Count)
        </h4>
        <div className="flex items-center justify-around gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-gradient-to-br from-surface-elevated to-surface-hover rounded-xl border border-border shadow-md" />
            <span className="text-xs font-semibold text-foreground-muted">Small (1)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 bg-gradient-to-br from-surface-elevated to-surface-hover rounded-xl border border-border shadow-lg" />
            <span className="text-xs font-semibold text-foreground-muted">Medium (2)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-24 h-24 bg-gradient-to-br from-surface-elevated to-surface-hover rounded-xl border border-border shadow-xl" />
            <span className="text-xs font-semibold text-foreground-muted">Large (3+)</span>
          </div>
        </div>
      </div>
    </div>
  )
}