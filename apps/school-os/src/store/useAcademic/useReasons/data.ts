import type {
  ClassFormState,
  ClassStatus,
  DatePresetKey,
  ReasonsItem,
  SortOption,
  SortOrderOption
} from './types'

export const reasonsData: ReasonsItem[] = [
  {
    id: 'SE167645',
    status: 'Active',
    createdAt: '2026-05-01',
    viewedAt: '2026-05-01',
    role: 'Teacher',
    reasons: 'Pregnancy'
  },
  {
    id: 'SE167644',
    status: 'Active',
    createdAt: '2026-04-30',
    viewedAt: '2026-04-30',
    role: 'Student',
    reasons: 'Fees Unpaid'
  },
  {
    id: 'SE167643',
    status: 'Active',
    createdAt: '2026-04-29',
    viewedAt: '2026-04-29',
    role: 'Staff',
    reasons: 'Complaint'
  },
  {
    id: 'SE167642',
    status: 'Active',
    createdAt: '2026-04-26',
    viewedAt: '2026-04-28',
    role: 'Student',
    reasons: 'Complaint'
  },
  {
    id: 'SE167641',
    status: 'Active',
    createdAt: '2026-04-21',
    viewedAt: '2026-04-27',
    role: 'Staff',
    reasons: 'Complaint'
  },
  {
    id: 'SE167640',
    status: 'Active',
    createdAt: '2026-04-20',
    viewedAt: '2026-04-26',
    role: 'Student',
    reasons: 'Fail in all Subject'
  },
  {
    id: 'SE167639',
    status: 'Active',
    createdAt: '2026-04-15',
    viewedAt: '2026-04-25',
    role: 'Staff',
    reasons: 'Engage'
  },
  {
    id: 'SE167638',
    status: 'Active',
    createdAt: '2026-03-31',
    viewedAt: '2026-04-24',
    role: 'Student',
    reasons: 'Experience'
  },
  {
    id: 'SE167637',
    status: 'Active',
    createdAt: '2026-01-12',
    viewedAt: '2026-04-23',
    role: 'Staff',
    reasons: 'No improvement'
  },
  {
    id: 'SE167636',
    status: 'Active',
    createdAt: '2025-12-20',
    viewedAt: '2026-04-22',
    role: 'Staff',
    reasons: 'Issue in Family'
  },
  {
    id: 'SE167636',
    status: 'Active',
    createdAt: '2025-12-20',
    viewedAt: '2026-04-22',
    role: 'Teacher',
    reasons: 'Pregnancy'
  }
]

export const dateOptions: { key: DatePresetKey; label: string }[] = [
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'last7', label: 'Last 7 Days' },
  { key: 'last30', label: 'Last 30 Days' },
  { key: 'thisYear', label: 'This Year' },
  { key: 'nextYear', label: 'Next Year' },
  { key: 'custom', label: 'Custom Range' }
]

export const sortOptions = [
  {
    key: 'recentlyViewed',
    label: 'Recently Viewed',
    column: 'viewedAt'
  },
  {
    key: 'recentlyAdded',
    label: 'Recently Added',
    column: 'createdAt'
  }
] as const satisfies readonly SortOption[]

export const sortOrderOptions = [
  {
    key: 'ascending',
    label: 'Ascending',
    direction: 'ascending',
    icon: 'lucide:arrow-up-wide-narrow'
  },
  {
    key: 'descending',
    label: 'Descending',
    direction: 'descending',
    icon: 'lucide:arrow-down-wide-narrow'
  }
] as const satisfies readonly SortOrderOption[]

export const rowCountOptions = ['5', '10', '25', '50']
export const roleOptions = ['Teacher', 'Student', 'Staff']
export const reasonOptions = [
  'Pregnancy',
  'Fees Unpaid',
  'Complaint',
  'Fail in all Subject',
  'Engage',
  'Experience',
  'No improvement',
  'Issue in family'
]
export const statusOptions: ClassStatus[] = ['Active', 'Inactive']

export const emptyForm: ClassFormState = {
  name: '',
  status: 'Active',
  role: '',
  reasons: ''
}

export const reasonsColumnOptions = [
  {
    key: 'role',
    label: 'Role',
    defaultWidth: 160,
    minWidth: 140,
    maxWidth: 220
  },
  {
    key: 'reasons',
    label: 'Reasons',
    defaultWidth: 260,
    minWidth: 200,
    maxWidth: 360
  },
  {
    key: 'createdAt',
    label: 'Created At',
    defaultWidth: 160,
    minWidth: 140,
    maxWidth: 220
  }
] as const
