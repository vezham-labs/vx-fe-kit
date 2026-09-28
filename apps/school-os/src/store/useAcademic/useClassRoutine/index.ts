import { useQuery } from '@tanstack/react-query'

import { ClassRoutine } from './action'
import type { RQClassRoutine } from './types'

export * from './data'
export * from './types'

export const CK_CLASS_ROUTINE = 'class-routine'

export const useClassRoutine = {
  list: (rq: RQClassRoutine = {}) =>
    useQuery({
      queryKey: [CK_CLASS_ROUTINE, rq],
      queryFn: () => ClassRoutine.list(rq)
    })
}
