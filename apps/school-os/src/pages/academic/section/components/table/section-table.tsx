import { Inbox as InboxIcon } from '@vezham/icons-react'
import { type Selection, type SortDescriptor, Table } from '@vezham/react-v3'

import {
  rowCountOptions,
  sectionColumnOptions
} from '@pages/academic/section/data'
import type {
  ClassRow,
  DrawerMode,
  SectionColumnKey
} from '@pages/academic/section/types'
import { getPaginationSummary } from '@pages/academic/section/utils/section'
import {
  classNames,
  getTableRowClassName
} from '@pages/academic/section/variants'
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
  visibleColumns: Set<SectionColumnKey>
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

export const SectionTable = ({
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
    sectionColumnOptions.reduce(
      (total, column) =>
        total + (visibleColumns.has(column.key) ? column.defaultWidth : 0),
      0
    )

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.ResizableContainer>
          <Table.Content
            aria-label="Sections"
            className={classNames.tableContent}
            selectedKeys={selectedKeys}
            selectionBehavior="toggle"
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            style={{ minWidth: `${tableMinWidth}px` }}
            onSelectionChange={onSelectionChange}
            onSortChange={onSortChange}>
            <AcademicTableHeader
              columns={sectionColumnOptions}
              rowHeaderKey="id"
              selectionColumnClassName={classNames.selectionColumn}
              sortableHeaderClassName={classNames.sortableHeader}
              visibleColumns={visibleColumns}
            />

            <AcademicTableBody
              activeRowId={activeRowId}
              columns={sectionColumnOptions}
              emptyState={<TableEmptyState />}
              getRowClassName={getTableRowClassName}
              rows={rows}
              selectionLabel="schedule"
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
        ariaLabel="Section bulk actions"
        entityLabel="section"
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
