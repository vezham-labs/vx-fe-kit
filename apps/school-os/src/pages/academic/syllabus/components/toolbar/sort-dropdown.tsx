import { type SortDescriptor } from '@vezham/react-v3'

import { SortDropdown as SharedSortDropdown } from '@pages/academic/shared/sort-dropdown'
import {
  sortOptions,
  sortOrderOptions,
  syllabusColumnOptions
} from '@pages/academic/syllabus/data'
import { classNames } from '@pages/academic/syllabus/variants'

type Props = {
  activeSortLabel: string
  sortDirection: SortDescriptor['direction']
  sortField: SortDescriptor['column']
  onSortDirectionChange: (direction: SortDescriptor['direction']) => void
  onSortFieldChange: (column: SortDescriptor['column']) => void
}

const availableSortOptions = [
  ...sortOptions,
  ...syllabusColumnOptions.map(option => ({
    key: option.key,
    label: option.label,
    column: option.key
  }))
]

export const SortDropdown = (props: Props) => (
  <SharedSortDropdown
    {...props}
    ariaLabel="Sort schedules"
    itemClassName={classNames.dateOptionLabel}
    sortOptions={availableSortOptions}
    sortOrderOptions={sortOrderOptions}
  />
)
