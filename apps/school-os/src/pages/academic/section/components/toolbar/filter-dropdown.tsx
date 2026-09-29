import { sectionOptions, statusOptions } from '@pages/academic/section/data'
import type { FilterDropdownProps } from '@pages/academic/section/types'
import { classNames } from '@pages/academic/section/variants'
import { AcademicFilterDropdown } from '@pages/academic/shared/filter-dropdown'

const filters = [
  {
    field: 'section',
    ariaLabel: 'Filter by section',
    label: 'Section',
    placeholder: 'Select section',
    options: sectionOptions
  },
  {
    field: 'status',
    ariaLabel: 'Filter by capacity',
    label: 'Status',
    placeholder: 'Select status',
    options: statusOptions
  }
] as const

export const FilterDropdown = (props: FilterDropdownProps) => (
  <AcademicFilterDropdown {...props} classes={classNames} filters={filters} />
)
