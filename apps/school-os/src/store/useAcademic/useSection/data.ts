import type {
  ClassFormState,
  ClassStatus,
  DatePresetKey,
  SectionColumnKey,
  SectionItem,
  SortOption,
  SortOrderOption
} from './types'

export const sectionData: SectionItem[] = [
  {
    id: 'SE167645',
    section: 'A',
    status: 'Active',
    createdAt: '2026-05-01',
    viewedAt: '2026-05-01'
  },
  {
    id: 'SE167644',
    section: 'B',
    status: 'Active',
    createdAt: '2026-04-30',
    viewedAt: '2026-04-30'
  },
  {
    id: 'SE167643',
    section: 'C',
    status: 'Active',
    createdAt: '2026-04-29',
    viewedAt: '2026-04-29'
  },
  {
    id: 'SE167642',
    section: 'D',
    status: 'Active',
    createdAt: '2026-04-26',
    viewedAt: '2026-04-28'
  },
  {
    id: 'SE167641',
    section: 'E',
    status: 'Active',
    createdAt: '2026-04-21',
    viewedAt: '2026-04-27'
  },
  {
    id: 'SE167640',
    section: 'F',
    status: 'Active',
    createdAt: '2026-04-20',
    viewedAt: '2026-04-26'
  },
  {
    id: 'SE167639',
    section: 'G',
    status: 'Active',
    createdAt: '2026-04-15',
    viewedAt: '2026-04-25'
  },
  {
    id: 'SE167638',
    section: 'H',
    status: 'Active',
    createdAt: '2026-03-31',
    viewedAt: '2026-04-24'
  },
  {
    id: 'SE167637',
    section: 'I',
    status: 'Active',
    createdAt: '2026-01-12',
    viewedAt: '2026-04-23'
  },
  {
    id: 'SE167636',
    section: 'J',
    status: 'Active',
    createdAt: '2025-12-20',
    viewedAt: '2026-04-22'
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
export const sectionOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
export const statusOptions: ClassStatus[] = ['Active', 'Inactive']

export const sectionColumnOptions = [
  {
    key: 'id',
    label: 'ID',
    defaultWidth: 180,
    minWidth: 140,
    maxWidth: 240
  },
  {
    key: 'section',
    label: 'Section Name',
    defaultWidth: 220,
    minWidth: 180,
    maxWidth: 320
  },
  {
    key: 'status',
    label: 'Status',
    defaultWidth: 160,
    minWidth: 140,
    maxWidth: 220
  }
] as const satisfies readonly {
  key: SectionColumnKey
  label: string
  defaultWidth: number
  minWidth: number
  maxWidth: number
}[]

export const emptyForm: ClassFormState = {
  section: '',
  status: 'Active'
}
