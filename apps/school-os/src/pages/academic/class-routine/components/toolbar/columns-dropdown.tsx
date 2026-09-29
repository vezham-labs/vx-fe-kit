import {
  AltArrowDown as AltArrowDownIcon,
  SliderVertical as SliderVerticalIcon
} from '@vezham/icons-react'
import { Button, Dropdown } from '@vezham/react-v3'

import type {
  ClassRoutineColumnKey,
  ColumnsDropdownProps
} from '@pages/academic/class-routine/types'
import { classNames } from '@pages/academic/class-routine/variants'
import { classRoutineColumnOptions } from '@store/useAcademic/useClassRoutine'

export const ColumnsDropdown = ({
  visibleColumns,
  onVisibleColumnsChange
}: ColumnsDropdownProps) => {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="outline">
          <SliderVerticalIcon size={16} aria-hidden="true" />
          Columns
          <AltArrowDownIcon size={16} aria-hidden="true" />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu
          aria-label="Show or hide class routine columns"
          selectedKeys={visibleColumns}
          selectionMode="multiple"
          onSelectionChange={keys => {
            if (keys === 'all') {
              onVisibleColumnsChange(
                new Set(classRoutineColumnOptions.map(option => option.key))
              )
              return
            }

            onVisibleColumnsChange(
              new Set(Array.from(keys) as ClassRoutineColumnKey[])
            )
          }}>
          {classRoutineColumnOptions.map(option => (
            <Dropdown.Item
              key={option.key}
              id={option.key}
              textValue={option.label}>
              <span className={classNames.dateOptionLabel}>
                {option.label}
                <Dropdown.ItemIndicator />
              </span>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
