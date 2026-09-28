import { Surface } from '@vezham/react-v3'

import type { TimetableToolbarProps } from '../../types'
import { classNames } from '../../variants'
import { FilterDropdown } from './filter-dropdown'

export function TimetableToolbar({
  activeSortLabel,
  draftFilters,
  onApplyFilters,
  onResetFilters,
  onSortChange,
  setDraftFilters,
  sortDescriptor
}: TimetableToolbarProps) {
  return (
    <Surface className={classNames.toolbar}>
      <div className={classNames.headerRow}>
        <div>
          <p className={classNames.mutedText}>Academic</p>
          <h1 className={classNames.title}>Time Table</h1>
        </div>

        <div className={classNames.toolbarActions}>
          <FilterDropdown
            draftFilters={draftFilters}
            setDraftFilters={setDraftFilters}
            onApply={onApplyFilters}
            onReset={onResetFilters}
          />
        </div>
      </div>
    </Surface>
  )
}
