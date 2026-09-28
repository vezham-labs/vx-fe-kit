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

import {
  gradeOptions,
  percentageOptions,
  pointOptions
} from '@pages/academic/examinations/grades/data'
import type { FilterDropdownProps } from '@pages/academic/examinations/grades/types'
import { classNames } from '@pages/academic/examinations/grades/variants'

export function FilterDropdown({
  draftFilters,
  setDraftFilters,
  onApply,
  onReset
}: FilterDropdownProps) {
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
            aria-label="Filter by grade"
            placeholder="Select grade"
            value={draftFilters.grade}
            onChange={value =>
              setDraftFilters({
                ...draftFilters,
                grade: value ? String(value) : null
              })
            }>
            <Label>Grade</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {gradeOptions.map(option => (
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
            aria-label="Filter by percentage"
            placeholder="Select percentage"
            value={draftFilters.percentage}
            onChange={value =>
              setDraftFilters({
                ...draftFilters,
                percentage: value ? String(value) : null
              })
            }>
            <Label>Percentage</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {percentageOptions.map(option => (
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
            aria-label="Filter by points"
            placeholder="Select points"
            value={draftFilters.points}
            onChange={value =>
              setDraftFilters({
                ...draftFilters,
                points: value ? String(value) : null
              })
            }>
            <Label>Points</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {pointOptions.map(option => (
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
