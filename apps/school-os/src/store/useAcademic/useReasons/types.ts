import type { SortDescriptor } from '@vezham/react-v3'

export type RQReasons = Record<string, never>

export type ClassStatus = 'Active' | 'Inactive'

export type DatePresetKey =
  | 'today'
  | 'yesterday'
  | 'last7'
  | 'last30'
  | 'thisYear'
  | 'nextYear'
  | 'custom'

export type ReasonsItem = {
  id: string
  role: string
  reasons: string
  status: ClassStatus
  createdAt: string
  viewedAt: string
}

export type ReasonsResponse = ReasonsItem[]

export type ClassFormState = {
  name: string
  role: string
  reasons: string
  status: ClassStatus
}

export type ClassFormErrors = Partial<
  Record<'role' | 'reasons' | 'status' | 'name', string>
>

export type SortOption = {
  key: string
  label: string
  column: keyof ReasonsItem
}

export type SortOrderOption = {
  key: string
  label: string
  direction: SortDescriptor['direction']
  icon: string
}
