import { type SortDescriptor } from '@vezham/react-v3'

import { sortOptions } from '@pages/academic/examinations/exam-schedule/data'
import { SortDropdown as SharedSortDropdown } from '@pages/academic/shared/sort-dropdown'

type Props = {
  activeSortLabel: string
  sortDirection: SortDescriptor['direction']
  sortField: SortDescriptor['column']
  onSortDirectionChange: (direction: SortDescriptor['direction']) => void
  onSortFieldChange: (column: SortDescriptor['column']) => void
}

export const SortDropdown = ({
  activeSortLabel,
  sortDirection,
  sortField,
  onSortDirectionChange,
  onSortFieldChange
}: Props) => {
  return (
    <SharedSortDropdown
      ariaLabel="Sort exam schedules"
      activeSortLabel={activeSortLabel}
      sortDirection={sortDirection}
      sortField={sortField}
      sortOptions={sortOptions}
      onSortDirectionChange={onSortDirectionChange}
      onSortFieldChange={onSortFieldChange}
    />
  )
}
