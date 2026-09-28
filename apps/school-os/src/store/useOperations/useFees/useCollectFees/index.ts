import { useQuery } from '@tanstack/react-query'

import { CollectFees } from './action'
import { collectFeesConfig, collectFeesData } from './data'
import type { RQCollectFees } from './types'

export * from './data'
export * from './types'

export const CK_COLLECT_FEES = 'collect-fees'

export const useCollectFees = {
  list: (rq: RQCollectFees = {}) =>
    useQuery({
      queryKey: [CK_COLLECT_FEES, rq],
      queryFn: () => CollectFees.list(rq),
      initialData: collectFeesData
    })
}

export { collectFeesConfig }
