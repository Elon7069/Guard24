import { ConfidenceLevel } from '@/types/feedback'

/**
 * Converts a confidence score (0-1) to a confidence level
 */
export function getConfidenceLevel(score: number): ConfidenceLevel {
  if (score === 0) return 'unknown'
  if (score >= 0.9) return 'high'
  if (score >= 0.7) return 'medium'
  return 'low'
}

/**
 * Gets the color classes for a confidence badge based on level
 */
export function getConfidenceBadgeColor(level: ConfidenceLevel): string {
  switch (level) {
    case 'high':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'low':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'unknown':
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

/**
 * Formats a confidence score as a percentage
 */
export function formatConfidence(score: number): string {
  if (score === 0) return 'N/A'
  return `${Math.round(score * 100)}%`
}