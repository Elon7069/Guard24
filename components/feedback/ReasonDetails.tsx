import { ReasonWithRelations } from '@/types/feedback'
import { SentimentBar } from '@/components/ui/SentimentBar'
import { EmotionBar } from '@/components/ui/EmotionBar'
import { ConfidenceBadge } from '@/components/ui/ConfidenceBadge'
import { getEmotionsArray } from '@/utils/emotion'
import { EntitiesSection } from './EntitiesSection'
import { Lightbulb, MessageSquare, Target } from 'lucide-react'

interface ReasonDetailsProps {
  reason: ReasonWithRelations
}

export function ReasonDetails({ reason }: ReasonDetailsProps) {
  const emotions = getEmotionsArray(reason.reason_emotion_scores)

  // Icon for intent
  const getIntentIcon = (intent: string) => {
    if (intent.toLowerCase().includes('complaint')) {
      return <MessageSquare className="w-4 h-4" />
    }
    if (intent.toLowerCase().includes('suggestion')) {
      return <Lightbulb className="w-4 h-4" />
    }
    return <Target className="w-4 h-4" />
  }

  return (
    <div className="pt-4 space-y-4">
      {/* Extracted text */}
      <div className="bg-surface-elevated border-l-4 border-primary p-4 rounded transition-theme">
        <p className="text-foreground-muted italic">
          "{reason.extracted_reason_text}"
        </p>
        <p className="text-xs text-foreground-muted mt-2">
          Extraction method: {reason.extraction_method}
        </p>
      </div>

      {/* Theme and Intent */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground-muted">Theme:</span>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
            {reason.theme_label}
          </span>
          <ConfidenceBadge score={reason.theme_confidence} />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground-muted">Intent:</span>
          <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium flex items-center gap-1">
            {getIntentIcon(reason.reason_intent)}
            {reason.reason_intent}
          </span>
          <ConfidenceBadge score={reason.reason_intent_confidence} />
        </div>
      </div>

      {/* Sentiment */}
      <div className="bg-surface border border-border rounded-lg p-4 transition-theme">
        <SentimentBar 
          score={reason.reason_sentiment_score}
          confidence={reason.reason_sentiment_score_confidence}
        />
        <div className="mt-2">
          <ConfidenceBadge 
            score={reason.reason_sentiment_score_confidence} 
            label="Sentiment Confidence"
          />
        </div>
      </div>

      {/* Emotions */}
      {emotions.length > 0 && (
        <div className="bg-surface border border-border rounded-lg p-4 space-y-3 transition-theme">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-semibold text-foreground">
              Emotion Distribution
            </h4>
            <ConfidenceBadge 
              score={reason.reason_emotion_scores.emotion_confidence}
              label="Confidence"
            />
          </div>
          <div className="space-y-2">
            {emotions.map((emotion) => (
              <EmotionBar
                key={emotion.name}
                name={emotion.name}
                value={emotion.value}
                color={emotion.color}
              />
            ))}
          </div>
        </div>
      )}

      {/* Evidence Snippets */}
      {reason.reason_evidence_snippets && reason.reason_evidence_snippets.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-foreground">
              Evidence Snippets
            </h4>
            <ConfidenceBadge score={reason.reason_evidence_snippets_confidence} />
          </div>
          <div className="flex flex-wrap gap-2">
            {reason.reason_evidence_snippets.map((snippet, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-sm"
              >
                {snippet}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Action */}
      {reason.reason_suggested_action && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-green-900 mb-1">
                Suggested Action
              </h4>
              <p className="text-sm text-green-800">
                {reason.reason_suggested_action}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Entities */}
      <EntitiesSection entities={reason.entities} />
    </div>
  )
}