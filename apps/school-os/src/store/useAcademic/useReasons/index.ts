import { useQuery } from '@tanstack/react-query'

import { Reasons } from './action'
import type { RQReasons } from './types'

export * from './data'
export * from './types'

export const CK_REASONS = 'reasons'

export const useReasons = {
  list: (rq: RQReasons = {}) =>
    useQuery({
      queryKey: [CK_REASONS, rq],
      queryFn: () => Reasons.list(rq)
    })
}
