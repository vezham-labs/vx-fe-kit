import { CalendarDate } from '@internationalized/date'

import { Calendar, DateField, DatePicker, Input, Label } from '@vezham/react-v3'
import type { DateValue } from '@vezham/react-v3'

import {
  endtimeOptions,
  starttimeOptions
} from '@pages/academic/examinations/exam/data'
import type { ClassFormProps } from '@pages/academic/examinations/exam/types'
import { classNames } from '@pages/academic/examinations/exam/variants'
import { AcademicSelectField } from '@pages/academic/shared/select-field'

export const ExamForm = ({
  form,
  formErrors,
  onFormChange
}: ClassFormProps) => {
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

        <AcademicSelectField
          ariaLabel="Start time"
          error={formErrors.starttime}
          errorClassName={classNames.selectError}
          label="Start Time"
          labelClassName={classNames.fieldLabel}
          options={starttimeOptions}
          placeholder="Select start time"
          value={form.starttime}
          onChange={value => onFormChange('starttime', value)}
        />

        <AcademicSelectField
          ariaLabel="End time"
          error={formErrors.endtime}
          errorClassName={classNames.selectError}
          label="End Time"
          labelClassName={classNames.fieldLabel}
          options={endtimeOptions}
          placeholder="Select end time"
          value={form.endtime}
          onChange={value => onFormChange('endtime', value)}
        />
      </div>
    </div>
  )
}

function toCalendarDate(value: string | null): DateValue | null {
  if (!value) {
    return null
  }

  const [year, month, day] = value.split('-').map(Number)

  if (!year || !month || !day) {
    return null
  }

  return new CalendarDate(year, month, day) as unknown as DateValue
}
