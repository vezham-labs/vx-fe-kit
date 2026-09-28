import type { DatePresetKey, DateRangeFilter } from '../types'

export function getPresetDateRange(preset: Exclude<DatePresetKey, 'custom'>) {
  const today = startOfDay(new Date())

  switch (preset) {
    case 'today':
      return { start: toISODate(today), end: toISODate(today) }
    case 'yesterday': {
      const yesterday = addDays(today, -1)

      return { start: toISODate(yesterday), end: toISODate(yesterday) }
    }
    case 'last7':
      return { start: toISODate(addDays(today, -6)), end: toISODate(today) }
    case 'last30':
      return { start: toISODate(addDays(today, -29)), end: toISODate(today) }
    case 'thisYear':
      return {
        start: `${today.getFullYear()}-01-01`,
        end: `${today.getFullYear()}-12-31`
      }
    case 'nextYear':
      return {
        start: `${today.getFullYear() + 1}-01-01`,
        end: `${today.getFullYear() + 1}-12-31`
      }
    default:
      return { start: toISODate(addDays(today, -29)), end: toISODate(today) }
  }
}

export function isISODateInRange(date: string, start: string, end: string) {
  return date >= start && date <= end
}

export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function addDays(date: Date, days: number) {
  const nextDate = new Date(date)

  nextDate.setDate(nextDate.getDate() + days)
  return nextDate
}

export function toISODate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function formatDisplayDate(value: string) {
  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date(`${value}T00:00:00`))
}

export function formatDateRangeLabel(range: DateRangeFilter) {
  return `${formatDisplayDate(range.start)} - ${formatDisplayDate(range.end)}`
}

export function formatNumericDate(value: string) {
  if (!value) {
    return ''
  }

  const [year, month, day] = value.split('-')

  return [day, month, year].filter(Boolean).join('/')
}

export function parseTimeOption(value: string) {
  return value.replace('.', ':')
}
