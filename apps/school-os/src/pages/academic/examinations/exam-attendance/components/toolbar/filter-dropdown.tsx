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
  classOptions,
  examtypeOptions,
  sectionOptions
} from '@pages/academic/examinations/exam-attendance/data'
import type { FilterDropdownProps } from '@pages/academic/examinations/exam-attendance/types'
import { classNames } from '@pages/academic/examinations/exam-attendance/variants'

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
            aria-label="Filter by classes"
            placeholder="Select classes"
            value={draftFilters.classes}
            onChange={value =>
              setDraftFilters({
                ...draftFilters,
                classes: value ? String(value) : null
              })
            }>
            <Label>Class</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {classOptions.map(option => (
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
            aria-label="Filter by section"
            placeholder="Select section"
            value={draftFilters.section}
            onChange={value =>
              setDraftFilters({
                ...draftFilters,
                section: value ? String(value) : null
              })
            }>
            <Label>Section</Label>
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
            aria-label="Filter by examtype"
            placeholder="Select examtype"
            value={draftFilters.examtype}
            onChange={value =>
              setDraftFilters({
                ...draftFilters,
                examtype: value ? String(value) : null
              })
            }>
            <Label>Exam Type</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {examtypeOptions.map(option => (
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
