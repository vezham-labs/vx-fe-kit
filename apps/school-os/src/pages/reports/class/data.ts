import type { SortDescriptor } from '@vezham/react-v3'

import type {
  AttendancePageConfig,
  AttendanceStatus,
  DatePresetKey,
  ReportColumn,
  ReportRow
} from './types'

export const rowCountOptions = ['10', '25', '50']
export const dateOptions: { key: DatePresetKey; label: string }[] = [
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'last7', label: 'Last 7 Days' },
  { key: 'last30', label: 'Last 30 Days' },
  { key: 'thisYear', label: 'This Year' },
  { key: 'nextYear', label: 'Next Year' },
  { key: 'custom', label: 'Custom Range' }
]
export const statusLegend: {
  status: AttendanceStatus
  label: string
  icon: string
}[] = []

const columns: ReportColumn[] = [
  { key: 'displayId', label: 'ID', allowsSorting: true },
  { key: 'className', label: 'Class', allowsSorting: true },
  { key: 'section', label: 'Section', allowsSorting: true },
  { key: 'students', label: 'No Of Students', allowsSorting: true }
]

const rows: ReportRow[] = [
  {
    id: 'class-report-1',
    displayId: '',
    className: 'I',
    section: 'A',
    students: 30,
    createdAt: '2026-05-13'
  },
  {
    id: 'class-report-2',
    displayId: '',
    className: 'I',
    section: 'B',
    students: 25,
    createdAt: '2026-05-12'
  },
  {
    id: 'class-report-3',
    displayId: '',
    className: 'II',
    section: 'A',
    students: 40,
    createdAt: '2026-05-11'
  },
  {
    id: 'class-report-4',
    displayId: '',
    className: 'II',
    section: 'B',
    students: 35,
    createdAt: '2026-05-10'
  },
  {
    id: 'class-report-5',
    displayId: '',
    className: 'II',
    section: 'C',
    students: 25,
    createdAt: '2026-05-09'
  },
  {
    id: 'class-report-6',
    displayId: '',
    className: 'III',
    section: 'A',
    students: 30,
    createdAt: '2026-05-09'
  },
  {
    id: 'class-report-7',
    displayId: '',
    className: 'III',
    section: 'B',
    students: 25,
    createdAt: '2026-05-09'
  },
  {
    id: 'class-report-8',
    displayId: '',
    className: 'IV',
    section: 'A',
    students: 20,
    createdAt: '2026-05-09'
  },
  {
    id: 'class-report-9',
    displayId: '',
    className: 'IV',
    section: 'B',
    students: 30,
    createdAt: '2026-05-09'
  },
  {
    id: 'class-report-10',
    displayId: '',
    className: 'V',
    section: 'A',
    students: 35,
    createdAt: '2026-05-09'
  }
]

export const classReportsConfig = makeConfig({
  key: 'class-reports',
  title: 'Class Report List',
  ariaLabel: 'Class reports',
  columns,
  rows,
  filters: [
    option('className', 'Class name', ['I', 'II', 'III', 'IV', 'V']),
    option('section', 'Section', ['A', 'B', 'C'])
  ],
  initialColumn: 'className',
  tableMinWidth: 980,
  actionLabel: 'View Details'
})

function makeConfig(config: {
  key: string
  title: string
  ariaLabel: string
  columns: ReportColumn[]
  rows: ReportRow[]
  filters: AttendancePageConfig['filters']
  initialColumn: string
  tableMinWidth: number
  showStatusLegend?: boolean
  actionLabel?: string
}): AttendancePageConfig {
  const initialSort = {
    column: config.initialColumn,
    direction: 'ascending'
  } satisfies SortDescriptor

  return {
    ...config,
    initialSort,
    sortOptions: [
      { key: 'ascending', label: 'Ascending', descriptor: initialSort },
      {
        key: 'descending',
        label: 'Descending',
        descriptor: {
          column: config.initialColumn,
          direction: 'descending'
        } satisfies SortDescriptor
      },
      {
        key: 'recentlyViewed',
        label: 'Recently Viewed',
        descriptor: {
          column: 'viewedAt',
          direction: 'descending'
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
}

function option(key: string, label: string, values: string[]) {
  return { key, label, values }
}
