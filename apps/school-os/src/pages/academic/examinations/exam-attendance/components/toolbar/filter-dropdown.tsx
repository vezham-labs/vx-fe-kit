import {
  classOptions,
  examtypeOptions,
  sectionOptions
} from '@pages/academic/examinations/exam-attendance/data'
import type { FilterDropdownProps } from '@pages/academic/examinations/exam-attendance/types'
import { classNames } from '@pages/academic/examinations/exam-attendance/variants'
import { AcademicFilterDropdown } from '@pages/academic/shared/filter-dropdown'

const filters = [
  {
    field: 'classes',
    ariaLabel: 'Filter by classes',
    label: 'Class',
    placeholder: 'Select classes',
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
    field: 'examtype',
    ariaLabel: 'Filter by examtype',
    label: 'Exam Type',
    placeholder: 'Select examtype',
    options: examtypeOptions
  }
] as const

export const FilterDropdown = (props: FilterDropdownProps) => (
  <AcademicFilterDropdown {...props} classes={classNames} filters={filters} />
)
