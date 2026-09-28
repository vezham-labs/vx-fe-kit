import { type SortDescriptor } from '@vezham/react-v3'

import { sortOptions } from '@pages/academic/examinations/exam-attendance/data'
import { SortDropdown as SharedSortDropdown } from '@pages/academic/shared/sort-dropdown'

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
      ariaLabel="Sort attendance"
      activeSortLabel={activeSortLabel}
      sortDirection={sortDirection}
      sortField={sortField}
      sortOptions={sortOptions}
      onSortDirectionChange={onSortDirectionChange}
      onSortFieldChange={onSortFieldChange}
    />
  )
}
