import { Inbox as InboxIcon } from '@vezham/icons-react'
import {
  Avatar,
  Button,
  Checkbox,
  Dropdown,
  ListBox,
  Pagination,
  Select,
  type Selection,
  type SortDescriptor,
  Table
} from '@vezham/react-v3'

import { BulkActionBar } from '../../../shared/bulk-action-bar'
import { homeworkColumnOptions, rowCountOptions } from '../../data'
import type { ClassRow, DrawerMode } from '../../types'
import { getPaginationSummary } from '../../utils/homework'
import { classNames, getTableRowClassName } from '../../variants'
import { SortableHeader } from '../shared/sortable-header'

type HomeworkTableProps = {
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

export function HomeworkTable({
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
}: HomeworkTableProps) {
  const tableMinWidth =
    48 +
    132 +
    homeworkColumnOptions.reduce(
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
              {homeworkColumnOptions
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
                  {homeworkColumnOptions
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
                        <Icon icon="lucide:pencil" width={16} />
                      </Button>
                      <Button
                        isIconOnly
                        aria-label={`Delete ${row.id}`}
                        variant="outline"
                        onPress={() => onDelete(row.id)}>
                        <Icon
                          className={classNames.dangerIcon}
                          icon="lucide:trash-2"
                          width={16}
                        />
                      </Button>
                      <Dropdown>
                        <Dropdown.Trigger>
                          <Button
                            isIconOnly
                            aria-label={`More actions for ${row.id}`}
                            variant="ghost">
                            <Icon icon="lucide:more-horizontal" width={18} />
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
                                <Icon icon="lucide:eye" width={16} />
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
        ariaLabel="Homework bulk actions"
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
    case 'id':
      return row.id
    case 'classes':
      return row.classes
    case 'section':
      return row.section
    case 'subject':
      return row.subject
    case 'homeworkdate':
      return row.homeworkdate
    case 'submissiondate':
      return row.submissiondate
    case 'createdBy':
      return <CreatedByCell row={row} />
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

function CreatedByCell({ row }: { row: ClassRow }) {
  const { createdBy } = row

  return (
    <div className="flex items-center gap-3">
      <Avatar size="sm">
        {createdBy.avatar && (
          <Avatar.Image src={createdBy.avatar} alt={createdBy.name} />
        )}
        <Avatar.Fallback>{getInitials(createdBy.name)}</Avatar.Fallback>
      </Avatar>
      <div className="min-w-0">
        <div className="truncate font-medium text-[#111827]">
          {createdBy.name}
        </div>
        {createdBy.secondaryText && (
          <div className="text-muted truncate text-sm">
            {createdBy.secondaryText}
          </div>
        )}
      </div>
    </div>
  )
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .map(part => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
