import { HeatmapData, getCellsForPosition, getCellSize } from '@/utils/heatmap'
import { HeatmapCell } from './HeatmapCell'
import { Fragment } from 'react'

interface HeatmapGridProps {
  data: HeatmapData
}

export function HeatmapGrid({ data }: HeatmapGridProps) {
  const { themes, uniqueReasonLabels, cells } = data

  if (cells.length === 0) {
    return (
      <div className="bg-surface rounded-lg border border-border p-12 text-center transition-theme">
        <p className="text-foreground-muted">No data available for heatmap</p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-surface via-surface to-surface-elevated rounded-xl border border-border shadow-2xl p-8 overflow-x-auto transition-theme">
      <div className="min-w-max">
        {/* CSS Grid Layout with better spacing */}
        <div 
          className="grid gap-4"
          style={{ 
            gridTemplateColumns: `160px repeat(${uniqueReasonLabels.length}, 110px)`,
            gridTemplateRows: `70px repeat(${themes.length}, minmax(100px, auto))`
          }}
        >
          {/* Top-left corner cell - styled */}
          <div className="border-b-2 border-r-2 border-border/60 bg-surface-hover/50 rounded-tl-lg" />
          
          {/* Column headers - Reason Labels with improved styling */}
          {uniqueReasonLabels.map((label) => (
            <div
              key={label}
              className="flex items-end justify-center pb-3 border-b-2 border-border/60 bg-gradient-to-b from-surface-hover/30 to-transparent"
            >
              <span className="text-xs font-bold text-foreground transform -rotate-45 origin-bottom-left whitespace-nowrap tracking-wide">
                {label}
              </span>
            </div>
          ))}

          {/* Grid cells with enhanced theme labels */}
          {themes.map((theme, themeIndex) => (
            <Fragment key={theme}>
              {/* Theme label (row header) - Much more prominent */}
              <div
                className="flex items-center justify-end pr-5 border-r-2 border-border/60 bg-gradient-to-r from-surface-hover/50 to-transparent relative group"
              >
                <div className="absolute inset-y-2 right-0 w-1 bg-primary/40 rounded-l transition-all duration-300 group-hover:w-2 group-hover:bg-primary" />
                <span className="text-sm font-bold text-foreground text-right leading-tight transition-all duration-300 group-hover:text-primary group-hover:scale-105">
                  {theme}
                </span>
              </div>

              {/* Cells for this theme row */}
              {uniqueReasonLabels.map((reasonLabel) => {
                const cellsForPosition = getCellsForPosition(
                  cells,
                  theme,
                  reasonLabel
                )

                return (
                  <div
                    key={`${theme}-${reasonLabel}`}
                    className="flex items-center justify-center gap-2 flex-wrap p-2 bg-surface/30 rounded-lg transition-all duration-300 hover:bg-surface-hover/30"
                  >
                    {cellsForPosition.map((cell, idx) => {
                      const size = getCellSize(cell.evidenceCount) as 'small' | 'medium' | 'large'
                      return (
                        <HeatmapCell
                          key={`${cell.reasonId}-${idx}`}
                          cell={cell}
                          size={size}
                        />
                      )
                    })}
                  </div>
                )
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}