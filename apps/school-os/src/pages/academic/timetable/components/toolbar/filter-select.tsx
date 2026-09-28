import { Label, ListBox, Select } from '@vezham/react-v3'

type FilterSelectProps = {
  label: string
  options: string[]
  placeholder: string
  value: string | null
  onChange: (value: string | null) => void
}

export function FilterSelect({
  label,
  options,
  placeholder,
  value,
  onChange
}: FilterSelectProps) {
  return (
    <Select
      fullWidth
      aria-label={`Filter by ${label.toLowerCase()}`}
      placeholder={placeholder}
      value={value}
      onChange={nextValue => onChange(nextValue ? String(nextValue) : null)}>
      <Label>{label}</Label>
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
  )
}
