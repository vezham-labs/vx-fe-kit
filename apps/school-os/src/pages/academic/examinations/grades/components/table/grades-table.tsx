import { Inbox as InboxIcon } from '@vezham/icons-react'
import { type Selection, type SortDescriptor, Table } from '@vezham/react-v3'

import {
  gradeColumnOptions,
  rowCountOptions
} from '@pages/academic/examinations/grades/data'
import type {
  ClassRow,
  DrawerMode,
  GradeColumnKey
} from '@pages/academic/examinations/grades/types'
import { getPaginationSummary } from '@pages/academic/examinations/grades/utils/grades'
import {
  classNames,
  getTableRowClassName
} from '@pages/academic/examinations/grades/variants'
import { BulkActionBar } from '@pages/academic/shared/bulk-action-bar'
import { AcademicStatusChip } from '@pages/academic/shared/status-chip'
import { AcademicTableBody } from '@pages/academic/shared/table-body'
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
  visibleColumns: Set<GradeColumnKey>
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

export const GradesTable = ({
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
    gradeColumnOptions.reduce(
      (total, column) =>
        total + (visibleColumns.has(column.key) ? column.defaultWidth : 0),
      0
    )

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.ResizableContainer>
          <Table.Content
            aria-label="Grades"
            className={classNames.tableContent}
            selectedKeys={selectedKeys}
            selectionBehavior="toggle"
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            style={{ minWidth: `${tableMinWidth}px` }}
            onSelectionChange={onSelectionChange}
            onSortChange={onSortChange}>
            <AcademicTableHeader
              columns={gradeColumnOptions}
              rowHeaderKey="id"
              selectionColumnClassName={classNames.selectionColumn}
              sortableHeaderClassName={classNames.sortableHeader}
              visibleColumns={visibleColumns}
            />

            <AcademicTableBody
              activeRowId={activeRowId}
              columns={gradeColumnOptions}
              emptyState={<TableEmptyState />}
              getRowClassName={getTableRowClassName}
              rows={rows}
              selectionLabel="grade"
              visibleColumns={visibleColumns}
              renderCell={(row, columnKey) =>
                columnKey === 'status' ? (
                  <AcademicStatusChip status={row.status} />
                ) : (
                  row[columnKey]
                )
              }
              onOpenRow={row => onOpenDrawer('view', row)}
            />
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
        ariaLabel="Grades bulk actions"
        entityLabel="grade item"
        entityPluralLabel="grade items"
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
