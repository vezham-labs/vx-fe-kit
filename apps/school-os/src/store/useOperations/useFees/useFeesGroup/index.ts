import { useQuery } from '@tanstack/react-query'

import { FeesGroup } from './action'
import { feesGroupConfig, feesGroupData } from './data'
import type { RQFeesGroup } from './types'

export * from './data'
export * from './types'

export const CK_FEES_GROUP = 'fees-group'

export const useFeesGroup = {
  list: (rq: RQFeesGroup = {}) =>
    useQuery({
      queryKey: [CK_FEES_GROUP, rq],
      queryFn: () => FeesGroup.list(rq),
      initialData: feesGroupData
    })
}

export { feesGroupConfig }
