import { Input, Label, ListBox, Select } from '@vezham/react-v3'

import { statusOptions } from '../../data'
import type {
  AttendanceFormProps,
  AttendanceFormState,
  AttendanceStatus
} from '../../types'
import { classNames } from '../../variants'

const attendanceSubjectFields: {
  key: keyof Pick<
    AttendanceFormState,
    | 'english'
    | 'spanish'
    | 'physics'
    | 'chemistry'
    | 'maths'
    | 'computer'
    | 'envscience'
  >
  label: string
}[] = [
  { key: 'english', label: 'English' },
  { key: 'spanish', label: 'Spanish' },
  { key: 'physics', label: 'Physics' },
  { key: 'chemistry', label: 'Chemistry' },
  { key: 'maths', label: 'Maths' },
  { key: 'computer', label: 'Computer' },
  { key: 'envscience', label: 'Env Science' }
]

export function AttendanceForm({
  form,
  formErrors,
  onFormChange
}: AttendanceFormProps) {
  return (
    <div className={classNames.form}>
      <div className={classNames.formFields}>
        <div className={classNames.field}>
          <Label className={classNames.fieldLabel}>Name</Label>
          <Input
            fullWidth
            aria-invalid={Boolean(formErrors.name)}
            placeholder="Enter name"
            value={form.name}
            onChange={event => onFormChange('name', event.target.value)}
          />
          {formErrors.name && (
            <p className={classNames.fieldError}>{formErrors.name}</p>
          )}
        </div>

        {attendanceSubjectFields.map(field => (
          <AttendanceStatusSelect
            key={field.key}
            error={formErrors[field.key]}
            field={field.key}
            label={field.label}
            value={form[field.key]}
            onFormChange={onFormChange}
          />
        ))}

        <AttendanceStatusSelect
          error={formErrors.status}
          field="status"
          label="Status"
          value={form.status}
          onFormChange={onFormChange}
        />
      </div>
    </div>
  )
}

function AttendanceStatusSelect({
  error,
  field,
  label,
  value,
  onFormChange
}: {
  error?: string
  field: keyof AttendanceFormState
  label: string
  value: AttendanceStatus
  onFormChange: (field: keyof AttendanceFormState, value: string) => void
}) {
  return (
    <div className={classNames.field}>
      <Label className={classNames.fieldLabel}>{label}</Label>
      <Select
        aria-invalid={Boolean(error)}
        aria-label={label}
        value={value}
        onChange={nextValue =>
          onFormChange(field, nextValue ? String(nextValue) : '')
        }>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {statusOptions.map(option => (
              <ListBox.Item key={option} id={option} textValue={option}>
                {option}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
      {error && <p className={classNames.fieldError}>{error}</p>}
    </div>
  )
}
