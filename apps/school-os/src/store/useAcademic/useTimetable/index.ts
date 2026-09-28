import { useQuery } from '@tanstack/react-query'

import { Timetables } from './action'
import type { RQTimetable } from './types'

export * from './data'
export * from './types'

export const CK_TIMETABLE = 'timetable'

export const useTimetable = {
  list: (rq: RQTimetable = {}) =>
    useQuery({
      queryKey: [CK_TIMETABLE, rq],
      queryFn: () => Timetables.list(rq)
    })
}
