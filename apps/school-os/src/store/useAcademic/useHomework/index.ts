import { useQuery } from '@tanstack/react-query'

import { Homeworks } from './action'
import type { RQHomework } from './types'

export * from './data'
export * from './types'

export const CK_HOMEWORK = 'homework'

export const useHomework = {
  list: (rq: RQHomework = {}) =>
    useQuery({
      queryKey: [CK_HOMEWORK, rq],
      queryFn: () => Homeworks.list(rq)
    })
}
