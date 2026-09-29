import {
  AltArrowDown as AltArrowDownIcon,
  AltArrowLeft as AltArrowLeftIcon,
  CalendarDate as CalendarDateIcon,
  CheckRead as CheckReadIcon
} from '@vezham/icons-react'
import {
  Button,
  DateField,
  DateRangePicker,
  Dropdown,
  RangeCalendar,
  Surface
} from '@vezham/react-v3'

import type {
  CustomDateRangeValue,
  DatePresetKey
} from '@pages/academic/class-routine/types'
import { classNames } from '@pages/academic/class-routine/variants'
import { dateOptions } from '@store/useAcademic/useClassRoutine'

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

export const DateRangeDropdown = ({
  activeDateLabel,
  datePreset,
  isCustomDateRangeOpen,
  isDateDropdownOpen,
  onCustomDateRangeChange,
  onCustomDateRangeOpenChange,
  onDateDropdownOpenChange,
  onDatePresetChange
}: Props) => {
  return (
    <Dropdown
      isOpen={isDateDropdownOpen}
      onOpenChange={onDateDropdownOpenChange}>
      <Dropdown.Trigger>
        <Button variant="outline">
          <CalendarDateIcon size={16} aria-hidden="true" />
          {activeDateLabel}
          <AltArrowDownIcon size={16} aria-hidden="true" />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Surface className={classNames.datePopover}>
          {isCustomDateRangeOpen ? (
            <div className={classNames.customDatePanel}>
              <Button
                variant="ghost"
                onPress={() => onCustomDateRangeOpenChange(false)}>
                <AltArrowLeftIcon size={16} aria-hidden="true" />
                Date presets
              </Button>
              <DateRangePicker
                defaultOpen
                aria-label="Schedule custom date range"
                className={classNames.fullWidth}
                endName="endDate"
                startName="startDate"
                onChange={onCustomDateRangeChange}>
                <DateField.Group fullWidth>
                  <DateField.Input slot="start">
                    {segment => <DateField.Segment segment={segment} />}
                  </DateField.Input>
                  <DateRangePicker.RangeSeparator />
                  <DateField.Input slot="end">
                    {segment => <DateField.Segment segment={segment} />}
                  </DateField.Input>
                  <DateField.Suffix>
                    <DateRangePicker.Trigger>
                      <DateRangePicker.TriggerIndicator />
                    </DateRangePicker.Trigger>
                  </DateField.Suffix>
                </DateField.Group>
                <DateRangePicker.Popover>
                  <RangeCalendar aria-label="Schedule custom date range">
                    <RangeCalendar.Header>
                      <RangeCalendar.Heading />
                      <RangeCalendar.NavButton slot="previous" />
                      <RangeCalendar.NavButton slot="next" />
                    </RangeCalendar.Header>
                    <RangeCalendar.Grid>
                      <RangeCalendar.GridHeader>
                        {day => (
                          <RangeCalendar.HeaderCell>
                            {day}
                          </RangeCalendar.HeaderCell>
                        )}
                      </RangeCalendar.GridHeader>
                      <RangeCalendar.GridBody>
                        {date => <RangeCalendar.Cell date={date} />}
                      </RangeCalendar.GridBody>
                    </RangeCalendar.Grid>
                  </RangeCalendar>
                </DateRangePicker.Popover>
              </DateRangePicker>
            </div>
          ) : (
            <Dropdown.Menu aria-label="Date presets">
              {dateOptions.map(option => (
                <Dropdown.Item
                  key={option.key}
                  id={option.key}
                  textValue={option.label}
                  onPress={() => onDatePresetChange(option.key)}>
                  <span className={classNames.dateOptionLabel}>
                    {option.label}
                    {datePreset === option.key && (
                      <CheckReadIcon size={16} aria-hidden="true" />
                    )}
                  </span>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          )}
        </Surface>
      </Dropdown.Popover>
    </Dropdown>
  )
}
