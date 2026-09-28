import { useHotkey } from '@tanstack/react-hotkeys'
import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  AltArrowDown as AltArrowDownIcon,
  AltArrowLeft as AltArrowLeftIcon,
  AltArrowUp as AltArrowUpIcon,
  ArrowRightUp as ArrowRightUpIcon,
  CalendarDate as CalendarDateIcon,
  CheckRead as CheckReadIcon,
  Copy as CopyIcon,
  DoubleAltArrowRight as DoubleAltArrowRightIcon,
  Eye as EyeIcon,
  Filter as FilterIcon,
  Inbox as InboxIcon,
  Link as LinkIcon,
  MenuDots as MenuDotsIcon,
  Pen as PenIcon,
  SortVertical as SortVerticalIcon,
  TrashBinTrash as TrashBinTrashIcon
} from '@vezham/icons-react'
import {
  Alert,
  Avatar,
  Button,
  Checkbox,
  CloseButton,
  DateField,
  DateRangePicker,
  Drawer,
  Dropdown,
  Input,
  Label,
  ListBox,
  Pagination,
  RangeCalendar,
  SearchField,
  Select,
  type Selection,
  type SortDescriptor,
  Surface,
  Table,
  Tooltip
} from '@vezham/react-v3'

import { ShortcutTooltipLabel } from '@components/shortcut-key'

import {
  attendanceReportConfig,
  dateOptions,
  rowCountOptions,
  statusLegend
} from './data'
import type {
  AttendancePageConfig,
  AttendanceStatus,
  CustomDateRangeValue,
  DatePresetKey,
  DateRangeFilter,
  DrawerMode,
  DrawerQueryState,
  FilterDraft,
  PersonValue,
  ReportColumn,
  ReportRow,
  SortableHeaderProps,
  ToastState
} from './types'
import { useDisclosure } from './types'
import { classNames, getTableRowClassName } from './variant'

type Props = {
  config: AttendancePageConfig
}

export default function AttendanceReportPage() {
  return <AttendanceTablePage config={attendanceReportConfig} />
}

