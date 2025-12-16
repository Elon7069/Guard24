import { FeedbackWithRelations, ReasonWithRelations } from '@/types/feedback'

export interface HeatmapCell {
  reasonLabel: string
  theme: string
  sentiment: number
  intent: string
  evidenceCount: number
  reasonId: string
}

export interface HeatmapData {
  themes: string[]
  cells: HeatmapCell[]
  uniqueReasonLabels: string[]
}

/**
 * Transforms feedback data into heatmap format
 * Groups by theme and maps reasons
 */
export function transformToHeatmapData(
  feedbacks: FeedbackWithRelations[]
): HeatmapData {
  const cells: HeatmapCell[] = []
  const themesSet = new Set<string>()
  const reasonLabelsSet = new Set<string>()

  // Extract all reasons from all feedbacks
  feedbacks.forEach((feedback) => {
    feedback.reasons.forEach((reason) => {
      const reasonLabel = reason.reason_label || 'Uncategorized'
      
      themesSet.add(reason.theme_label)
      reasonLabelsSet.add(reasonLabel)

      cells.push({
        reasonLabel,
        theme: reason.theme_label,
        sentiment: reason.reason_sentiment_score,
        intent: reason.reason_intent,
        evidenceCount: reason.reason_evidence_snippets?.length || 0,
        reasonId: reason.id
      })
    })
  })

  return {
    themes: Array.from(themesSet).sort(),
    cells,
    uniqueReasonLabels: Array.from(reasonLabelsSet).sort()
  }
}

/**
 * Get cell size class based on evidence count
 */
export function getCellSize(evidenceCount: number): string {
  if (evidenceCount >= 3) return 'large'
  if (evidenceCount >= 2) return 'medium'
  return 'small'
}

/**
 * Get cells for a specific theme and reason label
 */
export function getCellsForPosition(
  cells: HeatmapCell[],
  theme: string,
  reasonLabel: string
): HeatmapCell[] {
  return cells.filter(
    (cell) => cell.theme === theme && cell.reasonLabel === reasonLabel
  )
}