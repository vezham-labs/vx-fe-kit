import { Inbox as InboxIcon } from '@vezham/icons-react'
import {
  Checkbox,
  Chip,
  ListBox,
  Pagination,
  Select,
  type Selection,
  type SortDescriptor,
  Table
} from '@vezham/react-v3'

import { SortableHeader } from '@pages/academic/classes/schedule/components/shared/sortable-header'
import type {
  ClassRow,
  DrawerMode,
  ScheduleColumnKey
} from '@pages/academic/classes/schedule/types'
import { getPaginationSummary } from '@pages/academic/classes/schedule/utils/schedule'
import {
  classNames,
  getTableRowClassName
} from '@pages/academic/classes/schedule/variants'
import { BulkActionBar } from '@pages/academic/shared/bulk-action-bar'
import {
  rowCountOptions,
  scheduleColumnOptions
} from '@store/useAcademic/useClassSchedule/data'

type Props = {
  activeRowId: string | null
  currentPage: number
  pageSize: number
  rows: ClassRow[]
  selectedCount: number
  selectedKeys: Selection
  rowsPerPage: string
  visibleColumns: Set<ScheduleColumnKey>
  sortDescriptor: SortDescriptor
  totalPages: number
  totalRows: number
  onBulkEdit: () => void
  onBulkCopyIds: () => void
  onBulkCopyLinks: () => void
  onBulkDelete: () => void
  onDelete: (rowId: string) => void
  onOpenDrawer: (mode: DrawerMode, row: ClassRow) => void
  onPageChange: (value: number | ((current: number) => number)) => void
  onClearSelection: () => void
  onSelectionChange: (keys: Selection) => void
  onRowsPerPageChange: (value: string | number | null) => void
  onSortChange: (descriptor: SortDescriptor) => void
}

export const ScheduleTable = ({
  activeRowId,
  currentPage,
  pageSize,
  rows,
  selectedCount,
  selectedKeys,
  rowsPerPage,
  visibleColumns,
  sortDescriptor,
  totalPages,
  totalRows,
  onBulkEdit,
  onBulkCopyIds,
  onBulkCopyLinks,
  onBulkDelete,
  onOpenDrawer,
  onPageChange,
  onClearSelection,
  onSelectionChange,
  onRowsPerPageChange,
  onSortChange
}: Props) => {
  const tableMinWidth =
    48 +
    132 +
    scheduleColumnOptions.reduce(
      (total, column) =>
        total + (visibleColumns.has(column.key) ? column.defaultWidth : 0),
      0
    )

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.ResizableContainer>
          <Table.Content
            aria-label="Schedules"
            className={classNames.tableContent}
            style={{ minWidth: `${tableMinWidth}px` }}
            selectedKeys={selectedKeys}
            selectionBehavior="toggle"
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            onSelectionChange={onSelectionChange}
            onSortChange={onSortChange}>
            <Table.Header>
              <Table.Column className={classNames.selectionColumn} width={48}>
                <Checkbox aria-label="Select all rows" slot="selection">
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                </Checkbox>
              </Table.Column>
              {scheduleColumnOptions
                .filter(column => visibleColumns.has(column.key))
                .map(column => (
                  <Table.Column
                    key={column.key}
                    allowsSorting
                    defaultWidth={column.defaultWidth}
                    id={column.key}
                    isRowHeader={column.key === 'id'}
                    maxWidth={column.maxWidth}
                    minWidth={column.minWidth}>
                    {({ sortDirection }) => (
                      <>
                        <SortableHeader sortDirection={sortDirection}>
                          {column.label}
                        </SortableHeader>
                        <Table.ColumnResizer
                          aria-label={`Resize ${column.label.toLowerCase()} column`}
                        />
                      </>
                    )}
                  </Table.Column>
                ))}
            </Table.Header>

            <Table.Body renderEmptyState={() => <TableEmptyState />}>
              {rows.map(row => (
                <Table.Row
                  key={row.id}
                  id={row.id}
                  data-class-row-id={row.id}
                  className={getTableRowClassName(activeRowId === row.id)}>
                  <Table.Cell>
                    <Checkbox
                      aria-label={`Select schedule ${row.id}`}
                      slot="selection"
                      onClick={event => event.stopPropagation()}>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                    </Checkbox>
                  </Table.Cell>
                  {scheduleColumnOptions
                    .filter(column => visibleColumns.has(column.key))
                    .map(column => (
                      <Table.Cell
                        key={column.key}
                        onPointerDown={event => event.stopPropagation()}
                        onClick={event => {
                          event.stopPropagation()
                          onOpenDrawer('view', row)
                        }}>
                        {column.key === 'status' ? (
                          <Chip
                            color={
                              row.status === 'Active' ? 'success' : 'danger'
                            }
                            size="sm"
                            variant="soft">
                            <span aria-hidden="true">●</span>
                            <Chip.Label>{row.status}</Chip.Label>
                          </Chip>
                        ) : (
                          row[column.key]
                        )}
                      </Table.Cell>
                    ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table.ScrollContainer>

      <Table.Footer>
        <Pagination className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className={classNames.rowsControls}>
            <Pagination.Summary>
              {getPaginationSummary(currentPage, pageSize, totalRows)}
            </Pagination.Summary>
            <span aria-hidden="true" className="text-muted">
              |
            </span>
            <Select
              aria-label="Rows per page"
              value={rowsPerPage}
              onChange={onRowsPerPageChange}>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {rowCountOptions.map(option => (
                    <ListBox.Item key={option} id={option} textValue={option}>
                      {option}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
            <span aria-hidden="true" className="text-muted text-sm">
              per page
            </span>
          </div>

          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous
                isDisabled={currentPage <= 1}
                onPress={() => onPageChange(value => Math.max(1, value - 1))}>
                <Pagination.PreviousIcon />
                <span>Prev</span>
              </Pagination.Previous>
            </Pagination.Item>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              item => (
                <Pagination.Item key={item}>
                  <Pagination.Link
                    isActive={item === currentPage}
                    onPress={() => onPageChange(item)}>
                    {item}
                  </Pagination.Link>
                </Pagination.Item>
              )
            )}
            <Pagination.Item>
              <Pagination.Next
                isDisabled={currentPage >= totalPages}
                onPress={() =>
                  onPageChange(value => Math.min(totalPages, value + 1))
                }>
                <span>Next</span>
                <Pagination.NextIcon />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </Table.Footer>

      <BulkActionBar
        ariaLabel="Schedule bulk actions"
        selectedCount={selectedCount}
        editLabel="Edit"
        deleteLabel="Delete"
        onEdit={onBulkEdit}
        onCopyIds={onBulkCopyIds}
        onCopyLinks={onBulkCopyLinks}
        onDelete={onBulkDelete}
        onClearSelection={onClearSelection}
      />
    </Table>
  )
}

function TableEmptyState() {
  return (
    <div className={classNames.emptyState}>
      <InboxIcon
        className={classNames.emptyIcon}
        size={42}
        aria-hidden="true"
      />
      <p className={classNames.emptyText}>No results found</p>
    </div>
  )
}
