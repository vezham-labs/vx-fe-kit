import { CalendarDate } from '@internationalized/date'

import {
  Calendar,
  DateField,
  DatePicker,
  Input,
  Label,
  ListBox,
  Select
} from '@vezham/react-v3'

import { endtimeOptions, starttimeOptions } from '../../data'
import type { ClassFormProps } from '../../types'
import { classNames } from '../../variants'

export function ExamForm({ form, formErrors, onFormChange }: ClassFormProps) {
  return (
    <div className={classNames.form}>
      <div className={classNames.formFields}>
        <div className={classNames.field}>
          <Label className={classNames.fieldLabel}>Exam Name</Label>
          <Input
            fullWidth
            aria-invalid={Boolean(formErrors.name)}
            placeholder="Enter class name"
            value={form.name}
            onChange={event => onFormChange('name', event.target.value)}
          />
          {formErrors.name && (
            <p className={classNames.fieldError}>{formErrors.name}</p>
          )}
        </div>

        <DatePicker
          className="w-full"
          name="date"
          value={toCalendarDate(form.date)}
          onChange={value => onFormChange('date', value ? String(value) : '')}>
          <Label>Date</Label>

          <DateField.Group fullWidth>
            <DateField.Input>
              {segment => <DateField.Segment segment={segment} />}
            </DateField.Input>

            <DateField.Suffix>
              <DatePicker.Trigger>
                <DatePicker.TriggerIndicator />
              </DatePicker.Trigger>
            </DateField.Suffix>
          </DateField.Group>

          <DatePicker.Popover>
            <Calendar aria-label="Event date">
              <Calendar.Header>
                <Calendar.YearPickerTrigger>
                  <Calendar.YearPickerTriggerHeading />
                  <Calendar.YearPickerTriggerIndicator />
                </Calendar.YearPickerTrigger>

                <Calendar.NavButton slot="previous" />
                <Calendar.NavButton slot="next" />
              </Calendar.Header>

              <Calendar.Grid>
                <Calendar.GridHeader>
                  {day => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                </Calendar.GridHeader>

                <Calendar.GridBody>
                  {date => <Calendar.Cell date={date} />}
                </Calendar.GridBody>
              </Calendar.Grid>

              <Calendar.YearPickerGrid>
                <Calendar.YearPickerGridBody>
                  {({ year }) => <Calendar.YearPickerCell year={year} />}
                </Calendar.YearPickerGridBody>
              </Calendar.YearPickerGrid>
            </Calendar>
          </DatePicker.Popover>
        </DatePicker>
        {formErrors.date && (
          <p className={classNames.selectError}>{formErrors.date}</p>
        )}

        <Select
          fullWidth
          aria-label="Start time"
          aria-invalid={Boolean(formErrors.starttime)}
          placeholder="Select start time"
          value={form.starttime || null}
          onChange={value =>
            onFormChange('starttime', value ? String(value) : '')
          }>
          <Label className={classNames.fieldLabel}>Start Time</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {starttimeOptions.map(option => (
                <ListBox.Item key={option} id={option} textValue={option}>
                  {option}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
        {formErrors.starttime && (
          <p className={classNames.selectError}>{formErrors.starttime}</p>
        )}

        <Select
          fullWidth
          aria-label="End time"
          aria-invalid={Boolean(formErrors.endtime)}
          placeholder="Select end time"
          value={form.endtime || null}
          onChange={value =>
            onFormChange('endtime', value ? String(value) : '')
          }>
          <Label className={classNames.fieldLabel}>End Time</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {endtimeOptions.map(option => (
                <ListBox.Item key={option} id={option} textValue={option}>
                  {option}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
        {formErrors.endtime && (
          <p className={classNames.selectError}>{formErrors.endtime}</p>
        )}
      </div>
    </div>
  )
}

function toCalendarDate(value: string | null): any {
  if (!value) {
    return null
  }

  const [year, month, day] = value.split('-').map(Number)

  if (!year || !month || !day) {
    return null
  }

  return new CalendarDate(year, month, day)
}