function AttendanceTablePage({ config }: Props) {
  const [data, setData] = useState<ReportRow[]>(config.rows)
  const [searchQuery, setSearchQuery] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState('10')
  const [page, setPage] = useState(1)
  const [datePreset, setDatePreset] = useState<DatePresetKey>('last30')
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false)
  const [isCustomDateRangeOpen, setIsCustomDateRangeOpen] = useState(false)
  const [customDateRange, setCustomDateRange] =
    useState<DateRangeFilter | null>(null)
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>(
    config.initialSort
  )
  const emptyFilters = useMemo(
    () =>
      config.filters.reduce<FilterDraft>((draft, filter) => {
        draft[filter.key] = null
        return draft
      }, {}),
    [config.filters]
  )
  const [filters, setFilters] = useState<FilterDraft>(emptyFilters)
  const [draftFilters, setDraftFilters] = useState<FilterDraft>(emptyFilters)
  const [activeRowId, setActiveRowId] = useState<string | null>(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState<Selection>(new Set())
  const [mode, setMode] = useState<DrawerMode>('view')
  const [form, setForm] = useState<FilterDraft>({})
  const [toast, setToast] = useState<ToastState | null>(null)
  const drawer = useDisclosure()

  const activeDateRange = useMemo(() => {
    if (datePreset === 'custom') {
      return customDateRange
    }

    return getPresetDateRange(datePreset)
  }, [customDateRange, datePreset])

  const editableColumns = useMemo(
    () =>
      config.columns.filter(
        column => column.type !== 'marker' && column.type !== 'percent'
      ),
    [config.columns]
  )

  const filteredRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return data.filter(row => {
      const matchesQuery =
        !query ||
        config.columns.some(column =>
          getSearchText(row[column.key]).toLowerCase().includes(query)
        )
      const matchesDate =
        !activeDateRange ||
        isISODateInRange(
          row.createdAt,
          activeDateRange.start,
          activeDateRange.end
        )
      const matchesFilters = config.filters.every(filter => {
        const activeValue = filters[filter.key]

        if (!activeValue) {
          return true
        }

        if (filter.key === 'attendance') {
          return Object.values(row).some(value => String(value) === activeValue)
        }

        return String(getSortValue(row[filter.key])) === activeValue
      })

      return matchesQuery && matchesDate && matchesFilters
    })
  }, [
    activeDateRange,
    config.columns,
    config.filters,
    data,
    filters,
    searchQuery
  ])

  const sortedRows = useMemo(() => {
    return [...filteredRows].sort((firstRow, secondRow) => {
      const first = getSortValue(firstRow[sortDescriptor.column as string])
      const second = getSortValue(secondRow[sortDescriptor.column as string])
      const comparison =
        typeof first === 'number' && typeof second === 'number'
          ? first - second
          : String(first).localeCompare(String(second), undefined, {
              numeric: true
            })

      return sortDescriptor.direction === 'descending'
        ? comparison * -1
        : comparison
    })
  }, [filteredRows, sortDescriptor])

  const pageSize = Number(rowsPerPage)
  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const paginatedRows = sortedRows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )
  const selectedRow = useMemo(
    () => data.find(row => row.id === activeRowId) ?? null,
    [activeRowId, data]
  )
  const selectedRowIndex = activeRowId
    ? sortedRows.findIndex(row => row.id === activeRowId)
    : -1
  const tableSelectedKeys = useMemo(
    () => (activeRowId ? new Set([activeRowId]) : selectedRowKeys),
    [activeRowId, selectedRowKeys]
  )
  const activeSortLabel =
    config.sortOptions.find(
      option =>
        option.descriptor.column === sortDescriptor.column &&
        option.descriptor.direction === sortDescriptor.direction
    )?.label ?? 'Ascending'

  const activeDateLabel =
    datePreset === 'custom'
      ? customDateRange
        ? formatDateRangeLabel(customDateRange)
        : 'Custom Range'
      : formatDateRangeLabel(getPresetDateRange(datePreset))

  const updateDrawerQuery = useCallback(
    (nextState: DrawerQueryState | null, replace = false) => {
      const url = new URL(window.location.href)

      if (nextState) {
        url.searchParams.set('id', nextState.id)
        url.searchParams.set('mode', nextState.mode)
      } else {
        url.searchParams.delete('id')
        url.searchParams.delete('mode')
      }

      window.history[replace ? 'replaceState' : 'pushState'](
        null,
        '',
        `${url.pathname}${url.search}${url.hash}`
      )
    },
    []
  )

  const copyText = useCallback(async (value: string) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(value)
      return
    }

    const textarea = document.createElement('textarea')

    textarea.value = value
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }, [])

  const openDrawer = useCallback(
    (nextMode: DrawerMode, row: ReportRow, replaceUrl = false) => {
      setMode(nextMode)
      setActiveRowId(row.id)
      setForm(rowToForm(row, editableColumns))
      drawer.onOpen()
      updateDrawerQuery({ id: row.id, mode: nextMode }, replaceUrl)
    },
    [drawer, editableColumns, updateDrawerQuery]
  )

  const closeDrawer = useCallback(() => {
    drawer.onClose()
    setActiveRowId(null)
    updateDrawerQuery(null)
  }, [drawer, updateDrawerQuery])

  const toggleDrawer = useCallback(() => {
    if (drawer.isOpen) {
      closeDrawer()
      return
    }

    const selectedKey = Array.from(selectedRowKeys)[0]
    const selectedRow =
      sortedRows.find(row => row.id === selectedKey) ?? sortedRows[0]

    if (selectedRow) {
      openDrawer('view', selectedRow, true)
    }
  }, [closeDrawer, drawer.isOpen, openDrawer, selectedRowKeys, sortedRows])

  const updateTableSelection = useCallback((keys: Selection) => {
    setSelectedRowKeys(keys)
  }, [])

  const goToRowAt = useCallback(
    (index: number) => {
      const nextRow = sortedRows[index]

      if (nextRow) {
        openDrawer(mode, nextRow, true)
      }
    },
    [mode, openDrawer, sortedRows]
  )

  const goToNextRow = useCallback(() => {
    if (selectedRowIndex < 0) {
      goToRowAt(0)
      return
    }

    goToRowAt(Math.min(sortedRows.length - 1, selectedRowIndex + 1))
  }, [goToRowAt, selectedRowIndex, sortedRows.length])

  const goToPreviousRow = useCallback(() => {
    if (selectedRowIndex < 0) {
      goToRowAt(0)
      return
    }

    goToRowAt(Math.max(0, selectedRowIndex - 1))
  }, [goToRowAt, selectedRowIndex])

  useEffect(() => {
    const syncDrawerFromUrl = () => {
      const params = new URLSearchParams(window.location.search)
      const id = params.get('id')
      const urlMode = params.get('mode')

      if (!id || (urlMode !== 'view' && urlMode !== 'edit')) {
        setActiveRowId(null)
        drawer.onClose()
        return
      }

      const row = data.find(item => item.id === id)

      if (row) {
        openDrawer(urlMode, row, true)
      }
    }

    syncDrawerFromUrl()
    window.addEventListener('popstate', syncDrawerFromUrl)

    return () => window.removeEventListener('popstate', syncDrawerFromUrl)
  }, [data])

  useEffect(() => {
    if (!toast) {
      return
    }

    const timeoutId = window.setTimeout(() => setToast(null), 2200)

    return () => window.clearTimeout(timeoutId)
  }, [toast])

  useEffect(() => {
    if (!activeRowId) {
      return
    }

    const rowIndex = sortedRows.findIndex(row => row.id === activeRowId)

    if (rowIndex < 0) {
      return
    }

    const nextPage = Math.floor(rowIndex / pageSize) + 1

    if (nextPage !== currentPage) {
      setPage(nextPage)
      return
    }

    window.requestAnimationFrame(() => {
      document
        .querySelector(`[data-report-row-id="${activeRowId}"]`)
        ?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    })
  }, [activeRowId, currentPage, pageSize, sortedRows])

  useHotkey('Meta+/', () => toggleDrawer())

  useHotkey('Meta+ArrowUp', () => goToPreviousRow(), {
    enabled: drawer.isOpen
  })

  useHotkey('Meta+ArrowDown', () => goToNextRow(), {
    enabled: drawer.isOpen
  })

  useHotkey('Meta+S', () => closeDrawer(), {
    enabled: drawer.isOpen
  })

  useHotkey('Meta+ArrowUp', () => goToPreviousRow(), {
    enabled: drawer.isOpen
  })

  useHotkey('Meta+ArrowDown', () => goToNextRow(), {
    enabled: drawer.isOpen
  })

  const updateDatePreset = (key: DatePresetKey) => {
    setDatePreset(key)
    setPage(1)

    if (key === 'custom') {
      setIsCustomDateRangeOpen(true)
      setIsDateDropdownOpen(true)
      window.setTimeout(() => {
        setIsCustomDateRangeOpen(true)
        setIsDateDropdownOpen(true)
      }, 0)
      return
    }

    setIsCustomDateRangeOpen(false)
    setIsDateDropdownOpen(false)
  }

  const updateCustomDateRange = (value: CustomDateRangeValue | null) => {
    setDatePreset('custom')
    setPage(1)

    if (!value?.start || !value?.end) {
      setCustomDateRange(null)
      return
    }

    setCustomDateRange({
      start: String(value.start),
      end: String(value.end)
    })
    setIsDateDropdownOpen(false)
    setIsCustomDateRangeOpen(false)
  }

  const updateSortDescriptor = (descriptor: SortDescriptor) => {
    setSortDescriptor(descriptor)
    setPage(1)
  }

  const applyFilters = () => {
    setFilters(draftFilters)
    setPage(1)
  }

  const resetFilters = () => {
    setDraftFilters(emptyFilters)
    setFilters(emptyFilters)
    setPage(1)
  }

  const saveRow = () => {
    if (!selectedRow) {
      return
    }

    const updatedRow = formToRow(selectedRow, form, editableColumns)

    setData(current =>
      current.map(row => (row.id === updatedRow.id ? updatedRow : row))
    )
    setActiveRowId(updatedRow.id)
    setForm(rowToForm(updatedRow, editableColumns))
    setMode('view')
    updateDrawerQuery({ id: updatedRow.id, mode: 'view' }, true)
    setToast({ message: 'Item updated', status: 'success' })
  }

  const deleteRow = (rowId: string) => {
    setData(current => current.filter(row => row.id !== rowId))

    if (activeRowId === rowId) {
      closeDrawer()
    }

    setToast({ message: 'Item deleted', status: 'success' })
  }

  const getRowUrl = (
    row: ReportRow,
    nextMode: Exclude<DrawerMode, 'edit'> | DrawerMode = 'view'
  ) => {
    const url = new URL(window.location.href)

    url.searchParams.set('id', row.id)
    url.searchParams.set('mode', nextMode)
    url.hash = ''

    return url.toString()
  }

  const copyRowLink = (row: ReportRow) => {
    void copyText(getRowUrl(row, mode))
      .then(() => setToast({ message: 'URL copied', status: 'success' }))
      .catch(() =>
        setToast({ message: 'Unable to copy URL', status: 'danger' })
      )
  }

  const copyRowId = (row: ReportRow) => {
    void copyText(row.id)
      .then(() => setToast({ message: 'ID copied', status: 'success' }))
      .catch(() => setToast({ message: 'Unable to copy ID', status: 'danger' }))
  }

  const openRowPage = (row: ReportRow) => {
    window.open(getRowUrl(row), '_blank', 'noopener,noreferrer')
  }

  return (
    <section className={classNames.page}>
      <Surface className={classNames.toolbar}>
        <div className={classNames.headerRow}>
          <div>
            <p className={classNames.mutedText}>Reports</p>
            <h1 className={classNames.title}>{config.title}</h1>
          </div>

          <div className={classNames.toolbarActions}>
            <Dropdown
              isOpen={isDateDropdownOpen}
              onOpenChange={open => {
                setIsDateDropdownOpen(open)
                if (!open) {
                  setIsCustomDateRangeOpen(false)
                }
              }}>
              <Dropdown.Trigger>
                <Button variant="outline">
                  <CalendarDateIcon size={16} aria-hidden="true" />
                  {activeDateLabel}
                  <AltArrowDownIcon size={16} aria-hidden="true" />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Popover>
                <Surface className={classNames.datePopover}>
                  {isCustomDateRangeOpen ? (
                    <div
                      className={classNames.customDatePanel}
                      onClick={event => event.stopPropagation()}>
                      <Button
                        variant="ghost"
                        onPress={() => setIsCustomDateRangeOpen(false)}>
                        <AltArrowLeftIcon size={16} aria-hidden="true" />
                        Date presets
                      </Button>
                      <DateRangePicker
                        defaultOpen
                        aria-label="Schedule custom date range"
                        className={classNames.fullWidth}
                        endName="endDate"
                        startName="startDate"
                        onChange={updateCustomDateRange}>
                        <DateField.Group fullWidth>
                          <DateField.Input slot="start">
                            {segment => <DateField.Segment segment={segment} />}
                          </DateField.Input>
                          <DateRangePicker.RangeSeparator />
                          <DateField.Input slot="end">
                            {segment => <DateField.Segment segment={segment} />}
                          </DateField.Input>
                          <DateField.Suffix>
                            <DateRangePicker.Trigger>
                              <DateRangePicker.TriggerIndicator />
                            </DateRangePicker.Trigger>
                          </DateField.Suffix>
                        </DateField.Group>
                        <DateRangePicker.Popover>
                          <RangeCalendar aria-label="Schedule custom date range">
                            <RangeCalendar.Header>
                              <RangeCalendar.Heading />
                              <RangeCalendar.NavButton slot="previous" />
                              <RangeCalendar.NavButton slot="next" />
                            </RangeCalendar.Header>
                            <RangeCalendar.Grid>
                              <RangeCalendar.GridHeader>
                                {day => (
                                  <RangeCalendar.HeaderCell>
                                    {day}
                                  </RangeCalendar.HeaderCell>
                                )}
                              </RangeCalendar.GridHeader>
                              <RangeCalendar.GridBody>
                                {date => <RangeCalendar.Cell date={date} />}
                              </RangeCalendar.GridBody>
                            </RangeCalendar.Grid>
                          </RangeCalendar>
                        </DateRangePicker.Popover>
                      </DateRangePicker>
                    </div>
                  ) : (
                    <Dropdown.Menu aria-label="Date presets">
                      {dateOptions.map(option => (
                        <Dropdown.Item
                          key={option.key}
                          id={option.key}
                          textValue={option.label}
                          onPress={() => updateDatePreset(option.key)}>
                          <span className={classNames.dateOptionLabel}>
                            {option.label}
                            {datePreset === option.key && (
                              <CheckReadIcon size={16} aria-hidden="true" />
                            )}
                          </span>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  )}
                </Surface>
              </Dropdown.Popover>
            </Dropdown>

            <FilterDropdown
              draftFilters={draftFilters}
              filters={config.filters}
              setDraftFilters={setDraftFilters}
              onApply={applyFilters}
              onReset={resetFilters}
            />

            <Dropdown>
              <Dropdown.Trigger>
                <Button variant="outline">
                  <SortVerticalIcon size={16} aria-hidden="true" />
                  Sort by {activeSortLabel}
                  <AltArrowDownIcon size={16} aria-hidden="true" />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Popover>
                <Dropdown.Menu aria-label={`Sort ${config.title}`}>
                  {config.sortOptions.map(option => (
                    <Dropdown.Item
                      key={option.key}
                      id={option.key}
                      textValue={option.label}
                      onPress={() => updateSortDescriptor(option.descriptor)}>
                      {option.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </div>
        </div>

        <div className={classNames.headerRow}>
          <div className={classNames.rowsControls}>
            <Label>Row Per Page</Label>
            <Select
              aria-label="Rows per page"
              value={rowsPerPage}
              onChange={value => {
                setRowsPerPage(value ? String(value) : '10')
                setPage(1)
              }}>
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
            <Label>Entries</Label>
          </div>

          <div className={classNames.controlsRight}>
            {config.showStatusLegend && <StatusLegend />}
            <SearchField
              aria-label={`Search ${config.title}`}
              value={searchQuery}
              onChange={value => {
                setSearchQuery(value)
                setPage(1)
              }}>
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input placeholder="Search" />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
          </div>
        </div>
      </Surface>

      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label={config.ariaLabel}
            className={classNames.tableContent}
            selectedKeys={tableSelectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            style={{ minWidth: config.tableMinWidth }}
            onSelectionChange={updateTableSelection}
            onSortChange={updateSortDescriptor}>
            <Table.Header>
              <Table.Column className={classNames.selectionColumn} />
              {config.columns.map(column => (
                <Table.Column
                  key={column.key}
                  allowsSorting={column.allowsSorting}
                  id={column.key}
                  isRowHeader={column.type === 'person'}
                  style={{ minWidth: column.minWidth }}>
                  {({ sortDirection }) => (
                    <SortableHeader sortDirection={sortDirection}>
                      {column.label}
                    </SortableHeader>
                  )}
                </Table.Column>
              ))}
              <Table.Column>Actions</Table.Column>
            </Table.Header>

            <Table.Body renderEmptyState={() => <TableEmptyState />}>
              {paginatedRows.map(row => (
                <Table.Row
                  key={row.id}
                  id={row.id}
                  data-report-row-id={row.id}
                  className={getTableRowClassName(activeRowId === row.id)}
                  onClick={() => openDrawer('view', row)}>
                  <Table.Cell>
                    <Checkbox
                      aria-label={`Select ${row.id}`}
                      slot="selection"
                      onClick={event => event.stopPropagation()}>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                    </Checkbox>
                  </Table.Cell>
                  {config.columns.map(column => (
                    <Table.Cell key={column.key}>
                      <ReportCell column={column} row={row} />
                    </Table.Cell>
                  ))}
                  <Table.Cell>
                    <div
                      className={classNames.rowActions}
                      onClick={event => event.stopPropagation()}>
                      <Button
                        isIconOnly
                        aria-label={`Edit ${row.id}`}
                        variant="ghost"
                        onPress={() => openDrawer('edit', row)}>
                        <PenIcon size={16} aria-hidden="true" />
                      </Button>
                      <Button
                        isIconOnly
                        aria-label={`Delete ${row.id}`}
                        variant="outline"
                        onPress={() => deleteRow(row.id)}>
                        <TrashBinTrashIcon
                          className={classNames.dangerIcon}
                          size={16}
                          aria-hidden="true"
                        />
                      </Button>
                      <Dropdown>
                        <Dropdown.Trigger>
                          <Button
                            isIconOnly
                            aria-label={`More actions for ${row.id}`}
                            variant="ghost">
                            <MenuDotsIcon size={18} aria-hidden="true" />
                          </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Popover>
                          <Dropdown.Menu
                            aria-label={`More actions for ${row.id}`}>
                            <Dropdown.Item
                              id="view"
                              textValue="View"
                              onPress={() => openDrawer('view', row)}>
                              <span className={classNames.menuItemLabel}>
                                <EyeIcon size={16} aria-hidden="true" />
                                View
                              </span>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown.Popover>
                      </Dropdown>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        <Table.Footer className={classNames.paginationFooter}>
          <Pagination>
            <Pagination.Summary>
              {getPaginationSummary(currentPage, pageSize, sortedRows.length)}
            </Pagination.Summary>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={currentPage <= 1}
                  onPress={() => setPage(value => Math.max(1, value - 1))}>
                  <Pagination.PreviousIcon />
                  <span>Prev</span>
                </Pagination.Previous>
              </Pagination.Item>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                item => (
                  <Pagination.Item key={item}>
                    <Pagination.Link
                      isActive={item === currentPage}
                      onPress={() => setPage(item)}>
                      {item}
                    </Pagination.Link>
                  </Pagination.Item>
                )
              )}
              <Pagination.Item>
                <Pagination.Next
                  isDisabled={currentPage >= totalPages}
                  onPress={() =>
                    setPage(value => Math.min(totalPages, value + 1))
                  }>
                  <span>Next</span>
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </Table.Footer>
      </Table>

      <AttendanceDrawer
        columns={editableColumns}
        form={form}
        mode={mode}
        row={selectedRow}
        canGoNext={
          selectedRowIndex >= 0 && selectedRowIndex < sortedRows.length - 1
        }
        canGoPrevious={selectedRowIndex > 0}
        drawerState={drawer}
        onCancel={closeDrawer}
        onClose={closeDrawer}
        onEdit={() => setMode('edit')}
        onFormChange={(field, value) =>
          setForm(current => ({ ...current, [field]: value }))
        }
        onGoNext={goToNextRow}
        onGoPrevious={goToPreviousRow}
        onCopyId={copyRowId}
        onCopyLink={copyRowLink}
        onOpenPage={openRowPage}
        onSave={saveRow}
      />

      {toast && (
        <div className={classNames.toast}>
          <Alert status={toast.status}>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{toast.message}</Alert.Title>
            </Alert.Content>
            <CloseButton onClick={() => setToast(null)} />
          </Alert>
        </div>
      )}
    </section>
  )
}

function FilterDropdown({
  filters,
  draftFilters,
  setDraftFilters,
  onApply,
  onReset
}: {
  filters: AttendancePageConfig['filters']
  draftFilters: FilterDraft
  setDraftFilters: (filters: FilterDraft) => void
  onApply: () => void
  onReset: () => void
}) {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="outline">
          <FilterIcon size={16} aria-hidden="true" />
          Filter
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Surface className={classNames.filterPanel}>
          <h2 className={classNames.filterTitle}>Filter</h2>
          {filters.map(filter => (
            <Select
              key={filter.key}
              fullWidth
              aria-label={`Filter by ${filter.label}`}
              placeholder={`Select ${filter.label.toLowerCase()}`}
              value={draftFilters[filter.key]}
              onChange={value =>
                setDraftFilters({
                  ...draftFilters,
                  [filter.key]: value ? String(value) : null
                })
              }>
              <Label>{filter.label}</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {filter.values.map(option => (
                    <ListBox.Item key={option} id={option} textValue={option}>
                      {option}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          ))}

          <div className={classNames.filterActions}>
            <Button variant="secondary" onPress={onReset}>
              Reset
            </Button>
            <Button onPress={onApply}>Apply</Button>
          </div>
        </Surface>
      </Dropdown.Popover>
    </Dropdown>
  )
}

function StatusLegend() {
  return (
    <div className={classNames.legend}>
      {statusLegend.map(item => (
        <Button key={item.label} variant="outline">
          <AttendanceMarker status={item.status} />
          {item.label}
        </Button>
      ))}
    </div>
  )
}

function ReportCell({ column, row }: { column: ReportColumn; row: ReportRow }) {
  const value = row[column.key]

  if (column.type === 'person') {
    return <PersonCell value={value} />
  }

  if (column.type === 'link') {
    return <span className={classNames.link}>{String(value)}</span>
  }

  if (column.type === 'status') {
    return <StatusChip status={String(value) as AttendanceStatus} />
  }

  if (column.type === 'percent') {
    const percent = Number(value)

    return (
      <span
        className={classNames.percentBadge}
        style={{ backgroundColor: percent < 50 ? '#f12c58' : '#156fe3' }}>
        {String(value)}
      </span>
    )
  }

  if (column.type === 'marker') {
    return <AttendanceMarker status={String(value) as AttendanceStatus} />
  }

  return <span>{String(value)}</span>
}

function PersonCell({ value }: { value: unknown }) {
  const personValue = value as PersonValue

  return (
    <div className={classNames.personCell}>
      <Avatar className={classNames.personAvatar} size="sm">
        {personValue.avatar && (
          <Avatar.Image src={personValue.avatar} alt={personValue.name} />
        )}
        <Avatar.Fallback>{getInitials(personValue.name)}</Avatar.Fallback>
      </Avatar>
      <span className={classNames.personName}>{personValue.name}</span>
    </div>
  )
}

function StatusChip({ status }: { status: AttendanceStatus }) {
  return (
    <span className={classNames.statusText}>
      <AttendanceMarker status={status} />
      {status}
    </span>
  )
}

function AttendanceMarker({ status }: { status: AttendanceStatus }) {
  return (
    <span
      aria-label={status}
      className={classNames.marker}
      style={{ backgroundColor: getStatusHex(status) }}
    />
  )
}

function SortableHeader({ children, sortDirection }: SortableHeaderProps) {
  return (
    <span className={classNames.sortableHeader}>
      {children.split('\n').map(line => (
        <span key={line}>{line}</span>
      ))}
      {sortDirection && <SortVerticalIcon size={12} aria-hidden="true" />}
    </span>
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

function AttendanceDrawer({
  columns,
  drawerState,
  form,
  mode,
  row,
  canGoNext,
  canGoPrevious,
  onCancel,
  onClose,
  onEdit,
  onFormChange,
  onGoNext,
  onGoPrevious,
  onCopyId,
  onCopyLink,
  onOpenPage,
  onSave
}: {
  columns: ReportColumn[]
  drawerState: ReturnType<typeof useDisclosure>
  form: FilterDraft
  mode: DrawerMode
  row: ReportRow | null
  canGoNext: boolean
  canGoPrevious: boolean
  onCancel: () => void
  onClose: () => void
  onEdit: () => void
  onFormChange: (field: string, value: string) => void
  onGoNext: () => void
  onGoPrevious: () => void
  onCopyId: (row: ReportRow) => void
  onCopyLink: (row: ReportRow) => void
  onOpenPage: (row: ReportRow) => void
  onSave: () => void
}) {
  return (
    <Drawer state={drawerState}>
      <Drawer.Backdrop variant="transparent">
        <Drawer.Content placement="right">
          <Drawer.Dialog className={classNames.drawerDialog}>
            <Drawer.Header className={classNames.drawerHeader}>
              <div className={classNames.drawerHeaderRow}>
                <div className={classNames.drawerTitleGroup}>
                  <Tooltip delay={0}>
                    <Tooltip.Trigger>
                      <Button
                        isIconOnly
                        aria-label="Toggle drawer"
                        variant="ghost"
                        onPress={onClose}>
                        <DoubleAltArrowRightIcon size={24} aria-hidden="true" />
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                      <ShortcutTooltipLabel
                        label="Toggle Drawer"
                        shortcut="⌘ /"
                      />
                    </Tooltip.Content>
                  </Tooltip>
                  <h2 className={classNames.drawerTitle}>
                    {row ? getDrawerTitle(row) : ''}
                  </h2>
                  {row && (
                    <Tooltip delay={0}>
                      <Tooltip.Trigger>
                        <Button
                          isIconOnly
                          aria-label={`Copy ID ${row.id}`}
                          variant="ghost"
                          onPress={() => onCopyId(row)}>
                          <CopyIcon size={16} aria-hidden="true" />
                        </Button>
                      </Tooltip.Trigger>
                      <Tooltip.Content>Copy</Tooltip.Content>
                    </Tooltip>
                  )}
                </div>
                <div className={classNames.drawerActions}>
                  {row && (
                    <>
                      <Tooltip delay={0}>
                        <Tooltip.Trigger>
                          <Button
                            isIconOnly
                            aria-label={`Copy URL for ${row.id}`}
                            variant="secondary"
                            onPress={() => onCopyLink(row)}>
                            <LinkIcon size={16} aria-hidden="true" />
                          </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>Copy clipboard</Tooltip.Content>
                      </Tooltip>
                      <Tooltip delay={0}>
                        <Tooltip.Trigger>
                          <Button
                            isIconOnly
                            aria-label={`Edit ${row.id}`}
                            variant="secondary"
                            onPress={onEdit}>
                            <PenIcon size={16} aria-hidden="true" />
                          </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>
                          <ShortcutTooltipLabel label="Edit" shortcut="⌘ E" />
                        </Tooltip.Content>
                      </Tooltip>
                      <Tooltip delay={0}>
                        <Tooltip.Trigger>
                          <Button
                            isIconOnly
                            aria-label={`Open ${row.id}`}
                            variant="secondary"
                            onPress={() => onOpenPage(row)}>
                            <ArrowRightUpIcon size={16} aria-hidden="true" />
                          </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>Open ↗</Tooltip.Content>
                      </Tooltip>
                    </>
                  )}
                  <Tooltip delay={0}>
                    <Tooltip.Trigger>
                      <Button
                        isIconOnly
                        aria-label="Previous row"
                        isDisabled={!canGoPrevious}
                        variant="ghost"
                        onPress={onGoPrevious}>
                        <AltArrowUpIcon size={18} aria-hidden="true" />
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                      <ShortcutTooltipLabel label="Previous" shortcut="⌘ ↑" />
                    </Tooltip.Content>
                  </Tooltip>
                  <Tooltip delay={0}>
                    <Tooltip.Trigger>
                      <Button
                        isIconOnly
                        aria-label="Next row"
                        isDisabled={!canGoNext}
                        variant="ghost"
                        onPress={onGoNext}>
                        <AltArrowDownIcon size={18} aria-hidden="true" />
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                      <ShortcutTooltipLabel label="Next" shortcut="⌘ ↓" />
                    </Tooltip.Content>
                  </Tooltip>
                </div>
              </div>
            </Drawer.Header>

            <Drawer.Body className={classNames.drawerBody}>
              {mode === 'edit' ? (
                <div className={classNames.form}>
                  {columns.map(column => (
                    <div key={column.key} className={classNames.field}>
                      <Label className={classNames.fieldLabel}>
                        {column.label}
                      </Label>
                      <Input
                        fullWidth
                        placeholder={getInputPlaceholder(column)}
                        value={form[column.key] ?? ''}
                        onChange={event =>
                          onFormChange(column.key, event.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className={classNames.details}>
                  {columns.map(column => (
                    <div key={column.key} className={classNames.detailLine}>
                      <p className={classNames.detailLabel}>{column.label}</p>
                      <div className={classNames.detailValue}>
                        {row ? <ReportCell column={column} row={row} /> : '-'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Drawer.Body>

            <Drawer.Footer className={classNames.drawerFooter}>
              {mode === 'edit' ? (
                <div className={classNames.drawerFormFooterActions}>
                  <Button variant="secondary" onPress={onCancel}>
                    Cancel
                  </Button>
                  <Button onPress={onSave}>Save</Button>
                </div>
              ) : (
                <div className={classNames.drawerViewFooterActions}>
                  <Button
                    className={classNames.flexOne}
                    variant="secondary"
                    onPress={onClose}>
                    Close
                  </Button>
                  <Button className={classNames.flexOne} onPress={onEdit}>
                    Edit
                  </Button>
                </div>
              )}
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  )
}

function getDrawerTitle(row: ReportRow) {
  const idValue =
    getTextValue(row.displayId) ||
    getTextValue(row.refId) ||
    getTextValue(row.studentId) ||
    getTextValue(row.admissionNo) ||
    getTextValue(row.admissionNumber) ||
    getTextValue(row.serialNo) ||
    getTextValue(row.sNo) ||
    getTextValue(row.id)
  const nameValue =
    getTextValue(row.name) ||
    getTextValue(row.studentName) ||
    getTextValue(row.staffName) ||
    getTextValue(row.teacherName)

  if (idValue) {
    return idValue.startsWith('#') ? idValue : `#${idValue}`
  }

  return nameValue || '-'
}

function getInputPlaceholder(column: ReportColumn) {
  const label = (column.label || column.key).toLowerCase()

  if (column.type === 'status') return `Select ${label}`
  if (label.includes('date')) return `Choose ${label}`
  if (
    label.includes('amount') ||
    label.includes('balance') ||
    label.includes('fine')
  ) {
    return `Enter ${label}`
  }

  return `Enter ${label}`
}

function getTextValue(value: unknown) {
  if (isPersonValue(value)) return value.name
  if (value === null || value === undefined) return ''

  return String(value).trim().split('\n')[0]
}

function rowToForm(row: ReportRow, columns: ReportColumn[]): FilterDraft {
  return columns.reduce<FilterDraft>((draft, column) => {
    draft[column.key] = String(getSortValue(row[column.key]) ?? '')
    return draft
  }, {})
}

function formToRow(
  row: ReportRow,
  form: FilterDraft,
  columns: ReportColumn[]
): ReportRow {
  return columns.reduce<ReportRow>(
    (draft, column) => {
      const original = row[column.key]
      const value = form[column.key] ?? ''

      if (typeof original === 'number') {
        draft[column.key] = Number(value)
      } else if (isPersonValue(original)) {
        draft[column.key] = { ...original, name: value }
      } else {
        draft[column.key] = value
      }

      return draft
    },
    { ...row, viewedAt: toISODate(new Date()) }
  )
}

function getPresetDateRange(key: DatePresetKey): DateRangeFilter {
  const today = new Date()
  const currentYear = today.getFullYear()

  if (key === 'today') {
    const value = toISODate(today)

    return { start: value, end: value }
  }

  if (key === 'yesterday') {
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)
    const value = toISODate(yesterday)

    return { start: value, end: value }
  }

  if (key === 'last7') {
    const start = new Date(today)
    start.setDate(today.getDate() - 6)

    return { start: toISODate(start), end: toISODate(today) }
  }

  if (key === 'thisYear') {
    return {
      start: `${currentYear}-01-01`,
      end: `${currentYear}-12-31`
    }
  }

  if (key === 'nextYear') {
    const nextYear = currentYear + 1

    return {
      start: `${nextYear}-01-01`,
      end: `${nextYear}-12-31`
    }
  }

  const start = new Date(today)
  start.setDate(today.getDate() - 29)

  return { start: toISODate(start), end: toISODate(today) }
}

function formatDateRangeLabel(range: DateRangeFilter) {
  return `${formatISODate(range.start)} - ${formatISODate(range.end)}`
}

function formatISODate(value: string) {
  const date = new Date(`${value}T00:00:00`)

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date)
}

function isISODateInRange(value: string, start: string, end: string) {
  return value >= start && value <= end
}

function getStatusHex(status: AttendanceStatus) {
  if (status === 'Absent') {
    return '#f12c58'
  }

  if (status === 'Late') {
    return '#21c1ed'
  }

  if (status === 'Half Day' || status === 'Halfday') {
    return '#111426'
  }

  if (status === 'Holiday') {
    return '#156fe3'
  }

  return '#21bf32'
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function getSearchText(value: unknown) {
  if (isPersonValue(value)) {
    return value.name
  }

  return String(value ?? '')
}

function getSortValue(value: unknown) {
  if (isPersonValue(value)) {
    return value.name
  }

  if (typeof value === 'string' && value.endsWith('%')) {
    return Number(value.replace('%', ''))
  }

  return value as string | number
}

function isPersonValue(value: unknown): value is PersonValue {
  return value !== null && typeof value === 'object' && 'name' in value
}

function getPaginationSummary(
  page: number,
  pageSize: number,
  totalItems: number
) {
  if (!totalItems) {
    return 'Showing 0 entries'
  }

  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, totalItems)

  return `Showing ${start}-${end} of ${totalItems} entries`
}

function toISODate(date: Date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('-')
}
