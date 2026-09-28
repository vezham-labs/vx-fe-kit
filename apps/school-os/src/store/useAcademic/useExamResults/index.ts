import { useQuery } from '@tanstack/react-query'

import { ExamResults } from './action'
import type { RQExamResults } from './types'

export * from './data'
export * from './types'

export const CK_EXAM_RESULTS = 'exam-results'

export const useExamResults = {
  list: (rq: RQExamResults = {}) =>
    useQuery({
      queryKey: [CK_EXAM_RESULTS, rq],
      queryFn: () => ExamResults.list(rq)
    })
}
