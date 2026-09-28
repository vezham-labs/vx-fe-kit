import { useOverlayState } from '@vezham/react-v3'

import type {
  ClassFormState,
  ClassRoutineColumnKey,
  ClassRoutineItem as ClassRow,
  ClassStatus
} from '../../../store/useAcademic/useClassRoutine'

export type {
  ClassFormState,
  ClassRoutineColumnKey,
  ClassRoutineItem as ClassRow,
  ClassStatus,
  DatePresetKey
} from '../../../store/useAcademic/useClassRoutine'

export type DrawerMode = 'view' | 'edit' | 'create'

export type ToastState = {
  message: string
  status: 'success' | 'danger'
}

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
  teacher: string | null
  subject: string | null
  day: string | null
  starttime: string | null
  endtime: string | null
  classroom: string | null
  status: ClassStatus | null
}

export type ClassFormErrors = Partial<
  Record<
    | 'classes'
    | 'teacher'
    | 'subject'
    | 'section'
    | 'day'
    | 'classroom'
    | 'starttime'
    | 'endtime'
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

export type ColumnsDropdownProps = {
  visibleColumns: Set<ClassRoutineColumnKey>
  onVisibleColumnsChange: (columns: Set<ClassRoutineColumnKey>) => void
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
  onFormChange: (field: keyof ClassFormState, value: string) => void
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
  onFormChange: (field: keyof ClassFormState, value: string) => void
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

export type DrawerQueryState =
  | {
      id: string
      mode: Exclude<DrawerMode, 'create'>
    }
  | {
      mode: 'create'
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
