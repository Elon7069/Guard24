import { AlertCircle } from 'lucide-react'

interface ErrorStateProps {
  error: string
  onRetry?: () => void
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="bg-error-light border border-error rounded-lg p-6 text-center transition-theme">
        <AlertCircle className="w-12 h-12 text-error mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Error Loading Feedback
        </h3>
        <p className="text-foreground-muted mb-4">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-error text-white rounded-lg hover:brightness-110 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}