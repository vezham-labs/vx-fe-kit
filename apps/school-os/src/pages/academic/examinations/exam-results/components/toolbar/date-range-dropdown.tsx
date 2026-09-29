import { dateOptions } from '@pages/academic/examinations/exam-results/data'
import type {
  CustomDateRangeValue,
  DatePresetKey
} from '@pages/academic/examinations/exam-results/types'
import { classNames } from '@pages/academic/examinations/exam-results/variants'
import { AcademicDateRangeDropdown } from '@pages/academic/shared/date-range-dropdown'

type Props = {
  activeDateLabel: string
  datePreset: DatePresetKey
  isCustomDateRangeOpen: boolean
  isDateDropdownOpen: boolean
  onCustomDateRangeChange: (value: CustomDateRangeValue | null) => void
  onCustomDateRangeOpenChange: (isOpen: boolean) => void
  onDateDropdownOpenChange: (isOpen: boolean) => void
  onDatePresetChange: (key: DatePresetKey) => void
}

export const DateRangeDropdown = (props: Props) => (
  <AcademicDateRangeDropdown
    {...props}
    ariaLabel="Exam results custom date range"
    classes={classNames}
    closeCustomOnDismiss={false}
    dateOptions={dateOptions}
  />
)
