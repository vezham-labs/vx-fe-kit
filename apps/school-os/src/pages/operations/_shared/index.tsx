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

import { ShortcutTooltipLabel } from '../../../components/shortcut-key'
import type {
  CustomDateRangeValue,
  DatePresetKey,
  DateRangeFilter,
  DrawerMode,
  FilterDraft,
  OperationColumn,
  OperationPageConfig,
  OperationRow,
  OperationStatus,
  PersonValue
} from './types'
import { useDisclosure } from './types'
import { classNames, getTableRowClassName } from './variant'

const rowCountOptions = ['10', '25', '50']
const dateOptions: { key: DatePresetKey; label: string }[] = [
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'last7', label: 'Last 7 Days' },
  { key: 'last30', label: 'Last 30 Days' },
  { key: 'thisYear', label: 'This Year' },
  { key: 'nextYear', label: 'Next Year' },
  { key: 'custom', label: 'Custom Range' }
]

export default function OperationsTablePage({
  config
}: {
  config: OperationPageConfig
}) {
  const sectionTitle = getOperationSectionTitle(config)
  const pageSubtitle = getOperationPageSubtitle(config)
  const [data, setData] = useState<OperationRow[]>(config.rows)
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
  const [toast, setToast] = useState<{
    message: string
    status: 'success' | 'danger'
  } | null>(null)
  const drawer = useDisclosure()

  const activeDateRange = useMemo(() => {
    if (datePreset === 'custom') {
      return customDateRange
    }

    return getPresetDateRange(datePreset)
  }, [customDateRange, datePreset])
  const sortOptions = useMemo(() => getSortOptions(config), [config])
  const editableColumns = useMemo(
    () => config.columns.filter(column => column.type !== 'button'),
    [config.columns]
  )
  const tableColumns = useMemo(
    () => config.columns.filter(column => column.type !== 'button'),
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
      const matchesDate = isISODateInRange(
        row.createdAt,
        activeDateRange?.start,
        activeDateRange?.end
      )
      const matchesFilters = config.filters.every(filter => {
        const activeValue = filters[filter.key]

        return (
          !activeValue || String(getSortValue(row[filter.key])) === activeValue
        )
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

  const sortedRows = useMemo(
    () =>
      [...filteredRows].sort((firstRow, secondRow) => {
        const first = getSortValue(firstRow[sortDescriptor.column as string])
        const second = getSortValue(secondRow[sortDescriptor.column as string])
        const comparison =
          typeof first === 'number' && typeof second === 'number'
            ? first - second
            : String(first ?? '').localeCompare(
                String(second ?? ''),
                undefined,
                {
                  numeric: true
                }
              )

        return sortDescriptor.direction === 'descending'
          ? comparison * -1
          : comparison
      }),
    [filteredRows, sortDescriptor]
  )

  const pageSize = Number(rowsPerPage)
  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const paginatedRows = sortedRows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )
  const selectedRow = data.find(row => row.id === activeRowId) ?? null
  const selectedRowIndex = activeRowId
    ? sortedRows.findIndex(row => row.id === activeRowId)
    : -1
  const tableSelectedKeys = useMemo(
    () => (activeRowId ? new Set([activeRowId]) : selectedRowKeys),
    [activeRowId, selectedRowKeys]
  )
  const activeSortLabel =
    sortOptions.find(
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

  const openDrawer = useCallback(
    (nextMode: DrawerMode, row?: OperationRow) => {
      setMode(nextMode)

      if (row) {
        setActiveRowId(row.id)
        setForm(rowToForm(row, editableColumns))
      } else {
        setActiveRowId(null)
        setForm(createEmptyForm(editableColumns))
      }

      drawer.onOpen()
    },
    [drawer, editableColumns]
  )

  const closeDrawer = useCallback(() => {
    drawer.onClose()
    setActiveRowId(null)
    setMode('view')
  }, [drawer])

  const toggleDrawer = useCallback(() => {
    if (drawer.isOpen) {
      closeDrawer()
      return
    }

    const selectedKey = Array.from(selectedRowKeys)[0]
    const selectedRow =
      sortedRows.find(row => row.id === selectedKey) ?? sortedRows[0]

    if (selectedRow) {
      openDrawer('view', selectedRow)
      return
    }

    openDrawer('create')
  }, [closeDrawer, drawer.isOpen, openDrawer, selectedRowKeys, sortedRows])

  const goToRowAt = useCallback(
    (index: number) => {
      const nextRow = sortedRows[index]

      if (!nextRow) {
        return
      }

      openDrawer(mode === 'create' ? 'view' : mode, nextRow)
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
    const eventName = `operations:${config.key}:create`
    const onCreate = () => openDrawer('create')

    window.addEventListener(eventName, onCreate)

    return () => window.removeEventListener(eventName, onCreate)
  }, [config.key, openDrawer])

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
        .querySelector(`[data-operation-row-id="${activeRowId}"]`)
        ?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    })
  }, [activeRowId, currentPage, pageSize, sortedRows])

  useHotkey('Meta+/', () => toggleDrawer())

  useHotkey('Meta+ArrowUp', () => goToPreviousRow(), {
    enabled: drawer.isOpen && mode !== 'create'
  })

  useHotkey('Meta+ArrowDown', () => goToNextRow(), {
    enabled: drawer.isOpen && mode !== 'create'
  })

  const saveRow = () => {
    if (mode === 'create') {
      const nextRow = formToNewRow(form, editableColumns, data.length + 1)

      setData(current => [nextRow, ...current])
      setToast({ message: `${config.pageTitle} added`, status: 'success' })
      closeDrawer()
      return
    }

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
    setToast({ message: `${config.pageTitle} updated`, status: 'success' })
  }

  const deleteRow = (rowId: string) => {
    setData(current => current.filter(row => row.id !== rowId))
    setToast({ message: 'Item deleted', status: 'success' })

    if (activeRowId === rowId) {
      closeDrawer()
    }
  }

  const getRowUrl = (row: OperationRow) => {
    const url = new URL(window.location.href)

    url.searchParams.set('id', row.id)
    url.hash = ''

    return url.toString()
  }

  const copyRowLink = (row: OperationRow) => {
    void copyText(getRowUrl(row))
      .then(() => setToast({ message: 'URL copied', status: 'success' }))
      .catch(() =>
        setToast({ message: 'Unable to copy URL', status: 'danger' })
      )
  }

  const copyRowId = (row: OperationRow) => {
    void copyText(getDrawerTitle(row))
      .then(() => setToast({ message: 'ID copied', status: 'success' }))
      .catch(() => setToast({ message: 'Unable to copy ID', status: 'danger' }))
  }

  const openRowPage = (row: OperationRow) => {
    window.open(getRowUrl(row), '_blank', 'noopener,noreferrer')
  }

  return (
    <section className={classNames.page}>
      <Surface className={classNames.toolbar}>
        <div className={classNames.toolbarTop}>
          <div className={classNames.toolbarHead}>
            <h1 className={classNames.title}>{sectionTitle}</h1>
            <p className={classNames.mutedText}>{pageSubtitle}</p>
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
                        aria-label={`${config.pageTitle} custom date range`}
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
                          <RangeCalendar
                            aria-label={`${config.pageTitle} custom date range`}>
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
              onApply={() => {
                setFilters(draftFilters)
                setPage(1)
              }}
              onReset={() => {
                setDraftFilters(emptyFilters)
                setFilters(emptyFilters)
                setPage(1)
              }}
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
                <Dropdown.Menu aria-label={`Sort ${config.pageTitle}`}>
                  {sortOptions.map(option => (
                    <Dropdown.Item
                      key={option.key}
                      id={option.key}
                      textValue={option.label}
                      onPress={() => {
                        setSortDescriptor(option.descriptor)
                        setPage(1)
                      }}>
                      {option.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </div>
        </div>

        <div className={classNames.controlsRow}>
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

          <SearchField
            aria-label={`Search ${config.pageTitle}`}
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
            onSelectionChange={setSelectedRowKeys}
            onSortChange={descriptor => {
              setSortDescriptor(descriptor)
              setPage(1)
            }}>
            <Table.Header>
              <Table.Column className={classNames.selectionColumn} />
              {tableColumns.map(column => (
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
              <Table.Column>Action</Table.Column>
            </Table.Header>

            <Table.Body renderEmptyState={() => <TableEmptyState />}>
              {paginatedRows.map(row => (
                <Table.Row
                  key={row.id}
                  id={row.id}
                  data-operation-row-id={row.id}
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
                  {tableColumns.map(column => (
                    <Table.Cell key={column.key}>
                      <OperationCell
                        column={column}
                        row={row}
                        onAction={() => openDrawer('view', row)}
                      />
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
                          <Dropdown.Menu aria-label={`Actions for ${row.id}`}>
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

      <OperationsDrawer
        columns={editableColumns}
        drawerState={drawer}
        form={form}
        mode={mode}
        row={selectedRow}
        title={config.pageTitle}
        canGoNext={
          selectedRowIndex >= 0 && selectedRowIndex < sortedRows.length - 1
        }
        canGoPrevious={selectedRowIndex > 0}
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
  filters: OperationPageConfig['filters']
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
          <AltArrowDownIcon size={16} aria-hidden="true" />
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

function OperationCell({
  column,
  row,
  onAction
}: {
  column: OperationColumn
  row: OperationRow
  onAction: () => void
}) {
  const value = row[column.key]

  if (column.type === 'person') return <PersonCell value={value} />
  if (column.type === 'link') {
    return <span className={classNames.link}>{String(value)}</span>
  }
  if (column.type === 'status') {
    return <StatusChip status={String(value) as OperationStatus} />
  }
  if (column.type === 'badge') return <Badge value={String(value)} />
  if (column.type === 'button') {
    return (
      <Button
        className={classNames.actionButton}
        variant="secondary"
        onPress={onAction}>
        {String(value)}
      </Button>
    )
  }
  if (column.type === 'code') {
    return <span className={classNames.code}>{String(value)}</span>
  }

  return <span>{String(value ?? '')}</span>
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
      <span className={classNames.personText}>
        <span className={classNames.personName}>{personValue.name}</span>
        {personValue.subtitle ? (
          <span className={classNames.personSubtitle}>
            {personValue.subtitle}
          </span>
        ) : null}
      </span>
    </div>
  )
}

function StatusChip({ status }: { status: OperationStatus }) {
  const isPositive = status === 'Active' || status === 'Paid'
  const color = isPositive ? '#56bf3b' : '#ef4860'

  return (
    <span
      className={classNames.statusText}
      style={{ backgroundColor: isPositive ? '#eef9ec' : '#fdecef', color }}>
      <span
        className={classNames.statusDot}
        style={{ backgroundColor: color }}
      />
      {status}
    </span>
  )
}

function Badge({ value }: { value: string }) {
  const color =
    value === 'Fixed'
      ? ['#fdecef', '#ef4860']
      : value === 'Percentage'
        ? ['#eaf2ff', '#2f6fe4']
        : ['#fff7df', '#d89b10']

  return (
    <span
      className={classNames.badge}
      style={{ backgroundColor: color[0], color: color[1] }}>
      {value}
    </span>
  )
}

function SortableHeader({
  children,
  sortDirection
}: {
  children: string
  sortDirection?: 'ascending' | 'descending'
}) {
  return (
    <span className={classNames.sortableHeader}>
      {children}
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

function OperationsDrawer({
  columns,
  drawerState,
  form,
  mode,
  row,
  title,
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
  columns: OperationColumn[]
  drawerState: ReturnType<typeof useDisclosure>
  form: FilterDraft
  mode: DrawerMode
  row: OperationRow | null
  title: string
  canGoNext: boolean
  canGoPrevious: boolean
  onCancel: () => void
  onClose: () => void
  onEdit: () => void
  onFormChange: (field: string, value: string) => void
  onGoNext: () => void
  onGoPrevious: () => void
  onCopyId: (row: OperationRow) => void
  onCopyLink: (row: OperationRow) => void
  onOpenPage: (row: OperationRow) => void
  onSave: () => void
}) {
  const isFormMode = mode === 'edit' || mode === 'create'
  const showRecordActions = Boolean(row && mode !== 'create')
  const drawerTitle =
    mode === 'create' ? `Add ${title}` : row ? getDrawerTitle(row) : title

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
                  <span className={classNames.drawerTitle}>{drawerTitle}</span>
                  {row && mode !== 'create' ? (
                    <Tooltip delay={0}>
                      <Tooltip.Trigger>
                        <Button
                          isIconOnly
                          aria-label={`Copy ID ${drawerTitle}`}
                          variant="ghost"
                          onPress={() => onCopyId(row)}>
                          <CopyIcon size={16} aria-hidden="true" />
                        </Button>
                      </Tooltip.Trigger>
                      <Tooltip.Content>Copy</Tooltip.Content>
                    </Tooltip>
                  ) : null}
                </div>
                <div className={classNames.drawerActions}>
                  {showRecordActions ? (
                    <>
                      <Tooltip delay={0}>
                        <Tooltip.Trigger>
                          <Button
                            isIconOnly
                            aria-label={`Copy URL for ${drawerTitle}`}
                            variant="secondary"
                            onPress={() => row && onCopyLink(row)}>
                            <LinkIcon size={16} aria-hidden="true" />
                          </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>Copy clipboard</Tooltip.Content>
                      </Tooltip>
                      <Tooltip delay={0}>
                        <Tooltip.Trigger>
                          <Button
                            isIconOnly
                            aria-label={`Edit ${drawerTitle}`}
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
                            aria-label={`Open ${drawerTitle}`}
                            variant="secondary"
                            onPress={() => row && onOpenPage(row)}>
                            <ArrowRightUpIcon size={16} aria-hidden="true" />
                          </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>Open ↗</Tooltip.Content>
                      </Tooltip>
                    </>
                  ) : null}
                  {showRecordActions ? (
                    <>
                      <Tooltip delay={0}>
                        <Tooltip.Trigger>
                          <Button
                            isIconOnly
                            aria-label="Previous row"
                            isDisabled={!canGoPrevious}
                            variant="secondary"
                            onPress={onGoPrevious}>
                            <AltArrowUpIcon size={18} aria-hidden="true" />
                          </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>
                          <ShortcutTooltipLabel
                            label="Previous"
                            shortcut="⌘ ↑"
                          />
                        </Tooltip.Content>
                      </Tooltip>
                      <Tooltip delay={0}>
                        <Tooltip.Trigger>
                          <Button
                            isIconOnly
                            aria-label="Next row"
                            isDisabled={!canGoNext}
                            variant="secondary"
                            onPress={onGoNext}>
                            <AltArrowDownIcon size={18} aria-hidden="true" />
                          </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>
                          <ShortcutTooltipLabel label="Next" shortcut="⌘ ↓" />
                        </Tooltip.Content>
                      </Tooltip>
                    </>
                  ) : null}
                </div>
              </div>
            </Drawer.Header>
            <Drawer.Body className={classNames.drawerBody}>
              {isFormMode ? (
                <div className={classNames.form}>
                  {columns.map(column => (
                    <div key={column.key} className={classNames.field}>
                      <Label className={classNames.fieldLabel}>
                        {column.label || column.key}
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
                      <p className={classNames.detailLabel}>
                        {column.label || column.key}
                      </p>
                      <div className={classNames.detailValue}>
                        {row ? (
                          <OperationCell
                            column={column}
                            row={row}
                            onAction={() => undefined}
                          />
                        ) : (
                          '-'
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Drawer.Body>
            <Drawer.Footer className={classNames.drawerFooter}>
              {isFormMode ? (
                <div className={classNames.drawerFormFooterActions}>
                  <Button variant="secondary" onPress={onCancel}>
                    Cancel
                  </Button>
                  <Button onPress={onSave}>
                    {mode === 'create' ? 'Create' : 'Save'}
                  </Button>
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

function getDrawerTitle(row: OperationRow) {
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

function getOperationSectionTitle(config: OperationPageConfig) {
  if (operationSectionTitles[config.key]) {
    return operationSectionTitles[config.key]
  }

  return config.title
}

function getOperationPageSubtitle(config: OperationPageConfig) {
  if (operationPageSubtitles[config.key]) {
    return operationPageSubtitles[config.key]
  }

  return config.pageTitle
}

const operationSectionTitles: Record<string, string> = {
  'fees-group': 'Fees Collection',
  'fees-type': 'Fees Collection',
  'fees-master': 'Fees Collection',
  'fees-assign': 'Fees Collection',
  'collect-fees': 'Fees Collection',
  members: 'Library',
  books: 'Library',
  'issue-book': 'Library',
  return: 'Library',
  'hostel-list': 'Hostel',
  'hostel-room': 'Hostel',
  'room-type': 'Hostel',
  routes: 'Transport',
  'pickup-points': 'Transport',
  'vehicle-drivers': 'Transport',
  vehicles: 'Transport',
  assign: 'Transport'
}

const operationPageSubtitles: Record<string, string> = {
  'fees-group': 'Fees Group',
  'fees-type': 'Fees Type',
  'fees-master': 'Fees Master',
  'fees-assign': 'Fees Assign',
  'collect-fees': 'Collect Fees',
  members: 'Library Members',
  books: 'Books',
  'issue-book': 'Issue Books',
  return: 'Return Books',
  sports: 'Sports',
  players: 'Players',
  'hostel-list': 'Hostel List',
  'hostel-room': 'Hostel Room',
  'room-type': 'Room Type',
  routes: 'Routes',
  'pickup-points': 'Pickup Points',
  'vehicle-drivers': 'Drivers',
  vehicles: 'Vehicles',
  assign: 'Assign Vehicles'
}

function getInputPlaceholder(column: OperationColumn) {
  const label = (column.label || column.key).toLowerCase()

  if (column.type === 'status') return `Select ${label}`
  if (label.includes('date')) return `Choose ${label}`
  if (label.includes('amount') || label.includes('count'))
    return `Enter ${label}`

  return `Enter ${label}`
}

function getTextValue(value: unknown) {
  if (isPersonValue(value)) return value.name
  if (value === null || value === undefined) return ''

  return String(value).trim().split('\n')[0]
}

function rowToForm(row: OperationRow, columns: OperationColumn[]): FilterDraft {
  return columns.reduce<FilterDraft>((draft, column) => {
    draft[column.key] = String(getSortValue(row[column.key]) ?? '')
    return draft
  }, {})
}

function createEmptyForm(columns: OperationColumn[]): FilterDraft {
  return columns.reduce<FilterDraft>((draft, column) => {
    draft[column.key] = ''
    return draft
  }, {})
}

function formToRow(
  row: OperationRow,
  form: FilterDraft,
  columns: OperationColumn[]
) {
  return columns.reduce<OperationRow>(
    (draft, column) => {
      const original = row[column.key]
      const value = form[column.key] ?? ''

      draft[column.key] =
        typeof original === 'number'
          ? Number(value)
          : isPersonValue(original)
            ? { ...original, name: value }
            : value

      return draft
    },
    { ...row }
  )
}

function formToNewRow(
  form: FilterDraft,
  columns: OperationColumn[],
  index: number
) {
  const row: OperationRow = {
    id: `operation-${Date.now()}`,
    createdAt: '2026-05-11'
  }

  columns.forEach(column => {
    row[column.key] =
      form[column.key] || (column.type === 'status' ? 'Active' : `New ${index}`)
  })

  return row
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

function isISODateInRange(value: string, start?: string, end?: string) {
  if (!start || !end) {
    return true
  }

  return value >= start && value <= end
}

function toISODate(date: Date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('-')
}

function getSortOptions(config: OperationPageConfig) {
  return [
    {
      key: 'ascending',
      label: 'Ascending',
      descriptor: {
        column: config.initialSort.column,
        direction: 'ascending'
      } satisfies SortDescriptor
    },
    {
      key: 'descending',
      label: 'Descending',
      descriptor: {
        column: config.initialSort.column,
        direction: 'descending'
      } satisfies SortDescriptor
    },
    {
      key: 'recentlyViewed',
      label: 'Recently Viewed',
      descriptor: {
        column: 'createdAt',
        direction: 'ascending'
      } satisfies SortDescriptor
    },
    {
      key: 'recentlyAdded',
      label: 'Recently Added',
      descriptor: {
        column: 'createdAt',
        direction: 'descending'
      } satisfies SortDescriptor
    }
  ]
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
    return `${value.name} ${value.subtitle ?? ''}`
  }

  return String(value ?? '')
}

function getSortValue(value: unknown) {
  if (isPersonValue(value)) {
    return value.name
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
