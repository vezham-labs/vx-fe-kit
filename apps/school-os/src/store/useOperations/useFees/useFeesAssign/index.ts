import { useQuery } from '@tanstack/react-query'

import { FeesAssign } from './action'
import { feesAssignConfig, feesAssignData } from './data'
import type { RQFeesAssign } from './types'

export * from './data'
export * from './types'

export const CK_FEES_ASSIGN = 'fees-assign'

export const useFeesAssign = {
  list: (rq: RQFeesAssign = {}) =>
    useQuery({
      queryKey: [CK_FEES_ASSIGN, rq],
      queryFn: () => FeesAssign.list(rq),
      initialData: feesAssignData
    })
}

export { feesAssignConfig }
