import { AcademicFilterDropdown } from '@pages/academic/shared/filter-dropdown'
import {
  classOptions,
  sectionOptions,
  statusOptions
} from '@pages/academic/syllabus/data'
import type { FilterDropdownProps } from '@pages/academic/syllabus/types'
import { classNames } from '@pages/academic/syllabus/variants'

const filters = [
  {
    field: 'classes',
    ariaLabel: 'Filter by Class',
    label: 'Class',
    placeholder: 'Select Class',
    options: classOptions
  },
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
