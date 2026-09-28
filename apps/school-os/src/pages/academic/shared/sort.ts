import type { SortDescriptor } from '@vezham/react-v3'

export type SortFieldOption = {
  key: string
  label: string
  column: string
}

export type SortOrderOption = {
  key: string
  label: string
  direction: SortDescriptor['direction']
  icon: string
}

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

export function getActiveSortLabel(
  sortOptions: readonly SortFieldOption[],
  sortDescriptor: SortDescriptor,
  fallbackLabel?: string
) {
  return (
    sortOptions.find(option => option.column === sortDescriptor.column)
      ?.label ??
    fallbackLabel ??
    sortOptions[0]?.label ??
    'Sort'
  )
}

export function sortRows<T extends Record<string, unknown>>(
  rows: T[],
  sortDescriptor: SortDescriptor
) {
  return [...rows].sort((firstRow, secondRow) => {
    const first = firstRow[sortDescriptor.column as keyof T]
    const second = secondRow[sortDescriptor.column as keyof T]
    const comparison =
      typeof first === 'number' && typeof second === 'number'
        ? first - second
        : String(first).localeCompare(String(second), undefined, {
            numeric: true
          })

    return sortDescriptor.direction === 'descending'
      ? comparison * -1
      : comparison
  })
}
