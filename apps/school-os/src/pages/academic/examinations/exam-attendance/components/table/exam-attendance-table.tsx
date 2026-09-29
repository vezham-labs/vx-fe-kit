import { Inbox as InboxIcon } from '@vezham/icons-react'
import {
  Checkbox,
  type Selection,
  type SortDescriptor,
  Table
} from '@vezham/react-v3'

import {
  attendanceColumnOptions,
  rowCountOptions
} from '@pages/academic/examinations/exam-attendance/data'
import type {
  AttendanceColumnKey,
  AttendanceRow,
  AttendanceStatus,
  DrawerMode
} from '@pages/academic/examinations/exam-attendance/types'
import {
  getInitials,
  getPaginationSummary,
  getStudentSecondaryText
} from '@pages/academic/examinations/exam-attendance/utils/exam-attendance'
import {
  classNames,
  getTableRowClassName
} from '@pages/academic/examinations/exam-attendance/variants'
import { BulkActionBar } from '@pages/academic/shared/bulk-action-bar'
import { StudentNameCell as SharedStudentNameCell } from '@pages/academic/shared/student-name-cell'
import { AcademicTableHeader } from '@pages/academic/shared/table-header'
import { TablePaginationFooter } from '@pages/academic/shared/table-pagination-footer'

type Props = {
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

export const ExamAttendanceTable = ({
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
  onOpenDrawer,
  onPageChange,
  onSelectionChange,
  rowsPerPage,
  onRowsPerPageChange,
  onSortChange
}: Props) => {
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
            <AcademicTableHeader
              columns={attendanceColumnOptions}
              rowHeaderKey="id"
              selectionColumnClassName={classNames.selectionColumn}
              sortableHeaderClassName={classNames.sortableHeader}
              visibleColumns={visibleColumns}
            />

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
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table.ScrollContainer>

      <TablePaginationFooter
        currentPage={currentPage}
        rowCountOptions={rowCountOptions}
        rowsControlsClassName={classNames.rowsControls}
        rowsPerPage={rowsPerPage}
        summary={getPaginationSummary(currentPage, pageSize, totalRows)}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />

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
  return (
    <SharedStudentNameCell
      avatar={row.avatar}
      classes={classNames}
      initials={getInitials(row.name)}
      name={row.name}
      secondaryText={getStudentSecondaryText(row)}
    />
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
