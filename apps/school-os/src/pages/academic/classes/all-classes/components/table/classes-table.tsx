import { Inbox as InboxIcon } from '@vezham/icons-react'
import {
  Checkbox,
  Chip,
  type Selection,
  type SortDescriptor,
  Table
} from '@vezham/react-v3'

import type {
  AllClassesColumnKey,
  ClassRow,
  DrawerMode
} from '@pages/academic/classes/all-classes/types'
import { getPaginationSummary } from '@pages/academic/classes/all-classes/utils/classes'
import {
  classNames,
  getTableRowClassName
} from '@pages/academic/classes/all-classes/variants'
import { BulkActionBar } from '@pages/academic/shared/bulk-action-bar'
import { AcademicTableHeader } from '@pages/academic/shared/table-header'
import { TablePaginationFooter } from '@pages/academic/shared/table-pagination-footer'
import {
  allClassesColumnOptions,
  rowCountOptions
} from '@store/useAcademic/useAllClasses/data'

type Props = {
  activeRowId: string | null
  currentPage: number
  pageSize: number
  rows: ClassRow[]
  selectedCount: number
  selectedKeys: Selection
  rowsPerPage: string
  visibleColumns: Set<AllClassesColumnKey>
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

export const ClassesTable = ({
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
    allClassesColumnOptions.reduce(
      (total, column) =>
        total + (visibleColumns.has(column.key) ? column.defaultWidth : 0),
      0
    )

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.ResizableContainer>
          <Table.Content
            aria-label="All classes"
            className={classNames.tableContent}
            style={{ minWidth: `${tableMinWidth}px` }}
            selectedKeys={selectedKeys}
            selectionBehavior="toggle"
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            onSelectionChange={onSelectionChange}
            onSortChange={onSortChange}>
            <AcademicTableHeader
              columns={allClassesColumnOptions}
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
                      aria-label={`Select class ${row.id}`}
                      slot="selection"
                      onClick={event => event.stopPropagation()}>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                    </Checkbox>
                  </Table.Cell>
                  {allClassesColumnOptions
                    .filter(column => visibleColumns.has(column.key))
                    .map(column => {
                      const cellValue =
                        column.key === 'subjects'
                          ? row.subjects.toString().padStart(2, '0')
                          : row[column.key]

                      return (
                        <Table.Cell
                          key={column.key}
                          onPointerDown={event => event.stopPropagation()}
                          onClick={event => {
                            event.stopPropagation()
                            onOpenDrawer('view', row)
                          }}>
                          {column.key === 'status' ? (
                            <Chip
                              color={
                                row.status === 'Active' ? 'success' : 'danger'
                              }
                              size="sm"
                              variant="soft">
                              <span aria-hidden="true">●</span>
                              <Chip.Label>{row.status}</Chip.Label>
                            </Chip>
                          ) : (
                            cellValue
                          )}
                        </Table.Cell>
                      )
                    })}
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
        ariaLabel="All classes bulk actions"
        selectedCount={selectedCount}
        editLabel="Edit"
        deleteLabel="Delete"
        onEdit={onBulkEdit}
        onCopyIds={onBulkCopyIds}
        onCopyLinks={onBulkCopyLinks}
        onDelete={onBulkDelete}
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
