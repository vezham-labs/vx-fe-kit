import { useQuery } from '@tanstack/react-query'

import { Classrooms } from './action'
import type { RQClassroom } from './types'

export * from './data'
export * from './types'

export const CK_CLASSROOM = 'classroom'

export const useClassroom = {
  list: (rq: RQClassroom = {}) =>
    useQuery({
      queryKey: [CK_CLASSROOM, rq],
      queryFn: () => Classrooms.list(rq)
    })
}
