import { useQuery } from '@tanstack/react-query'

import { ExamAttendances } from './action'
import type { RQExamAttendance } from './types'

export * from './data'
export * from './types'

export const CK_EXAM_ATTENDANCE = 'exam-attendance'

export const useExamAttendance = {
  list: (rq: RQExamAttendance = {}) =>
    useQuery({
      queryKey: [CK_EXAM_ATTENDANCE, rq],
      queryFn: () => ExamAttendances.list(rq)
    })
}
