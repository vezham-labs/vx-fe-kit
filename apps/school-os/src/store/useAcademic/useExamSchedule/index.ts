import { useQuery } from '@tanstack/react-query'

import { ExamSchedules } from './action'
import type { RQExamSchedule } from './types'

export * from './data'
export * from './types'

export const CK_EXAM_SCHEDULE = 'exam-schedule'

export const useExamSchedule = {
  list: (rq: RQExamSchedule = {}) =>
    useQuery({
      queryKey: [CK_EXAM_SCHEDULE, rq],
      queryFn: () => ExamSchedules.list(rq)
    })
}
