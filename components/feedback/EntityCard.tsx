import { Entity } from '@/types/feedback'
import { ConfidenceBadge } from '@/components/ui/ConfidenceBadge'
import { Tag } from 'lucide-react'

interface EntityCardProps {
  entity: Entity
}

export function EntityCard({ entity }: EntityCardProps) {
  // Color coding for entity categories
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      operations: 'bg-blue-50 text-blue-700 border-blue-200',
      feature: 'bg-purple-50 text-purple-700 border-purple-200',
      competition: 'bg-red-50 text-red-700 border-red-200',
      product: 'bg-green-50 text-green-700 border-green-200',
    }
    return colors[category.toLowerCase()] || 'bg-gray-50 text-gray-700 border-gray-200'
  }

  return (
    <div className="bg-surface-elevated rounded-lg border border-border p-4 space-y-3 transition-theme hover:scale-102">
      <div className="flex items-start gap-2">
        <Tag className="w-4 h-4 text-foreground-muted mt-1 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground break-words">
            "{entity.extracted_entity_text}"
          </p>
          <p className="text-sm text-foreground-muted mt-1">
            → {entity.canonical_entity_label}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getCategoryColor(entity.entity_category)}`}>
            {entity.entity_category}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <ConfidenceBadge 
            score={entity.entity_label_confidence} 
            label="Label"
          />
          <ConfidenceBadge 
            score={entity.entity_category_confidence} 
            label="Category"
          />
        </div>

        <div className="text-xs text-foreground-muted">
          <span className="font-medium">Method:</span> {entity.extraction_method}
        </div>
      </div>
    </div>
  )
}