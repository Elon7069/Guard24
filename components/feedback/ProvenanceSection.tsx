import { Provenance } from '@/types/feedback'
import { AlertTriangle, CheckCircle } from 'lucide-react'

interface ProvenanceSectionProps {
  provenance: Provenance
}

export function ProvenanceSection({ provenance }: ProvenanceSectionProps) {
  return (
    <div className="bg-surface rounded-lg border border-border p-6 space-y-4 transition-theme">
      <h2 className="text-lg font-semibold text-foreground">Provenance</h2>

      {/* Human Review Status */}
      <div className="flex items-center gap-3">
        {provenance?.human_review_needed ? (
          <>
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
              Human Review Needed
            </span>
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              No Review Needed
            </span>
          </>
        )}
      </div>

      {/* Trigger Reasons */}
      {provenance?.trigger_reasons && provenance.trigger_reasons.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground">
            Trigger Reasons:
          </h3>
          <div className="flex flex-wrap gap-2">
            {provenance.trigger_reasons.map((trigger, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded text-sm"
              >
                {trigger}
              </span>
            ))}
          </div>
        </div>
      )}

      {provenance.trigger_reasons && provenance.trigger_reasons.length === 0 && (
        <p className="text-sm text-foreground-muted italic">
          No specific triggers identified
        </p>
      )}
    </div>
  )
}