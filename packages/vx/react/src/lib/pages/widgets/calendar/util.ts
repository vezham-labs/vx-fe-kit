import { getLocalDateKey } from '../../../utils/date'

const weekdayFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short'
})

export const startOfToday = () => {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  return date
}

export const addDays = (date: Date, days: number) => {
  const nextDate = new Date(date)
  nextDate.setDate(nextDate.getDate() + days)
  return nextDate
}

export const getDateKey = getLocalDateKey

export const getShortWeekday = (date: Date) => weekdayFormatter.format(date)
