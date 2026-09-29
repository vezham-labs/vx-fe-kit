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

import { sectionOptions, statusOptions } from '@pages/academic/section/data'
import type {
  ClassStatus,
  FilterDropdownProps
} from '@pages/academic/section/types'
import { classNames } from '@pages/academic/section/variants'

export const FilterDropdown = ({
  draftFilters,
  setDraftFilters,
  onApply,
  onReset
}: FilterDropdownProps) => {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="outline">
          <FilterIcon size={16} aria-hidden="true" />
          Filter
          <AltArrowDownIcon size={16} aria-hidden="true" />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Surface className={classNames.filterPanel}>
          <h2 className={classNames.filterTitle}>Filter</h2>
          <Select
            fullWidth
            aria-label="Filter by section"
            placeholder="Select section"
            value={draftFilters.section}
            onChange={value =>
              setDraftFilters({
                ...draftFilters,
                section: value ? String(value) : null
              })
            }>
            <Label>Section </Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {sectionOptions.map(option => (
                  <ListBox.Item key={option} id={option} textValue={option}>
                    {option}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          <Select
            fullWidth
            aria-label="Filter by capacity"
            placeholder="Select status"
            value={draftFilters.status}
            onChange={value =>
              setDraftFilters({
                ...draftFilters,
                status: value ? (String(value) as ClassStatus) : null
              })
            }>
            <Label>Status</Label>
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

          <div className={classNames.filterActions}>
            <Button variant="secondary" onPress={onReset}>
              Reset
            </Button>
            <Button onPress={onApply}>Apply</Button>
          </div>
        </Surface>
      </Dropdown.Popover>
    </Dropdown>
  )
}
