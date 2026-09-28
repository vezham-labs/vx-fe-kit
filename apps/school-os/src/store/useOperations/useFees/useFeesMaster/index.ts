import { useQuery } from '@tanstack/react-query'

import { FeesMaster } from './action'
import { feesMasterConfig, feesMasterData } from './data'
import type { RQFeesMaster } from './types'

export * from './data'
export * from './types'

export const CK_FEES_MASTER = 'fees-master'

export const useFeesMaster = {
  list: (rq: RQFeesMaster = {}) =>
    useQuery({
      queryKey: [CK_FEES_MASTER, rq],
      queryFn: () => FeesMaster.list(rq),
      initialData: feesMasterData
    })
}

export { feesMasterConfig }
