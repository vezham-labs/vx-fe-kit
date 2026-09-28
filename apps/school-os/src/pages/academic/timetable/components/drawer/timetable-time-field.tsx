import type { ComponentProps } from 'react'

import { Label, TimeField } from '@vezham/react-v3'

import { formatTimeFieldValue, getTimeFieldValue } from '../../utils/timetable'
import { classNames } from '../../variants'

type TimetableTimeFieldProps = {
  error?: string
  label: string
  value: string
  onChange: (value: string) => void
}

type TimeFieldValue = ComponentProps<typeof TimeField>['value']

export function TimetableTimeField({
  error,
  label,
  value,
  onChange
}: TimetableTimeFieldProps) {
  return (
    <div className={classNames.field}>
      <TimeField
        fullWidth
        aria-label={label}
        granularity="minute"
        hourCycle={24}
        isInvalid={Boolean(error)}
        value={getTimeFieldValue(value) as TimeFieldValue}
        onChange={nextValue =>
          onChange(nextValue ? formatTimeFieldValue(nextValue) : '')
        }>
        <Label className={classNames.fieldLabel}>{label}</Label>
        <TimeField.Group fullWidth>
          <TimeField.Input>
            {segment => <TimeField.Segment segment={segment} />}
          </TimeField.Input>
        </TimeField.Group>
      </TimeField>
      {error && <p className={classNames.fieldError}>{error}</p>}
    </div>
  )
}
