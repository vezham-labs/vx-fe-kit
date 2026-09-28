import { useQuery } from '@tanstack/react-query'

import { Sports } from './action'
import { sportsData } from './data'
import type { RQSports } from './types'

export * from './data'
export * from './types'

export const CK_SPORTS = 'sports'

export const useSports = {
  list: (rq: RQSports = {}) =>
    useQuery({
      queryKey: [CK_SPORTS, rq],
      queryFn: () => Sports.list(rq),
      initialData: sportsData
    })
}
