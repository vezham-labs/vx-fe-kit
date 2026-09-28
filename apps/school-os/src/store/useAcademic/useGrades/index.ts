import { useQuery } from '@tanstack/react-query'

import { Grades } from './action'
import type { RQGrades } from './types'

export * from './data'
export * from './types'

export const CK_GRADES = 'grades'

export const useGrades = {
  list: (rq: RQGrades = {}) =>
    useQuery({
      queryKey: [CK_GRADES, rq],
      queryFn: () => Grades.list(rq)
    })
}
