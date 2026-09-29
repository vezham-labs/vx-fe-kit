import { Inbox as InboxIcon } from '@vezham/icons-react'
import {
  Checkbox,
  Chip,
  type Selection,
  type SortDescriptor,
  Table
} from '@vezham/react-v3'

import {
  examResultsColumnOptions,
  rowCountOptions
} from '@pages/academic/examinations/exam-results/data'
import type {
  ClassRow,
  DrawerMode,
  ExamResultsColumnKey
} from '@pages/academic/examinations/exam-results/types'
import { getPaginationSummary } from '@pages/academic/examinations/exam-results/utils/exam-results'
import {
  classNames,
  getTableRowClassName
} from '@pages/academic/examinations/exam-results/variants'
import { BulkActionBar } from '@pages/academic/shared/bulk-action-bar'
import { StudentNameCell as SharedStudentNameCell } from '@pages/academic/shared/student-name-cell'
import { AcademicTableHeader } from '@pages/academic/shared/table-header'
import { TablePaginationFooter } from '@pages/academic/shared/table-pagination-footer'

type Props = {
  activeRowId: string | null
  currentPage: number
  pageSize: number
  rows: ClassRow[]
  selectedCount: number
  selectedKeys: Selection
  rowsPerPage: string
  visibleColumns: Set<ExamResultsColumnKey>
  sortDescriptor: SortDescriptor
  totalPages: number
  totalRows: number
  onBulkEdit: () => void
  onBulkCopyIds: () => void
  onBulkCopyLinks: () => void
  onBulkDelete: () => void
  onClearSelection: () => void
  onDelete: (rowId: string) => void
  onOpenDrawer: (mode: DrawerMode, row: ClassRow) => void
  onPageChange: (value: number | ((current: number) => number)) => void
  onSelectionChange: (keys: Selection) => void
  onRowsPerPageChange: (value: string | number | null) => void
  onSortChange: (descriptor: SortDescriptor) => void
}

export const ExamResultsTable = ({
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
    examResultsColumnOptions.reduce(
      (total, column) =>
        total + (visibleColumns.has(column.key) ? column.defaultWidth : 0),
      0
    )

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.ResizableContainer>
          <Table.Content
            aria-label="Exam results"
            className={classNames.tableContent}
            selectedKeys={selectedKeys}
            selectionBehavior="toggle"
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            style={{ minWidth: `${tableMinWidth}px` }}
            onSelectionChange={onSelectionChange}
            onSortChange={onSortChange}>
            <AcademicTableHeader
              columns={examResultsColumnOptions}
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
                  data-class-row-id={row.id}
                  className={getTableRowClassName(activeRowId === row.id)}>
                  <Table.Cell>
                    <Checkbox
                      aria-label={`Select exam result ${row.id}`}
                      slot="selection"
                      onClick={event => event.stopPropagation()}>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                    </Checkbox>
                  </Table.Cell>
                  {examResultsColumnOptions
                    .filter(column => visibleColumns.has(column.key))
                    .map(column => (
                      <Table.Cell
                        key={column.key}
                        onClick={event => {
                          event.stopPropagation()
                          onOpenDrawer('view', row)
                        }}
                        onPointerDown={event => event.stopPropagation()}>
                        {column.key === 'name' ? (
                          <StudentNameCell row={row} />
                        ) : column.key === 'result' ? (
                          <Chip
                            color={row.result === 'Pass' ? 'success' : 'danger'}
                            size="sm"
                            variant="soft">
                            <span aria-hidden="true">●</span>
                            <Chip.Label>{row.result}</Chip.Label>
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
        ariaLabel="Exam results bulk actions"
        entityLabel="exam result"
        entityPluralLabel="exam results"
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
      <p className={classNames.emptyText}>No results found</p>
    </div>
  )
}

function StudentNameCell({ row }: { row: ClassRow }) {
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

function getStudentSecondaryText(row: ClassRow) {
  if (row.rollNo) {
    return `Roll No : ${row.rollNo}`
  }

  if (row.email) {
    return row.email
  }

  return [row.classes, row.section].filter(Boolean).join(' - ')
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join('')
}
