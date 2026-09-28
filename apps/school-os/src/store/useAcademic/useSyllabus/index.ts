import { useQuery } from '@tanstack/react-query'

import { Syllabus } from './action'
import type { RQSyllabus } from './types'

export * from './data'
export * from './types'

export const CK_SYLLABUS = 'syllabus'

export const useSyllabus = {
  list: (rq: RQSyllabus = {}) =>
    useQuery({
      queryKey: [CK_SYLLABUS, rq],
      queryFn: () => Syllabus.list(rq)
    })
}
