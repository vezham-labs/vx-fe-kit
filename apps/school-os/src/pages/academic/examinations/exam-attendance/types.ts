import { useOverlayState } from '@vezham/react-v3'

export type AttendanceStatus = 'Present' | 'Absent' | 'Late'
export type DrawerMode = 'view' | 'edit' | 'create'
export type AttendanceColumnKey =
  | 'id'
  | 'name'
  | 'english'
  | 'spanish'
  | 'physics'
  | 'chemistry'
  | 'maths'
  | 'computer'
  | 'envscience'

export type ToastState = {
  message: string
  status: 'success' | 'danger'
}

export type AttendanceRow = {
  id: string
  name: string
  avatar?: string
  email?: string
  rollNo?: string
  english: AttendanceStatus
  spanish: AttendanceStatus
  physics: AttendanceStatus
  chemistry: AttendanceStatus
  maths: AttendanceStatus
  computer: AttendanceStatus
  envscience: AttendanceStatus
  examtype?: string
  classes?: string
  section?: string
  status: AttendanceStatus
  createdAt: string
  viewedAt: string
}

export type DatePresetKey =
  | 'today'
  | 'yesterday'
  | 'last7'
  | 'last30'
  | 'thisYear'
  | 'nextYear'
  | 'custom'

export type DateRangeFilter = {
  start: string
  end: string
}

export type PickerDateValue = {
  toString(): string
}

export type FilterDraft = {
  name: string | null
  english: string | null
  spanish: string | null
  physics: string | null
  chemistry: string | null
  maths: string | null
  computer: string | null
  envscience: string | null
  examtype?: string | null
  status: AttendanceStatus | null
  classes?: string | null
  section?: string | null
}

export type AttendanceFormState = {
  name: string
  english: AttendanceStatus
  spanish: AttendanceStatus
  physics: AttendanceStatus
  chemistry: AttendanceStatus
  maths: AttendanceStatus
  computer: AttendanceStatus
  envscience: AttendanceStatus
  examtype?: string
  classes?: string
  section?: string
  status: AttendanceStatus
}

export type AttendanceFormErrors = Partial<
  Record<
    | 'name'
    | 'english'
    | 'spanish'
    | 'physics'
    | 'chemistry'
    | 'maths'
    | 'computer'
    | 'envscience'
    | 'examtype'
    | 'classes'
    | 'section'
    | 'status',
    string
  >
>

export type DrawerState = ReturnType<typeof useDisclosure>

export type FilterDropdownProps = {
  draftFilters: FilterDraft
  setDraftFilters: (filters: FilterDraft) => void
  onApply: () => void
  onReset: () => void
}

export type AttendanceDrawerProps = {
  canGoNext: boolean
  canGoPrevious: boolean
  drawerState: DrawerState
  form: AttendanceFormState
  formErrors: AttendanceFormErrors
  mode: DrawerMode
  row: AttendanceRow | null
  onCancel: () => void
  onClose: () => void
  onCopyId: (row: AttendanceRow) => void
  onCopyLink: (row: AttendanceRow) => void
  onEdit: () => void
  onFormChange: (field: keyof AttendanceFormState, value: string) => void
  onGoNext: () => void
  onGoPrevious: () => void
  onOpenPage: (row: AttendanceRow) => void
  onSave: () => void
}

export type AttendanceFormProps = {
  form: AttendanceFormState
  formErrors: AttendanceFormErrors
  mode: DrawerMode
  row: AttendanceRow | null
  onFormChange: (field: keyof AttendanceFormState, value: string) => void
}

export type AttendanceDetailsProps = {
  row: AttendanceRow | null
}

export type DetailLineProps = {
  label: string
  value: string
}

export type AttendanceDetailSummaryProps = {
  row: AttendanceRow
}

export type SortableHeaderProps = {
  children: string
  sortDirection?: 'ascending' | 'descending'
}

export type AttendanceColumnOption = {
  key: AttendanceColumnKey
  label: string
  defaultWidth: number
  minWidth: number
  maxWidth: number
}

export type DrawerQueryState = {
  id?: string
  mode: DrawerMode
}

export type OpenDrawerOptions = {
  syncUrl?: boolean
  replaceUrl?: boolean
}

export type CustomDateRangeValue = {
  start: PickerDateValue
  end: PickerDateValue
}

export function useDisclosure() {
  const state = useOverlayState()

  return {
    ...state,
    onOpen: state.open,
    onClose: state.close,
    onOpenChange: state.setOpen
  }
}
