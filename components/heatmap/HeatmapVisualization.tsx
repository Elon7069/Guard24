'use client'

import { useMemo } from 'react'
import { FeedbackWithRelations } from '@/types/feedback'
import { transformToHeatmapData } from '@/utils/heatmap'
import { HeatmapGrid } from './HeatmapGrid'
import { HeatmapLegend } from './HeatmapLegend'

interface HeatmapVisualizationProps {
  feedbacks: FeedbackWithRelations[]
  feedbackId?: string | null
}

export function HeatmapVisualization({ feedbacks, feedbackId }: HeatmapVisualizationProps) {
  // Memoize the transformation to avoid recalculating on every render
  const heatmapData = useMemo(() => {
    return transformToHeatmapData(feedbacks)
  }, [feedbacks])

  const isAggregate = !feedbackId
  const title = isAggregate ? 'Reason Heatmap (Aggregate)' : 'Reason Heatmap'
  const subtitle = isAggregate 
    ? `Visualizing ${heatmapData.cells.length} reasons across ${heatmapData.themes.length} themes from ${feedbacks.length} feedback${feedbacks.length !== 1 ? 's' : ''}`
    : `Visualizing ${heatmapData.cells.length} reasons across ${heatmapData.themes.length} themes for this feedback`

  return (
    <div className="w-full space-y-6 transition-theme">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {title}
        </h2>
        <p className="text-foreground-muted">
          {subtitle}
        </p>
      </div>

      <HeatmapGrid data={heatmapData} />
      
      <HeatmapLegend />
    </div>
  )
}