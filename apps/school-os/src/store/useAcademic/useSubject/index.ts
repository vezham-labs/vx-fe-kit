import { useQuery } from '@tanstack/react-query'

import { Subjects } from './action'
import type { RQSubject } from './types'

export * from './data'
export * from './types'

export const CK_SUBJECT = 'subject'

export const useSubject = {
  list: (rq: RQSubject = {}) =>
    useQuery({
      queryKey: [CK_SUBJECT, rq],
      queryFn: () => Subjects.list(rq)
    })
}
