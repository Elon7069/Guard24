import { useState, useEffect, useCallback } from 'react'
import { FeedbackWithRelations } from '@/types/feedback'

interface UseFeedbackReturn {
  feedback: FeedbackWithRelations | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useFeedback(feedbackId?: string): UseFeedbackReturn {
  const [feedback, setFeedback] = useState<FeedbackWithRelations | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFeedback = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const url = feedbackId 
        ? `/api/feedback?id=${feedbackId}`
        : '/api/feedback'
      
      const response = await fetch(url)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch feedback')
      }

      const data = await response.json()
      setFeedback(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      console.error('Error fetching feedback:', err)
    } finally {
      setLoading(false)
    }
  }, [feedbackId])

  useEffect(() => {
    fetchFeedback()
  }, [fetchFeedback])

  return {
    feedback,
    loading,
    error,
    refetch: fetchFeedback
  }
}