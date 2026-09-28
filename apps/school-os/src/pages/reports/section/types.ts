import type { SortDescriptor } from '@vezham/react-v3'

export type DatePresetKey =
  | 'today'
  | 'yesterday'
  | 'last7'
  | 'last30'
  | 'thisYear'
  | 'nextYear'
  | 'custom'

export type PickerDateValue = {
  toString(): string
}

export type CustomDateRangeValue = {
  start: PickerDateValue
  end: PickerDateValue
}

export type DateRangeFilter = {
  start: string
  end: string
}

export type AttendanceStatus =
  'Present' | 'Absent' | 'Late' | 'Half Day' | 'Halfday' | 'Holiday'

export type ReportCellType =
  'text' | 'link' | 'person' | 'status' | 'percent' | 'marker'

export type ReportColumn = {
  key: string
  label: string
  type?: ReportCellType
  allowsSorting?: boolean
  minWidth?: number
}

export type ReportRow = {
  id: string
  createdAt: string
  [key: string]: unknown
}

export type PersonValue = {
  name: string
  avatar?: string
}

export type FilterOption = {
  key: string
  label: string
  values: string[]
}

export type AttendanceReportConfig = {
  key: string
  title: string
  ariaLabel: string
  columns: ReportColumn[]
  rows: ReportRow[]
  filters: FilterOption[]
  sortOptions: {
    key: string
    label: string
    descriptor: SortDescriptor
  }[]
  initialSort: SortDescriptor
  tableMinWidth: number
  showStatusLegend?: boolean
}

export type FilterDraft = Record<string, string | null>

export type FilterDropdownProps = {
  filters: FilterOption[]
  draftFilters: FilterDraft
  onApply: () => void
  onReset: () => void
  setDraftFilters: (filters: FilterDraft) => void
}

export type SortableHeaderProps = {
  children: string
  sortDirection?: 'ascending' | 'descending'
}
