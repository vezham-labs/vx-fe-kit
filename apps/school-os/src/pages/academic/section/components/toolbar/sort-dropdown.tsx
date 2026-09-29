import { type SortDescriptor } from '@vezham/react-v3'

import {
  sectionColumnOptions,
  sortOptions,
  sortOrderOptions
} from '@pages/academic/section/data'
import { classNames } from '@pages/academic/section/variants'
import { SortDropdown as SharedSortDropdown } from '@pages/academic/shared/sort-dropdown'

type Props = {
  activeSortLabel: string
  sortDirection: SortDescriptor['direction']
  sortField: SortDescriptor['column']
  onSortDirectionChange: (direction: SortDescriptor['direction']) => void
  onSortFieldChange: (column: SortDescriptor['column']) => void
}

const availableSortOptions = [
  ...sortOptions,
  ...sectionColumnOptions.map(option => ({
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
