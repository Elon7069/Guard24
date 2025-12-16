export function LoadingSkeleton() {
    return (
      <div className="w-full max-w-5xl mx-auto p-6 space-y-6 animate-pulse">
        {/* Header skeleton */}
        <div className="space-y-3">
          <div className="h-8 bg-surface-elevated rounded w-1/4"></div>
          <div className="h-24 bg-surface-elevated rounded"></div>
          <div className="flex gap-2">
            <div className="h-6 bg-surface-elevated rounded w-20"></div>
            <div className="h-6 bg-surface-elevated rounded w-20"></div>
            <div className="h-6 bg-surface-elevated rounded w-20"></div>
          </div>
        </div>
  
        {/* Reasons skeleton */}
        <div className="space-y-4">
          <div className="h-6 bg-surface-elevated rounded w-1/3"></div>
          {[1, 2].map((i) => (
            <div key={i} className="border border-border rounded-lg p-4 space-y-3 bg-surface">
              <div className="h-6 bg-surface-elevated rounded w-2/3"></div>
              <div className="h-4 bg-surface-elevated rounded w-full"></div>
              <div className="h-4 bg-surface-elevated rounded w-5/6"></div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="h-20 bg-surface-elevated rounded"></div>
                <div className="h-20 bg-surface-elevated rounded"></div>
              </div>
            </div>
          ))}
        </div>
  
        {/* Provenance skeleton */}
        <div className="border border-border rounded-lg p-4 space-y-2 bg-surface">
          <div className="h-6 bg-surface-elevated rounded w-1/4"></div>
          <div className="h-4 bg-surface-elevated rounded w-1/3"></div>
        </div>
      </div>
    )
  }