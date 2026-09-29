import {
  AltArrowDown as AltArrowDownIcon,
  Filter as FilterIcon
} from '@vezham/icons-react'
import {
  Button,
  Dropdown,
  Label,
  ListBox,
  Select,
  Surface
} from '@vezham/react-v3'

type FilterClasses = {
  filterActions: string
  filterPanel: string
  filterTitle: string
}

type FilterOption<Field extends string> = {
  ariaLabel: string
  field: Field
  label: string
  options: readonly string[]
  placeholder: string
}

type Props<Draft extends Record<string, string | null>> = {
  classes: FilterClasses
  draftFilters: Draft
  filters: readonly FilterOption<Extract<keyof Draft, string>>[]
  setDraftFilters: (filters: Draft) => void
  onApply: () => void
  onReset: () => void
}

export const AcademicFilterDropdown = <
  Draft extends Record<string, string | null>
>({
  classes,
  draftFilters,
  filters,
  setDraftFilters,
  onApply,
  onReset
}: Props<Draft>) => (
  <Dropdown>
    <Dropdown.Trigger>
      <Button variant="outline">
        <FilterIcon size={16} aria-hidden="true" />
        Filter
        <AltArrowDownIcon size={16} aria-hidden="true" />
      </Button>
    </Dropdown.Trigger>
    <Dropdown.Popover>
      <Surface className={classes.filterPanel}>
        <h2 className={classes.filterTitle}>Filter</h2>
        {filters.map(filter => (
          <Select
            key={filter.field}
            fullWidth
            aria-label={filter.ariaLabel}
            placeholder={filter.placeholder}
            value={draftFilters[filter.field]}
            onChange={value =>
              setDraftFilters({
                ...draftFilters,
                [filter.field]: value ? String(value) : null
              })
            }>
            <Label>{filter.label}</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {filter.options.map(option => (
                  <ListBox.Item key={option} id={option} textValue={option}>
                    {option}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        ))}
        <div className={classes.filterActions}>
          <Button variant="secondary" onPress={onReset}>
            Reset
          </Button>
          <Button onPress={onApply}>Apply</Button>
        </div>
      </Surface>
    </Dropdown.Popover>
  </Dropdown>
)
