import { AltArrowDown as AltArrowDownIcon } from '@vezham/icons-react'
import {
  Button,
  Dropdown,
  Separator,
  type SortDescriptor
} from '@vezham/react-v3'

import { AppIcon } from '@vx/react/app-icon'
import { classNames } from '@pages/academic/class-routine/variants'

import { sortOrderOptions as defaultSortOrderOptions } from './sort'

type SortOption = {
  key: string
  label: string
  column: string
}

type SortOrderOption = {
  key: string
  label: string
  direction: SortDescriptor['direction']
  icon: string
}

type SortDropdownProps = {
  activeSortLabel: string
  ariaLabel?: string
  sortField: SortDescriptor['column']
  sortDirection: SortDescriptor['direction']
  sortOptions: readonly SortOption[]
  sortOrderOptions?: readonly SortOrderOption[]
  onSortFieldChange: (column: SortDescriptor['column']) => void
  onSortDirectionChange: (direction: SortDescriptor['direction']) => void
}

export function SortDropdown({
  activeSortLabel,
  ariaLabel = 'Sort records',
  sortField,
  sortDirection,
  sortOptions,
  sortOrderOptions = defaultSortOrderOptions,
  onSortFieldChange,
  onSortDirectionChange
}: SortDropdownProps) {
  const activeField =
    sortOptions.find(option => option.column === sortField) ?? sortOptions[0]
  const activeDirection = sortDirection ?? 'ascending'
  const activeSortIcon =
    activeDirection === 'ascending' ? 'vx:sort-ascending' : 'vx:sort-descending'
  const selectedKeys = new Set([activeField.key, activeDirection])
  const recentSortKeys = new Set(['recentlyViewed', 'recentlyAdded'])
  const recentlyUsedOptions = sortOptions.filter(option =>
    recentSortKeys.has(option.key)
  )
  const tableColumnOptions = sortOptions.filter(
    option => !recentSortKeys.has(option.key)
  )

  const updateSortField = (column: string) => {
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
          aria-label={ariaLabel}
          selectedKeys={selectedKeys}
          selectionMode="multiple">
          <Dropdown.Section aria-label="Recently used">
            {recentlyUsedOptions.map(option => (
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
            {tableColumnOptions.map(option => (
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
