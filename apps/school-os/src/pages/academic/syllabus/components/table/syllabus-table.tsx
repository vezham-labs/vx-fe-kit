import { Inbox as InboxIcon } from '@vezham/icons-react'
import {
  Button,
  Checkbox,
  Chip,
  Dropdown,
  ListBox,
  Pagination,
  Select,
  type Selection,
  type SortDescriptor,
  Table
} from '@vezham/react-v3'

import { BulkActionBar } from '@pages/academic/shared/bulk-action-bar'
import { SortableHeader } from '@pages/academic/syllabus/components/shared/sortable-header'
import {
  rowCountOptions,
  syllabusColumnOptions
} from '@pages/academic/syllabus/data'
import type { ClassRow, DrawerMode } from '@pages/academic/syllabus/types'
import {
  formatDisplayDate,
  getPaginationSummary
} from '@pages/academic/syllabus/utils/syllabus'
import {
  classNames,
  getTableRowClassName
} from '@pages/academic/syllabus/variants'

type SyllabusTableProps = {
  activeRowId: string | null
  currentPage: number
  pageSize: number
  rows: ClassRow[]
  selectedCount: number
  selectedKeys: Selection
  rowsPerPage: string
  sortDescriptor: SortDescriptor
  totalPages: number
  totalRows: number
  visibleColumns: Set<string>
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

export function SyllabusTable({
  activeRowId,
  currentPage,
  pageSize,
  rows,
  selectedCount,
  selectedKeys,
  rowsPerPage,
  sortDescriptor,
  totalPages,
  totalRows,
  visibleColumns,
  onBulkEdit,
  onBulkCopyIds,
  onBulkCopyLinks,
  onBulkDelete,
  onDelete,
  onOpenDrawer,
  onPageChange,
  onClearSelection,
  onSelectionChange,
  onRowsPerPageChange,
  onSortChange
}: SyllabusTableProps) {
  const tableMinWidth =
    48 +
    132 +
    syllabusColumnOptions.reduce(
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
            selectedKeys={selectedKeys}
            selectionBehavior="toggle"
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            style={{ minWidth: `${tableMinWidth}px` }}
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
              {syllabusColumnOptions
                .filter(column => visibleColumns.has(column.key))
                .map(column => (
                  <Table.Column
                    key={column.key}
                    allowsSorting
                    defaultWidth={column.defaultWidth}
                    id={column.key}
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
              {/* <Table.Column width={132}>Actions</Table.Column> */}
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
                  {syllabusColumnOptions
                    .filter(column => visibleColumns.has(column.key))
                    .map(column => (
                      <Table.Cell
                        key={column.key}
                        onPointerDown={event => event.stopPropagation()}
                        onClick={event => {
                          event.stopPropagation()
                          onOpenDrawer('view', row)
                        }}>
                        {renderCellContent(row, column.key)}
                      </Table.Cell>
                    ))}
                  {/* <Table.Cell>
                    <div
                      className={classNames.rowActions}
                      onPointerDown={event => event.stopPropagation()}
                      onClick={event => event.stopPropagation()}>
                      <Button
                        isIconOnly
                        aria-label={`Edit ${row.id}`}
                        variant="ghost"
                        onPress={() => onOpenDrawer('edit', row)}>
                        <Icon icon="vx:pencil" width={16} />
                      </Button>
                      <Button
                        isIconOnly
                        aria-label={`Delete ${row.id}`}
                        variant="outline"
                        onPress={() => onDelete(row.id)}>
                        <Icon
                          className={classNames.dangerIcon}
                          icon="vx:trash"
                          width={16}
                        />
                      </Button>
                      <Dropdown>
                        <Dropdown.Trigger>
                          <Button
                            isIconOnly
                            aria-label={`More actions for ${row.id}`}
                            variant="ghost">
                            <Icon icon="vx:menu-horizontal" width={18} />
                          </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Popover>
                          <Dropdown.Menu
                            aria-label={`More actions for ${row.id}`}>
                            <Dropdown.Item
                              id="view"
                              textValue="View"
                              onPress={() => onOpenDrawer('view', row)}>
                              <span className={classNames.menuItemLabel}>
                                <Icon icon="vx:eye" width={16} />
                                View
                              </span>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown.Popover>
                      </Dropdown>
                    </div>
                  </Table.Cell> */}
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
        ariaLabel="Syllabus bulk actions"
        deleteLabel="Delete"
        editLabel="Edit"
        selectedCount={selectedCount}
        onClearSelection={onClearSelection}
        onCopyIds={onBulkCopyIds}
        onCopyLinks={onBulkCopyLinks}
        onDelete={onBulkDelete}
        onEdit={onBulkEdit}
      />
    </Table>
  )
}

function renderCellContent(row: ClassRow, key: string) {
  switch (key) {
    case 'classes':
      return row.classes
    case 'section':
      return row.section
    case 'subject':
      return row.subject
    case 'createdAt':
      return formatDisplayDate(row.createdAt)
    case 'status':
      return (
        <Chip
          color={row.status === 'Active' ? 'success' : 'danger'}
          size="sm"
          variant="soft">
          <span aria-hidden="true">●</span>
          <Chip.Label>{row.status}</Chip.Label>
        </Chip>
      )
    default:
      return null
  }
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
