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

import { BulkActionBar } from '../../../../shared/bulk-action-bar'
import { attendanceColumnOptions, rowCountOptions } from '../../data'
import type {
  AttendanceColumnKey,
  AttendanceRow,
  AttendanceStatus,
  DrawerMode
} from '../../types'
import {
  getInitials,
  getPaginationSummary,
  getStudentSecondaryText
} from '../../utils/exam-attendance'
import { classNames, getTableRowClassName } from '../../variants'
import { SortableHeader } from '../shared/sortable-header'

type ExamAttendanceTableProps = {
  activeRowId: string | null
  currentPage: number
  pageSize: number
  rows: AttendanceRow[]
  selectedCount: number
  selectedKeys: Selection
  rowsPerPage: string
  visibleColumns: Set<AttendanceColumnKey>
  sortDescriptor: SortDescriptor
  totalPages: number
  totalRows: number
  onBulkEdit: () => void
  onBulkCopyIds: () => void
  onBulkCopyLinks: () => void
  onBulkDelete: () => void
  onClearSelection: () => void
  onDelete: (rowId: string) => void
  onOpenDrawer: (mode: DrawerMode, row: AttendanceRow) => void
  onPageChange: (value: number | ((current: number) => number)) => void
  onSelectionChange: (keys: Selection) => void
  onRowsPerPageChange: (value: string | number | null) => void
  onSortChange: (descriptor: SortDescriptor) => void
}

export function ExamAttendanceTable({
  activeRowId,
  currentPage,
  pageSize,
  rows,
  selectedCount,
  selectedKeys,
  visibleColumns,
  sortDescriptor,
  totalPages,
  totalRows,
  onBulkEdit,
  onBulkCopyIds,
  onBulkCopyLinks,
  onBulkDelete,
  onClearSelection,
  onDelete,
  onOpenDrawer,
  onPageChange,
  onSelectionChange,
  rowsPerPage,
  onRowsPerPageChange,
  onSortChange
}: ExamAttendanceTableProps) {
  const tableMinWidth =
    48 +
    132 +
    attendanceColumnOptions.reduce(
      (total, column) =>
        total + (visibleColumns.has(column.key) ? column.defaultWidth : 0),
      0
    )

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.ResizableContainer>
          <Table.Content
            aria-label="Exam attendance"
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
              {attendanceColumnOptions
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
                  data-attendance-row-id={row.id}
                  className={getTableRowClassName(activeRowId === row.id)}>
                  <Table.Cell>
                    <Checkbox
                      aria-label={`Select attendance ${row.id}`}
                      slot="selection"
                      onClick={event => event.stopPropagation()}>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                    </Checkbox>
                  </Table.Cell>
                  {attendanceColumnOptions
                    .filter(column => visibleColumns.has(column.key))
                    .map(column => (
                      <Table.Cell
                        key={column.key}
                        onClick={event => {
                          event.stopPropagation()
                          onOpenDrawer('view', row)
                        }}
                        onPointerDown={event => event.stopPropagation()}>
                        {column.key === 'id' ? (
                          row.id
                        ) : column.key === 'name' ? (
                          <StudentNameCell row={row} />
                        ) : (
                          <AttendanceMarker
                            status={row[column.key] as AttendanceStatus}
                          />
                        )}
                      </Table.Cell>
                    ))}
                  {/* <Table.Cell>
                    <div
                      className={classNames.rowActions}
                      onClick={event => event.stopPropagation()}
                      onPointerDown={event => event.stopPropagation()}>
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
        ariaLabel="Exam attendance bulk actions"
        entityLabel="attendance item"
        entityPluralLabel="attendance items"
        selectedCount={selectedCount}
        onBulkEdit={onBulkEdit}
        onBulkCopyIds={onBulkCopyIds}
        onBulkCopyLinks={onBulkCopyLinks}
        onBulkDelete={onBulkDelete}
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
      <p className={classNames.emptyText}>No attendance found</p>
    </div>
  )
}

function StudentNameCell({ row }: { row: AttendanceRow }) {
  const secondaryText = getStudentSecondaryText(row)

  return (
    <div className={classNames.studentNameCell}>
      <Avatar className={classNames.studentNameAvatar} size="sm">
        {row.avatar && <Avatar.Image src={row.avatar} alt={row.name} />}
        <Avatar.Fallback>{getInitials(row.name)}</Avatar.Fallback>
      </Avatar>
      <div className={classNames.studentNameText}>
        <div className={classNames.studentNamePrimary}>{row.name}</div>
        {secondaryText && (
          <div className={classNames.studentNameSecondary}>{secondaryText}</div>
        )}
      </div>
    </div>
  )
}

function AttendanceMarker({ status }: { status: AttendanceStatus }) {
  const colorClass =
    status === 'Present'
      ? 'bg-success'
      : status === 'Absent'
        ? 'bg-danger'
        : 'bg-[#14b8e6]'

  return (
    <span
      aria-label={status}
      className={`${classNames.attendanceMarker} ${colorClass}`}
      role="img"
    />
  )
}
