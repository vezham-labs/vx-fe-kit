import { useQuery } from '@tanstack/react-query'

import { FeesType } from './action'
import { feesTypeConfig, feesTypeData } from './data'
import type { RQFeesType } from './types'

export * from './data'
export * from './types'

export const CK_FEES_TYPE = 'fees-type'

export const useFeesType = {
  list: (rq: RQFeesType = {}) =>
    useQuery({
      queryKey: [CK_FEES_TYPE, rq],
      queryFn: () => FeesType.list(rq),
      initialData: feesTypeData
    })
}

export { feesTypeConfig }
