'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { FeedbackWithRelations } from '@/types/feedback'
import { HeatmapVisualization } from '@/components/heatmap/HeatmapVisualization'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { BackgroundScene3D } from '@/components/ui/BackgroundScene3D'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function HeatmapPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const feedbackId = searchParams.get('id')
  
  const [feedbacks, setFeedbacks] = useState<FeedbackWithRelations[]>([])
  const [allFeedbacks, setAllFeedbacks] = useState<FeedbackWithRelations[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAllFeedbacks = async () => {
    setLoading(true)
    setError(null)

    try {
      const url = feedbackId ? `/api/feedbacks?id=${feedbackId}` : '/api/feedbacks'
      const response = await fetch(url)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch feedbacks')
      }

      const data = await response.json()
      setFeedbacks(data.feedbacks || [])
      
      // Also fetch all feedbacks for the selector (if not already loaded)
      if (feedbackId && allFeedbacks.length === 0) {
        const allResponse = await fetch('/api/feedbacks')
        const allData = await allResponse.json()
        setAllFeedbacks(allData.feedbacks || [])
      } else if (!feedbackId) {
        setAllFeedbacks(data.feedbacks || [])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllFeedbacks()
  }, [feedbackId])

  if (loading) {
    return (
      <>
        <BackgroundScene3D />
        <main className="min-h-screen bg-background transition-theme py-8 relative z-10">
          <LoadingSkeleton />
        </main>
      </>
    )
  }

  if (error) {
    return (
      <>
        <BackgroundScene3D />
        <main className="min-h-screen bg-background transition-theme py-8 relative z-10">
        <ErrorState error={error} onRetry={fetchAllFeedbacks} />
      </main>
      </>
    )
  }

  return (
    <>
      <BackgroundScene3D />
      <main className="min-h-screen bg-background transition-theme py-8 relative z-10">
      <div className="w-full max-w-7xl mx-auto px-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg hover:bg-surface-hover transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Viewer
          </Link>
          
          <div className="flex items-center gap-3">
            {/* Feedback Selector */}
            {allFeedbacks.length > 0 && (
              <select
                value={feedbackId || 'all'}
                onChange={(e) => {
                  const value = e.target.value
                  if (value === 'all') {
                    router.push('/heatmap')
                  } else {
                    router.push(`/heatmap?id=${value}`)
                  }
                }}
                className="px-4 py-2 bg-surface border border-border rounded-lg text-foreground hover:bg-surface-hover transition-all duration-200 cursor-pointer"
              >
                <option value="all">All Feedbacks (Aggregate)</option>
                {allFeedbacks.map((fb, index) => (
                  <option key={fb.feedback_id} value={fb.feedback_id}>
                    Feedback #{index + 1} ({fb.feedback_id.substring(0, 8)}...)
                  </option>
                ))}
              </select>
            )}
            
            <button
              onClick={fetchAllFeedbacks}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <ThemeToggle />
          </div>
        </div>

        {/* Heatmap */}
        {feedbacks.length > 0 ? (
          <HeatmapVisualization feedbacks={feedbacks} feedbackId={feedbackId} />
        ) : (
          <div className="bg-surface rounded-lg border border-border p-12 text-center transition-theme">
            <p className="text-foreground-muted">No feedback data available</p>
          </div>
        )}
      </div>
    </main>
    </>
  )
}