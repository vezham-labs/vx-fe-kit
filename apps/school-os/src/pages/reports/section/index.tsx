import { useMemo, useState } from 'react'

import {
  AltArrowDown as AltArrowDownIcon,
  AltArrowLeft as AltArrowLeftIcon,
  CalendarDate as CalendarDateIcon,
  CheckRead as CheckReadIcon,
  Filter as FilterIcon,
  Inbox as InboxIcon,
  SortVertical as SortVerticalIcon
} from '@vezham/icons-react'
import {
  Avatar,
  Button,
  Chip,
  DateField,
  DateRangePicker,
  Dropdown,
  Label,
  ListBox,
  Pagination,
  RangeCalendar,
  SearchField,
  Select,
  type SortDescriptor,
  Surface,
  Table
} from '@vezham/react-v3'

import { AppIcon } from '@vx/react/app-icon'

import {
  dateOptions,
  reportsByTitle,
  rowCountOptions,
  statusLegend
} from './data'
import type {
  AttendanceReportConfig,
  AttendanceStatus,
  CustomDateRangeValue,
  DatePresetKey,
  DateRangeFilter,
  FilterDraft,
  FilterDropdownProps,
  PersonValue,
  ReportColumn,
  ReportRow,
  SortableHeaderProps
} from './types'
import { classNames } from './variant'

type ReportsSectionPageProps = {
  title: string
}

export default function ReportsSectionPage({ title }: ReportsSectionPageProps) {
  const report = reportsByTitle[title] ?? reportsByTitle['Attendance Report']

  return <AttendanceReportTable key={report.key} report={report} />
}

function AttendanceReportTable({ report }: { report: AttendanceReportConfig }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState('10')
  const [page, setPage] = useState(1)
  const [datePreset, setDatePreset] = useState<DatePresetKey>('last30')
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false)
  const [isCustomDateRangeOpen, setIsCustomDateRangeOpen] = useState(false)
  const [customDateRange, setCustomDateRange] =
    useState<DateRangeFilter | null>(null)
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>(
    report.initialSort
  )
  const emptyFilters = useMemo(
    () =>
      report.filters.reduce<FilterDraft>((draft, filter) => {
        draft[filter.key] = null
        return draft
      }, {}),
    [report.filters]
  )
  const [filters, setFilters] = useState<FilterDraft>(emptyFilters)
  const [draftFilters, setDraftFilters] = useState<FilterDraft>(emptyFilters)

  const activeDateRange = useMemo(() => {
    if (datePreset === 'custom') {
      return customDateRange
    }

    return getPresetDateRange(datePreset)
  }, [customDateRange, datePreset])

  const filteredRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return report.rows.filter(row => {
      const matchesQuery =
        !query ||
        report.columns.some(column =>
          getSearchText(row[column.key]).toLowerCase().includes(query)
        )
      const matchesDate =
        !activeDateRange ||
        isISODateInRange(
          row.createdAt,
          activeDateRange.start,
          activeDateRange.end
        )
      const matchesFilters = report.filters.every(filter => {
        const activeValue = filters[filter.key]

        if (!activeValue) {
          return true
        }

        if (filter.key === 'attendance') {
          return Object.values(row).some(value => String(value) === activeValue)
        }

        return String(row[filter.key]) === activeValue
      })

      return matchesQuery && matchesDate && matchesFilters
    })
  }, [
    activeDateRange,
    filters,
    report.columns,
    report.filters,
    report.rows,
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
  const activeSortLabel =
    report.sortOptions.find(
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

  const updateRowsPerPage = (value: string | number | null) => {
    setRowsPerPage(value ? String(value) : '10')
    setPage(1)
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

  return (
    <section className={classNames.page}>
      <Surface className={classNames.toolbar}>
        <div className={classNames.headerRow}>
          <div>
            <p className={classNames.mutedText}>Reports</p>
            <h1 className={classNames.title}>{report.title}</h1>
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
              filters={report.filters}
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
                <Dropdown.Menu aria-label={`Sort ${report.title}`}>
                  {report.sortOptions.map(option => (
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
              onChange={updateRowsPerPage}>
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
            {report.showStatusLegend && <StatusLegend />}
            <SearchField
              aria-label={`Search ${report.title}`}
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
            aria-label={report.ariaLabel}
            className={classNames.tableContent}
            style={{ minWidth: report.tableMinWidth }}
            sortDescriptor={sortDescriptor}
            onSortChange={updateSortDescriptor}>
            <Table.Header>
              {report.columns.map(column => (
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
            </Table.Header>

            <Table.Body renderEmptyState={() => <TableEmptyState />}>
              {paginatedRows.map(row => (
                <Table.Row key={row.id} id={row.id}>
                  {report.columns.map(column => (
                    <Table.Cell key={column.key}>
                      <ReportCell column={column} row={row} />
                    </Table.Cell>
                  ))}
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
    </section>
  )
}

function FilterDropdown({
  filters,
  draftFilters,
  setDraftFilters,
  onApply,
  onReset
}: FilterDropdownProps) {
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
          <Chip color={getStatusColor(item.status)} size="sm" variant="primary">
            <AppIcon icon={item.icon} size={12} aria-hidden="true" />
          </Chip>
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
    <Chip color={getStatusColor(status)} size="sm" variant="soft">
      <span aria-hidden="true">●</span>
      <Chip.Label>{status}</Chip.Label>
    </Chip>
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

function toISODate(date: Date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('-')
}

function getStatusColor(
  status: AttendanceStatus
): 'danger' | 'default' | 'accent' | 'success' | 'warning' {
  if (status === 'Absent') {
    return 'danger'
  }

  if (status === 'Late') {
    return 'warning'
  }

  if (status === 'Half Day' || status === 'Halfday') {
    return 'default'
  }

  if (status === 'Holiday') {
    return 'accent'
  }

  return 'success'
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
  if (typeof value === 'object' && value && 'name' in value) {
    return String((value as PersonValue).name)
  }

  return String(value ?? '')
}

function getSortValue(value: unknown) {
  if (typeof value === 'object' && value && 'name' in value) {
    return (value as PersonValue).name
  }

  if (typeof value === 'string' && value.endsWith('%')) {
    return Number(value.replace('%', ''))
  }

  return value as string | number
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
