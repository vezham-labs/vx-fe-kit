import { type SortDescriptor } from '@vezham/react-v3'

import { SortDropdown as SharedSortDropdown } from '../../../../shared/sort-dropdown'
import { sortOptions } from '../../data'

type SortDropdownProps = {
  activeSortLabel: string
  sortDirection: SortDescriptor['direction']
  sortField: SortDescriptor['column']
  onSortDirectionChange: (direction: SortDescriptor['direction']) => void
  onSortFieldChange: (column: SortDescriptor['column']) => void
}

export function SortDropdown({
  activeSortLabel,
  sortDirection,
  sortField,
  onSortDirectionChange,
  onSortFieldChange
}: SortDropdownProps) {
  return (
    <SharedSortDropdown
      ariaLabel="Sort exams"
      activeSortLabel={activeSortLabel}
      sortDirection={sortDirection}
      sortField={sortField}
      sortOptions={sortOptions}
      onSortDirectionChange={onSortDirectionChange}
      onSortFieldChange={onSortFieldChange}
    />
  )
}
