import { AltArrowDown as AltArrowDownIcon } from '@vezham/icons-react'
import {
  Button,
  Dropdown,
  Separator,
  type SortDescriptor
} from '@vezham/react-v3'

import { AppIcon } from '@components/app-icon'
import { classNames } from '@pages/academic/classes/all-classes/variants'
import {
  allClassesColumnOptions,
  sortOptions,
  sortOrderOptions
} from '@store/useAcademic/useAllClasses/data'

type SortDropdownProps = {
  activeSortLabel: string
  sortDirection: SortDescriptor['direction']
  sortField: SortDescriptor['column']
  onSortDirectionChange: (direction: SortDescriptor['direction']) => void
  onSortFieldChange: (column: SortDescriptor['column']) => void
}

export function SortDropdown({
  activeSortLabel,
  sortDirection,
  sortField,
  onSortDirectionChange,
  onSortFieldChange
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
          aria-label="Sort classes"
          selectedKeys={selectedKeys}
          selectionMode="multiple">
          <Dropdown.Section aria-label="Recently used">
            <Dropdown.Item
              key="recentlyViewed"
              id="recentlyViewed"
              textValue="Recently Viewed"
              onPress={() => onSortFieldChange('viewedAt')}>
              <span className={classNames.dateOptionLabel}>
                Recently Viewed
                <Dropdown.ItemIndicator />
              </span>
            </Dropdown.Item>
            <Dropdown.Item
              key="recentlyAdded"
              id="recentlyAdded"
              textValue="Recently Added"
              onPress={() => onSortFieldChange('createdAt')}>
              <span className={classNames.dateOptionLabel}>
                Recently Added
                <Dropdown.ItemIndicator />
              </span>
            </Dropdown.Item>
          </Dropdown.Section>

          <Dropdown.Section aria-label="Table columns">
            {allClassesColumnOptions.map(option => (
              <Dropdown.Item
                key={option.key}
                id={option.key}
                textValue={option.label}
                onPress={() => updateSortField(option.key)}>
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
