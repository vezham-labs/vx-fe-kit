import { AltArrowDown as AltArrowDownIcon } from '@vezham/icons-react'
import {
  Button,
  Dropdown,
  Separator,
  type SortDescriptor
} from '@vezham/react-v3'

import { AppIcon } from '@components/app-icon'

import { sectionColumnOptions, sortOptions, sortOrderOptions } from '../../data'
import { classNames } from '../../variants'

type SortDropdownProps = {
  activeSortLabel: string
  sortField: SortDescriptor['column']
  sortDirection: SortDescriptor['direction']
  onSortFieldChange: (column: SortDescriptor['column']) => void
  onSortDirectionChange: (direction: SortDescriptor['direction']) => void
}

export function SortDropdown({
  activeSortLabel,
  sortField,
  sortDirection,
  onSortFieldChange,
  onSortDirectionChange
}: SortDropdownProps) {
  const activeDirection = sortDirection ?? 'ascending'
  const activeSortIcon =
    activeDirection === 'ascending'
      ? 'lucide:arrow-up-wide-narrow'
      : 'lucide:arrow-down-wide-narrow'
  const selectedKeys = new Set([
    sortOptions.find(option => option.column === sortField)?.key ?? sortField,
    activeDirection
  ])

  const updateSortField = (column: SortDescriptor['column']) => {
    onSortFieldChange(column)
  }

  const updateSortOrder = (direction: SortDescriptor['direction']) => {
    onSortDirectionChange(direction)
  }

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="outline">
          <AppIcon icon={activeSortIcon} size={16} aria-hidden="true" />
          {activeSortLabel}
          <AltArrowDownIcon size={16} aria-hidden="true" />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu
          aria-label="Sort schedules"
          selectedKeys={selectedKeys}
          selectionMode="multiple">
          <Dropdown.Section aria-label="Recently used">
            {sortOptions.map(option => (
              <Dropdown.Item
                key={option.key}
                id={option.key}
                textValue={option.label}
                onPress={() => updateSortField(option.column)}>
                <span className={classNames.dateOptionLabel}>
                  {option.label}
                  <Dropdown.ItemIndicator />
                </span>
              </Dropdown.Item>
            ))}
          </Dropdown.Section>

          <Dropdown.Section aria-label="Table columns">
            {sectionColumnOptions.map(option => (
              <Dropdown.Item
                key={option.key}
                id={option.key}
                textValue={option.label}
                onPress={() => onSortFieldChange(option.key)}>
                <span className={classNames.dateOptionLabel}>
                  {option.label}
                  <Dropdown.ItemIndicator />
                </span>
              </Dropdown.Item>
            ))}
          </Dropdown.Section>
          <Separator />
          <Dropdown.Section aria-label="Order">
            {sortOrderOptions.map(option => (
              <Dropdown.Item
                key={option.key}
                id={option.key}
                textValue={option.label}
                onPress={() => updateSortOrder(option.direction)}>
                <span className={classNames.dateOptionLabel}>
                  <span className="flex items-center gap-2">
                    <AppIcon icon={option.icon} size={16} aria-hidden="true" />
                    {option.label}
                  </span>
                  <Dropdown.ItemIndicator />
                </span>
              </Dropdown.Item>
            ))}
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
