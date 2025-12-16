import { ConfidenceBadge } from '@/components/ui/ConfidenceBadge'

interface CleanTextSectionProps {
  cleanText: string
  cleanTextConfidence: number
  summary: string | null
  summaryConfidence: number
  language: string
  languageConfidence: number
}

export function CleanTextSection({
  cleanText,
  cleanTextConfidence,
  summary,
  summaryConfidence,
  language,
  languageConfidence
}: CleanTextSectionProps) {
  return (
    <div className="bg-surface rounded-lg border border-border p-6 space-y-4 transition-theme">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Feedback Text
        </h2>
        <p className="text-foreground-muted leading-relaxed">
          {cleanText}
        </p>
        <div className="mt-2">
          <ConfidenceBadge score={cleanTextConfidence} label="Confidence" />
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-sm font-semibold text-foreground mb-2">
          Summary
        </h3>
        {summary ? (
          <>
            <p className="text-foreground-muted text-sm italic">
              {summary}
            </p>
            <div className="mt-2">
              <ConfidenceBadge score={summaryConfidence} label="Confidence" />
            </div>
          </>
        ) : (
          <p className="text-gray-400 text-sm italic">
            Summary not available
          </p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground-muted">Language:</span>
          <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm font-medium uppercase">
            {language}
          </span>
          <ConfidenceBadge score={languageConfidence} />
        </div>
      </div>
    </div>
  )
}