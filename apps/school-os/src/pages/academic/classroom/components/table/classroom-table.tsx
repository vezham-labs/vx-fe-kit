import { Inbox as InboxIcon } from '@vezham/icons-react'
import { type Selection, type SortDescriptor, Table } from '@vezham/react-v3'

import {
  classroomColumnOptions,
  rowCountOptions
} from '@pages/academic/classroom/data'
import type {
  ClassRow,
  ClassroomColumnKey,
  DrawerMode
} from '@pages/academic/classroom/types'
import { getPaginationSummary } from '@pages/academic/classroom/utils/classroom'
import {
  classNames,
  getTableRowClassName
} from '@pages/academic/classroom/variants'
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
  visibleColumns: Set<ClassroomColumnKey>
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

export const ClassroomTable = ({
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
    classroomColumnOptions.reduce(
      (total, column) =>
        total + (visibleColumns.has(column.key) ? column.defaultWidth : 0),
      0
    )

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.ResizableContainer>
          <Table.Content
            aria-label="Classroom"
            className={classNames.tableContent}
            style={{ minWidth: `${tableMinWidth}px` }}
            selectedKeys={selectedKeys}
            selectionBehavior="toggle"
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            onSelectionChange={onSelectionChange}
            onSortChange={onSortChange}>
            <AcademicTableHeader
              columns={classroomColumnOptions}
              rowHeaderKey="id"
              selectionColumnClassName={classNames.selectionColumn}
              sortableHeaderClassName={classNames.sortableHeader}
              visibleColumns={visibleColumns}
            />

            <AcademicTableBody
              activeRowId={activeRowId}
              columns={classroomColumnOptions}
              emptyState={<TableEmptyState />}
              getRowClassName={getTableRowClassName}
              rows={rows}
              selectionLabel="classroom"
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
        ariaLabel="Classroom bulk actions"
        entityLabel="classroom"
        selectedCount={selectedCount}
        onBulkCopyIds={onBulkCopyIds}
        onBulkCopyLinks={onBulkCopyLinks}
        onBulkDelete={onBulkDelete}
        onBulkEdit={onBulkEdit}
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
