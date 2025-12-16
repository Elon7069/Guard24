import { EmotionScores, EmotionData } from '@/types/feedback'

/**
 * Converts emotion scores object to array format for easier rendering
 * Filters out emotions with 0 value
 */
export function getEmotionsArray(emotions: EmotionScores): EmotionData[] {
  const emotionMap: Record<string, string> = {
    anger: '#ef4444',      // red-500
    frustration: '#f97316', // orange-500
    sadness: '#3b82f6',    // blue-500
    joy: '#22c55e',        // green-500
    sarcasm: '#a855f7'     // purple-500
  }

  const emotionsArray: EmotionData[] = []

  const keys: (keyof Omit<EmotionScores, 'id' | 'reason_id' | 'emotion_confidence' | 'created_at'>)[] = [
    'anger',
    'frustration', 
    'sadness',
    'joy',
    'sarcasm'
  ]

  keys.forEach(key => {
    const value = emotions[key]
    if (value > 0) {
      emotionsArray.push({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value,
        color: emotionMap[key]
      })
    }
  })

  // Sort by value descending
  return emotionsArray.sort((a, b) => b.value - a.value)
}

/**
 * Gets the dominant emotion (highest score)
 */
export function getDominantEmotion(emotions: EmotionScores): string {
  const emotionsArray = getEmotionsArray(emotions)
  return emotionsArray.length > 0 ? emotionsArray[0].name : 'None'
}