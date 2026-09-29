import { Inbox as InboxIcon } from '@vezham/icons-react'
import { type Selection, type SortDescriptor, Table } from '@vezham/react-v3'

import {
  reasonsColumnOptions,
  rowCountOptions
} from '@pages/academic/reasons/data'
import type { ClassRow, DrawerMode } from '@pages/academic/reasons/types'
import { formatDisplayDate } from '@pages/academic/reasons/utils/date'
import { getPaginationSummary } from '@pages/academic/reasons/utils/reasons'
import {
  classNames,
  getTableRowClassName
} from '@pages/academic/reasons/variants'
import { BulkActionBar } from '@pages/academic/shared/bulk-action-bar'
import { AcademicResizableTableContent } from '@pages/academic/shared/resizable-table-content'
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

export const ReasonsTable = ({
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
    reasonsColumnOptions.reduce(
      (total, column) =>
        total + (visibleColumns.has(column.key) ? column.defaultWidth : 0),
      0
    )

  return (
    <Table>
      <AcademicResizableTableContent
        ariaLabel="Schedules"
        className={classNames.tableContent}
        minWidth={tableMinWidth}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        onSelectionChange={onSelectionChange}
        onSortChange={onSortChange}>
        <AcademicTableHeader
          columns={reasonsColumnOptions}
          selectionColumnClassName={classNames.selectionColumn}
          sortableHeaderClassName={classNames.sortableHeader}
          visibleColumns={visibleColumns}
        />

        <AcademicTableBody
          activeRowId={activeRowId}
          columns={reasonsColumnOptions}
          emptyState={<TableEmptyState />}
          getRowClassName={getTableRowClassName}
          rows={rows}
          selectionLabel="schedule"
          visibleColumns={visibleColumns}
          renderCell={renderCellContent}
          onOpenRow={row => onOpenDrawer('view', row)}
        />
      </AcademicResizableTableContent>

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
        ariaLabel="Reasons bulk actions"
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
    case 'role':
      return row.role
    case 'reasons':
      return row.reasons
    case 'createdAt':
      return formatDisplayDate(row.createdAt)
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
