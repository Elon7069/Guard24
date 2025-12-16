import { Entity } from '@/types/feedback'
import { EntityCard } from './EntityCard'

interface EntitiesSectionProps {
  entities: Entity[]
}

export function EntitiesSection({ entities }: EntitiesSectionProps) {
  if (entities.length === 0) {
    return (
      <div className="mt-4 p-4 bg-surface-elevated rounded-lg border border-border transition-theme">
        <p className="text-sm text-foreground-muted italic">
          No entities detected in this reason
        </p>
      </div>
    )
  }

  return (
    <div className="mt-4 space-y-3">
      <h4 className="text-sm font-semibold text-foreground">
        Entities ({entities.length})
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {entities.map((entity) => (
          <EntityCard key={entity.id} entity={entity} />
        ))}
      </div>
    </div>
  )
}