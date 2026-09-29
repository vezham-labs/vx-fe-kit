import { type SortDescriptor } from '@vezham/react-v3'

import { SortDropdown as SharedSortDropdown } from '@pages/academic/shared/sort-dropdown'
import {
  sortOptions,
  sortOrderOptions,
  subjectColumnOptions
} from '@pages/academic/subject/data'
import { classNames } from '@pages/academic/subject/variants'

type Props = {
  activeSortLabel: string
  sortDirection: SortDescriptor['direction']
  sortField: SortDescriptor['column']
  onSortDirectionChange: (direction: SortDescriptor['direction']) => void
  onSortFieldChange: (column: SortDescriptor['column']) => void
}

const availableSortOptions = [
  ...sortOptions,
  ...subjectColumnOptions.map(option => ({
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
