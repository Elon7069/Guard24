import { SentimentType } from '@/types/feedback'

/**
 * Converts a sentiment score (-1 to 1) to a sentiment type
 */
export function getSentimentType(score: number): SentimentType {
  if (score > 0.3) return 'positive'
  if (score < -0.3) return 'negative'
  return 'neutral'
}

/**
 * Gets the background color class for sentiment visualization
 */
export function getSentimentColor(score: number): string {
  const type = getSentimentType(score)
  
  switch (type) {
    case 'positive':
      return 'bg-green-500'
    case 'negative':
      return 'bg-red-500'
    case 'neutral':
      return 'bg-gray-400'
  }
}

/**
 * Gets a gradient color for sentiment score (for heatmap)
 * -1 (red) -> 0 (yellow) -> 1 (green)
 */
export function getSentimentGradientColor(score: number): string {
  // Normalize score from -1,1 to 0,1
  const normalized = (score + 1) / 2
  
  if (normalized < 0.5) {
    // Red to Yellow
    const ratio = normalized * 2
    const red = 255
    const green = Math.round(255 * ratio)
    return `rgb(${red}, ${green}, 0)`
  } else {
    // Yellow to Green
    const ratio = (normalized - 0.5) * 2
    const red = Math.round(255 * (1 - ratio))
    const green = 255
    return `rgb(${red}, ${green}, 0)`
  }
}

/**
 * Gets text color class based on sentiment for better readability
 */
export function getSentimentTextColor(score: number): string {
  const type = getSentimentType(score)
  
  switch (type) {
    case 'positive':
      return 'text-green-700'
    case 'negative':
      return 'text-red-700'
    case 'neutral':
      return 'text-gray-700'
  }
}

/**
 * Formats sentiment score with + or - prefix
 */
export function formatSentimentScore(score: number): string {
  const formatted = score.toFixed(2)
  return score > 0 ? `+${formatted}` : formatted
}