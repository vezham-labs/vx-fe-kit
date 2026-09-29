import { AcademicDateRangeDropdown } from '@pages/academic/shared/date-range-dropdown'
import { dateOptions } from '@pages/academic/syllabus/data'
import type {
  CustomDateRangeValue,
  DatePresetKey
} from '@pages/academic/syllabus/types'
import { classNames } from '@pages/academic/syllabus/variants'

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
    ariaLabel="Schedule custom date range"
    classes={classNames}
    closeCustomOnDismiss={false}
    dateOptions={dateOptions}
  />
)
