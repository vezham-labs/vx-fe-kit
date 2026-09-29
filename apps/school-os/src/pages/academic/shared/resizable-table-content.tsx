import type { ReactNode } from 'react'

import { type Selection, type SortDescriptor, Table } from '@vezham/react-v3'

type Props = {
  ariaLabel: string
  children: ReactNode
  className: string
  minWidth: number
  selectedKeys: Selection
  sortDescriptor: SortDescriptor
  onSelectionChange: (keys: Selection) => void
  onSortChange: (descriptor: SortDescriptor) => void
}

export const AcademicResizableTableContent = ({
  ariaLabel,
  children,
  className,
  minWidth,
  selectedKeys,
  sortDescriptor,
  onSelectionChange,
  onSortChange
}: Props) => (
  <Table.ScrollContainer>
    <Table.ResizableContainer>
      <Table.Content
        aria-label={ariaLabel}
        className={className}
        selectedKeys={selectedKeys}
        selectionBehavior="toggle"
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        style={{ minWidth: `${minWidth}px` }}
        onSelectionChange={onSelectionChange}
        onSortChange={onSortChange}>
        {children}
      </Table.Content>
    </Table.ResizableContainer>
  </Table.ScrollContainer>
)
