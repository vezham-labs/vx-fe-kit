import type { SortDescriptor } from '@vezham/react-v3'

export type RQClassSchedule = Record<string, never>

export type ClassStatus = 'Active' | 'Inactive'

export type DatePresetKey =
  | 'today'
  | 'yesterday'
  | 'last7'
  | 'last30'
  | 'thisYear'
  | 'nextYear'
  | 'custom'

export type ClassScheduleColumnKey =
  'id' | 'type' | 'starttime' | 'endtime' | 'status'

export type ClassScheduleItem = {
  id: string
  type: string
  starttime: string
  endtime: string
  status: ClassStatus
  createdAt: string
  viewedAt: string
}

export type ClassScheduleResponse = ClassScheduleItem[]

export type ClassFormState = {
  type: string
  starttime: string
  endtime: string
  status: ClassStatus
}

export type ClassFormErrors = Partial<
  Record<'type' | 'starttime' | 'endtime' | 'status', string>
>

export type ClassScheduleColumnOption = {
  key: ClassScheduleColumnKey
  label: string
  defaultWidth: number
  minWidth: number
  maxWidth: number
}

export type SortOption = {
  key: string
  label: string
  column: keyof ClassScheduleItem
}

export type SortOrderOption = {
  key: string
  label: string
  direction: SortDescriptor['direction']
  icon: string
}
