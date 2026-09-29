import type {
  CustomDateRangeValue,
  DatePresetKey
} from '@pages/academic/classes/all-classes/types'
import { classNames } from '@pages/academic/classes/all-classes/variants'
import { AcademicDateRangeDropdown } from '@pages/academic/shared/date-range-dropdown'
import { dateOptions } from '@store/useAcademic/useAllClasses'

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
    ariaLabel="Class custom date range"
    classes={classNames}
    closeCustomOnDismiss={false}
    dateOptions={dateOptions}
  />
)
