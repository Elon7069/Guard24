'use client'

import { useFeedback } from '@/hooks/useFeedback'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { CleanTextSection } from './CleanTextSection'
import { ReasonsAccordion } from './ReasonsAccordion'
import { ProvenanceSection } from './ProvenanceSection'
import { AnimatedCard, FadeIn } from '@/components/ui/AnimatedComponents'
import { RefreshCw, BarChart3 } from 'lucide-react'
import Link from 'next/link'

interface FeedbackViewerProps {
  feedbackId?: string
}

export function FeedbackViewer({ feedbackId }: FeedbackViewerProps) {
  const { feedback, loading, error, refetch } = useFeedback(feedbackId)

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />
  }

  if (!feedback) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <div className="bg-surface border border-border rounded-lg p-6 text-center transition-theme">
          <p className="text-foreground-muted">No feedback data available</p>
          <button
            onClick={refetch}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Load Feedback
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      {/* Grid layout for header */}
      <FadeIn delay={0.1}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Feedback Detail Viewer
            </h1>
            <p className="text-sm text-foreground-muted mt-1">
              ID: {feedback.feedback_id}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/heatmap?id=${feedback.feedback_id}`}
              className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg hover:bg-surface-hover transition-all duration-200 hover:scale-105 active:scale-95"
              title="View heatmap for this feedback"
            >
              <BarChart3 className="w-4 h-4" />
              View Heatmap
            </Link>
            <button
              onClick={refetch}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-all duration-200 hover:scale-105 active:scale-95"
              title="Load new random feedback"
            >
              <RefreshCw className="w-4 h-4" />
              New Feedback
            </button>
          </div>
        </div>
      </FadeIn>

      {/* CSS Grid Layout for content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main content area (left side) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Clean Text & Summary Section */}
          <AnimatedCard delay={0.2}>
            <CleanTextSection
              cleanText={feedback.clean_text}
              cleanTextConfidence={feedback.clean_text_confidence}
              summary={feedback.one_liner_summary}
              summaryConfidence={feedback.one_liner_summary_confidence}
              language={feedback.feedback_language}
              languageConfidence={feedback.feedback_language_confidence}
            />
          </AnimatedCard>

          {/* Reasons Section */}
          <AnimatedCard delay={0.3}>
            <ReasonsAccordion reasons={feedback.reasons} />
          </AnimatedCard>
        </div>

        {/* Sidebar (right side) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Provenance Section */}
          <AnimatedCard delay={0.4}>
            <ProvenanceSection provenance={feedback.provenance} />
          </AnimatedCard>
        </div>
      </div>
    </div>
  )
}