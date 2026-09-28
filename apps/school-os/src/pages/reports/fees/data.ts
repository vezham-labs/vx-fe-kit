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
  {
    key: 'feesGroup',
    label: 'Fees Group',
    allowsSorting: true,
    type: 'link',
    minWidth: 170
  },
  { key: 'feesCode', label: 'Fees Code', allowsSorting: true },
  { key: 'dueDate', label: 'Due Date', allowsSorting: true },
  { key: 'amount', label: 'Amount $', allowsSorting: true },
  { key: 'status', label: 'Status', type: 'badge', allowsSorting: true },
  { key: 'refId', label: 'Ref ID', allowsSorting: true },
  { key: 'mode', label: 'Mode', allowsSorting: true },
  { key: 'datePaid', label: 'Date Paid', allowsSorting: true },
  { key: 'discount', label: 'Discount ($)', allowsSorting: true },
  { key: 'fine', label: 'Fine ($)', allowsSorting: true },
  { key: 'balance', label: 'Balance ($)', allowsSorting: true }
]

const rows: ReportRow[] = [
  {
    id: 'fees-report-1',
    feesGroup: 'Class 1 General\n(Admission Fees)',
    feesCode: 'admission-fees',
    dueDate: '25 Mar 2024',
    amount: '2000',
    status: 'Paid',
    refId: '#435454',
    mode: 'Cash',
    datePaid: '25 Jan 2024',
    discount: '10%',
    fine: '200',
    balance: '0',
    createdAt: '2026-05-13'
  },
  {
    id: 'fees-report-2',
    feesGroup: 'Class 1 General\n(Mar month Fees)',
    feesCode: 'mar-month-fees',
    dueDate: '10 Apr 2024',
    amount: '2500',
    status: 'Paid',
    refId: '#435453',
    mode: 'Cash',
    datePaid: '03 Apr 2024',
    discount: '10%',
    fine: '0',
    balance: '0',
    createdAt: '2026-05-12'
  },
  {
    id: 'fees-report-3',
    feesGroup: 'Class 1 General\n(Apr month Fees)',
    feesCode: 'apr-month-fees',
    dueDate: '10 May 2024',
    amount: '2500',
    status: 'Paid',
    refId: '#435453',
    mode: 'Cash',
    datePaid: '03 Apr 2024',
    discount: '10%',
    fine: '0',
    balance: '0',
    createdAt: '2026-05-11'
  },
  {
    id: 'fees-report-4',
    feesGroup: 'Class 1 General\n(May month Fees)',
    feesCode: 'may-month-fees',
    dueDate: '10 Jun 2024',
    amount: '2500',
    status: 'Paid',
    refId: '#435451',
    mode: 'Cash',
    datePaid: '02 Jun 2024',
    discount: '10%',
    fine: '200',
    balance: '0',
    createdAt: '2026-05-10'
  },
  {
    id: 'fees-report-5',
    feesGroup: 'Class 1 General\n(Jun month Fees)',
    feesCode: 'jun-month-fees',
    dueDate: '10 Jul 2024',
    amount: '2500',
    status: 'Paid',
    refId: '#435450',
    mode: 'Cash',
    datePaid: '05 Jul 2024',
    discount: '10%',
    fine: '200',
    balance: '0',
    createdAt: '2026-05-09'
  },
  {
    id: 'fees-report-6',
    feesGroup: 'Class 1 General\n(Jul month Fees)',
    feesCode: 'jul-month-fees',
    dueDate: '10 Aug 2024',
    amount: '2500',
    status: 'Paid',
    refId: '#435449',
    mode: 'Cash',
    datePaid: '01 Aug 2024',
    discount: '10%',
    fine: '200',
    balance: '0',
    createdAt: '2026-05-09'
  },
  {
    id: 'fees-report-7',
    feesGroup: 'Class 1 General\n(Dec month Fees)',
    feesCode: 'dec-month-fees',
    dueDate: '10 Jan 2024',
    amount: '2500',
    status: 'Paid',
    refId: '#435443',
    mode: 'Cash',
    datePaid: '05 Jan 2024',
    discount: '10%',
    fine: '0',
    balance: '0',
    createdAt: '2026-05-09'
  },
  {
    id: 'fees-report-8',
    feesGroup: 'Class 1 General\n(Jan month Fees)',
    feesCode: 'jan-month-fees',
    dueDate: '10 Feb 2024',
    amount: '2000',
    status: 'Paid',
    refId: '#435443',
    mode: 'Cash',
    datePaid: '01 Feb 2024',
    discount: '10%',
    fine: '200',
    balance: '0',
    createdAt: '2026-05-09'
  }
]

export const feesReportsConfig = makeConfig({
  key: 'fees-reports',
  title: 'Fees Report List',
  ariaLabel: 'Fees reports',
  columns,
  rows,
  filters: [
    option('feesCode', 'Fees code', [
      'admission-fees',
      'mar-month-fees',
      'apr-month-fees'
    ]),
    option('status', 'Status', ['Paid'])
  ],
  initialColumn: 'feesGroup',
  tableMinWidth: 1450
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
