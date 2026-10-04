import type { Event } from './types'
import { addDays, startOfToday } from './util'

export const today = startOfToday()

export const dates = Array.from({ length: 7 }, (_, i) => addDays(today, i))

export const events: Event[] = [
  {
    id: 1,
    title: 'Team Meeting',
    time: '10:00 AM',
    type: 'meeting',
    color: 'accent'
  },
  {
    id: 2,
    title: 'Workout Session',
    time: '2:30 PM',
    type: 'workout',
    color: 'success'
  },
  {
    id: 3,
    title: 'Project Deadline',
    time: '5:00 PM',
    type: 'reminder',
    color: 'warning'
  }
]
