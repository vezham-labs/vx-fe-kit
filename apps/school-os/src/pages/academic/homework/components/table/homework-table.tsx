import { Inbox as InboxIcon } from '@vezham/icons-react'
import {
  Avatar,
  type Selection,
  type SortDescriptor,
  Table
} from '@vezham/react-v3'

import {
  homeworkColumnOptions,
  rowCountOptions
} from '@pages/academic/homework/data'
import type { ClassRow, DrawerMode } from '@pages/academic/homework/types'
import { getPaginationSummary } from '@pages/academic/homework/utils/homework'
import {
  classNames,
  getTableRowClassName
} from '@pages/academic/homework/variants'
import { BulkActionBar } from '@pages/academic/shared/bulk-action-bar'
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

export const HomeworkTable = ({
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
            <AcademicTableHeader
              columns={homeworkColumnOptions}
              rowHeaderKey="classes"
              selectionColumnClassName={classNames.selectionColumn}
              sortableHeaderClassName={classNames.sortableHeader}
              visibleColumns={visibleColumns}
            />

            <AcademicTableBody
              activeRowId={activeRowId}
              columns={homeworkColumnOptions}
              emptyState={<TableEmptyState />}
              getRowClassName={getTableRowClassName}
              rows={rows}
              selectionLabel="schedule"
              visibleColumns={visibleColumns}
              renderCell={renderCellContent}
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
