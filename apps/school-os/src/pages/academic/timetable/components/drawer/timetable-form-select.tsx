import { Label, ListBox, Select } from '@vezham/react-v3'

import { classNames } from '../../variants'

type TimetableFormSelectProps = {
  error?: string
  label: string
  options: string[]
  placeholder: string
  value: string
  onChange: (value: string) => void
}

export function TimetableFormSelect({
  error,
  label,
  options,
  placeholder,
  value,
  onChange
}: TimetableFormSelectProps) {
  return (
    <div className={classNames.field}>
      <Select
        fullWidth
        aria-label={label}
        aria-invalid={Boolean(error)}
        placeholder={placeholder}
        value={value || null}
        onChange={nextValue => onChange(nextValue ? String(nextValue) : '')}>
        <Label className={classNames.fieldLabel}>{label}</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {options.map(option => (
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
