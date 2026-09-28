import { useOverlayState } from '@vezham/react-v3'

export type ClassStatus = 'Active' | 'Inactive'
export type DrawerMode = 'view' | 'edit' | 'create'
export type ScheduleColumnKey =
  | 'id'
  | 'classes'
  | 'section'
  | 'examName'
  | 'date'
  | 'subject'
  | 'starttime'
  | 'endtime'
  | 'duration'
  | 'classroom'
  | 'maximum'
  | 'minimum'
  | 'status'

export type ToastState = {
  message: string
  status: 'success' | 'danger'
}

export type ClassRow = {
  id: string
  classes: string
  section: string
  examName: string
  subject: string
  date: string
  starttime: string
  endtime: string
  duration: string
  classroom: string
  maximum: string
  minimum: string
  status: ClassStatus
  createdAt: string
  viewedAt: string
}

export type ExamScheduleItem = {
  id: string
  date: string
  subject: string
  classroom: string
  maximum: string
  minimum: string
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
  classes: string | null
  section: string | null
  examName: string | null
  subject: string | null
  date: string | null
  starttime: string | null
  endtime: string | null
  duration: string | null
  classroom: string | null
  maximum: string | null
  minimum: string | null
  status: ClassStatus | null
}

export type ClassFormState = {
  classes: string
  section: string
  examName: string
  subject: string
  date: string
  starttime: string
  endtime: string
  duration: string
  classroom: string
  maximum: string
  minimum: string
  status: ClassStatus
  scheduleRows: ExamScheduleItem[]
}

export type ClassFormErrors = Partial<
  Record<
    | 'subject'
    | 'classes'
    | 'section'
    | 'examName'
    | 'date'
    | 'duration'
    | 'classroom'
    | 'maximum'
    | 'minimum'
    | 'starttime'
    | 'endtime'
    | 'status'
    | 'scheduleRows',
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

export type ClassDrawerProps = {
  canGoNext: boolean
  canGoPrevious: boolean
  drawerState: DrawerState
  form: ClassFormState
  formErrors: ClassFormErrors
  mode: DrawerMode
  row: ClassRow | null
  onCancel: () => void
  onClose: () => void
  onCopyId: (row: ClassRow) => void
  onCopyLink: (row: ClassRow) => void
  onEdit: () => void
  onFormChange: <K extends keyof ClassFormState>(
    field: K,
    value: ClassFormState[K]
  ) => void
  onGoNext: () => void
  onGoPrevious: () => void
  onOpenPage: (row: ClassRow) => void
  onSave: () => void
}

export type ClassFormProps = {
  form: ClassFormState
  formErrors: ClassFormErrors
  mode: DrawerMode
  row: ClassRow | null
  onFormChange: <K extends keyof ClassFormState>(
    field: K,
    value: ClassFormState[K]
  ) => void
}

export type ClassDetailsProps = {
  row: ClassRow | null
}

export type ClassDetailSummaryProps = {
  row: ClassRow
}

export type DetailLineProps = {
  label: string
  value: string
}

export type SortableHeaderProps = {
  children: string
  sortDirection?: 'ascending' | 'descending'
}

export type ScheduleColumnOption = {
  key: ScheduleColumnKey
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
