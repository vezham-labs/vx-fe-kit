import { useQuery } from '@tanstack/react-query'

import { Exams } from './action'
import type { RQExam } from './types'

export * from './data'
export * from './types'

export const CK_EXAM = 'exam'

export const useExam = {
  list: (rq: RQExam = {}) =>
    useQuery({
      queryKey: [CK_EXAM, rq],
      queryFn: () => Exams.list(rq)
    })
}
