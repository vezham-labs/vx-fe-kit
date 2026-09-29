import { useQuery } from '@tanstack/react-query'

import { ClassSchedule } from './action'
import type { RQClassSchedule } from './types'

export * from './data'
export * from './types'

export const CK_CLASS_SCHEDULE = 'class-schedule'

const useList = (rq: RQClassSchedule = {}) =>
  useQuery({
    queryKey: [CK_CLASS_SCHEDULE, rq],
    queryFn: () => ClassSchedule.list(rq)
  })

export const useClassSchedule = { list: useList }
